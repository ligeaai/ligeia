import axios from "axios";
import { add_error } from './error';

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
} from './types';
let token = localStorage.getItem('token');
const config = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `token ${token}`,
    }
};
const body = JSON.stringify({ token: localStorage.getItem('token') });
const refreshList = (listtype) => async dispatch => {
    try {
        const temp = await axios.get(
            "http://localhost:8000/api/v1/code_list/code_list/",
            body,
            config,
        )
        let temporary = []
        Object.keys(temp.data).map((key, i) => {
            temporary.push({ ...temp.data[key][0] })
        })
        console.log(listtype);
        dispatch({
            type: GET_CODELIST_SUCCESS,
            payload: temporary
        })
        dispatch({
            type: GET_LISTTYPE_SUCCESS,
            payload: temp.data[listtype],
        })

    } catch (err) {
        dispatch(add_error(err.message))
    }
}
const clearlistTypeSchema = () => dispatch => {
    dispatch({
        type: CLEAR_LISTTYPESCHEMA
    })
}
const setIsOpen = (data) => dispatch => {
    dispatch({
        type: CHANGE_OPEN,
        payload: data
    })
}

const getAll = () => async dispatch => {
    try {
        const temp = await axios.get(
            "http://localhost:8000/api/v1/code_list/code_list/",
            body,
            config,
        )
        let temporary = []
        Object.keys(temp.data).map((key, i) => {
            temporary.push({ ...temp.data[key][0] })
        })
        dispatch({
            type: GET_CODELIST_SUCCESS,
            payload: temporary
        })
        return temp;
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

const getWithLISTTYPE = (listType) => async dispatch => {
    try {
        const temp = await axios.get(
            `http://localhost:8000/api/v1/code_list/code_list/`,
            body,
            config,
        )
        dispatch({
            type: GET_LISTTYPE_SUCCESS,
            payload: temp.data[listType],
        })
        return temp.data[listType];
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

const deleteCodeList = (id) => async dispatch => {
    try {
        const listtype = await axios.get(
            `http://localhost:8000/api/v1/code_list/code_list/${id}/`,
            body,
            config,
        )
        await axios.delete(
            `http://localhost:8000/api/v1/code_list/code_list/${id}`,
            body,
            config,
        )
        await dispatch(refreshList(listtype.data.LISTTYPE));
        return true;
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

const addCodeList = (data) => async dispatch => {
    const body = JSON.stringify(data);;
    try {
        await axios.post(
            `http://localhost:8000/api/v1/code_list/code_list/`,
            body,
            config,
        )
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

const updateCodeList = (id, data) => async dispatch => {
    const body = JSON.stringify(data);
    try {
        const listtype = await axios.get(
            `http://localhost:8000/api/v1/code_list/code_list/${id}/`,
            body,
            config,
        )
        await axios.put(
            `http://localhost:8000/api/v1/code_list/code_list/${id}/`,
            body,
            config,
        )
        await dispatch(refreshList(listtype.data.LISTTYPE))
        return true;
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

export { addCodeList, clearlistTypeSchema, deleteCodeList, getAll, getWithLISTTYPE, updateCodeList, setIsOpen };