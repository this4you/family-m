import {supabase} from "../infrastructure/api";

export const createDish = async (name) => {
    return await supabase
        .from('dish')
        .insert([
            {name},
        ])
        .select()
}