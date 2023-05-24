import {useStore} from "../store";
import {updateDish} from "../repositories/updateDish";

export const useUpdateDish =  () => {
    const [_, dispatch] = useStore();
    return async (id, name) => {
        await updateDish(id, name);

        dispatch({
            type: 'UPDATE_DISH',
            payload: {
                id: id,
                name: name,
            }
        });
    }
}