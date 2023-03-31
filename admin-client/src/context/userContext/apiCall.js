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
    createUserSuccess,
    updateUserStart,
    updateUserFailure,
    updateUserSuccess,
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

export const getUser = async (id) => {
    try {
        const res = await api.get(`/users/find/${id}`, getHeaders())
        return res.data
    } catch (err) {
        return err.response.data.errors[0]
    }
}

export const createUser = async (user, dispatch) => {
    dispatch(createUserStart())
    try {
        const res = await api.post(`/auth/register`, user, getHeaders())
        dispatch(createUserSuccess(res.data))
        return res.data
    } catch (err) {
        dispatch(createUserFailure())
        return err.response.data.errors[0]
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

export const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart())
    try {
        const res = await api.put(`/users/${id}`, user, getHeaders())
        dispatch(updateUserSuccess(res.data))
        return res.data
    } catch (err) {
        dispatch(updateUserFailure())
        return err.response.data.errors[0]
    }
}