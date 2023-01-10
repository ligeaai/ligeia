import Highcharts from "highcharts";
import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { wsBaseUrl } from "../../../services/baseApi";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;

export const Measurement = ({ highchartProps, width, height }) => {
  const uom = useSelector((state) => state.tapsOverview.UOMList);
  const [categories, setCategories] = React.useState("");

  const [data, setData] = React.useState("");
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
              const time = dateFormatDDMMYYHHMM(timestamp);
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
    <React.Fragment>
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
            textAlign: "center",
            position: "relative",
            top: "-24px",
          }}
        >
          <Box
            sx={{
              display: "inline-block",
              fontSize:
                highchartProps["Value Font Size"] !== ""
                  ? `${highchartProps["Value Font Size"]}px`
                  : "14px",
              marginRight: "6px",
            }}
          >
            {parseFloat(
              parseFloat(data).toFixed(
                highchartProps["Decimal Places"] === ""
                  ? 3
                  : highchartProps["Decimal Places"]
              )
            )}
          </Box>
          <Box
            sx={{
              display: "inline-block",
              fontSize:
                highchartProps["Unit Font Size"] !== ""
                  ? `${highchartProps["Unit Font Size"]}px`
                  : "14px",
            }}
          >
            {highchartProps.UOM ? uom[highchartProps.UOM].CODE_TEXT : ""}
          </Box>
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
    </React.Fragment>
  );
};
