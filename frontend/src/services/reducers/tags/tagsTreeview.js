import {
    SELECT_TREEVIEW_ITEM_TAGS,
    CLEAN_ALL_TREEVIEW_TAGS,
    LOAD_TREEVIEW_TAGS
} from "../../actions/types"



const initialState = {
    treeMenuItem: [],
    selectedItem: {}
};



export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SELECT_TREEVIEW_ITEM_TAGS:
            return {
                ...state,
                selectedItem: payload
            }
        case LOAD_TREEVIEW_TAGS:
            return {
                ...state,
                treeMenuItem: payload
            }
        case CLEAN_ALL_TREEVIEW_TAGS:
            return {
                ...state,
                treeMenuItem: [],
                selectedItem: {}
            }
        default:
            return {
                ...state
            }
    }
};
