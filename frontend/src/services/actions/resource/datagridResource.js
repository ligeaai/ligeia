import {
    LOAD_DATAGRID_ROW_RESOURCELIST,
    ON_CHANGE_RESOURCELIST_CELL,
    ADD_ERROR_SUCCESS,
    CLEAN_AFTER_SAVE_RESOURCELIST,
    SET_SELECTED_ROWS_RESOURCELIST,
    CLEAN_SELECTED_ROWS_RESOURCELIST,
    SELECT_TREEVIEW_ITEM,
    REFRESH_DELETECHILD_RESOURCELIST,
    ADD_NEW_CHILD_RESOURCELIST,
    CLEAN_ALL_DATAGRID_RESOURCELIST,
    SET_IS_ACTIVE_CONFIRMATION
} from "../types"


import history from "../../../routers/history";

import { uuidv4 } from "../../utils/uuidGenerator"

import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview"

import ResourcelistService from "../../api/resourceList";
import { dateFormatter } from "../../utils/dateFormatter"




const _createNewParent = () => (dispatch, getState) => {
    const culture = getState().lang.cultur
    const uuid = uuidv4()
    return [
        {
            "ROW_ID": uuid.replace(/-/g, ""),
            "CULTURE": culture,
            "PARENT": "",
            "ID": "",
            "SHORT_LABEL": "",
            "MOBILE_LABEL": "",
            "ICON": "",
            "LAYER_NAME": "",
            "HIDDEN": "",
            "LAST_UPDT_USER": "",
            "LAST_UPDT_DATE": "",
            "HIERARCHY": [
                uuid.replace(/-/g, "")
            ]
        }
    ]
}


export const addNewResourceListItemSchema = () => async (dispatch, getState) => {
    const payload = dispatch(_createNewParent())
    dispatch({
        type: SELECT_TREEVIEW_ITEM,
        payload: { ...payload[0], selectedIndex: -2 }
    });
    dispatch({
        type: LOAD_DATAGRID_ROW_RESOURCELIST,
        payload: payload
    })
    var pathnames = window.location.pathname.split("/").filter((x) => x);
    pathnames[3] = "new"
    var routeTo = "";
    pathnames.map(e => {
        routeTo += `/${e}`
    })
    history.push(routeTo)
}


export const refreshDataGridResourcelist = () => async (dispatch, getState) => {
    const PARENT = getState().treeview.selectedItem.PARENT
    const CULTURE = getState().lang.cultur
    const body = JSON.stringify({
        CULTURE, PARENT
    });

    try {
        let res = await ResourcelistService.getResourcelistDetail(body);
        dispatch({
            type: LOAD_DATAGRID_ROW_RESOURCELIST,
            payload: res.data
        })
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err)
    }
}



export const onChangeCell = (id, field, value) => async (dispatch, getState) => {
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var changedRows = getState().dataGridResourceList.changedRows
    var rows = getState().dataGridResourceList.rows
    rows[id][field] = value
    changedRows.push(id)
    dispatch({
        type: ON_CHANGE_RESOURCELIST_CELL,
        payload: { rows: rows, changedRows: changedRows.filter(onlyUnique) }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

const _save = (value, userEmail) => async (dispatch, getState) => {
    var temp = {}
    Object.keys(value).map(e => {
        if (value[e] !== "" && e !== "HIERARCHY") {
            temp[e] = value[e]
        }
    })

    if (value.ROW_ID !== getState().treeview.selectedItem.ROW_ID) {
        temp.LIST_TYPE = getState().dataGridResourceList.rows[getState().treeview.selectedItem.ROW_ID].CODE
    }

    temp["HIERARCHY"] = [getState().treeview.selectedItem.ROW_ID]
    temp.LAST_UPDT_USER = userEmail
    const body = JSON.stringify({ ...temp })
    try {
        let res = await ResourcelistService.createUpdate(body);
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }

}

const _checkMandatoryFields = () => (dispatch, getState) => {
    const changedRows = getState().dataGridResourceList.changedRows
    const rows = getState().dataGridResourceList.rows
    var returnVal = true
    changedRows.map(async e => {
        Object.keys(rows).map(async a => {
            if (e === a) {
                if (rows[e].LAYER_NAME === "") {
                    returnVal = false
                }
                if (rows[e].HIDDEN === "") {
                    returnVal = false
                }
            }
        })
    })
    return returnVal
}

export const saveResourceList = () => async (dispatch, getState) => {
    const changedRows = getState().dataGridResourceList.changedRows
    const deletedRows = getState().dataGridResourceList.deletedRows
    const rows = getState().dataGridResourceList.rows
    if (dispatch(_checkMandatoryFields())) {
        await Promise.all(
            changedRows.map(async e => {
                await Promise.all(
                    Object.keys(rows).map(async a => {
                        if (e === a) {
                            await dispatch(_save(rows[e], getState().auth.user.email))
                        }
                    }))
            }))
        await Promise.all(
            deletedRows.map(async e => {
                var ROW_ID = e
                var body = JSON.stringify({ ROW_ID })
                try {
                    let res = await ResourcelistService.remove(body);
                    return Promise.resolve(res.data)
                } catch (err) {
                    return Promise.reject(err)
                }
            }))
        dispatch({
            type: CLEAN_AFTER_SAVE_RESOURCELIST,
        })
        dispatch(loadTreeviewItem(ResourcelistService.getAllTreeitem, "SHORT_LABEL"))
        return true
    } else {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "Mandatory fields: Layer Name, Hidden"
        })
        return false
    }
}

export const deleteResourceList = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await ResourcelistService.remove(body);
        await dispatch(loadTreeviewItem(ResourcelistService.getAllTreeitem, "SHORT_LABEL"))
        dispatch(selectTreeViewItem(selectedIndex, "ID"))
        return Promise.resolve(res.data)

    } catch (err) {
        return Promise.reject(err)
    }

}

