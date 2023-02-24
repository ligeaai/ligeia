import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import React from "react";
import { useSelector } from "react-redux";
import exporting from "highcharts/modules/exporting";
import { wsBaseUrl } from "../../../services/baseApi";
import { dateFormatDDMMYYHHMMSS } from "../../../services/utils/dateFormatter";
import TagService from "../../../services/api/tags";
exporting(Highcharts);
highchartsMore(Highcharts);
solidGauge(Highcharts);
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;
export const Solid = ({ highchartProps, width, height }) => {
  const [categories, setCategories] = React.useState("");
  const [value, setValue] = React.useState("");
  const [measuremenetData, setMeasurementData] = React.useState(null);
  const [key, setKey] = React.useState(0);

  let i = 0;
  let stops = [];
  while (i < parseInt(highchartProps.Stops)) {
    if (highchartProps.Stops !== "" && highchartProps.Stops !== "0") {
      stops.push([
        highchartProps[`[${i}] Stops`],
        highchartProps[`[${i}] Color`],
      ]);
    }
    i++;
  }
  React.useEffect(() => {
    async function myFunc() {
      const body = JSON.stringify({ TAG_ID: highchartProps.Measurement });
      let res = await TagService.getTagItemS(body);
      setMeasurementData(res.data[0]);
      setKey(key + 1);
    }
    myFunc();
    if (client) client.close();
    client = new W3CWebSocket(
      `${wsBaseUrl}/ws/live/last_data/${highchartProps.Measurement}`
    );
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };
    client.onclose = function () {
      console.log("WebSocket Client Closed");
    };
    client.onmessage = function (e) {
      function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let data = JSON.parse(e.data);
            Object.keys(data).map((e) => {
              setCategories((prev) => data[e][1] * 1000);
              setValue((prev) => data[e][2]);
            });

            //setTimeout(sendNumber, 5000);
            return data;
          }
        }
      }
      sendNumber();
    };
    return () => {
      client.close();
    };
  }, [highchartProps.Measurement]);
  const options = {
    chart: {
      type: "solidgauge",
    },
    credits: {
      enabled: highchartProps["Show Timestamp"],
      position: {
        align: "center",
        verticalAlign: "bottom",
      },
      style: {
        fontSize: highchartProps["Time Stamp Font Size"]
          ? highchartProps["Time Stamp Font Size"]
          : 12,
        paddingTop: "3px",
      },
      text:
        categories === "" ? "" : dateFormatDDMMYYHHMMSS(new Date(categories)),
      href: null,
    },
    title: {
      text:
        measuremenetData && highchartProps["Show Tag Name"]
          ? measuremenetData.NAME
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
      center: ["50%", "80%"],
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
      min: 0,
      max: 500,
      stops: stops.length > 0 ? [...stops] : null,
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
        inside: false,
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
          }px"> ${
            measuremenetData && highchartProps["Show Unit of Measurement"]
              ? `(${measuremenetData.UOM})`
              : ""
          } </div>`,
        },
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
            measuremenetData && highchartProps["Show Unit of Measurement"]
              ? measuremenetData.UOM
              : ""
          }`,
        },
      },
    ],
  };
  return (
    <HighchartsReact
      key={key}
      highcharts={Highcharts}
      options={{
        ...options,
        chart: {
          ...options.chart,
          width: width,
          height: height - 15,
        },
      }}
    />
  );
};

export default React.memo(Solid);
