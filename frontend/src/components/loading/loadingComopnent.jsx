import React from "react";
import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const LoadingComponent = () => {
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backdropFilter: "blur(1.5px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#ffffff",
        }}
      >
        <CircularProgress color="secondary" />
      </Box>
    </React.Fragment>
  );
};

export default LoadingComponent;
