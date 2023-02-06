import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
} from "@mui/material";

import { changeValeus } from "../../../services/actions/overview/overviewDialog";
import PopUpItem from "./popUpItem";

const CreateWidget = () => {
  const dispatch = useDispatch();
  const EnableXaxisReset = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable X-Axis Reset"]
  );
  const EnableHeaderButtons = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Header Buttons"]
  );
  const EnableTitles = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Title"]
  );
  const EnableNavbar = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Navbar"]
  );
  const EnableExport = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Export"]
  );
  const EnableRangeSelector = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Range Selector"]
  );
  const EnableGraphLegend = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Graph Legend"]
  );

  const values = {
    "Enable X-Axis Reset": EnableXaxisReset,
    "Enable Header Buttons": EnableHeaderButtons,
    "Enable Title": EnableTitles,
    "Enable Navbar": EnableNavbar,
    "Enable Export": EnableExport,
    "Enable Range Selector": EnableRangeSelector,
    "Enable Graph Legend": EnableGraphLegend,
  };
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <Grid
      container
      columnSpacing={2}
      rowGap={2}
      sx={{ div: { fontSize: "14px" } }}
    >
      <Grid item xs={12} sm={8.5}>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <Grid container columnSpacing={2} rowGap={2}>
              <PopUpItem type="text" title="Name" />
              <PopUpItem type="number" title="Name Font Size(em)" />
              <PopUpItem type="number" title="Widget Refresh (seconds)" />
              <PopUpItem type="number" title="X-Axis Duration (minutes)" />
              <PopUpItem
                type="number"
                title="Graph Axis Value Font Size (em)"
              />
              <PopUpItem
                type="number"
                title="Graph Axis Title Font Size (em)"
              />
              <PopUpItem type="number" title="Graph Legend Font Size (em)" />
              <PopUpItem type="number" title="Graph Title Font Size (em)" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3.5}>
        <Grid container>
          <Grid item xs={12}>
            <List sx={{ width: "100%", bgcolor: "inherit" }}>
              {[
                "Enable X-Axis Reset",
                "Enable Header Buttons",
                "Enable Title",
                "Enable Navbar",
                "Enable Export",
                "Enable Range Selector",
                "Enable Graph Legend",
              ].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                  <ListItem key={value} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={() => {
                        handleChangeFunc(`Show ${value}`, !values[value]);
                      }}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={
                            value === "Name" ? !values[value] : values[value]
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CreateWidget;
