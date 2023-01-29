import React from "react";
import Box from "@mui/material/Box";
import DataGrid from "../../datagrid/dataGrid";
import { wsBaseUrl } from "../../../services/baseApi";
import { uuidv4 } from "../../../services/utils/uuidGenerator";
var W3CWebSocket = require("websocket").w3cwebsocket;
const client = [];
const Tabular = ({ highchartProps, width, height, backfillData }) => {
  const [allData, setAllData] = React.useState([]);
  React.useEffect(() => {
    highchartProps.Inputs.map((tag, index) => {
      console.log(index);
      if (client.length !== 0) {
        Promise.all(
          client.map((e) => {
            setAllData([]);
            e.onclose = function () {
              console.log("WebSocket Client Closed");
            };
          })
        );
      }
      if (backfillData) {
        client[index] = new W3CWebSocket(
          `${wsBaseUrl}/ws/tags/backfill/${tag.ROW_ID}`
        );
      } else {
        client[index] = new W3CWebSocket(`${wsBaseUrl}/ws/tags/${tag.ROW_ID}`);
      }
      client[index].onerror = function () {
        console.log("Connection Error");
      };
      client[index].onopen = function () {
        console.log("connedted");
      };

      client[index].onmessage = function (e) {
        async function sendNumber() {
          if (client.readyState === client.OPEN) {
            if (typeof e.data === "string") {
              let jsonData = JSON.parse(e.data);

              if (backfillData) {
                console.log(jsonData);
                setAllData((prev) => [
                  ...prev,
                  {
                    created_by: tag.NAME,
                    timestamp: jsonData.timestamp,
                    value: jsonData.tag_value,
                    id: uuidv4(),
                  },
                ]);
                return true;
              }
              Promise.all(
                Object.keys(jsonData).map((f, i) => {
                  console.log(i);
                  jsonData[f][1].map((d) => {
                    setAllData((prev) => [
                      ...prev,
                      {
                        created_by: tag.NAME,
                        timestamp: d[0],
                        value: d[1],
                        id: uuidv4(),
                      },
                    ]);
                  });
                })
              );
              return true;
            }
          }
        }
        sendNumber();
      };
    });
    console.log(client);
    return () => {
      client.map((e) => {
        setAllData([]);
        e.onclose = function () {
          console.log("WebSocket Client Closed");
        };
      });
    };
  }, [backfillData]);

  return (
    <Box sx={{ width: width, height: height }}>
      <DataGrid
        columns={[
          { field: "created_by", headerName: "Created By" },
          //  { field: "createdtime", headerName: "Created Time" },
          //  { field: "message_type", headerName: "Message Type" },
          { field: "timestamp", headerName: "Time Stamp" },
          { field: "value", headerName: "Value" },
        ]}
        rows={allData}
      />
    </Box>
  );
};

export default Tabular;
