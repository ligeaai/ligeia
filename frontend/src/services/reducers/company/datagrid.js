import {
    ADD_DATE_BREAK_COLUMN,
    DELETE_DATE_BREAK_COLUMN,
    ADD_ROW,
    EDIT_ROW,
    CLEAN_DATA_GRID,
    IS_CHANGED_HANDLER,
    ADD_COLUMN,
    SET_LOADING,
    CLEAN_ROWS
} from "../../actions/types"
import { Checkbox, TextField } from "@mui/material"
const columns = {
    "PROPERTY_NAME": {
        field: "PROPERTY_NAME",
        headerName: "Property",
        width: 200,
        renderCell: (params) => {
            return params.row.SHORT_LABEL;
        },
        cellClassName: "super-app-theme--cell",
    },
    "PROP_GRP": {
        field: "PROP_GRP",
        headerName: "Category",
        width: 100,
        cellClassName: "super-app-theme--cell",
    },
    "SORT_ORDER": {
        field: "SORT_ORDER",
        headerName: "Order",
        width: 100,
        cellClassName: "super-app-theme--cell",
    },
    "MANDATORY": {
        field: "MANDATORY",
        headerName: "Mandatory",
        renderCell: (params) => {
            if (params.row.PROPERTY_NAME === "HISTORY") {
                return <TextField disabled sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                }} />;
            }
            return <Checkbox disabled checked={params.row.MANDATORY === "True"} />;
        },
        width: 100,
        cellClassName: "super-app-theme--cell",
    }
}
const rows = {}
const initialState = {
    columns: columns,
    rows: rows,
    isChanged: false,
    loading: false
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_LOADING:
            return {
                ...state,
                loading: payload
            }
        case ADD_DATE_BREAK_COLUMN:
            state.columns[payload.key] = payload.value
            return {
                ...state,
                columns: { ...state.columns },
                rows: payload.newRows
            }
        case DELETE_DATE_BREAK_COLUMN:
            delete state.columns[payload];
            Object.keys(state.rows).map((e) => {
                delete state.rows[e][payload]
            })
            return {
                ...state,
                columns: { ...state.columns },
                rows: { ...state.rows }
            }
        case CLEAN_DATA_GRID:
            Object.keys(state.columns).map((e, i) => {
                if (e === "MANDATORY" || e === "PROPERTY_NAME" || e === "PROP_GRP" || e === "SORT_ORDER") {

                }
                else {
                    delete state.columns[e]
                }
            })
            return {
                ...state,
                columns: { ...state.columns },
                isChanged: false
            }

        case ADD_COLUMN:
            return {
                ...state,
                columns: payload
            }
        case ADD_ROW:
            return {
                ...state,
                rows: payload
            }
        case EDIT_ROW:
            state.rows[payload.rowId][payload.colId] = payload.value
            return {
                ...state,
                rows: { ...state.rows }
            }
        case IS_CHANGED_HANDLER:
            return {
                ...state,
                isChanged: payload
            }
        case CLEAN_ROWS:
            return {
                ...state,
                rows: {}
            }
        default:
            return {
                ...state,
            }
    }
};
