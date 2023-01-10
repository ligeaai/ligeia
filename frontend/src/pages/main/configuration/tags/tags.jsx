import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box } from "@mui/material";

import {
  Breadcrumb,
  ItemSperatorLineXL,
  PropLinkTabs,
  TreeMenuItems,
} from "../../../../components";
import DrawerMenu from "../../../../layout/main/asset/treeViewMenu";
import TagsActionMenu from "./tagsActionMenu";

import Properties from "./properties";

import {
  cleanAllTags,
  loadTagsLabel,
} from "../../../../services/actions/tags/tags";

import TagService from "../../../../services/api/tags";

const Tags = ({ isHome }) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanAllTags());
      dispatch({
        type: "TOGGLE_CHANGES_TAGS",
        payload: false,
      });
    } else {
      dispatch(loadTagsLabel());
    }
  }, [isHome]);

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
        <DrawerMenu
          Element={
            <TreeMenuItems
              path={TagService.getAll}
              textPath="NAME"
              historyPathLevel={3}
            />
          }
          path="tags"
        />
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
