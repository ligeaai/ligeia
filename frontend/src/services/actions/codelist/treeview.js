import {
    LOAD_TREEVIEW_ITEM_CODELIST,
    SELECT_TREEVIEW_ITEM_CODELIST,
    CLEAN_AFTER_SAVE,
    CLEAN_TREEVIEW_SELECT_CODELIST
} from "../types"

import { instance, config } from '../../baseApi';

import { refreshDataGridCodelist, addNewCodeListItemSchema } from "./datagrid";
import history from "../../../routers/history";

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
        dispatch({
            type: LOAD_TREEVIEW_ITEM_CODELIST,
            payload: res.data.sort((a, b) =>
                a.CODE_TEXT > b.CODE_TEXT ? 1 : -1
            )
        });

        return res
    } catch (err) {
        return err
    }
}

export const selectTreeViewItemCoedlist = (index) => async (dispatch, getState) => {

    var payload = getState().treeviewCodelist.treeMenuItem[parseInt(index)]

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
