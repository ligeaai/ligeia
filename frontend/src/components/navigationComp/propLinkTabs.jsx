import React from "react";

import { Grid, Divider, Typography } from "@mui/material";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import { useDispatch } from "react-redux";
import "../../assets/styles/layouts/proplink.scss";
const Properties = ({ MyProperties, isLinkOpen = true, MyLinks }) => {
  const dispatch = useDispatch();
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
  React.useEffect(() => {
    if (view === "Properties") {
      dispatch({
        type: "SET_LINK_ACTIVE",
        payload: false,
      });
    } else {
      dispatch({
        type: "SET_LINK_ACTIVE",
        payload: true,
      });
    }
  }, [view]);
  return (
    <Grid container flexWrap={"noWrap"} className="prop-link-container">
      <Grid item className="prop-link-container__btn-group">
        <ToggleButtonGroup
          orientation="vertical"
          value={view}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            value="Properties"
            aria-label="properties"
            className="prop-link-container__btn-group__btn"
            onMouseEnter={() => {
              handleMouseEnter("Properties");
            }}
            onMouseLeave={handleMouseLeave}
          >
            <Typography
              variant="body2"
              className="prop-link-container__btn-group__btn__text"
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
            className={`prop-link-container__btn-group__btn ${
              isLinkOpen ? "" : "prop-link-container__btn-group__display"
            }`}
            onMouseEnter={() => {
              handleMouseEnter("Links");
            }}
            onMouseLeave={handleMouseLeave}
          >
            <Typography
              variant="body2"
              className="prop-link-container__btn-group__btn__text"
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
      <Divider
        orientation="vertical"
        flexItem
        className="prop-link-container__divider"
      />
      <Grid item xs={12} className="prop-link-container__body">
        {view === "Properties" ? MyProperties : <></>}
        {view === "Links" ? MyLinks : <></>}
      </Grid>
    </Grid>
  );
};

export default Properties;
