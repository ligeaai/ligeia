import React from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Grid, IconButton } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import { Drawer } from "../../components";
import Header from "./header";
import { setIsFullScreen } from "../../services/reducers/fullScreenReducer";

const Main = (props) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const { Element } = props;

  const drawerWidth = useSelector((state) => state.drawerMenu.width);

  return (
    <Box id="main-layout">
      <Box className="full-screen-box">{Element}</Box>
      <Box className="normal-screen-box">
        <Header />
        <Grid container sx={{ flexWrap: "nowrap" }}>
          <Grid
            item
            sx={{
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
      <Box className="full-screen-icon-box">
        <IconButton
          className="full-screen-icon-box__btn"
          variant="contained"
          onClick={() => {
            $(".full-screen-box").toggle();
            $(".normal-screen-box").toggle();
            $(".full-screen-icon").toggle();
            $(".full-screen-exit-icon").toggle();
            dispatch(setIsFullScreen(!isFullScreen));
          }}
        >
          <FullscreenIcon className="full-screen-icon" fontSize="medium" />
          <FullscreenExitIcon
            className="full-screen-exit-icon"
            fontSize="medium"
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default React.memo(Main);
