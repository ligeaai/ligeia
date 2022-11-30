import TypeService from "../../api/type";

import {
    LAOD_TREEVIEW_TYPE,
    SELECT_TREEVIEW_ITEM_TYPE,
    AFTER_GO_INDEX_TYPE,
    SET_ROW_DATAGRID_TYPE,
    LOAD_FILTERED_TREEVIEW_ITEM_TYPE,
    SET_FILTERED_LAYER_NAME_TYPE
} from "../types"

import {
    setConfirmation,
    setExtraBtn,
} from "../../reducers/confirmation";
import { myHistoryPush } from "../../utils/historyPush";
import { fillPropertyTable, saveTypeAndProperty } from "./datagrid"
import history from "../../../routers/history";

export const loadFilteredTreeviewItem = () => async (dispatch, getState) => {
    const treeMenuItem = getState().treeviewType.treeMenuItem
    const filteredLayerName = getState().treeviewType.filteredLayerName
    if (filteredLayerName !== "NONE") {
        var filteredResponse = treeMenuItem.filter(a => a.LAYER_NAME === filteredLayerName)
        dispatch({
            type: LOAD_FILTERED_TREEVIEW_ITEM_TYPE,
            payload: filteredResponse
        })
    } else {
        dispatch({
            type: LOAD_FILTERED_TREEVIEW_ITEM_TYPE,
            payload: treeMenuItem
        })
    }
}
export const setFilteredLayerName = (layerName = "NONE") => dispatch => {
    dispatch({
        type: SET_FILTERED_LAYER_NAME_TYPE,
        payload: layerName
    })

    dispatch(loadFilteredTreeviewItem())
}
export const loadTreeView = () => async (dispatch, getState) => {
    const CULTURE = getState().lang.lang
    const body = JSON.stringify({ CULTURE })
    try {
        const res = await TypeService.getAll(body);
        console.log(res);
        const sortedTreeMenu = res.data.Message.sort((a, b) =>
            a.TYPE > b.TYPE ? 1 : -1)
        dispatch({
            type: LAOD_TREEVIEW_TYPE,
            payload: sortedTreeMenu
        })
        dispatch(loadFilteredTreeviewItem())
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
}
export const checkmandatoryFields = () => {
    return true
}

export const _goIndex = (index) => async (dispatch, getState) => {
    if (index === -2) {
        dispatch({
            type: SELECT_TREEVIEW_ITEM_TYPE,
            payload: { selectedIndex: -2 }
        })
        myHistoryPush(3, "new")
    } else {
        const treeLen = getState().treeviewType.treeMenuItem.length
        if (index < 0) {
            index = treeLen - 1
        }
        if (index >= treeLen) {
            index = 0
        }
        const treeItem = getState().treeviewType.treeMenuItem[parseInt(index)]
        dispatch({
            type: SELECT_TREEVIEW_ITEM_TYPE,
            payload: { ...treeItem, selectedIndex: index }
        })
        myHistoryPush(3, treeItem.TYPE.toLowerCase())
        const selectedItem = getState().treeviewType.selectedItem
        var type = []
        Object.keys(selectedItem).map(e => {
            if (selectedItem[e]) {
                type[e] = selectedItem[e]
            }
            else {
                type[e] = ""
            }
        })
        dispatch({
            type: SET_ROW_DATAGRID_TYPE,
            payload: [{ ...type }]
        })
        dispatch(fillPropertyTable(type.TYPE))
    }
    dispatch({
        type: AFTER_GO_INDEX_TYPE,
    })
}

const _saveAndGoToIndex = (index) => (dispatch, getState) => {
    dispatch(saveTypeAndProperty())
    dispatch(loadTreeView());
    dispatch(_goIndex(index));

}

export const selectType = (index) => async (dispatch, getState) => {
    const anyChangesType = getState().dataGridType.anyChangesType
    const anyChangesProperty = getState().dataGridType.anyChangesProperty
    if (anyChangesType || anyChangesProperty) {
        dispatch(
            setConfirmation({
                title: "Are you sure you want to save this?",
                body: <></>,
                agreefunction: async () => {
                    if (checkmandatoryFields()) {
                        dispatch(_saveAndGoToIndex(index));
                    }
                    else {
                        dispatch({
                            type: "ADD_ERROR_SUCCESS",
                            payload: "Pleas check mandatory fields"
                        })
                    }
                },
            })
        );
        dispatch(
            setExtraBtn({
                extraBtnText: "Don't save go",
                extrafunction: () => {
                    // dispatch(cleanAllTags())
                    dispatch(_goIndex(index));
                },
            })
        );
    } else {
        dispatch(_goIndex(index));
    }


}