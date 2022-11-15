import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";

import Cards from "../../../components/cardGenerator/cards";

const Main = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  const drawerData = useSelector((state) => state.drawerMenu.data);
  const drawerDataConfiguration = drawerData.find(
    (e) => e.LAYER_NAME === "CONFIGURATION"
  );
  var cards = [];
  Object.keys(drawerDataConfiguration.Items).map((e) => {
    cards.push({
      cardTitle: drawerDataConfiguration.Items[e].SHORT_LABEL,
      //cardBody: "Administration of the platform",
      cardURL: drawerDataConfiguration.Items[e].URL,
      selectedDrawerItem: drawerDataConfiguration.Items[e].SHORT_LABEL,
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
};

export default Main;
