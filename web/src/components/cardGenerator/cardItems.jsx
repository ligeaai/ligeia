import React, { useState } from "react";

import { Box, Grid, Link, Typography } from "@mui/material";

import history from "../../routers/history";

const CardItems = (props) => {
  const { card } = props;
  console.log(card);
  const [theme, setTheme] = useState("#42526E");
  return (
    <Grid
      item
      xs={12}
      sm={5}
      md={3}
      sx={{ backgroundColor: "primary.contrastText", mb: 3.5, height: "215px" }}
      onMouseOver={() => setTheme("#458BF3")}
      onMouseLeave={() => setTheme("#42526E")}
    >
      <Grid
        container
        columnGap={2}
        sx={{ flexDirection: "row", flexWrap: "nowrap", height: "100%" }}
      >
        <Grid item>
          <Box sx={{ width: "20px", height: "100%", backgroundColor: theme }} />
        </Grid>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 2.5, mt: 1.5 }}>
              <Typography
                sx={{ fontSize: "22px", fontWeight: "700", color: "#42526E" }}
              >
                {card.cardTitle}
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ fontSize: "18px", color: "text.primary" }}>
              {card.cardBody}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                position: "absolute",
                right: "0",
                bottom: "0",
                marginRight: "34px",
                marginBottom: "20px",
              }}
            >
              <Link
                underline="none"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  history.push(`${card.cardURL}`);
                }}
              >
                Next
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardItems;
