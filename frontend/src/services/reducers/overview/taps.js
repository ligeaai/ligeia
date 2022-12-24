import { Castle } from "@mui/icons-material";
import {
    FILL_TAPS_OVERVIEW,
    SET_SELECT_TAB_ITEM,
    CLEAN_TABS_OVERVIEW,
    SET_WIDGETS_OVERVIEW,
    REFRESH_WIDGETS_OVERVIEW,
    SET_REV,
    UPDATE_LAYOUT,
    DELETE_WIDGET_LAYOUT
} from "../../actions/types"



const initialState = {
    titles: [],
    widgets: [],
    data: [],
    selected: null,
    refresh: false,
    isActive: false
};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case DELETE_WIDGET_LAYOUT:
            // return {
            //     ...state,
            //     data: {
            //         ...state.data, data: {
            //             ...state.data.data, [state.selected]: {
            //                 ...[state.data.data[state.selected]], widgets:
            //                     state.data.data[state.selected].widgets.filter((e, i) => e === payload)

            //                 , layouts: {
            //                     ...[state.data.data[state.selected].layouts], lg: state.data.data[state.selected].layouts.lg.filter((e, i) => e.id !== payload),
            //                     md: state.data.data[state.selected].layouts.md.filter((e, i) => e.id !== payload),
            //                     sm: state.data.data[state.selected].layouts.sm.filter((e, i) => e.id !== payload),
            //                     xs: state.data.data[state.selected].layouts.xs.filter((e, i) => e.id !== payload),
            //                     xxs: state.data.data[state.selected].layouts.xxs.filter((e, i) => e.id !== payload)
            //                 }
            //             }
            //         }
            //     }
            // }
            return {
                ...state,
                data: {
                    ...state.data,
                    _rev: payload
                }
            }
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
