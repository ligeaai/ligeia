import {
    LOAD_USERS_LIST,
    LOAD_LAYER_LIST_USERS,
    CLEAN_USERS,
    DELETE_USER,
    UPDATE_LAYER_USERS,
    LOAD_ROLES_LIST_USERS,
    UPDATE_ROLES_USERS
} from "../../actions/types"


const initialState = {
    users: [],
    layers: [],
    roles: [],
    deletedUsers: [],
    updatedUsers: [],
    updatedLayer: [],
    updatedRoles: [],
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_ROLES_LIST_USERS: {
            return {
                ...state,
                roles: payload
            }
        }
        case UPDATE_LAYER_USERS: {
            return {
                ...state,
                users: payload.users,
                updatedUsers: state.updatedUsers.find(e => e === payload.id) !== undefined ? [...state.updatedUsers] : [...state.updatedUsers, payload.id],
                updatedLayer: state.updatedLayer.find(e => e === payload.id) !== undefined ? [...state.updatedLayer] : [...state.updatedLayer, payload.id]
            }
        }
        case UPDATE_ROLES_USERS: {
            return {
                ...state,
                users: payload.users,
                updatedUsers: state.updatedUsers.find(e => e === payload.id) !== undefined ? [...state.updatedUsers] : [...state.updatedUsers, payload.id],
                updatedRoles: state.updatedRoles.find(e => e === payload.id) !== undefined ? [...state.updatedRoles] : [...state.updatedRoles, payload.id]
            }
        }
        case DELETE_USER: {
            return {
                ...state,
                deletedUsers: [...state.deletedUsers, payload],
                users: state.users.filter(e => e.id !== payload),
                updatedUsers: state.updatedUsers.filter(e => e !== payload),
                updatedLayer: state.updatedLayer.filter(e => e !== payload),
                updatedRoles: state.updatedRoles.filter(e => e !== payload),
            }
        }
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
                deletedUsers: [],
                updatedUsers: [],
                updatedLayer: [],
                updatedRoles: [],
                layers: [],
                roles: []
            }
        }
        default:
            return {
                ...state,
            }
    }
};
