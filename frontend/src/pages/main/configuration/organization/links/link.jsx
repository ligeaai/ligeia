import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { ComponentError, ComponentErrorBody } from "../../../../../components";

import LinkEditor from "./linkEditor";
const Links = ({ type }) => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <Box
      sx={{
        width: `100%`,
        minHeight: isFullScreen
          ? "calc(500px - 60px - 50px )"
          : "calc(500px - 50px - 36px - 32px )",
        height: isFullScreen
          ? "calc(100vh - 60px - 50px )"
          : "calc(100vh - 60px - 50px - 36px - 32px )",
        "& .super-app-theme--cell": {
          backgroundColor: grey[200],
        },
        button: { color: "#4B4B4B" },
        m: 0.5,
        border: "0.5px solid",
        borderColor: grey[200],
        borderRadius: "5px",
        overflowY: "scroll",
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
        <LinkEditor type={type} />
      </ComponentError>
    </Box>
  );
};

export default Links;