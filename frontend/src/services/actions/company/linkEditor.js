import {
    LOAD_LINK_EDITOR,
    LOAD_LINKS,
    UPDATE_LINKS_VALUE,
    CLEAN_ALL_LINK_EDITOR,
    LOAD_LINK_EDITOR_SCHEMA
} from "../types"

import { instance, config } from '../../baseApi';


export const loadLinkEditor = () => async (dispatch, getState) => {
    const TO_TYPE = getState().item.type
    const CULTURE = getState().lang.cultur
    const selectedItem = getState().item.selectedItem.ITEM_ID
    const body = JSON.stringify({ TO_TYPE, CULTURE })
    try {
        let res = await instance.post(
            "/type-link/details/",
            body,
            config
        );
        try {
            let itemLinkRes = await instance.post(
                `/item-link/details/`,
                {
                    TO_ITEM_ID: selectedItem,
                },
                config
            );
            itemLinkRes.data.map(e => {
                e.END_DATETIME = new Date(e.END_DATETIME)
                e.START_DATETIME = new Date(e.START_DATETIME)
            })
            console.log(itemLinkRes.data);
            dispatch({
                type: LOAD_LINKS,
                payload: itemLinkRes.data
            })
        } catch {
            dispatch({
                type: LOAD_LINKS,
                payload: []
            })
        }
        dispatch({
            type: LOAD_LINK_EDITOR,
            payload: res.data
        })
        var temp = []
        Object.keys(res.data).map(e => {
            temp[res.data[e].TYPE] = res.data[e]
        })
        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA,
            payload: temp
        })


    } catch {

    }


}

export const deleteLinkItem = (LINK_ID) => async dispatch => {
    const body = JSON.stringify({ LINK_ID })
    try {
        await instance.post(
            `/item-link/delete/`,
            body,
            config
        );
        dispatch(loadLinkEditor());
    } catch { }
}

export const updateItemLink = (linkId, key, value) => async dispatch => {
    dispatch({
        type: UPDATE_LINKS_VALUE,
        payload: { linkId, key, value }
    })
}

export const saveLinkItem = (linkId) => async (dispatch, getState) => {
    const updatedItem = getState().linkEditor.links[linkId]
    try {
        var d = updatedItem.START_DATETIME.getDate();//todo create a utils folder for date converting
        var m = updatedItem.START_DATETIME.getMonth();
        m += 1;
        var y = updatedItem.START_DATETIME.getFullYear();
        var startDateTime = (y + "-" + m + "-" + d);
    } catch {
        var startDateTime = updatedItem.START_DATETIME
    }


    try {
        var d = updatedItem.END_DATETIME.getDate();
        var m = updatedItem.END_DATETIME.getMonth();
        m += 1;
        var y = updatedItem.END_DATETIME.getFullYear();
        var endDateTime = (y + "-" + m + "-" + d);
    } catch {
        var endDateTime = updatedItem.END_DATETIME
    }




    const body = JSON.stringify({ LINK_ID: updatedItem.LINK_ID, START_DATETIME: startDateTime, END_DATETIME: endDateTime })
    console.log(body);
    try {
        await instance.put(
            `/item-link/update/`,
            body,
            config
        );
    } catch { }
}

export const cleanAllLinks = () => dispatch => {
    dispatch({ type: CLEAN_ALL_LINK_EDITOR })
}