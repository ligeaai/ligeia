import {
    LOAD_LINK_EDITOR,
    LOAD_LINKS,
    UPDATE_LINKS_VALUE,
    SET_LINK_ACTIVE,
    CLEAN_ALL_LINK_EDITOR,
    LOAD_LINK_EDITOR_SCHEMA,
    CLEAN_CHANGED_LIST_LINK_EDITOR
} from "../../actions/types"
const initialState = {
    linkEditorSchema: false,
    data: false,
    links: false,
    changedLinks: new Set(),
    isLinksActive: true
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case CLEAN_CHANGED_LIST_LINK_EDITOR:
            return {
                ...state,
                changedLinks: new Set(),
            }
        case CLEAN_ALL_LINK_EDITOR:
            return {
                ...state,
                data: false,
                links: false,
                changedLinks: new Set(),
            }
        case SET_LINK_ACTIVE:
            return {
                ...state,
                isLinksActive: payload
            }

        case LOAD_LINK_EDITOR:
            return {
                ...state,
                data: payload
            }
        case LOAD_LINK_EDITOR_SCHEMA:
            return {
                ...state,
                linkEditorSchema: payload
            }
        case LOAD_LINKS:
            return {
                ...state,
                links: payload
            }
        case UPDATE_LINKS_VALUE:
            state.links[payload.linkId][payload.key] = payload.value
            state.changedLinks.add(payload.linkId)
            return {
                ...state,
            }
        default:
            return {
                ...state,
            }
    }
};
