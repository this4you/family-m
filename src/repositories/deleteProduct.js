import {supabase} from "../infrastructure/api";

export const deleteProduct = async (id) => {
    return await supabase
        .from('product')
        .delete()
        .eq('id', id);
}