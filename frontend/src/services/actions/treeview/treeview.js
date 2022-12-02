import {
    LOAD_TREEVIEW_ITEMS,
    SELECT_TREEVIEW_ITEM,
    CLEAN_TREEVIEW_SELECT,
    LOAD_FILTERED_TREEVIEW_ITEM,
    SET_FILTERED_LAYER_NAME,
    CLEAN_AFTER_SAVE,
    CLEAN_TREEVIEW
} from "../types"

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

export const loadTreeviewItem = (path, sortPath) => async (dispatch, getState) => {
    const CULTURE = getState().lang.cultur;
    const body = JSON.stringify({ CULTURE });
    let res;
    try {
        let res = await path(body);
        var sortedResponse = res.data.sort((a, b) =>
            a[sortPath] > b[sortPath] ? 1 : -1
        )
        dispatch({
            type: LOAD_TREEVIEW_ITEMS,
            payload: sortedResponse
        });
        dispatch(loadFilteredTreeviewItem())
        return res
    } catch (err) {
        return err
    }
}



export const selectTreeViewItem = (index, breadcrumbPath) => async (dispatch, getState) => {
    const goFunction = () => {
        var payload = getState().treeview.filteredMenuItem[parseInt(index)]

        payload = { ...payload, selectedIndex: index }
        dispatch({
            type: SELECT_TREEVIEW_ITEM,
            payload: payload
        });
        dispatch({
            type: CLEAN_AFTER_SAVE,
        })
        myHistoryPush(3, payload[breadcrumbPath].toLowerCase())
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

export const cleanTreeview = () => dispatch => {
    dispatch({
        type: CLEAN_TREEVIEW,
    })
}