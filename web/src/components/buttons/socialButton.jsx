import React from "react";

import { Box } from "@mui/material";

const socialButton = (props) => {
  const { Logo } = props;
  return (
    <Box
      sx={{
        width: "78px",
        height: "56px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "8px",
        cursor: "pointer",
        color: "text.primary",
        border: 1,
      }}
    >
      <Logo sx={{ width: "36px", height: "36px" }} />
    </Box>
  );
};

export default socialButton;
