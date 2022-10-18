import React from "react";

import { Grid, Typography } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import MyProperties from "../../pages/main/configuration/organization/properties";

const Properties = ({type}) => {
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
        minHeight: "calc(500px - 50px - 36px - 16px)",
        height: "calc(100vh - 60px - 4px - 50px - 36px - 16px)",
      }}
    >
      <Grid
        item
        sx={{
          px: 0.5,
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
            sx={{ p: 1 }}
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
      <Grid item xs={12} sx={{ mr: 1 }}>
        {view === "Properties" ? <MyProperties type={type}/> : <></>}
        {view === "Links" ? <Grid>Links</Grid> : <></>}
      </Grid>
    </Grid>
  );
};

export default Properties;