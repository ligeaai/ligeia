import {
    LAOD_TREEVIEW_TYPE,
    SELECT_TREEVIEW_ITEM_TYPE
} from "../../actions/types"
const initialState = {
    treeMenuItem: [],
    selectedItem: { selectedIndex: -3 }
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LAOD_TREEVIEW_TYPE:
            return {
                ...state,
                treeMenuItem: payload
            }
        case SELECT_TREEVIEW_ITEM_TYPE:
            return {
                ...state,
                selectedItem: payload
            }
        default:
            return {
                ...state,
            }
    }
};
