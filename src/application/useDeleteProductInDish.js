import {useStore} from "../store";
import {deleteProductInDish} from "../repositories/deleteProductInDish";

export const useDeleteProductInDish =  () => {
    const [_, dispatch] = useStore();
    return async (productInDishId) => {
        await deleteProductInDish(productInDishId);

        dispatch({
            type: 'DELETE_PRODUCT_IN_DISH',
            payload: productInDishId
        });
    }
}