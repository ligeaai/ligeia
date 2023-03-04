import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    LOAD_DRAWER_MENU,
    DRAWER_MENU_SET_OPEN
} from "../types"

import DrawerMenu from "../../api/couch/drawerMenu";
export const loadDrawerMenu = () => async (dispatch, getState) => {

    try {
        let res = await DrawerMenu.get()

        dispatch({
            type: LOAD_DRAWER_MENU,
            payload: res.data.CONTENTS
        })

    } catch (err) {
        console.log(err);
    }
}

export const setSelectedDrawerItem = (payload) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_DRAWER_ITEM,
        payload: payload
    })
}

export const toggleDrawerMenu = () => async (dispatch) => {
    dispatch({
        type: TOGGLE_DRAWER_MENU
    })
}

export const setOpenTab = (itemId) => dispatch => {
    dispatch({
        type: DRAWER_MENU_SET_OPEN,
        payload: itemId
    })
}
