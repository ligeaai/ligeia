import {
    UPDATE_PROGRESS_TAG_IMPORT,
    TOGGLE_LOCK_TAG_IMPORT
} from "../types"
import TagService from "../../api/tags";
import { wsBaseUrl } from "../../baseApi";
import { loadTreeviewItem } from "../treeview/treeview";
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
                    if (data.length > 1)
                        dispatch({
                            type: UPDATE_PROGRESS_TAG_IMPORT,
                            payload: { percent: parseInt(data?.[0]), data: JSON.parse(data?.[1]) }
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
        dispatch({
            type: TOGGLE_LOCK_TAG_IMPORT,
            payload: true
        })
        const formData = new FormData();
        formData.append("file", file);
        let res = await TagService.importExel(formData)
        await dispatch(loadTreeviewItem(TagService.getAll, "NAME"));
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

export const showHistory = (folderName) => async (dispatch) => {
    try {
        let res = await TagService.historyTagImport(folderName)
        dispatch({
            type: UPDATE_PROGRESS_TAG_IMPORT,
            payload: { percent: false, data: res.data }
        })
        dispatch({
            type: TOGGLE_LOCK_TAG_IMPORT,
            payload: true,
        });
    } catch {

    }

}