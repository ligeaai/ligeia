import {
    FILL_TAPS_OVERVIEW,
    SET_SELECT_TAB_ITEM,
    CLEAN_TABS_OVERVIEW,
    SET_WIDGETS_OVERVIEW,
    REFRESH_WIDGETS_OVERVIEW,
    SET_ISCHECKED,
    SET_UPDATE_ISCHECKED
} from "../../actions/types"



const initialState = {
    titles: [],
    widgets: [],
    selected: null,
    refresh: false,
    isActive: false,
    isChecked: {}
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case "persist/REHYDRATE":
            try {
                return {
                    ...state,
                    titles: payload.tapsOverview.titles,
                    widgets: payload.tapsOverview.widgets,
                    selected: payload.tapsOverview.selected,
                    refresh: payload.tapsOverview.refresh,
                    isActive: payload.tapsOverview.isActive,
                    isChecked: payload.tapsOverview.isChecked
                }
            } catch {
                return {
                    ...state,
                    titles: [],
                    widgets: [],
                    selected: null,
                    refresh: false,
                    isActive: false,
                    isChecked: {}
                }
            }
        case SET_ISCHECKED:
            return {
                ...state,
                isChecked: payload
            }
        case SET_UPDATE_ISCHECKED:
            return {
                ...state,
                isChecked: {
                    ...state.isChecked,
                    [payload.key]: payload.val
                }
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
                selected: null,
                refresh: false,
                isActive: false,
                isChecked: {}
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
                isActive: true
            }
        default:
            return {
                ...state,
            }
    }
};
