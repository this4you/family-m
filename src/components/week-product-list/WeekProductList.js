import React, {useEffect, useState} from 'react';
import {useGetWeekProductList} from "../../application/useGetWeekProductList";
import {Button, Table} from "antd";

export const WeekProductList = () => {
    const [weekProductList, setWeekProductList] = useState([]);
    const [loading, setLoading] = useState(false);
    const getWeekProductList = useGetWeekProductList();

    const loadWeekProductList = async () => {
        setLoading(true);

        try {
            const data = await getWeekProductList();

            if (!data) {
                return;
            }

            setWeekProductList(data);
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadWeekProductList();
    }, []);

    const columns = [
        {
            title: 'Продукт',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Кількість',
            dataIndex: 'amount',
            key: 'amount',
        }
    ];

    return (
        <>
            <Button type={'primary'} onClick={loadWeekProductList}>Оновити</Button>
            <Table
                dataSource={weekProductList}
                columns={columns}
                pagination={false}
                rowKey={record => record.id}
                loading={loading}
            />
        </>
    );
}