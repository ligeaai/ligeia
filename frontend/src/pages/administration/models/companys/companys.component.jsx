<<<<<<< HEAD
import {makeStyles} from "@mui/styles";
import styles from "./companysStyles";

import CompanyList from "./companyList/companyList.component";
import CompanyEdit from "./companyEdit/companyEdit.component";
import Settings from "../../../../layouts/AdminLayout/settings/settings.component";
import CompanySettings from "./companySettings/companySettings.component";
import {Grid} from "@mui/material";
import React from "react";
const useStyles = makeStyles(styles);

export default function Companys() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <CompanyList />

        <CompanySettings />
      </Grid>
    </React.Fragment>
  );
}
=======
import {makeStyles} from "@mui/styles";
import styles from "./companysStyles";

import CompanyList from "./companyList/companyList.component";

const useStyles = makeStyles(styles);

export default function Companys() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.table}>
        <CompanyList />
      </div>
    </div>
  );
}
>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
