import React from "react";
import {
    LOAD_TYPE_ROWS_ITEM,
    LOAD_ITEM_ROWS_ITEM,
    LOAD_ROWS_ITEM,
    ADD_COLUMN_ITEM,
    CLEAN_DATAGRID_ITEM,
    EDIT_DATAGRID_CELL_ITEM,
    SET_IS_ACTIVE_CONFIRMATION,
    ADD_ERROR_SUCCESS,
    CLEAR_COLUMN_ITEM,
    SELECT_TREEVIEW_ITEM,
    DELETE_COLUMN_ITEM,
    CLEAN_ITEM_AND_ROWS
} from "../types"
import axios from "axios";
import ItemService from "../../api/item"
import { MyTextField } from "../../../pages/main/configuration/items/properties/myTextField";
import { uuidv4 } from "../../utils/uuidGenerator";
import { instance, config } from "../../baseApi";
import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview"


const typeFinder = {
    "BOOL": "PROPERTY_STRING",
    "TEXT": "PROPERTY_STRING",
    "NUMBER": "PROPERTY_VALUE",
    "INT": "PROPERTY_VALUE",
    "CODE": "PROPERTY_CODE",
    "BLOB_ID": "PROPERTY_BINARY"
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
        this.editable = true;
        this.renderCell = myMemoFunction;
        this.renderEditCell = myMemoFunction;
    }
}

