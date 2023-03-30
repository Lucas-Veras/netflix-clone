import { api } from "../../services/api"
import { loginFailure, loginStart, loginSuccess } from "./authActions"

export const loginDispatch = async (user, dispatch) => {
    dispatch(loginStart)
    try {
        const res = await api.post("/auth/login", user)
        if (res.data.isAdmin) {
            dispatch(loginSuccess(res.data))
            return 
        }
    } catch (err) {
        dispatch(loginFailure())
    }
}