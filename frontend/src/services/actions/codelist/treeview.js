import {
    LOAD_TREEVIEW_ITEM_CODELIST,
    SELECT_TREEVIEW_ITEM_CODELIST,
    CLEAN_AFTER_SAVE,
    CLEAN_TREEVIEW_SELECT_CODELIST,
    LOAD_FILTERED_TREEVIEW_ITEM_CODELIST,
    SET_FILTERED_LAYER_NAME_CODELIST
} from "../types"

import { instance, config } from '../../baseApi';

import { refreshDataGridCodelist, cleanAllDataGrid } from "./datagrid";
import history from "../../../routers/history";

export const loadFilteredTreeviewItem = () => async (dispatch, getState) => {
    const treeMenuItem = getState().treeviewCodelist.treeMenuItem
    const filteredLayerName = getState().treeviewCodelist.filteredLayerName
    if (filteredLayerName !== "NONE") {
        var filteredResponse = treeMenuItem.filter(a => a.LAYER_NAME === filteredLayerName)
        dispatch({
            type: LOAD_FILTERED_TREEVIEW_ITEM_CODELIST,
            payload: filteredResponse
        })
    } else {
        dispatch({
            type: LOAD_FILTERED_TREEVIEW_ITEM_CODELIST,
            payload: treeMenuItem
        })
    }

}

export const loadTreeviewItemCodelist = () => async (dispatch, getState) => {
    const CULTURE = getState().lang.cultur;
    const LIST_TYPE = "CODE_LIST";
    const body = JSON.stringify({ CULTURE, LIST_TYPE });
    try {
        let res = await instance
            .post(
                "/code-list/details/",
                body,
                config
            )
        var sortedResponse = res.data.sort((a, b) =>
            a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
        )
        dispatch({
            type: LOAD_TREEVIEW_ITEM_CODELIST,
            payload: sortedResponse
        });
        dispatch(loadFilteredTreeviewItem())
        return res
    } catch (err) {
        return err
    }
}

export const selectTreeViewItemCoedlist = (index) => async (dispatch, getState) => {

    var payload = getState().treeviewCodelist.filteredMenuItem[parseInt(index)]

    payload = { ...payload, selectedIndex: index }
    dispatch({
        type: SELECT_TREEVIEW_ITEM_CODELIST,
        payload: payload
    });
    dispatch(refreshDataGridCodelist());
    dispatch({
        type: CLEAN_AFTER_SAVE,
    })
    var pathnames = window.location.pathname.split("/").filter((x) => x);
    pathnames[3] = payload.CODE.toLowerCase()
    var routeTo = "";
    pathnames.map(e => {
        routeTo += `/${e}`
    })
    history.push(routeTo)
}

export const cleanTreeMenuSelect = () => dispatch => {
    dispatch({
        type: CLEAN_TREEVIEW_SELECT_CODELIST
    })
}

export const setFilteredLayerName = (layerName = "NONE") => dispatch => {
    dispatch({
        type: SET_FILTERED_LAYER_NAME_CODELIST,
        payload: layerName
    })
    dispatch(cleanAllDataGrid())
    dispatch(cleanTreeMenuSelect())
    dispatch(loadFilteredTreeviewItem())
}
