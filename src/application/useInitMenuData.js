import {getWeekDays} from "../repositories/getWeekDays";
import {useStore} from "../store";
import {useEffect} from "react";
import {getDayParts} from "../repositories/getDayParts";
import {getDishes} from "../repositories/getDishes";
import {getFamilyMembers} from "../repositories/getFamilyMembers";
import {getProducts} from "../repositories/getProducts";

export const useInitMenuData = () => {
    const [_, dispatch] = useStore();

    async function initWeekDays() {
        const weekDays = await getWeekDays();

        if (!weekDays) {
            console.log("No week days data");
        }

        dispatch({
            type: 'SET_WEEK_DAYS',
            payload: weekDays.map(it => ({
                value: it,
                name: it.name
            }))
        });
    }
    async function initDayParts() {
        const dayParts = await getDayParts();

        if (!dayParts) {
            console.log("No day parts data");
        }

        dispatch({
            type: 'SET_DAY_PARTS',
            payload: dayParts.map(it => ({
                value: it,
                name: it.name
            }))
        });
    }
    async function initDishes() {
        const dishes = await getDishes();

        if (!dishes) {
            console.log("No dishes data");
        }

        dispatch({
            type: 'SET_DISHES',
            payload: dishes.map(it => ({
                value: it,
                name: it.name
            }))
        });
    }
    async function initFamilyMembers() {
        const familyMembers = await getFamilyMembers();

        if (!familyMembers) {
            console.log("No family members data");
        }

        dispatch({
            type: 'SET_FAMILY_MEMBERS',
            payload: familyMembers.map(it => ({
                value: it,
                name: it.name
            }))
        });
    }
    async function initProducts() {
        const products = await getProducts();

        if (!products) {
            console.log("No products data");
        }

        dispatch({
            type: 'SET_PRODUCTS',
            payload: products.map(it => ({
                value: it,
                name: it.name
            }))
        });
    }

    useEffect(() => {
        initWeekDays();
        initDayParts();
        initDishes();
        initProducts();
        initFamilyMembers();
    }, [])
}