import React from "react";
import { Box, Grid, Typography } from "@mui/material";

import StartComponent from "../../layout/start/start";

const Start = () => {
  return (
    <Box>
      <StartComponent
        Element={
          <Grid
            container
            sx={{
              justifyContent: "center",
              alignItems: "center",
              height: {
                xs: "calc(100vh - 300px)",
                sm: "calc(100vh - 250px)",
              },
              minHeight: "100px",
            }}
          >
            <Grid item>
              <Typography
                sx={{
                  fontSize: { xs: "32px", md: "48px", xl: "63px" },
                  fontWeight: "800",
                  color: "#ffffff",
                  p: 2,
                }}
              >
                Advancing AI for your assets
              </Typography>
            </Grid>
          </Grid>
        }
      />

      {/* <Box>
        <img src={background} alt="bg" style={{ width: "100%" }} />
      </Box> */}
    </Box>
  );
};

export default Start;
