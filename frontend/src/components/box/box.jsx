import React from "react";

import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { ComponentError, ComponentErrorBody } from "../index";

const Properties = ({ Element }) => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <Box
      sx={{
        width: `100%`,
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
        m: 0.5,
        border: "0.5px solid",
        borderColor: grey[200],
        borderRadius: "5px",
        overflowY: "auto",
      }}
    >
      <ComponentError
        errMsg={
          <ComponentErrorBody
            text="Something went wrong"
            icon={<ErrorOutlineIcon />}
          />
        }
      >
        {Element}
      </ComponentError>
    </Box>
  );
};

export default Properties;
