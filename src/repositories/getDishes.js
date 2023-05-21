import {supabase} from "../infrastructure/api";
export const getDishes = async () => {
    const {data} = await supabase
        .from('dish')
        .select('id, name, product_in_dish(id, product(id, name), amount)');

    return data;
}