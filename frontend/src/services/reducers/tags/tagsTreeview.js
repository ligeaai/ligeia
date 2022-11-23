import {
    SELECT_TREEVIEW_ITEM_TAGS
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
        default:
            return {
                ...state
            }
    }
};
