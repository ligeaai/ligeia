import {
    LOAD_LINK_EDITOR_SCHEMA_ITEM,
    LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE_ITEM,
    LOAD_LINK_EDITOR,
    SET_IS_LINK_ACTIVE,
    LOAD_LINK_LINKS,
    UPDATE_LINKS_VALUE,
    CLEAN_CHANGED_LINK,
    SET_IS_ACTIVE_CONFIRMATION
} from "../../actions/types"
import axios from "axios";
import ItemLinkService from "../../api/itemLink"
import { dateFormatter } from "../../utils/dateFormatter";
let cancelToken;
export const loadItemLinkSchema = () => async (dispatch, getState) => {
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    const TYPE = getState().drawerMenu.selectedItem.TYPE;
    const CULTURE = getState().lang.cultur;
    const body = JSON.stringify({ TYPE, CULTURE });
    try {
        let res = await ItemLinkService.getLinkSchema(body, cancelToken);
        console.log(res);
        let sortedRes = {}

        sortedRes["FROM_TYPE"] = res.data.FROM_TYPE.sort((a, b) =>
            a["TYPE_LABEL"] > b["TYPE_LABEL"] ? 1 : -1
        )
        sortedRes["TO_TYPE"] = res.data.TO_TYPE.sort((a, b) =>
            a["TYPE_LABEL"] > b["TYPE_LABEL"] ? 1 : -1
        )
        var temp = []
        var tempFromType = []
        Object.keys(sortedRes.TO_TYPE).map(e => {
            if (sortedRes.TO_TYPE[e].TYPE === "TAGS") {
                temp["TAG_ITEM"] = { ...sortedRes.TO_TYPE[e], TYPE: "TAG_ITEM" }
            } else {
                temp[sortedRes.TO_TYPE[e].TYPE] = sortedRes.TO_TYPE[e]

            }
        })
        Object.keys(sortedRes.FROM_TYPE).map(e => {
            tempFromType[sortedRes.FROM_TYPE[e].TYPE] = sortedRes.FROM_TYPE[e]
        })
        dispatch({
            type: LOAD_LINK_EDITOR,
            payload: sortedRes
        })
        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE_ITEM,
            payload: tempFromType
        })
        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA_ITEM,
            payload: temp
        })
    } catch (err) {
        dispatch({
            type: LOAD_LINK_EDITOR,
            payload: { TO_TYPE: false, FROM_TYPE: false }
        })
        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE_ITEM,
            payload: false
        })
        dispatch({
            type: LOAD_LINK_EDITOR_SCHEMA_ITEM,
            payload: false
        })
    }
}


export const setIsActiveLink = (payload) => dispatch => {
    dispatch({
        type: SET_IS_LINK_ACTIVE,
        payload: payload
    })
}

let cancelTokenLinks;
export const loadLinks = () => async (dispatch, getState) => {
    const selectedItem = getState().treeview.selectedItem.ITEM_ID
    if (cancelTokenLinks) {
        cancelTokenLinks.cancel()
    }
    cancelTokenLinks = axios.CancelToken.source();
    try {
        const body = JSON.stringify({ ID: selectedItem })
        let itemLinkRes = await ItemLinkService.getItemLink(body, cancelTokenLinks)
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
            type: LOAD_LINK_LINKS,
            payload: links
        })
    } catch {
        dispatch({
            type: LOAD_LINK_LINKS,
            payload: []
        })
    }
}

export const updateItemLink = (linkId, key, value) => async dispatch => {
    dispatch({
        type: UPDATE_LINKS_VALUE,
        payload: { linkId, key, value }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

export const deleteItemLink = (LINK_ID) => async dispatch => {
    const body = JSON.stringify({ LINK_ID })
    try {
        await ItemLinkService.remove(body)
        dispatch(loadLinks());

    } catch { }
}

export const saveItemLink = () => async (dispatch, getState) => {
    const links = getState().itemLinkEditor.links
    const changedLinks = getState().itemLinkEditor.changedLinks
    try {
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

                await ItemLinkService.update(body)

            }
        })
        dispatch({
            type: CLEAN_CHANGED_LINK,

        })
        return true
    } catch {
        return false
    }


}