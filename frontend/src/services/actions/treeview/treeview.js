import {
    LOAD_TREEVIEW_ITEMS,
    SELECT_TREEVIEW_ITEM,
    CLEAN_TREEVIEW_SELECT,
    LOAD_FILTERED_TREEVIEW_ITEM,
    SET_FILTERED_LAYER_NAME,
    CLEAN_AFTER_SAVE,
    CLEAN_TREEVIEW,
    LOAD_TREE_VIEW_WIDTH
} from "../types"

import axios from "axios"

import { confirmationPushHistory, myHistoryPush } from "../../utils/historyPush"
import { setGoFunctionConfirmation } from "../confirmation/historyConfirmation"
import { config, instance } from "../../couchApi"
export const loadTreeViewWidth = async (path) => async (dispatch, getState) => {
    const userId = getState().auth.user.id
    let res = await instance
        .get(
            `/treeviewstate/${userId}`,
            config
        )
    dispatch({
        type: LOAD_TREE_VIEW_WIDTH,
        payload: res.data
    })
    return Promise.resolve(res.data.values)
}

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
        console.log(res);
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
    const filteredMenuLength = getState().treeview.filteredMenuItem.length
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
                index = filteredMenuLength - 1
            }
            if (index >= filteredMenuLength) {
                index = 0
            }
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

export const updateTreeViewCouch = (path, value) => async (dispatch, getState) => {
    const userId = getState().auth.user.id
    const width = getState().treeview.width
    width.values[path] = value
    const body = JSON.stringify({ ...width })
    console.log(body);
    try {
        let res = await instance
            .put(
                `/treeviewstate/${userId}`,
                body,
                config
            )
        width._rev = res.data.rev
        dispatch({
            type: LOAD_TREE_VIEW_WIDTH,
            payload: width
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}
export const createTreeViewCouch = () => async (dispatch, getState) => {
    const userId = getState().auth.user.id
    const body = JSON.stringify({
        _id: userId.toString(),
        values: {
            overview: 250,
            codelist: 250,
            item: 250,
            resources: 250,
            types: 250,
            tags: 250,
            overviewHierarchy: ["1"]
        }
    })
    console.log(body);
    try {
        await instance
            .post(
                "/treeviewstate/",
                body,
                config
            )

    } catch (err) {
        console.log(err);
    }
}
