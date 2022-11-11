import {
    LOAD_LINK_EDITOR,
    LOAD_LINKS
} from "../../actions/types"
const initialState = {
    data: false,
    links: false
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_LINK_EDITOR:
            return {
                ...state,
                data: payload
            }
        case LOAD_LINKS:
            return {
                ...state,
                links: payload
            }
        default:
            return {
                ...state,
            }
    }
};
