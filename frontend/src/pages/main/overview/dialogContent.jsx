import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Grid, Box, Button } from "@mui/material";

import { Select, Stepper, InputGenerator } from "../../../components";
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
import BarPopUp from "../../../components/highchart/nivoPopUp/barChart";
import PiePopUp from "../../../components/highchart/nivoPopUp/pieChart";
import HeatMapPopUp from "../../../components/highchart/nivoPopUp/heatMapPopUp";
import MatrixPopUp from "../../../components/highchart/customPopUp/matrixPopUp";
import LinePopUp from "../../../components/highchart/nivoPopUp/lineChart";
import TreeMapPopUp from "../../../components/highchart/nivoPopUp/treeMapChart";
const DialogContent = ({ handleClose }) => {
  const dispatch = useDispatch();
  const selectedItem = useSelector(
    (state) => state.overviewDialog.selectedItem
  );
  const properties = useSelector((state) => state.overviewDialog.values);
  const values = useSelector((state) => state.overviewDialog.selectItems);

  const handleChangeFunc = async (props) => {
    dispatch(await changeSelectValue(props));
  };
  const body = {
    "Linechart [Highchart]": linechartPopUp(),
    "Line Chart [Nivo]": linechartPopUp(),
    "Area Chart [Highchart]": linechartPopUp(),
    "Gauge(Angular) [Highchart]": angularPopUp(),
    "Gauge(Solid) [Highchart]": SolidPopUp(),
    "Measurement [Custom]": measurementPopUp(),
  };

  const bodyTemp = {
    "Bar Chart [Nivo]": (
      <BarPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Pie Chart [Nivo]": (
      <PiePopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Heat Map [Nivo]": (
      <HeatMapPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Matrix [Custom]": (
      <MatrixPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    // "Line Chart [Nivo]": (
    //   <LinePopUp highchartProps={properties} handleClose={handleClose} />
    // ),
    "TreeMap Chart [Nivo]": (
      <TreeMapPopUp highchartProps={properties} handleClose={handleClose} />
    ),
  };
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
            <IconButton onClick={handleClose} color="error">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {body[properties.Type] ? (
        <Box sx={{ p: 1, height: "75vh", overflowY: "auto", width: "9999px" }}>
          <Stepper
            components={body[properties.Type]}
            finishFunc={finishFunc}
          ></Stepper>
        </Box>
      ) : (
        bodyTemp[properties.Type]
      )}

      {body[properties.Type] ? (
        <></>
      ) : (
        <Grid item xs={12}>
          <Grid container sx={{ flexDirection: "row-reverse" }}>
            <Grid item>
              <Button onClick={handleClose} color="error">
                Cancel
              </Button>
              <Button
                onClick={() => {
                  dispatch(saveChart());
                  handleClose();
                }}
                color="success"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default DialogContent;
