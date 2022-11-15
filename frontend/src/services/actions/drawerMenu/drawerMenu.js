import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    MOUSE_ENTER_DRAWER,
    MOUSE_LEAVE_DRAWER,
    LOAD_DRAWER_MENU
} from "../types"

import { instance, config } from '../../baseApi';

export const loadDrawerMenu = () => async (dispatch, getState) => {
    const CULTURE = getState().lang.cultur
    const body = JSON.stringify({ CULTURE })
    console.log(body);
    try {
        let res = await instance
            .post(
                "/resource-list/menu/",
                body,
                config
            )
        res.data.Configuration.Items.Items.URL = "/configuration/items"
        res.data.Configuration.Items.Tools.URL = "/configuration/initialize"
        dispatch({
            type: LOAD_DRAWER_MENU,
            payload: res.data
        })

    } catch (err) {
        console.log(err);
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


// export const mouseEnterDrawer = () => async (dispatch) => {
//     dispatch({
//         type: MOUSE_ENTER_DRAWER
//     })
// }
// export const mouseLeaveDrawer = () => async (dispatch) => {
//     dispatch({
//         type: MOUSE_LEAVE_DRAWER
//     })
// }
