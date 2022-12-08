import React from "react";
import Divider from "@mui/material/Divider";
const divider = () => {
  return (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
      sx={{
        marginX: "2px",
        borderWidth: "0.2px",
        borderColor: "#4B4B4B",
        backgroundColor: "#4B4B4B",
      }}
    />
  );
};

export default divider;
