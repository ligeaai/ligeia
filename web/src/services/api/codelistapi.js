import axios from "axios";
import { add_error } from '../actions/error';

const getAll = () => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });
    try {
        const temp = await axios.get(
            "http://localhost:8000/api/v1/code_list/code_list/",
            body,
            config,
        )
        return temp;
    } catch (err) {
        dispatch(add_error(err.message))
    }

};

const getWithLISTTYPE = (id) => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });
    try {
        const temp = await axios.get(
            `http://localhost:8000/api/v1/code_list/code_list/`,
            body,
            config,
        )
        return temp.data[id];
    } catch (err) {
        dispatch(add_error(err.message))
    }



};

const deleteCodeList = (id) => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify({ token: localStorage.getItem('token') });
    try {
        await axios.delete(
            `http://localhost:8000/api/v1/code_list/code_list/${id}`,
            body,
            config,
        )
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

const addCodeList = (data) => async dispatch => {
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
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
    let token = localStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `token ${token}`,
        }
    };
    const body = JSON.stringify(data);
    try {
        await axios.put(
            `http://localhost:8000/api/v1/code_list/code_list/${id}/`,
            body,
            config,
        )
    } catch (err) {
        dispatch(add_error(err.message))
    }
};

export { addCodeList, deleteCodeList, getAll, getWithLISTTYPE, updateCodeList };