import {
    LOAD_DATAGRID_ROW_CODELIST,
    ON_CHANGE_CODELIST_CELL
} from "../types"

import { instance, config } from '../../baseApi';
function _uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16).replace(/-/g, "")
    );
}

const _createNewParent = () => (dispatch, getState) => {
    const culture = getState().lang.cultur
    const uuid = _uuidv4()
    return [
        {
            "ROW_ID": uuid.replace(/-/g, ""),
            "LIST_TYPE": "CODE_LIST",
            "CULTURE": culture,
            "CODE": "",
            "CODE_TEXT": "",
            "PARENT": "",
            "LEGACY_CODE": "",
            "VAL1": "",
            "VAL2": "",
            "VAL3": "",
            "DATE1": "",
            "DATE2": "",
            "CHAR1": "",
            "CHAR2": "",
            "LAYER_NAME": "",
            "HIDDEN": "",
            "LAST_UPDT_USER": "",
            "LAST_UPDT_DATE": "",
            "HIERARCHY": [
                uuid.replace(/-/g, "")
            ]
        }
    ]
}


export const addNewCodeListItemSchema = () => async (dispatch, getState) => {
    const payload = dispatch(_createNewParent())
    dispatch({
        type: LOAD_DATAGRID_ROW_CODELIST,
        payload: payload
    })
}


export const refreshDataGridCodelist = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeviewCodelist.selectedItem.ROW_ID;
    const body = JSON.stringify({ ROW_ID });
    try {
        let res = await instance
            .post(
                "/code-list/deep-details/",
                body,
                config
            )
        dispatch({
            type: LOAD_DATAGRID_ROW_CODELIST,
            payload: res.data
        })
        return res
    } catch (err) {
        return err
    }
}

export const onChangeCell = (id, field, value) => async (dispatch, getState) => {

    const rows = getState().dataGridCodeList.rows
    rows[id][field] = value

    dispatch({
        type: ON_CHANGE_CODELIST_CELL,
        payload: rows
    })
}

