import {
    FILL_TAPS_OVERVIEW,
    SET_SELECT_TAB_ITEM,
    CLEAN_TABS_OVERVIEW,
    SET_WIDGETS_OVERVIEW,
    REFRESH_WIDGETS_OVERVIEW,
    SET_REV,
    UPDATE_LAYOUT,
} from "../../actions/types"



const initialState = {
    titles: [],
    widgets: [],
    data: [],
    selected: null,
    refresh: false,
    isActive: false,
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case UPDATE_LAYOUT:
            return {
                ...state,
                data: payload
            }
        case SET_REV:
            return {
                ...state,
                data: { ...state.data, _rev: payload }
            }
        case REFRESH_WIDGETS_OVERVIEW:
            return {
                ...state,
                refresh: !state.refresh
            }
        case SET_WIDGETS_OVERVIEW:
            return {
                ...state,
                widgets: payload
            }
        case CLEAN_TABS_OVERVIEW:
            return {
                titles: [],
                widgets: [],
                data: [],
                selected: null,
                refresh: false,
                isActive: false
            }
        case SET_SELECT_TAB_ITEM:
            return {
                ...state,
                selected: payload
            }
        case FILL_TAPS_OVERVIEW:
            return {
                ...state,
                titles: payload.titles,
                widgets: payload.widgets,
                data: payload.data,
                isActive: true
            }
        default:
            return {
                ...state,
            }
    }
};
