import {
    LOAD_USERS_LIST,
    LOAD_LAYER_LIST_USERS,
    CLEAN_USERS
} from "../../actions/types"


const initialState = {
    users: [],
    layers: []
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_USERS_LIST: {
            return {
                ...state,
                users: payload
            }
        }
        case LOAD_LAYER_LIST_USERS: {
            return {
                ...state,
                layers: payload
            }
        }
        case CLEAN_USERS: {
            return {
                users: [],
            }
        }
        default:
            return {
                ...state,
            }
    }
};
