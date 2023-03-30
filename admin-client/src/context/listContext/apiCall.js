import { api } from "../../services/api"
import { getHeaders } from "../../utils/getHeaders"
import {
    getListsStart,
    getListsSuccess,
    getListsFailure,
    deleteListStart,
    deleteListFailure,
    deleteListSuccess,
    createListStart,
    createListFailure,
    createListSuccess
} from "./listActions"

export const getLists = async (dispatch) => {
    dispatch(getListsStart())
    try {
        const res = await api.get("/lists", getHeaders())
        dispatch(getListsSuccess(res.data))
    } catch (err) {
        dispatch(getListsFailure())
    }
}

export const createList = async (list, dispatch, Navigate) => {
    dispatch(createListStart())
    try {
        const res = await api.post(`/lists/`, list, getHeaders())
        dispatch(createListSuccess(res.data))
        Navigate("/lists")
    } catch (err) {
        dispatch(createListFailure())
    }
}

export const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart())
    try {
        await api.delete(`/lists/${id}`, getHeaders())
        dispatch(deleteListSuccess(id))
    } catch (err) {
        dispatch(deleteListFailure())
    }
}