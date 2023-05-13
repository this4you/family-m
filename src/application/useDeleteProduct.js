import {useStore} from "../store";
import {deleteProduct} from "../repositories/deleteProduct";

export const useDeleteProduct =  () => {
    const [_, dispatch] = useStore();
    return async (id) => {
        await deleteProduct(id);

        dispatch({
            type: 'DELETE_PRODUCT',
            payload: id
        });
    }
}