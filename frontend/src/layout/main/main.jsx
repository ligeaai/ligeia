import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Grid } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import { Drawer, ComponentError, ComponentErrorBody } from "../../components";
import Header from "./header";
import { setIsFullScreen } from "../../services/reducers/fullScreenReducer";

import { loadDrawerMenu } from "../../services/actions/drawerMenu/drawerMenu";

const Main = (props) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const { Element, delSearchBar } = props;

  const drawerWidth = useSelector((state) => state.drawerMenu.width);

  return isFullScreen ? (
    <React.Fragment>
      <Box sx={{ minHeight: "100vh", borderRadius: "3px" }}>{Element}</Box>

      <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 2 }}>
        <Button
          onClick={() => {
            dispatch(setIsFullScreen(false));
          }}
        >
          <FullscreenExitIcon />
        </Button>
      </Box>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Box>
        <Header delSearchBar={delSearchBar} />
        <Grid container sx={{ flexWrap: "nowrap" }}>
          <Grid
            item
            sx={{
              backgroundColor: "success.secondary",
              zIndex: 2,
              typography: {
                xs: {
                  position: "absolute",
                },
                sm: { position: "relative" },
              },
            }}
          >
            <Drawer />
          </Grid>
          <Grid
            item
            sx={{
              minHeight: "calc(100vh - 60px - 8px)",
              height: "500px",
              width: `calc(100vw - ${drawerWidth})`,
              m: 0.5,
            }}
          >
            {Element}
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ position: "fixed", bottom: 0, right: 0, m: 2 }}>
        <Button
          onClick={() => {
            dispatch(setIsFullScreen(true));
          }}
        >
          <FullscreenIcon />
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default React.memo(Main);
