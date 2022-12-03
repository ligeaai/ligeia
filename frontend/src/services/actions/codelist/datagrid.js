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

import { instance, config } from '../../baseApi';


import history from "../../../routers/history";

import axios from "axios";

import { uuidv4 } from "../../utils/uuidGenerator"

import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview"

import CodelistService from "../../api/codeList";


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
    pathnames[3] = "new"
    var routeTo = "";
    pathnames.map(e => {
        routeTo += `/${e}`
    })
    history.push(routeTo)
}
let cancelToken;
export const refreshDataGridCodelist = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeview.selectedItem.ROW_ID;
    const body = JSON.stringify({ ROW_ID });
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    let res;
    try {
        res = await instance
            .post(
                "/code-list/deep-details/",
                body,
                { ...config(), cancelToken: cancelToken.token }
            )
        dispatch({
            type: LOAD_DATAGRID_ROW_CODELIST,
            payload: res.data
        })

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
    var temp = {}
    Object.keys(value).map(e => {
        if (value[e] !== "" && e !== "HIERARCHY") {
            temp[e] = value[e]
        }
    })

    if (value.ROW_ID !== getState().treeview.selectedItem.ROW_ID) {
        temp.LIST_TYPE = getState().dataGridCodeList.rows[getState().treeview.selectedItem.ROW_ID].CODE
    }

    if (value.DATE1 !== "") {
        var d = value.DATE1.getDate();
        var m = value.DATE1.getMonth();
        m += 1;
        var y = value.DATE1.getFullYear();
        var newdate = (y + "-" + m + "-" + d);
        temp.DATE1 = newdate
    }
    if (value.DATE2 !== "") {
        d = value.DATE2.getDate();
        m = value.DATE2.getMonth();
        m += 1;
        y = value.DATE2.getFullYear();
        newdate = (y + "-" + m + "-" + d);
        temp.DATE2 = newdate
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
    console.log(body);
    try {
        let res = await instance
            .put(
                "/code-list/save-update/",
                body,
                config()
            )

        return res
    } catch (err) {
        return false
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
                    let res = await instance
                        .post(
                            "/code-list/delete/",
                            body,
                            config()
                        )
                } catch (err) {

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
        let res = await instance
            .post(
                "/code-list/delete/",
                body,
                config()
            )

    } catch (err) {
        return false
    }
    await dispatch(loadTreeviewItem(CodelistService.getAllTreeitem, "CODE_TEXT"))
    dispatch(selectTreeViewItem(selectedIndex))
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
