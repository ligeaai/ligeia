import {
    LOAD_PROFILE,
    CLEAN_PROFILE
} from "../../actions/types"


const initialState = {
    profile: undefined
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_PROFILE: {
            return {
                ...state,
                profile: payload,
            }
        }
        case CLEAN_PROFILE: {
            return {
                ...state,
                profile: undefined
            }
        }
        default:
            return {
                ...state,
            }
    }
};