export const saveAndMoveResourceList = (index) => async (dispatch, getState) => {
    if (index < 0) {
        index = getState().item.treeview.filteredMenuItem.length - 1
    }
    else if (index > getState().item.filteredMenuItem.length - 1) {
        index = 0
    }
    dispatch(saveResourceList())
    dispatch(selectTreeViewItem(index));

}



const _createNewChild = () => (dispatch, getState) => {
    const culture = getState().lang.cultur
    const uuid = uuidv4()
    return {

        "ROW_ID": uuid.replace(/-/g, ""),
        "CULTURE": culture,
        "PARENT": "",
        "ID": "",
        "SHORT_LABEL": "",
        "MOBILE_LABEL": "",
        "ICON": "",
        "LAYER_NAME": "",
        "HIDDEN": "",
        "LAST_UPDT_USER": "",
        "LAST_UPDT_DATE": "",
        "HIERARCHY": [
            getState().treeview.selectedItem.ROW_ID,
            uuid.replace(/-/g, "")
        ]

    }
}


export const addChildResourceList = () => async (dispatch, getState) => {
    const rows = getState().dataGridResourceList.rows
    const newChild = dispatch(_createNewChild())
    var payload = []
    Object.keys(rows).map((e) => {
        payload.push(rows[e])
    })
    payload.push(newChild)
    dispatch({
        type: LOAD_DATAGRID_ROW_RESOURCELIST,
        payload: payload
    })
    dispatch({
        type: ADD_NEW_CHILD_RESOURCELIST,
        payload: newChild.ROW_ID
    })
}

export const setSelectedRows = (payload) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_ROWS_RESOURCELIST,
        payload: payload
    })
}

export const cleanSelectedRows = () => (dispatch) => {
    dispatch({
        type: CLEAN_SELECTED_ROWS_RESOURCELIST
    })
}


export const deleteChild = () => (dispatch, getState) => {
    const newChildRows = getState().dataGridResourceList.newChildRows;
    const selectedRows = getState().dataGridResourceList.selectedRows;
    const changedRows = getState().dataGridResourceList.changedRows;
    var deletedRows = getState().dataGridResourceList.deletedRows;
    const rows = getState().dataGridResourceList.rows;
    var changedNew = []
    var tempRows = []
    Object.keys(rows).map(e => {
        var temp = true
        selectedRows.map((a) => {
            if (e === a) {
                temp = false
            }
        })
        if (temp) {
            tempRows[e] = rows[e]
        }
    })

    changedRows.map((e, i) => {
        var temp = true
        selectedRows.map((a) => {
            if (e === a) {
                temp = false
            }
        })
        if (temp) {
            changedNew.push(e)
        }
    })
    selectedRows.map(e => {
        var temp = true
        newChildRows.map(a => {
            if (e === a) {
                temp = false
            }
        })
        if (temp) {
            deletedRows.push(e)
        }
    })
    dispatch({
        type: REFRESH_DELETECHILD_RESOURCELIST,
        payload: { tempRows, deletedRows, changedNew }
    })
}

export const cleanAllDataGrid = () => dispatch => {
    dispatch({
        type: CLEAN_ALL_DATAGRID_RESOURCELIST,

    })
}