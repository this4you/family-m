import {supabase} from "../infrastructure/api";

export const deleteDish = async (id) => {
    return await supabase
        .from('dish')
        .delete()
        .eq('id', id);
}