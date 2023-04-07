import {
    LOAD_USERS_LIST,
    LOAD_LAYER_LIST_USERS,
    CLEAN_USERS
} from "../types"

import Users from "../../api/users"

const getUsers = () => async dispatch => {
    let res = await Users.getAll()
    dispatch({
        type: LOAD_USERS_LIST,
        payload: res.data
    })
}
const getLayers = () => async dispatch => {
    let res = await Users.getLayers()
    dispatch({
        type: LOAD_LAYER_LIST_USERS,
        payload: res.data
    })
}

export const loadUsers = () => dispatch => {
    try {
        dispatch(getUsers())
        dispatch(getLayers())
    } catch {

    }
}

export const updateUser = (user) => async dispatch => {
    try {
        const body = JSON.stringify({ users: [{ ...user }] })
        console.log(body);
        let res = await Users.updateUser(body)
        console.log(res);
        dispatch(getUsers())
    } catch (err) {
        console.log(err);
    }
}

export const cleanUsers = () => dispatch => {
    dispatch({
        type: CLEAN_USERS
    })
}