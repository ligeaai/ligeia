import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    MOUSE_ENTER_DRAWER,
    MOUSE_LEAVE_DRAWER,
    LOAD_DRAWER_MENU,
    DRAWER_MENU_SET_OPEN
} from "../../actions/types"



const initialState = {
    isOpen: false,
    // temp: 0,//temporary value determines the drawer stat before the drawer hover
    width: "68px",
    selectedItem: { SHORT_LABEL: "Home" },
    data: null,
    openTabs: {
        52729: true,
        52734: true,
        52728: true,
        52754: true,
        52738: true,
        52744: true,
        52748: true
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
                    width: payload.drawerMenu.width,
                    isOpen: payload.drawerMenu.isOpen,
                    openTabs: payload.drawerMenu.openTabs
                }
            } catch {
                return {
                    ...state,
                    selectedItem: { SHORT_LABEL: "Home" },
                    width: "68px",
                    isOpen: false,
                }
            }
        case DRAWER_MENU_SET_OPEN:
            return {
                ...state,
                openTabs: {
                    ...state.openTabs,
                    [payload]: !state.openTabs[payload]
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
        case TOGGLE_DRAWER_MENU:
            return {
                ...state,
                width: state.isOpen ? "68px" : "248px",
                isOpen: !state.isOpen,
            }
        // case MOUSE_ENTER_DRAWER:
        //     if (!state.isOpen) {
        //         return {
        //             ...state,
        //             temp: 1,
        //             isOpen: true,
        //             width: "248px"
        //         }
        //     }
        //     return { ...state }
        // case MOUSE_LEAVE_DRAWER:
        //     if (state.temp === 1) {
        //         return {
        //             ...state,
        //             temp: 0,
        //             isOpen: false,
        //             width: "68px"
        //         }
        //     }
        //     return { ...state }
        default:
            return {
                ...state,
            }
    }
};
