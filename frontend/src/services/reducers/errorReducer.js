import {
    ADD_ERROR_SUCCESS,
    ADD_ERROR_FAIL,
    CLEAN_ERROR_SUCCESS,
    CLEAN_ERROR_FAIL,
    SNACKBAR_ERROR
} from '../actions/types';

const initialState = {
    errMsg: "",
    isError: false,
    errType: "error"
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case ADD_ERROR_SUCCESS:
            return {
                ...state,
                errMsg: payload,
                isError: true
            }
        case SNACKBAR_ERROR:
            return {
                ...state,
                errMsg: payload.msg,
                isError: true,
                errType: payload.type
            }
        case CLEAN_ERROR_SUCCESS:
        case ADD_ERROR_FAIL:
            return {
                ...state,
                errMsg: "",
                isError: false,
                errType: "error"
            }
        case CLEAN_ERROR_FAIL:
            return {
                ...state
            }
        default:
            return state
    }
};
