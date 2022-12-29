import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { angular, LineChart, solid } from "./charts";

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

const Highchart = ({ highchartProps, width, height }) => {
  const chartType = {
    "Gauge(Angular)[Highchart]": angular,
    Linechart: LineChart,
    "Gauge(Solid)[Highchart]": solid,
  };

  return (
    <MyBox>
      {chartType[highchartProps.Type](highchartProps, width, height)}
    </MyBox>
  );
};

export default Highchart;
