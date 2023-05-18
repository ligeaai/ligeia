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
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MyNumberTextField, ColorTextfield } from "../..";
import {
  changeValeus,
  cleanStops,
} from "../../../services/actions/overview/overviewDialog";

import ChoseMeasure from "../popUpLayout/choseMeasure";
import PopUpItem from "../popUpLayout/popUpItem";
import Measurement from "../popUpLayout/measurement";
const Stops = () => {
  const dispatch = useDispatch();
  const highchartProps = useSelector(
    (state) => state.overviewDialog.highchartProps
  );
  var loop = [];
  for (let i = 0; i < highchartProps.Stops; i++) {
    loop.push(i);
  }
  const handleChangeFunc = (key, val) => {
    dispatch(changeValeus(key, val));
  };
  return (
    <React.Fragment>
      <Grid container rowGap={2}>
        {loop.map((e, i) => {
          return (
            <Grid container columnSpacing={2} key={i}>
              <Grid item xs={12} sm={6} md={3}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    {`[${e}] Stops`}
                  </Grid>
                  <Grid item xs={12}>
                    <MyNumberTextField
                      defaultValue={highchartProps[`[${e}] Stops`]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc(`[${e}] Stops`, value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                <Grid container rowGap={0.5}>
                  <Grid item xs={12}>
                    {`[${e}] Color`}
                  </Grid>
                  <Grid item xs={12}>
                    <ColorTextfield
                      defaultValue={highchartProps[`[${e}] Color`]}
                      handleChangeFunc={(value) => {
                        handleChangeFunc(`[${e}] Color`, value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

const SolidPopUp = ({ handleClose, title }) => {
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
              <Grid container columnSpacing={2} rowGap={2}>
                <Grid item xs={12}>
                  <Typography>Properties</Typography>
                </Grid>
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
          <Grid item>
            <Typography
              style={{
                padding: "16px 0",
                display: stops === "0" || stops === "" ? "none" : "flex",
              }}
            >
              Stops
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stops />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SolidPopUp;
