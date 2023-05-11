import {
    UPDATE_DATA_WORKFLOW,
    SET_ITEMS_WORKFLOW,
    SET_CHECKET_ITEMS_WORKFLOW,
    SET_UPDATE_CHECKED_ITEMS_WORKFLOW,
    CLEAN_WORKFLOW,
    CLEAN_DATA_WORKFLOW,
    SET_TAGS_WORKFLOW,
    SET_CHECKED_TAGS_WORKFLOW,
    SET_UPDATE_CHECKED_TAGS_WORKFLOW,
    LOAD_DATA_WORKFLOW
} from "../../actions/types"


const initialState = {
    data: { ITEM_ID: [], TAG_ID: [] },
    items: [],
    checkedItems: {},
    tags: [],
    checkedTags: {}
};

export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case LOAD_DATA_WORKFLOW: {
            return {
                ...state,
                data: payload
            }
        }
        case SET_TAGS_WORKFLOW: {
            return {
                ...state,
                tags: payload
            }
        }
        case SET_CHECKED_TAGS_WORKFLOW: {
            return {
                ...state,
                checkedTags: payload
            }
        }
        case SET_UPDATE_CHECKED_TAGS_WORKFLOW: {
            return {
                ...state,
                checkedTags: { ...state.checkedTags, [payload.key]: payload.val }
            }
        }
        case CLEAN_WORKFLOW: {
            return {
                data: { ITEM_ID: [], TAG_ID: [] },
                items: [],
                checkedItems: {},
                tags: []
            }
        }
        case CLEAN_DATA_WORKFLOW: {
            return {
                ...state,
                data: { ITEM_ID: [], TAG_ID: [] },
            }
        }
        case UPDATE_DATA_WORKFLOW: {
            return {
                ...state,
                data: { ...state.data, [payload.key]: payload.value }
            }
        }
        case SET_ITEMS_WORKFLOW: {
            return {
                ...state,
                items: payload
            }
        }
        case SET_CHECKET_ITEMS_WORKFLOW: {
            return {
                ...state,
                checkedItems: payload
            }
        }
        case SET_UPDATE_CHECKED_ITEMS_WORKFLOW: {
            return {
                ...state,
                checkedItems: { ...state.checkedItems, [payload.key]: payload.val }
            }
        }
        default:
            return {
                ...state,
            }
    }
};
