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
            case 'ADD_PRODUCT':
                return {
                    ...state,
                    products: state.products.concat([action.payload])
                };
            case 'ADD_PRODUCT_ID_DISH':
                return {
                    ...state,
                    dishes: state.dishes.map(it => {
                        if (it.value.id === action.payload.dishId) {
                            return {
                                ...it, value: {
                                    ...it.value,
                                    product_in_dish: [
                                        ...it.value.product_in_dish,
                                        {
                                            id:  action.payload.id,
                                            amount: action.payload.amount,
                                            product: {
                                                id: action.payload.productId,
                                                name: state.products.find(it => it.value.id === action.payload.productId)?.name
                                            }
                                        }
                                    ]
                                }
                            }
                        } else {
                            return it;
                        }
                    })
                };
            case 'ADD_DISH':
                return {
                    ...state,
                    dishes: state.dishes.concat([action.payload])
                };
            case 'DELETE_WEEK_DISH':
                return {
                    ...state,
                    weekDishes: state.weekDishes.filter(it => it.id !== action.payload)
                };
            case 'DELETE_PRODUCT_IN_DISH':
                return {
                    ...state,
                    dishes: state.dishes.map(it => {
                        return {
                            ...it,
                            value: {
                                ...it.value,
                                product_in_dish: it.value.product_in_dish.filter(it => it.id !== action.payload)
                            }
                        }
                    })
                };
            case 'DELETE_PRODUCT':
                return {
                    ...state,
                    products: state.products.filter(it => it.value.id !== action.payload)
                };
            case 'DELETE_DISH':
                return {
                    ...state,
                    dishes: state.dishes.filter(it => it.value.id !== action.payload)
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
            case 'UPDATE_DISH':
                return {
                    ...state,
                    dishes: state.dishes.map(it => {
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
    console.log(`NEW STATE after action ${action.type}`, newState);

    return newState;
};
