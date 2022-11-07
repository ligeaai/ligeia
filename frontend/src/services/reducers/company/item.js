import {
    SAVE_ITEM,
    ADD_ITEM_TYPE,
    LOAD_TREEVIEW_ITEM,
    SET_SELECTED_ITEM
} from "../../actions/types"
const initialState = {
    type: "",
    treeMenuItem: [],
    selectedItem: ""
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case ADD_ITEM_TYPE:
            return {
                ...state,
                type: payload
            }
        case LOAD_TREEVIEW_ITEM:
            return {
                ...state,
                treeMenuItem: payload
            }
        case SET_SELECTED_ITEM:
            return {
                ...state,
                selectedItem: payload
            }
        case SAVE_ITEM:
        default:
            return {
                ...state,
            }
    }
};
