import {
    ADD_DATE_BREAK_COLUMN,
    DELETE_DATE_BREAK_COLUMN,
    ADD_ROW,
    EDIT_ROW,
    ADD_ITEM_TYPE,
    IS_CHANGED_HANDLER,
    SET_LOADING,
    CLEAN_DATA_GRID,
    CLEAN_ALL_DATAGRID
} from "../types"
import axios from "axios";

import { instance, config } from '../../baseApi';

export const cleanDataGrid = () => (dispatch) => {
    dispatch({
        type: CLEAN_DATA_GRID
    })
}
export const changeType = () => (dispatch) => {

}
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
    dispatch({
        type: IS_CHANGED_HANDLER,
        payload: true
    })
};

export const deleteColum = (field) => (dispatch) => {
    dispatch({
        type: DELETE_DATE_BREAK_COLUMN,
        payload: field
    });
    dispatch({
        type: IS_CHANGED_HANDLER,
        payload: true
    })
};

//----------------ROWS------------
export const addItemType = (type) => async (dispatch) => {
    dispatch({
        type: ADD_ITEM_TYPE,
        payload: type
    });
}
let cancelToken;
export const loadRows = (CULTURE, TYPE) => async (dispatch) => {
    const body = JSON.stringify({
        TYPE,
        CULTURE
    });
    dispatch({
        type: SET_LOADING,
        payload: true
    })
    if (cancelToken) {
        cancelToken.cancel()
    }
    cancelToken = axios.CancelToken.source();
    let res;
    try {
        res = await instance
            .post(
                "/type/details/", body, { ...config, cancelToken: cancelToken.token }
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
        Object.keys(res.data).map(e => {
            res.data[e].map(a => {
                response[a.PROPERTY_NAME] = a
            })
        })
        dispatch({
            type: ADD_ROW,
            payload: { ...response }
        });
    } catch (err) { }
    dispatch({
        type: SET_LOADING,
        payload: false
    })

};


export const editRow = (rowId, colId, value) => async (dispatch) => {
    dispatch({
        type: EDIT_ROW,
        payload: { rowId, colId, value }
    });
    dispatch({
        type: IS_CHANGED_HANDLER,
        payload: true
    })
}

export const cleanAllDataGrid = () => dispatch => {
    dispatch({
        type: CLEAN_ALL_DATAGRID
    })
}