const _createColumn = (columnId) => dispatch => {
    dispatch({
        type: ADD_COLUMN_ITEM,
        payload: { [columnId]: new column({ columnId: columnId }) }
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
        console.log(res);
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
        };
        Object.keys(res.data).map(e => {
            res.data[e].map(a => {
                response[a.PROPERTY_NAME] = a
            })
        })
        console.log(response);
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
    var typeRows = getState().itemDataGrid.typeRows

    try {
        const body = JSON.stringify({ ITEM_ID })
        if (itemCancelToken) {
            itemCancelToken.cancel()
        }
        itemCancelToken = axios.CancelToken.source();
        let res = await ItemService.getItemValues(body, itemCancelToken)
        console.log(res);
        let itemRows = {}
        let columnsId = []
        Promise.all(
            Object.keys(typeRows).map(a => {
                Object.keys(res.data).map(e => {
                    itemRows[a] = { [e]: "" }
                })

            })
        )
        Promise.all(
            Object.keys(res.data).map(a => {
                columnsId.push(a)
                res.data[a].map(e => {
                    if (e.PROPERTY_INFO !== "BOOL") {
                        itemRows[e.PROPERTY_TYPE] = { ...itemRows[e.PROPERTY_TYPE], [a]: e[typeFinder[e.PROPERTY_INFO]] }
                    } else {
                        itemRows[e.PROPERTY_TYPE] = { ...itemRows[e.PROPERTY_TYPE], [a]: e[typeFinder[e.PROPERTY_INFO]] === "False" ? false : true }
                    }

                })
                itemRows["HISTORY"] = { ...itemRows["HISTORY"], [a]: a }
            })
        )
        dispatch({
            type: LOAD_ITEM_ROWS_ITEM,
            payload: itemRows
        })
        dispatch(_conbineTypeAndItemRows(typeRows, itemRows))
        columnsId.map(a => {
            dispatch(_createColumn(a));
        })
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
    console.log(id, field, value);
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


export const saveItem = () => async (dispatch, getState) => {
    const type = getState().drawerMenu.selectedItem.TYPE
    if (dispatch(checkMandatoryFields())) {
        const uuid = uuidv4()
        var COLUMNS = []
        var ITEM = {}
        Promise.all(
            Object.keys(getState().itemDataGrid.columns).map(async (a, i) => {
                if (i > 3) {
                    COLUMNS.push({
                        "START_TIME": a,
                    })
                    Object.keys(getState().itemDataGrid.rows).map((e) => {
                        //&& getState().itemDataGrid.rows[e][a] === null && getState().itemDataGrid.rows[e][a] === ""
                        if (e !== "HISTORY") {
                            var propsRowUuid = uuidv4()
                            if (getState().itemDataGrid.rows[e].PROPERTY_TYPE === "NUMBER" || getState().itemDataGrid.rows[e].PROPERTY_TYPE === "INT") {
                                COLUMNS[i - 4] = {
                                    ...COLUMNS[i - 4],
                                    [getState().itemDataGrid.rows[e].PROPERTY_NAME]: {
                                        "VALUE": parseInt(getState().itemDataGrid.rows[e][a]),
                                        "VALUE_TYPE": getState().itemDataGrid.rows[e].PROPERTY_TYPE,
                                        "ROW_ID": propsRowUuid.replace(/-/g, "")
                                    }

                                }
                            }
                            else if (getState().itemDataGrid.rows[e].PROPERTY_TYPE === "BOOL") {
                                COLUMNS[i - 4] = {
                                    ...COLUMNS[i - 4],
                                    [getState().itemDataGrid.rows[e].PROPERTY_NAME]: {
                                        "VALUE": getState().itemDataGrid.rows[e][a] ? "True" : "False",
                                        "VALUE_TYPE": getState().itemDataGrid.rows[e].PROPERTY_TYPE,
                                        "ROW_ID": propsRowUuid.replace(/-/g, "")
                                    }
                                }
                            }
                            else if (getState().itemDataGrid.rows[e].PROPERTY_TYPE === "CODE") {
                                COLUMNS[i - 4] = {
                                    ...COLUMNS[i - 4],
                                    [getState().itemDataGrid.rows[e].PROPERTY_NAME]: {
                                        "VALUE": getState().itemDataGrid.rows[e][a],
                                        "VALUE_TYPE": getState().itemDataGrid.rows[e].PROPERTY_TYPE,
                                        "ROW_ID": propsRowUuid.replace(/-/g, "")
                                    }
                                }
                            }
                            else {
                                COLUMNS[i - 4] = {
                                    ...COLUMNS[i - 4],
                                    [getState().itemDataGrid.rows[e].PROPERTY_NAME]: {
                                        "VALUE": getState().itemDataGrid.rows[e][a],
                                        "VALUE_TYPE": getState().itemDataGrid.rows[e].PROPERTY_TYPE,
                                        "ROW_ID": propsRowUuid.replace(/-/g, "")
                                    }
                                }
                            }
                        }
                    })

                    var rowUuid = uuidv4()
                    ITEM = {
                        "ITEM_ID": getState().treeview.selectedItem.ITEM_ID ? getState().treeview.selectedItem.ITEM_ID : uuid.replace(/-/g, ""),
                        "ITEM_TYPE": getState().treeview.selectedItem.ITEM_TYPE,
                        "LAST_UPDT_USER": getState().auth.user.email,
                        "ROW_ID": getState().treeview.selectedItem.ROW_ID ? getState().treeview.selectedItem.ROW_ID : rowUuid.replace(/-/g, "")
                    }
                }
            })
        )
        const body = JSON.stringify({ ITEM, COLUMNS });
        try {

            let res = await instance
                .post(
                    "/item/item-and-property/",
                    body,
                    config()
                )
            dispatch(loadTreeviewItem(async (body, cancelToken) => {
                return await ItemService.getAll(body, cancelToken, type);
            }, "NAME"))
            return res
        } catch (err) {
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

export const newItem = () => async (dispatch, getState) => {
    const rows = getState().itemDataGrid.typeRows
    const ITEM_TYPE = getState().drawerMenu.selectedItem.TYPE
    dispatch({
        type: LOAD_ROWS_ITEM,
        payload: rows
    })
    dispatch({
        type: CLEAR_COLUMN_ITEM,
    })
    dispatch({
        type: SELECT_TREEVIEW_ITEM,
        payload: { ITEM_TYPE: ITEM_TYPE, selectedIndex: -2 }
    })
}


export const addNewColumn = (columnId) => (dispatch, getState) => {
    var typeRows = getState().itemDataGrid.typeRows
    var itemRows = getState().itemDataGrid.itemRows

    Promise.all(
        Object.keys(typeRows).map(a => {
            if (typeRows[a].PROPERTY_TYPE !== "BOOL") {
                itemRows[a] = { ...itemRows[a], [columnId]: "" }
            } else {
                itemRows[a] = { ...itemRows[a], [columnId]: false }
            }

        })
    )
    itemRows.HISTORY = { ...itemRows["HISTORY"], [columnId]: columnId }
    dispatch({
        type: LOAD_ITEM_ROWS_ITEM,
        payload: itemRows
    })
    dispatch(_conbineTypeAndItemRows(typeRows, itemRows))
    dispatch(_createColumn(columnId))
}

export const deleteItem = () => async (dispatch, getState) => {
    const ITEM_ID = getState().treeview.selectedItem.ITEM_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const type = getState().drawerMenu.selectedItem.TYPE
    const body = JSON.stringify({ ITEM_ID });
    try {
        let res = await instance
            .post(
                "/item/delete/",
                body,
                config()
            )
        await dispatch(loadTreeviewItem(async (body, cancelToken) => {
            return await ItemService.getAll(body, cancelToken, type);
        }, "NAME"))
        dispatch(selectTreeViewItem(selectedIndex, "NAME"));
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
};

export const cleanDataGridItemAndRows = () => dispatch => {
    dispatch({
        type: CLEAN_ITEM_AND_ROWS
    })
}