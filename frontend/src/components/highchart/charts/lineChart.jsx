import Highcharts from "highcharts/highstock";
import React from "react";

import Box from "@mui/material/Box";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import { wsBaseUrl } from "../../../services/baseApi";

import { DataGrid } from "../../index";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);

export const LineChart = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
}) => {
  const [categories, setCategories] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);
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
    } else client = new W3CWebSocket(`${wsBaseUrl}/ws/tags/`);
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
    credits: {
      enabled: false,
    },
    tooltip: {
      shape: "square",
      headerShape: "callout",
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }

        return position;
      },
    },
    title: {
      text: highchartProps.Name,
      style: {
        fontSize:
          highchartProps["Name Font Size(em)"] !== ""
            ? `${highchartProps["Name Font Size(em)"]}px`
            : "14px",
      },
    },
    xAxis: {
      categories: categories,
    },
    yAxis: {
      title: {
        text: "Amount",
      },
    },
    series: [
      {
        name: "Value",
        data: data,
      },
    ],
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
