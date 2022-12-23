import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    LOAD_DRAWER_MENU
} from "../types"

import axios from "axios";
import { instance, config } from '../../couchApi';

export const loadDrawerMenu = () => async (dispatch, getState) => {

    try {
        let res = await instance
            .get(
                "/drawermenu/d770fc23c7a9bba2a6e3c15a5f02c8b8/",
                config
            )

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
