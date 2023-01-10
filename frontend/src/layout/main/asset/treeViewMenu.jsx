import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { SearchBarMobile } from "../../../components";

import { setCssUserSelect } from "../../../services/reducers/cssUserSelect";
import {
  loadTreeViewWidth,
  updateTreeViewCouch,
} from "../../../services/actions/treeview/treeview";
import { PatternSharp } from "@mui/icons-material";

const DrawerMenu = (props) => {
  const dispatch = useDispatch();
  const { Element, path } = props;

  const [leftMenuWidth, setLeftMenuWidth] = React.useState(0);

  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const handler = (mouseDownEvent) => {
    const startSize = leftMenuWidth;
    const startPosition = mouseDownEvent.pageX;
    var sonuc = 0;
    dispatch(setCssUserSelect(true));
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
      dispatch(setCssUserSelect(false));
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

  return (
    <Box
      sx={{
        backgroundColor: "status.main",
        position: "relative",
        width: `${leftMenuWidth}px`,
        height: "100%",
        borderRadius: "5px",
        minHeight: "500px",
        boxShadow: 3,
        mr: 0.5,
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
          sx={{ padding: 2, pb: 0, position: "relative", borderRadius: "5px" }}
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
          onClick={() => {
            setLeftMenuWidth(() => (leftMenuWidth > 0 ? 0 : 250));
            dispatch(updateTreeViewCouch(path, leftMenuWidth > 0 ? 0 : 250));
          }}
        >
          {leftMenuWidth > 0 ? <ChevronLeftIcon /> : <ChevronRightIcon />}
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
          item
          xs={12}
          sx={{
            overflowY: "hidden",
            overflowX: "hidden",
            height: isFullScreen
              ? "calc(100vh - 84px )"
              : "calc(100vh - 85px - 60px - 4px  )",
            minHeight: "416px",
            // minHeight: "min-content",
            //height: "calc(100% - 75px)",
            // "&::-webkit-scrollbar": {
            //   width: "0.2em",
            // },
            // "&::-webkit-scrollbar-track": {
            //   boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            //   webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            // },
            // "&::-webkit-scrollbar-thumb": {
            //   backgroundColor: "rgba(0,0,0,.1)",
            //   outline: "1px solid rgba(0,0,0,.3)",
            // },
          }}
        >
          {Element}
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
