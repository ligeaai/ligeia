import { uuidv4 } from "../../utils/uuidGenerator"
import {
    SET_ROW_DATAGRID_TYPE,
    SET_CHANGE_TYPE_VALUE_CELL_TAG,
    SET_PROPERTY_ROW,
    CHANGE_SELECTED_ROW_PROPERTY,
    SET_CHANGE_PROPERTY_VALUE_CELL_TAG,
    DELETE_SELECTED_ITEM_PROPERTY,
    ADD_NEW_PROPERTY,
    AFTER_GO_INDEX_TYPE,
    SELECT_TREEVIEW_ITEM,
    CLEAN_ALL_DATAGRID_TYPE,
    SET_IS_ACTIVE_CONFIRMATION
} from "../types"

import {
    setConfirmation,
} from "../../reducers/confirmation";

import { loadTreeviewItem, selectTreeItemAfterSave, selectTreeViewItem } from "../treeview/treeview"

import TypeService from "../../api/type"

import { dateFormatter } from "../../utils/dateFormatter";

const _createNewType = () => {
    const uuid = uuidv4()
    return [
        {
            "ROW_ID": uuid.replace(/-/g, ""),
            "TYPE": "",
            "TYPE_CLASS": "",
            "LABEL_ID": "",
            "CHANGE_INTERVAL": "",
            "LAYER_NAME": "",
            "HIDDEN": "",
            "BASE_TYPE": "",
            "CODE_LIST_TYPE": "",
            "IS_QUICK_LINK": "",
            "PROP_TBL_NAME": "",
            "BASE_TBL_NAME": "",
            "TAG_TBL_NAME": "",
            "LAST_UPDT_USER": "",
            "LAST_UPDT_DATE": "",
            "HIERARCHY": [
                uuid.replace(/-/g, "")
            ]
        }
    ]
}

const _createNewProperty = (type) => {
    const uuid = uuidv4()
    return {
        "TYPE": type,
        "PROPERTY_NAME": "",
        "CODE_LIST": "",
        "MANDATORY": "",
        "LABEL_ID": "",
        "PROP_GRP": "",
        "PROPERTY_TYPE": "",
        "SORT_ORDER": "",
        "ROW_ID": uuid.replace(/-/g, ""),
    }
}

export const addNewType = () => dispatch => {
    const newType = _createNewType()
    dispatch({
        type: SET_ROW_DATAGRID_TYPE,
        payload: newType
    })
    dispatch({
        type: SET_PROPERTY_ROW,
        payload: []
    })
    dispatch({
        type: SELECT_TREEVIEW_ITEM,
        payload: { ...newType[0], selectedIndex: -2 }
    });
}

export const checkmandatoryFields = () => {//todo fill the function
    return true
}

