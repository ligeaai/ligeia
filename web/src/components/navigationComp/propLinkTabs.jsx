import React from "react";

import { Box, Grid, Typography, Tab, Tabs } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const Properties = () => {
  const [view, setView] = React.useState("Properties");
  const [isHover, setIsHover] = React.useState("");
  const handleChange = (event, nextView) => {
    setView(nextView);
  };
  const handleMouseEnter = (view) => {
    setIsHover(view);
  };
  const handleMouseLeave = () => {
    setIsHover("");
  };
  return (
    <Grid container sx={{ height: "100%" }}>
      <Grid
        item
        sx={{
          px: 1,
          my: 1,
          borderRight: "1px solid",
          borderColor: "text.secondary",
        }}
      >
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value="Properties"
            aria-label="properties"
            sx={{ p: 1 }}
            onMouseEnter={() => {
              handleMouseEnter("Properties");
            }}
            onMouseLeave={handleMouseEnter}
          >
            <Typography
              variant="body2"
              sx={{
                writingMode: "vertical-rl",
                WebkitTransform: "rotate(180deg)",
                MozTransform: "rotate(180deg)",
                OTransform: "rotate(180deg)",
                msTransform: "rotate(180deg)",
              }}
            >
              {view === "Properties" || isHover === "Properties" ? (
                <>
                  <QuestionMarkIcon /> Properties
                </>
              ) : (
                <QuestionMarkIcon />
              )}
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="Links"
            aria-label="links"
            sx={{ p: 1 }}
            onMouseEnter={() => {
              handleMouseEnter("Links");
            }}
            onMouseLeave={handleMouseEnter}
          >
            <Typography
              variant="body2"
              sx={{
                writingMode: "vertical-rl",
                WebkitTransform: "rotate(180deg)",
                MozTransform: "rotate(180deg)",
                OTransform: "rotate(180deg)",
                msTransform: "rotate(180deg)",
              }}
            >
              {view === "Links" || isHover === "Links" ? (
                <>
                  <QuestionMarkIcon /> Links
                </>
              ) : (
                <QuestionMarkIcon />
              )}
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      {view === "Properties" ? <Grid>Properties</Grid> : <></>}
      {view === "Links" ? <Grid>Links</Grid> : <></>}
    </Grid>
  );
};

export default Properties;
