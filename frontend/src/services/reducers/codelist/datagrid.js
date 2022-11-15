import {
    LOAD_DATAGRID_ROW_CODELIST,
    ON_CHANGE_CODELIST_CELL,
    CLEAN_AFTER_SAVE,
    SET_SELECTED_ROWS,
    CLEAN_SELECTED_ROWS,
    REFRESH_ROWS_CODELIST,
    REFRESH_DELETECHILD_CODELIST,
    ADD_NEW_CHILD_CODELIST,
    CLEAN_ALL_DATAGRID_CODELIST
} from "../../actions/types"

import { columns } from "../../../pages/main/configuration/initialize/dataGridColumn";


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
        case LOAD_DATAGRID_ROW_CODELIST:
            const rows = []
            payload.map((e) => {
                rows[e.ROW_ID] = e
            })
            return {
                ...state,
                rows: rows
            }
        case ADD_NEW_CHILD_CODELIST:
            return {
                ...state,
                newChildRows: [...state.newChildRows, payload]
            }
        case REFRESH_ROWS_CODELIST:
            console.log(payload);
            return {
                ...state,
                rows: payload
            }
        case REFRESH_DELETECHILD_CODELIST:
            console.log(payload);
            return {
                ...state,
                changedRows: payload.changedNew,
                deletedRows: payload.deletedRows,
                rows: payload.tempRows,
                selectedRows: []
            }
        case ON_CHANGE_CODELIST_CELL:
            return {
                ...state,
                rows: payload.rows,
                changedRows: payload.changedRows
            }
        case CLEAN_AFTER_SAVE:
            return {
                ...state,
                changedRows: [],
                deletedRows: [],
                newChildRows: []
            }
        case SET_SELECTED_ROWS:
            return {
                ...state,
                selectedRows: payload
            }
        case CLEAN_SELECTED_ROWS:
            return {
                ...state,
                selectedRows: []
            }
        case CLEAN_ALL_DATAGRID_CODELIST:
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
