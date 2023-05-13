import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import StepOne from "./stepOne";
import LineAssets from "../../highchart/popUpLayout/lineAssets";
import { fillMandatory } from "../../../services/actions/stepper/stepper";
import Inputs from "../../highchart/popup/inputs";
import "../../../assets/styles/page/overview/popUpLayout.scss";
function MatrixNewPopUp() {
  const dispatch = useDispatch();
  const stopsNum = useSelector(
    (state) => state.overviewDialog.highchartProps.Stops
  );
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  React.useEffect(() => {
    dispatch(fillMandatory([["Name"], ["Assets"], ["Inputs"]]));
  }, []);
  return [
    ["Proporties", <StepOne />],
    [
      "Assets",
      <Box className="overview-line-chart-hc-asset-box">
        <Box className="overview-line-chart-hc-asset-box__title">Assets</Box>
        <LineAssets
          handleChangeFunc={(value) => {
            handleChangeFunc("Assets", value);
          }}
        />
      </Box>,
    ],
    [
      "Measurements",
      <Box className="overview-line-chart-hc-asset-box">
        <Box className="overview-line-chart-hc-asset-box__title">Inputs</Box>
        <Inputs
          handleChangeFunc={(value) => {
            handleChangeFunc("Inputs", value);
          }}
        />
      </Box>,
    ],
  ];
}

export default MatrixNewPopUp;
