export default (state, action) => {
    console.log(state);
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
        default:
            return state;
    }
};
