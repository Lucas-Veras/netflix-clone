import { createContext, useReducer } from "react";
import ListReducer from "./listReducer"

const INITIAL_STATE = {
    lists: [],
    isFectching: false,
    error: false,
}

export const ListContext = createContext(INITIAL_STATE)

export const ListContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE)

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