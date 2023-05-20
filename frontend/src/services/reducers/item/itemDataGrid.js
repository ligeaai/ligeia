import {
    LOAD_TYPE_ROWS_ITEM,
    LOAD_ROWS_ITEM,
    ADD_COLUMN_ITEM,
    CLEAN_DATAGRID_ITEM,
    EDIT_DATAGRID_CELL_ITEM,
    CLEAR_COLUMN_ITEM,
    DELETE_COLUMN_ITEM,
    CLEAN_ITEM_AND_ROWS,
    UPDATE_COL_ITEM,
    UPDATE_COLUMN_WIDTH_ITEMS
} from "../../actions/types"
import { Checkbox, TextField } from "@mui/material"

const columns = {
    "PROPERTY_NAME": {
        field: "PROPERTY_NAME",
        headerName: "Property",
        // minWidth: 100,
        renderCell: (params) => {
            return params.row.SHORT_LABEL;
        },
        cellClassName: "super-app-theme--cell",
    },
    "PROP_GRP": {
        field: "PROP_GRP",
        headerName: "Category",
        // minWidth: 100,
        cellClassName: "super-app-theme--cell",
    },
    "SORT_ORDER": {
        field: "SORT_ORDER",
        headerName: "Order",
        minWidth: 100,
        cellClassName: "super-app-theme--cell",
    },
    "MANDATORY": {
        field: "MANDATORY",
        headerName: "Mandatory",
        renderCell: (params) => {
            if (params.row.LABEL_ID === "HISTORY") {
                return <TextField disabled sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                        border: "none",
                    },
                }} />;
            }
            return <Checkbox disabled checked={params.row.MANDATORY === "True"} />;
        },
        minWidth: 100,
        cellClassName: "super-app-theme--cell",
    }
}

const initialState = {
    columns: columns,
    col: {},
    typeRows: {},
    rows: {},
    loading: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case UPDATE_COLUMN_WIDTH_ITEMS: {
            return {
                ...state,
                columns: {
                    ...state.columns, [payload.key]: {
                        ...state.columns[payload.key],
                        width: payload.val
                    }
                }
            }
        }
        case CLEAN_ITEM_AND_ROWS:
            return {
                ...state,
                rows: {},
                col: {}
            }
        case UPDATE_COL_ITEM:
            return {
                ...state,
                col: { ...state.col, [payload.key]: payload.value },
            }
        case DELETE_COLUMN_ITEM:
            delete state.columns[payload];
            Object.keys(state.rows).map((e) => {
                delete state.rows[e][payload]
            })
            return {
                ...state,
                columns: { ...state.columns },
                rows: { ...state.rows },
            }
        case CLEAR_COLUMN_ITEM:
            return {
                ...state,
                columns: columns,
                rows: state.typeRows,
                col: {}
            }
        case EDIT_DATAGRID_CELL_ITEM:
            return {
                ...state,
                rows: {
                    ...state.rows, [payload.id]: {
                        ...state.rows[payload.id], [payload.field]: payload.value
                    }
                },
            }
        case CLEAN_DATAGRID_ITEM:
            return {
                ...state,
                typeRows: {},
                rows: {},
                col: {},
            }
        case ADD_COLUMN_ITEM:
            return {
                ...state,
                columns: { ...state.columns, ...payload }
            }
        case LOAD_ROWS_ITEM:
            return {
                ...state,
                rows: payload
            }
        case LOAD_TYPE_ROWS_ITEM:
            return {
                ...state,
                typeRows: payload
            }
        default:
            return {
                ...state,
            }
    }
};
