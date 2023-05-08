import {supabase} from "../infrastructure/api";
export const getDishes = async () => {
    const {data} = await supabase
        .from('dish')
        .select('*');

    return data;
}