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
import "../../../assets/styles/page/overview/createPopUp.scss";
const DialogContent = ({ handleClose }) => {
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
    <Box className="overview-create-pop-up">
      <Box
        id="draggable-dialog-title"
        className="overview-create-pop-up__drag"
      ></Box>
      <Grid className="overview-create-pop-up__header" container>
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
      {widgetType === "Widgets" ? (
        refresh ? (
          <Box className="overview-create-pop-up__stepper-box">
            <Stepper components={body[type]} finishFunc={finishFunc} />
          </Box>
        ) : (
          <Box className="overview-create-pop-up__loading-box">
            <LoadingComponent />
          </Box>
        )
      ) : (
        <Box className="overview-create-pop-up__emty-box" />
      )}
    </Box>
  );
};

export default DialogContent;
