import {Button, Table} from 'antd';
import {useDeleteProductInDish} from "../../../application/useDeleteProductInDish";

export const DishProductTable = ({data}) => {
    const deleteProductInDish = useDeleteProductInDish();
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
                            return (<Button onClick={() => deleteProductInDish(id)}>Видалити</Button>)
                        },
                    },
                ]}
                rowClassName="editable-row"
                pagination={false}
            />
        </>
    );
};
