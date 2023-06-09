import {
    ADD_ERROR_SUCCESS,
    CLEAN_ERROR_SUCCESS,
} from './types';

export const add_error = (errMsg) => async dispatch => {
    dispatch({
        type: ADD_ERROR_SUCCESS,
        payload: errMsg
    })
};

export const clean_error = () => async dispatch => {
    dispatch({
        type: CLEAN_ERROR_SUCCESS,
    })
};
