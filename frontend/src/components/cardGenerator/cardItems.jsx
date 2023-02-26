import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
import history from "../../routers/history";

const CardItems = ({ card }) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const [cardTheme, setCardTheme] = useState("success.primary");
  return (
    <Grid
      item
      xs={12}
      md={4}
      sx={{
        mb: 3.5,
        height: "215px",
        cursor: "pointer",
        borderTopRightRadius: "12px",
        borderBottomRightRadius: "12px",
        backgroundColor: "background.success",
        position: "relative",
        "&:hover": {
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
          top: "-3px",
          left: "-3px",
        },
        top: isClicked ? "3px !important" : "0",
        left: isClicked ? "3px !important" : "0",
        boxShadow: isClicked
          ? "2px 2px 6px rgba(0, 0, 0, 0.2) !important"
          : "3px 3px 8px rgba(0, 0, 0, 0.3)",
      }}
      onMouseOver={() => setCardTheme("hover.secondary")}
      onMouseLeave={() => {
        setCardTheme("success.primary");
        setIsClicked(false);
      }}
      onClick={() => {
        history.push(`${card.cardURL}`);
        dispatch(setSelectedDrawerItem({ SHORT_LABEL: `${card.shortName}` }));
      }}
      onMouseDown={() => setIsClicked(true)}
      onMouseUp={() => setIsClicked(false)}
    >
      <Grid
        container
        columnGap={2}
        sx={{ flexDirection: "row", flexWrap: "nowrap", height: "100%" }}
      >
        <Grid item>
          <Box
            sx={{ width: "20px", height: "100%", backgroundColor: cardTheme }}
          />
        </Grid>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 2.5, mt: 1.5 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: "700", color: "text.secondary" }}
              >
                {card.cardTitle}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ fontSize: "18px", color: "text.secondary" }}
            >
              <Typography variant="subtitle2" sx={{ color: "text.success" }}>
                {card.cardBody}
              </Typography>
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
              <Typography variant="body2" color="text.success">
                Next
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CardItems;
