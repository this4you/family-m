import {supabase} from "../infrastructure/api";
export const getWeekProductList = async () => {
    const {data}= await supabase
        .from('weekproductlist')
        .select('*');

    return data;
}