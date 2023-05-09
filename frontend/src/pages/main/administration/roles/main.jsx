import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {
  ItemSperatorLineXL,
  PropLinkTabs,
  ComponentError,
  Breadcrumb,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import Properties from "./properties/properties";
import MyActionMenu from "./properties/actionMenu";
import Link from "./links/link";
import LinkActionMenu from "./links/linkActionMenu";
import TreeMenu from "./treeMenu";

import { cleanRoles } from "../../../../services/actions/roles/roles";
import { selectDrawerItem } from "../../../../services/actions/drawerMenu/drawerMenu";
import "../../../../assets/styles/page/administration/roles/roles.scss";
import "../../../../assets/styles/layouts/template.scss";
const Main = ({ isHome }) => {
  document.title = "Ligeia.ai | Roles";
  selectDrawerItem("Roles");
  const dispatch = useDispatch();
  const isLinksActive = useSelector((state) => state.roles.linkActive);
  React.useEffect(() => {
    return () => {
      dispatch(cleanRoles());
    };
  }, []);
  return (
    <React.Fragment>
      <DrawerMenu Element={<TreeMenu />} path="item" />

      <Box className="template-container__body roles-container__body">
        <Breadcrumb />
        <ItemSperatorLineXL />
        <Grid container className=" template-container__body__action-box ">
          <Grid item className="template-container__body__action-box__icons">
            <ComponentError errMsg="Error">
              {isLinksActive ? <LinkActionMenu /> : <MyActionMenu />}
            </ComponentError>
          </Grid>
        </Grid>

        <ItemSperatorLineXL />
        <Grid
          item
          xs={12}
          className=" template-container__body__property-box roles-container__body__property-box"
        >
          <ComponentError errMsg="Error">
            <PropLinkTabs
              MyProperties={<Properties isHome={isHome} />}
              MyLinks={<Link isHome={isHome} />}
            />
          </ComponentError>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Main;
