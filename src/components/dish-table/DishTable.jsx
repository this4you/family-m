import { Button, Form, Input, Modal, Table} from "antd";
import {useStore} from "../../store";
import {useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";
import {ProductCreateItemForm} from "../product-table/product-table-create-item-form/ProductCreateItemForm";
import {EditableCell} from "../editable-cell/EditableCell";
import {DishProductTable} from "./dish-product-table/DishProductTable";
import {useUpdateDish} from "../../application/useUpdateDish";
import {useDeleteDish} from "../../application/useDeleteDish";
import {DishCreateForm} from "./dish-create-form/DishCreateForm";
import {DishProductAddForm} from "./dish-product-table/dish-product-table-add-form/DishProductAddForm";


export const DishTable = () => {
    const [store] = useStore();
    const [search, setSearch] = useState('');
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [productModalDishId, setProductModalDishId] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const hideModal = () => {
        setIsModalOpen(false);
    };
    const showProductModal = (id) => {
        setProductModalDishId(id);
        setIsProductModalOpen(true);
    };
    const hideProductModal = () => {
        setIsProductModalOpen(false);
    };
    const updateDish = useUpdateDish();
    const deleteDish = useDeleteDish();
    const isEditing = (record) => record.value.id === editingKey;

    const onSearchHandler = (value) => {
        setSearch(value);
    }
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.value.id);
    };
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            await updateDish(key, row.name);
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const deleteRecord = async (key) => {
        try {
            await deleteDish(key);
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'Назва страви',
            dataIndex: 'name',
            width: '50%',
            editable: true,
        },
        {
            title: '',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Button
                type={"primary"}
                onClick={() => save(record.value.id)}
                style={{
                    marginRight: 8,
                }}
            >
              Зберегти
            </Button>
            <Button

                onClick={() => deleteRecord(record.value.id)}
                style={{
                    marginRight: 8,
                }}
            >
                Видалити
            </Button>
            <Button onClick={cancel}>
              <a>Відміна</a>
            </Button>
          </span>
                ) : (
                    <div>
                        <Button style={{marginRight: 8,}} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Редагувати
                        </Button>
                        <Button disabled={editingKey !== ''} onClick={() => showProductModal(record.value.id)}>
                            Додати продукт
                        </Button>
                    </div>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    const expandedRowRender = (dish) => {
        return <DishProductTable
            data={dish.value.product_in_dish?.map(it => ({id: it.id, amount: it.amount, name: it.product.name ?? []}))}/>;
    };
    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4>Додати нову страву</h4>
                    <Button onClick={() => showModal()} shape="circle" icon={<PlusCircleOutlined/>} size={"small"}
                            style={{marginLeft: '10px'}}/>
                </div>
                <div>
                    <Input.Search onSearch={onSearchHandler} placeholder="Search"/>
                </div>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    rowKey={record => record.value.id}
                    dataSource={store.dishes.filter(it => search === ''
                        ? true
                        : it?.name?.toLowerCase()?.indexOf(search.toLowerCase()) !== -1)
                    }
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                    expandable={{
                        expandedRowRender,
                        defaultExpandedRowKeys: ['0'],
                    }}
                />
            </Form>
            <Modal
                onCancel={hideModal}
                title="Додати нову страву"
                open={isModalOpen}
                footer={[
                    <Button form={"create-dish"} key="submit" htmlType="submit">
                        Додати
                    </Button>
                ]}
            >
                <DishCreateForm
                    onAfterSubmit={hideModal}
                />
            </Modal>
            <Modal
                onCancel={hideProductModal}
                title="Додати продукт"
                open={isProductModalOpen}
                footer={[
                    <Button form={"create-product-in-dish"} key="submit" htmlType="submit">
                        Додати
                    </Button>
                ]}
            >
                <DishProductAddForm
                    onAfterSubmit={hideProductModal}
                    dishId={productModalDishId}
                />
            </Modal>
        </>
    );
};