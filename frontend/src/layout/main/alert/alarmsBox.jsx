import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import {
  closeAlarms,
  setAlarmsItem,
} from "../../../services/actions/alarms/alarms";
import { wsBaseUrl } from "../../../services/baseApi";
import { SnackbarProvider, useSnackbar } from "notistack";
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
            console.log(jsonData);
            dispatch(setAlarmsItem(jsonData.slice(-5)));
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
    <Box
      sx={{
        "& .SnackbarContainer-root": {
          marginTop: "50px",
        },
      }}
    >
      <SnackbarProvider
        maxSnack={5}
        className="alarms"
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={null}
      >
        {alarmsItem.map((e, i) => {
          return <AlarmsItem {...e} key={i} />;
        })}
      </SnackbarProvider>
    </Box>
  );
};

export default AlarmsBox;
