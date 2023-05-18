import {
    UPDATE_DATA_PROJECT,
    LOAD_DATA_PROJECT,
    CLEAN_PROJECT,
    SET_DATABASES_PROJECT,
    SET_KUBERNETES_PROJECT,
    SET_IS_ACTIVE_CONFIRMATION
} from "../types"
import axios from "axios"

import { Chip } from "@mui/material"

import { selectTreeViewItem, loadTreeviewItem } from "../treeview/treeview"
import ProjectService from "../../api/project"

import { setLoaderTrue, setLoaderFalse } from "../loader"

export const updateData = (key, value) => (dispatch) => {
    dispatch({
        type: UPDATE_DATA_PROJECT,
        payload: { key, value }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

export const cleanProjectData = () => (dispatch) => {
    dispatch({
        type: CLEAN_PROJECT,
    })
}

let cancelToken;
export const loadProject = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID
    try {
        if (cancelToken) {
            cancelToken.cancel();
        }
        cancelToken = axios.CancelToken.source();
        const body = JSON.stringify({ ROW_ID })
        let res = await ProjectService.getItemValues(body, cancelToken)
        console.log(res.data);
        res.data[0].DB_SETTINGS = res.data[0].DB_SETTINGS.HOST
        dispatch({
            type: LOAD_DATA_PROJECT,
            payload: res.data[0]
        })
    } catch {

    }
}

export const deleteProject = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await ProjectService.remove(body)
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await ProjectService.getAll(body, cancelToken);
        }, "NAME"))
        dispatch(selectTreeViewItem(selectedIndex, "NAME"));
        return true
    }
    catch (err) {
    }
}

export const saveProject = () => async (dispatch, getState) => {
    const isNew = getState().treeview.selectedItem.selectedIndex
    const data = getState().project.data
    const kubernetes = getState().project.kubernetes
    const body = Object.assign({}, data);
    console.log(body);
    try {
        dispatch(setLoaderTrue())
        body.DB_SETTINGS = kubernetes.filter(e => e.HOST === body.DB_SETTINGS)[0]
        body.DB_SETTINGS.NAME = body.LAYER_NAME.toLowerCase();
        delete body.DB_SETTINGS.status
        console.log(body);
        if (isNew === -2) {
            let res = await ProjectService.create(body)
        } else {
            let res = await ProjectService.update(body)
        }
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await ProjectService.getAll(body, cancelToken);
        }, "NAME"))
        dispatch(setLoaderFalse())
        return true

    } catch (err) {
        dispatch(setLoaderFalse())
        console.log(err);
    }
}

export const loadDatabases = () => async dispatch => {
    try {
        let res = await ProjectService.databases()

        dispatch({
            type: SET_DATABASES_PROJECT,
            payload: res.data
        })
    } catch {

    }
}

export const loadKubernetes = () => async (dispatch, getState) => {
    try {
        const text = getState().project.data.DATA_SOURCE
        let res = await ProjectService.kubernetes(text)
        Promise.all(
            res.data.map(e => {
                e["NAME"] = <div>
                    <Chip
                        label={e.status ? "Success" : "Failed"}
                        variant="outlined"
                        size="small"
                        sx={{
                            color: e.status ? "green" : "red" + " !important",
                            borderColor: e.status ? "green" : "red" + " !important"
                        }}
                    />
                    {" "}
                    {e.HOST}
                </div>
            })
        )
        dispatch({
            type: SET_KUBERNETES_PROJECT,
            payload: res.data
        })
    } catch {

    }
}