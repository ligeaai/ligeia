import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
    SET_WIDGETS_OVERVIEW,
    SET_MEASUREMENT_DATA,
} from "../types"
import axios from "axios"

import { instance, config } from "../../couchApi"
import { uuidv4 } from "../../utils/uuidGenerator"
import { loadTapsOverview } from "./taps"


export const fillProperties = async (props) => async (dispatch, getState) => {
    //api call and fill the properties
    const selectedItem = getState().collapseMenu.selectedItem.TO_ITEM_ID

    try {
        let res = await instance
            .get(
                `/highchartproperties/${props}`,
                config
            )

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
    } catch {
        console.log("asdasd");
    }
}

export const loadSelectItems = async () => async dispatch => {
    try {
        let res = await instance
            .get(
                "/highcharttype/57b054aedfcb4984da539444110006b6",
                config
            )
        dispatch({
            type: SET_SELECT_ITEM_OVERVIEW_DIALOG,
            payload: res.data.type
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
    const selectedLink = getState().collapseMenu.selectedItem.TO_ITEM_ID
    const selected = getState().tapsOverview.selected
    const selectedChartType = getState().overviewDialog.selectedItem
    const resData = getState().tapsOverview.data
    const uuid = uuidv4()
    const body = JSON.stringify({ ...chartProps, _id: uuid, Type: selectedChartType })
    await instance
        .post(
            "/widgets/",
            body,
            config
        )

    const tablinkBody = {
        ...resData, data: {
            ...resData.data, [selected]: {
                widgets: [...resData.data[selected].widgets, uuid],
                layouts: {
                    ...resData.data[selected].layouts,
                    lg: [...resData.data[selected].layouts.lg, {
                        "w": 6,
                        "i": uuid,
                        "h": 6,
                        "x": 0,
                        "y": 0
                    },
                    ],
                    md: [...resData.data[selected].layouts.md, {
                        "w": 6,
                        "i": uuid,
                        "h": 6,
                        "x": 0,
                        "y": 0
                    },
                    ],
                    sm: [...resData.data[selected].layouts.sm, {
                        "w": 6,
                        "i": uuid,
                        "h": 6,
                        "x": 0,
                        "y": 0
                    },
                    ],
                    xs: [...resData.data[selected].layouts.xs, {
                        "w": 6,
                        "i": uuid,
                        "h": 6,
                        "x": 0,
                        "y": 0
                    },
                    ],
                    xxs: [...resData.data[selected].layouts.xxs, {
                        "w": 4,
                        "i": uuid,
                        "h": 4,
                        "x": 0,
                        "y": 0
                    },
                    ]
                }
            }
        }
    }
    try {
        await instance
            .put(
                `/taplinks/${selectedLink}`,
                tablinkBody,
                config
            )
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