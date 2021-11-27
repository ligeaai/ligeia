import {useState} from "react";
import {Grid, Typography} from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
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
import {makeStyles} from "@mui/styles";
import styles from "./companyAddStyle";

const useStyles = makeStyles(styles);

function CompanyAdd() {
  const [value, setValue] = useState(new Date());
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [subRegion, setSubRegion] = useState("");
  const [city, setCity] = useState("");

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };

  const handleChangeSubRegion = (event) => {
    setSubRegion(event.target.value);
  };

  const handleChangeCity = (event) => {
    setCity(event.target.value);
  };

  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid className={classes.container}>
        <Typography variant="h3">Add company</Typography>
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
            <Grid item className={classes.parentCompany}>
              <Typography className={classes.subtitle} variant="h6">
                Parent Company:
              </Typography>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.country}>
              <Typography className={classes.subtitle} variant="h6">
                Country:
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="country"
                  value={country}
                  label="Country"
                  onChange={handleChangeCountry}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.region}>
              <Typography className={classes.subtitle} variant="h6">
                Region:
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="region"
                  value={region}
                  label="Region"
                  onChange={handleChangeRegion}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.subRegion}>
              <Typography className={classes.subtitle} variant="h6">
                Sub-Region:
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="sub-region"
                  value={subRegion}
                  label="Sub-Region"
                  onChange={handleChangeSubRegion}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.city}>
              <Typography className={classes.subtitle} variant="h6">
                City:
              </Typography>
              <FormControl size="small" className={classes.controlForms}>
                <Select
                  id="city"
                  value={city}
                  label="City"
                  onChange={handleChangeCity}
                ></Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className={classes.divider} />
          <Grid container direction="row" alignItems="center">
            <Grid item className={classes.contactName}>
              <Typography className={classes.subtitle} variant="h6">
                Contact Name:
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
            <Grid item className={classes.address}>
              <Typography className={classes.subtitle} variant="h6">
                Address:
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
            <Grid item className={classes.email}>
              <Typography className={classes.subtitle} variant="h6">
                E-mail:
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
            <Grid item className={classes.phone}>
              <Typography className={classes.subtitle} variant="h6">
                Phone:
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
                      Operator
                    </Typography>
                  }
                />
                <Divider className={classes.divider} />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Owner
                    </Typography>
                  }
                />
                <Divider className={classes.divider} />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Purchaser
                    </Typography>
                  }
                />
                <Divider className={classes.divider} />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Transporter
                    </Typography>
                  }
                />
                <Divider className={classes.divider} />
                <FormControlLabel
                  control={<Checkbox size="small" />}
                  label={
                    <Typography className={classes.subtitle} variant="h6">
                      Service Provider
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

export default CompanyAdd;
