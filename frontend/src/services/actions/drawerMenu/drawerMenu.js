import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    LOAD_DRAWER_MENU
} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';

let cancelToken;
export const loadDrawerMenu = () => async (dispatch, getState) => {
    const CULTURE = getState().lang.cultur
    const body = JSON.stringify({ CULTURE })
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    let res;
    try {
        let res = await instance
            .post(
                "/resource-list/menu/",
                body,
                config()
            )
        res.data.Configuration.Items.Items.URL = "/configuration/items"
        res.data.Configuration.Items.Tools.URL = "/configuration/initialize"
        dispatch({
            type: LOAD_DRAWER_MENU,
            payload: res.data
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
