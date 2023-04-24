import {
    LOAD_TAGS_LABEL,
    SET_TAG_SAVE_VALUES,
    CLEAN_ALL_TAGS,
    FILL_SAVE_VALUES_TAGS
} from "../types"


import {
    setConfirmation,
} from "../../reducers/confirmation";

import TagService from "../../api/tags";

import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview";
import { setIsActiveConfirmation } from "../confirmation/historyConfirmation";
import { uuidv4 } from "../../utils/uuidGenerator"
import { swapDayAndYear } from "../../utils/dateFormatter"

const _fillUuids = (rows) => async (dispatch, getState) => {
    Object.keys(rows).map(e => {
        if (rows[e].PROPERTY_TYPE === "GUID") {
            var newUuid = uuidv4()
            dispatch({
                type: SET_TAG_SAVE_VALUES,
                payload: { key: rows[e].PROPERTY_NAME, value: newUuid.replace(/-/g, "") }
            })
        }
    })
}

export const fillTagData = (tagId) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ TAG_ID: tagId })
        let res = await TagService.getTagItem(body)
        res.data[0].LAST_UPDATE_DATE = swapDayAndYear(res.data[0].LAST_UPDATE_DATE)
        res.data[0].START_DATETIME = swapDayAndYear(res.data[0].START_DATETIME)
        dispatch({
            type: FILL_SAVE_VALUES_TAGS,
            payload: res.data[0]
        })
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const loadTagsLabel = () => async (dispatch, getState) => {
    try {
        const CULTURE = getState().lang.cultur
        const body = JSON.stringify({ CULTURE })
        let res = await TagService.getTagsProperty(body)
        console.log(res.data);
        // transfer to backend
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
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const cleanSaveValue = () => dispatch => {
    dispatch({
        type: FILL_SAVE_VALUES_TAGS,
        payload: {}
    })
}

export const addNewTag = () => async (dispatch, getState) => {
    dispatch({
        type: FILL_SAVE_VALUES_TAGS,
        payload: {}
    })
    await dispatch(loadTagsLabel())
    const sortedTagLink = getState().tags.tagValues.TAG_LINK
    const sortedTagInfo = getState().tags.tagValues.TAG_INFORMATIONS
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: "NAME", value: "." }
    })
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: "SHORT_NAME", value: "" }
    })
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: "TRANSACTION_PROPERTY", value: "" }
    })
    dispatch(_fillUuids(sortedTagInfo.concat(sortedTagLink)))
}

export const addSaveTagValue = (key, value) => (dispatch) => {
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: key, value: value }
    })
}

export const cleanAllTags = () => dispatch => {
    dispatch({
        type: CLEAN_ALL_TAGS
    })
}

const _newTagSave = async (saveValues, user) => {
    var newUuid = uuidv4()
    const body = JSON.stringify({
        ...saveValues,
        "END_DATETIME": "9000-01-01",
        "LINK_ID": saveValues.LINK_ID ? saveValues.LINK_ID : newUuid.replace(/-/g, ""),
    })
    try {
        let res = await TagService.createAndUpdate(body)
        return Promise.resolve(res.data)
    } catch (err) {
        return Promise.reject(err)
    }
}

export const saveTag = () => async (dispatch, getState) => {
    const values = getState().tags.saveValues
    const properties = getState().tags.tagValues
    var user = getState().auth.user.email
    const saveValues = getState().tags.saveValues
    if (_checkmandatoryFields(values, properties)) {
        let res = await _newTagSave(saveValues, user)
        dispatch(loadTreeviewItem(TagService.getAll, "NAME"))
        dispatch(setIsActiveConfirmation(false))
        return Promise.resolve(res.data)
    }
    else {
        dispatch({
            type: "ADD_ERROR_SUCCESS",
            payload: "Pleas check mandatory fields"
        })
        return false
    }
}

export const saveButton = () => async (dispatch, getState) => {
    const name = getState().treeview.selectedItem.NAME
    dispatch(
        setConfirmation({
            title: "You want to save this ?",
            body: <>{name}</>,
            agreefunction: async () => {
                await dispatch(saveTag())
            },
        })
    );
}

async function _deleteTag(TAG_ID) {
    try {
        const body = JSON.stringify({ TAG_ID })
        let res = await TagService.remove(body)
        return Promise.resolve(res.data)
    } catch (err) { return Promise.reject(err); }
}

export const deleteTag = () => async (dispatch, getState) => {
    const tagId = getState().treeview.selectedItem.TAG_ID
    const selectedIndex = getState().treeview.selectedItem.selectedIndex
    const name = getState().treeview.selectedItem.NAME
    dispatch(
        setConfirmation({
            title: "Are you sure you want to delete this?",
            body: <>{name}</>,
            agreefunction: async () => {
                dispatch(cleanAllTags())
                await _deleteTag(tagId)
                await dispatch(loadTreeviewItem(TagService.getAll, "NAME"));
                dispatch(selectTreeViewItem(selectedIndex, "NAME"))
                dispatch(loadTagsLabel())
            },
        })
    );
}

const mandatoryFields = (properties) => {
    return properties.filter(e => e.MANDATORY === "True")
}

const _checkmandatoryFields = (values, properties) => {
    var myPropInformation = mandatoryFields(properties.TAG_INFORMATIONS);
    var myPropLink = mandatoryFields(properties.TAG_LINK);
    var returnval = true

    myPropInformation.map(e => {
        if (!values[e.PROPERTY_NAME] && e.PROPERTY_NAME !== "ITEM_ID") {
            returnval = false
        }
    })
    myPropLink.map(e => {
        if (!values[e.PROPERTY_NAME] && e.PROPERTY_NAME !== "ITEM_ID") {
            returnval = false
        }
    })
    return returnval
}
