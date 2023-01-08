import React from "react";
import { Highchart } from "../../../components";

const OverviewEditor = ({
  highchartProps,
  width,
  height,
  liveData,
  backfillData,
  tabular,
}) => {
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
