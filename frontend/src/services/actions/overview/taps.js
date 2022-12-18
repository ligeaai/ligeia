import {
    FILL_TAPS_OVERVIEW,
    SET_SELECT_TAB_ITEM,
    CLEAN_TABS_OVERVIEW,
    SET_WIDGETS_OVERVIEW,
    REFRESH_WIDGETS_OVERVIEW
} from "../types";

import { instance, config } from "../../couchApi";

export const loadTapsOverview = () => async (dispatch, getState) => {
    const linkId = getState().collapseMenu.selectedItem.LINK_ID
    try {
        let res = await instance
            .get(
                `/taplinks/${linkId}`,
                config
            )
        console.log(res);
        var titles = Object.keys(res.data.data)

        dispatch({
            type: FILL_TAPS_OVERVIEW,
            payload: { titles, widgets: res.data.data, data: res.data }
        })
        dispatch({
            type: REFRESH_WIDGETS_OVERVIEW,

        })
    } catch (err) {
        console.log(err);
    }
}

export const selectTab = (payload) => dispatch => {
    dispatch({
        type: SET_SELECT_TAB_ITEM,
        payload: payload
    })
}

export const cleanTabs = () => dispatch => {
    dispatch({
        type: CLEAN_TABS_OVERVIEW
    })
}

export const deleteChart = (id, revId) => async (dispatch, getState) => {
    const selected = getState().tapsOverview.selected
    const resData = getState().tapsOverview.data
    resData.data[selected].find((e, i) => e === id ? resData.data[selected].splice(i, 1) : null)
    const selectedLink = getState().collapseMenu.selectedItem.LINK_ID
    // const tablinkBody = {
    //     ...resData, data: {
    //         ...resData.data, [selected]: [...resData.data[selected]]
    //     }
    // }
    const body = JSON.stringify({ ...resData })
    console.log(body);
    try {
        let res = await instance
            .delete(
                `/widgets/${id}?rev=${revId}`,
                config
            )
        await instance
            .put(
                `/taplinks/${selectedLink}`,
                body,
                config
            )
        dispatch(loadTapsOverview())
    } catch (err) {
        console.log(err);
    }
}
function _newTapNameChoser(keys) {
    let i = 0
    while (true) {
        let newName = `Dashbord ${i}`
        if (!keys.some(e => e === newName)) {
            return newName
        }
        i++;
    }
}


export const addNewTabItem = () => async (dispatch, getState) => {
    const selectedLink = getState().collapseMenu.selectedItem.LINK_ID

    const resData = getState().tapsOverview.data
    const newTabName = _newTapNameChoser(Object.keys(resData.data))
    const tablinkBody = {
        ...resData, data: {
            ...resData.data, [newTabName]: []
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

export const updateChart = () => async (dispatch, getState) => {
    const chartProps = getState().overviewDialog.highchartProps
    const body = JSON.stringify({ ...chartProps })
    try {
        await instance
            .put(
                `/widgets/${chartProps._id}`,
                body,
                config
            )
        dispatch(loadTapsOverview())
    } catch {

    }

}