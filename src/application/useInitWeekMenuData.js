import {useStore} from "../store";
import {useEffect} from "react";
import {getDishInWeek} from "../repositories/dishInWeek";

export const useInitWeekMenuData = (weekId) => {
    const [_, dispatch] = useStore();
    async function initWeekMenuData() {
        const weekMenuData = await getDishInWeek(weekId);

        if (!weekMenuData) {
            console.log("No week data");
        }

        dispatch({
            type: 'SET_WEEK_DISHES',
            payload: weekMenuData.map(it => {
                return {
                    id: it.id,
                    weekDayId: it.weekDayId,
                    dish: it.dish.name,
                    dayPart: it.day_part.name,
                    familyMember: it.family_member.name
                };
            })
        });
    }

    useEffect(() => {
        initWeekMenuData();
    }, [])
}