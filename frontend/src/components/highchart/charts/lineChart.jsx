import Highcharts from "highcharts/highstock";
import React from "react";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import data from "highcharts/modules/data";
import accessibility from "highcharts/modules/accessibility";
import { wsBaseUrl } from "../../../services/baseApi";

var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
accessibility(Highcharts);
data(Highcharts);
const LineCharts = ({ highchartProps, width, height, liveData, chartType }) => {
  const client = [];
  const [key, setKey] = React.useState(0);
  const yAxisTitles = [];
  let yAxiskey = {};
  console.log("asd");
  React.useEffect(() => {
    setKey(key + 1);
  }, [highchartProps.Inputs.length]);
  highchartProps.Inputs.map((e, i) => {
    if (!highchartProps[`[${e.NAME}] Disable Data Grouping`]) {
      if (!yAxiskey.hasOwnProperty(`${e.UOM_QUANTITY_TYPE} (${e.UOM})`)) {
        yAxiskey[`${e.UOM_QUANTITY_TYPE} (${e.UOM})`] = i;
        yAxisTitles.push({
          id: "yaxis-" + i,
          title: {
            text: e.UOM
              ? `${e.UOM_QUANTITY_TYPE} (${e.UOM})`
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
    }
  });

  React.useEffect(() => {
    return () => {
      yAxiskey = {};
      Promise.all(
        client.map((e) => {
          console.log("line");
          e.close();
        })
      );
    };
  }, [liveData]);
  const options = {
    constructorType: "stockChart",
    chart: {
      useGPUTranslations: true,
      width: width,
      zoomBySingleTouch: true,
      zoomType: "x",
      type: chartType,
      reflow: true,
      events: {
        load: function () {
          var series = this;
          let dataList = [];
          client.map((e) => {
            e.close();
          });
          highchartProps.Inputs.map((tag, index) => {
            const myindex = index;
            console.log(tag.TAG_ID);
            client[index] = new W3CWebSocket(
              `${wsBaseUrl}/ws/tags/${tag.TAG_ID}`
            );
            client[index].onerror = function () {
              console.log("Connection Error");
            };
            client[index].onopen = function () {
              console.log(tag.NAME);
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
                    if (jsonData.length > 1) {
                      let data = [];
                      Promise.all(
                        jsonData.map((e) => {
                          console.log(e);
                          console.log(Object.keys(e));
                          data.push([
                            parseInt(e[Object.keys(e)[0]][1][0][0]) * 1000,
                            e[Object.keys(e)[0]][1][0][1],
                          ]);
                        })
                      );
                      console.log(data);
                      series.addSeries({
                        yAxis:
                          "yaxis-" +
                          yAxiskey[`${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`],
                        name: tag.NAME,

                        color: highchartProps["Enable Custom Colors"]
                          ? highchartProps[`[${tag.NAME}] Color`]
                          : "",

                        data: data,
                        dataGrouping: {
                          units: [
                            ["week", [1]],
                            ["month", [1, 2, 3, 4, 6]],
                          ],
                        },
                      });
                    } else {
                      Promise.all(
                        jsonData.map((data) => {
                          Object.keys(data).map((key) => {
                            dataList[myindex].addPoint(
                              {
                                x: data[key][1][0][0] * 1000,
                                y: data[key][1][0][1],
                              },
                              true,
                              false,
                              false
                            );
                          });
                        })
                      );
                    }

                    return true;
                  }
                }
              }
              sendNumber();
            };
          });
        },
        // redraw: function () {
        //   var yAxis = this.yAxis;
        //   if (yAxis) {
        //     yAxis.map((e) => {
        //       console.log(e);
        //       if ((!e.min || !e.max) && e.title !== "") {
        //         e.setTitle({ text: "" });
        //         e.title = "";
        //       }
        //     });
        //   }
        // },
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
        max: new Date().getTime() + 1000,
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
      max: new Date().getTime() + 1000,
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
    yAxis: [...yAxisTitles],
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
          height: height,
        },
      }}
      constructorType={"stockChart"}
    />
  );
};

export default React.memo(LineCharts);
