import { uuidv4 } from "../../utils/uuidGenerator"
import {
    SET_ROW_DATAGRID_TYPE,
    SET_CHANGE_TYPE_VALUE_CELL_TAG,
    SET_PROPERTY_ROW,
    CHANGE_SELECTED_ROW_PROPERTY,
    SET_CHANGE_PROPERTY_VALUE_CELL_TAG,
    DELETE_SELECTED_ITEM_PROPERTY,
    ADD_NEW_PROPERTY,
    AFTER_GO_INDEX_TYPE
} from "../types"

import {
    setConfirmation,
    setExtraBtn,
} from "../../reducers/confirmation";

import { selectType, loadTreeView, checkmandatoryFields, _goIndex } from "./treeview"

import TypeService from "../../api/type"
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
    dispatch(selectType(-2))
}


export const onChangeTypeCell = (id, field, value) => dispatch => {
    dispatch({
        type: SET_CHANGE_TYPE_VALUE_CELL_TAG,
        payload: { id: id, field: field, value: value }
    })
}

export const onChangePropertyCell = (id, field, value) => dispatch => {
    dispatch({
        type: SET_CHANGE_PROPERTY_VALUE_CELL_TAG,
        payload: { id: id, field: field, value: value }
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
    } catch {
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
    const selectedIndex = getState().treeviewType.selectedItem.selectedIndex
    const body = JSON.stringify({ TYPE })
    dispatch(
        setConfirmation({
            title: "Are you sure you want to delete this?",
            body: <></>,
            agreefunction: async () => {
                if (checkmandatoryFields()) {
                    await _deleteType(body)
                    await dispatch(loadTreeView())
                    dispatch(_goIndex(selectedIndex))
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
    if (anyChangesType) {
        const lastUpdateUser = getState().auth.user.email
        const now = new Date();
        var d = now.getDate();
        var m = now.getMonth();
        m += 1;
        var y = now.getFullYear();
        var newdate = (y + "-" + m + "-" + d);
        var saveVal = getState().dataGridType.rows[Object.keys(getState().dataGridType.rows)[0]]
        var mySaveVal = {}
        Object.keys(saveVal).map(e => {
            if (saveVal[e] !== "" && e !== "HIERARCHY" && e !== "selectedIndex") {
                mySaveVal[e] = saveVal[e]
            }
        })

        const body = JSON.stringify({ ...mySaveVal, LAST_UPDT_USER: lastUpdateUser, LAST_UPDT_DATE: newdate })
        try {
            let res = await TypeService.createUpdateType(body);
        } catch (err) {
            return Promise.reject(err)
        }

    }
    if (anyChangesProperty) {
        const changedRows = getState().dataGridType.changedRows
        const propertyRows = getState().dataGridType.propertyRows
        const deletedRows = getState().dataGridType.deletedRows
        var changedKeys = Object.keys(changedRows)
        await Promise.all(
            Object.keys(propertyRows).map(async e => {
                if (changedRows.some(s => s === e)) {
                    delete propertyRows[e]["HIEARCHY"]
                    var body = JSON.stringify({ ...propertyRows[e] })
                    try {
                        let res = await TypeService.createUpdateProperty(body);
                    }
                    catch { }
                }
            }))
        await Promise.all(
            deletedRows.map(async e => {
                var body = JSON.stringify({ ROW_ID: e })
                let res = await TypeService.deleteProperty(body);
            }))
    }
    dispatch(loadTreeView())
    dispatch({
        type: AFTER_GO_INDEX_TYPE
    })
}

export const saveTypeFunc = () => (dispatch, getState) => {
    const anyChangesType = getState().dataGridType.anyChangesType
    const anyChangesProperty = getState().dataGridType.anyChangesProperty
    if (anyChangesType || anyChangesProperty) {
        dispatch(
            setConfirmation({
                title: "Are you sure you want to save this?",
                body: <></>,
                agreefunction: async () => {
                    if (checkmandatoryFields()) {
                        dispatch(saveTypeAndProperty())
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

}