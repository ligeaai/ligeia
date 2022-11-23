import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";

import { Select } from "../../../../components";

const useStyles = makeStyles((theme) => {
  console.log(theme);
  return {
    box: {
      boxShadow: theme.shadows[1],
      padding: "8px",
      borderRadius: "3px",
      margin: "8px",
    },
    selectBox: {
      alignItems: "center",
    },
    label: {
      width: "180px",
    },
    textfield: {
      fontSize: "14px",
      "& .MuiOutlinedInput-input": { paddingTop: "4px", paddingBottom: "4px" },
      width: 120,
    },
  };
});
const PropertiesEditor = () => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={classes.box}>
        <Grid container>
          <Grid item xs={12} sx={{ fontWeight: "bold" }}>
            Transform Information
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Target Item ID
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Transaction type
              </Grid>
              <Grid item>
                <Select />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Transaction property
              </Grid>
              <Grid item>
                <Select />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Default key value 1
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Default key value 2
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Default key value 3
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Name
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Transaction type
              </Grid>
              <Grid item>
                <Select />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Time Offset
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container className={classes.selectBox}>
              <Grid item className={classes.label}>
                Event agregation interval
              </Grid>
              <Grid item>
                <TextField variant="outlined" className={classes.textfield} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.box}>
        asd
      </Grid>
    </Grid>
  );
};

export default PropertiesEditor;
