import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
} from "../types"

import { uuidv4 } from "../../utils/uuidGenerator"
import { loadTapsOverview } from "./taps"
import Overview from "../../api/overview"

export const fillProperties = async (WIDGET_TYPE) => async (dispatch) => {
    try {
        const body = JSON.stringify({ WIDGET_TYPE })
        let res = await Overview.getWidgetProps(body)
        console.log(res);
        dispatch({
            type: FILL_VALUES_OVERVIEW_DIALOG,
            payload: res.data[0].properties
        })
        dispatch({
            type: SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
            payload: res.data[0].properties
        })
        dispatch({
            type: SET_SELECTED_ITEM_OVERVIEW_DIALOG,
            payload: WIDGET_TYPE
        })
        return Promise.resolve(res.data)
    } catch (err) {
        console.log(err);
    }
}

export const loadSelectItems = async () => async dispatch => {
    try {
        let res = await Overview.getWidgetTypeList()
        dispatch({
            type: SET_SELECT_ITEM_OVERVIEW_DIALOG,
            payload: res.data
        })
    } catch (err) {
        return err
    }
}

export const changeSelectValue = async (payload) => async (dispatch) => {
    return Promise.resolve(dispatch(await fillProperties(payload)))
}

export const changeValeus = (key, value) => dispatch => {
    dispatch({
        type: CHANGE_VALUE_OVERVIEW_DIALOG,
        payload: { key, value }
    })
}

function getInputsId(props) {
    let returnVal = []
    for (let i = 0; i < props.length; i++) {
        returnVal.push(props[i].TAG_ID)
    }
    return returnVal
}

const chosePropType = (propName, propType) => {
    if (propType === "boolean") {
        return "PROPERTY_BOOLEAN"
    }
    switch (propName) {
        case "Inputs":
        case "Measurement":
            return "PROPERTY_TAG"
        case "Assets":
            return "PROPERTY_JSON"
        default:
            return "PROPERTY_STRING"
    }
}

const chosePropValue = (propName, propVal) => {
    switch (propName) {
        case "Inputs":
        case "Measurement":
            return getInputsId(propVal)
        default:
            return propVal
    }
}

const fillTheProperty = (chartProps, widgetId) => {
    let properties = []

    for (let i = 0; i < Object.keys(chartProps).length; i++) {
        properties.push({
            "WIDGET_TYPE": chartProps.type,
            "PROPERTY_NAME": Object.keys(chartProps)[i],
            "LAYER_NAME": "KNOC",
            "START_DATETIME": "2023-01-01",
            "END_DATETIME": "9000-01-01",
            "PROPERTY_TYPE": typeof chartProps[Object.keys(chartProps)[i]],
            [chosePropType(Object.keys(chartProps)[i], typeof chartProps[Object.keys(chartProps)[i]])]: chosePropValue(Object.keys(chartProps)[i], chartProps[Object.keys(chartProps)[i]]),
            "WIDGET_ID": [widgetId.replace(/-/g, "")],
            "ROW_ID": uuidv4().replace(/-/g, "")
        })
    }
    return properties
}

export const saveNewChart = () => async (dispatch, getState) => {
    const chartProps = getState().overviewDialog.highchartProps
    const selected = getState().tapsOverview.selected
    const dashboardId = getState().tapsOverview.widgets[selected].ROW_ID
    const selectedChartType = getState().overviewDialog.selectedItem
    const uuid = uuidv4()
    try {
        const WIDGET = {
            WIDGET_ID: uuid.replace(/-/g, ""),
            WIDGET_TYPE: selectedChartType,
            ROW_ID: uuidv4().replace(/-/g, ""),
            LAYER_NAME: "KNOC"
        }
        let PROPERTY = fillTheProperty(chartProps, uuid)
        const DASHBOARD_ID = dashboardId
        const body = JSON.stringify({ WIDGET: WIDGET, PROPERTY: PROPERTY, DASHBOARD_ID: DASHBOARD_ID })
        console.log(body);
        await Overview.createWidget(body)
        dispatch(loadTapsOverview())

    }
    catch (err) { console.log(err); }
}

const fillTheUpdateProperty = (chartProps, widgetId) => {
    let properties = []
    for (let i = 0; i < Object.keys(chartProps).length; i++) {
        properties.push({
            "PROPERTY_NAME": Object.keys(chartProps)[i],
            "LAYER_NAME": "KNOC",
            [chosePropType(Object.keys(chartProps)[i], typeof chartProps[Object.keys(chartProps)[i]])]: chosePropValue(Object.keys(chartProps)[i], chartProps[Object.keys(chartProps)[i]]),
            "WIDGET_ID": [widgetId.replace(/-/g, "")],
        })
    }
    return properties
}

export const updateChart = (widgetId, refresh) => async (dispatch, getState) => {
    const chartProps = getState().overviewDialog.highchartProps;
    const body = JSON.stringify({ UPDATE: fillTheUpdateProperty(chartProps, widgetId), DELETE: [] });
    try {
        await Overview.updateWidget(body)
        refresh()
    } catch (err) {
        console.log(err);
    }
};

export const cleanStops = (key, value, titles) => (dispatch, getState) => {
    const highchartProps = getState().overviewDialog.highchartProps
    const stopsVal = getState().overviewDialog.highchartProps.Stops
    for (let i = parseInt(stopsVal); i >= parseInt(value); i--) {
        titles.map(e => {
            delete highchartProps[`[${i}] ${e}`]
        })
    }
    dispatch(changeValeus(key, value))
}