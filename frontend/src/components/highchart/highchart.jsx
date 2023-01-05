import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Angular, LineChart, Solid } from "./charts";

const MyBox = styled(Box)(({ theme }) => {
  return {
    ".highcharts-background": {
      fill: theme.palette.background.main,
    },
    ".highcharts-axis-labels": {
      text: {
        color: `${theme.palette.text.main} !important`,
        fill: `${theme.palette.text.main} !important`,
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
    "Gauge(Angular)[Highchart]": (
      <Angular highchartProps={highchartProps} width={width} height={height} />
    ),
    Linechart: (
      <LineChart
        highchartProps={highchartProps}
        width={width}
        height={height}
        liveData={liveData}
        backfillData={backfillData}
        tabular={tabular}
      />
    ),
    "Gauge(Solid)[Highchart]": (
      <Solid highchartProps={highchartProps} width={width} height={height} />
    ),
  };

  return <MyBox>{chartType[highchartProps.Type]}</MyBox>;
};

export default Highchart;
