import {
    SET_SELECTED_ITEM_OVERVIEW_DIALOG,
    FILL_VALUES_OVERVIEW_DIALOG,
    CHANGE_VALUE_OVERVIEW_DIALOG,
    SET_SELECT_ITEM_OVERVIEW_DIALOG,
    SET_HIGHCHART_PROPERTY_OVERVIEW_DIALOG
} from "../types"
import axios from "axios";

export const instance = axios.create({
    baseURL: 'http://34.125.220.112:5984/'
});
export const userName = "COUCHDB_USER"
export const userPassword = "COUCHDB_PASSWORD"
export const config = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa(`${userName}:${userPassword}`),
    },
};


const fillProperties = () => async (dispatch, getState) => {
    //api call and fill the properties
    const selectedValue = getState().overviewDialog.selectedItem
    try {
        let res = await instance
            .get(
                "/highchartproperties/57b054aedfcb4984da53944411001dba",
                config
            )

        dispatch({
            type: FILL_VALUES_OVERVIEW_DIALOG,
            payload: res.data.properties[selectedValue]
        })
        let highchartProp = []
        res.data.properties[selectedValue].map(e => {
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
    } catch {

    }
}

export const loadSelectItems = () => async dispatch => {
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

export const changeSelectValue = (payload) => (dispatch) => {
    dispatch({
        type: SET_SELECTED_ITEM_OVERVIEW_DIALOG,
        payload: payload
    })
    dispatch(fillProperties())
}

export const changeValeus = (key, value) => dispatch => {
    dispatch({
        type: CHANGE_VALUE_OVERVIEW_DIALOG,
        payload: { key, value }
    })
}


