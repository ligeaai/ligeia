import React from "react";
import {
    LOAD_TYPE_ROWS_ITEM,
    LOAD_ROWS_ITEM,
    ADD_COLUMN_ITEM,
    CLEAN_DATAGRID_ITEM,
    EDIT_DATAGRID_CELL_ITEM,
    SET_IS_ACTIVE_CONFIRMATION,
    ADD_ERROR_SUCCESS,
    DELETE_COLUMN_ITEM,
    CLEAN_ITEM_AND_ROWS,
    UPDATE_COL_ITEM
} from "../types"
import axios from "axios";
import ItemService from "../../api/item"
import { MyTextField } from "../../../pages/main/configuration/items/properties/myTextField";
import { uuidv4 } from "../../utils/uuidGenerator";
import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview"
import { newDate, swapDayAndYear } from "../../utils/dateFormatter";
const typeFinder = {
    "BOOL": "PROPERTY_STRING",
    "TEXT": "PROPERTY_STRING",
    "NUMBER": "PROPERTY_VALUE",
    "INT": "PROPERTY_VALUE",
    "CODE": "PROPERTY_CODE",
    "BLOB_ID": "PROPERTY_BINARY",
    "DATE": "PROPERTY_DATE"
}

const MemoizedInputBaseEditInputCell = React.memo(MyTextField);

function myMemoFunction(params) {
    return <MemoizedInputBaseEditInputCell {...params} />;
}

export class column {
    constructor(props) {
        this.field = props.columnId;
        this.headerName = "";
        this.width = 150;
        this.filterable = false;
        this.sortable = false;
        this.editable = props.editable;
        this.renderCell = myMemoFunction;
        this.renderEditCell = myMemoFunction;
        this.cellClassName = "myRenderCell"
    }
}

const _createColumn = (columnId) => (dispatch, getState) => {
    const isNew = getState().treeview.selectedItem.selectedIndex
    const create = getState().auth.user.role.PROPERTY_ID.ITEM.CREATE
    const update = getState().auth.user.role.PROPERTY_ID.ITEM.UPDATE
    let editable = false;
    if (isNew === -2 && create) {
        editable = true
    } else if (isNew === -2 && !create && update) {
        editable = false
    } else if (update) {
        editable = true
    }
    dispatch({
        type: ADD_COLUMN_ITEM,
        payload: { [columnId]: new column({ columnId: columnId, editable: editable }) }
    })
    dispatch({
        type: UPDATE_COL_ITEM,
        payload: { key: columnId, value: true }
    })
}

const _conbineTypeAndItemRows = (typeRows, itemRows) => dispatch => {
    let rows = {}
    Promise.all(
        Object.keys(typeRows).map(a => {
            rows[a] = { ...typeRows[a], ...itemRows[a] }
        })
    )
    dispatch({
        type: LOAD_ROWS_ITEM,
        payload: rows
    })
}

