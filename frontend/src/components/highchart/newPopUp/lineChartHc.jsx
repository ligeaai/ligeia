import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";

import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import CreateLineWidget from "../popUpLayout/createLineWidget";
import LineAssets from "../popUpLayout/lineAssets";
import CustomLineChart from "../popUpLayout/customLineChart";
import { fillMandatory } from "../../../services/actions/stepper/stepper";
import Inputs from "../popup/inputs";
import "../../../assets/styles/page/overview/popUpLayout.scss";
function LineChartPopUp() {
  const dispatch = useDispatch();
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  const stopsNum = useSelector(
    (state) => state.overviewDialog.highchartProps.Stops
  ); //it is mandatory strangely
  React.useEffect(() => {
    dispatch(fillMandatory([["Name"], ["Assets"], ["Inputs"]]));
  }, []);
  return [
    ["Proporties", <CreateLineWidget />],
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
    ["Settings", <CustomLineChart />],
  ];
}

export default LineChartPopUp;
