import React from "react";
import {Grid} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";
import {gridSpacing} from "../../../../store/constant";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import styles from "./fieldsStyle";

const useStyles = makeStyles(styles);

export default function Fields() {
  const classes = useStyles();
  return (
    <Grid container={gridSpacing} className={classes.container}>
      <Typography className={classes.typography}>
        Select field to change
      </Typography>
      <Link style={{textDecoration: "none"}} to="/administration/fields/add">
        <Button className={classes.button}>Add field</Button>
      </Link>
    </Grid>
  );
}
