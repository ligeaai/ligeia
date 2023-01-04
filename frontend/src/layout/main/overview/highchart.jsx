import React from "react";
import { Measurement } from "../../../components/highchart/charts";
import { Highchart } from "../../../components";

const OverviewEditor = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
}) => {
  if (highchartProps.Type === "Measurement") {
    return (
      <Measurement
        highchartProps={highchartProps}
        width={width}
        height={height}
        liveData={liveData}
        backfillData={backfillData}
      />
    );
  }
  if (highchartProps.Name !== "") {
    return (
      <Highchart
        highchartProps={highchartProps}
        width={width}
        height={height}
        liveData={liveData}
        backfillData={backfillData}
      />
    );
  }
  return <></>;
};

export default OverviewEditor;
