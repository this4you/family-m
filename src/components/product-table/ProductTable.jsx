import {Button, Form, Input, InputNumber, Modal, Popconfirm, Table, Typography} from 'antd';
import {useState} from 'react';
import {useStore} from "../../store";
import {useUpdateProduct} from "../../application/useUpdateProduct";
import {useDeleteProduct} from "../../application/useDeleteProduct";
import {PlusCircleOutlined} from "@ant-design/icons";
import {ProductCreateItemForm} from "./product-table-create-item-form/ProductCreateItemForm";

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};
export const ProductTable = () => {
    const [store] = useStore();
    const [search, setSearch] = useState('');
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const hideModal = () => {
        setIsModalOpen(false);
    };
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();
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
            await updateProduct(key, row.name);
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const deleteRecord = async (key) => {
        try {
            await deleteProduct(key);
            setEditingKey('');
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '50%',
            editable: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record.value.id)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Typography.Link
                onClick={() => deleteRecord(record.value.id)}
                style={{
                    marginRight: 8,
                }}
            >
                Delete
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </Typography.Link>
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
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4>Додати новий продукт</h4>
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
                    dataSource={store.products.filter(it => search === ''
                        ? true
                        : it?.name?.toLowerCase()?.indexOf(search.toLowerCase()) !== -1)
                    }
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={false}
                />
            </Form>
            <Modal
                onCancel={hideModal}
                title="Додати продукт"
                open={isModalOpen}
                footer={[
                    <Button form={"create-product"} key="submit" htmlType="submit">
                        Додати
                    </Button>
                ]}
            >
                <ProductCreateItemForm
                    onAfterSubmit={hideModal}
                />
            </Modal>
        </>
    );
};
