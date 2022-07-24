import {FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS,
         FETCH_BOOKS_ERROR} from '../constant'
import axios from 'axios'

const fetchedLoading = () => {
    return {
        type: FETCH_BOOKS_LOADING
    }
}

const fetchedSuccesss = data => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: data
    }
}

const fetchedError = error => {
    return {
        type: FETCH_BOOKS_ERROR,
        payload: error
    }
}

const GOOGLE_API_KEY = 'AIzaSyBZbqFLsKJOUK1gwLLD9YNd9L7_0gsWO20';

export const fetchedBooks = title => {
    return dispatch => {
        dispatch(fetchedLoading());

        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_API_KEY}&maxResults=20`)
        .then(response => {
            dispatch(fetchedSuccesss(response.data.items))
        })
        .catch(error => {
            dispatch(fetchedError(error.message))
        })
    }
}