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
import PopUpItem from "../../highchart/popUpLayout/popUpItem";
import "../../../assets/styles/page/overview/popUpLayout.scss";
const StepOne = () => {
  const dispatch = useDispatch();
  const EnableTitles = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Name"]
  );
  const EnableHorizontal = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Horizontal"]
  );

  const values = {
    "Enable Name": EnableTitles,
    Horizontal: EnableHorizontal,
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
              <PopUpItem type="number" title="UOM Font Size" />
              <PopUpItem type="number" title="Value Font Size" />
              <PopUpItem type="number" title="Header Font Size" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3.5}>
        <Grid container>
          <Grid item xs={12}>
            <List>
              {["Enable Name", "Horizontal"].map((value) => {
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

export default StepOne;
