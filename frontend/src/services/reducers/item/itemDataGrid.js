import {
    LOAD_TYPE_ROWS_ITEM,
    LOAD_ITEM_ROWS_ITEM,
    LOAD_ROWS_ITEM,
    ADD_COLUMN_ITEM,
    CLEAN_DATAGRID_ITEM,
    EDIT_DATAGRID_CELL_ITEM,
    CLEAR_COLUMN_ITEM,
    DELETE_COLUMN_ITEM,
    CLEAN_ITEM_AND_ROWS
} from "../../actions/types"
import { Checkbox, TextField } from "@mui/material"
const columns = {
    "PROPERTY_NAME": {
        field: "PROPERTY_NAME",
        headerName: "Property",
        minWidth: 200,
        renderCell: (params) => {
            return params.row.SHORT_LABEL;
        },
        cellClassName: "super-app-theme--cell",
    },
    "PROP_GRP": {
        field: "PROP_GRP",
        headerName: "Category",
        minWidth: 100,
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
    typeRows: {},
    itemRows: {},
    rows: {},
    isChanged: false,
    loading: false
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case CLEAN_ITEM_AND_ROWS:
            return {
                ...state,
                itemRows: {},
                rows: {}
            }
        case DELETE_COLUMN_ITEM:
            delete state.columns[payload];
            Object.keys(state.rows).map((e) => {
                delete state.rows[e][payload]
            })
            Object.keys(state.itemRows).map((e) => {
                delete state.itemRows[e][payload]
            })
            return {
                ...state,
                columns: { ...state.columns },
                rows: { ...state.rows },
                itemRows: { ...state.itemRows }
            }
        case CLEAR_COLUMN_ITEM:
            return {
                ...state,
                columns: columns,
            }
        case EDIT_DATAGRID_CELL_ITEM:
            return {
                ...state,
                rows: {
                    ...state.rows, [payload.id]: {
                        ...state.rows[payload.id], [payload.field]: payload.value
                    }
                },
                itemRows: {
                    ...state.itemRows, [payload.id]: {
                        ...state.itemRows[payload.id], [payload.field]: payload.value
                    }
                },
                isChanged: true
            }

        case CLEAN_DATAGRID_ITEM:
            return {
                ...state,
                typeRows: {},
                itemRows: {},
                rows: {},
                isChanged: false,
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
        case LOAD_ITEM_ROWS_ITEM:
            return {
                ...state,
                itemRows: payload
            }
        default:
            return {
                ...state,
            }
    }
};
