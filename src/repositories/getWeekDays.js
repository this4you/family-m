import {supabase} from "../infrastructure/api";

let weekDays = null;
export const getWeekDays = async () => {
    if (weekDays) {
        return weekDays;
    }

    const {data} = await supabase
        .from('week_day')
        .select('*');

    weekDays = data;

    return weekDays;
}