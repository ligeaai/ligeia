import React from "react";

import { Grid, Typography } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";

const Properties = ({ MyProperties, isLinkOpen = true }) => {
  const [view, setView] = React.useState("Properties");
  const [isHover, setIsHover] = React.useState("");
  const handleChange = (event, nextView) => {
    if (nextView) {
      setView(nextView);
    }
  };
  const handleMouseEnter = (view) => {
    setIsHover(view);
  };
  const handleMouseLeave = () => {
    setIsHover("");
  };
  return (
    <Grid
      container
      sx={{
        flexWrap: "noWrap",
        // minHeight: "calc(500px - 50px - 36px - 10px)",
        // height: "calc(100vh - 60px  - 50px - 36px - 10px)",
        height: "calc(100% - 8px)",
      }}
    >
      <Grid
        item
        sx={{
          pl: 0.5,
          paddingRight: "6px",
          my: 0.5,
          borderRight: "1.2px solid",
          borderColor: "text.disabled",
          height: "100%",
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
            onMouseLeave={handleMouseLeave}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#4B4B4B",
                writingMode: "vertical-rl",
                WebkitTransform: "rotate(180deg)",
                MozTransform: "rotate(180deg)",
                OTransform: "rotate(180deg)",
                msTransform: "rotate(180deg)",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {view === "Properties" || isHover === "Properties" ? (
                <>
                  <DashboardCustomizeOutlinedIcon /> Properties
                </>
              ) : (
                <DashboardCustomizeOutlinedIcon />
              )}
            </Typography>
          </ToggleButton>
          <ToggleButton
            value="Links"
            aria-label="links"
            sx={{ p: 1, display: isLinkOpen ? "flex" : "none" }}
            onMouseEnter={() => {
              handleMouseEnter("Links");
            }}
            onMouseLeave={handleMouseLeave}
          >
            <Typography
              variant="body2"
              sx={{
                color: "#4B4B4B",
                writingMode: "vertical-rl",
                WebkitTransform: "rotate(180deg)",
                MozTransform: "rotate(180deg)",
                OTransform: "rotate(180deg)",
                msTransform: "rotate(180deg)",
                textTransform: "capitalize",
                fontWeight: "bold",
              }}
            >
              {view === "Links" || isHover === "Links" ? (
                <>
                  <DashboardCustomizeOutlinedIcon /> Links
                </>
              ) : (
                <DashboardCustomizeOutlinedIcon />
              )}
            </Typography>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          mr: 1,
          marginLeft: "2px",
          width: "calc(100% - 52px)",
        }}
      >
        {view === "Properties" ? MyProperties : <></>}
        {view === "Links" ? <Grid>Links</Grid> : <></>}
      </Grid>
    </Grid>
  );
};

export default Properties;
