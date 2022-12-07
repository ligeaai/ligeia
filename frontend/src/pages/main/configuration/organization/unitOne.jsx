import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Divider, Grid } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
} from "../../../../components";

import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import DateBreak from "./dateBreak";
import Properties from "./properties";
import Links from "./links/link";
import CompanyActionMenu from "./companyActionMenu";
import LinksActionMenu from "./links/linksActionMenu";

import { TreeMenuItems } from "./treeMenu";
import { selectItem } from "../../../../services/actions/company/item";
const UnitOne = (props) => {
  const dispatch = useDispatch();
  const { type } = props;
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const isLinksActive = useSelector((state) => state.linkEditor.isLinksActive);
  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item sx={{ minHeight: "500px", boxShadow: 3, mr: 0.5 }}>
        <DrawerMenu Element={<TreeMenuItems isLinksActive={isLinksActive} />} />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              height: "42px",
              display: "flex",
              alignItems: "center",
              backgroundColor: "myTreeViewBg",
              color: "text.primary",
              borderTopLeftRadius: "3px",
              borderTopRightRadius: "3px",
            }}
          >
            <Box
              sx={{ ml: 3 }}
              onClick={() => {
                dispatch(selectItem(-3));
              }}
            >
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Grid
            item
            sx={{
              ml: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
              display: "flex",
              alignItems: "center",
            }}
          >
            {!isLinksActive ? <CompanyActionMenu /> : <LinksActionMenu />}
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              marginX: "2px",
              borderWidth: "0.2px",
              borderColor: "#4B4B4B",
              backgroundColor: "#4B4B4B",
            }}
          />
          <Grid
            item
            sx={{
              mr: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
            }}
          >
            <DateBreak props={isLinksActive} />
          </Grid>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{
              borderWidth: "0.2px",
              borderColor: "#4B4B4B",
              backgroundColor: "#4B4B4B",
            }}
          />
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={
                <Properties
                  type={type}
                  isLinksActive={isLinksActive}
                ></Properties>
              }
              MyLinks={
                <Links type={type} isLinksActive={isLinksActive}></Links>
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitOne;
