import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { Box, Breadcrumbs, Grid } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import SearchBarMobile from "../../../components/searchBar/searchBarMobile";
import Main from "../../../layout/main/main";
import Menu from "../../../components/assetsComponent/app";

const AssetOwerview = () => {
  const breadcrumb = useSelector((state) => state.breadcrumb.breadcrumb);
  const [leftMenuWidth, setLeftMenuWidth] = React.useState(250);
  const theme = useSelector((state) => state.theme.theme);
  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }
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
    <Grid container>
      <Grid
        item
        sx={{
          position: "relative",
          width: `${leftMenuWidth}px`,
          height: "calc(100vh - 75px)",
          backgroundColor: "myBackgroundColor",
          borderLeft: "1px solid rgba(0,0,0,0.3)",
        }}
      >
        <Grid
          container
          sx={{ height: "100%", boxShadow: "inset -7px 8px 7px -9px" }}
        >
          <Grid item xs={12} sx={{ m: 2 }}>
            <SearchBarMobile theme={theme} />
          </Grid>
          <Box
            sx={{
              backgroundColor: "text.primary",
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
              height: "calc(100% - 75px)",
              "&::-webkit-scrollbar": {
                width: "0.4em",
              },
              "&::-webkit-scrollbar-track": {
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
                webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0,0,0,.1)",
                outline: "1px solid slategrey",
              },
            }}
          >
            <Menu />
          </Grid>
          <Box
            sx={{
              position: "absolute",
              height: "100%",
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
      <Grid item sx={{ width: `calc(100% - ${leftMenuWidth}px - 1px )` }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              height: "48px",
              display: "flex",
              alignItems: "flex-end",
              backgroundColor: "myCanvasBg",
              borderLeft: "1px solid rgba(0,0,0,0.3)",
              boxShadow: "inset 0px 8px 6px -9px",
            }}
          >
            <Box
              sx={{
                borderRadius: "50px",
                backgroundColor: "text.primary",
                width: "25px",
                height: "25px",
                position: "absolute",
                left: "-12.5px",
                zIndex: { xs: 0, sm: 3 },
                color: "myReverseText",
              }}
              onClick={() => {
                setLeftMenuWidth(() => (leftMenuWidth > 0 ? 0 : 250));
              }}
            >
              {leftMenuWidth > 0 ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </Box>
            <Box sx={{ color: "text.primary", ml: 3 }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumb.map((e, key) => {
                  return (
                    <Box
                      underline="hover"
                      key={key}
                      color="inherit"
                      href="/"
                      onClick={handleClick}
                      sx={{
                        color:
                          breadcrumb.length === key + 1
                            ? "text.primary"
                            : "text.secondary",
                      }}
                    >
                      {e}
                    </Box>
                  );
                })}
              </Breadcrumbs>
            </Box>
          </Grid>
          <Grid item xs={12}>
            CANVAS
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const overview = () => {
  return <Main Element={AssetOwerview()} delSearchBar={true} />;
};

export default overview;
