import Highcharts from "highcharts/highstock";
import React from "react";

import Box from "@mui/material/Box";

import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import accessibility from "highcharts/modules/accessibility";
import { wsBaseUrl } from "../../../services/baseApi";

import { DataGrid } from "../../index";
import { dateFormatDDMMYYHHMM } from "../../../services/utils/dateFormatter";
import { useSelector } from "react-redux";
import { uuidv4 } from "../../../services/utils/uuidGenerator";
let client = [];
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
accessibility(Highcharts);
const LineCharts = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
  chartType,
}) => {
  console.log(highchartProps.Inputs);
  const UOMList = useSelector((state) => state.tapsOverview.UOMList);
  const yAxisTitles = [];
  const series = [];
  const [categories, setCategories] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [allData, setAllData] = React.useState([]);

  highchartProps.Inputs.map((e) => {
    if (!highchartProps[`[${e.NAME}] Disable Data Grouping`]) {
      yAxisTitles.push({
        title: {
          text: e.UOM,
        },
        max: parseInt(e.NORMAL_MAXIMUM),
        min: parseInt(e.NORMAL_MINIMUM),
        opposite: false,
      });
      // series.push({
      //   name: e.NAME,

      //   color: highchartProps["Enable Custom Colors"]
      //     ? highchartProps[`[${e.NAME}] Color`]
      //     : "",
      // });
    }
  });

  React.useEffect(() => {
    // if (client) {
    //   setAllData([]);
    //   setData([]);
    //   client.onclose = function () {
    //     console.log("WebSocket Client Closed");
    //   };
    // }
    // if (backfillData) {
    //   client = new W3CWebSocket(`${wsBaseUrl}/ws/tags/backfill/`);
    // } else client = new W3CWebSocket(`${wsBaseUrl}/ws/tags/`);
    // client.onerror = function () {
    //   console.log("Connection Error");
    // };
    // client.onopen = function () {
    //   console.log("connedted");
    //   //client.send(JSON.stringify({ text: "Tag 1" }));
    // };

    // client.onmessage = function (e) {
    //   console.log(e);

    //   function sendNumber() {
    //     if (client.readyState === client.OPEN) {
    //       if (typeof e.data === "string") {
    //         let jsonData = JSON.parse(e.data);
    //         if (Object.keys(jsonData.message).length > 5) {
    //           // let timestamp = new Date(jsonData.message.createdtime);
    //           let timestamp = new Date(jsonData.message.timestamp);
    //           const time = dateFormatDDMMYYHHMM(timestamp);
    //           setCategories((prev) => [...prev, time]);
    //           setAllData((prev) => [...prev, jsonData.message]);
    //           console.log(timestamp);
    //           var series = options.series[0].data;
    //           setData((prev) => [...prev, parseInt(jsonData.message.value)]);
    //           // series.push([
    //           //   Date.UTC(
    //           //     timestamp.getFullYear(),
    //           //     timestamp.getMonth() + 1,
    //           //     timestamp.getDay(),
    //           //     timestamp.getHours(),
    //           //     timestamp.getMinutes(),
    //           //     timestamp.getSeconds()
    //           //   ),
    //           //   parseInt(jsonData.message.value),
    //           // ]);
    //           // setData((prev) => [
    //           //   ...prev,
    //           //   [
    //           //     Date.UTC(
    //           //       timestamp.getFullYear(),
    //           //       timestamp.getMonth(),
    //           //       timestamp.getDay(),
    //           //       timestamp.getHours(),
    //           //       timestamp.getMinutes(),
    //           //       timestamp.getSeconds()
    //           //     ),
    //           //     parseInt(jsonData.message.value),
    //           //   ],
    //           // ]);
    //           // series.addPoint(
    //           //   [timestamp, parseInt(jsonData.message.value)],
    //           //   true,
    //           //   true
    //           // );
    //         }

    //         //setTimeout(sendNumber, 10000);
    //         return data;
    //       }
    //     }
    //   }
    //   sendNumber();
    // };
    return () => {
      client.map((e) => {
        setAllData([]);
        e.onclose = function () {
          console.log("WebSocket Client Closed");
        };
      });
      // client.onclose = function () {
      //   console.log("WebSocket Client Closed");
      // };
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
            setAllData([]);
            e.onclose = function () {
              console.log("WebSocket Client Closed");
            };
          });
          console.log("lsşakdlksşad");
          highchartProps.Inputs.map((tag, index) => {
            console.log(client);
            const myindex = index;

            if (backfillData) {
              client[index] = new W3CWebSocket(
                `${wsBaseUrl}/ws/tags/backfill/${tag.ROW_ID}`
              );
            } else {
              client[index] = new W3CWebSocket(
                `${wsBaseUrl}/ws/tags/${tag.ROW_ID}`
              );
            }
            client[index].onerror = function () {
              console.log("Connection Error");
            };
            client[index].onopen = function () {
              console.log("connedted");
              //client.send(JSON.stringify({ text: "Tag 1" }));
            };
            console.log(index);
            dataList[index] = series.series[index];
            client[index].onmessage = function (e) {
              console.log("askdlşsad");
              async function sendNumber() {
                if (client.readyState === client.OPEN) {
                  if (typeof e.data === "string") {
                    let jsonData = JSON.parse(e.data);
                    console.log(jsonData);

                    // let timestamp = new Date(jsonData.message.createdtime);
                    // let timestamp = new Date(jsonData.message.timestamp);
                    // const time = dateFormatDDMMYYHHMM(timestamp);
                    // setCategories((prev) => [...prev, time]);
                    // setAllData((prev) => [...prev, jsonData.message]);
                    // console.log(series);

                    // setData((prev) => [
                    //   ...prev,
                    //   parseInt(jsonData.message.value),
                    // ]);
                    console.log(myindex);

                    console.log("asds");
                    Promise.all(
                      Object.keys(jsonData).map((f) => {
                        jsonData[f][1].map((d) => {
                          dataList[myindex].addPoint({
                            x: d[0] * 1000,
                            y: d[1],
                          });
                          setAllData((prev) => [
                            ...prev,
                            {
                              created_by: tag.NAME,
                              timestamp: d[0],
                              value: d[1],
                              id: uuidv4(),
                            },
                          ]);
                        });
                      })
                    );

                    // jsonData["temperature:20"][1].map((d) => {
                    //   var dataPoint1 = {
                    //     x: d[0],
                    //     y: Math.round(d[1]),
                    //   };

                    //   dataList[index] = series.series[index];
                    //   dataList[index].addPoint(dataPoint1);
                    // });
                    // jsonData["vibration_x:20"][1].map((d) => {
                    //   var dataPoint1 = {
                    //     x: d[0],
                    //     y: Math.round(d[1]),
                    //   };

                    //   dataList[index] = series.series[index];
                    //   dataList[index].addPoint(dataPoint1);
                    // });

                    // jsonData["pressure:19"][1].map((d) => {
                    //   var dataPoint1 = {
                    //     x: d[0],
                    //     y: Math.round(d[1]),
                    //   };

                    //   dataList[index] = series.series[index];
                    //   dataList[index].addPoint(dataPoint1);
                    // });
                    // var dataPoint1 = {
                    //   x: new Date(timestamp).getTime(),
                    //   y: Math.round(jsonData.message.value),
                    // };

                    // dataList[index] = series.series[index];
                    // dataList[index].addPoint(jsonData[1]);

                    // series.push([
                    //   Date.UTC(
                    //     timestamp.getFullYear(),
                    //     timestamp.getMonth() + 1,
                    //     timestamp.getDay(),
                    //     timestamp.getHours(),
                    //     timestamp.getMinutes(),
                    //     timestamp.getSeconds()
                    //   ),
                    //   parseInt(jsonData.message.value),
                    // ]);
                    // setData((prev) => [
                    //   ...prev,
                    //   [
                    //     Date.UTC(
                    //       timestamp.getFullYear(),
                    //       timestamp.getMonth(),
                    //       timestamp.getDay(),
                    //       timestamp.getHours(),
                    //       timestamp.getMinutes(),
                    //       timestamp.getSeconds()
                    //     ),
                    //     parseInt(jsonData.message.value),
                    //   ],
                    // ]);
                    // series.addPoint(
                    //   [timestamp, parseInt(jsonData.message.value)],
                    //   true,
                    //   true
                    // );

                    //setTimeout(sendNumber, 10000);
                    //return data;
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
      ...highchartProps.Inputs.map((e) => {
        return {
          name: e.NAME,
          color: highchartProps["Enable Custom Colors"]
            ? highchartProps[`[${e.NAME}] Color`]
            : "",
        };
      }),
    ],
  };
  if (!tabular) {
    if (liveData)
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
          // constructorType={"stockChart"}
        />
      );
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
  }
  return (
    <Box sx={{ width: width, height: height }}>
      <DataGrid
        columns={[
          { field: "created_by", headerName: "Created By" },
          //  { field: "createdtime", headerName: "Created Time" },
          //  { field: "message_type", headerName: "Message Type" },
          { field: "timestamp", headerName: "Time Stamp" },
          { field: "value", headerName: "Value" },
        ]}
        rows={allData}
      />
    </Box>
  );
};

export default React.memo(LineCharts);
