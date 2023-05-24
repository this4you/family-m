import {supabase} from "../infrastructure/api";

export const deleteProductInDish = async (id) => {
    return await supabase
        .from('product_in_dish')
        .delete()
        .eq('id', id);
}