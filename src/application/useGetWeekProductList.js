import {getWeekProductList} from "../repositories/getWeekProductList";

export const useGetWeekProductList = () => {
    return async () => {
        return await getWeekProductList();
    }
}