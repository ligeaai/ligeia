import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
    SET_MEASUREMENT_DATA,
    SET_ITEM_DATA_OVERVIEW
} from "../../actions/types"



const initialState = {
    selectItems: ["Area Chart [Highchart]"],
    selectedItem: "Area Chart [Highchart]",
    values: {
        "Name": "",
        "Name Font Size(em)": "",
        "Refresh (Seconds)": "",
        "X-Axis Duration (minutes)": "",
        "Mesurement": "",
        "Mesurement Max Age": "",
        "Widget Refresh (seconds)": "",
        "Decimal Places": "",
        "Minimum": "",
        "Maximum": "",
        "Stops": "",
        "Graph Axis Title Font Size (em)": "",
        "Graph Axis Value Font Size (em)": "",
        "Graph Legend Font Size (em)": "",
        "Assets": [],
        "Show Enable Name": false,
        "Show Enable Navbar": false,
        "Show Enable Export": false,
        "Show Enable Range Selector": false,
        "Show Enable Graph Legend": false,
        "Show Enable Manuel Y-Axis Min/Max": false,
        "Show Enable Y-Axis Align Ticks": false,
        "Show Enable Y-Axis Start On Ticks": false,
        "Show Enable Y-Axis End On Ticks": false,
        "Show Enable Custom Color": false,
        "Inputs": [],
        "Type": "Area Chart [Highchart]"
    },
    highchartProps: {
        "Name": "",
        "Name Font Size(em)": "",
        "Refresh (Seconds)": "",
        "X-Axis Duration (minutes)": "",
        "Mesurement": "",
        "Mesurement Max Age": "",
        "Widget Refresh (seconds)": "",
        "Decimal Places": "",
        "Minimum": "",
        "Maximum": "",
        "Stops": "",
        "Graph Axis Title Font Size (em)": "",
        "Graph Axis Value Font Size (em)": "",
        "Graph Legend Font Size (em)": "",
        "Assets": [],
        "Show Enable Name": false,
        "Show Enable Navbar": false,
        "Show Enable Export": false,
        "Show Enable Range Selector": false,
        "Show Enable Graph Legend": false,
        "Show Enable Manuel Y-Axis Min/Max": false,
        "Show Enable Y-Axis Align Ticks": false,
        "Show Enable Y-Axis Start On Ticks": false,
        "Show Enable Y-Axis End On Ticks": false,
        "Show Enable Custom Color": false,
        "Inputs": [],
        "Type": "Area Chart [Highchart]"
    },
    measuremenetData: [],
    itemData: []

};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case SET_ITEM_DATA_OVERVIEW:
            return {
                ...state,
                itemData: payload
            }
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
