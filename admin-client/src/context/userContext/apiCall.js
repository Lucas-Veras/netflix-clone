import { api } from "../../services/api"
import { getHeaders } from "../../utils/getHeaders"
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    createUserStart,
    createUserFailure,
    createUserSuccess
} from "./userActions"

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart())
    try {
        const res = await api.get("/users", getHeaders())
        dispatch(getUsersSuccess(res.data))
    } catch (err) {
        dispatch(getUsersFailure())
    }
}

export const createUser = async (user, dispatch, Navigate) => {
    dispatch(createUserStart())
    try {
        const res = await api.post(`/users/`, user, getHeaders())
        dispatch(createUserSuccess(res.data))
        Navigate("/users")
    } catch (err) {
        dispatch(createUserFailure())
    }
}

export const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart())
    try {
        await api.delete(`/users/${id}`, getHeaders())
        dispatch(deleteUserSuccess(id))
    } catch (err) {
        dispatch(deleteUserFailure())
    }
}