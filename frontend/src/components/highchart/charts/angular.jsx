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
  const measuremenetData = useSelector(
    (state) => state.overviewDialog.measuremenetData
  );
  const [value, setValue] = React.useState("");
  let i = 0;
  let plotBands = [];
  while (i < parseInt(highchartProps.Stops)) {
    plotBands.push({
      from: parseInt(highchartProps[`[${i}] Low`]),
      to: parseInt(highchartProps[`[${i}] High`]),
      color: highchartProps[`[${i}] Color`],
      thickness: 20,
    });
    i++;
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
      startAngle: -150,
      endAngle: 150,
      background: null,
      center: ["50%", "50%"],
      size: "80%",
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
    // the value axis
    yAxis: {
      min: parseInt(highchartProps.Minimum),
      max: parseInt(highchartProps.Maximum),
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickPosition: "inside",
      labels: {
        distance: -40,
        rotation: "auto",
        style: {
          fontSize: "14px",
        },
      },
      title: {
        text:
          measuremenetData && highchartProps["Show Tag Name"]
            ? measuremenetData.filter(
                (e) => e.TAG_ID === highchartProps.Measurement
              )[0].NAME
            : "",
        y: 10,
      },
      plotBands: [...plotBands],
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
          format: `${highchartProps["Show Measurement"] ? "{y}" : ""} ${
            highchartProps.UOM && highchartProps["Show Unit"]
              ? uom[highchartProps.UOM].CODE_TEXT
              : ""
          }`,
          borderWidth: 0,
          y: (height / 100) * 15,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "12px",
            zIndex: 67,
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
          radius: 8,
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
