import {
    SET_SELECTED_DRAWER_ITEM,
    LOAD_DRAWER_MENU,
    DRAWER_MENU_SET_OPEN,
} from "../../actions/types"

const initialState = {
    selectedItem: { SHORT_LABEL: "Home" },
    data: null,
    openTabs: {
        "Reporting Desinger": true,
        "Administration": true,
        "Tools": true,
        "Configuration": true,
        "Geography": true,
        "Items": true,
        "Organization": true,
        "Routes And Stops": true,
        "Tags": true,
        "Drawer": true
    }
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case "persist/REHYDRATE":
            try {
                return {
                    ...state,
                    selectedItem: payload.drawerMenu.selectedItem,
                    openTabs: payload.drawerMenu.openTabs
                }
            } catch {
                return {
                    ...state,
                    selectedItem: { SHORT_LABEL: "Home" },
                }
            }
        case DRAWER_MENU_SET_OPEN:
            return {
                ...state,
                openTabs: {
                    ...state.openTabs,
                    [payload]: !state?.openTabs[payload]
                }
            }
        case LOAD_DRAWER_MENU:
            return {
                ...state,
                data: payload
            }
        case SET_SELECTED_DRAWER_ITEM:
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
