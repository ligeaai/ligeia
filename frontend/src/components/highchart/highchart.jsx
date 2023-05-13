import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  Angular,
  LineChart,
  Solid,
  Measurement,
  Tabular,
  Backfill,
  BarHc,
} from "./charts";
import { Bar, Pie, HeatMap, Line, TreeMap, BackFillLine } from "./nivoCharts";
import Matrix from "../overview/matrix/chart";
import "../../assets/styles/page/overview/chartContainer.scss";
const MyBox = styled(Box)(({ theme }) => {
  return {
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
    "Bar Chart [Highchart]": (
      <BarHc highchartProps={highchartProps} width={width} height={height} />
    ),
    "Line Chart [Highchart]": tabular ? (
      <Tabular
        highchartProps={highchartProps}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
        chartType="spline"
      />
    ) : backfillData ? (
      <Backfill
        highchartProps={highchartProps}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
        width={width}
        height={height}
        chartType="spline"
      />
    ) : (
      <LineChart
        highchartProps={highchartProps}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
        width={width}
        height={height}
        chartType="spline"
      />
    ),
    "Area Chart [Highchart]": (
      <>areaChart</>
      // <LineChart
      //   highchartProps={highchartProps}
      //   width={width}
      //   height={height}
      //   liveData={liveData}
      //   backfillData={backfillData}
      //   tabular={tabular}
      //   chartType="area"
      // />
    ),
    "Gauge(Solid) [Highchart]": (
      <Solid highchartProps={highchartProps} width={width} height={height} />
    ),

    "Measurement [Custom]": <Measurement highchartProps={highchartProps} />,
    "Bar Chart [Nivo]": <Bar highchartProps={highchartProps} />,
    "Pie Chart [Nivo]": <Pie highchartProps={highchartProps} />,
    "Heat Map [Nivo]": <HeatMap highchartProps={highchartProps} />,
    "Matrix [Custom]": <Matrix highchartProps={highchartProps} />,
    "Line Chart [Nivo]": tabular ? (
      <Tabular
        highchartProps={highchartProps}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
      />
    ) : backfillData ? (
      <BackFillLine
        highchartProps={highchartProps}
        liveData={liveData}
        height={height}
      />
    ) : (
      //<Line highchartProps={highchartProps} liveData={liveData} />
      <Line
        highchartProps={highchartProps}
        liveData={liveData}
        height={height}
      />
    ),

    "TreeMap Chart [Nivo]": <TreeMap highchartProps={highchartProps} />,
  };

  return (
    <MyBox className="chart-container" style={{ width, height }}>
      {chartType[highchartProps.Type]}
    </MyBox>
  );
};

export default Highchart;
