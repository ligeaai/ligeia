import {
    UPDATE_DATA_PROJECT,
    LOAD_DATA_PROJECT,
    CLEAN_PROJECT
} from "../../actions/types"

const initialState = {
    data: {}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_DATA_PROJECT:
            return {
                ...state,
                data: { ...state.data, [payload.key]: payload.value }
            }
        case LOAD_DATA_PROJECT:
            return {
                ...state,
                data: payload
            }
        case CLEAN_PROJECT:
            return {
                data: {}
            }
        default:
            return {
                ...state,
            }
    }
};
