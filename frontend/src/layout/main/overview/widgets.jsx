import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { instance, config } from "../../../services/couchApi";
import MyHighcharts from "./highchart";
import { deleteChart } from "../../../services/actions/overview/taps";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, MyDialog } from "../../../components";
import UpdatePopUp from "./updatePopup";
import "../../../assets/css/dashboard.css";
const Widgets = React.forwardRef((props, ref) => {
  const { widget, style, className, children, ...rest } = props;
  const dispatch = useDispatch();
  const [highchartProps, setHighChartProps] = React.useState(null);
  const refresh = useSelector((state) => state.tapsOverview.refresh);
  React.useEffect(() => {
    async function myFunc() {
      let res = await instance.get(`/widgets/${widget}`, config);
      setHighChartProps(() => {
        return res.data;
      });
    }
    myFunc();
  }, [refresh]);
  const width = parseInt(style.width, 10);
  const height = parseInt(style.height, 10) - 50;
  if (highchartProps) {
    return (
      <Box
        ref={ref}
        className={`grid-item ${className}`}
        sx={{ ...style, boxShadow: 4 }}
        {...rest}
      >
        <Box
          className="grid-item__title"
          sx={{
            fontSize: "14px",
            "&:hover": {
              cursor: "move",
            },
          }}
        >
          <Grid container sx={{ justifyContent: "space-between" }}>
            <Grid item>
              <IconButton
                onClick={() => {
                  dispatch(deleteChart(widget, highchartProps._rev));
                }}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <MyDialog
                Button={
                  <IconButton>
                    <SettingsIcon />
                  </IconButton>
                }
                DialogBody={UpdatePopUp}
                highchartProps={highchartProps}
                chartId={widget}
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="grid-item__graph">
          <MyHighcharts
            highchartProps={highchartProps}
            width={width}
            height={height}
          ></MyHighcharts>
        </Box>
        {children}
      </Box>
    );
  }
  return (
    <Grid xs={3} height={300} sx={{ boxShadow: 3, m: 1 }}>
      <LoadingComponent />
    </Grid>
  );
});

export default React.memo(Widgets);
