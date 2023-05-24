import {useStore} from "../store";
import {createProductInDish} from "../repositories/createProductInDish";

export const useCreateProductInDish = () => {
    const [_, dispatch] = useStore();
    return async (productId, dishId, amount) => {
        const newProductInDish = await createProductInDish(productId, dishId, amount)

        if (!newProductInDish?.data[0]?.id) {
            console.log('ERROR IN CREATE PRODUCT IN DISH PROCESS');
            return;
        }


        dispatch({
            type: 'ADD_PRODUCT_ID_DISH',
            payload: newProductInDish.data[0],
        });
    }
}