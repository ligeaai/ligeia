import Highcharts from "highcharts/highstock";
import React from "react";

import Box from "@mui/material/Box";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import data from "highcharts/modules/data";
import boost from "highcharts/modules/boost";
import accessibility from "highcharts/modules/accessibility";
import { wsBaseUrl } from "../../../services/baseApi";

let client = [];
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
accessibility(Highcharts);
data(Highcharts);
boost(Highcharts);
const LineCharts = ({ highchartProps, width, height, liveData, chartType }) => {
  React.useEffect(() => {
    return () => {
      client.map((e) => {
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
          let yAxiskey = {};
          client.map((e) => {
            e.close();
          });
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
            dataList = series;
            client[index].onmessage = function (e) {
              async function sendNumber() {
                if (client.readyState === client.OPEN) {
                  if (typeof e.data === "string") {
                    let jsonData = JSON.parse(e.data);
                    let data = [];
                    const sortedJson = jsonData.sort((a, b) =>
                      parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1
                    );
                    sortedJson.map((e) => {
                      let i = true;
                      data.map((s) => {
                        //TODO delete this when the data is correct
                        if (s[0] === e.timestamp * 1000) i = false;
                      });
                      if (i) {
                        data.push([parseInt(e.timestamp) * 1000, e.tag_value]);
                      }
                    });
                    if (
                      !yAxiskey.hasOwnProperty(
                        `${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`
                      )
                    ) {
                      yAxiskey[`${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`] = index;
                      series.addAxis(
                        {
                          id: "yaxis-" + index,
                          opposite: false,
                          title: {
                            text: `${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`,
                            style: {
                              fontSize:
                                highchartProps[
                                  "Graph Axis Title Font Size (em)"
                                ] === ""
                                  ? "11px"
                                  : `${highchartProps["Graph Axis Title Font Size (em)"]}px`,
                            },
                          },
                          labels: {
                            style: {
                              fontSize:
                                highchartProps[
                                  "Graph Axis Value Font Size (em)"
                                ] === ""
                                  ? 11
                                  : highchartProps[
                                      "Graph Axis Value Font Size (em)"
                                    ],
                            },
                          },
                        },
                        false
                      );
                    }

                    series.addSeries({
                      yAxis:
                        "yaxis-" +
                        yAxiskey[`${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`],
                      name: tag.NAME,

                      color: highchartProps["Enable Custom Colors"]
                        ? highchartProps[`[${tag.NAME}] Color`]
                        : "",

                      data: data,
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
          type: "month",
          count: 1,
          text: "1m",
        },
        {
          type: "month",
          count: 3,
          text: "3m",
        },
        {
          type: "month",
          count: 6,
          text: "6m",
        },
        {
          type: "all",
          text: "All",
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
    navigator: {
      enabled: highchartProps["Show Enable Range Selector"],
      xAxis: {
        type: "datetime",
        minRange: 30,
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
      minRange: 30,
    },
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
