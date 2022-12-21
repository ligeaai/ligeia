import React from "react";

import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

import DataGrid from "./dataGrid";
import { MyBox } from "../../../../../components";
const Properties = () => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <MyBox
      sx={{
        maxWidth: `calc(100% - 21px)`,
        minHeight: isFullScreen
          ? "calc(500px - 60px - 40px )"
          : "calc(500px - 50px - 36px - 26px )",
        height: isFullScreen
          ? "calc(100vh - 60px - 40px )"
          : "calc(100vh - 60px - 50px - 36px - 26px )",
        "& .super-app-theme--cell": {
          backgroundColor: grey[200],
        },
        button: { color: "#4B4B4B" },
      }}
      Element={<DataGrid />}
    ></MyBox>
  );
};

export default Properties;
