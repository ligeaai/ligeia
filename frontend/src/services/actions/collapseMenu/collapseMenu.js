import { LOAD_COLLAPSABLE_MENU_ITEMS, SET_SELECTED_COLLAPSE_MENU_ITEM, LOAD_TREE_VIEW_WIDTH, UPDATE_TREE_VIEW_WIDTH_HIERARCHY } from "../types"

import { config, instance } from "../../couchApi"
export const loadCollapseMenu = (path) => async dispatch => {
    try {
        let res = await path();

        dispatch({
            type: LOAD_COLLAPSABLE_MENU_ITEMS,
            payload: res.data
        });
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

    } catch (err) {
        console.log(err);
    }
}