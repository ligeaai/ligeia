import {
    ADD_CODELIST_SUCCESS,
    ADD_CODELIST_FAIL,
    CHANGE_OPEN,
    CLEAR_LISTTYPESCHEMA,
    CODELIST_DELETE_SUCCESS,
    CODELIST_DELETE_FAIL,
    CODELIST_UPDATE_SUCCESS,
    CODELIST_UPDATE_FAIL,
    GET_CODELIST_SUCCESS,
    GET_CODELIST_FAIL,
    GET_LISTTYPE_SUCCESS,
    GET_LISTTYPE_FAIL,
} from '../actions/types';

const initialState = {
    codeListSchema: false,
    listTypeSchema: false,
    isOpen: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CODELIST_SUCCESS:
            return { ...state, codeListSchema: payload }
        case GET_LISTTYPE_SUCCESS:
            return { ...state, listTypeSchema: payload }
        case CLEAR_LISTTYPESCHEMA:
            return { ...state, listTypeSchema: false, isOpen: false }
        case CHANGE_OPEN:
            return { ...state, isOpen: payload }
        default:
            return { ...state }
    }
}

