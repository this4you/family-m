import { deleteDishInWeek} from "../repositories/dishInWeek";
import {useStore} from "../store";
import {updateProduct} from "../repositories/updateProduct";

export const useUpdateProduct =  () => {
    const [_, dispatch] = useStore();
    return async (id, name) => {
        await updateProduct(id, name);

        dispatch({
            type: 'UPDATE_PRODUCT',
            payload: {
                id: id,
                name: name,
            }
        });
    }
}