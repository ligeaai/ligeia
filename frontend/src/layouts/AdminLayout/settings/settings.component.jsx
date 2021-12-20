import React, {Fragment} from "react";
import {makeStyles} from "@mui/styles";
import {Typography} from "@mui/material";
import styles from "./settingsStyle";
import CompanyEdit from "../../../pages/administration/models/companys/companyEdit/companyEdit.component";
import {Outlet} from "react-router-dom";

const useStyles = makeStyles(styles);

function Settings() {
  const classes = useStyles();
  return <div className={classes.settingsContainer}>settings</div>;
}

export default Settings;
