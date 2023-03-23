import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
} from "../types"

import { uuidv4 } from "../../utils/uuidGenerator"
import { loadTapsOverview } from "./taps"
import HcProps from "../../api/couch/hcProps"
import HcType from "../../api/couch/hcType"
import Widgets from "../../api/couch/widgets"
import TabLink from "../../api/couch/taplinks"

export const fillProperties = async (props) => async (dispatch) => {
    try {
        let res = await HcProps.get(props)
        dispatch({
            type: FILL_VALUES_OVERVIEW_DIALOG,
            payload: res.data.properties
        })
        dispatch({
            type: SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
            payload: res.data.properties
        })
        dispatch({
            type: SET_SELECTED_ITEM_OVERVIEW_DIALOG,
            payload: props
        })
        return Promise.resolve(res.data)
    } catch { }
}

export const loadSelectItems = async () => async dispatch => {
    try {
        let res = await HcType.get()
        let sortedList = res.data.type.sort((a, b) => (a) > (b) ? 1 : -1)
        dispatch({
            type: SET_SELECT_ITEM_OVERVIEW_DIALOG,
            payload: sortedList
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

export const saveChart = () => async (dispatch, getState) => {
    const chartProps = getState().overviewDialog.highchartProps
    const selectedLink = getState().collapseMenu.selectedItem.LINK_ID
    const selected = getState().tapsOverview.selected
    const selectedChartType = getState().overviewDialog.selectedItem
    const resData = getState().tapsOverview.data
    const uuid = uuidv4()
    const body = JSON.stringify({ ...chartProps, _id: uuid, Type: selectedChartType })
    await Widgets.create(body)
    const layout = {
        "w": 6,
        "i": uuid,
        "h": 6,
        "x": 0,
        "y": 0
    }
    const tablinkBody = {
        ...resData, data: {
            ...resData.data, [selected]: {
                widgets: [...resData.data[selected].widgets, uuid],
                layouts: {
                    ...resData.data[selected].layouts,
                    lg: [...resData.data[selected].layouts.lg, {
                        ...layout
                    },
                    ],
                    md: [...resData.data[selected].layouts.md, {
                        ...layout
                    },
                    ],
                    sm: [...resData.data[selected].layouts.sm, {
                        ...layout
                    },
                    ],
                    xs: [...resData.data[selected].layouts.xs, {
                        ...layout
                    },
                    ],
                    xxs: [...resData.data[selected].layouts.xxs, {
                        ...layout
                    },
                    ]
                }
            }
        }
    }
    try {
        await TabLink.update(selectedLink, tablinkBody)
        dispatch(loadTapsOverview())

    }
    catch (err) { console.log(err); }
}

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