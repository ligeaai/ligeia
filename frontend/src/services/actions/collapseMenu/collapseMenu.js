import { LOAD_COLLAPSABLE_MENU_ITEMS, SET_SELECTED_COLLAPSE_MENU_ITEM, LOAD_TREE_VIEW_WIDTH } from "../types"

import { config, instance } from "../../couchApi"
export const loadCollapseMenu = (path) => async dispatch => {
    try {
        let res = await path();

        dispatch({
            type: LOAD_COLLAPSABLE_MENU_ITEMS,
            payload: res.data
        });
        console.log(res.data);
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
    const treeViewWidth = getState().treeview.width
    treeViewWidth.values.overviewHierarchy = value
    const body = JSON.stringify({ ...treeViewWidth })
    try {
        let res = await instance
            .put(
                `/treeviewstate/${userId}`,
                body,
                config
            )
        treeViewWidth._rev = res.data.rev
        dispatch({
            type: LOAD_TREE_VIEW_WIDTH,
            payload: treeViewWidth
        })
        console.log(res);
    } catch (err) {
        console.log(err);
    }
}