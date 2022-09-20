import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import background from "../../assets/backgorunds/back.png";
import StartComponent from "../../layout/start/Start";

const Start = () => {
  return (
    <Box>
      <StartComponent />
      <Box>
        <Grid
          container
          sx={{
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px", xl: "63px" },
              fontWeight: "800",
              color: "#ffffff",
              margin: "15% auto",
            }}
          >
            Advancing AI for everyone
          </Typography>
        </Grid>
      </Box>
      {/* <Box>
        <img src={background} alt="bg" style={{ width: "100%" }} />
      </Box> */}
    </Box>
  );
};

export default Start;
