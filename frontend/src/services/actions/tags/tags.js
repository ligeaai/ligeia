import {
    LOAD_TAGS_LABEL,
    SET_TAG_SAVE_VALUES,
    CLEAN_ALL_TAGS,
    TOGGLE_CHANGES_TAGS,
    FILL_SAVE_VALUES_TAGS
} from "../types"


import {
    setConfirmation,
} from "../../reducers/confirmation";

import TagService from "../../api/tags";

import { loadTreeviewItem, selectTreeViewItem } from "../treeview/treeview";
import { setIsActiveConfirmation } from "../confirmation/historyConfirmation";
import { uuidv4 } from "../../utils/uuidGenerator"

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
    var newUuid = uuidv4()
    dispatch({
        type: SET_TAG_SAVE_VALUES,
        payload: { key: "TAG_ID", value: newUuid.replace(/-/g, "") }
    })

}
const swapToYYYYMMDD = (props) => {
    return `${props[6]}${props[7]}${props[8]}${props[9]}-${props[3]}${props[4]}-${props[0]}${props[1]}`
}
export const _fillTagData = (tagId) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify({ TAG_ID: tagId })

        let res = await TagService.getTagItem(body)
        res.data[0].LAST_UPDATE_DATE = swapToYYYYMMDD(res.data[0].LAST_UPDATE_DATE)
        res.data[0].START_DATETIME = swapToYYYYMMDD(res.data[0].START_DATETIME)
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


export const addNewTag = () => async (dispatch, getState) => {
    dispatch({
        type: TOGGLE_CHANGES_TAGS,
        payload: true
    })
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
        type: TOGGLE_CHANGES_TAGS,
        payload: true
    })
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
        // "LAST_UPDT_USER": user,
        // "LAST_UPDT_DATE": new Date(),
        "TO_ITEM_ID": saveValues.TRANSACTION_PROPERTY,
        "TO_ITEM_TYPE": saveValues.TRANSACTION_TYPE,
        "END_DATETIME": "9000-01-01",
        "LINK_ID": saveValues.LINK_ID ? saveValues.LINK_ID : newUuid.replace(/-/g, ""),
        "FROM_ITEM_ID": saveValues.TAG_ID,
        "FROM_ITEM_TYPE": "TAG_CACHE",
        "LINK_TYPE": "TAG_ITEM",
    })
    try {
        let res = await TagService.createAndUpdate(body)
        console.log(res);
    } catch (err) {
        return Promise.reject(err)
    }
}

export const saveNewTag = () => async (dispatch, getState) => {

    const saveValues = getState().tags.saveValues
    const anyChanges = getState().tags.anyChanges
    const values = getState().tags.saveValues
    const properties = getState().tags.tagValues
    const name = getState().treeview.selectedItem.NAME
    var user = getState().auth.user.email
    if (anyChanges) {
        dispatch(
            setConfirmation({
                title: "You want to save this ?",
                body: <>{name}</>,
                agreefunction: async () => {
                    if (_checkmandatoryFields(values, properties)) {
                        dispatch({
                            type: TOGGLE_CHANGES_TAGS,
                            payload: false
                        })
                        await _newTagSave(saveValues, user)
                        dispatch(setIsActiveConfirmation(false))
                        dispatch(loadTreeviewItem(TagService.getAll, "NAME"))
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


export const saveTag = () => async (dispatch, getState) => {
    const values = getState().tags.saveValues
    const properties = getState().tags.tagValues
    if (_checkmandatoryFields(values, properties)) {
        console.log("asdsa");
        var user = getState().auth.user.email
        const saveValues = getState().tags.saveValues
        dispatch({
            type: TOGGLE_CHANGES_TAGS,
            payload: false
        })
        await _newTagSave(saveValues, user)
        dispatch(loadTreeviewItem(TagService.getAll, "NAME"))
        dispatch(setIsActiveConfirmation(false))
        console.log(true);
        return true
    }
    else {
        dispatch({
            type: "ADD_ERROR_SUCCESS",
            payload: "Pleas check mandatory fields"
        })
        return false
    }

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
                dispatch({
                    type: TOGGLE_CHANGES_TAGS,
                    payload: false
                })
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
