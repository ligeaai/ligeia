import React from "react";
import { Box, Typography } from "@mui/material";

const Start = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          textAlign: "center",
          fontSize: { xs: "32px", md: "48px", xl: "63px" },
          fontWeight: "800",
          color: "#ffffff",
        }}
      >
        Advancing AI for your needs
      </Typography>
    </Box>
  );
};

export default Start;
