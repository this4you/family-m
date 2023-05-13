import {supabase} from "../infrastructure/api";

export const updateProduct = async (id, name) => {
    const {data} = await supabase
        .from('product')
        .update({ name: name})
        .eq('id', id);

    return data;
}