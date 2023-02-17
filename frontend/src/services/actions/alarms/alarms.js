import {
    TOGGLE_ALARMS,
    SET_ALARMS_ITEM
} from '../types';

export const openAlarms = () => dispatch => {
    dispatch({
        type: TOGGLE_ALARMS,
        payload: true
    })
}


export const closeAlarms = () => dispatch => {
    dispatch({
        type: TOGGLE_ALARMS,
        payload: false
    })
}

export const setAlarmsItem = (paylaod) => dispatch => {
    dispatch({
        type: SET_ALARMS_ITEM,
        payload: paylaod
    })
}