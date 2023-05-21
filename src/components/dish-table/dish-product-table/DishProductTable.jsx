import {Button, Table} from 'antd';

export const DishProductTable = ({data}) => {
    console.log('DATA', data);
    const columns = [
        {
            title: 'Назва продукту',
            dataIndex: 'name',
            width: '50%'
        },
        {
            title: 'Кількість',
            dataIndex: 'amount',
            width: '50%'
        },

    ];
    return (
        <>
            <Table
                rowKey={record => record.id}
                dataSource={data}
                columns={[
                    ...columns,
                    {
                        title: '',
                        dataIndex: '',
                        key: 'delete',
                        render: ({id}) => {
                            return (<Button onClick={() => console.log(id)}>Видалити</Button>)
                        },
                    },
                ]}
                rowClassName="editable-row"
                pagination={false}
            />
        </>
    );
};
