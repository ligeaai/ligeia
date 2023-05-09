import {
    UPDATE_PROGRESS_TAG_IMPORT
} from "../types"
import TagService from "../../api/tags";
import { wsBaseUrl } from "../../baseApi";

var W3CWebSocket = require("websocket").w3cwebsocket;
let client;

export const openWebSocket = () => async (dispatch) => {
    if (client) client.close();
    client = new W3CWebSocket(`${wsBaseUrl}/ws/import/`);

    client.onerror = function () {
        console.log("Connection Error");
    };
    client.onopen = function () {
        console.log("WebSocket Client Connected");
    };
    client.onclose = function (e) {
        console.log("WebSocket Client Closed");
    };
    client.onmessage = function (e) {
        function sendNumber() {
            if (client.readyState === client.OPEN) {
                if (typeof e?.data === "string") {
                    let data = JSON.parse(e?.data);
                    console.log(data);
                    if (data.length > 0)
                        dispatch({
                            type: UPDATE_PROGRESS_TAG_IMPORT,
                            payload: { percent: data[0], data: JSON.parse(data[1]) }
                        })
                    return data;
                }
            }
        }
        sendNumber();
    };
}

export const closeWebSocket = () => async (dispatch) => {
    if (client) {
        client.close();
        dispatch({
            type: UPDATE_PROGRESS_TAG_IMPORT,
            payload: { percent: "0", data: [] }
        })
    }
}

export const importExelFile = (file) => async (dispatch) => {
    try {
        dispatch(openWebSocket());
        const formData = new FormData();
        formData.append("file", file);
        let res = await TagService.importExel(formData)
        // setInterval(function () {
        //     client.close()
        // }, 3000);

    } catch (err) {
        client.close();
        dispatch(
            closeWebSocket()
        )
        console.log(err);
    }
}

export const deleteAllLogs = () => async (dispatch) => {
    try {
        let res = await TagService.deleteLogs()
        dispatch({
            type: UPDATE_PROGRESS_TAG_IMPORT,
            payload: { percent: "0", data: [] }
        })
    } catch (err) {

        console.log(err);
    }
}