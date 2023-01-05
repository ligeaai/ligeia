import Highcharts from "highcharts";
import React from "react";

import Grid from "@mui/material/Grid";
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;

export const Measurement = ({ highchartProps, width, height }) => {
  const [categories, setCategories] = React.useState("");

  const [data, setData] = React.useState("");
  React.useEffect(() => {
    client = new W3CWebSocket("ws://34.125.220.112:8000/ws/tags/");
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };
    let list = [
      "24",
      "9",
      "1",
      "4",
      "5",
      "12",
      "10",
      "11",
      "14",
      "8",
      "3",
      "12",
      "54",
      "7",
    ];

    client.onmessage = function (e) {
      function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let data = JSON.parse(e.data);
            if (
              Object.keys(data.message).length > 5 &&
              list[Math.floor(Math.random() * list.length)] === data.message.id
            ) {
              setCategories((prev) => data.message.createdtime);

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
    <Grid
      container
      sx={{
        height: height,
        flexDirection: "column",
        width: width,
        flexWrap: "nowrap",
      }}
    >
      <Grid
        item
        xs={12}
        sx={{
          textAlign: "center",
          fontSize:
            highchartProps["Name Font Size(em)"] !== ""
              ? `${highchartProps["Name Font Size(em)"]}px`
              : "14px",
        }}
      >
        {highchartProps.Name}
      </Grid>

      <Grid item xs={12} sx={{ textAlign: "center" }}>
        {data}
      </Grid>
      <Grid
        xs={12}
        item
        sx={{
          textAlign: "center",
        }}
      >
        {categories}
      </Grid>
    </Grid>
  );
};
