import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {Button} from "@mui/material";
import Divider from "@mui/material/Divider";
import DatePicker from "@mui/lab/DatePicker";
import TimePicker from "@mui/lab/TimePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import styles from "./batteryAddStyle";

const useStyles = makeStyles(styles);

function BatteryAdd() {
  const classes = useStyles();
  const [value, setValue] = useState(new Date());
  const [companyRef, setCompanyRef] = useState("");
  const [batteryRef, setBatteryRef] = useState("");
  const [fieldRef, setFieldRef] = useState("");
  const [city, setCity] = useState("");

  const handleChangeCompanyRef = (event) => {
    setCompanyRef(event.target.value);
  };

  const handleChangeBatteryRef = (event) => {
    setBatteryRef(event.target.value);
  };

  const handleChangeFieldRef = (event) => {
    setFieldRef(event.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid className={classes.container}>
        <Typography variant="h3">Add battery</Typography>
        <div className={classes.form}>
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.dateTime}>
              <Typography className={classes.subtitle} variant="h6">
                Datetime:
              </Typography>
              <div className={classes.dateInputs}>
                <div className={classes.dateInput}>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textFields}
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </div>
                <div className={classes.timeInput}>
                  <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textFields}
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </div>
                <Typography className={classes.subtitle} variant="h6">
                  Note: You are 8 hours behind server time.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.endDateTime}>
              <Typography className={classes.subtitle} variant="h6">
                End Datetime:
              </Typography>
              <div className={classes.dateInputs}>
                <div className={classes.dateInput}>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textFields}
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </div>
                <div className={classes.timeInput}>
                  <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textFields}
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </div>
                <Typography className={classes.subtitle} variant="h6">
                  Note: You are 8 hours behind server time.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.name}>
              <Typography className={classes.subtitle} variant="h6">
                Name:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.shortName}>
              <Typography className={classes.subtitle} variant="h6">
                Short Name:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.radioButtonsFirst}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Active
                    </Typography>
                  }
                />
                <Divider className={classes.divider} />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Operated
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.accounting}>
              <Typography className={classes.subtitle} variant="h6">
                Accounting ID:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.serial}>
              <Typography className={classes.subtitle} variant="h6">
                Serial ID:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.registry}>
              <Typography className={classes.subtitle} variant="h6">
                Registry ID:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.latitude}>
              <Typography className={classes.subtitle} variant="h6">
                Latitude:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.registry}>
              <Typography className={classes.subtitle} variant="h6">
                Longitude:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.dateTime}>
              <Typography className={classes.subtitle} variant="h6">
                Prod. start:
              </Typography>
              <div className={classes.dateInputs}>
                <div className={classes.dateInput}>
                  <DatePicker
                    disableFuture
                    openTo="year"
                    views={["year", "month", "day"]}
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textFields}
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </div>
                <div className={classes.timeInput}>
                  <TimePicker
                    ampm={false}
                    openTo="hours"
                    views={["hours", "minutes", "seconds"]}
                    inputFormat="HH:mm:ss"
                    mask="__:__:__"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        className={classes.textFields}
                        size="small"
                        variant="outlined"
                        {...params}
                      />
                    )}
                  />
                </div>
                <Typography className={classes.subtitle} variant="h6">
                  Note: You are 8 hours behind server time.
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.companyRef}>
              <Typography className={classes.subtitle} variant="h6">
                Company Ref.
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="company-ref"
                  value={companyRef}
                  label="Company Ref"
                  onChange={handleChangeCompanyRef}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.batteryRef}>
              <Typography className={classes.subtitle} variant="h6">
                Battery Ref.
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="battery-ref"
                  value={batteryRef}
                  label="Battery Ref"
                  onChange={handleChangeBatteryRef}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.fieldRef}>
              <Typography className={classes.subtitle} variant="h6">
                Field Ref.
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="field-ref"
                  value={fieldRef}
                  label="Field Ref"
                  onChange={handleChangeFieldRef}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.code}>
              <Typography className={classes.subtitle} variant="h6">
                Code:
              </Typography>
              <TextField
                className={classes.textFields}
                size="small"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.radioButtonsSecond}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Manual
                    </Typography>
                  }
                />
                <Divider className={classes.divider} />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      SCADA
                    </Typography>
                  }
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid>
            <Grid item className={classes.actionsField}>
              <Button>Save and add another</Button>
              <Button>Save and continue editing</Button>
              <Button>SAVE</Button>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </LocalizationProvider>
  );
}

export default BatteryAdd;
