import Highcharts from "highcharts";
import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { wsBaseUrl } from "../../../services/baseApi";
import { dateFormatDDMMYYHHMMSS } from "../../../services/utils/dateFormatter";
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;

export const Measurement = ({ highchartProps, width, height }) => {
  const uom = useSelector((state) => state.tapsOverview.UOMList);
  const measuremenetData = useSelector(
    (state) => state.overviewDialog.measuremenetData
  );
  const [categories, setCategories] = React.useState("");
  const [data, setData] = React.useState("0");
  function colorPicker(val) {
    let color = "inherit";
    let i = 0;
    console.log(typeof parseInt(highchartProps[`[${i}] Low`]));
    while (i < parseInt(highchartProps.Stops)) {
      console.log(i);
      console.log(highchartProps.Stops);
      if (
        parseInt(highchartProps[`[${i}] Low`]) < val &&
        parseInt(highchartProps[`[${i}] High`]) > val
      ) {
        color = highchartProps[`[${i}] Color`];
      }
      i++;
    }

    console.log(color);
    return color;
  }

  React.useEffect(() => {
    client = new W3CWebSocket(`${wsBaseUrl}/ws/tags/`);
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (e) {
      function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let data = JSON.parse(e.data);
            if (data.message.value) {
              let timestamp = new Date(data.message.timestamp);
              const time = dateFormatDDMMYYHHMMSS(timestamp);
              setCategories((prev) => time);

              setData((prev) => data.message.value);
            }
            //setTimeout(sendNumber, 5000);
            return data;
          }
        }
      }
      sendNumber();
    };
  }, []);
  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "0px",
          width: "100%",
          textAlign: "center",
          display: highchartProps["Show Tag Name"] ? "inline-block" : "none",
          fontSize: highchartProps["Tag Name Font Size"]
            ? highchartProps["Tag Name Font Size"]
            : "12px",
        }}
      >
        {measuremenetData
          ? measuremenetData.filter(
              (e) => e.TAG_ID === highchartProps.Measurement
            )[0].NAME
          : ""}
      </Box>
      <Grid
        container
        sx={{
          height: height,
          flexDirection: "column",
          width: width,
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
              {parseFloat(data).toFixed(
                highchartProps["Decimal Places"] === ""
                  ? 0
                  : highchartProps["Decimal Places"]
              )}
            </Grid>
            <Grid
              item
              sx={{
                display: highchartProps["Show Unit"] ? "inline-block" : "none",
                fontSize:
                  highchartProps["Unit Font Size"] !== ""
                    ? `${highchartProps["Unit Font Size"]}px`
                    : "14px",
              }}
            >
              ( {highchartProps.UOM ? highchartProps.UOM : ""} )
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Box
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
      >
        {categories}
      </Box>
    </Box>
  );
};
