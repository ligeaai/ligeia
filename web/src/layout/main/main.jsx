import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { Box, Button, Grid } from "@mui/material";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

import Drawer from "../../components/drawer/drawer";
import Header from "./header";
import { setIsFullScreen } from "../../services/reducers/fullScreenReducer";

import Loading from "../../components/HOC/loading";
import axios from "axios";

const Main = (props) => {
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const { Element, delSearchBar } = props;
  const [navItems, setNavItems] = React.useState(false);

  React.useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + btoa("COUCHDB_USER:COUCHDB_PASSWORD"),
      },
    };
    try {
      axios
        .get(
          "http://127.0.0.1:5984/drawermenu/0e4e3edffa5dbce95a6b7bab3700092a",
          config
        )
        .then((res) => {
          setNavItems(res.data.drawerMenu);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  if (navItems) {
    return isFullScreen ? (
      <React.Fragment>
        {Element}
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
                backgroundColor: "myBackgroundColor",
                zIndex: 2,
                typography: {
                  xs: {
                    position: "absolute",
                  },
                  sm: { position: "relative" },
                },
              }}
            >
              <Drawer navItems={navItems} />
            </Grid>
            <Grid
              item
              sx={{
                backgroundColor: "myCanvasBg",
                minHeight: "calc(100vh - 75px)",
                width: "100%",
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
  }
  return <Loading />;
};

export default Main;
