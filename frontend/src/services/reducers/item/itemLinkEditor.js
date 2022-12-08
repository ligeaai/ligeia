import {
    LOAD_LINK_EDITOR_SCHEMA_ITEM,
    LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE_ITEM,
    LOAD_LINK_EDITOR,
    SET_IS_LINK_ACTIVE,
    LOAD_LINK_LINKS,
    UPDATE_LINKS_VALUE,
    CLEAN_CHANGED_LINK
} from "../../actions/types"
const initialState = {
    linkEditorSchema: false,
    linkEditorSchemaFromType: false,
    data: false,
    dataFromType: false,
    links: false,
    changedLinks: new Set(),
    isLinksActive: false
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case CLEAN_CHANGED_LINK:
            return {
                ...state,
                changedLinks: new Set(),
            }
        case UPDATE_LINKS_VALUE:
            state.links[payload.linkId][payload.key] = payload.value
            state.changedLinks.add(payload.linkId)
            return {
                ...state,
            }
        case LOAD_LINK_LINKS: {
            return {
                ...state,
                links: payload
            }
        }
        case SET_IS_LINK_ACTIVE:
            return {
                ...state,
                isLinksActive: payload
            }
        case LOAD_LINK_EDITOR:
            return {
                ...state,
                data: payload.TO_TYPE,
                dataFromType: payload.FROM_TYPE
            }
        case LOAD_LINK_EDITOR_SCHEMA_ITEM:
            return {
                ...state,
                linkEditorSchema: payload
            }
        case LOAD_LINK_EDITOR_SCHEMA_FROM_TYPE_ITEM:
            return {
                ...state,
                linkEditorSchemaFromType: payload
            }
        default:
            return {
                ...state,
            }
    }
};
