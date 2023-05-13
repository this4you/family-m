import React, {createContext, useContext, useReducer} from "react";
import reducer from './reducer'


const initialState = {
    weekId: 1,
    dishes: [],
    weekDishes: [],
    dayParts: [],
    weekDays: [],
    familyMembers: [],
    products: [],
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

const Context = createContext(initialState);

export const useStore = () => useContext(Context);
export default Store;