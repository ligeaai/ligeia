import React from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { wsBaseUrl } from "../../../../../services/baseApi";

var W3CWebSocket = require("websocket").w3cwebsocket;

function LinearProgressWithLabel(props) {
  return (
    <Box className="tag-import-container__property-box__progress-bar__box">
      <Box className="tag-import-container__property-box__progress-bar__box__linear-progress">
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box className="tag-import-container__property-box__progress-bar__box__percent">
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
let client;
const Body = () => {
  const [log, setLog] = React.useState(["AA", "SS", "DD", "FF", "GG"]);
  const [progress, setProgress] = React.useState(50);
  React.useEffect(() => {
    if (client) client.close();
    try {
      client = new W3CWebSocket(`${wsBaseUrl}`);
    } catch (err) {
      console.log(err);
    }
    client.onerror = function () {
      console.log("Connection Error");
    };
    client.onopen = function () {
      console.log("WebSocket Client Connected Angular");
    };
    client.onclose = function () {
      console.log("WebSocket Client Closed");
    };
    client.onmessage = function (e) {
      function sendNumber() {
        if (client.readyState === client.OPEN) {
          if (typeof e.data === "string") {
            let data = JSON.parse(e.data);
            console.log(data);

            setLog(data);

            return data;
          }
        }
      }
      sendNumber();
    };
    return () => {
      client.close();
    };
  }, []);
  return (
    <React.Fragment>
      <Box className="tag-import-container__property-box__progress-bar">
        <LinearProgressWithLabel value={progress} />
      </Box>

      <Box className="tag-import-container__property-box__logs">
        <Grid container rowGap={0.5}>
          {log.map((e) => {
            return (
              <Grid item xs={12}>
                {e}
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default Body;
