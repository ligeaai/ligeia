import React from "react";
import $ from "jquery";
import { useSelector, useDispatch } from "react-redux";

import { Box, Grid, IconButton } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import { Drawer } from "../../components";
import Header from "./header";
import { setIsFullScreen } from "../../services/reducers/fullScreenReducer";

const Main = ({ Element }) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);

  function btnClickHandle() {
    //toggle full screen
    [
      "full-screen-box",
      "normal-screen-box",
      "full-screen-icon",
      "full-screen-exit-icon",
    ].map((clsName) => {
      $(`.${clsName}`).toggle();
    });
    dispatch(setIsFullScreen(!isFullScreen));
  }

  return (
    <Box className="main-layout">
      <Box className="full-screen-box">
        <Box className="full-screen-box__header-box">
          <Box className="full-screen-box__header-box__header">
            <Header />
          </Box>
        </Box>
        <Box className="full-screen-box__body">{Element}</Box>
      </Box>
      <Box className="normal-screen-box">
        <Header />
        <Box className="main-layout__app-body">
          <Box className="main-layout__app-body__drawer-container">
            <Drawer />
          </Box>
          <Box className="main-layout__app-body__element-container">
            {Element}
          </Box>
        </Box>
      </Box>
      <Box className="full-screen-icon-box">
        <IconButton
          className="full-screen-icon-box__btn"
          variant="contained"
          onClick={btnClickHandle}
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
