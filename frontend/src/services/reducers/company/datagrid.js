import {
    ADD_DATE_BREAK_COLUMN,
    DELETE_DATE_BREAK_COLUMN,
    ADD_ROW,
    EDIT_ROW
} from "../../actions/types"
import { Checkbox } from "@mui/material"
const initialState = {
    columns: {
        "PROPERTY_NAME": {
            field: "PROPERTY_NAME",
            headerName: "Property",
            width: 200,
            renderCell: (params) => {
                return params.row["RESOURCE-LIST"][0].SHORT_LABEL;
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
            headerName: "Sort Order",
            width: 100,
            cellClassName: "super-app-theme--cell",
        },
        "MANDATORY": {
            field: "MANDATORY",
            headerName: "Mandatory",
            renderCell: (params) => {
                return <Checkbox disabled checked={params.row.MANDATORY === "True"} />;
            },
            width: 100,
            cellClassName: "super-app-theme--cell",
        }
    },
    rows: {}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
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
        default:
            return {
                ...state,
            }
    }
};
