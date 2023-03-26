import { IUser } from "./IUser";

export interface IAuthState {
    user: any;
    isFectching: boolean;
    error: boolean;
    dispatch?: any
}

export interface IAction {
    type: any
    payload?: any;
}