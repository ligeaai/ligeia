import React from "react";
import Box from "@mui/material/Box";
import DataGrid from "../../datagrid/dataGrid";
import { wsBaseUrl } from "../../../services/baseApi";
import { uuidv4 } from "../../../services/utils/uuidGenerator";
import {
  dateFormatterDMY,
  dateFormatDDMMYYHHMMSS,
} from "../../../services/utils/dateFormatter";
var W3CWebSocket = require("websocket").w3cwebsocket;
const Tabular = ({ highchartProps, backfillData }) => {
  const [allData, setAllData] = React.useState([]);
  React.useEffect(() => {
    const client = [];
    highchartProps.Inputs.map((tag, index) => {
      if (backfillData) {
        client[index] = new W3CWebSocket(
          `${wsBaseUrl}/ws/tags/backfill/${tag.TAG_ID}`
        );
      } else {
        client[index] = new W3CWebSocket(`${wsBaseUrl}/ws/tags/${tag.TAG_ID}`);
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
                jsonData.map((data) => {
                  setAllData((prev) => [
                    ...prev,
                    {
                      tag_name: tag.NAME,
                      completion: data.completion,
                      created_by: data.created_by,
                      createdTime: dateFormatterDMY(new Date(data.createdTime)),
                      layer: data.layer,
                      uom: data.uom,
                      timestamp: dateFormatterDMY(
                        new Date(data.timestamp * 1000)
                      ),
                      value: data.tag_value,
                      id: uuidv4(),
                    },
                  ]);
                });
                return true;
              }
              jsonData.map((data) => {
                Object.keys(data).map((f, i) => {
                  setAllData((prev) => [
                    ...prev,
                    {
                      tag_name: tag.NAME,
                      completion: data[f][0].completion,
                      created_by: data[f][0].created_by,
                      createdTime: dateFormatterDMY(
                        new Date(data[f][0].createdTime)
                      ),
                      layer: data[f][0].layer,
                      uom: data[f][0].uom,
                      timestamp: dateFormatDDMMYYHHMMSS(
                        new Date(data[f][1][0][0] * 1000)
                      ),
                      value: data[f][1][0][1],
                      id: uuidv4(),
                    },
                  ]);
                });
              });
              return true;
            }
          }
        }
        sendNumber();
      };
    });
    return () => {
      setAllData([]);

      client.map((e) => {
        console.log("tabular");
        e.close();
      });
    };
  }, [backfillData]);

  return (
    <Box sx={{ width: "100%", height: "100%", p: 1 }}>
      <DataGrid
        columns={[
          { field: "completion", headerName: "Asset" },
          { field: "tag_name", headerName: "Tag Name" },
          { field: "timestamp", headerName: "Time Stamp", type: "dateTime" },
          { field: "value", headerName: "Value" },
          { field: "uom", headerName: "UoM" },
          { field: "created_by", headerName: "Created By" },
          { field: "createdTime", headerName: "Created Time" },
          { field: "layer", headerName: "Layer" },
        ]}
        rows={allData}
      />
    </Box>
  );
};

export default Tabular;
