import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IconButton, Grid, Box } from "@mui/material";

import { Select, Stepper, LoadingComponent } from "../../../components";
import CloseIcon from "@mui/icons-material/Close";
import { changeSelectValue } from "../../../services/actions/overview/overviewDialog";
import {
  loadSelectItems,
  fillProperties,
} from "../../../services/actions/overview/overviewDialog";
import { saveNewChart } from "../../../services/actions/overview/overviewDialog";
import linechartPopUp from "../../../components/highchart/newPopUp/lineChartHc";
import angularPopUp from "../../../components/highchart/newPopUp/angularHc";
import SolidPopUp from "../../../components/highchart/newPopUp/solidHc";
import measurementPopUp from "../../../components/highchart/newPopUp/measurementCustom";

const DialogContent = ({ handleClose, height }) => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = React.useState(false);
  const selectedItem = useSelector(
    (state) => state.overviewDialog.selectedItem
  );
  const type = useSelector((state) => state.overviewDialog.values.Type);
  const values = useSelector((state) => state.overviewDialog.selectItems);
  const [widgetType, setWidgetType] = React.useState("Widgets");
  const body = {
    "Line Chart [Highchart]": linechartPopUp,
    "Line Chart [Nivo]": linechartPopUp,
    "Area Chart [Highchart]": linechartPopUp,
    "Gauge(Angular) [Highchart]": angularPopUp,
    "Bar Chart [Highchart]": linechartPopUp,
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
      dispatch(await fillProperties("Area Chart [Highchart]"));
    }
    myFunc();
  }, []);
  function finishFunc() {
    dispatch(saveNewChart());
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
            <Grid container columnSpacing={2}>
              <Grid item>
                <Select
                  values={["Widgets", "Forms"]}
                  handleChangeFunc={(val) => {
                    setWidgetType(val);
                  }}
                  defaultValue={widgetType}
                />
              </Grid>
              <Grid item>
                <Select
                  values={widgetType === "Widgets" ? values : [" "]}
                  handleChangeFunc={handleChangeFunc}
                  defaultValue={widgetType === "Widgets" ? selectedItem : " "}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <IconButton onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
      {widgetType === "Widgets" ? (
        <Box sx={{ width: "99999px" }}>
          {refresh ? (
            <Stepper
              components={body[type]}
              finishFunc={finishFunc}
              height={height}
            ></Stepper>
          ) : (
            <Box sx={{ height: "450px" }}>
              <LoadingComponent />
            </Box>
          )}
        </Box>
      ) : (
        <Box sx={{ width: "400px", height: "400px" }} />
      )}
    </Grid>
  );
};

export default DialogContent;
