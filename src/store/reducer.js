export default (state, action) => {
    const newState = (() => {
        switch (action.type) {
            case 'SET_DISHES':
                return {
                    ...state,
                    dishes: action.payload
                };
            case 'SET_WEEK_ID':
                return {
                    ...state,
                    weekId: action.payload
                };
            case 'SET_WEEK_DAYS':
                return {
                    ...state,
                    weekDays: action.payload
                };
            case 'SET_DAY_PARTS':
                return {
                    ...state,
                    dayParts: action.payload
                };
            case 'SET_FAMILY_MEMBERS':
                return {
                    ...state,
                    familyMembers: action.payload
                };
            case 'SET_PRODUCTS':
                return {
                    ...state,
                    products: action.payload
                };
            case 'SET_WEEK_DISHES':
                return {
                    ...state,
                    weekDishes: action.payload
                };

            case 'ADD_WEEK_DISH':
                return {
                    ...state,
                    weekDishes: state.weekDishes.concat([action.payload])
                };
            case 'DELETE_WEEK_DISH':
                return {
                    ...state,
                    weekDishes: state.weekDishes.filter(it => it.id !== action.payload)
                };
            case 'DELETE_PRODUCT':
                return {
                    ...state,
                    products: state.products.filter(it => it.value.id !== action.payload)
                };
            case 'UPDATE_PRODUCT':
                return {
                    ...state,
                    products: state.products.map(it => {
                        if (it.value.id === action.payload.id) {
                            return {...it, name: action.payload.name}
                        } else {
                            return it;
                        }
                    })
                };
            default:
                return state;
        }
    })();
    console.log('NEW STATE', newState);

    return newState;
};
