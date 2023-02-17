import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import {
  closeAlarms,
  setAlarmsItem,
} from "../../../services/actions/alarms/alarms";
import { ItemSperatorLine } from "../../../components";
import { wsBaseUrl } from "../../../services/baseApi";

import AlarmsItem from "./alarmsItem";
let client = false;
var W3CWebSocket = require("websocket").w3cwebsocket;
const AlarmsBox = () => {
  const dispatch = useDispatch();
  const alarmsItem = useSelector((state) => state.alarms.alarmsItem);
  const handleUserClick = (e) => {
    if (!e.target.closest(".alarms")) {
      dispatch(closeAlarms());
    }
  };
  React.useEffect(() => {
    client = new W3CWebSocket(`${wsBaseUrl}/ws/alarms/KNOC`);
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("connected");
    };
    client.onclose = function () {
      console.log("WebSocket Client Closed");
    };
    client.onmessage = function (e) {
      async function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let jsonData = JSON.parse(e.data);
            dispatch(setAlarmsItem(jsonData));
            return true;
          }
        }
      }
      sendNumber();
    };
    window.addEventListener("click", handleUserClick);
    return () => {
      if (client) client.close();
      window.removeEventListener("click", handleUserClick);
    };
  }, []);
  return (
    <Grid
      className="alarms"
      container
      sx={{
        position: "absolute",
        backgroundColor: "background.secondary",
        width: "300px",
        right: "0",
        zIndex: 5,
        boxShadow: 3,
        borderRadius: 4,
        mt: "6px",
        color: "text.main",
      }}
    >
      <Grid item xs={12} sx={{ p: 2, pb: 0 }}>
        Alarms
      </Grid>
      <ItemSperatorLine />
      {alarmsItem.map((props, i) => (
        <AlarmsItem {...props} key={i} />
      ))}
    </Grid>
  );
};

export default AlarmsBox;
