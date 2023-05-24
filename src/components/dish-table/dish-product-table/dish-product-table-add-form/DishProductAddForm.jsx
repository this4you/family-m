import React from 'react';
import {Form, InputNumber, Select} from "antd";
import {useStore} from "../../../../store";
import {useCreateProductInDish} from "../../../../application/useCreateProductInDish";

const Option = Select.Option;

export const DishProductAddForm = ({onAfterSubmit, dishId}) => {
    const [form] = Form.useForm();
    const [store] = useStore();

     const createProductInDish = useCreateProductInDish();
    const onFinish = async (values) => {
        const {amount, product} = values;

        form.resetFields();

        //await createProduct(name);

        await createProductInDish(JSON.parse(product).id, dishId, amount)

        onAfterSubmit && onAfterSubmit();
    };

    return (
        <Form form={form} name={"create-product-in-dish"} layout="vertical" onFinish={onFinish} style={{marginTop: '30px'}}>
            <Form.Item
                name="product"
                rules={[
                    {
                        required: true,
                        message: 'Обовʼязкове поле',
                    },
                ]}
            >
                <Select
                    placeholder="Вибери продукт"
                    allowClear
                    showSearch
                >
                    {store.products.map((it) => <Option value={JSON.stringify(it.value)}> {it.name} </Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="amount"
                rules={[
                    {
                        required: true,
                        message: 'Обовʼязкове поле',
                    },
                ]}
            >
                <InputNumber
                    placeholder="Кількість/Частин/Грам"
                />
            </Form.Item>
        </Form>
    )
}