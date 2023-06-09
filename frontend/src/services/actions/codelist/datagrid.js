import {
    LOAD_DATAGRID_ROW_CODELIST,
    ON_CHANGE_CODELIST_CELL,
    ADD_ERROR_SUCCESS,
    CLEAN_AFTER_SAVE,
    SET_SELECTED_ROWS,
    CLEAN_SELECTED_ROWS,
    SELECT_TREEVIEW_ITEM,
    REFRESH_DELETECHILD_CODELIST,
    ADD_NEW_CHILD_CODELIST,
    CLEAN_ALL_DATAGRID_CODELIST,
    SET_IS_ACTIVE_CONFIRMATION
} from "../types"

import history from "../../../routers/history";

import { uuidv4 } from "../../utils/uuidGenerator"

import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview"

import CodelistService from "../../api/codeList";
import { dateFormatter, swapDayAndYear } from "../../utils/dateFormatter"

const _createNewParent = () => (dispatch, getState) => {
    const culture = getState().lang.cultur
    const uuid = uuidv4()
    return [
        {
            "ROW_ID": uuid.replace(/-/g, ""),
            "LIST_TYPE": "CODE_LIST",
            "CULTURE": culture,
            "CODE": "",
            "CODE_TEXT": "",
            "PARENT": "",
            "LEGACY_CODE": "",
            "VAL1": "",
            "VAL2": "",
            "VAL3": "",
            "DATE1": "",
            "DATE2": "",
            "CHAR1": "",
            "CHAR2": "",
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

export const addNewCodeListItemSchema = () => async (dispatch, getState) => {
    const payload = dispatch(_createNewParent())
    dispatch({
        type: SELECT_TREEVIEW_ITEM,
        payload: { ...payload[0], selectedIndex: -2 }
    });
    dispatch({
        type: LOAD_DATAGRID_ROW_CODELIST,
        payload: payload
    })
    var pathnames = window.location.pathname.split("/").filter((x) => x);
    pathnames[2] = "new"
    var routeTo = "";
    pathnames.map(e => {
        routeTo += `/${e}`
    })
    history.push(routeTo)
}

export const refreshDataGridCodelist = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID;
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await CodelistService.getCodelistDetail(body);
        dispatch({
            type: LOAD_DATAGRID_ROW_CODELIST,
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
    var changedRows = getState().dataGridCodeList.changedRows
    var rows = getState().dataGridCodeList.rows
    rows[id][field] = value
    changedRows.push(id)
    dispatch({
        type: ON_CHANGE_CODELIST_CELL,
        payload: { rows: rows, changedRows: changedRows.filter(onlyUnique) }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

const _save = (value, userEmail) => async (dispatch, getState) => {
    const isNew = getState().treeview.selectedItem.selectedIndex
    var temp = {}
    Object.keys(value).map(e => {
        if (value[e] !== "" && e !== "HIERARCHY") {
            temp[e] = value[e]
        }
    })

    if (value.ROW_ID !== getState().treeview.selectedItem.ROW_ID) {
        temp.LIST_TYPE = getState().dataGridCodeList.rows[getState().treeview.selectedItem.ROW_ID].CODE
    }
    if (value.LAST_UPDT_DATE !== "") {
        temp.LAST_UPDT_DATE = swapDayAndYear(value.LAST_UPDT_DATE)
    }
    if (value.DATE1 !== "") {
        temp.DATE1 = dateFormatter(value.DATE1)
    }
    if (value.DATE2 !== "") {
        temp.DATE2 = dateFormatter(value.DATE2)
    }
    if (value.VAL1 !== "") {
        temp.VAL1 = parseInt(value.VAL1)
    }
    if (value.VAL2 !== "") {
        temp.VAL2 = parseInt(value.VAL2)
    }
    if (value.VAL3 !== "") {
        temp.VAL3 = parseInt(value.VAL3)
    }

    temp["HIERARCHY"] = [getState().treeview.selectedItem.ROW_ID]
    temp.LAST_UPDT_USER = userEmail
    const body = JSON.stringify({ ...temp })
    try {
        let res;
        if (isNew === -2) {
            res = await CodelistService.create(body);
        } else {
            res = await CodelistService.update(body);
        }
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }

}
const _checkMandatoryFields = () => (dispatch, getState) => {
    const changedRows = getState().dataGridCodeList.changedRows
    const rows = getState().dataGridCodeList.rows
    var returnVal = true
    changedRows.map(async e => {
        Object.keys(rows).map(async a => {
            if (e === a) {
                if (rows[e].CODE === "") {
                    returnVal = false
                }
                if (rows[e].CODE_TEXT === "") {
                    returnVal = false
                }
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

export const saveCodeList = () => async (dispatch, getState) => {
    const changedRows = getState().dataGridCodeList.changedRows
    const deletedRows = getState().dataGridCodeList.deletedRows
    const rows = getState().dataGridCodeList.rows
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
                    let res = await CodelistService.remove(body);
                    return Promise.resolve(res.data)
                } catch (err) {
                    return Promise.reject(err)
                }
            }))
        dispatch({
            type: CLEAN_AFTER_SAVE,
        })
        dispatch(loadTreeviewItem(CodelistService.getAllTreeitem, "CODE_TEXT"))
        return true
    } else {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "Mandatory fields: Code, Code text, Layer Name, Hidden"
        })
        return false
    }
}

export const deleteCodeList = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await CodelistService.remove(body);
        await dispatch(loadTreeviewItem(CodelistService.getAllTreeitem, "CODE_TEXT"))
        dispatch(selectTreeViewItem(selectedIndex, "CODE"))
        return Promise.resolve(res.data)

    } catch (err) {
        return Promise.reject(err)
    }

}

export const saveAndMoveCodeList = (index) => async (dispatch, getState) => {
    if (index < 0) {
        index = getState().item.treeview.filteredMenuItem.length - 1
    }
    else if (index > getState().item.filteredMenuItem.length - 1) {
        index = 0
    }
    dispatch(saveCodeList())
    dispatch(selectTreeViewItem(index));

}


const _createNewChild = () => (dispatch, getState) => {
    const culture = getState().lang.cultur
    const uuid = uuidv4()
    return {

        "ROW_ID": uuid.replace(/-/g, ""),
        "LIST_TYPE": getState().treeview.selectedItem.CODE,
        "CULTURE": culture,
        "CODE": "",
        "CODE_TEXT": "",
        "PARENT": "",
        "LEGACY_CODE": "",
        "VAL1": "",
        "VAL2": "",
        "VAL3": "",
        "DATE1": "",
        "DATE2": "",
        "CHAR1": "",
        "CHAR2": "",
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


export const addChildCodeList = () => async (dispatch, getState) => {
    const rows = getState().dataGridCodeList.rows
    const newChild = dispatch(_createNewChild())
    var payload = []
    Object.keys(rows).map((e) => {
        payload.push(rows[e])
    })
    payload.push(newChild)
    dispatch({
        type: LOAD_DATAGRID_ROW_CODELIST,
        payload: payload
    })
    dispatch({
        type: ADD_NEW_CHILD_CODELIST,
        payload: newChild.ROW_ID
    })
}

export const setSelectedRows = (payload) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_ROWS,
        payload: payload
    })
}

export const cleanSelectedRows = () => (dispatch) => {
    dispatch({
        type: CLEAN_SELECTED_ROWS
    })
}

export const deleteChild = () => (dispatch, getState) => {
    const newChildRows = getState().dataGridCodeList.newChildRows;
    const selectedRows = getState().dataGridCodeList.selectedRows;
    const changedRows = getState().dataGridCodeList.changedRows;
    var deletedRows = getState().dataGridCodeList.deletedRows;
    const rows = getState().dataGridCodeList.rows;
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
        type: REFRESH_DELETECHILD_CODELIST,
        payload: { tempRows, deletedRows, changedNew }
    })
}

export const cleanAllDataGrid = () => dispatch => {
    dispatch({
        type: CLEAN_ALL_DATAGRID_CODELIST,

    })
}
