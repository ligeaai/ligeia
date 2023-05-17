import React from "react";
import $ from "jquery";
import { wsBaseUrl } from "../../../services/baseApi";

var W3CWebSocket = require("websocket").w3cwebsocket;
const DataGridCell = ({
  refreshSec,
  handlePropChange,
  valueFormatter,
  ...params
}) => {
  React.useEffect(() => {
    handlePropChange();
    var client;
    if (params?.row?.[params.field]) {
      console.log(params?.row?.[params.field]);
      client = new W3CWebSocket(
        `${wsBaseUrl}/ws/live/last_data/${params?.row?.[params.field]}/${
          refreshSec === "" ? 5 : parseInt(refreshSec)
        }/`
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
              Promise.all(
                data.map((e) => {
                  $(
                    `.matrix-widget-container__${
                      params?.row?.[params.field]
                    }__val`
                  ).html(valueFormatter(e[1]));
                })
              );
              return data;
            }
          }
        }
        sendNumber();
      };
    }
    return () => {
      client && client.close();
    };
  }, []);

  return (
    <div
      className={`matrix-widget-container__${
        params?.row?.[params.field]
      } matrix-widget-container__cell`}
    >
      <span
        className={`matrix-widget-container__${params?.row?.[params.field]}__val
        matrix-widget-container__val`}
      ></span>
      <span
        className={`matrix-widget-container__${
          params?.row?.[params.field]
        }__uom 
        matrix-widget-container__uom`}
      >
        {params?.row?.[`${params.field + "UOM"}`]}
      </span>
    </div>
  );
};

export default React.memo(DataGridCell);
