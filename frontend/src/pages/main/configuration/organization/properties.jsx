import React from "react";
import { Box, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { ComponentError, ComponentErrorBody } from "../../../../components";

import DataGrid from "./dataGrid/dataGrid";
const properties = ({ type }) => {
  return (
    <Box
      sx={{
        boxShadow: 3,
        m: 0.5,
        mb: 1,
        mr: 1,
        width: "100%",
        height: "100%",
        borderRadius: "3px",
      }}
    >
      <Grid container sx={{ pl: 0.5 }}>
        <Grid item xs={12} md={7}>
          <Box
            sx={{
              width: "674px",
              minHeight: "calc(500px - 50px - 36px - 32px - 42px - 16px)",
              height: "calc(100vh - 60px - 50px - 36px - 32px - 42px - 16px)",
              "& .super-app-theme--cell": {
                backgroundColor: grey[200],
              },
              button: { color: "#4B4B4B" },
              my: 0.5,
              border: "0.5px solid",
              borderColor: grey[200],
              borderRadius: "5px",
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
              <DataGrid type={type} />
            </ComponentError>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default properties;
