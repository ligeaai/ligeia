import {
    SELECT_TREEVIEW_ITEM_TAGS,

} from "../types"

import axios from "axios";
import { instance, config } from '../../baseApi';

import { addNewTag } from "./tags"

let cancelToken;
export const selectTreeview = (index) => async (dispatch, getState) => {
    if (index === -2) {
        dispatch(addNewTag());

    }
}


