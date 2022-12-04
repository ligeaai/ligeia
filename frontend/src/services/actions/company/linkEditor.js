import {
    LOAD_LINK_EDITOR,
    LOAD_LINKS,
    UPDATE_LINKS_VALUE,
    CLEAN_ALL_LINK_EDITOR,
    LOAD_LINK_EDITOR_SCHEMA,
    ADD_ERROR_SUCCESS,
    CLEAN_CHANGED_LIST_LINK_EDITOR,
    LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE
} from "../types"
import axios from "axios";
import { Box } from "@mui/material";

import { instance, config } from '../../baseApi';
import React from "react";
import { dateFormatter } from "../../utils/dateFormatter"

let cancelToken;
export const loadLinkEditor = () => async (dispatch, getState) => {
    const TYPE = getState().item.type;
    const CULTURE = getState().lang.cultur;
    const selectedItem = getState().item.selectedItem.ITEM_ID;
    const body = JSON.stringify({ TYPE, CULTURE });
    dispatch({
        type: LOAD_LINKS,
        payload: []
    })
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    let res;
    try {
        console.log(body);
        res = await instance.post(
            "/type-link/details/",
            body,
            { ...config(), cancelToken: cancelToken.token }
        );
        console.log(res);
        try {
            console.log(selectedItem);
            let itemLinkRes = await instance.post(
                `/item-link/details/`,
                {
                    ID: selectedItem,
                },
                config()
            );
            console.log(itemLinkRes);
            itemLinkRes.data.TO_ITEM_ID.map(e => {
                e.END_DATETIME = new Date(e.END_DATETIME)
                e.START_DATETIME = new Date(e.START_DATETIME)
            })
            itemLinkRes.data.FROM_ITEM_ID.map(e => {
                e.END_DATETIME = new Date(e.END_DATETIME)
                e.START_DATETIME = new Date(e.START_DATETIME)
            })
            var links = []
            itemLinkRes.data.TO_ITEM_ID.map(e => {
                links[e.LINK_ID] = e
            })
            itemLinkRes.data.FROM_ITEM_ID.map(e => {
                links[e.LINK_ID] = e
            })
            dispatch({
                type: LOAD_LINKS,
                payload: links
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
        var tempFromType = []
        Object.keys(res.data.TO_TYPE).map(e => {
            temp[res.data.TO_TYPE[e].TYPE] = res.data.TO_TYPE[e]
        })
        Object.keys(res.data.FROM_TYPE).map(e => {
            tempFromType[res.data.FROM_TYPE[e].TYPE] = res.data.FROM_TYPE[e]
        })

        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE,
            payload: tempFromType
        })
        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA,
            payload: temp
        })


    } catch { }
}

export const deleteLinkItem = (LINK_ID) => async dispatch => {
    const body = JSON.stringify({ LINK_ID })
    try {
        await instance.post(
            `/item-link/delete/`,
            body,
            config()
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

export const saveLinkItem = () => async (dispatch, getState) => {
    const links = getState().linkEditor.links
    const changedLinks = getState().linkEditor.changedLinks
    Object.keys(links).map(async e => {
        if (changedLinks.has(e)) {
            try {
                var startDateTime = dateFormatter(links[e].START_DATETIME);
            } catch {
                var startDateTime = links[e].START_DATETIME
            }
            try {
                var endDateTime = dateFormatter(links[e].END_DATETIME);
            } catch {
                var endDateTime = links[e].END_DATETIME
            }
            const body = JSON.stringify({ LINK_ID: e, START_DATETIME: startDateTime, END_DATETIME: endDateTime })
            try {
                await instance.put(
                    `/item-link/update/`,
                    body,
                    config()
                );
            } catch { }
        }
    })
    dispatch({
        type: CLEAN_CHANGED_LIST_LINK_EDITOR,

    })

}

const checkTheValues = () => async (dispatch, getState) => {
    const links = getState().linkEditor.links
    const changedLinks = getState().linkEditor.changedLinks
    var returnVal = true
    Object.keys(links).map(async e => {
        if (changedLinks.has(e)) {
            console.log(links[e].START_DATETIME);
            if (links[e].START_DATETIME > links[e].END_DATETIME) {
                returnVal = false
            }
        }
    }
    )
    return returnVal
}

export const saveAgreeFunc = (extraFunc = () => { }) => async (dispatch, getState) => {
    const links = getState().linkEditor.links
    const changedLinks = getState().linkEditor.changedLinks
    var temp = []
    Object.keys(links).map(async e => {
        if (changedLinks.has(e)) {
            temp.push(links[e].FROM_ITEM_NAME)
        }
    })
    console.log(temp);
    dispatch({
        type: "confirmation/setConfirmation",
        payload: {
            title: "Are you sure you want to save?",
            body: <>{temp.map(e => (<Box sx={{ width: "100%" }}>{e}</Box>))}</>,
            agreefunction: async () => {
                console.log(dispatch(checkTheValues()));
                if (await dispatch(checkTheValues())) {
                    dispatch(saveLinkItem());
                    extraFunc();
                } else {
                    dispatch({
                        type: ADD_ERROR_SUCCESS,
                        payload: "The initial time cannot exceed the deadline"
                    })
                }

            },
        },
    });
}

export const cleanAllLinks = () => dispatch => {
    dispatch({ type: CLEAN_ALL_LINK_EDITOR })
}