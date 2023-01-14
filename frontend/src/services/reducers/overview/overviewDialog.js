import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
    SET_MEASUREMENT_DATA
} from "../../actions/types"



const initialState = {
    selectItems: ["Gauge(Angular) [Highchart]"],
    selectedItem: "Gauge(Angular) [Highchart]",
    values: {
        "Name": "",
        "Name Font Size(em)": "",
        "Measurement": "",
        "Mesurement Max Age": "",
        "Widget Refresh (seconds)": "",
        "Decimal Places": "",
        "Stops": "",
        "Type": "Gauge(Angular) [Highchart]",
        "Show Unit": false,
        "Show Name": true,
        "Show Measurement": false,
        "Show Enable Export": false,
        "Show Tag Name": false,
        "Show Timestamp": false,
        "Value Font Size": "",
        "Unit Font Size": "",
        "Time Stamp Font Size": "",
        "Tag Name Font Size": "",
    },

    highchartProps: {
        "Name": "",
        "Name Font Size(em)": "",
        "Measurement": "",
        "Mesurement Max Age": "",
        "Widget Refresh (seconds)": "",
        "Decimal Places": "",
        "Stops": "",
        "Type": "Gauge(Angular) [Highchart]",
        "Show Unit": false,
        "Show Name": true,
        "Show Measurement": false,
        "Show Enable Export": false,
        "Show Tag Name": false,
        "Show Timestamp": false,
        "Value Font Size": "",
        "Unit Font Size": "",
        "Time Stamp Font Size": "",
        "Tag Name Font Size": "",
    },
    measuremenetData: []

};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_MEASUREMENT_DATA:
            return {
                ...state,
                measuremenetData: payload
            }
        case SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG:
            return {
                ...state,
                highchartProps: payload
            }
        case SET_SELECT_ITEM_OVERVIEW_DIALOG:
            return {
                ...state,
                selectItems: payload
            }
        case SET_SELECTED_ITEM_OVERVIEW_DIALOG:
            return {
                ...state,
                selectedItem: payload
            }
        case FILL_VALUES_OVERVIEW_DIALOG:
            return {
                ...state,
                values: payload
            }
        case CHANGE_VALUE_OVERVIEW_DIALOG:
            return {
                ...state,
                highchartProps: {
                    ...state.highchartProps, [payload.key]: payload.value
                }
            }
        default:
            return {
                ...state
            }
    }
};
