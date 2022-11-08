import {
    LOAD_DATAGRID_ROW_CODELIST,
    ON_CHANGE_CODELIST_CELL

} from "../../actions/types"

import { columns } from "../../../pages/main/configuration/initialize/dataGridColumn";

const rows = []
const initialState = {
    columns: columns,
    rows: rows,
    changedRows: [],
    deletedRows: []
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
        case ON_CHANGE_CODELIST_CELL:
            return {
                ...state,
                rows: payload
            }
        default:
            return {
                ...state,
            }
    }
};
