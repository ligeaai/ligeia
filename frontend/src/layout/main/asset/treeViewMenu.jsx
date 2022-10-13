import React from "react";
import { useSelector } from "react-redux";

import { Box, Grid } from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { SearchBarMobile } from "../../../components";

const DrawerMenu = (props) => {
  const [leftMenuWidth, setLeftMenuWidth] = React.useState(250);
  const { Element } = props;
  const handler = (mouseDownEvent) => {
    const startSize = leftMenuWidth;
    const startPosition = mouseDownEvent.pageX;

    function onMouseMove(mouseMoveEvent) {
      if (startSize - startPosition + mouseMoveEvent.pageX < 10) {
        setLeftMenuWidth(0);
      } else {
        setLeftMenuWidth(startSize - startPosition + mouseMoveEvent.pageX);
      }
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };

  return (
    <Grid
      item
      sx={{
        position: "relative",
        width: `${leftMenuWidth}px`,
        pr: 0.5,
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          backgroundColor: "myTreeViewBg",
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Grid item xs={12} sx={{ p: 2, pb: 0, position: "relative" }}>
          <SearchBarMobile theme={"light"} />
        </Grid>
        <Box
          sx={{
            borderRadius: "50px",
            width: "25px",
            height: "25px",
            position: "absolute",
            boxShadow: 2,
            backgroundColor: "myReverseText",
            top: "25px",
            right: "-8px",
            zIndex: { xs: 0, sm: 3 },
          }}
          onClick={() => {
            setLeftMenuWidth(() => (leftMenuWidth > 0 ? 0 : 250));
          }}
        >
          {leftMenuWidth > 0 ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </Box>
        <Box
          sx={{
            backgroundColor: "text.disabled",
            width: "100%",
            height: "1px",
            mx: 1.5,
            mb: 0.5,
          }}
        />
        <Grid
          item
          xs={12}
          sx={{
            overflowY: "scroll",
            overflowX: "hidden",
            minHeight: "min-content",
            height: "calc(100% - 75px)",
            "&::-webkit-scrollbar": {
              width: "0.2em",
            },
            "&::-webkit-scrollbar-track": {
              boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,.1)",
              outline: "1px solid rgba(0,0,0,.3)",
            },
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
              backgroundColor: "rgba(0,0,0,0.5)",
              cursor: "w-resize",
            },
          }}
          onMouseDown={handler}
        />
      </Grid>
    </Grid>
  );
};

export default DrawerMenu;
