import {Table, Button, Modal} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import {WeekMenuCreateItemForm} from "../week-menu-create-item-form/WeekMenuCreateItemForm";

const weekMenuItemTableColumns =  [
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
        render: () => <button>Delete</button>,
    },
];

export const WeekMenuItem = ({dayId, weekId, dayName, data}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const hideModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="week-menu">
            <div className="week-menu-item">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <h4>{dayName}</h4>
                    <Button onClick={showModal} shape="circle" icon={<PlusCircleOutlined/>} size={"small"}
                            style={{marginLeft: '10px'}}/>
                </div>
                <Table size="small" pagination={false} dataSource={data} columns={weekMenuItemTableColumns}/>
                <Modal
                    onCancel={hideModal}
                    title="Додати страву"
                    open={isModalOpen}
                    footer={[
                        <Button form="create-week-dish" key="submit" htmlType="submit">
                            Додати
                        </Button>
                    ]}
                >
                    <WeekMenuCreateItemForm
                        onAfterSubmit={hideModal}
                        weekId={weekId}
                        weekDayId={dayId}
                    />
                </Modal>
            </div>
        </div>
    )
}