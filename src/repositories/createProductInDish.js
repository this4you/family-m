import {supabase} from "../infrastructure/api";

export const createProductInDish = async (productId, dishId, amount) => {
    return await supabase
        .from('product_in_dish')
        .insert([
            {dishId, productId, amount},
        ])
        .select()
}