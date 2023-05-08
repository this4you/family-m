import {supabase} from "../infrastructure/api";

let dayParts = null;
export const getDayParts = async () => {
    if (dayParts) {
        return dayParts;
    }

    const {data} = await supabase
        .from('day_part')
        .select('*');

    dayParts = data;

    return dayParts;
}