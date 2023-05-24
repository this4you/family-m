import {useStore} from "../store";
import {createDish} from "../repositories/createDish";

export const useCreateDish =  () => {
    const [_, dispatch] = useStore();
    return async (name) => {
        const newDish = await createDish(name)

        if (!newDish?.data[0]?.id) {
            console.log('ERROR IN CREATE DISH PROCESS');
            return;
        }

        dispatch({
            type: 'ADD_DISH',
            payload: {
                name: name,
                value: newDish.data[0],
            }
        });
    }
}