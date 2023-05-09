import {
    UPDATE_PROGRESS_TAG_IMPORT
} from "../../actions/types"

const initialState = {
    percent: "0",
    data: []
};

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
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
