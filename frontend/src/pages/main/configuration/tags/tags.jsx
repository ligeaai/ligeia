import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import TagsActionMenu from "./tagsActionMenu";

import Properties from "./properties";

import {
  cleanAllTags,
  loadTagsLabel,
  cleanSaveValue,
} from "../../../../services/actions/tags/tags";
import { selectTreeViewItem } from "../../../../services/actions/treeview/treeview";
import Menu from "./treeMenu";

const Tags = ({ isHome }) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  React.useEffect(() => {
    if (isHome) {
      dispatch(selectTreeViewItem(-3, "", 3));
      dispatch(cleanSaveValue());
    }
  }, [isHome]);
  React.useEffect(() => {
    dispatch(loadTagsLabel());
    return () => {
      dispatch(cleanAllTags());
    };
  }, []);
  return (
    <Grid
      container
      sx={{
        minHeight: isFullScreen ? "100vh" : "100%",
        height: "500px",
        flexWrap: "nowrap",
      }}
    >
      <Grid item>
        <DrawerMenu Element={<Menu />} path="tags" />
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
          <Grid
            item
            sx={{
              ml: 1.5,
              display: "flex",
              alignItems: "center",
              marginY: "2px",
            }}
          >
            <TagsActionMenu />
          </Grid>
          <ItemSperatorLineXL />
          <Grid item xs={12} sx={{ mt: 1, mr: 1 }}>
            <PropLinkTabs
              MyProperties={<Properties></Properties>}
              isLinkOpen={false}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tags;
