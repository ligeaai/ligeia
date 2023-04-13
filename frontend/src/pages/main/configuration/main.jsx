import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

import Cards from "../../../components/cardGenerator/cards";
import { LoadingComponent } from "../../../components";
import { setSelectedDrawerItem } from "../../../services/actions/drawerMenu/drawerMenu";

const Main = ({ way }) => {
  document.title = `Liegia.ai | ${way}`;
  const dispatch = useDispatch();
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const drawerData = useSelector((state) => state.drawerMenu.data);
  React.useEffect(() => {
    if (drawerData) {
      const drawerDataConfiguration = drawerData[way];
      dispatch(setSelectedDrawerItem(drawerDataConfiguration));
    }
  }, [drawerData]);
  if (drawerData) {
    const drawerDataConfiguration = drawerData[way];
    var cards = [];
    Object.keys(drawerDataConfiguration.Items).map((e) => {
      var url = drawerDataConfiguration.Items[e].SHORT_LABEL.toLowerCase();
      url = url.replace(/ /g, "_");
      cards.push({
        cardTitle: drawerDataConfiguration.Items[e].SHORT_LABEL,
        cardURL: `/${way.toLowerCase()}/${url}`,
      });
    });

    return (
      <Box
        sx={{
          minHeight: isFullScreen ? "100vh" : "100%",
          height: "500px",
          boxShadow: 3,
          borderRadius: "3px",
        }}
      >
        <Cards cards={cards} />
      </Box>
    );
  }
  return <LoadingComponent></LoadingComponent>;
};

export default Main;
