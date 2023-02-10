import React, { Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Grid, Box, Button } from "@mui/material";

import { Route, Routes, Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import {
  Select,
  Stepper,
  InputGenerator,
  LoadingComponent,
} from "../../../components";
import CloseIcon from "@mui/icons-material/Close";
import {
  changeSelectValue,
  changeValeus,
} from "../../../services/actions/overview/overviewDialog";
import {
  loadSelectItems,
  fillProperties,
} from "../../../services/actions/overview/overviewDialog";
import { saveChart } from "../../../services/actions/overview/overviewDialog";
import TagService from "../../../services/api/tags";
import linechartPopUp from "../../../components/highchart/newPopUp/lineChartHc";
import angularPopUp from "../../../components/highchart/newPopUp/angularHc";
import SolidPopUp from "../../../components/highchart/newPopUp/solidHc";
import measurementPopUp from "../../../components/highchart/newPopUp/measurementCustom";

const DialogContent = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = React.useState(false);
  const selectedItem = useSelector(
    (state) => state.overviewDialog.selectedItem
  );
  const type = useSelector((state) => state.overviewDialog.values.Type);
  const values = useSelector((state) => state.overviewDialog.selectItems);
  const body = {
    "Linechart [Highchart]": linechartPopUp,
    "Line Chart [Nivo]": linechartPopUp,
    "Area Chart [Highchart]": linechartPopUp,
    "Gauge(Angular) [Highchart]": angularPopUp,
    "Gauge(Solid) [Highchart]": SolidPopUp,
    "Measurement [Custom]": measurementPopUp,
    "Bar Chart [Nivo]": measurementPopUp,
    "Pie Chart [Nivo]": measurementPopUp,
    "Heat Map [Nivo]": measurementPopUp,
    "Matrix [Custom]": measurementPopUp,
    "TreeMap Chart [Nivo]": measurementPopUp,
  };
  const handleChangeFunc = async (props) => {
    dispatch(await changeSelectValue(props));
  };
  React.useEffect(() => {
    setRefresh(false);

    setTimeout(() => {
      setRefresh(true);
    }, 400);
  }, [type]);
  React.useEffect(() => {
    async function myFunc() {
      await dispatch(await loadSelectItems());
      dispatch(await fillProperties("Gauge(Angular) [Highchart]"));
    }
    myFunc();
  }, []);
  function finishFunc() {
    dispatch(saveChart());
    handleClose();
  }
  return (
    <Grid container sx={{ width: "100%" }}>
      <Box
        id="draggable-dialog-title"
        sx={{
          cursor: "all-scroll",
          backgroundColor: "background.main",
          width: "100%",
          position: "absolute",
          height: "44px",
          top: 0,
          left: 0,
        }}
      ></Box>

      <Grid
        item
        xs={12}
        sx={{
          p: 0.5,
          pl: 1,
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Grid item>
            <Select
              values={values}
              handleChangeFunc={handleChangeFunc}
              defaultValue={selectedItem}
            />
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ p: 1, height: "75vh", overflowY: "auto", width: "9999px" }}>
        {refresh ? (
          <Stepper components={body[type]} finishFunc={finishFunc}></Stepper>
        ) : (
          <LoadingComponent />
        )}
      </Box>
    </Grid>
  );
};

export default DialogContent;
