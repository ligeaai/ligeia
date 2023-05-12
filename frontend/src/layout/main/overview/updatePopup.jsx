import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, Box, Typography } from "@mui/material";

import { LoadingComponent } from "../../../components";
import {
  changeSelectValue,
  changeValeus,
} from "../../../services/actions/overview/overviewDialog";
import {
  loadSelectItems,
  updateChart,
} from "../../../services/actions/overview/overviewDialog";
import LinechartPopUp from "../../../components/highchart/popup/lineChartPopUp";
import AngularPopUp from "../../../components/highchart/popup/angularPopUp";
import SolidPopUp from "../../../components/highchart/popup/solidPopUp";
import MeasurementPopUp from "../../../components/highchart/popup/measurementPopUp";
import "../../../assets/styles/page/overview/updateContainer.scss";
const DialogContent = ({ highchartProps, chartId, refresh, ...rest }) => {
  const dispatch = useDispatch();
  const type = useSelector((state) => state.overviewDialog.values.Type);

  const body = {
    "Line Chart [Highchart]": (
      <LinechartPopUp title={"Linechart [Highchart]"} {...rest} />
    ),
    "Area Chart [Highchart]": (
      <LinechartPopUp title={"Area Chart [Highchart]"} {...rest} />
    ),
    "Gauge(Angular) [Highchart]": (
      <AngularPopUp title={"Gauge(Angular) [Highchart]"} {...rest} />
    ),
    "Bar Chart [Highchart]": (
      <LinechartPopUp title={"Bar Chart [Highchart]"} {...rest} />
    ),
    "Gauge(Solid) [Highchart]": (
      <SolidPopUp title={"Gauge(Solid) [Highchart]"} {...rest} />
    ),
    "Measurement [Custom]": (
      <MeasurementPopUp title={"Measurement [Custom]"} {...rest} />
    ),
    "Bar Chart [Nivo]": <AngularPopUp title={"Bar Chart [Nivo]"} {...rest} />,
    "Pie Chart [Nivo]": <AngularPopUp title={"Pie Chart [Nivo]"} {...rest} />,
    "Heat Map [Nivo]": <AngularPopUp title={"Heat Map [Nivo]"} {...rest} />,
    "Matrix [Custom]": <LinechartPopUp title={"Matrix [Custom]"} {...rest} />,
    "Line Chart [Nivo]": (
      <LinechartPopUp title={"Line Chart [Nivo]"} {...rest} />
    ),
    "TreeMap Chart [Nivo]": (
      <AngularPopUp title={"TreeMap Chart [Nivo]"} {...rest} />
    ),
  };
  React.useEffect(() => {
    async function myFunc() {
      dispatch(await loadSelectItems());
      await dispatch(await changeSelectValue(highchartProps.Type));
      Object.keys(highchartProps).map((e) => {
        dispatch(changeValeus(e, highchartProps[e]));
      });
    }
    myFunc();
  }, []);
  return (
    <Grid container className="overview-update-pop-up">
      <Grid item xs={12} className="overview-update-pop-up__box">
        {type === highchartProps.Type ? (
          body[highchartProps.Type]
        ) : (
          <LoadingComponent />
        )}
      </Grid>

      <Grid
        container
        columnSpacing={0.5}
        className="overview-update-pop-up__footer"
      >
        <Grid item>
          <Button
            color="inherit"
            onClick={() => {
              rest.handleClose();
            }}
            variant="outlined"
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(updateChart(chartId, refresh));
              rest.handleClose();
            }}
            variant="outlined"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default React.memo(DialogContent);
