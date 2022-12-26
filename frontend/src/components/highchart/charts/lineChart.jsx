import Highcharts from "highcharts";
import React from "react";
import HighchartsReact from "highcharts-react-official";

require("highcharts/modules/accessibility")(Highcharts);

export const LineChart = (highchartProps) => {
  const [categories, setCategories] = React.useState([]);
  const [quality, setQuality] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    var W3CWebSocket = require("websocket").w3cwebsocket;

    var client = new W3CWebSocket("ws://34.125.220.112:8000/ws/tags/");
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
            if (Object.keys(data.message).length > 5) {
              setCategories((prev) => [...prev, data.message.createdtime]);
              setQuality((prev) => [...prev, data.message.quality]);
              setData((prev) => [...prev, data.message.value]);
            }

            setTimeout(sendNumber, 10000);
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
  }, []);
  return {
    chart: {
      zoomBySingleTouch: true,
      zoomType: "x",
      type: "spline",
      reflow: true,
    },
    credits: {
      enabled: false,
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
  };
};
