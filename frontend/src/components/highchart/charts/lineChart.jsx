import Highcharts from "highcharts/highstock";
import React from "react";
import Box from "@mui/material/Box";
import HighchartsReact from "highcharts-react-official";
import exporting from "highcharts/modules/exporting";
import exportdata from "highcharts/modules/export-data";
var client;
var W3CWebSocket = require("websocket").w3cwebsocket;
exporting(Highcharts);
exportdata(Highcharts);

export const LineChart = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
}) => {
  Highcharts.addEvent(Highcharts.Chart, "render", function () {
    var table = this.dataTableDiv;
    if (table) {
      // Apply styles inline because stylesheets are not passed to the exported SVG
      Highcharts.css(table.querySelector("table"), {
        "border-collapse": "collapse",
        "border-spacing": 0,
        background: "white",
        "min-width": "100%",
        "font-family": "sans-serif",
        "font-size": "14px",
        overflow: "scrol",
      });

      [].forEach.call(
        table.querySelectorAll("td, th, caption"),
        function (elem) {
          Highcharts.css(elem, {
            border: "1px solid silver",
            padding: "0.5em",
          });
        }
      );

      Highcharts.css(table.querySelector("caption"), {
        "border-bottom": "none",
        "font-size": "1.1em",
        "font-weight": "bold",
      });

      [].forEach.call(
        table.querySelectorAll("caption, tr"),
        function (elem, i) {
          if (i % 2) {
            Highcharts.css(elem, {
              background: "#f8f8f8",
            });
          }
        }
      );

      // Add the table as the subtitle to make it part of the export
      this.setTitle(null, {
        text: table.innerHTML,
        useHTML: true,
      });
      if (table.parentNode) {
        table.parentNode.removeChild(table);
      }
      delete this.dataTableDiv;
    }
  });
  console.log(liveData);
  console.log(backfillData);
  const [categories, setCategories] = React.useState([]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    if (client) {
      setData([]);
      client.onclose = function () {
        console.log("WebSocket Client Closed");
      };
    }
    if (backfillData) {
      client = new W3CWebSocket("ws://34.125.220.112:8000/ws/tags/backfill/");
    } else client = new W3CWebSocket("ws://34.125.220.112:8000/ws/tags/");
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("WebSocket Client Connected");
    };

    client.onmessage = function (e) {
      console.log(e);
      function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let jsonData = JSON.parse(e.data);
            console.log(jsonData);
            if (Object.keys(jsonData.message).length > 5) {
              setCategories((prev) => [...prev, jsonData.message.createdtime]);

              setData((prev) => [...prev, parseInt(jsonData.message.value)]);
            }

            //setTimeout(sendNumber, 10000);
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
  }, [liveData]);
  const options = {
    chart: {
      zoomBySingleTouch: true,
      zoomType: "x",
      type: "spline",
      reflow: true,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      shape: "square",
      headerShape: "callout",
      borderWidth: 0,
      shadow: false,
      positioner: function (width, height, point) {
        var chart = this.chart,
          position;

        if (point.isHeader) {
          position = {
            x: Math.max(
              // Left side limit
              chart.plotLeft,
              Math.min(
                point.plotX + chart.plotLeft - width / 2,
                // Right side limit
                chart.chartWidth - width - chart.marginRight
              )
            ),
            y: point.plotY,
          };
        } else {
          position = {
            x: point.series.chart.plotLeft,
            y: point.series.yAxis.top - chart.plotTop,
          };
        }

        return position;
      },
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
        name: "Value",
        data: data,
      },
    ],
    exporting: {
      showTable: true,
      allowHTML: true,
    },
  };
  return (
    <Box
      sx={{
        ".highcharts-subtitle": {
          height: tabular ? `calc(${height}px - 25px)` : "0px",
          overflow: "scroll",
        },
        table: {
          display: tabular ? "block" : "none",
          // backgroundColor: "#ffffff",
          // overflow: "scroll",
          // height: `${height}px`,

          // position: "sticky",
          // marginTop: "40px",
          // bottom: height,
          // width: `${width}px`,
          // table: {
          //   width: `calc(${width}px - 20px)`,
          //   ".highcharts-table-caption": {
          //     display: "none",

          //     backgroundColor: "#ffffff",
          //   },
          // },
        },
        svg: {
          display: tabular ? "none" : "block",
        },
      }}
    >
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
