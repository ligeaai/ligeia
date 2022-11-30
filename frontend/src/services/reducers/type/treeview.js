import {
    LAOD_TREEVIEW_TYPE,
    SELECT_TREEVIEW_ITEM_TYPE,
    LOAD_FILTERED_TREEVIEW_ITEM_TYPE,
    SET_FILTERED_LAYER_NAME_TYPE
} from "../../actions/types"
const initialState = {
    treeMenuItem: [],
    filteredMenuItem: [],
    filteredLayerName: "NONE",
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
        case LOAD_FILTERED_TREEVIEW_ITEM_TYPE:
            return {
                ...state,
                filteredMenuItem: payload
            }
        case SET_FILTERED_LAYER_NAME_TYPE:
            return {
                ...state,
                filteredLayerName: payload
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
