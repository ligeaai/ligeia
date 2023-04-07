import {
    SET_ALARM_HISTORY_DIAGNOSTIC,
    SET_COMMUNICATIONS_STATUS_DIAGNOSTIC,
    SET_SYSTEM_HEALTH_DIAGNOSTIC,
    CLEAN_DIAGNOSTIC
} from "../types"
import { wsBaseUrl } from "../../baseApi";

import { alarmHistory } from "./columns";
var W3CWebSocket = require("websocket").w3cwebsocket;
let alarms;
const loadAlarmsHistory = () => dispatch => {
    try {
        alarms = new W3CWebSocket(
            `${wsBaseUrl}/ws/alarms/KNOC`
        );
        alarms.onerror = function () {
            console.log("Connection Error");
        };
        alarms.onopen = function () {
            console.log("connected");
        };
        alarms.onclose = function () {
            console.log("WebSocket Client Closed");
        };
        alarms.onmessage = function (e) {
            async function sendNumber() {
                if (alarms.readyState === alarms.OPEN) {
                    if (typeof e.data === "string") {
                        let jsonData = JSON.parse(e.data);
                        let a = []
                        Promise.all(
                            jsonData.map((e, i) => {
                                if (e.priority) {
                                    e.id = i;
                                    a.push(e)
                                }
                            })
                        )
                        dispatch({
                            type: SET_ALARM_HISTORY_DIAGNOSTIC,
                            payload: { column: alarmHistory, row: a }
                        })
                    }
                    return true;
                }
            }
            sendNumber()
        }
    } catch (err) {
        console.log(err);
        return Promise.reject(err)
    }
}

const loadCommunicationsStatus = () => dispatch => {

}

const loadSystemStatus = () => dispatch => {

}

export const loadDiagnostic = () => dispatch => {
    dispatch(loadAlarmsHistory())
    dispatch(loadCommunicationsStatus())
    dispatch(loadSystemStatus())
}

export const cleanDiagnostic = () => dispatch => {
    if (alarms) {
        alarms.close()
    }
    dispatch({ type: CLEAN_DIAGNOSTIC })
}