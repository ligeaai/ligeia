import {
    UPDATE_PROGRESS_TAG_IMPORT,
    TOGGLE_LOCK_TAG_IMPORT
} from "../../actions/types"

const initialState = {
    percent: "0",
    data: [],
    lock: false
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case TOGGLE_LOCK_TAG_IMPORT: {
            return {
                ...state,
                lock: payload
            }
        }
        case UPDATE_PROGRESS_TAG_IMPORT:
            return {
                ...state,
                percent: payload.percent,
                data: payload.data
            }

        default:
            return {
                ...state
            }
    }
};
