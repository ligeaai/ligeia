import * as React from "react";
import BadgeUnstyled, { badgeUnstyledClasses } from "@mui/base/BadgeUnstyled";
import { styled } from "@mui/material/styles";
import { Box, Grid, IconButton } from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from "react-redux";
import AlertBox from "./alarmsBox";
import {
  openAlarms,
  closeAlarms,
} from "../../../services/actions/alarms/alarms";

const StyledBadge = styled(BadgeUnstyled)(
  ({ theme }) => `
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 18px;
        list-style: none;
        font-family: IBM Plex Sans, sans-serif;
        position: relative;
        display: inline-block;
        line-height: 1;
      
        & .${badgeUnstyledClasses.badge} {
          z-index: auto;
          position: absolute;
          top: 3px;
          right: 3px;
          min-width: 22px;
          height: 22px;
          background:#EA5455;
          color: #fff;
          font-weight: 600;
          font-size: 12px;
          line-height: 22px;
          white-space: nowrap;
          text-align: center;
          border-radius: 12px;
          transform: translate(50%, -50%);
          transform-origin: 100% 0; 
        }
        `
);
const AlertIcon = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.alarms.isOpen);
  return (
    <Grid className="alarms" item sx={{ position: "relative" }}>
      <IconButton
        sx={{
          height: "49px",
          width: "49px !important",
        }}
        onClick={() => {
          isOpen ? dispatch(closeAlarms()) : dispatch(openAlarms());
        }}
      >
        <StyledBadge badgeContent={8} max={99}>
          <NotificationsNoneIcon
            sx={{
              color: "primary.light",
            }}
          />
        </StyledBadge>
      </IconButton>
      {isOpen ? <AlertBox /> : <></>}
    </Grid>
  );
};

export default AlertIcon;
