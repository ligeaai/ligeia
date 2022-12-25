import Highcharts from "highcharts";
import React from "react";
export const angular = (highchartProps) => {
  return {
    chart: {
      type: "gauge",
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
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
      startAngle: -90,
      endAngle: 89.9,
      background: null,
      center: ["50%", "75%"],
      size: "110%",
    },

    // the value axis
    yAxis: {
      min: parseInt(highchartProps.Minimum),
      max: parseInt(highchartProps.Maximum),
      tickPixelInterval: 72,
      tickPosition: "inside",
      tickColor: Highcharts.defaultOptions.chart.backgroundColor || "#FFFFFF",
      tickLength: 20,
      tickWidth: 2,
      minorTickInterval: null,
      labels: {
        distance: 20,
        style: {
          fontSize: "14px",
        },
      },
      plotBands: [
        {
          from: parseInt(highchartProps["[0] Low"]),
          to: parseInt(highchartProps["[0] High"]),
          color: highchartProps["[0] Color"], // green
          thickness: 20,
        },
        {
          from: parseInt(highchartProps["[1] Low"]),
          to: parseInt(highchartProps["[1] High"]),
          color: highchartProps["[1] Color"], // yellow
          thickness: 20,
        },
        {
          from: highchartProps["[2] Low"],
          to: highchartProps["[2] High"],
          color: highchartProps["[2] Color"], // red
          thickness: 20,
        },
        {
          from: highchartProps["[3] Low"],
          to: highchartProps["[3] High"],
          color: highchartProps["[3] Color"], // red
          thickness: 20,
        },
        {
          from: highchartProps["[4] Low"],
          to: highchartProps["[4] High"],
          color: highchartProps["[4] Color"], // red
          thickness: 20,
        },
      ],
    },

    series: [
      {
        name: "Speed",
        data: [80],
        tooltip: {
          valueSuffix: " km/h",
        },
        dataLabels: {
          format: "{y} km/h",
          borderWidth: 0,
          color:
            (Highcharts.defaultOptions.title &&
              Highcharts.defaultOptions.title.style &&
              Highcharts.defaultOptions.title.style.color) ||
            "#333333",
          style: {
            fontSize: "10px",
          },
        },
        dial: {
          radius: "80%",
          backgroundColor: "gray",
          baseWidth: 12,
          baseLength: "0%",
          rearLength: "0%",
        },
        pivot: {
          backgroundColor: "gray",
          radius: 6,
        },
      },
    ],
  };
};
