import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Grid from "@mui/material/Grid";

import {
  ItemSperatorLineXL,
  PropLinkTabs,
  ComponentError,
  BreadcrumbBox,
  MainBox,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";

import Properties from "./properties/properties";
import MyActionMenu from "./properties/actionMenu";
import Link from "./links/link";
import LinkActionMenu from "./links/linkActionMenu";
import TreeMenu from "./treeMenu";

import { cleanRoles } from "../../../../services/actions/roles/roles";

const Main = ({ isHome }) => {
  const dispatch = useDispatch();
  const isLinksActive = useSelector((state) => state.roles.linkActive);
  React.useEffect(() => {
    return () => {
      dispatch(cleanRoles());
    };
  }, []);
  return (
    <MainBox>
      <Grid item>
        <DrawerMenu Element={<TreeMenu />} path="item" />
      </Grid>

      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
          width: "100px",
          color: "text.primary",
        }}
      >
        <Grid container>
          <BreadcrumbBox />
          <ItemSperatorLineXL />
          <Grid container sx={{ alignItems: "center", pl: 2, marginY: "2px" }}>
            <Grid item sx={{ mr: "2px" }}>
              {isLinksActive ? <LinkActionMenu /> : <MyActionMenu />}
            </Grid>
          </Grid>

          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <ComponentError errMsg="Error">
              <PropLinkTabs
                MyProperties={<Properties isHome={isHome} />}
                MyLinks={<Link isHome={isHome} />}
              />
            </ComponentError>
          </Grid>
        </Grid>
      </Grid>
    </MainBox>
  );
};

export default Main;
