import {
    LOAD_COLLAPSABLE_MENU_ITEMS
} from "../../actions/types"



const initialState = {
    menuItems: []
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_COLLAPSABLE_MENU_ITEMS:
            return {
                ...state,
                menuItems: payload
            }
        default:
            return {
                ...state,
            }
    }
};
