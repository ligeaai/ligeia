import {
    CLEAN_ROLES,
    UPDATE_ROWS_ROLES,
    EDIT_CELL_ROLES,
    LOAD_ROLES_PROPERTY,
    UPDATE_ROLES_NAME_PROPERTY
} from "../../actions/types"


const initialState = {
    rows: [],
    roles: {
        "ROLES_ID": "",
        "ROLES_NAME": "",
        "LAYER_NAME": "",
        "LAST_UPDATE_USER": ""
    }
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_ROWS_ROLES: {
            return {
                ...state,
                rows: payload,
            }
        }
        case EDIT_CELL_ROLES: {
            return {
                ...state,
                rows: {
                    ...state.rows, [payload.id]: {
                        ...state.rows[payload.id], [payload.field]: payload.value
                    }
                },
            }
        }
        case LOAD_ROLES_PROPERTY: {
            return {
                ...state,
                roles: payload,
            }
        }
        case UPDATE_ROLES_NAME_PROPERTY: {
            return {
                ...state,
                roles: { ...state.roles, ROLES_NAME: payload },
            }
        }
        case CLEAN_ROLES: {
            return {
                rows: [],
                roles: {
                    "ROLES_ID": "",
                    "ROLES_NAME": "",
                    "LAYER_NAME": "",
                    "LAST_UPDATE_USER": ""
                }
            }
        }
        default:
            return {
                ...state,
            }
    }
};
