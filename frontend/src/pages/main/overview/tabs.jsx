import React from "react";
import { useSelector } from "react-redux";

import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { grey } from "@mui/material/colors";

import { MyTabs, MyDialog } from "../../../components";

import DialogContent from "./dialogContent";
const fabStyle = {
  position: "absolute",
  bottom: 16,
  left: 16,
  backgroundColor: "icon.primary",
};
const MyFab = () => {
  return (
    <Fab sx={fabStyle} aria-label="Add" color="primary">
      <AddIcon />
    </Fab>
  );
};
const Tabs = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <Box
      sx={{
        width: `100%`,
        minHeight: isFullScreen
          ? "calc(500px - 56px  )"
          : "calc(500px - 50px - 16px )",
        height: isFullScreen
          ? "calc(100vh - 56px)"
          : "calc(100vh - 60px - 50px - 16px )",
        "& .super-app-theme--cell": {
          backgroundColor: "deneme.main",
        },
        button: {
          color: "text.primary"
        },
        m: 0.5,
        border: "0.5px solid",
        borderColor: "background.main",
        borderRadius: "5px",
        position: "relative",
      }}
    >
      <MyTabs />
      <MyDialog Button={<MyFab />} DialogBody={DialogContent} />
    </Box>
  );
};

export default Tabs;
