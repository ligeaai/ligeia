import {
    SELECT_TREEVIEW_ITEM_TAGS,
    LOAD_TAGS_LABEL,
    SET_TAG_SAVE_VALUES,
    CLEAN_ALL_TAGS,
    TOGGLE_CHANGES_TAGS,
    FILL_SAVE_VALUES_TAGS
} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';
import {
    setConfirmation,
    setExtraBtn,
} from "../../reducers/confirmation";
import { loadTreeView, _checkmandatoryFields, _goIndex } from "./tagsTreeview"


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
    var newUuid = _uuidv4()
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: "TAG_ID", value: newUuid.replace(/-/g, "") }
    })

}

export const _fillTagData = (tagId) => async (dispatch, getState) => {
    // var newUuid = _uuidv4()
    // dispatch({
    //     type: SET_TAG_SAVE_VALUES,
    //     payload: { key: "TAG_ID", value: newUuid.replace(/-/g, "") }
    // })
    try {
        const body = JSON.stringify({ TAG_ID: tagId })
        console.log(body);
        let res = await instance
            .post(
                "/tags/item/",
                body,
                config()
            )
        dispatch({
            type: FILL_SAVE_VALUES_TAGS,
            payload: res.data[0]
        })
        console.log(res);
    } catch {

    }
}
export const loadTagsLabel = () => async (dispatch, getState) => {
    try {
        const CULTURE = getState().lang.cultur
        const body = JSON.stringify({ CULTURE })
        let res = await instance
            .post(
                "/tags/tags-property/",
                body,
                config()
            )
        console.log(res);
        var sortedTagInfo = res.data.TAG_INFORMATIONS.sort((a, b) =>
            parseInt(a.SORT_ORDER) > parseInt(b.SORT_ORDER) ? 1 : -1
        )
        var sortedTagLink = res.data.TAG_LINK.sort((a, b) =>
            parseInt(a.SORT_ORDER) > parseInt(b.SORT_ORDER) ? 1 : -1
        )


        dispatch({
            type: LOAD_TAGS_LABEL,
            payload: { "TAG_INFORMATIONS": sortedTagInfo, "TAG_LINK": sortedTagLink }
        })

    } catch (err) {
        console.log(err);

    }
}


export const addNewTag = () => async (dispatch, getState) => {
    dispatch({
        type: TOGGLE_CHANGES_TAGS,
        payload: true
    })
    try {
        const CULTURE = getState().lang.cultur
        const body = JSON.stringify({ CULTURE })
        let res = await instance
            .post(
                "/tags/tags-property/",
                body,
                config()
            )
        console.log(res);
        var sortedTagInfo = res.data.TAG_INFORMATIONS.sort((a, b) =>
            parseInt(a.SORT_ORDER) > parseInt(b.SORT_ORDER) ? 1 : -1
        )
        var sortedTagLink = res.data.TAG_LINK.sort((a, b) =>
            parseInt(a.SORT_ORDER) > parseInt(b.SORT_ORDER) ? 1 : -1
        )

        dispatch({
            type: LOAD_TAGS_LABEL,
            payload: { "TAG_INFORMATIONS": sortedTagInfo, "TAG_LINK": sortedTagLink }
        })
        dispatch(_fillUuids(sortedTagInfo.concat(sortedTagLink)))
    } catch (err) {
        console.log(err);

    }
}

export const addSaveTagValue = (key, value) => (dispatch) => {
    dispatch({
        type: TOGGLE_CHANGES_TAGS,
        payload: true
    })
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: key, value: value }
    })
}

export const cleanAllTags = (key, value) => dispatch => {
    dispatch({
        type: CLEAN_ALL_TAGS
    })
}

const _newTagSave = async (saveValues) => {
    var newUuid = _uuidv4()
    console.log(saveValues);
    const body = JSON.stringify({
        ...saveValues,
        "END_DATETIME": "9000-01-01",
        "LINK_ID": saveValues.LINK_ID ? saveValues.LINK_ID : newUuid.replace(/-/g, ""),
        "FROM_ITEM_ID": saveValues.TAG_ID,
        "FROM_ITEM_TYPE": "TAG_CACHE",
        "LINK_TYPE": "TAG_ITEM",
    })
    console.log(body);
    try {

        let res = await instance
            .post(
                "/tags/save/",
                body,
                config()
            )

    } catch {

    }
}

export const saveNewTag = () => async (dispatch, getState) => {

    const saveValues = getState().tags.saveValues
    const anyChanges = getState().tags.anyChanges
    const values = getState().tags.saveValues
    const properties = getState().tags.tagValues
    if (anyChanges) {
        dispatch(
            setConfirmation({
                title: "Are you sure you want to save this?",
                body: <></>,
                agreefunction: async () => {
                    if (_checkmandatoryFields(values, properties)) {
                        console.log("sadsadasd");
                        dispatch({
                            type: TOGGLE_CHANGES_TAGS,
                            payload: false
                        })
                        await _newTagSave(saveValues)

                        dispatch(loadTreeView())
                    } else {
                        dispatch({
                            type: "ADD_ERROR_SUCCESS",
                            payload: "Pleas check mandatory fields"
                        })
                    }
                },
            })
        );
    }

}


export const saveTag = (saveValues) => async (dispatch, getState) => {

    dispatch({
        type: TOGGLE_CHANGES_TAGS,
        payload: false
    })
    _newTagSave(saveValues)

}


async function _deleteTag(TAG_ID) {
    try {
        console.log(TAG_ID);
        const body = JSON.stringify({ TAG_ID })
        console.log(body);
        let res = await instance
            .post(
                "/tags/delete/",
                body,
                config()
            )
        console.log(res);
    } catch { console.log("sadsad"); }
}

export const deleteTag = () => async (dispatch, getState) => {
    const tagId = getState().tagsTreeview.selectedItem.TAG_ID
    const selectedIndex = getState().tagsTreeview.selectedItem.selectedIndex

    dispatch(
        setConfirmation({
            title: "Are you sure you want to delete this?",
            body: <></>,
            agreefunction: async () => {
                console.log(tagId);
                dispatch({
                    type: TOGGLE_CHANGES_TAGS,
                    payload: false
                })
                dispatch(cleanAllTags())
                await _deleteTag(tagId)
                await dispatch(loadTreeView());
                dispatch(_goIndex(selectedIndex))
            },
        })
    );
}
