import './styles.css';
import {WeekMenuItem} from "./week-menu-item/WeekMenuItem";
import {useStore} from "../../store";
import {useInitMenuData} from "../../application/useInitMenuData";
import {useInitWeekMenuData} from "../../application/useInitWeekMenuData";

export const WeekMenu = () => {
    const [store] = useStore();

    useInitMenuData();
    useInitWeekMenuData(1);


    return (
        <div className="week-menu">
            {store.weekDays.map(it => <WeekMenuItem
                key={it.value.id}
                dayId={it.value.id}
                weekId={store.weekId}
                dayName={it.name}
                data={store.weekDishes.filter(wdd => wdd.weekDayId === it.value.id)}
            />)}
        </div>
    )
}