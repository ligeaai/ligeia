import {
    LOAD_USERS_LIST,
    LOAD_LAYER_LIST_USERS,
    CLEAN_USERS,
    DELETE_USER,
    UPDATE_LAYER_USERS,
    LOAD_ROLES_LIST_USERS,
    SET_IS_ACTIVE_CONFIRMATION
} from "../types"

import Users from "../../api/users"

const getUsers = () => async dispatch => {
    let res = await Users.getAll()
    console.log(res.data);
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

const getRoles = () => async dispatch => {
    let res = await Users.getRoles()
    dispatch({
        type: LOAD_ROLES_LIST_USERS,
        payload: res.data
    })
}
export const loadUsers = () => dispatch => {
    try {
        dispatch(getUsers())
        dispatch(getLayers())
        dispatch(getRoles())
    } catch {

    }
}

export const saveUsers = () => async (dispatch, getState) => {
    const users = getState().users.users
    const deletedUsers = getState().users.deletedUsers
    const updatedUsers = getState().users.updatedUsers

    try {
        const body = JSON.stringify({ users: [...users.filter(e => updatedUsers.find(a => a === e.id))] })
        await Users.updateUser(body)
        const deleteBody = JSON.stringify({ users: deletedUsers })
        await Users.removeUser(deleteBody)
        dispatch(getUsers())
    } catch (err) {
        console.log(err);
    }
}

export const addNewUser = (body) => async dispatch => {
    try {
        console.log(body);
        let res = await Users.createUser(body)
        dispatch(getUsers())
    } catch {

    }
}

export const deleteUser = (id) => async dispatch => {
    dispatch({
        type: DELETE_USER,
        payload: id
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}
export const toggleLayer = (layer, id) => async (dispatch, getState) => {
    const users = getState().users.users
    users.filter(e => e.id === id)[0].layer_name.find(a => a === layer) !== undefined ?
        users.filter(e => e.id === id)[0].layer_name = users.filter(e => e.id === id)[0].layer_name.filter(c => c !== layer) :
        users.filter(e => e.id === id)[0].layer_name = [...users.filter(e => e.id === id)[0].layer_name, layer]

    dispatch({
        type: UPDATE_LAYER_USERS,
        payload: { users, id }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })

}

export const toggleRoles = (role, id) => async (dispatch, getState) => {
    const users = getState().users.users
    users.filter(e => e.id === id)[0].role = role.ROLES_ID
    dispatch({
        type: UPDATE_LAYER_USERS,
        payload: { users, id }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}


export const cleanUsers = () => dispatch => {
    dispatch({
        type: CLEAN_USERS
    })
}