import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { SearchBarMobile } from "../../../components";

import {
  loadTreeViewWidth,
  updateTreeViewCouch,
} from "../../../services/actions/treeview/treeview";

const DrawerMenu = (props) => {
  const dispatch = useDispatch();

  const { Element, path } = props;

  const [leftMenuWidth, setLeftMenuWidth] = React.useState(0);
  const [mywidth, setWidth] = React.useState(false);
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const handler = (mouseDownEvent) => {
    const startSize = leftMenuWidth;
    const startPosition = mouseDownEvent.pageX;
    var sonuc = 0;
    document.getElementById("main-box").style.userSelect = "none";
    function onMouseMove(mouseMoveEvent) {
      if (startSize - startPosition + mouseMoveEvent.pageX < 10) {
        setLeftMenuWidth(0);
      } else {
        setLeftMenuWidth(
          (prev) => startSize - startPosition + mouseMoveEvent.pageX
        );
        sonuc = startSize - startPosition + mouseMoveEvent.pageX;
      }
    }
    function onMouseUp() {
      document.getElementById("main-box").style.userSelect = "text";
      dispatch(updateTreeViewCouch(path, sonuc));
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };
  React.useEffect(() => {
    const myFunc = async () => {
      var res = await dispatch(await loadTreeViewWidth(path));
      setLeftMenuWidth(res[path]);
    };
    myFunc();
  }, []);
  function setWidthTrue() {
    setWidth(true);
  }
  function onOpen(e) {
    if (e > leftMenuWidth) {
      setLeftMenuWidth(e);
      dispatch(updateTreeViewCouch(path, e));
    }
    setWidth(false);
  }
  return (
    <Box
      sx={{
        backgroundColor: "status.main",
        position: "relative",
        width: leftMenuWidth,
        height: "100%",
        borderRadius: "3px",
        minHeight: "500px",
        boxShadow: 3,
      }}
    >
      <Grid
        container
        sx={{
          borderRadius: "5px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            padding: 2,
            pb: 0,
            position: "relative",
            borderRadius: "5px",
            overflow: "hidden",
          }}
        >
          <SearchBarMobile theme={"light"} />
        </Grid>
        <Box
          sx={{
            borderRadius: "50px",
            width: "25px",
            height: "25px",
            position: "absolute",
            boxShadow: 2,
            backgroundColor: "icon.primary",
            top: "25px",
            right: "-12px",
            zIndex: { xs: 0, sm: 3 },
          }}
          onClick={async () => {
            await setLeftMenuWidth(() =>
              leftMenuWidth > 0 || leftMenuWidth === "min-content"
                ? 0
                : "min-content"
            );
            dispatch(
              updateTreeViewCouch(
                path,
                leftMenuWidth === 0
                  ? document.getElementById("collapseTreeView").offsetWidth + 2
                  : document.getElementById("collapseTreeView").offsetWidth
              )
            );
            setLeftMenuWidth(() =>
              leftMenuWidth === 0
                ? document.getElementById("collapseTreeView").offsetWidth + 2
                : document.getElementById("collapseTreeView").offsetWidth
            );
          }}
        >
          {leftMenuWidth === "min-content" || leftMenuWidth > 0 ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </Box>
        <Box
          sx={{
            backgroundColor: "text.disabled",
            width: "100%",
            height: "1px",
            m: 1.5,
          }}
        />
        <Grid
          id={"collapseTreeView"}
          item
          xs={12}
          sx={{
            overflowY: "hidden",
            overflowX: "hidden",
            height: isFullScreen
              ? "calc(100vh - 84px )"
              : "calc(100vh - 85px - 60px - 4px  )",
            minHeight: "416px",
          }}
        >
          <Box id="treeItems" sx={{ width: mywidth ? "min-content" : "100%" }}>
            <Element onOpen={onOpen} setWidthTrue={setWidthTrue} />
          </Box>
        </Grid>
        <Box
          sx={{
            position: "absolute",
            height: "calc(100% - 4px)",
            width: "5px",
            right: 0,
            "&:hover": {
              backgroundColor: "text.main",
              cursor: "w-resize",
            },
          }}
          onMouseDown={handler}
        />
      </Grid>
    </Box>
  );
};

export default React.memo(DrawerMenu);
