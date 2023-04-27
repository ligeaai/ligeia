import React from "react";
import { useDispatch } from "react-redux";

import { Grid, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import Inputs from "./inputs";
import CustomLineChart from "../popUpLayout/customLineChart";
import CreateLineWidget from "../popUpLayout/createLineWidget";
import LineAssets from "../popUpLayout/lineAssets";
const Linechart = ({ handleClose, title, height }) => {
  const dispatch = useDispatch();
  const [selectedWidget, setSelectedWidget] = React.useState("Properties");
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  const handeleOnClick = (a) => () => {
    setSelectedWidget(a);
  };
  return (
    <>
      <Grid
        container
        id="draggable-dialog-title"
        className="overview-update-pop-up__box__header"
      >
        <Grid
          item
          className="overview-update-pop-up__box__header__id"
          onClick={handeleOnClick("Properties")}
        >
          {title}
        </Grid>
        {["Properties", "Assets", "Measurements", "Settings"].map((e) => (
          <Grid item style={{ cursor: "pointer" }} onClick={handeleOnClick(e)}>
            {e}
          </Grid>
        ))}

        <Grid item>
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Box className="overview-update-pop-up__box__body">
        {selectedWidget === "Properties" ? (
          <Box>
            <Typography className="overview-update-pop-up__box__body__label">
              Properties
            </Typography>
            <CreateLineWidget />
          </Box>
        ) : (
          <></>
        )}
        {selectedWidget === "Assets" ? (
          <Box className="overview-update-pop-up__box__body__asset-box">
            <Typography className="overview-update-pop-up__box__body__label">
              Assets
            </Typography>
            <LineAssets
              handleChangeFunc={(value) => {
                handleChangeFunc("Assets", value);
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        {selectedWidget === "Measurements" ? (
          <Box className="overview-update-pop-up__box__body__asset-box">
            <Typography className="overview-update-pop-up__box__body__label">
              Measurements
            </Typography>
            <Inputs
              handleChangeFunc={(value) => {
                handleChangeFunc("Inputs", value);
              }}
            />
          </Box>
        ) : (
          <></>
        )}
        {selectedWidget === "Settings" ? (
          <Box>
            <Typography className="overview-update-pop-up__box__body__label">
              Settings
            </Typography>
            <CustomLineChart />
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </>
  );
};

export default React.memo(Linechart);
