import {
    SELECT_TREEVIEW_ITEM_TAGS,
    CLEAN_ALL_TREEVIEW_TAGS,
    LOAD_TREEVIEW_TAGS,
    FILL_SAVE_VALUES_TAGS
} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';

import { addNewTag } from "./tags"
import history from "../../../routers/history"
import {
    setConfirmation,
    setExtraBtn,
} from "../../reducers/confirmation";

import { saveTag, cleanAllTags, _fillTagData } from "./tags"
import { idID } from "@mui/material/locale";

let cancelToken;

export const loadTreeView = () => async (dispatch, getState) => {

    try {
        const CULTURE = getState().lang.lang
        let res = await instance
            .get(
                "/tags/details/",
                config()
            )
        console.log(res);
        var sortedResponse = res.data.sort((a, b) =>
            a.NAME > b.NAME ? 1 : -1
        )
        dispatch({
            type: LOAD_TREEVIEW_TAGS,
            payload: sortedResponse
        })
    } catch {
        console.log("castrsad");
    }
}


export const _goIndex = (index) => (dispatch, getState) => {
    if (index === -2) {
        dispatch({
            type: SELECT_TREEVIEW_ITEM_TAGS,
            payload: { selectedIndex: -2 }
        })
        dispatch({
            type: FILL_SAVE_VALUES_TAGS,
            payload: {}
        })
        dispatch(addNewTag());
        var pathnames = window.location.pathname.split("/").filter((x) => x);
        pathnames[3] = "new"
        var routeTo = "";
        pathnames.map(e => {
            routeTo += `/${e}`
        })
        history.push(routeTo)
    }
    // else if (index === -3) { }
    else {
        const treeLen = getState().tagsTreeview.treeMenuItem.length
        if (index < 0) {
            index = treeLen - 1
        }
        if (index >= treeLen) {
            index = 0
        }
        const tag = getState().tagsTreeview.treeMenuItem[parseInt(index)]
        dispatch({
            type: SELECT_TREEVIEW_ITEM_TAGS,
            payload: { ...tag, selectedIndex: index }
        })
        var pathnames = window.location.pathname.split("/").filter((x) => x);
        pathnames[3] = tag.NAME.toLowerCase();
        var routeTo = "";
        pathnames.map(e => {
            routeTo += `/${e}`
        });
        history.push(routeTo);
        dispatch(_fillTagData(tag.TAG_ID))
    }
}

const _saveAndGoToIndex = (index) => (dispatch, getState) => {
    const saveValues = getState().tags.saveValues

    dispatch(saveTag(saveValues))
    dispatch(cleanAllTags())
    dispatch(loadTreeView());
    dispatch(_goIndex(index));

}
const mandatoryFields = (properties) => {
    return properties.filter(e => e.MANDATORY === "True")
}

export const _checkmandatoryFields = (values, properties) => {
    console.log(properties);
    var myPropInformation = mandatoryFields(properties.TAG_INFORMATIONS);
    var myPropLink = mandatoryFields(properties.TAG_LINK);
    var returnval = true

    console.log(values);
    myPropInformation.map(e => {
        if (!values[e.PROPERTY_NAME] && e.PROPERTY_NAME !== "ITEM_ID") {
            console.log(e);
            returnval = false
        }
    })
    myPropLink.map(e => {
        if (!values[e.PROPERTY_NAME] && e.PROPERTY_NAME !== "ITEM_ID") {
            console.log(e);
            returnval = false
        }
    })
    return returnval
}

export const selectTreeview = (index) => async (dispatch, getState) => {
    const anyChanges = getState().tags.anyChanges
    const values = getState().tags.saveValues
    const properties = getState().tags.tagValues
    if (anyChanges) {
        dispatch(
            setConfirmation({
                title: "Are you sure you want to save this?",
                body: <></>,
                agreefunction: async () => {
                    console.log(_checkmandatoryFields(values, properties));
                    if (_checkmandatoryFields(values, properties)) {

                        dispatch(_saveAndGoToIndex(index));

                    }
                    else {
                        dispatch({
                            type: "ADD_ERROR_SUCCESS",
                            payload: "Pleas check mandatory fields"
                        })
                    }
                },
            })
        );
        dispatch(
            setExtraBtn({
                extraBtnText: "Don't save go",
                extrafunction: () => {
                    dispatch(cleanAllTags())
                    dispatch(_goIndex(index));
                },
            })
        );
    } else {
        dispatch(_goIndex(index));
    }
}


export const cleanTreeMenuSelect = () => async (dispatch) => {
    dispatch({
        type: CLEAN_ALL_TREEVIEW_TAGS
    })
}

