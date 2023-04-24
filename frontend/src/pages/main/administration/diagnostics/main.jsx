import React from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  ComponentError,
} from "../../../../components";
import DiagnosticEditor from "./diagnosticEditor";

import {
  loadDiagnostic,
  cleanDiagnostic,
} from "../../../../services/actions/diagnostic/diagnostic";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/page/administration/diagnostic/diagnostic.scss";
const Main = () => {
  document.title = "Ligeia.ai | Diagnostics";
  selectDrawerItem("Diagnostics");
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadDiagnostic());
    return () => {
      dispatch(cleanDiagnostic());
    };
  }, []);

  return (
    <Grid container className="diagnostic-container">
      <Breadcrumb />
      <ItemSperatorLineXL />
      <Grid item xs={12} className="diagnostic-container__body">
        <ComponentError errMsg="Error">
          <DiagnosticEditor />
        </ComponentError>
      </Grid>
    </Grid>
  );
};

export default Main;
