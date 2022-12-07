import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG
} from "../../actions/types"



const initialState = {
    selectItems: ["Gauge(Angular)[Highchart]"],
    selectedItem: "Gauge(Angular)[Highchart]",
    values:
        [
            [
                {
                    title: "Name",
                    type: "text",
                    defaultValue: ""
                },
                {
                    title: "Name Font Size(em)",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "Enable Drag Handle",
                    type: "checkbox",
                    defaultValue: false
                },
            ],
            [
                {
                    title: "Mesurement",
                    type: "select",
                    values: ["... CPU load ..."],
                    defaultValue: ""
                },
                {
                    title: "Mesurement Max Age",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "Widget Refresh (seconds)",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "Decimal Places",
                    type: "number",
                    defaultValue: ""
                },

                {
                    title: "Minumum",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "Maximum",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "Stops",
                    type: "number",
                    defaultValue: ""
                },
            ],
            [
                {
                    title: "[0] Low",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[0] High",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[0] Color",
                    type: "color",
                    defaultValue: ""
                },
            ],
            [
                {
                    title: "[1] Low",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[1] High",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[1] Color",
                    type: "color",
                    defaultValue: ""
                },
            ],
            [
                {
                    title: "[2] Low",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[2] High",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[2] Color",
                    type: "color",
                    defaultValue: ""
                },
            ],
            [
                {
                    title: "[3] Low",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[3] High",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[3] Color",
                    type: "color",
                    defaultValue: ""
                },
            ],
            [
                {
                    title: "[4] Low",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[4] High",
                    type: "number",
                    defaultValue: ""
                },
                {
                    title: "[4] Color",
                    type: "color",
                    defaultValue: ""
                },
            ],
        ],
    highchartProps: {
        Name: "",
        "Name Font Size(em)": "",
        "Enable Drag Handle": "",
        Mesurement: "",
        "Mesurement Max Age": "",
        "Widget Refresh (seconds)": "",
        "Decimal Places": "",
        "Minumum": "",
        "Maximum": "",
        "Stops": "",
        "[0] Low": "",
        "[0] High": "",
        "[0] Color": "",
        "[1] Low": "",
        "[1] High": "",
        "[1] Color": "",
        "[2] Low": "",
        "[2] High": "",
        "[2] Color": "",
        "[3] Low": "",
        "[3] High": "",
        "[3] Color": "",
        "[4] Low": "",
        "[4] High": "",
        "[4] Color": ""
    }

};


export default function (state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
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
