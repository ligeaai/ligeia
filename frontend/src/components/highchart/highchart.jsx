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
      fill: theme.palette.background.success,
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

      }
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
      <MyBox>
        <Angular highchartProps={highchartProps} width={width} height={height} />
      </MyBox>
    ),
    Linechart: (
      <MyBox>
        <LineChart
          highchartProps={highchartProps}
          width={width}
          height={height}
          liveData={liveData}
          backfillData={backfillData}
          tabular={tabular}
        />
      </MyBox>
    ),
    "Gauge(Solid) [Highchart]": (
      <Solid highchartProps={highchartProps} width={width} height={height} />
    ),
  };

  return <MyBox>{chartType[highchartProps.Type]}</MyBox>;
};

export default Highchart;
