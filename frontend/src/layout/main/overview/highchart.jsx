import React from "react";
import { Measurement } from "../../../components/highchart/charts";
import { Highchart } from "../../../components";

const OverviewEditor = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
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
        tabular={tabular}
      />
    );
  }
  return <></>;
};

export default OverviewEditor;
