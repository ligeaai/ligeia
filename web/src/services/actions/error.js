import {
    ADD_ERROR_SUCCESS,
    ADD_ERROR_FAIL,
    CLEAN_ERROR_SUCCESS,
    CLEAN_ERROR_FAIL,
} from './types';

export const add_error = (errMsg) => async dispatch => {
    dispatch({
        type: ADD_ERROR_SUCCESS,
        payload: errMsg
    })
    setTimeout(() => {
        dispatch({
            type: CLEAN_ERROR_SUCCESS,
        })
    }, 3000)
};


export const clean_error = () => async dispatch => {
    dispatch({
        type: CLEAN_ERROR_SUCCESS,
    })
};
