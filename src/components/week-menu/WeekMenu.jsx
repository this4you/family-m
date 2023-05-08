import './styles.css';
import {WeekMenuItem} from "./week-menu-item/WeekMenuItem";
import {useEffect, useState} from "react";
import {getDishInWeek} from "../../repositories/dishInWeek";
import {getWeekDays} from "../../repositories/getWeekDays";

export const WeekMenu = () => {
    const [weekData, setWeekData] = useState([]);
    const [weekDishesData, setDishesData] = useState([]);

    useEffect(() => {
        getDishInWeek()
            .then((data) => {
                if (!data) {
                    console.log("No week data");

                    return;
                }
                setDishesData(data.map(it => {
                    return {
                        id: it.id,
                        weekDayId: it.weekDayId,
                        dish: it.dish.name,
                        dayPart: it.day_part.name,
                        familyMember: it.family_member.name
                    };
                }));
            });

        getWeekDays()
            .then((data) => {
                if (!data) {
                    console.log("No week days data");

                    return;
                }
                setWeekData(data);
            });

    }, [])

    return (
        <div className="week-menu">
            {weekData.map(it => <WeekMenuItem
                key={it.id}
                dayId={it.id}
                weekId={1} //TODO should be changed to dynamic
                dayName={it.name}
                data={weekDishesData.filter(wdd => wdd.weekDayId === it.id)}
            />)}
        </div>
    )
}