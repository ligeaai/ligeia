import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { useSelector } from "react-redux";
import exporting from "highcharts/modules/exporting";
import { wsBaseUrl } from "../../../services/baseApi";
exporting(Highcharts);
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;

export const Angular = ({ highchartProps, width, height }) => {
  const [categories, setCategories] = React.useState("");
  const uom = useSelector((state) => state.tapsOverview.UOMList);
  const [value, setValue] = React.useState("");
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
              setCategories((prev) => data.message.createdtime);
              setValue((prev) => data.message.value);
            }
            //setTimeout(sendNumber, 5000);
            return data;
          }
        }
      }
      sendNumber();
    };
  }, []);
  const options = {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      height: "80%",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
    },
    pane: {
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },

    // the value axis
    yAxis: {
      min: parseInt(highchartProps.Minimum),
      max: parseInt(highchartProps.Maximum),
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      plotBands: [
        {
          from: parseInt(highchartProps["[0] Low"]),
          to: parseInt(highchartProps["[0] High"]),
          color: highchartProps["[0] Color"], // green
          thickness: 20,
        },
        {
          from: parseInt(highchartProps["[1] Low"]),
          to: parseInt(highchartProps["[1] High"]),
          color: highchartProps["[1] Color"], // yellow
          thickness: 20,
        },
        {
          from: highchartProps["[2] Low"],
          to: highchartProps["[2] High"],
          color: highchartProps["[2] Color"], // red
          thickness: 20,
        },
        {
          from: highchartProps["[3] Low"],
          to: highchartProps["[3] High"],
          color: highchartProps["[3] Color"], // red
          thickness: 20,
        },
        {
          from: highchartProps["[4] Low"],
          to: highchartProps["[4] High"],
          color: highchartProps["[4] Color"], // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: "Value",
        data: [
          parseFloat(
            parseFloat(value).toFixed(
              highchartProps["Decimal Places"] === ""
                ? 3
                : highchartProps["Decimal Places"]
            )
          ),
        ],
        tooltip: {
          valueSuffix: ` ${
            highchartProps.UOM ? uom[highchartProps.UOM].CODE_TEXT : ""
          }`,
        },
        dataLabels: {
          format: `{y}  ${
            highchartProps.UOM ? uom[highchartProps.UOM].CODE_TEXT : ""
          }`,
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "10px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  };
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
    />
  );
};
