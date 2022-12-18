import React from "react";
import Grid from "@mui/material/Grid";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SettingsIcon from "@mui/icons-material/Settings";
import { instance, config } from "../../../services/couchApi";
import MyHighcharts from "./highchart";
import { deleteChart } from "../../../services/actions/overview/taps";
import { useDispatch, useSelector } from "react-redux";
import { LoadingComponent, MyDialog } from "../../../components";
import UpdatePopUp from "./updatePopup";
import { Rnd } from "react-rnd";
import { Resizable } from "re-resizable";
import Draggable from "react-draggable";
import Highcharts from "highcharts";

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const Widgets = ({ widget, key }) => {
  const dispatch = useDispatch();
  const [highchartProps, setHighChartProps] = React.useState(null);
  const [dragEnable, setDragEnable] = React.useState(false);
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
  function reflowChart() {
    for (var i = 0; i < Highcharts.charts.length; i++) {
      if (Highcharts.charts[i] !== undefined) {
        Highcharts.charts[i].reflow();
      }
    }
  }
  reflowChart();
  if (highchartProps)
    return (
      // <Rnd
      //   style={style}
      //   default={{
      //     x: 0,
      //     y: 0,
      //     width: 320,
      //     height: 200,
      //   }}
      // >
      //<Draggable>
      <Draggable disabled={dragEnable}>
        <Resizable
          defaultSize={{
            width: "30%",
            height: 300,
            backgroundColor: "red",
          }}
          lockAspectRatio={true}
          onResizeStart={(e) => {
            e.stopPropagation();
            setDragEnable(true);
          }}
          onResizeStop={() => {
            reflowChart();
            setDragEnable(false);
          }}
        >
          <Grid item sx={{ boxShadow: 3, m: 1, height: "100%" }}>
            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Grid item xs={12}>
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
                      DialogBody={
                        <UpdatePopUp
                          highchartProps={highchartProps}
                          chartId={widget}
                        />
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} height={200}>
                <MyHighcharts highchartProps={highchartProps}></MyHighcharts>
              </Grid>
            </Grid>
          </Grid>
        </Resizable>
      </Draggable>
      //</Draggable>
      // </Rnd>
    );
  return (
    <Grid xs={3} height={300} sx={{ boxShadow: 3, m: 1 }}>
      <LoadingComponent />
    </Grid>
  );
};

export default Widgets;
