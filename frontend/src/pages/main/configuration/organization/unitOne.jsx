import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { FixedSizeList } from "react-window";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Main from "../../../../layout/main/main";
import {
  Breadcrumb,
  ActionMenu,
  ComponentErrorBody,
  PropLinkTabs,
  ItemSperatorLineXL,
  ComponentError,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import DateBreak from "./dateBreak";
import Properties from "./properties";

const UnitOne = (props) => {
  const { type } = props;
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
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
        <DrawerMenu Element={<></>} />
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
            <Box sx={{ ml: 3 }}>
              <Breadcrumb />
            </Box>
          </Grid>
          <ItemSperatorLineXL />
          <Grid
            item
            sx={{
              mx: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ActionMenu />
          </Grid>
          <ItemSperatorLineXL />
          <Grid
            item
            sx={{
              mx: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
            }}
          >
            <DateBreak />
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={<Properties type={type}></Properties>}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UnitOne;
