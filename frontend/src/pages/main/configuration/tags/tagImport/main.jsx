import React from "react";
import { useDispatch } from "react-redux";

import { Grid } from "@mui/material";

import { Breadcrumb, ItemSperatorLineXL } from "../../../../../components";

import { selectDrawerItem } from "../../../../../services/actions/drawerMenu/drawerMenu";
import Body from "./body";
import ActionMenu from "./actionMenu";
import { closeWebSocket } from "../../../../../services/actions/tagImport/tagImport";

import "../../../../../assets/styles/page/configuration/tagImport.scss";
import "../../../../../assets/styles/layouts/template.scss";
const Main = () => {
  document.title = `Ligeia.ai | Tag Import`;
  selectDrawerItem("Tag Import");
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(closeWebSocket());
    };
  }, []);
  return (
    <React.Fragment>
      <Grid
        item
        xs={12}
        className="template-container__body tag-import-container"
      >
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid
          container
          className="template-container__body__action-box tag-import-container__action-box"
        >
          <ActionMenu />
        </Grid>
        <ItemSperatorLineXL />
        <Grid
          item
          xs={12}
          className="template-container__body__property-box tag-import-container__property-box"
        >
          <Body />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Main;