let cancelToken;
export const loadTypeRowsDataGrid = () => async (dispatch, getState) => {
    const TYPE = getState().drawerMenu.selectedItem.TYPE
    const CULTURE = getState().lang.cultur
    try {
        const body = JSON.stringify({ TYPE, CULTURE })
        if (cancelToken) {
            cancelToken.cancel()
        }
        cancelToken = axios.CancelToken.source();
        let res = await ItemService.getTypeProperty(body, cancelToken)
        var response = {}
        response["HISTORY"] = {
            PROPERTY_NAME: "",
            CODE_LIST: null,
            MANDATORY: "none",
            LABEL_ID: "HISTORY",
            PROP_GRP: "",
            PROPERTY_TYPE: "HISTORY",
            SORT_ORDER: "1",
            "RESOURCE-LIST": [
                {
                    SHORT_LABEL: "",
                },
            ],
            "UNICODE": "False"
        };
        Object.keys(res.data).map(e => {
            res.data[e].map(a => {
                if (a.HIDDEN === "False") {
                    response[a.PROPERTY_NAME] = a
                }
            })
        })
        dispatch({
            type: LOAD_TYPE_ROWS_ITEM,
            payload: response
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

let itemCancelToken;
export const loadItemRowsDataGrid = () => async (dispatch, getState) => {
    const ITEM_ID = getState().treeview.selectedItem.ITEM_ID
    const ITEM_TYPE = getState().drawerMenu.selectedItem.TYPE
    var typeRows = getState().itemDataGrid.typeRows
    try {
        const body = JSON.stringify({ ITEM_ID })
        if (itemCancelToken) {
            itemCancelToken.cancel()
        }
        itemCancelToken = axios.CancelToken.source();
        let res = await ItemService.getItemValues(body, itemCancelToken)
        let rows = {}
        let columnsId = []
        let itemRows = {}
        Promise.all(
            Object.keys(typeRows).map(a => {
                Object.keys(res.data).map(e => {
                    rows[a] = { [swapDayAndYear(e)]: "" }
                    itemRows = {
                        ...itemRows, [e]: {
                            ...itemRows[e], [a]: {
                                "ITEM_TYPE": ITEM_TYPE,
                                "PROPERTY_TYPE": typeRows[a].PROPERTY_NAME,
                                "PROPERTY_INFO": "BOOL",
                                "VALUE": null,
                                "ROW_ID": null,
                                "START_DATETIME": swapDayAndYear(e),
                                "END_DATETIME": "9000-01-01",
                                "LAYER_NAME": "KNOC"
                            }
                        }
                    }
                })

            })
        )
        Promise.all(
            Object.keys(res.data).map(a => {
                let columnId = a[2] === "-" ? swapDayAndYear(a) : a
                columnsId.push(a)
                dispatch(_createColumn(a[2] === "-" ? swapDayAndYear(a) : a));
                res.data[a].map(e => {
                    if (e.PROPERTY_INFO === "DATE") {
                        rows[e.PROPERTY_TYPE] = { ...rows[e.PROPERTY_TYPE], [columnId]: newDate(e[typeFinder[e.PROPERTY_INFO]]) }
                        itemRows[a][e.PROPERTY_TYPE].VALUE = newDate(e[typeFinder[e.PROPERTY_INFO]])
                    } else if (e.PROPERTY_INFO !== "BOOL") {
                        rows[e.PROPERTY_TYPE] = { ...rows[e.PROPERTY_TYPE], [columnId]: e[typeFinder[e.PROPERTY_INFO]] }
                        itemRows[a][e.PROPERTY_TYPE].VALUE = e[typeFinder[e.PROPERTY_INFO]]
                    } else {
                        // if ("NORTH" !== e.PROPERTY_TYPE) {
                        rows[e.PROPERTY_TYPE] = { ...rows[e.PROPERTY_TYPE], [columnId]: e[typeFinder[e.PROPERTY_INFO]] === "False" ? false : true }
                        itemRows[a][e.PROPERTY_TYPE].VALUE = e[typeFinder[e.PROPERTY_INFO]] === "False" ? false : true
                        // }
                    }
                    // if ("NORTH" !== e.PROPERTY_TYPE) {
                    rows[e.PROPERTY_TYPE] = { ...rows[e.PROPERTY_TYPE], [`${columnId}ID`]: e.ROW_ID }
                    itemRows[a][e.PROPERTY_TYPE].ROW_ID = e.ROW_ID
                    // }
                })
                rows["HISTORY"] = { ...rows["HISTORY"], [columnId]: newDate(a) }
            })
        )
        dispatch(_conbineTypeAndItemRows(typeRows, rows))
    } catch (err) {
        return Promise.reject(err)
    }
}

export const cleanDataGrid = () => dispatch => {
    dispatch({
        type: CLEAN_DATAGRID_ITEM
    })
}

export const editDataGridCell = (id, field, value) => dispatch => {
    dispatch({
        type: EDIT_DATAGRID_CELL_ITEM,
        payload: { id, field, value }
    })
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
}

export const checkMandatoryFields = () => (dispatch, getState) => {
    var returnValue = true
    Object.keys(getState().itemDataGrid.rows).map((e) => {
        if (getState().itemDataGrid.rows[e].MANDATORY === "True") {
            Object.keys(getState().itemDataGrid.columns).map(async (a, i) => {
                if (i > 3) {
                    if (getState().itemDataGrid.rows[e][a] === "") {
                        returnValue = false
                    }
                }
            })
        }
    })
    return returnValue
}

const saveSupport = (rows, e, a) => {
    var propsRowUuid = uuidv4()
    const typeSaveFinder = {
        "BOOL": rows[e][a] ? "True" : "False",
        "TEXT": rows[e][a],
        "NUMBER": parseInt(rows[e][a]),
        "INT": parseInt(rows[e][a]),
        "CODE": rows[e][a],
        "BLOB_ID": rows[e][a],
        "DATE": rows[e][a] === "" ? "" : rows[e][a],
        "NULL": rows[e][a]
    }
    return {
        "PROPERTY_TYPE": e,
        "PROPERTY_INFO": rows[e].PROPERTY_TYPE,
        "ROW_ID": rows[e][`${a}ID`] ? rows[e][`${a}ID`] : propsRowUuid.replace(/-/g, ""),
        "START_DATETIME": a[2] === "-" ? swapDayAndYear(a) : a,
        "END_DATETIME": "9000-01-01",
        [typeFinder[rows[e].PROPERTY_TYPE]]: typeSaveFinder[rows[e].PROPERTY_TYPE],
        "UNICODE": rows[e].UNICODE
    }
}

export const saveItem = () => async (dispatch, getState) => {
    const type = getState().drawerMenu.selectedItem.TYPE
    const row = getState().itemDataGrid.rows
    const col = getState().itemDataGrid.col
    if (dispatch(checkMandatoryFields())) {
        let PROPERTYS = []
        let DELETED = []
        Promise.all(
            Object.keys(col).map(e => {
                Object.keys(row).map(a => {
                    if (!col[e])
                        DELETED.push(e)
                    else if (row[a][e] !== "" && a !== "HISTORY")
                        PROPERTYS.push(saveSupport(row, a, e))
                })
            })
        )
        let ITEM = {
            "ITEM_ID": getState().treeview.selectedItem.ITEM_ID ? getState().treeview.selectedItem.ITEM_ID : uuidv4().replace(/-/g, ""),
            "ITEM_TYPE": type,
            "ROW_ID": getState().treeview.selectedItem.ROW_ID ? getState().treeview.selectedItem.ROW_ID : uuidv4().replace(/-/g, ""),
            "LAYER_NAME": "KNOC"
        }
        const body = JSON.stringify({ ITEM, PROPERTYS });
        const deleteBody = JSON.stringify({ ITEM, DELETED });
        try {
            let res;
            if (getState().treeview.selectedItem.selectedIndex === -2)
                res = await ItemService.create(body)
            else {
                res = await ItemService.update(body)
                if (DELETED.length > 0)
                    res = await ItemService.remove(deleteBody)
            }
            dispatch(loadTreeviewItem(async (body, cancelToken) => {
                return await ItemService.getAll(body, cancelToken, type);
            }, "PROPERTY_STRING"))
            return res
        } catch (err) {
            dispatch({
                type: ADD_ERROR_SUCCESS,
                payload: err.response.data.Message
            })
            return err
        }
    }
    else {
        dispatch({
            type: ADD_ERROR_SUCCESS,
            payload: "You must fill in the mandatory fields"
        })
    }
}

export const addNewColumn = (columnId) => (dispatch, getState) => {
    var rows = getState().itemDataGrid.rows
    Promise.all(
        Object.keys(rows).map(a => {
            if (rows[a].PROPERTY_TYPE === "HISTORY") {
                rows[a][columnId] = columnId
            }
            else if (rows[a].PROPERTY_TYPE !== "BOOL") {
                rows[a][columnId] = ""
            }
            else {
                rows[a][columnId] = false
            }

        })
    )
    dispatch(_createColumn(columnId))
}

export const deleteItem = () => async (dispatch, getState) => {
    const ITEM_ID = getState().treeview.selectedItem.ITEM_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const type = getState().drawerMenu.selectedItem.TYPE
    const body = JSON.stringify({ ITEM_ID });
    try {
        let res = await ItemService.remove(body)
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await ItemService.getAll(body, cancelToken, type);
        }, "PROPERTY_STRING"))
        dispatch(selectTreeViewItem(selectedIndex, "PROPERTY_STRING"));
    }
    catch (err) {
    }
}

export const deleteColum = (field) => (dispatch) => {
    dispatch({
        type: DELETE_COLUMN_ITEM,
        payload: field
    });
    dispatch({
        type: SET_IS_ACTIVE_CONFIRMATION,
        payload: true
    })
    dispatch({
        type: UPDATE_COL_ITEM,
        payload: { key: field[2] === "-" ? swapDayAndYear(field) : field, value: false }
    })

};

export const cleanDataGridItemAndRows = () => dispatch => {
    dispatch({
        type: CLEAN_ITEM_AND_ROWS
    })
}

