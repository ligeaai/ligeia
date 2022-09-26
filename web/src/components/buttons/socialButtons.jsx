import React from "react";

import { Box } from "@mui/material";

import history from "../../routers/history";

const socialButtons = (props) => {
  const { url, Logo } = props;
  return (
    <Box
      sx={{
        width: "78px",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #8392AB",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "pointer",
      }}
      onClick={() => {
        history.push(url);
      }}
    >
      <Logo sx={{ width: "36px", height: "36px" }} />
    </Box>
  );
};

export default socialButtons;
