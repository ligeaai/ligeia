import React from "react";
import {makeStyles} from "@mui/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import styles from "./batterysStyle";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {gridSpacing} from "../../../../store/constant";

const useStyles = makeStyles(styles);

export default function Batterys() {
  const classes = useStyles();
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid container={gridSpacing} className={classes.container}>
        <Typography className={classes.typography}>
          Select battery to change
        </Typography>
        <Link style={{textDecoration: "none"}} to="/administration/batterys/add">
          <Button className={classes.button}>Add battery</Button>
        </Link>
      </Grid>
    </LocalizationProvider>
  );
}
