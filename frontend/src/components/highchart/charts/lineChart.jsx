import Highcharts from "highcharts/highstock";
import React from "react";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import data from "highcharts/modules/data";
import accessibility from "highcharts/modules/accessibility";
import { wsBaseUrl } from "../../../services/baseApi";
import TagService from "../../../services/api/tags";
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
accessibility(Highcharts);
data(Highcharts);
const LineCharts = ({ highchartProps, width, height, chartType }) => {
  const client = [];
  const chartRef = React.createRef();
  React.useEffect(() => {
    if (chartRef.current) {
      const series = chartRef.current.chart;
      let yAxiskey = {};

      client.map((e) => {
        e.close();
      });
      if (series) {
        while (series.series.length) {
          series.series[0].remove(true);
        }

        while (series.yAxis.length > 1) {
          series.yAxis[0].remove();
        }
      }
      if (highchartProps.Inputs) {
        Promise.all(
          highchartProps.Inputs.map(async (tag, index) => {
            if (!highchartProps[`[${tag.NAME}] Disable Data Grouping`]) {
              if (
                !yAxiskey.hasOwnProperty(
                  `${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`
                )
              ) {
                yAxiskey[`${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`] = index;
                series.addAxis({
                  id: "yaxis-" + index,
                  title: {
                    text: tag.UOM
                      ? `${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`
                      : "Undefined (UoM)",
                    style: {
                      fontSize:
                        highchartProps["Graph Axis Title Font Size (em)"] === ""
                          ? "11px"
                          : `${highchartProps["Graph Axis Title Font Size (em)"]}px`,
                    },
                  },
                  labels: {
                    style: {
                      fontSize:
                        highchartProps["Graph Axis Value Font Size (em)"] === ""
                          ? 11
                          : highchartProps["Graph Axis Value Font Size (em)"],
                    },
                  },
                  endOnTick: true,
                  startOnTick: true,
                  alignTicks: true,
                  opposite: false,
                  events: {
                    load: function () {
                      this.addSeries({});
                    },
                    afterSetExtremes: function (e) {
                      if (e.min === e.max) {
                        this.update({
                          labels: {
                            enabled: false,
                          },
                          title: {
                            enabled: false,
                          },
                        });
                      } else {
                        this.update({
                          labels: {
                            enabled: true,
                          },
                          title: {
                            enabled: true,
                          },
                        });
                      }
                    },
                  },
                });
              }
              let res = await TagService.lineChartData(tag.TAG_ID);
              series.addSeries({
                yAxis:
                  "yaxis-" + yAxiskey[`${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`],
                name: tag.NAME,

                color: highchartProps["Enable Custom Colors"]
                  ? highchartProps[`[${tag.NAME}] Color`]
                  : "",

                data: res.data,
                // dataGrouping: {
                //   units: [
                //     ["week", [1]],
                //     ["month", [1, 2, 3, 4, 6]],
                //   ],
                // },
              });
              client[index] = new W3CWebSocket(
                `${wsBaseUrl}/ws/tags/${tag.TAG_ID}/${
                  res.data[res.data.length - 1]?.[0]
                    ? res.data[res.data.length - 1][0]
                    : 0
                }/${
                  highchartProps["Widget Refresh (seconds)"] === ""
                    ? 5
                    : parseInt(highchartProps["Widget Refresh (seconds)"])
                }/${res.data.length}/`
              );
              client[index].onerror = function () {
                console.log("Connection Error");
              };
              client[index].onopen = function () {
                console.log("connected");
              };
              client[index].onclose = function () {
                console.log("WebSocket Client Closed Line");
              };

              client[index].onmessage = function (e) {
                async function sendNumber() {
                  if (client.readyState === client.OPEN) {
                    if (
                      typeof e.data === "string" &&
                      Object.keys(series).length > 3
                    ) {
                      let jsonData = JSON.parse(e.data);
                      jsonData.map((e) => {
                        series.series.forEach(function (series) {
                          if (series.name === tag.NAME) {
                            series.addPoint(
                              {
                                x: e[0],
                                y: e[1],
                              },
                              true,
                              false,
                              false
                            );
                          }
                        });
                      });
                      return true;
                    }
                  }
                }
                sendNumber();
              };
            }
          })
        );
      }
    }
    return () => {
      Promise.all(
        client.map((e) => {
          e.close();
        })
      );
    };
  }, [highchartProps?.Inputs?.length]);

  React.useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chart.yAxis.map((e) => {
        e.update({
          title: {
            style: {
              fontSize:
                highchartProps["Graph Axis Title Font Size (em)"] === ""
                  ? "11px"
                  : `${highchartProps["Graph Axis Title Font Size (em)"]}px`,
            },
          },
          labels: {
            style: {
              fontSize:
                highchartProps["Graph Axis Value Font Size (em)"] === ""
                  ? 11
                  : highchartProps["Graph Axis Value Font Size (em)"],
            },
          },
        });
      });
    }
  }, [
    highchartProps["Graph Axis Value Font Size (em)"],
    highchartProps["Graph Axis Title Font Size (em)"],
  ]);

  return (
    <HighchartsReact
      //key={key}
      highcharts={Highcharts}
      options={{
        constructorType: "stockChart",
        chart: {
          useGPUTranslations: true,
          width: width,
          height: height,
          zoomBySingleTouch: true,
          zoomType: "x",
          type: chartType,
          reflow: true,
          events: {
            load: function () {},
            destroy: function () {
              client.map((e) => {
                e.close();
              });
            },
          },
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 1000,
              },
              chartOptions: {
                rangeSelector: {
                  dropdown: "always",
                },
              },
            },
          ],
        },
        rangeSelector: {
          enabled: highchartProps["Show Enable Navbar"],
          buttons: [
            {
              type: "minute",
              count: 1,
              text: "1m",
            },
            {
              type: "minute",
              count: 5,
              text: "5m",
            },
            {
              type: "minute",
              count: 15,
              text: "15m",
            },
            {
              type: "minute",
              count: 30,
              text: "30m",
            },
            {
              type: "hour",
              count: 1,
              text: "1h",
            },
            {
              type: "hour",
              count: 6,
              text: "6h",
            },
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
              type: "all",
              text: "All",
            },
          ],
          selected: 8,
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
          adaptToUpdatedData: false,
          enabled: highchartProps["Show Enable Range Selector"],
          xAxis: {
            type: "datetime",
            min: new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
            // max: new Date().getTime() + 1000,
            ordinal: false,
            endOnTick: false,
            startOnTick: false,
            events: {
              afterSetExtremes: function (event) {
                if (event.trigger !== "navigator-drag") {
                  this.chart.xAxis[0].setExtremes(event.min, event.max);
                }
              },
            },
          },
        },
        navigation: {
          buttonOptions: {
            verticalAlign: "top",
            y: -10,
            x: -1,
          },
        },
        legend: {
          enabled: highchartProps["Show Enable Graph Legend"],
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
          // max: new Date().getTime() + 1000,
          lineWidth: 1,
          tickWidth: 2,
          endOnTick: false,
          startOnTick: false,
          ordinal: false,
          events: {
            afterSetExtremes: function (event) {
              if (event.trigger !== "navigator-drag") {
                this.chart.xAxis[0].setExtremes(event.min, event.max);
              }
            },
          },
        },
      }}
      ref={chartRef}
      constructorType={"stockChart"}
    />
  );
};

export default React.memo(LineCharts);
