import {
    CLEAN_ROLES,
    UPDATE_ROWS_ROLES,
    EDIT_CELL_ROLES,
    LOAD_ROLES_PROPERTY,
    UPDATE_ROLES_NAME_PROPERTY,
    SET_LINKS_ACTIVE_ROLE,
    SET_LINKED_USERS_ROLE
} from "../../actions/types"


const initialState = {
    rows: [],
    roles: {
        "ROLES_ID": "",
        "ROLES_NAME": "",
        "LAYER_NAME": "",
        "LAST_UPDATE_USER": ""
    },
    linkActive: false,
    linkedUsers: []
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
        case SET_LINKED_USERS_ROLE: {
            return {
                ...state,
                linkedUsers: payload
            }
        }
        case SET_LINKS_ACTIVE_ROLE: {
            return {
                ...state,
                linkActive: payload
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
                },
                linkActive: false,
                linkedUsers: []
            }
        }
        default:
            return {
                ...state,
            }
    }
};
