import {supabase} from "../infrastructure/api";

export const createProduct = async (name) => {
    return await supabase
        .from('product')
        .insert([
            {name},
        ])
        .select()
}