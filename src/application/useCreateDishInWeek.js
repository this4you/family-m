import {createDishInWeek} from "../repositories/dishInWeek";
import {useStore} from "../store";

export const useCreateDishInWeek =  () => {
    const [_, dispatch] = useStore();
    return async (weekId, dish, dayPart, weekDayId, familyMember) => {
        const newDish = await createDishInWeek(weekId, dish.id, dayPart.id, weekDayId, familyMember.id)

        if (!newDish?.data[0]?.id) {
            console.log('ERROR IN CREATE DISH FRO WEEK PROCESS');
            return;
        }

        dispatch({
            type: 'ADD_WEEK_DISH',
            payload: {
                id: newDish.data[0].id,
                dayPart: dayPart.name,
                dish: dish.name,
                familyMember: familyMember.name,
                weekDayId
            }
        });
    }
}