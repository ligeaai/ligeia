import React from "react";
import $ from "jquery";
import { wsBaseUrl } from "../../../services/baseApi";

var W3CWebSocket = require("websocket").w3cwebsocket;
const DataGridCell = (params) => {
  React.useEffect(() => {
    var client;
    console.log(params);
    if (params?.row?.[params.field]) {
      $(`.matrix-widget-container__${params?.row?.[params.field]}`).html(
        params?.row?.[params.field]
      );

      client = new W3CWebSocket(
        `${wsBaseUrl}/ws/live/last_data/${params?.row?.[params.field]}`
      );
      client.onerror = function () {
        console.log("Connection Error");
      };
      client.onopen = function () {
        console.log("WebSocket Client Connected");
      };
      client.onclose = function () {
        console.log("WebSocket Client Closed");
      };
      client.onmessage = function (e) {
        function sendNumber() {
          if (client.readyState === client.OPEN) {
            if (typeof e.data === "string") {
              let data = JSON.parse(e.data);
              Object.keys(data).map((e) => {
                $(
                  `.matrix-widget-container__${params?.row?.[params.field]}`
                ).html(data[e][2]);
              });
              return data;
            }
          }
        }
        sendNumber();
      };
    }
    return () => {
      client && client.onclose();
    };
  }, []);
  return (
    <div
      className={`matrix-widget-container__${params?.row?.[params.field]}`}
    />
  );
};

export default DataGridCell;
