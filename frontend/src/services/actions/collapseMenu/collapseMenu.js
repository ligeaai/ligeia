import { LOAD_COLLAPSABLE_MENU_ITEMS, SET_SELECTED_COLLAPSE_MENU_ITEM } from "../types"


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