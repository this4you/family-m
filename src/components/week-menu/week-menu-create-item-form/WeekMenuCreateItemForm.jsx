import React, {useEffect, useState} from 'react';
import {Form, Select} from "antd";
import {getFamilyMembers} from "../../../repositories/getFamilyMembers";
import {getDayParts} from "../../../repositories/getDayParts";
import {getDishes} from "../../../repositories/getDishes";
import {createDishInWeek} from "../../../repositories/dishInWeek";

const {Option} = Select;

export const WeekMenuCreateItemForm = ({onAfterSubmit, weekId, weekDayId}) => {
    const [form] = Form.useForm();
    const [familyMembers, setFamilyMembers] = useState([]);
    const [dayParts, setDayParts] = useState([]);
    const [dishes, setDishes] = useState([]);

    useEffect(() => {
        getFamilyMembers().then(data => {
            if (!data) {
                console.log("No family members data");
            }

            setFamilyMembers(data.map(it => ({
                value: it.id,
                name: it.name
            })));
        });

        getDayParts().then(data => {
            if (!data) {
                console.log("No day parts data");
            }

            setDayParts(data.map(it => ({
                value: it.id,
                name: it.name
            })));
        });

        getDishes().then(data => {
            if (!data) {
                console.log("No dishes data");
            }

            setDishes(data.map(it => ({
                value: it.id,
                name: it.name
            })));
        });
    }, []);
    const onFinish = async (values) => {
        console.log('Finish:', values);
        const {dishId, dayPartId, familyMemberId} = values;
        form.resetFields();

        await createDishInWeek(weekId, dishId, dayPartId, weekDayId, familyMemberId);

        onAfterSubmit && onAfterSubmit();
    };

    return (
        <Form form={form} name="create-week-dish" layout="vertical" onFinish={onFinish} style={{marginTop: '30px'}}>
            <Form.Item
                name="dishId"
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
                    {dishes.map((it) => <Option value={it.value}> {it.name} </Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="dayPartId"
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
                    {dayParts.map((it) => <Option value={it.value}> {it.name} </Option>)}
                </Select>
            </Form.Item>
            <Form.Item
                name="familyMemberId"
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
                    {familyMembers.map((it) => <Option value={it.value}> {it.name} </Option>)}
                </Select>
            </Form.Item>
        </Form>
    )
}