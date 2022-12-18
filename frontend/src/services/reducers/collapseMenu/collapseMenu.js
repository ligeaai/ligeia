import {
    LOAD_COLLAPSABLE_MENU_ITEMS,
    SET_SELECTED_COLLAPSE_MENU_ITEM
} from "../../actions/types"



const initialState = {
    menuItems: [],
    selectedItem: null
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_COLLAPSABLE_MENU_ITEMS:
            return {
                ...state,
                menuItems: payload
            }
        case SET_SELECTED_COLLAPSE_MENU_ITEM:
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
