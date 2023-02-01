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
          text: `${e.UOM_QUANTITY_TYPE} (${e.UOM})`,
        },

        endOnTick: true,
        startOnTick: true,
        opposite: false,
      });
    }
  });

  React.useEffect(() => {
    return () => {
      Promise.all(
        client.map((e) => {
          e.close();
        })
      );
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
            const myindex = index;
            client[index] = new W3CWebSocket(
              `${wsBaseUrl}/ws/tags/${tag.TAG_ID}`
            );
            client[index].onerror = function () {
              console.log("Connection Error");
            };
            client[index].onopen = function () {
              console.log("connected");
            };
            client[index].onclose = function () {
              console.log("WebSocket Client Closed");
            };
            dataList[index] = series.series[index];
            client[index].onmessage = function (e) {
              async function sendNumber() {
                if (client.readyState === client.OPEN) {
                  if (typeof e.data === "string") {
                    let jsonData = JSON.parse(e.data);

                    Promise.all(
                      Object.keys(jsonData).map((f) => {
                        jsonData[f][1].map((d) => {
                          dataList[myindex].addPoint(
                            {
                              x: d[0] * 1000,
                              y: d[1],
                            },
                            true,
                            false,
                            false
                          );
                        });
                      })
                    );
                    // var xAxis = this.xAxis[0];
                    // var min = xAxis.dataMax;
                    // var max = xAxis.dataMax;
                    // xAxis.setExtremes(min - 86400000, max);
                    return true;
                  }
                }
              }
              sendNumber();
            };

            // console.log(new Date(1670007227 * 1000));
            // var newDate = new Date().getTime();
            // series.xAxis[0].dataMax = newDate;
            // series.xAxis[0].setExtremes(
            //   new Date(2000, 1, 1).getTime(),
            //   newDate,
            //   true
            // );
            // series.xAxis[0].setExtremes(
            //   new Date().getTime() - 86400,
            //   new Date().getTime()
            // );
          });
        },
      },
    },
    rangeSelector: {
      enabled: false,
      buttons: [
        {
          type: "day",
          count: 1,
          text: "1d",
        },
        {
          type: "week",
          count: 1,
          text: "1w",
        },
        {
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "year",
          count: 1,
          text: "1y",
        },
        {
          type: "all",
          text: "All",
        },
      ],
      selected: 0,
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
    navigator: {
      enabled: true,
      xAxis: {
        type: "datetime",
        min: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
        max: new Date().getTime() + 1000,

        ordinal: false,
        endOnTick: false,
        startOnTick: false,
      },
      series: [
        ...highchartProps.Inputs.map((e) => {
          return {
            name: e.NAME,
            color: highchartProps["Enable Custom Colors"]
              ? highchartProps[`[${e.NAME}] Color`]
              : "",
          };
        }),
      ],
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
      type: "datetime",
      min: new Date().getTime() - 1 * 24 * 60 * 60 * 1000,
      max: new Date().getTime() + 1000,
      //range: 86000,
      lineWidth: 1,
      tickWidth: 2,
      //minRange: 24 * 3600 * 1000,
      endOnTick: false,
      startOnTick: false,
      ordinal: false,
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
          dataGrouping: {
            units: [
              ["week", [1]],
              ["month", [1, 2, 3, 4, 6]],
            ],
          },
        };
      }),
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
      constructorType={"stockChart"}
    />
  );
};

export default React.memo(LineCharts);
