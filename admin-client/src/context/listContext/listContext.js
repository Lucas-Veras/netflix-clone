import { createContext, useReducer } from "react";
import ListReducer from "./listReducer"

const INITAL_STATE = {
    lists: [],
    isFectching: false,
    error: false,
}

export const ListContext = createContext(INITAL_STATE)

export const ListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ListReducer, INITAL_STATE)

    return (
        <ListContext.Provider value={{
            lists: state.lists,
            isFectching: state.isFectching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </ListContext.Provider>
    )
}