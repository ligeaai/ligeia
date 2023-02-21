import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { MyNumberTextField, ColorTextfield } from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";
import CreateLineWidget from "../popUpLayout/createLineWidget";
import LineAssets from "../popUpLayout/lineAssets";
import CustomLineChart from "../popUpLayout/customLineChart";
import { fillMandatory } from "../../../services/actions/stepper/stepper";
import Inputs from "../popup/inputs";
function LineChartPopUp() {
  const dispatch = useDispatch();
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  const stopsNum = useSelector(
    (state) => state.overviewDialog.highchartProps.Stops
  ); //it is mandatory strangely
  React.useEffect(() => {
    dispatch(fillMandatory([["Name"], ["Transaction Property"], ["Inputs"]]));
  }, []);
  return [
    ["Proporties", <CreateLineWidget />],
    [
      "Assets",
      <Box sx={{ height: "calc(100% - 44px)" }}>
        <Box sx={{ ml: 2, mb: 1.5, fontSize: "14px" }}>Assets</Box>
        <LineAssets
          handleChangeFunc={(value) => {
            handleChangeFunc("Transaction Property", value);
          }}
        />
      </Box>,
    ],
    [
      "Measurements",
      <Box sx={{ height: "calc(100% - 44px)" }}>
        <Box sx={{ ml: 2, mb: 1.5, fontSize: "14px" }}>Inputs</Box>
        <Inputs
          handleChangeFunc={(value) => {
            handleChangeFunc("Inputs", value);
          }}
        />
      </Box>,
    ],
    ["Settings", <CustomLineChart />],
  ];
}

export default LineChartPopUp;
