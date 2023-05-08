import React from 'react';
import {Form, Select} from "antd";
import {useStore} from "../../../store";
import {useCreateDishInWeek} from "../../../application/useCreateDishInWeek";

const {Option} = Select;

export const WeekMenuCreateItemForm = ({onAfterSubmit, weekId, weekDayId}) => {
    const [form] = Form.useForm();
    const [store] = useStore();
    const createDishInWeek = useCreateDishInWeek();
    const onFinish = async (values) => {
        const {dish, dayPart, familyMember} = values;

        form.resetFields();

        await createDishInWeek(weekId, JSON.parse(dish), JSON.parse(dayPart), weekDayId, JSON.parse(familyMember));

        onAfterSubmit && onAfterSubmit();
    };

    return (
        <Form form={form} name={"create-week-dish" + weekDayId + weekId} layout="vertical" onFinish={onFinish} style={{marginTop: '30px'}}>
            <Form.Item
                name="dish"
                rules={[
                    {
                        required: true,
                        message: 'Обовʼязкове поле',
                    },
                ]}
            >
                <Select
                    placeholder="Вибери страву"
                    allowClear
                    showSearch
                >
                    {store.dishes.map((it) => <Option value={JSON.stringify(it.value)}> {it.name} </Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="dayPart"
                rules={[
                    {
                        required: true,
                        message: 'Обовʼязкове поле',
                    },
                ]}
            >
                <Select
                    placeholder="Вибери частину дня"
                    allowClear
                    showSearch
                >
                    {store.dayParts.map((it) => <Option value={JSON.stringify(it.value)}> {it.name} </Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="familyMember"
                rules={[
                    {
                        required: true,
                        message: 'Обовʼязкове поле',
                    },
                ]}
            >
                <Select
                    placeholder="Вибери для кого"
                    allowClear
                    showSearch
                >
                    {store.familyMembers.map((it) => <Option value={JSON.stringify(it.value)}> {it.name} </Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}