export const onChangeCell = (id, field, value, dispatchIndex) => dispatch => {
    const dispatchType = [SET_CHANGE_TYPE_VALUE_CELL_TAG, SET_CHANGE_PROPERTY_VALUE_CELL_TAG]
    dispatch({
        type: dispatchType[dispatchIndex],
        payload: { id: id, field: field, value: value }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

export const fillPropertyTable = (TYPE) => async (dispatch, getState) => {
    const CULTURE = getState().lang.lang
    const body = JSON.stringify({ TYPE, CULTURE })
    try {
        let res = await TypeService.getTypeAndProperty(body);
        res.data.shift()
        dispatch({
            type: SET_PROPERTY_ROW,
            payload: res.data
        })
    } catch (err) {
        // dispatch({
        //     type: CLEAN_ALL_DATAGRID_TYPE
        // })
    }
}

export const setSelectedRows = rowId => dispatch => {
    dispatch({
        type: CHANGE_SELECTED_ROW_PROPERTY,
        payload: rowId
    })
}

export const deleteProperty = () => (dispatch, getState) => {
    const newChildRows = getState().dataGridType.newChildRows;
    const selectedRows = getState().dataGridType.selectedRows;
    const changedRows = getState().dataGridType.changedRows;
    var deletedRows = getState().dataGridType.deletedRows;
    const rows = getState().dataGridType.propertyRows;
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

        Object.keys(newChildRows).map(a => {
            if (e === a) {
                temp = false
            }
        })
        if (temp) {
            deletedRows.push(e)
        }
    })
    dispatch({
        type: DELETE_SELECTED_ITEM_PROPERTY,
        payload: { tempRows, deletedRows, changedNew }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })

}

export const addNewProperty = () => (dispatch, getState) => {
    const type = getState().dataGridType.rows[Object.keys(getState().dataGridType.rows)[0]].TYPE
    const newProperty = _createNewProperty(type)
    dispatch({
        type: ADD_NEW_PROPERTY,
        payload: { [newProperty.ROW_ID]: newProperty }
    })
}

const _deleteType = async (body) => {
    try {
        let res = await TypeService.deleteType(body);
    } catch (err) {
        return Promise.reject(err)
    }
}

export const deleteType = () => (dispatch, getState) => {
    const TYPE = getState().dataGridType.rows[Object.keys(getState().dataGridType.rows)[0]].TYPE
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const body = JSON.stringify({ TYPE })
    dispatch(
        setConfirmation({
            title: "Are you sure you want to delete this?",
            body: <></>,
            agreefunction: async () => {
                if (checkmandatoryFields()) {
                    await _deleteType(body)
                    await dispatch(loadTreeviewItem(TypeService.getAll, "TYPE"))
                    dispatch(selectTreeViewItem(selectedIndex, "TYPE", 2))
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
}

export const saveTypeAndProperty = () => async (dispatch, getState) => {
    const anyChangesType = getState().dataGridType.anyChangesType
    const anyChangesProperty = getState().dataGridType.anyChangesProperty
    let body;
    let typebody;
    if (anyChangesType) {
        const lastUpdateUser = getState().auth.user.email
        const now = new Date();
        var newdate = dateFormatter(now);
        var saveVal = getState().dataGridType.rows[Object.keys(getState().dataGridType.rows)[0]]
        var mySaveVal = {}
        Object.keys(saveVal).map(e => {
            if (saveVal[e] !== "" && e !== "HIERARCHY" && e !== "selectedIndex") {
                mySaveVal[e] = saveVal[e]
            }
        })

        typebody = JSON.stringify({ ...mySaveVal, LAST_UPDT_USER: lastUpdateUser, LAST_UPDT_DATE: newdate })
        try {
            let res = await TypeService.createUpdateType(typebody);
        } catch (err) {
            return Promise.reject(err)
        }

    }
    if (anyChangesProperty) {
        const changedRows = getState().dataGridType.changedRows
        const propertyRows = getState().dataGridType.propertyRows
        const deletedRows = getState().dataGridType.deletedRows
        await Promise.all(
            Object.keys(propertyRows).map(async e => {
                if (changedRows.some(s => s === e)) {
                    delete propertyRows[e]["HIEARCHY"]
                    body = JSON.stringify({ ...propertyRows[e] })
                    try {
                        let res = await TypeService.createUpdateProperty(body);
                    }
                    catch { }
                }
            }))
        await Promise.all(
            deletedRows.map(async e => {
                body = JSON.stringify({ ROW_ID: e })
                let res = await TypeService.deleteProperty(body);
            }))
    }
    dispatch(loadTreeviewItem(TypeService.getAll, "TYPE"))
    if (anyChangesType)
        dispatch(selectTreeItemAfterSave("TYPE", 2, typebody.TYPE))
    dispatch({
        type: AFTER_GO_INDEX_TYPE
    })
}

export const saveTypeFunc = () => (dispatch, getState) => {
    if (checkmandatoryFields()) {
        dispatch(saveTypeAndProperty())
        return true
    }
    else {
        dispatch({
            type: "ADD_ERROR_SUCCESS",
            payload: "Pleas check mandatory fields"
        })
        return false
    }
}

export const refreshDataGridType = () => (dispatch, getState) => {
    const selectedItem = getState().treeview.selectedItem
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

export const cleanAllDataGrid = () => dispatch => {
    dispatch({
        type: CLEAN_ALL_DATAGRID_TYPE
    })
}