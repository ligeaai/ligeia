import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { useSelector } from "react-redux";
import exporting from "highcharts/modules/exporting";
import { wsBaseUrl } from "../../../services/baseApi";
import { dateFormatDDMMYYHHMMSS } from "../../../services/utils/dateFormatter";
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
              setCategories((prev) => data.message.timestamp);
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
      enabled: highchartProps["Show Timestamp"],
      position: {
        align: "center",
      },
      style: {
        fontSize: highchartProps["Time Stamp Font Size"]
          ? highchartProps["Time Stamp Font Size"]
          : 12,
      },
      text: dateFormatDDMMYYHHMMSS(new Date(categories)),
      href: null,
    },
    title: {
      text:
        measuremenetData && highchartProps["Show Tag Name"]
          ? measuremenetData.filter(
              (e) => e.TAG_ID === highchartProps.Measurement
            )[0].NAME
          : "",
      style: {
        fontSize: highchartProps["Tag Name Font Size"]
          ? highchartProps["Tag Name Font Size"]
          : "12px",
      },
    },

    pane: {
      startAngle: -150,
      endAngle: 150,
      background: null,
      center: ["50%", "50%"],
      size: "80%",
      zIndex: 0,
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
          valueSuffix: ` ${highchartProps.UOM}`,
        },
        dataLabels: {
          format: `<div style="font-size: ${
            highchartProps["Value Font Size"]
              ? highchartProps["Value Font Size"]
              : "9"
          }px">${
            highchartProps["Show Measurement"] ? "{y}" : ""
          }</div> <div style="font-size: ${
            highchartProps["Unit Font Size"]
              ? highchartProps["Unit Font Size"]
              : "9"
          }px">( ${
            highchartProps.UOM && highchartProps["Show Unit"]
              ? highchartProps.UOM
              : ""
          } ) </div>`,
          borderWidth: 0,
          y: (height / 100) * 15,
          zIndex: 2231,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
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
