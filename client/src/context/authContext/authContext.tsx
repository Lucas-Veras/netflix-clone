import { createContext, useEffect, useReducer } from "react";
import { IAuthState } from "../../interfaces/IAuthReducer";
import { getToken } from "../../utils/getToken";
import AuthReducer from "./authReducer";

const localStorageUser = localStorage.getItem("user");
let userParser;
try {
  userParser = localStorageUser !== null ? JSON.parse(localStorageUser) : null;
} catch (err) {
  userParser = null;
}

const INITIAL_STATE: IAuthState = {
  user: userParser,
  isFectching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFectching: state.isFectching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
