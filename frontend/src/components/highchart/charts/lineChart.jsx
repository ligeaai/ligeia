import Highcharts from "highcharts/highstock";
import React from "react";

import Box from "@mui/material/Box";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import { wsBaseUrl } from "../../../services/baseApi";

import { DataGrid } from "../../index";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
import { useSelector } from "react-redux";

var client;
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
accessibility(Highcharts);
export const LineChart = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
}) => {
  console.log(highchartProps.Inputs);
  const UOMList = useSelector((state) => state.tapsOverview.UOMList);
  const yAxisTitles = [];
  const series = [];
  const [categories, setCategories] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
  highchartProps.Inputs.map((e) => {
    if (!highchartProps[`[${e.NAME}] Disable Data Grouping`]) {
      yAxisTitles.push({
        title: {
          text: UOMList[e.UOM].CODE_TEXT,
        },
        max: parseInt(e.NORMAL_MAXIMUM),
        min: parseInt(e.NORMAL_MINIMUM),
        opposite: false,
      });
      series.push({
        name: e.NAME,
        data: data,
        color: highchartProps["Enable Custom Colors"]
          ? highchartProps[`[${e.NAME}] Color`]
          : "",
      });
    }
  });

  React.useEffect(() => {
    if (client) {
      setAllData([]);
      setData([]);
      client.onclose = function () {
        console.log("WebSocket Client Closed");
      };
    }
    if (backfillData) {
      client = new W3CWebSocket(`${wsBaseUrl}/ws/tags/backfill/`);
    } else client = new W3CWebSocket(`ws://34.125.220.112:8001/ws/tags/`);
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("connedted");
      client.send(JSON.stringify({ text: "Tag 1" }));
    };

    client.onmessage = function (e) {
      console.log(e);

      function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let jsonData = JSON.parse(e.data);
            if (Object.keys(jsonData.message).length > 5) {
              let timestamp = new Date(jsonData.message.timestamp);
              const time = dateFormatDDMMYYHHMM(timestamp);
              setCategories((prev) => [...prev, time]);
              setAllData((prev) => [...prev, jsonData.message]);
              setData((prev) => [...prev, parseInt(jsonData.message.value)]);
            }

            //setTimeout(sendNumber, 10000);
            return data;
          }
        }
      }
      sendNumber();
    };
    return () => {
      client.onclose = function () {
        console.log("WebSocket Client Closed");
      };
    };
  }, [liveData]);
  const options = {
    chart: {
      zoomBySingleTouch: true,
      zoomType: "x",
      type: "spline",
      reflow: true,
    },
    rangeSelector: {
      buttons: [
        {
          type: "minutes",
          count: 1,
          text: "1m",
        },
        {
          type: "minutes",
          count: 5,
          text: "5m",
        },
        {
          type: "minutes",
          count: 15,
          text: "15m",
        },
        {
          type: "minutes",
          count: 30,
          text: "30m",
        },
        {
          type: "hours",
          count: 1,
          text: "1h",
        },
        {
          type: "hours",
          count: 6,
          text: "6h",
        },
        {
          type: "days",
          count: 1,
          text: "1d",
        },
        {
          type: "weeks",
          count: 1,
          text: "1w",
        },
        {
          type: "months",
          count: 1,
          text: "1m",
        },
        {
          type: "months",
          count: 3,
          text: "3m",
        },
        {
          type: "months",
          count: 6,
          text: "6m",
        },
        {
          type: "all",
          text: "Full",
        },
      ],
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      borderWidth: 0,
    },
    exporting: {
      enabled: highchartProps["Show Enable Export"],
    },
    navigation: {
      buttonOptions: {
        verticalAlign: "top",
        y: -10,
        x: -1,
      },
    },
    legend: {
      enabled: highchartProps["Enable Graph Legend"],
      layout: "horizontal",
      itemStyle: {
        fontSize: highchartProps["Graph Legend Font Size (em)"]
          ? `${highchartProps["Graph Legend Font Size (em)"]}px`
          : "12px",
      },
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: categories,
    },
    yAxis: [...yAxisTitles],
    series: [...series],
  };
  if (!tabular) {
    return (
      <HighchartsReact
        highcharts={Highcharts}
        options={{
          ...options,
          chart: {
            ...options.chart,
            width: width,
            height: height,
          },
        }}
        constructorType={"stockChart"}
      />
    );
  }
  return (
    <Box sx={{ width: width, height: height }}>
      <DataGrid
        columns={[
          { field: "created_by", headerName: "Created By" },
          { field: "createdtime", headerName: "Created Time" },
          { field: "message_type", headerName: "Message Type" },
          { field: "timestamp", headerName: "Time Stamp" },
          { field: "value", headerName: "Value" },
        ]}
        rows={allData}
      />
    </Box>
  );
};
