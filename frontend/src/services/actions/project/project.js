import {
    CHANGE_VALUE_PROJECT,
    CLEAN_VALUE_PROJECT
} from "../types"

export const changeProjectValue = (key, value) => (dispatch) => {
    dispatch({
        type: CHANGE_VALUE_PROJECT,
        payload: { key: key, value: value }
    })
}

export const cleanProjectReducer = (key, value) => (dispatch) => {
    dispatch({
        type: CLEAN_VALUE_PROJECT,
    })
}

