import React from "react";
import $ from "jquery";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { wsBaseUrl } from "../../../services/baseApi";
import { dateFormatDDMMYYHHMMSS } from "../../../services/utils/dateFormatter";
import { uuidv4 } from "../../../services/utils/uuidGenerator";
var W3CWebSocket = require("websocket").w3cwebsocket;

export const Measurement = ({ highchartProps }) => {
  const [measuremenetData, setMeasurementData] = React.useState(null);
  const [data, setData] = React.useState("0");
  const [uuid, setUuid] = React.useState(uuidv4());
  function colorPicker(val) {
    let color = "inherit";
    let i = 0;
    while (i < parseInt(highchartProps.Stops)) {
      if (
        parseInt(highchartProps[`[${i}] Low`]) < val &&
        parseInt(highchartProps[`[${i}] High`]) > val
      ) {
        color = highchartProps[`[${i}] Color`];
      }
      i++;
    }
    return color;
  }
  React.useEffect(() => {
    var client;

    async function myFunc() {
      setMeasurementData(highchartProps.Measurement[0]);
    }
    myFunc();

    if (client) client.close();
    client = new W3CWebSocket(
      `${wsBaseUrl}/ws/live/last_data/${highchartProps.Measurement[0].TAG_ID}/${
        highchartProps["Widget Refresh (seconds)"] === ""
          ? 5
          : parseInt(highchartProps["Widget Refresh (seconds)"])
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
            data.map((e) => {
              $(`#${uuid}-categories`).html(
                dateFormatDDMMYYHHMMSS(new Date(e[0]))
              );
              setData((prev) =>
                parseFloat(e[1]).toFixed(
                  highchartProps["Decimal Places"] === ""
                    ? 0
                    : highchartProps["Decimal Places"]
                )
              );
            });
            return data;
          }
        }
      }
      sendNumber();
    };
    return () => {
      client.close();
    };
  }, [highchartProps.Measurement, highchartProps["Widget Refresh (seconds)"]]);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0px",
          width: "100%",
          textAlign: "center",
          display: highchartProps["Show Tag Name"] ? "inline-block" : "none",
          fontSize:
            highchartProps["Tag Name Font Size"] !== ""
              ? `${highchartProps["Tag Name Font Size"]}px`
              : "12px",
        }}
      >
        {measuremenetData ? measuremenetData.NAME : ""}
      </Box>
      <Grid
        container
        sx={{
          height: "100%",
          flexDirection: "column",
          width: "100%",
          flexWrap: "nowrap",
          justifyContent: "space-evenly",
        }}
      >
        <Grid
          item
          sx={{
            position: "relative",
            top: "-24px",
          }}
        >
          <Grid
            container
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            <Grid
              item
              sx={{
                display: highchartProps["Show Measurement"]
                  ? "inline-block"
                  : "none",
                fontSize:
                  highchartProps["Value Font Size"] !== ""
                    ? `${highchartProps["Value Font Size"]}px`
                    : "14px",
                marginRight: "6px",
                color: colorPicker(parseInt(data)),
                fontWeight: "bold",
              }}
            >
              {data}
            </Grid>
            <Grid
              item
              sx={{
                display: highchartProps["Show Unit of Measurement"]
                  ? "inline-block"
                  : "none",
                fontSize:
                  highchartProps["Unit Font Size"] !== ""
                    ? `${highchartProps["Unit Font Size"]}px`
                    : "14px",
              }}
            >
              {measuremenetData && highchartProps["Show Unit of Measurement"]
                ? `(${measuremenetData.UOM})`
                : ""}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
        id={`${uuid}-categories`}
        sx={{
          position: "absolute",
          bottom: "0px",
          width: "100%",
          textAlign: "center",
          paddingBottom: "12px",
          fontSize:
            highchartProps["Time Stamp Font Size"] !== ""
              ? `${highchartProps["Time Stamp Font Size"]}px`
              : "14px",
          display: highchartProps["Show Timestamp"] ? "inline-block" : "none",
        }}
      />
    </Box>
  );
};
