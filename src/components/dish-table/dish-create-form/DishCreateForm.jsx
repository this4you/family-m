import React from 'react';
import {Form, Input} from "antd";
import {useCreateDish} from "../../../application/useCreateDish";


export const DishCreateForm = ({onAfterSubmit}) => {
    const [form] = Form.useForm();
    const createDish = useCreateDish();
    const onFinish = async (values) => {
        const {name} = values;

        form.resetFields();

        await createDish(name);

        onAfterSubmit && onAfterSubmit();
    };

    return (
        <Form form={form} name={"create-dish"} layout="vertical" onFinish={onFinish} style={{marginTop: '30px'}}>
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
                    placeholder="Назва страви"
                />
            </Form.Item>
        </Form>
    )
}