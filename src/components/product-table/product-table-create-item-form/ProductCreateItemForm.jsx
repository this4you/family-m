import React from 'react';
import {Form, Input} from "antd";
import {useCreateProduct} from "../../../application/useCreateProduct";


export const ProductCreateItemForm = ({onAfterSubmit}) => {
    const [form] = Form.useForm();
    const createProduct = useCreateProduct();
    const onFinish = async (values) => {
        const {name} = values;

        form.resetFields();

        await createProduct(name);

        onAfterSubmit && onAfterSubmit();
    };

    return (
        <Form form={form} name={"create-product"} layout="vertical" onFinish={onFinish} style={{marginTop: '30px'}}>
            <Form.Item
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Обовʼязкове поле',
                    },
                ]}
            >
                <Input
                    placeholder="Назва продукту"
                />
            </Form.Item>
        </Form>
    )
}