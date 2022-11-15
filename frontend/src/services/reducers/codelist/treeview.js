import {
    LOAD_TREEVIEW_ITEM_CODELIST,
    SELECT_TREEVIEW_ITEM_CODELIST,
    CLEAN_TREEVIEW_SELECT_CODELIST
} from "../../actions/types"
const initialState = {
    treeMenuItem: [],
    selectedItem: {}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_TREEVIEW_ITEM_CODELIST:
            return {
                ...state,
                treeMenuItem: payload
            }
        case SELECT_TREEVIEW_ITEM_CODELIST:
            return {
                ...state,
                selectedItem: payload
            }
        case CLEAN_TREEVIEW_SELECT_CODELIST:
            return {
                ...state,
                selectedItem: {}
            }
        default:
            return {
                ...state,
            }
    }
};
