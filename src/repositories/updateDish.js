import {supabase} from "../infrastructure/api";

export const updateDish = async (id, name) => {
    const {data} = await supabase
        .from('dish')
        .update({ name: name})
        .eq('id', id);

    return data;
}