import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { deleteChart } from "../../../services/actions/overview/taps";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, MyDialog } from "../../../components";
import MyHighchart from "./highchart";
import UpdatePopUp from "./updatePopup";
import Overview from "../../../services/api/overview";
import "../../../assets/styles/page/overview/widget.scss";
const Widgets = React.forwardRef((props, ref) => {
  const { widget, style, className, children, ...rest } = props;
  const [myclass, setMyClass] = React.useState("");
  const [liveData, setLiveData] = React.useState(true);
  const [tabular, setTabular] = React.useState(false);
  const [backfill, setbackfill] = React.useState(false);
  const dispatch = useDispatch();
  const [highchartProps, setHighChartProps] = React.useState(null);
  const refresh = useSelector((state) => state.tapsOverview.refresh);
  const [refres, setRefres] = React.useState(false);
  const [boxHeight, setBoxHeight] = React.useState(50);
  React.useEffect(() => {
    async function myFunc() {
      const body = JSON.stringify({ WIDGET_ID: widget });
      let res = await Overview.getWidget(body);
      setHighChartProps(() => {
        return res.data;
      });
      setBoxHeight(
        res.data["Show Enable Name"] || !res.data["Show Name"]
          ? res.data["Name Font Size(em)"] === ""
            ? 50
            : res.data["Name Font Size(em)"] > 50 / 1.5
            ? res.data["Name Font Size(em)"] * 1.5 + 4
            : 50
          : 50
      );
    }

    myFunc();
  }, [refresh, refres]);
  const width = parseInt(style.width, 10);
  const height = parseInt(style.height, 10) - boxHeight;

  if (highchartProps) {
    return (
      <Box
        ref={ref}
        key={`${widget}`}
        className={`${myclass} ${className} overview-widget-box`}
        style={{ ...style }}
        {...rest}
      >
        <Grid
          container
          id={widget}
          className={`grid-item__title overview-widget-box__header  ${
            highchartProps["Name Font Size(em)"] !== ""
              ? highchartProps["Name Font Size(em)"] > 24
                ? ""
                : "grid-item__title overview-widget-box__header__align"
              : "grid-item__title overview-widget-box__header__align"
          }`}
          onClick={() => {
            setMyClass("react-draggable-dragging");
          }}
          onMouseUp={() => {
            setMyClass("");
          }}
        >
          <Grid item>
            <Grid container columnSpacing={0.5} flexWrap="nowrap">
              <Grid item>
                <IconButton
                  onClick={() => {
                    dispatch(deleteChart(widget));
                  }}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Grid>
              <Grid
                item
                className="grid-item__title overview-widget-box__header__left-box"
                sx={{
                  display:
                    (highchartProps.Type === "Line Chart [Highchart]" ||
                      highchartProps.Type === "Line Chart [Nivo]") &&
                    highchartProps["Show Enable Name"]
                      ? "inline-block"
                      : "none",
                  fontSize:
                    highchartProps["Name Font Size(em)"] !== ""
                      ? `${highchartProps["Name Font Size(em)"]}px`
                      : "14px",
                }}
              >
                {highchartProps.Name}
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            sx={{
              display:
                highchartProps.Type === "Line Chart [Highchart]" ||
                highchartProps.Type === "Line Chart [Nivo]" ||
                highchartProps["Show Name"]
                  ? "none"
                  : "flex",
              fontSize:
                highchartProps["Name Font Size(em)"] !== ""
                  ? `${highchartProps["Name Font Size(em)"]}px`
                  : "14px",
            }}
          >
            {highchartProps.Name}
          </Grid>
          <Grid
            item
            sx={{
              display:
                highchartProps.Type === "Line Chart [Highchart]" ||
                highchartProps.Type === "Line Chart [Nivo]"
                  ? "flex"
                  : "none",
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  color="error"
                  size="small"
                  checked={tabular}
                  onChange={() => {
                    setTabular((prev) => {
                      return !prev;
                    });
                  }}
                />
              }
              label="Tabular"
            />
            <FormControlLabel
              control={
                <Switch
                  color="error"
                  size="small"
                  checked={liveData}
                  onChange={() => {
                    setLiveData((prev) => {
                      setbackfill(prev);
                      return !prev;
                    });
                  }}
                />
              }
              label="Live"
            />
            <FormControlLabel
              control={
                <Switch
                  color="error"
                  size="small"
                  checked={backfill}
                  onChange={() => {
                    setbackfill((prev) => {
                      setLiveData(prev);
                      return !prev;
                    });
                  }}
                />
              }
              label="Backfill"
            />
          </Grid>
          <Grid
            item
            className="cancelDrag"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <MyDialog
              Button={
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              }
              DialogBody={UpdatePopUp}
              refresh={() => {
                setRefres((prev) => !prev);
              }}
              highchartProps={highchartProps}
              chartId={widget}
              defaultWH={[700, 500]}
            />
          </Grid>
        </Grid>
        <Box className="grid-item__graph">
          <MyHighchart
            highchartProps={highchartProps}
            width={width}
            height={height}
            liveData={liveData}
            backfillData={backfill}
            tabular={tabular}
          ></MyHighchart>
        </Box>
        {children}
      </Box>
    );
  }
  return (
    <Box
      ref={ref}
      className={`grid-item ${className} overview-widget-box-loading`}
      style={{ ...style }}
      {...rest}
    >
      <LoadingComponent />
    </Box>
  );
});

export default React.memo(Widgets);
