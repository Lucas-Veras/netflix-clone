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


{/**
import MovieReducer from "./movieReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  movies: [],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

  return (
    <MovieContext.Provider
      value={{
        movies: state.movies,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
*/}