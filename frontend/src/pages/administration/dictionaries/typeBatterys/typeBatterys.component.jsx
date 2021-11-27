import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import {Grid} from "@mui/material";
import {Typography} from "@mui/material";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {gridSpacing} from "../../../../store/constant";
import styles from "./typeBatterysStyle";

const useStyles = makeStyles(styles);

function TypeBatterys() {
  const classes = useStyles();
  return (
      <Grid container={gridSpacing} className={classes.container}>
        <Typography className={classes.typography}>
          Select type battery to change
        </Typography>
        <Link
          style={{textDecoration: "none"}}
          to="/administration/type-batterys/add"
        >
          <Button className={classes.button}>Add type battery</Button>
        </Link>
      </Grid>
  );
}

export default TypeBatterys;
