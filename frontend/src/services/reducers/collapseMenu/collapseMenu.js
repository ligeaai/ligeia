import {
    LOAD_COLLAPSABLE_MENU_ITEMS,
    SET_SELECTED_COLLAPSE_MENU_ITEM,
    CLEAN_COLLAPSE_MENU
} from "../../actions/types"



const initialState = {
    menuItems: [],
    selectedItem: null
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case "persist/REHYDRATE":
            try {
                return {
                    ...state,
                    selectedItem: payload.collapseMenu.selectedItem,
                }
            } catch {
                return {
                    ...state,
                    menuItems: [],
                    selectedItem: null
                }
            }
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
        case CLEAN_COLLAPSE_MENU:
            return {
                ...state,
                menuItems: [],
                selectedItem: null
            }
        default:
            return {
                ...state,
            }
    }
};
