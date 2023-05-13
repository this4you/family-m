import {useStore} from "../store";
import {createProduct} from "../repositories/createProduct";

export const useCreateProduct =  () => {
    const [_, dispatch] = useStore();
    return async (name) => {
        const newProduct = await createProduct(name)

        if (!newProduct?.data[0]?.id) {
            console.log('ERROR IN CREATE PRODUCT PROCESS');
            return;
        }

        dispatch({
            type: 'ADD_PRODUCT',
            payload: {
                name: name,
                value: newProduct.data[0],
            }
        });
    }
}