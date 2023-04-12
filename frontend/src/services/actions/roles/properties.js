import {
    UPDATE_ROWS_ROLES,
    EDIT_CELL_ROLES,
    SET_IS_ACTIVE_CONFIRMATION,
    LOAD_ROLES_PROPERTY,
    UPDATE_ROLES_NAME_PROPERTY
} from "../types"
import { setConfirmation } from "../../reducers/confirmation";
import Roles from "../../api/roles"

import NewRoleSavePopUp from "../../../pages/main/administration/roles/properties/newRoleSavePopUp";
import { loadTreeviewItem } from "../treeview/treeview"

import { uuidv4 } from "../../utils/uuidGenerator"

const refreshTreeView = () => dispatch => {
    dispatch(loadTreeviewItem(async (body, cancelToken) => {
        return await Roles.getAll(body, cancelToken);
    }, "ROLES_NAME"))
}

const loadRolesProperty = (ROLES_NAME = "", ROLES_ID = uuidv4().replace(/-/g, "")) => (dispatch, getState) => {
    const LAST_UPDATE_USER = getState().auth.user.email
    dispatch({
        type: LOAD_ROLES_PROPERTY,
        payload: {
            "LAYER_NAME": "KNOC",
            ROLES_ID,
            ROLES_NAME,
            LAST_UPDATE_USER
        }
    })
}

export const loadNewRolesSchema = () => async dispatch => {
    try {
        let res = await Roles.getType()
        let data = {}
        Promise.all(
            res.data.map(e => {
                let ROW_ID = uuidv4().replace(/-/g, "")
                data[ROW_ID] = { ...e, ROW_ID }
            })
        )
        dispatch({
            type: UPDATE_ROWS_ROLES,
            payload: data
        })
        dispatch(loadRolesProperty())

    } catch {

    }
}


export const editCell = (id, field, value) => async dispatch => {
    dispatch({
        type: EDIT_CELL_ROLES,
        payload: { id, field, value }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

export const changeRoleName = (value) => dispatch => {
    dispatch({
        type: UPDATE_ROLES_NAME_PROPERTY,
        payload: value
    })
}

export const updateRole = () => async (dispatch, getState) => {
    const ROLES = getState().roles.roles
    const PROPERTY = getState().roles.rows
    const body = JSON.stringify({ ROLES, PROPERTY: Object.values(PROPERTY) })
    let res = await Roles.saveRole(body)
    await dispatch(refreshTreeView())
    return true
}

const createRole = () => (dispatch, getState) => {
    dispatch(
        setConfirmation({
            title: "Specify a name for the role",
            body: <NewRoleSavePopUp />,
            agreefunction: async () => {
                await dispatch(updateRole());
                dispatch({
                    type: SET_IS_ACTIVE_CONFIRMATION,
                    payload: false
                })
            },
        })
    );
}



export const saveRole = () => async (dispatch, getState) => {
    const isNewRole = getState().treeview.selectedItem.selectedIndex
    const roleName = getState().roles.roles.ROLES_NAME
    try {
        if (isNewRole === -2)
            dispatch(createRole())
        else {
            dispatch(
                setConfirmation({
                    title: "Are you sure you want to save this ?",
                    body: `${roleName}`,
                    agreefunction: async () => {
                        await dispatch(updateRole())
                        dispatch({
                            type: SET_IS_ACTIVE_CONFIRMATION,
                            payload: false
                        })

                    },
                })
            );
        }

    } catch (err) {
        console.log(err);
    }
}

const loadRolesProperties = (ROLES_ID) => async dispatch => {
    try {
        const body = JSON.stringify({ ROLES_ID })
        let res = await Roles.getRoleProp(body)
        let data = {}
        Promise.all(
            res.data[0].PROPERTY_ID.map(e => {
                data[e.ROW_ID] = e
            })
        )
        dispatch({
            type: UPDATE_ROWS_ROLES,
            payload: data
        })
    } catch {

    }
}

export const loadRolesProps = () => async (dispatch, getState) => {
    const roleName = getState().treeview.selectedItem.ROLES_NAME
    const roleId = getState().treeview.selectedItem.ROLES_ID
    dispatch(loadRolesProperty(roleName, roleId))
    dispatch(loadRolesProperties(roleId))
}

export const deleteRole = () => async (dispatch, getState) => {
    const ROLES_ID = getState().treeview.selectedItem.ROLES_ID
    try {
        const body = JSON.stringify({ ROLES_ID })
        console.log(body);
        let res = await Roles.removeRole(body)
        dispatch(refreshTreeView())
    } catch {

    }

}