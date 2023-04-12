import { SET_LINKS_ACTIVE_ROLE, SET_LINKED_USERS_ROLE } from "../types"

import axios from "axios"

import Roles from "../../api/roles"

export const setIsActiveLink = (value) => dispatch => {
    dispatch({
        type: SET_LINKS_ACTIVE_ROLE,
        payload: value
    })
}

let cancelToken;
export const loadRoleLink = () => async (dispatch, getState) => {
    try {
        const ROLES_ID = getState().treeview.selectedItem.ROLES_ID
        const body = JSON.stringify({ ROLES_ID })
        if (cancelToken) {
            cancelToken.cancel()
        }
        cancelToken = axios.CancelToken.source();
        console.log(body);
        let res = await Roles.getRoleLink(body, cancelToken)
        dispatch({
            type: SET_LINKED_USERS_ROLE,
            payload: res.data
        })
    } catch {

    }
}

export const removeRole = (email) => async dispatch => {
    try {
        const body = JSON.stringify({ email })
        await Roles.removeRoleLink(body)
        dispatch(loadRoleLink())
    } catch {

    }
}

export const saveRoleLink = (user) => async (dispatch, getState) => {
    const role_id = getState().treeview.selectedItem.ROLES_ID
    try {
        let users = []
        console.log(user);
        Promise.all(user.map(e => {
            users.push(e.email)
        }))
        const body = JSON.stringify({
            role_id,
            users
        })
        console.log(body);
        await Roles.updateRoleLink(body)
        dispatch(loadRoleLink())
    } catch (err) {
        console.log(err);
    }
}