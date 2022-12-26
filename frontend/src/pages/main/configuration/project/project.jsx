import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Divider, Box } from "@mui/material";

import {
  MyBox,
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import ProjectActionMenu from "./projectActionMenu";
import ProjectEditor from "./projectEditor";
const Project = () => {
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
              backgroundColor: "status.main",
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
          {/* <Grid
            item
            sx={{
              ml: 1.5,
              backgroundColor: "myBackgroundColor",
              height: "42px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ProjectActionMenu />
          </Grid> */}
          {/* <Divider
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
            <DateBreak /> 
          </Grid>*/}
          {/* <ItemSperatorLineXL /> */}
          {/* <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={<Properties></Properties>}
              // MyLinks={<Links></Links>}
            />
          </Grid> */}
          <Grid item xs={12} sx={{ mt: 1, ml: 1, mr: 2 }}>
            <ProjectEditor />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Project;
