import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";

import { setSelectedDrawerItem } from "../../services/actions/drawerMenu/drawerMenu";
import history from "../../routers/history";

const CardItems = (props) => {
  const dispatch = useDispatch();
  const { card } = props;
  const [isClick, setIsClick] = useState(false);
  const [cardFancyTheme, setCardFancyTheme] = useState("myCardFancyColor");
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
        position: "relative",
        "&:hover": {
          boxShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
          top: "-3px",
          left: "-3px",
        },
        top: isClick ? "3px !important" : "0",
        left: isClick ? "3px !important" : "0",
        boxShadow: isClick
          ? "2px 2px 6px rgba(0, 0, 0, 0.2) !important"
          : "3px 3px 8px rgba(0, 0, 0, 0.3)",
      }}
      onMouseOver={() => setCardFancyTheme("myCardFancyColorHover")}
      onMouseLeave={() => {
        setCardFancyTheme("myCardFancyColor");
        setIsClick(false);
      }}
      onClick={() => {
        history.push(`${card.cardURL}`);
      }}
      onMouseDown={() => {
        setIsClick(true);
      }}
      onMouseUp={() => {
        setIsClick(false);
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
              backgroundColor: cardFancyTheme,
            }}
          />
        </Grid>
        <Grid item xs={12} sx={{ position: "relative" }}>
          <Grid container>
            <Grid item xs={12} sx={{ mb: 2.5, mt: 1.5 }}>
              <Typography
                variant="h6"
                sx={{
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
              <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
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
              <Typography variant="body2" color="myTextColor">
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
