import { IUser } from "../../interfaces/IUser";

export const loginStart = () => ({
  type: "LOGIN_START",
});

export const loginSuccess = (user: IUser) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const loginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const logout = () => ({
  type: "LOGOUT",
});
