import Highcharts from "highcharts/highstock";
import React from "react";
import Box from "@mui/material/Box";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportdata from "highcharts/modules/export-data";
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
exportdata(Highcharts);
export const LineChart = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
}) => {
  console.log(liveData);
  console.log(backfillData);
  const [categories, setCategories] = React.useState([]);
  const [quality, setQuality] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (client) {
      setQuality([]);
      setData([]);
      client.onclose = function () {
        console.log("WebSocket Client Closed");
      };
    }
    if (backfillData) {
      client = new W3CWebSocket("ws://34.125.220.112:8000/ws/tags/backfill/");
    } else client = new W3CWebSocket("ws://34.125.220.112:8000/ws/tags/");
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
            console.log(jsonData);
            if (Object.keys(jsonData.message).length > 5) {
              setCategories((prev) => [...prev, jsonData.message.createdtime]);
              setQuality((prev) => [
                ...prev,
                parseInt(jsonData.message.quality),
              ]);
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
        name: "Quality",
        data: quality,
      },
      {
        name: "Value",
        data: data,
      },
    ],
    exporting: {
      menuItemDefinitions: {
        // Custom definition
        toggleTable: {
          onclick: function () {
            if (
              this.dataTableDiv &&
              this.dataTableDiv.style.display !== "none"
            ) {
              this.dataTableDiv.style.display = "none";
            } else {
              this.viewData();
              this.dataTableDiv.style.display = "";
            }
          },
          text: "Toggle Table",
        },
      },
    },
  };
  return (
    <Box
      sx={{
        zIndex: 99999,
        Table: {
          backgroundColor: "#ffffff",
          zIndex: 99999,
          overflow: "hidden",
          position: "relative",
          bottom: height,
          maxHeight: `${height}px`,
        },
      }}
    >
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
    </Box>
  );
};
