import {
    LOAD_COLLAPSABLE_MENU_ITEMS,
    SET_SELECTED_COLLAPSE_MENU_ITEM,
    LOAD_TREE_VIEW_WIDTH,
    UPDATE_TREE_VIEW_WIDTH_HIERARCHY,
    SET_COLLAPSE_FILTER_MENU
} from "../types"

import axios from "axios"
import TreeView from "../../api/couch/treeView"
export const loadCollapseMenu = (path) => async dispatch => {
    try {
        let res = await path();
        console.log(res);
        dispatch({
            type: LOAD_COLLAPSABLE_MENU_ITEMS,
            payload: res.data
        });
        dispatch({
            type: SET_COLLAPSE_FILTER_MENU,
            payload: res.data
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const setSelectedCollapseMenu = async (value) => dispatch => {
    dispatch({
        type: SET_SELECTED_COLLAPSE_MENU_ITEM,
        payload: value
    })
}

export const updateCollapseMenuCouch = (value) => async (dispatch, getState) => {
    const userId = getState().auth.user.id
    dispatch({
        type: UPDATE_TREE_VIEW_WIDTH_HIERARCHY,
        payload: value
    })
    const treeViewWidth = getState().treeview.width
    const body = JSON.stringify({ ...treeViewWidth })
    try {
        let res = await TreeView.update(userId, body)

        treeViewWidth._rev = res.data.rev
        dispatch({
            type: LOAD_TREE_VIEW_WIDTH,
            payload: treeViewWidth
        })

    } catch (err) {
        console.log(err);
    }
}

export const overviewBreadcrumpGo = (items, path) => {
    let returnVal = "overview"
    function myFunc(myItems, index = 0, myPath) {
        Promise.all(myItems.map(e => {
            myPath += `/${e.FROM_ITEM_NAME}`
            if (myPath === path) {
                returnVal = { ...e, path: myPath }
            }
            if (e.CHILD) {
                myFunc(e.CHILD, index + 1, myPath)
            }
        }))
    }
    myFunc(items, 0, "overview")
    return returnVal
}
let cancelTokenFiler;
export const filterMenu = (text, path, body) => async (dispatch, getState) => {
    let res;
    let value;
    if (cancelTokenFiler) {
        cancelTokenFiler.cancel()
    }
    cancelTokenFiler = axios.CancelToken.source();
    try {
        res = await path(text, body, cancelTokenFiler);
        value = res.data;
        if (text === "") {
            value = getState().collapseMenu.menuItems
        }
    } catch (err) {
        console.log(err);
        value = getState().collapseMenu.menuItems
    }
    dispatch({
        type: SET_COLLAPSE_FILTER_MENU,
        payload: value
    })
}