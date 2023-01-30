import Highcharts from "highcharts/highstock";
import React from "react";

import Box from "@mui/material/Box";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import data from "highcharts/modules/data";
import accessibility from "highcharts/modules/accessibility";
import { wsBaseUrl } from "../../../services/baseApi";

let client = [];
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
accessibility(Highcharts);
data(Highcharts);
const LineCharts = ({
  highchartProps,
  width,
  height,
  liveData,

  chartType,
}) => {
  console.log(highchartProps.Inputs);
  const yAxisTitles = [];
  highchartProps.Inputs.map((e) => {
    if (!highchartProps[`[${e.NAME}] Disable Data Grouping`]) {
      yAxisTitles.push({
        title: {
          text: e.UOM,
        },
        endOnTick: true,
        startOnTick: true,
        opposite: false,
      });
    }
  });

  React.useEffect(() => {
    return () => {
      client.map((e) => {
        console.log(e);
        e.close();
      });
    };
  }, [liveData]);
  const options = {
    constructorType: "stockChart",
    chart: {
      zoomBySingleTouch: true,
      zoomType: "x",
      type: chartType,
      reflow: true,
      events: {
        load: function () {
          var series = this;
          let dataList = [];
          Promise.all(
            client.map((e) => {
              console.log(e);
              e.onclose = function () {
                console.log("WebSocket Client Closed");
              };
            })
          );
          highchartProps.Inputs.map((tag, index) => {
            client[index] = new W3CWebSocket(
              `${wsBaseUrl}/ws/tags/backfill/${tag.TAG_ID}`
            );

            client[index].onerror = function () {
              console.log("Connection Error");
            };
            client[index].onopen = function () {
              console.log("connedted");
            };
            client[index].onclose = function () {
              console.log("WebSocket Client Closed");
            };
            dataList[index] = series.series[index];
            client[index].onmessage = function (e) {
              async function sendNumber() {
                if (client.readyState === client.OPEN) {
                  if (typeof e.data === "string") {
                    console.log("klşsakdkaşsdlk");
                    let jsonData = JSON.parse(e.data);
                    console.log(jsonData);
                    dataList[index].addPoint({
                      x: parseInt(jsonData.timestamp) * 1000,
                      y: jsonData.tag_value,
                    });

                    return true;
                  }
                }
              }
              sendNumber();
            };
          });
        },
      },
    },
    rangeSelector: {
      //  enabled: !liveData,
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
    // navigator: {
    //   enabled: !liveData,
    // },
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
      type: "datetime",
      labels: {
        formatter: function () {
          return Highcharts.dateFormat("%d.%m.%Y %H:%M:%S", this.value);
        },
      },
      // categories: categories,
    },
    yAxis: [...yAxisTitles],
    series: [
      ...highchartProps.Inputs.map((e, i) => {
        return {
          yAxis: i,
          name: e.NAME,
          color: highchartProps["Enable Custom Colors"]
            ? highchartProps[`[${e.NAME}] Color`]
            : "",
        };
      }),
    ],
  };

  return (
    <Box>
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

export default React.memo(LineCharts);
