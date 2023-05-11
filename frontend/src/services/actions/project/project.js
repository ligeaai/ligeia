import {
    UPDATE_DATA_PROJECT,
    LOAD_DATA_PROJECT,
    CLEAN_PROJECT
} from "../types"
import axios from "axios"
import { selectTreeViewItem, loadTreeviewItem } from "../treeview/treeview"
import ProjectService from "../../api/project"

export const updateData = (key, value) => (dispatch) => {
    dispatch({
        type: UPDATE_DATA_PROJECT,
        payload: { key, value }
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
        let res = await ProjectService.getItemValues(ROW_ID, cancelToken)
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
    const body = getState().workflow.data
    try {
        if (isNew === -2) {
            let res = await ProjectService.create(body)
        } else {
            let res = await ProjectService.update(body)
        }
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await ProjectService.getAll(body, cancelToken);
        }, "NAME"))
        return true

    } catch (err) {
        console.log(err);
    }
}
