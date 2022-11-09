import {
    LOAD_DATAGRID_ROW_CODELIST,
    ON_CHANGE_CODELIST_CELL,
    ADD_ERROR_SUCCESS,
    CLEAN_AFTER_SAVE
} from "../types"

import { instance, config } from '../../baseApi';

import { loadTreeviwItemCodelist } from "./treeview"
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
    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }
    var changedRows = getState().dataGridCodeList.changedRows
    var rows = getState().dataGridCodeList.rows
    rows[id][field] = value
    changedRows.push(id)
    dispatch({
        type: ON_CHANGE_CODELIST_CELL,
        payload: { rows: rows, changedRows: changedRows.filter(onlyUnique) }
    })
}

const _save = async (value, userEmail) => {
    var temp = {}
    if (value.DATE1 !== "") {
        var d = value.DATE1.getDate();
        var m = value.DATE1.getMonth();
        m += 1;
        var y = value.DATE1.getFullYear();
        var newdate = (y + "-" + m + "-" + d);
        temp.DATE1 = newdate
    }
    if (value.DATE2 !== "") {
        d = value.DATE2.getDate();
        m = value.DATE2.getMonth();
        m += 1;
        y = value.DATE2.getFullYear();
        newdate = (y + "-" + m + "-" + d);
        temp.DATE2 = newdate
    }
    if (value.VAL1 !== "") {
        temp.VAL1 = parseInt(value.VAL1)
    }
    if (value.VAL2 !== "") {
        temp.VAL2 = parseInt(value.VAL2)
    }
    if (value.VAL3 !== "") {
        temp.VAL3 = parseInt(value.VAL3)
    }
    Object.keys(value).map(e => {
        if (value[e] !== "" && e !== "HIERARCHY") {
            temp[e] = value[e]
        }
    })
    temp["CACHE_KEY"] = value.ROW_ID
    temp.LAST_UPDT_USER = userEmail
    const body = JSON.stringify({ ...temp })
    console.log(body);
    try {
        let res = await instance
            .put(
                "/code-list/save-update/",
                body,
                config
            )
        return res
    } catch (err) {
        return false
    }
}
const _checkMandatoryFields = (value) => {
    if (value.CODE === "") {
        return false
    }
    if (value.CODE_TEXT === "") {
        return false
    }
    if (value.LAYER_NAME === "") {
        return false
    }
    if (value.HIDDEN === "") {
        return false
    }
    return true
}

export const saveCodeList = () => async (dispatch, getState) => {
    const changedRows = getState().dataGridCodeList.changedRows
    const rows = getState().dataGridCodeList.rows
    await Object.call(
        changedRows.map(e => {
            Object.keys(rows).map(async a => {
                if (e === a) {
                    if (_checkMandatoryFields(rows[e])) {
                        _save(rows[e], getState().auth.user.email)
                    } else {
                        dispatch({
                            type: ADD_ERROR_SUCCESS,
                            payload: "Mandatory fields: Code, Code text, Layer Name, Hidden"
                        })
                    }
                }
            })
        })
    )
    dispatch({
        type: CLEAN_AFTER_SAVE,
    })
    dispatch(loadTreeviwItemCodelist())
    // todo delete child
}




export const deleteCodeList = () => async (dispatch, getState) => {
    const ROW_ID = getState().treeviewCodelist.selectedItem.ROW_ID
    const body = JSON.stringify({ ROW_ID, CACHE_KEY: ROW_ID });
    try {
        let res = await instance
            .post(
                "/code-list/delete/",
                body,
                config
            )

    } catch (err) {
        return false
    }
    dispatch(loadTreeviwItemCodelist())
}