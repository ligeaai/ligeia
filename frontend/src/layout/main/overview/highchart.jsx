import React from "react";
import { Measurement } from "../../../components/highchart/charts";
import { Highchart } from "../../../components";

const OverviewEditor = ({ highchartProps, width, height }) => {
  if (highchartProps.Type === "Measurement") {
    return (
      <Measurement
        highchartProps={highchartProps}
        width={width}
        height={height}
      />
    );
  }
  if (highchartProps.Name !== "") {
    return (
      <Highchart
        highchartProps={highchartProps}
        width={width}
        height={height}
      />
    );
  }
  return <></>;
};

export default OverviewEditor;
