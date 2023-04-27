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
import "../../../assets/styles/page/overview/popUpLayout.scss";
const CreateWidget = () => {
  const dispatch = useDispatch();
  const EnableTitles = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Name"]
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
    "Enable Name": EnableTitles,
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
      className="pop-up-layout-font-size"
    >
      <Grid item xs={12} sm={8.5}>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <Grid container columnSpacing={2} rowGap={2}>
              <PopUpItem type="text" title="Name" nullTrue={true} />
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
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3.5}>
        <Grid container>
          <Grid item xs={12}>
            <List>
              {[
                "Enable Name",
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
