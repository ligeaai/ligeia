import {
    LOAD_TAGS_LABEL,
    SET_TAG_SAVE_VALUES,
    CLEAN_ALL_TAGS,
    TOGGLE_CHANGES_TAGS
} from "../../actions/types"



const initialState = {
    tagValues: [],
    saveValues: {},
    anyChanges: false
};



export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_TAGS_LABEL:
            return {
                ...state,
                tagValues: payload
            }
        case SET_TAG_SAVE_VALUES:
            return {
                ...state,
                saveValues: { ...state.saveValues, [payload.key]: payload.value }
            }
        case TOGGLE_CHANGES_TAGS:
            return {
                ...state,
                anyChanges: payload
            }
        case CLEAN_ALL_TAGS:
            return {
                ...state,
                tagValues: [],
                saveValues: {}
            }
        default:
            return {
                ...state
            }
    }
};
