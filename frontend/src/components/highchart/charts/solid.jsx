import Highcharts from "highcharts/highcharts.js";
import highchartsMore from "highcharts/highcharts-more.js";
import solidGauge from "highcharts/modules/solid-gauge.js";
import HighchartsReact from "highcharts-react-official";
import React from "react";

highchartsMore(Highcharts);
solidGauge(Highcharts);

export const solid = (highchartProps) => {
  return {
    chart: {
      type: "solidgauge",
      height: "80%",
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

    pane: {
      center: ["50%", "85%"],
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
    exporting: {
      enabled: false,
    },

    tooltip: {
      enabled: false,
    },
    // the value axis
    yAxis: {
      min: parseInt(highchartProps.Minimum),
      max: parseInt(highchartProps.Maximum),
      stops: [
        [highchartProps["[0] Stops"], highchartProps["[0] Color"]],
        [highchartProps["[1] Stops"], highchartProps["[1] Color"]],
        [highchartProps["[2] Stops"], highchartProps["[2] Color"]],
        [highchartProps["[3] Stops"], highchartProps["[3] Color"]],
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70,
      },
      labels: {
        y: 16,
      },
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: true,
        },
        linecap: "round",
        stickyTracking: false,
        rounded: false,
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
            y: 80,
          },
        ],
      },
    ],
  };
};
