import {
    LOAD_TREEVIEW_ITEMS,
    SELECT_TREEVIEW_ITEM,
    CLEAN_TREEVIEW_SELECT,
    LOAD_FILTERED_TREEVIEW_ITEM,
    SET_FILTERED_LAYER_NAME,
    CLEAN_AFTER_SAVE,
    CLEAN_TREEVIEW
} from "../types"

import axios from "axios"

import { confirmationPushHistory, myHistoryPush } from "../../utils/historyPush"
import { setGoFunctionConfirmation } from "../confirmation/historyConfirmation"


export const loadFilteredTreeviewItem = () => async (dispatch, getState) => {
    const treeMenuItem = getState().treeview.treeMenuItem
    const filteredLayerName = getState().treeview.filteredLayerName
    if (filteredLayerName !== "NONE") {
        var filteredResponse = treeMenuItem.filter(a => a.LAYER_NAME === filteredLayerName)
        dispatch({
            type: LOAD_FILTERED_TREEVIEW_ITEM,
            payload: filteredResponse
        })
    } else {
        dispatch({
            type: LOAD_FILTERED_TREEVIEW_ITEM,
            payload: treeMenuItem
        })
    }
}
let cancelToken;
export const loadTreeviewItem = (path, sortPath) => async (dispatch, getState) => {
    const CULTURE = getState().lang.cultur;
    const body = JSON.stringify({ CULTURE });
    try {
        if (cancelToken) {
            cancelToken.cancel()
        }
        cancelToken = axios.CancelToken.source();
        let res = await path(body, cancelToken);
        var sortedResponse;
        if (sortPath === "TYPE") {//todo need to change api end point 
            sortedResponse = res.data.Message.sort((a, b) =>
                a[sortPath] > b[sortPath] ? 1 : -1
            )
        } else {
            sortedResponse = res.data.sort((a, b) =>
                a[sortPath] > b[sortPath] ? 1 : -1
            )
        }

        dispatch({
            type: LOAD_TREEVIEW_ITEMS,
            payload: sortedResponse
        });
        dispatch(loadFilteredTreeviewItem())
        return Promise.resolve(res.data)
    } catch (err) {
        dispatch(await cleanTreeview())
        return Promise.reject(err)
    }
}



export const selectTreeViewItem = (index, breadcrumbPath) => async (dispatch, getState) => {
    const goFunction = () => {
        if (index === -2) {
            dispatch({
                type: SELECT_TREEVIEW_ITEM,
                payload: { selectedIndex: -2 }
            });
            dispatch(setGoFunctionConfirmation(() => { }));
            myHistoryPush(3, "new")
        } else {
            if (index < 0) {
                index = getState().treeview.filteredMenuItem.length - 1
            }
            if (index >= getState().treeview.filteredMenuItem.length) {
                index = 0
            }
            var payload = getState().treeview.filteredMenuItem[parseInt(index)]

            payload = { ...payload, selectedIndex: index }
            console.log(payload);
            dispatch({
                type: SELECT_TREEVIEW_ITEM,
                payload: payload
            });
            dispatch({
                type: CLEAN_AFTER_SAVE,
            })
            myHistoryPush(3, payload[breadcrumbPath].toLowerCase())

        }
    }
    dispatch(setGoFunctionConfirmation(goFunction))
    dispatch(confirmationPushHistory())
}

export const cleanTreeMenuSelect = () => dispatch => {
    dispatch({
        type: CLEAN_TREEVIEW_SELECT
    })
}

export const setFilteredLayerName = (layerName = "NONE") => dispatch => {
    dispatch({
        type: SET_FILTERED_LAYER_NAME,
        payload: layerName
    })
    // dispatch(cleanAllDataGrid())
    dispatch(cleanTreeMenuSelect())
    dispatch(loadFilteredTreeviewItem())
}

export const cleanTreeview = async () => async dispatch => {
    dispatch({
        type: CLEAN_TREEVIEW,
    })

}