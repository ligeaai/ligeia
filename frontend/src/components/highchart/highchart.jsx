import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Angular, LineChart, Solid, Measurement } from "./charts";
import { Bar, Pie, HeatMap, Line } from "./nivoCharts";
import { Matrix } from "./customWidget";
const MyBox = styled(Box)(({ theme }) => {
  return {
    ".highcharts-background": {
      fill: theme.palette.background.success,
    },
    ".highcharts-label-box": {
      fill: theme.palette.background.main,
    },
    ".highcharts-axis-labels": {
      text: {
        color: `${theme.palette.text.main} !important`,
        fill: `${theme.palette.text.main} !important`,
      },
    },
    ".highcharts-input-group": {
      text: {
        color: `${theme.palette.text.main} !important`,
        fill: `${theme.palette.text.main} !important`,
      },
    },

    ".highcharts-range-selector-buttons": {
      text: {
        fill: `${theme.palette.text.main} !important`,
      },

      rect: {
        fill: `${theme.palette.background.main} !important`,
      },
    },

    ".highcharts-exporting-group": {
      rect: {
        fill: `${theme.palette.background.main} !important`,
      },

      path: {
        fill: `${theme.palette.text.main} !important`,
        stroke: `${theme.palette.text.main} !important`,
      },
    },

    ".highcharts-menu": {
      li: {
        color: `${theme.palette.text.main} !important`,
      },

      background: `${theme.palette.background.main} !important`,
    },

    ".highcharts-root": {
      text: {
        color: `${theme.palette.text.main} !important`,
        fill: `${theme.palette.text.main} !important`,
      },
    },

    ".highcharts-data-labels": {
      text: {
        fill: `${theme.palette.success.primary} !important`,
      },
    },
  };
});

const Highchart = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
}) => {
  const chartType = {
    "Gauge(Angular) [Highchart]": (
      <Angular highchartProps={highchartProps} width={width} height={height} />
    ),
    "Linechart [Highchart]": (
      <LineChart
        highchartProps={highchartProps}
        width={width}
        height={height}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
        chartType="spline"
      />
    ),
    "Area Chart [Highchart]": (
      <LineChart
        highchartProps={highchartProps}
        width={width}
        height={height}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
        chartType="area"
      />
    ),
    "Gauge(Solid) [Highchart]": (
      <Solid highchartProps={highchartProps} width={width} height={height} />
    ),
    "Measurement [Custom]": (
      <Measurement
        highchartProps={highchartProps}
        width={width}
        height={height}
      />
    ),
    "Bar Chart [Nivo]": (
      <Bar highchartProps={highchartProps} width={width} height={height} />
    ),
    "Pie Chart [Nivo]": (
      <Pie highchartProps={highchartProps} width={width} height={height} />
    ),
    "Heat Map [Nivo]": (
      <HeatMap highchartProps={highchartProps} width={width} height={height} />
    ),
    "Matrix [Custom]": (
      <Matrix highchartProps={highchartProps} width={width} height={height} />
    ),
    "Line Chart [Nivo]": (
      <Line highchartProps={highchartProps} width={width} height={height} />
    ),
  };

  return <MyBox>{chartType[highchartProps.Type]}</MyBox>;
};

export default Highchart;
