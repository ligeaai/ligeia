import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
    SET_WIDGETS_OVERVIEW,
    SET_MEASUREMENT_DATA
} from "../types"
import axios from "axios"

import { instance, config } from "../../couchApi"
import { uuidv4 } from "../../utils/uuidGenerator"
import { loadTapsOverview } from "./taps"
import ItemLinkService from "../../api/itemLink"



let cancelTokenLinks;
export const fillProperties = async () => async (dispatch, getState) => {
    //api call and fill the properties
    const selectedValue = getState().overviewDialog.selectedItem
    const selectedItem = getState().collapseMenu.selectedItem.TO_ITEM_ID
    if (cancelTokenLinks) {
        cancelTokenLinks.cancel()
    }
    cancelTokenLinks = axios.CancelToken.source();
    try {
        let res = await instance
            .get(
                `/highchartproperties/${selectedValue}`,
                config
            )
        console.log(res);
        const body = JSON.stringify({ ID: selectedItem })

        let itemLinkRes = await ItemLinkService.getItemLink(body, cancelTokenLinks)
        console.log(itemLinkRes.data);
        let tags = itemLinkRes.data.TO_ITEM_ID.filter(e => e.FROM_ITEM_TYPE === "TAG_CACHE")
        console.log(tags);
        dispatch({
            type: SET_MEASUREMENT_DATA,
            payload: tags
        })
        dispatch({
            type: FILL_VALUES_OVERVIEW_DIALOG,
            payload: res.data.properties
        })
        let highchartProp = []
        res.data.properties.map(e => {
            highchartProp.push(...e)
        })

        let highchartPropVal = {}
        highchartProp.map(e => {
            highchartPropVal[e.title] = ""
        })
        dispatch({
            type: SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG,
            payload: highchartPropVal
        })
        return Promise.resolve(res.data)
    } catch {

    }
}

export const loadSelectItems = async () => async dispatch => {
    try {
        let res = await instance
            .get(
                "/highcharttype/57b054aedfcb4984da539444110006b6",
                config
            )
        console.log(res);
        dispatch({
            type: SET_SELECT_ITEM_OVERVIEW_DIALOG,
            payload: res.data.type
        })


    } catch (err) {
        return err
    }
}

export const changeSelectValue = async (payload) => async (dispatch) => {
    dispatch({
        type: SET_SELECTED_ITEM_OVERVIEW_DIALOG,
        payload: payload
    })
    return Promise.resolve(dispatch(await fillProperties()))

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
    console.log(uuid);
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
    console.log(tablinkBody);
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


