import {
    SELECT_TREEVIEW_ITEM_TAGS,
    CLEAN_ALL_TREEVIEW_TAGS
} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';

import { addNewTag } from "./tags"
import history from "../../../routers/history"
import {
    setConfirmation,
    setExtraBtn,
} from "../../reducers/confirmation";

import { saveTag } from "./tags"

let cancelToken;


const _goIndex = (index) => dispatch => {
    if (index === -2) {
        dispatch(addNewTag());
        var pathnames = window.location.pathname.split("/").filter((x) => x);
        pathnames[3] = "new"
        var routeTo = "";
        pathnames.map(e => {
            routeTo += `/${e}`
        })
        history.push(routeTo)
    }
}

const _saveAndGoToIndex = (index) => dispatch => {
    if (index === -2) {
        dispatch(saveTag())
        dispatch(_goIndex(index));
    }
}


export const selectTreeview = (index) => async (dispatch, getState) => {
    const anyChanges = getState().tags.anyChanges
    if (anyChanges) {
        dispatch(
            setConfirmation({
                title: "Are you sure you want to save this?",
                body: <>asd</>,
                agreefunction: async () => {
                    dispatch(_saveAndGoToIndex(index));
                },
            })
        );
        dispatch(
            setExtraBtn({
                extraBtnText: "Don't save go",
                extrafunction: () => {
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

