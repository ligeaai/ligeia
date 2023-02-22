import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { instance, config } from "../../../services/couchApi";
import { deleteChart } from "../../../services/actions/overview/taps";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, MyDialog } from "../../../components";
import MyHighchart from "./highchart";
import UpdatePopUp from "./updatePopup";
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
      let res = await instance.get(`/widgets/${widget}`, config);
      setHighChartProps(() => {
        return res.data;
      });
      setBoxHeight(
        res.data["Name Font Size(em)"] === ""
          ? 50
          : res.data["Name Font Size(em)"] > 50 / 1.5
          ? res.data["Name Font Size(em)"] * 1.5 + 4
          : 50
      );
    }

    myFunc();
  }, [refresh, refres]);
  console.log(boxHeight);
  const width = parseInt(style.width, 10);
  const height = parseInt(style.height, 10) - boxHeight;

  if (highchartProps) {
    return (
      <Box
        ref={ref}
        key={`${widget}`}
        className={`${myclass} ${className}`}
        style={{ ...style }}
        sx={{
          boxShadow: 4,
          borderRadius: "5px",
          color: "text.primary",
          backgroundColor: "background.success",
          overflow: "hidden",
        }}
        {...rest}
      >
        <Box
          id={widget}
          className="grid-item__title"
          sx={{
            fontSize: "14px",
            "&:hover": {
              cursor: "move",
            },
          }}
          onClick={() => {
            setMyClass("react-draggable-dragging");
          }}
          onMouseUp={() => {
            setMyClass("");
          }}
        >
          <Grid
            container
            sx={{
              justifyContent: "space-between",
              p: 0.5,
              alignItems:
                highchartProps["Name Font Size(em)"] !== ""
                  ? highchartProps["Name Font Size(em)"] > 24
                    ? ""
                    : "center"
                  : "center",
            }}
          >
            <Grid item>
              <Grid container sx={{ alignItems: "center" }}>
                <Grid item>
                  <IconButton
                    onClick={() => {
                      dispatch(deleteChart(widget, highchartProps._rev));
                    }}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  sx={{
                    ml: 0.5,
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
              />
            </Grid>
          </Grid>
        </Box>
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
      className={`grid-item ${className}`}
      sx={{
        ...style,
        boxShadow: 4,
        borderRadius: "5px",
        color: "text.primary",
        backgroundColor: "background.success",
      }}
      {...rest}
    >
      <LoadingComponent />
    </Box>
  );
});

export default React.memo(Widgets);
