import {
    LOAD_TREEVIEW_ITEMS,
    SELECT_TREEVIEW_ITEM,
    CLEAN_TREEVIEW_SELECT,
    LOAD_FILTERED_TREEVIEW_ITEM,
    SET_FILTERED_LAYER_NAME,
    CLEAN_TREEVIEW
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
        case CLEAN_TREEVIEW:
            return {
                ...state,
                treeMenuItem: [],
                filteredMenuItem: [],
                filteredLayerName: "NONE",
                selectedItem: { selectedIndex: -3 }
            }
        case LOAD_TREEVIEW_ITEMS:
            return {
                ...state,
                treeMenuItem: payload
            }
        case LOAD_FILTERED_TREEVIEW_ITEM:
            return {
                ...state,
                filteredMenuItem: payload
            }
        case SET_FILTERED_LAYER_NAME:
            return {
                ...state,
                filteredLayerName: payload
            }
        case SELECT_TREEVIEW_ITEM:
            return {
                ...state,
                selectedItem: payload
            }
        case CLEAN_TREEVIEW_SELECT:
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
