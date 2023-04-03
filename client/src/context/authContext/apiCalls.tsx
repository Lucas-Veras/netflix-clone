import { IAction } from "../../interfaces/IAuthReducer";
import { IUserLogin } from "../../interfaces/IUser";
import { api } from "../../services/api";
import { loginFailure, loginStart, loginSuccess } from "./authActions";

export const loginDispatch = async (
  user: IUserLogin,
  dispatch: React.Dispatch<IAction>,
) => {
  dispatch(loginStart());
  try {
    const res = await api.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
    return res.data;
  } catch (err : any) {
    dispatch(loginFailure());
    return err.response.data.errors;
  }
};
