import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./authReducer";

const localStorageUser = localStorage.getItem("user");
let userParser;
try {
    userParser = localStorageUser !== null ? JSON.parse(localStorageUser) : null;
} catch (err) {
    userParser = null;
}

const INITAL_STATE = {
    user: userParser,
    isFectching: false,
    error: false,
}

export const AuthContext = createContext(INITAL_STATE)

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITAL_STATE)

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isFectching: state.isFectching,
            error: state.error,
            dispatch
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}