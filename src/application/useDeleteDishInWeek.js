import { deleteDishInWeek} from "../repositories/dishInWeek";
import {useStore} from "../store";

export const useDeleteDishInWeek =  () => {
    const [_, dispatch] = useStore();
    return async (dishInWeekId) => {
        await deleteDishInWeek(dishInWeekId);

        dispatch({
            type: 'DELETE_WEEK_DISH',
            payload: dishInWeekId
        });
    }
}