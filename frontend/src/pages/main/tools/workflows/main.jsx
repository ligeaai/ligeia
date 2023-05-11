import React from "react";

import Grid from "@mui/material/Grid";

import {
  ItemSperatorLineXL,
  PropLinkTabs,
  ComponentError,
  Breadcrumb,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import Body from "./body";
import TreeMenu from "./treeMenu";
import ActionMenu from "./actionMenus";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import { cleanWorkflow } from "../../../../services/actions/workflow/workflow";
import "../../../../assets/styles/layouts/template.scss";
import "../../../../assets/styles/page/tools/workflow/workflow.scss";
import { useDispatch } from "react-redux";
const Main = ({ isHome }) => {
  document.title = `Ligeia.ai | Workflows`;
  selectDrawerItem("Workflows");
  const dispatch = useDispatch();
  React.useEffect(() => {
    return () => {
      dispatch(cleanWorkflow());
    };
  }, []);
  return (
    <React.Fragment>
      <DrawerMenu Element={<TreeMenu />} path="item" />

      <Grid item xs={12} className="template-container__body ">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid container className="template-container__body__action-box">
          <ActionMenu />
        </Grid>

        <ItemSperatorLineXL />
        <Grid item xs={12} className="template-container__body__property-box">
          <ComponentError errMsg="Error">
            <PropLinkTabs
              MyProperties={!isHome && <Body />}
              isLinkOpen={false}
            />
          </ComponentError>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Main;
