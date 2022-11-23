import {
    LOAD_TAGS_LABEL,
    SET_TAG_SAVE_VALUES
} from "../../actions/types"



const initialState = {
    tagValues: [],
    saveValues: {}
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
        default:
            return {
                ...state
            }
    }
};
