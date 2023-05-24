import {useStore} from "../store";
import {deleteDish} from "../repositories/deleteDish";

export const useDeleteDish =  () => {
    const [_, dispatch] = useStore();
    return async (id) => {
        await deleteDish(id);

        dispatch({
            type: 'DELETE_DISH',
            payload: id
        });
    }
}