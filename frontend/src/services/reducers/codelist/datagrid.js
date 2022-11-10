import {
    LOAD_DATAGRID_ROW_CODELIST,
    ON_CHANGE_CODELIST_CELL,
    CLEAN_AFTER_SAVE,
    SET_SELECTED_ROWS,
    CLEAN_SELECTED_ROWS,
    REFRESH_ROWS_CODELIST
} from "../../actions/types"

import { columns } from "../../../pages/main/configuration/initialize/dataGridColumn";


const rows = []
const initialState = {
    columns: columns,
    rows: rows,
    changedRows: [],
    deletedRows: [],
    selectedRows: [],
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
        case REFRESH_ROWS_CODELIST:
            return {
                ...state,
                rows: payload
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
                deletedRows: []
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
        default:
            return {
                ...state,
            }
    }
};
