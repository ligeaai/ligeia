import React from "react";

import DataGrid from "./dataGrid";
import { Box } from "@mui/material";
const Properties = () => {
  return (
    <Box
      className="item-container__body__property-box__datagrid"
      sx={{
        height: "100%",
        width: "100%",
        "& .super-app-theme--cell": {
          backgroundColor: "background.info",
        },
        button: { color: "status.secondary" },
      }}
    >
      <DataGrid />
    </Box>
  );
};

export default Properties;
