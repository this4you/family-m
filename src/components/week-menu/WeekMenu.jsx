import './styles.css';
import {WeekMenuItem} from "./week-menu-item/WeekMenuItem";
import {useEffect, useState} from "react";
import {supabase} from "../../infrastructure/api";

export const WeekMenu = () => {
    const [weekData, setWeekData] = useState([]);
    const [weekDishesData, setDishesData] = useState([]);

    useEffect(() => {
        supabase
            .from('dish_in_week')
            .select(`
                id,
                weekDayId, 
                dish (id, name),
                day_part (id, name),
                family_member(id, name)
            `)
            .then(({data}) => {
                console.log(data);
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
        supabase
            .from('week_day')
            .select('*')
            .then(({data}) => {
                setWeekData(data);
            });

    }, [])

    return (
        <div className="week-menu">
            {weekData.map(it => <WeekMenuItem
                key={it.id}
                dayId={it.id}
                dayName={it.name}
                data={weekDishesData.filter(wdd => wdd.weekDayId === it.id)}
            />)}
        </div>
    )
}