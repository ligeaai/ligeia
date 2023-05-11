import {
    UPDATE_DATA_WORKFLOW,
    SET_ITEMS_WORKFLOW,
    SET_CHECKET_ITEMS_WORKFLOW,
    SET_UPDATE_CHECKED_ITEMS_WORKFLOW,
    CLEAN_WORKFLOW,
    CLEAN_DATA_WORKFLOW,
    SET_TAGS_WORKFLOW,
    SET_CHECKED_TAGS_WORKFLOW,
    SET_UPDATE_CHECKED_TAGS_WORKFLOW,
    SET_IS_ACTIVE_CONFIRMATION,
    LOAD_DATA_WORKFLOW
} from "../types"
import axios from "axios"
import { selectTreeViewItem, loadTreeviewItem } from "../treeview/treeview"

import ItemService from "../../api/item"
import WorkflowService from "../../api/workflow"
import TagService from "../../api/tags"

export const cleanWorkflow = () => dispatch => {
    dispatch({
        type: CLEAN_WORKFLOW,
    })
}

export const cleanWorkflowData = () => dispatch => {
    dispatch({
        type: CLEAN_DATA_WORKFLOW,
    })
}
export const updateData = (key, value) => async dispatch => {
    dispatch({
        type: UPDATE_DATA_WORKFLOW,
        payload: { key, value }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

export const setItems = () => async (dispatch, getState) => {
    const type = getState().workflow.data?.TYPE
    try {
        let res = await ItemService.getAllItems(type);
        dispatch({
            type: SET_ITEMS_WORKFLOW,
            payload: res.data
        })
        dispatch(setCheckedItems())
    }
    catch { }
}

export const setCheckedItems = () => (dispatch, getState) => {
    const items = getState().workflow.items
    let temp = {}
    items.map(e => {
        temp[e.ITEM_ID] = false
    })
    dispatch({
        type: SET_CHECKET_ITEMS_WORKFLOW,
        payload: temp
    })
}

export const updateCheckedItems = (key, val) => (dispatch, getState) => {
    dispatch({
        type: SET_UPDATE_CHECKED_ITEMS_WORKFLOW,
        payload: { key, val },
    });
}

export const deleteWorkflow = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await WorkflowService.remove(body)
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await WorkflowService.getAll(body, cancelToken);
        }, "NAME"))
        dispatch(selectTreeViewItem(selectedIndex, "NAME"));
        return true
    }
    catch (err) {
    }
}

export const setTags = () => async (dispatch, getState) => {
    const item = getState().workflow.data?.ITEM_ID
    try {
        let temp = []
        Promise.all(item.map(e => {
            temp.push(e.ITEM_ID)
        }))
        const body = JSON.stringify(temp)
        let res = await TagService.workflow(body);
        console.log(body);
        console.log(res);
        dispatch({
            type: SET_TAGS_WORKFLOW,
            payload: res.data
        })
        dispatch(setCheckedTags())
    }
    catch { }
}

export const setCheckedTags = () => (dispatch, getState) => {
    const tags = getState().workflow.tags
    let temp = {}
    tags.map(e => {
        temp[e.TAG_ID] = false
    })
    dispatch({
        type: SET_CHECKED_TAGS_WORKFLOW,
        payload: temp
    })
}

export const updateCheckedTags = (key, val) => (dispatch, getState) => {
    dispatch({
        type: SET_UPDATE_CHECKED_TAGS_WORKFLOW,
        payload: { key, val },
    });
}

export const saveWorkflow = () => async (dispatch, getState) => {
    const isNew = getState().treeview.selectedItem.selectedIndex
    const body = getState().workflow.data
    try {
        if (isNew === -2) {
            let res = await WorkflowService.create(body)
        } else {
            let res = await WorkflowService.update(body)
        }
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await WorkflowService.getAll(body, cancelToken);
        }, "NAME"))
        return true

    } catch (err) {
        console.log(err);
    }
}

let cancelToken;
export const loadWorkflowProp = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID
    try {
        if (cancelToken) {
            cancelToken.cancel();
        }
        cancelToken = axios.CancelToken.source();
        let res = await WorkflowService.getItemValues(ROW_ID, cancelToken)
        console.log(res.data);
        dispatch({
            type: LOAD_DATA_WORKFLOW,
            payload: res.data[0]
        })
    } catch {

    }

}