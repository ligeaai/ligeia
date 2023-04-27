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
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MyNumberTextField } from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";

import ChoseMeasure from "../popUpLayout/choseMeasure";
import PopUpItem from "../popUpLayout/popUpItem";
import { Stops } from "../popUpLayout/stops";
import Measurement from "../popUpLayout/measurement";
const AngularPopUp = ({ handleClose, title, height }) => {
  const dispatch = useDispatch();
  const stops = useSelector(
    (state) => state.overviewDialog.highchartProps["Stops"]
  );
  const Name = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Name"]
  );
  const Measurements = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Measurement"]
  );
  const Unit = useSelector(
    (state) => state.overviewDialog.highchartProps["Show Unit of Measurement"]
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
    "Unit of Measurement": Unit,
    "Tag Name": TagName,
    Timestamp: TimeStamp,
    "Enable Export": EnableExport,
  };
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };

  return (
    <>
      <Grid
        container
        id="draggable-dialog-title"
        className="overview-update-pop-up__box__header"
      >
        <Grid item className="overview-update-pop-up__box__header__id">
          {title}
        </Grid>

        <Grid item>
          <IconButton onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        columnSpacing={2}
        rowGap={2}
        className="overview-update-pop-up__box__body"
      >
        <Grid item xs={12} sm={9}>
          <Grid container rowGap={2}>
            <Grid item xs={12}>
              <Typography className="overview-update-pop-up__box__body__label">
                Properties
              </Typography>
              <Grid container columnSpacing={2} rowGap={2}>
                <PopUpItem type="text" title="Name" nullTrue={true} />
                <PopUpItem type="number" title="Name Font Size(em)" />
                <PopUpItem type="number" title="Widget Refresh (seconds)" />
                <Grid xs={6}></Grid>
                <PopUpItem type="number" title="Tag Name Font Size" />
                <PopUpItem type="number" title="Value Font Size" />
                <PopUpItem type="number" title="Unit Font Size" />
                <PopUpItem type="number" title="Decimal Places" />
                <PopUpItem type="number" title="Time Stamp Font Size" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container columnSpacing={2} rowGap={2}>
                <Grid item xs={12}>
                  <Typography className="overview-update-pop-up__box__body__label">
                    Measurement
                  </Typography>
                  <ChoseMeasure />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Grid container>
            <Grid item xs={12}>
              <List>
                {[
                  "Name",
                  "Tag Name",
                  "Measurement",
                  "Unit of Measurement",
                  "Timestamp",
                  "Enable Export",
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

        <Grid item xs={12}>
          <Grid container columnSpacing={2}>
            <Measurement />
            <Grid item xs={12} sm={6} md={2}>
              <Grid container rowGap={0.5}>
                <Grid item xs={12}>
                  Stops
                </Grid>
                <Grid item xs={12}>
                  <MyNumberTextField
                    defaultValue={stops}
                    handleChangeFunc={(value) => {
                      dispatch(
                        cleanStops("Stops", value, ["Low", "High", "Color"])
                      );
                    }}
                    className="overview-number-text-field"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className="overview-update-pop-up__box__body__label"
            style={{
              display: stops === "0" || stops === "" ? "none" : "flex",
            }}
          >
            Stops
          </Typography>
          <Stops />
        </Grid>
      </Grid>
    </>
  );
};

export default AngularPopUp;
