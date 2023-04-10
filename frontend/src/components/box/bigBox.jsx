import React from "react";

import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { grey } from "@mui/material/colors";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { ComponentError, ComponentErrorBody } from "../index";

const BigBox = ({ Element, ...rest }) => {
  const isFullScreen = useSelector((state) => state.fullScreen.isFullScreen);
  return (
    <Box
      sx={{
        width: `100%`,
        minHeight: isFullScreen ? "calc(500px - 60px)" : "calc(500px - 74px)",
        height: isFullScreen
          ? "calc(100vh - 60px)"
          : "calc(100vh - 60px - 74px)",
        button: { color: "text.secondary" },
        m: 0.5,
        button: { color: "text.secondary" },
        border: "0.5px solid",
        borderColor: grey[200],
        borderRadius: "5px",
        overflowY: "auto",
      }}
      {...rest}
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

export default BigBox;
