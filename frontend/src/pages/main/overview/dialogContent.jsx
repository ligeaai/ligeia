import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Box } from "@mui/material";

import { Select, InputGenerator } from "../../../components";
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
import LinechartPopUp from "../../../components/highchart/popup/lineChartPopUp";
import AngularPopUp from "../../../components/highchart/popup/angularPopUp";
import SolidPopUp from "../../../components/highchart/popup/solidPopUp";
import MeasurementPopUp from "../../../components/highchart/popup/measurementPopUp";
import BarPopUp from "../../../components/highchart/nivoPopUp/barChart";
import PiePopUp from "../../../components/highchart/nivoPopUp/pieChart";
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
    "Linechart [Highchart]": (
      <LinechartPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Gauge(Angular) [Highchart]": (
      <AngularPopUp highchartProps={properties} handleClose={handleClose} />
    ),

    "Gauge(Solid) [Highchart]": (
      <SolidPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Measurement [Custom]": (
      <MeasurementPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Bar Chart [Nivo]": (
      <BarPopUp highchartProps={properties} handleClose={handleClose} />
    ),
    "Pie Chart [Nivo]": (
      <PiePopUp highchartProps={properties} handleClose={handleClose} />
    ),
  };
  React.useEffect(() => {
    async function myFunc() {
      await dispatch(await loadSelectItems());
      dispatch(await fillProperties("Gauge(Angular) [Highchart]"));
    }
    myFunc();
  }, []);
  return (
    <Grid container sx={{ p: 1, width: "100%" }}>
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
        sx={{
          mb: 1,
        }}
      >
        <Select
          values={values}
          handleChangeFunc={handleChangeFunc}
          defaultValue={selectedItem}
        />
      </Grid>

      {body[properties.Type]}

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
    </Grid>
  );
};

export default DialogContent;
