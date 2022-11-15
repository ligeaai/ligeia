import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    MOUSE_ENTER_DRAWER,
    MOUSE_LEAVE_DRAWER,
    LOAD_DRAWER_MENU
} from "../types"

import { instance, config } from '../../baseApi';

export const loadDrawerMenu = () => async (dispatch) => {
    try {
        let res = await instance
            .get(
                "/resource-list/menu/",
                config
            )
        res.data[5].Items.Items.URL = "/configuration/items"
        res.data[5].Items.Tools.URL = "/configuration/initialize"
        dispatch({
            type: LOAD_DRAWER_MENU,
            payload: res.data
        })

    } catch (err) {
        return err
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


export const mouseEnterDrawer = () => async (dispatch) => {
    dispatch({
        type: MOUSE_ENTER_DRAWER
    })
}
export const mouseLeaveDrawer = () => async (dispatch) => {
    dispatch({
        type: MOUSE_LEAVE_DRAWER
    })
}
