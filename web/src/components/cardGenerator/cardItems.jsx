import React, { useState } from "react";

import { Box, Grid, Link, Typography } from "@mui/material";

import history from "../../routers/history";

const CardItems = (props) => {
  const { card } = props;
  const [theme, setTheme] = useState("myCardFancyColor");
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        backgroundColor: "myBackgorundColor",
        boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)",
        mb: 3.5,
        height: "215px",
        cursor: "pointer",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
        "&:hover": {
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
          position: "relative",
          top: "-3px",
          left: "-3px",
        },
      }}
      onMouseOver={() => setTheme("myCardFancyColorHover")}
      onMouseLeave={() => setTheme("myCardFancyColor")}
      onClick={() => {
        history.push(`${card.cardURL}`);
      }}
    >
      <Grid
        container
        columnGap={2}
        sx={{ flexDirection: "row", flexWrap: "nowrap", height: "100%" }}
      >
        <Grid item>
          <Box
            sx={{
              width: "20px",
              height: "100%",
              backgroundColor: theme,
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 2.5, mt: 1.5 }}>
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: "myTextColor",
                }}
              >
                {card.cardTitle}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ fontSize: "18px", color: "text.secondary" }}
            >
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
              <Link underline="none" color="myTextColor">
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
