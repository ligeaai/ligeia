import React from "react";
import { useDispatch } from "react-redux";
import { Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  MainBox,
} from "../../../../components";
import DiagnosticEditor from "./diagnosticEditor";

import {
  loadDiagnostic,
  cleanDiagnostic,
} from "../../../../services/actions/diagnostic/diagnostic";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
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
    <MainBox>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          <Breadcrumb />
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ height: "calc(100% - 48px)" }}>
            <DiagnosticEditor />
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Main;
