import {
    LOAD_DATAGRID_ROW_RESOURCELIST,
    ON_CHANGE_RESOURCELIST_CELL,
    CLEAN_AFTER_SAVE_RESOURCELIST,
    SET_SELECTED_ROWS_RESOURCELIST,
    CLEAN_SELECTED_ROWS_RESOURCELIST,
    REFRESH_ROWS_RESOURCELIST,
    REFRESH_DELETECHILD_RESOURCELIST,
    ADD_NEW_CHILD_RESOURCELIST,
    CLEAN_ALL_DATAGRID_RESOURCELIST
} from "../../actions/types"

import { columns } from "../../../pages/main/configuration/initialize/resource/dataGridColumns";



const rows = []
const initialState = {
    columns: columns,
    rows: rows,
    changedRows: [],
    deletedRows: [],
    selectedRows: [],
    newChildRows: [],
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_DATAGRID_ROW_RESOURCELIST:
            const rows = []
            payload.map((e) => {
                rows[e.ROW_ID] = e
            })
            return {
                ...state,
                rows: rows
            }
        case ADD_NEW_CHILD_RESOURCELIST:
            return {
                ...state,
                newChildRows: [...state.newChildRows, payload]
            }
        case REFRESH_ROWS_RESOURCELIST:
            return {
                ...state,
                rows: payload
            }
        case REFRESH_DELETECHILD_RESOURCELIST:
            return {
                ...state,
                changedRows: payload.changedNew,
                deletedRows: payload.deletedRows,
                rows: payload.tempRows,
                selectedRows: []
            }
        case ON_CHANGE_RESOURCELIST_CELL:
            return {
                ...state,
                rows: payload.rows,
                changedRows: payload.changedRows
            }
        case CLEAN_AFTER_SAVE_RESOURCELIST:
            return {
                ...state,
                changedRows: [],
                deletedRows: [],
                newChildRows: []
            }
        case SET_SELECTED_ROWS_RESOURCELIST:
            return {
                ...state,
                selectedRows: payload
            }
        case CLEAN_SELECTED_ROWS_RESOURCELIST:
            return {
                ...state,
                selectedRows: []
            }
        case CLEAN_ALL_DATAGRID_RESOURCELIST:
            return {
                columns: columns,
                rows: [],
                changedRows: [],
                deletedRows: [],
                selectedRows: [],
                newChildRows: [],
            }
        default:
            return {
                ...state,
            }
    }
};