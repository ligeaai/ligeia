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
const LineCharts = ({
  highchartProps,
  width,
  height,
  liveData,

  chartType,
}) => {
  console.log(highchartProps.Inputs);
  const yAxisTitles = [];
  highchartProps.Inputs.map((e, index) => {
    if (!highchartProps[`[${e.NAME}] Disable Data Grouping`]) {
      yAxisTitles.push({
        id: "yaxis-" + index,
        endOnTick: true,
        startOnTick: true,
        type: "area",

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
          client.map((e) => {
            console.log(e);
            e.onclose = function () {
              console.log("WebSocket Client Closed");
            };
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
                    console.log("klşsakdkaşsdlk");
                    let jsonData = JSON.parse(e.data);
                    let data = [];
                    const sortedJson = jsonData.sort((a, b) =>
                      parseInt(a.timestamp) > parseInt(b.timestamp) ? 1 : -1
                    );
                    sortedJson.map((e) => {
                      let i = true;
                      data.map((s) => {
                        console.log(e);
                        if (s[0] === e.timestamp * 1000) i = false;
                      });
                      if (i) {
                        data.push([parseInt(e.timestamp) * 1000, e.tag_value]);
                      }
                    });

                    series.addAxis(
                      {
                        id: "yaxis-" + index,
                        opposite: false,
                        title: {
                          text: `${tag.UOM_QUANTITY_TYPE} (${tag.UOM})`,
                        },
                      },
                      false
                    );
                    series.addSeries({
                      yAxis: "yaxis-" + index,
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
      //  enabled: !liveData,

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
    navigator: {
      xAxis: {
        type: "datetime",
        minRange: 30,
        // min: new Date().getTime() - 90 * 24 * 60 * 60 * 1000,
        // max: new Date().getTime() + 1000,
        // crosshair: true,
        // ordinal: true,
      },
      // series: [
      //   ...highchartProps.Inputs.map((e, i) => {
      //     return {
      //       yAxis: i,
      //       name: e.NAME,
      //       color: highchartProps["Enable Custom Colors"]
      //         ? highchartProps[`[${e.NAME}] Color`]
      //         : "",
      //     };
      //   }),
      // ],
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
      minRange: 30,
      // ordinal: true,
      // min: new Date().getTime() - 90 * 24 * 60 * 60 * 1000,
      // max: new Date().getTime() + 1000,
      //crosshair: true,
      // labels: {
      //   formatter: function () {
      //     return Highcharts.dateFormat("%d.%m.%Y %H:%M:%S", this.value);
      //   },
    },
    // categories: categories,
    // },
    //yAxis: [...yAxisTitles],
    //series: [],
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
