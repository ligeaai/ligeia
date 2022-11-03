import {
    ADD_DATE_BREAK_COLUMN,
    DELETE_DATE_BREAK_COLUMN,
    ADD_ROW,
    EDIT_ROW
} from "../types"

import { instance, config } from '../../baseApi';

//----------------COLUMN------------
export const addColum = (column, time) => (dispatch, getState) => {
    var newRows = {}
    Object.keys(getState().companyDataGrid.rows).map((e) => {
        if (getState().companyDataGrid.rows[e].PROPERTY_TYPE === "BOOL") {
            newRows[e] = { ...getState().companyDataGrid.rows[e], [column.key]: false }
        }
        else if (getState().companyDataGrid.rows[e].PROPERTY_TYPE === "HISTORY") {
            newRows[e] = { ...getState().companyDataGrid.rows[e], [column.key]: time }
        }
        else {
            newRows[e] = { ...getState().companyDataGrid.rows[e], [column.key]: "" }
        }
    })
    dispatch({
        type: ADD_DATE_BREAK_COLUMN,
        payload: { ...column, newRows }
    });
};

export const deleteColum = (field) => (dispatch) => {
    dispatch({
        type: DELETE_DATE_BREAK_COLUMN,
        payload: field
    });
};

//----------------ROWS------------
export const loadRows = (CULTURE, TYPE) => async (dispatch) => {

    const body = JSON.stringify({
        CULTURE,
        TYPE,
    });

    try {
        let res = await instance
            .post(
                "/type/details/", body, config
            )
        var response = {}
        response["HISTORY"] = {
            PROPERTY_NAME: "",
            CODE_LIST: null,
            MANDATORY: "none",
            LABEL_ID: "HISTORY",
            PROP_GRP: "",
            PROPERTY_TYPE: "HISTORY",
            SORT_ORDER: "",
            "RESOURCE-LIST": [
                {
                    SHORT_LABEL: "",
                },
            ],
        };
        res.data.TYPE["TYPE PROPERTY COLUMNS"].TYPE.map(e => {
            response[e.LABEL_ID] = e
        })
        res.data.TYPE["TYPE PROPERTY COLUMNS"].BASETYPE.map(e => {
            response[e.LABEL_ID] = e
        })
        dispatch({
            type: ADD_ROW,
            payload: response
        });
        return response;
    } catch (err) {
        return err
    }
};


export const editRow = (rowId, colId, value) => async (dispatch) => {
    dispatch({
        type: EDIT_ROW,
        payload: { rowId, colId, value }
    });
}
