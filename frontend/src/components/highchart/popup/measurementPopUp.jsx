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

import { MyNumberTextField } from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";

import ChoseMeasure from "../popUpLayout/choseMeasure";
import { Stops } from "../popUpLayout/stops";
import Measurement from "../popUpLayout/measurement";
import PopUpItem from "../popUpLayout/popUpItem";
const MeasurementPopUp = (props) => {
  const dispatch = useDispatch();
  const { highchartProps } = props;

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

  const values = {
    Name: Name,
    Measurement: Measurements,
    Unit: Unit,
    "Tag Name": TagName,
    Timestamp: TimeStamp,
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
              <PopUpItem type="text" title="Name" />
              <PopUpItem type="number" title="Name Font Size(em)" />
              <PopUpItem type="number" title="Widget Refresh (seconds)" />
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container columnSpacing={2} rowGap={2}>
              <Grid item xs={12}>
                <ChoseMeasure />
              </Grid>
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
              {["Name", "Measurement", "Unit", "Timestamp", "Tag Name"].map(
                (value) => {
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
                }
              )}
            </List>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container rowGap={2} columnSpacing={2}>
          <Measurement />
          <Grid item xs={12} sm={6} md={2}>
            <Grid container rowGap={0.5}>
              <Grid item xs={12}>
                Stops
              </Grid>
              <Grid item xs={12}>
                <MyNumberTextField
                  defaultValue={highchartProps["Stops"]}
                  handleChangeFunc={(value) => {
                    dispatch(
                      cleanStops("Stops", value, ["Low", "High", "Color"])
                    );
                  }}
                  sx={{
                    fontSize: "14px",
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                      paddingTop: "4px",
                      paddingBottom: "4px",
                      paddingRight: "2px",
                    },
                    width: 75,
                    minWidth: 75,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Stops />
      </Grid>
    </Grid>
  );
};

export default MeasurementPopUp;
