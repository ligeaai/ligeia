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
  const Name = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Name"]
  );
  const Measurements = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Measurement"]
  );
  const Unit = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Unit"]
  );

  const TagName = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Tag Name"]
  );
  const TimeStamp = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Timestamp"]
  );
  const EnableExport = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Enable Export"]
  );

  const values = {
    Name: Name,
    Measurement: Measurements,
    Unit: Unit,
    "Tag Name": TagName,
    Timestamp: TimeStamp,
    "Enable Export": EnableExport,
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
      <Grid item xs={12} sm={9}>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
            <Grid container columnSpacing={2} rowGap={2}>
              <PopUpItem type="text" title="Name" nullTrue={true} />
              <PopUpItem type="number" title="Name Font Size(em)" />
              <PopUpItem type="number" title="Widget Refresh (seconds)" />
              <PopUpItem type="number" title="Value Font Size" />
              <PopUpItem type="number" title="Unit Font Size" />
              <PopUpItem type="number" title="Tag Name Font Size" />
              <PopUpItem type="number" title="Time Stamp Font Size" />
              <PopUpItem type="number" title="Decimal Places" />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Grid container>
          <Grid item xs={12}>
            <List sx={{ width: "100%", bgcolor: "inherit" }}>
              {[
                "Name",
                "Measurement",
                "Unit",
                "Enable Export",
                "Timestamp",
                "Tag Name",
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
