import {
    LOAD_LINK_EDITOR,
    LOAD_LINKS,
    UPDATE_LINKS_VALUE
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
            var links = []
            payload.map(e => {
                links[e.LINK_ID] = e
            })

            return {
                ...state,
                links: links
            }
        case UPDATE_LINKS_VALUE:
            console.log(payload);
            state.links[payload.linkId][payload.key] = payload.value
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
};
