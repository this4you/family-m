import {supabase} from "../infrastructure/api";

export const getDishInWeek = async () => {
    const {data} = await supabase
        .from('dish_in_week')
        .select(`
                id,
                weekDayId, 
                dish (id, name),
                day_part (id, name),
                family_member (id, name)
            `);

    return data;
}

export const createDishInWeek = async (weekId, dishId, dayPartId, weekDayId, familyMemberId) => {
     await supabase
        .from('dish_in_week')
        .insert([
            { weekId, dishId, dayPartId, weekDayId, familyMemberId },
        ])
}