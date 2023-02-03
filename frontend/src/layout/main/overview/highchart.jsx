import React from "react";
import { Highchart } from "../../../components";
import Box from "@mui/material/Box";
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
      <Box sx={{ width: width, height: height }}>
        <Highchart
          highchartProps={highchartProps}
          width={width}
          height={height}
          liveData={liveData}
          backfillData={backfillData}
          tabular={tabular}
        />
      </Box>
    );
  }
  return <></>;
};

export default OverviewEditor;
