import {supabase} from "../infrastructure/api";

export const getProducts = async () => {
    const {data} = await supabase
        .from('product')
        .select('*');

    return data;
}