import {Table, Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useEffect} from "react";
import {supabase} from "../../../infrastructure/api";

const columns = [
    {
        title: 'Страва',
        dataIndex: 'dish',
        key: 'dish',
    },
    {
        title: 'Частина дня',
        dataIndex: 'dayPart',
        key: 'dayPart',
    },
    {
        title: 'Для кого',
        dataIndex: 'familyMember',
        key: 'familyMember',
    },
    {
        title: '',
        dataIndex: '',
        key: 'delete',
        render: () => <a>Delete</a>,
    },
];
export const WeekMenuItem = ({dayId, dayName, data}) => {

    return (
        <div className="week-menu">
            <div className="week-menu-item">
                <div style={{display: 'flex', alignItems:'center'}}>
                    <h4>{dayName}</h4>
                    <Button shape="circle" icon={<PlusCircleOutlined />} size={"small"} style={{marginLeft:'10px'}} />
                </div>
                <Table size="small" pagination={false} dataSource={data} columns={columns}/>
            </div>
        </div>
    )
}