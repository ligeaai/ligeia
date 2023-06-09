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
const CreateWidget = ({ enableExport = true }) => {
  const dispatch = useDispatch();
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
    (state) => state.overviewDialog.highchartProps?.["Show Enable Export"]
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
    <Grid
      container
      columnSpacing={2}
      rowGap={2}
      className="pop-up-layout-font-size"
    >
      <Grid item xs={12} sm={9}>
        <Grid container rowGap={2}>
          <Grid item xs={12}>
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
                enableExport && "Enable Export",
              ].map((value) => {
                const labelId = `checkbox-list-label-${value}`;
                return (
                  value && (
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
                  )
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
