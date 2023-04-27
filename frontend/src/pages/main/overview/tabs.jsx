import React from "react";

import { Box } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

import { MyTabs, MyDialog } from "../../../components";

import DialogContent from "./dialogContent";
const MyFab = () => {
  return (
    <Fab
      className="overview-container__tab-box__btn-new-widget"
      aria-label="Add"
    >
      <AddIcon />
    </Fab>
  );
};
const Tabs = () => {
  return (
    <Box className="overview-container__tab-box">
      <MyTabs />
      <MyDialog
        Button={<MyFab />}
        DialogBody={DialogContent}
        defaultWH={[710, 550]}
      />
    </Box>
  );
};

export default React.memo(Tabs);
