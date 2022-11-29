import { uuidv4 } from "../../utils/uuidGenerator"
import {
    SET_ROW_DATAGRID_TYPE,
    SET_CHANGE_TYPE_VALUE_CELL_TAG
} from "../types"

import { selectType } from "./treeview"

const _createNewType = () => {

    const uuid = uuidv4()
    return [
        {
            "ROW_ID": uuid.replace(/-/g, ""),
            "TYPE": "",
            "TYPE_CLASS": "",
            "LABEL_ID": "",
            "CHANGE_INTERVAL": "",
            "LAYER_NAME": "",
            "HIDDEN": "",
            "BASE_TYPE": "",
            "CODE_LIST_TYPE": "",
            "IS_QUICK_LINK": "",
            "PROP_TBL_NAME": "",
            "BASE_TBL_NAME": "",
            "TAG_TBL_NAME": "",
            "LAST_UPDT_USER": "",
            "LAST_UPDT_DATE": "",
            "HIERARCHY": [
                uuid.replace(/-/g, "")
            ]
        }
    ]
}
export const addNewType = () => dispatch => {

    const newType = _createNewType()
    dispatch({
        type: SET_ROW_DATAGRID_TYPE,
        payload: newType
    })
    dispatch(selectType(-2))
}


export const onChangeTypeCell = (id, field, value) => dispatch => {
    dispatch({
        type: SET_CHANGE_TYPE_VALUE_CELL_TAG,
        payload: { id: id, field: field, value: value }
    })
}