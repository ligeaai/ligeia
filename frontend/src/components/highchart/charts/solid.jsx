import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { useSelector } from "react-redux";
import exporting from "highcharts/modules/exporting";
import { wsBaseUrl } from "../../../services/baseApi";
import { dateFormatDDMMYYHHMMSS } from "../../../services/utils/dateFormatter";
exporting(Highcharts);
highchartsMore(Highcharts);
solidGauge(Highcharts);
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;
export const Solid = ({ highchartProps, width, height }) => {
  const tags = useSelector((state) => state.overviewDialog.measuremenetData);
  const [categories, setCategories] = React.useState("");
  const uom = useSelector((state) => state.tapsOverview.UOMList);
  const [value, setValue] = React.useState("");
  const measuremenetData = useSelector(
    (state) => state.overviewDialog.measuremenetData
  );
  let i = 0;
  let stops = [];
  while (i < parseInt(highchartProps.Stops)) {
    stops.push([
      highchartProps[`[${i}] Stops`],
      highchartProps[`[${i}] Color`],
    ]);
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
      type: "solidgauge",
      height: "80%",
    },
    credits: {
      enabled: highchartProps["Show Timestamp"],
      position: {
        align: "center",
        bottom: -5,
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
        measuremenetData &&
        highchartProps["Show Tag Name"] &&
        measuremenetData.length > 0
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
    pane: {
      center: ["50%", "85%"],
      size: "140%",
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || "#EEE",
        innerRadius: "60%",
        outerRadius: "100%",
        shape: "arc",
      },
    },

    tooltip: {
      enabled: false,
    },
    // the value axis
    yAxis: {
      min: parseInt(highchartProps.Minimum),
      max: parseInt(highchartProps.Maximum),
      stops: [...stops],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: 70,
      },
      labels: {
        y: 16,
      },
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: true,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: false,
      },
    },

    series: [
      {
        name: "Move",
        type: "solidgauge",
        data: [
          {
            color: "#e6cb00",
            radius: "100%",
            innerRadius: "60%",
            y: parseFloat(
              parseFloat(value).toFixed(
                highchartProps["Decimal Places"] === ""
                  ? 3
                  : highchartProps["Decimal Places"]
              )
            ),
          },
        ],
        tooltip: {
          valueSuffix: ` ${
            tags && highchartProps["Show Unit"] && measuremenetData.length > 0
              ? tags.filter((a) => a.TAG_ID === highchartProps.Measurement)[0]
                  .UOM
              : ""
          }`,
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
            tags && highchartProps["Show Unit"] && measuremenetData.length > 0
              ? tags.filter((a) => a.TAG_ID === highchartProps.Measurement)[0]
                  .UOM
              : ""
          } )</div>`,
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
