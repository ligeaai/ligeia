import React from "react";
import {makeStyles} from "@mui/styles";

import { Typography} from "@mui/material";
import styles from "./dashboardStyle";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Typography></Typography>
    </div>
  );
}
