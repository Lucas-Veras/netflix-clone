import UserReducer from "./userReducer"
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    users: [],
    isFectching: false,
    error: false,
}

export const UserContext = createContext(INITIAL_STATE)

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE)

    return (
        <UserContext.Provider value={{
            users: state.users,
            isFectching: state.isFectching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </UserContext.Provider>
    )
}