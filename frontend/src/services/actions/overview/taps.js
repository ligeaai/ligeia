import {
    FILL_TAPS_OVERVIEW,
    SET_SELECT_TAB_ITEM,
    CLEAN_TABS_OVERVIEW,
    SET_WIDGETS_OVERVIEW,
    REFRESH_WIDGETS_OVERVIEW,
    SET_REV,
    UPDATE_LAYOUT,
} from "../types";
import { instance, config } from "../../couchApi";
import { uuidv4 } from "../../utils/uuidGenerator";
export const loadTapsOverview = () => async (dispatch, getState) => {
    const linkId = getState().collapseMenu.selectedItem.TO_ITEM_ID
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
        if (err.response.status === 404) {
            const body = JSON.stringify({ _id: linkId, data: {} })
            await instance
                .post(
                    "/taplinks/",
                    body,
                    config
                )
        }
        dispatch(loadTapsOverview())
        console.log(err.response.status);
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
    const resData = getState().tapsOverview
    let myData = resData.data
    myData.data[selected].widgets.find((e, i) => e === id ? myData.data[selected].widgets.splice(i, 1) : null)
    myData.data[selected].layouts.lg.find((e, i) => e.i === id ? myData.data[selected].layouts.lg.splice(i, 1) : null)
    myData.data[selected].layouts.md.find((e, i) => e.i === id ? myData.data[selected].layouts.md.splice(i, 1) : null)
    myData.data[selected].layouts.sm.find((e, i) => e.i === id ? myData.data[selected].layouts.sm.splice(i, 1) : null)
    myData.data[selected].layouts.xs.find((e, i) => e.i === id ? myData.data[selected].layouts.xs.splice(i, 1) : null)
    myData.data[selected].layouts.xxs.find((e, i) => e.i === id ? myData.data[selected].layouts.xxs.splice(i, 1) : null)


    const selectedLink = getState().collapseMenu.selectedItem.TO_ITEM_ID
    // const tablinkBody = {
    //     ...myData, data: {
    //         ...myData.data, [selected]: [...myData.data[selected]]
    //     }
    // }
    const body = JSON.stringify({ ...myData })
    console.log(body);
    try {
        await instance
            .delete(
                `/widgets/${id}?rev=${revId}`,
                config
            )
        let res = await instance
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
    const selectedLink = getState().collapseMenu.selectedItem.TO_ITEM_ID

    const resData = getState().tapsOverview.data
    const newTabName = _newTapNameChoser(Object.keys(resData.data))
    const tablinkBody = {
        ...resData, data: {
            ...resData.data, [newTabName]: {
                widgets: [],
                layouts: {
                    lg: [],
                    md: [],
                    sm: [],
                    xs: [],
                    xxs: [],
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

const _checkHeader = (oldHeader, newHeader, keys) => {
    if (oldHeader === newHeader) {
        return false
    }
    if (keys.some(e => e === newHeader)) {
        return false
    }
    return true
}

export const updateTabHeader = (oldHeader, newHeader) => async (dispatch, getState) => {
    const selectedLink = getState().collapseMenu.selectedItem.TO_ITEM_ID
    const resData = getState().tapsOverview.data

    if (_checkHeader(oldHeader, newHeader, Object.keys(resData.data))) {
        resData.data[newHeader] = resData.data[oldHeader]
        delete resData.data[oldHeader]

        const tablinkBody = {
            ...resData, data: {
                ...resData.data
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
            dispatch({
                type: SET_SELECT_TAB_ITEM,
                payload: newHeader
            })


        }
        catch (err) { console.log(err); }
    }

}

function _deleteAllCharts(charts) {
    charts.map(async e => {
        try {
            let res = await instance.get(`/widgets/${e}`, config);
            console.log(res);
            await instance
                .delete(
                    `/widgets/${e}?rev=${res.data._rev}`,
                    config
                )
        } catch { }

    })
}

export const deleteTapHeader = (header) => async (dispatch, getState) => {
    const selectedLink = getState().collapseMenu.selectedItem.TO_ITEM_ID
    const resData = getState().tapsOverview.data
    const selected = getState().tapsOverview.selected
    const charts = resData.data[selected].widgets
    delete resData.data[header]
    const tablinkBody = {
        ...resData, data: {
            ...resData.data
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
        _deleteAllCharts(charts)

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
        dispatch(updateCouchDb())

        dispatch(loadTapsOverview())
    } catch {

    }

}
export const updateChartLayout = (layout) => async (dispatch, getState) => {
    const selectedTab = getState().tapsOverview.selected
    const resData = getState().tapsOverview.data
    console.log(selectedTab);
    console.log(resData.data[selectedTab]);
    const tablinkBody = {
        ...resData, data: {
            ...resData.data, [selectedTab]: {
                ...resData.data[selectedTab], "layouts": layout
            }
        },
    }
    console.log(tablinkBody);
    dispatch({
        type: UPDATE_LAYOUT,
        payload: tablinkBody
    })
}


export const updateCouchDb = () => async (dispatch, getState) => {
    console.log("lsaşkdlaskdlşaksldklşskşd");
    const selectedLink = getState().collapseMenu.selectedItem.TO_ITEM_ID
    const resData = getState().tapsOverview.data
    const tablinkBody = {
        ...resData
    }
    console.log(resData);
    try {

        let res = await instance
            .put(
                `/taplinks/${selectedLink}`,
                tablinkBody,
                { ...config }
            )
        console.log(res);


    }
    catch (err) { console.log(err); }
}