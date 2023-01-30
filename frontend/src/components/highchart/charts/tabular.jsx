import React from "react";
import Box from "@mui/material/Box";
import DataGrid from "../../datagrid/dataGrid";
import { wsBaseUrl } from "../../../services/baseApi";
import { uuidv4 } from "../../../services/utils/uuidGenerator";
import { dateFormatterDMY } from "../../../services/utils/dateFormatter";
var W3CWebSocket = require("websocket").w3cwebsocket;
const client = [];
const Tabular = ({ highchartProps, width, height, backfillData }) => {
  const [allData, setAllData] = React.useState([]);
  React.useEffect(() => {
    highchartProps.Inputs.map((tag, index) => {
      console.log(index);

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
      client[index].onclose = function () {
        console.log("WebSocket Client Closed");
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
                    tag_name: tag.NAME,
                    completion: jsonData.completion,
                    created_by: jsonData.created_by,
                    createdTime: dateFormatterDMY(
                      new Date(jsonData.createdTime)
                    ),
                    layer: jsonData.layer,
                    uom: jsonData.uom,
                    timestamp: dateFormatterDMY(
                      new Date(jsonData.timestamp * 1000)
                    ),
                    value: jsonData.tag_value,
                    id: uuidv4(),
                  },
                ]);
                return true;
              }
              Promise.all(
                Object.keys(jsonData).map((f, i) => {
                  console.log(jsonData);

                  setAllData((prev) => [
                    ...prev,
                    {
                      tag_name: tag.NAME,
                      completion: jsonData[f][0].completion,
                      created_by: jsonData[f][0].created_by,
                      createdTime: dateFormatterDMY(
                        new Date(jsonData[f][0].createdTime)
                      ),
                      layer: jsonData[f][0].layer,
                      uom: jsonData[f][0].uom,
                      timestamp: jsonData[f][1][0][0],
                      value: jsonData[f][1][0][1],
                      id: uuidv4(),
                    },
                  ]);
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
        e.close();
      });
    };
  }, [backfillData]);

  return (
    <Box sx={{ width: width, height: height }}>
      <DataGrid
        columns={[
          { field: "tag_name", headerName: "Tag Name" },
          { field: "completion", headerName: "Completion" },
          { field: "created_by", headerName: "Created By" },
          { field: "createdTime", headerName: "Created Time" },
          { field: "layer", headerName: "Layer" },
          { field: "uom", headerName: "UoM" },
          //  { field: "createdtime", headerName: "Created Time" },
          //  { field: "message_type", headerName: "Message Type" },
          { field: "timestamp", headerName: "Time Stamp", type: "dateTime" },
          { field: "value", headerName: "Value" },
        ]}
        rows={allData}
      />
    </Box>
  );
};

export default Tabular;
