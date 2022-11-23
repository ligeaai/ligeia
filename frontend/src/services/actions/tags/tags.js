import {
    SELECT_TREEVIEW_ITEM_TAGS,
    LOAD_TAGS_LABEL,
    SET_TAG_SAVE_VALUES
} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';

let cancelToken;
function _uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}
const _fillUuids = (rows) => async (dispatch, getState) => {
    Object.keys(rows).map(e => {
        if (rows[e].PROPERTY_TYPE === "GUID") {
            var newUuid = _uuidv4()
            dispatch({
                type: SET_TAG_SAVE_VALUES,
                payload: { key: rows[e].PROPERTY_NAME, value: newUuid.replace(/-/g, "") }
            })
        }
    })

}
export const addNewTag = () => async (dispatch, getState) => {
    try {
        const CULTURE = getState().lang.cultur
        const TYPE = "TAG_CACHE"
        const body = JSON.stringify({ CULTURE, TYPE })
        let res = await instance
            .post(
                "/type/details/",
                body,
                config()
            )
        dispatch({
            type: LOAD_TAGS_LABEL,
            payload: res.data.TAG_CACHE
        })
        dispatch(_fillUuids(res.data.TAG_CACHE))
    } catch (err) {
        console.log(err);

    }
}

export const addSaveTagValue = (key, value) => (dispatch) => {
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: key, value: value }
    })
}

