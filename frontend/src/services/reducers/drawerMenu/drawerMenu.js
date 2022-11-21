import {
    SET_SELECTED_DRAWER_ITEM,
    TOGGLE_DRAWER_MENU,
    MOUSE_ENTER_DRAWER,
    MOUSE_LEAVE_DRAWER,
    LOAD_DRAWER_MENU
} from "../../actions/types"



const initialState = {
    isOpen: false,
    // temp: 0,//temporary value determines the drawer stat before the drawer hover
    width: "68px",
    selectedItem: { SHORT_LABEL: "Home" },
    data: null
};



export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case "persist/REHYDRATE":
            try {
                return {
                    ...state,
                    selectedItem: payload.drawerMenu.selectedItem
                }
            } catch {
                console.log("catch");
                return {
                    ...state,
                    selectedItem: { SHORT_LABEL: "Home" }
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
