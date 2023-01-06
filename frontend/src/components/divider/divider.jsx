import React from "react";
import Divider from "@mui/material/Divider";
const divider = () => {
  return (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
      sx={{
        borderWidth: "0.2px",
        borderColor: "text.main",
        backgroundColor: "text.main",
      }}
    />
  );
};

export default divider;
