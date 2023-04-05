import { api } from "../../services/api"
import { getHeaders } from "../../utils/getHeaders"
import {
    createMovieFailure,
    createMovieStart,
    createMovieSuccess,
    deleteMovieFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    getMoviesStart,
    getMoviesSuccess,
    getMoviesFailure
} from "./movieActions"

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    try {
        const res = await api.get("/movies", getHeaders())
        dispatch(getMoviesSuccess(res.data))
    } catch (err) {
        dispatch(getMoviesFailure())
    }
}

export const createMovie = async (movie, dispatch) => {
    dispatch(createMovieStart())
    try {
        const res = await api.post(`/movies/`, movie, getHeaders())
        dispatch(createMovieSuccess(res.data))
    } catch (err) {
        dispatch(createMovieFailure())
    }
}

export const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart())
    try {
        await api.delete(`/movies/${id}`, getHeaders())
        dispatch(deleteMovieSuccess(id))
    } catch (err) {
        dispatch(deleteMovieFailure())
    }
}