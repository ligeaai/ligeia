import React from "react";
import DataGrid from "../../datagrid/dataGrid";
import { wsBaseUrl } from "../../../services/baseApi";
import { uuidv4 } from "../../../services/utils/uuidGenerator";
import {
  dateFormatterDMY,
  dateFormatDDMMYYHHMMSS,
} from "../../../services/utils/dateFormatter";
import TagService from "../../../services/api/tags";
var W3CWebSocket = require("websocket").w3cwebsocket;
const Tabular = ({ highchartProps, backfillData }) => {
  const [allData, setAllData] = React.useState([]);
  React.useEffect(() => {
    const client = [];
    if (highchartProps.Inputs) {
      highchartProps.Inputs.map(async (tag, index) => {
        // if (backfillData) {
        //   client[index] = new W3CWebSocket(
        //     `${wsBaseUrl}/ws/tags/backfill/${tag.TAG_ID}`
        //   );
        // } else {

        let res = await TagService.tabularLiveData(tag.TAG_ID);
        res.data.map((e, i) => {
          e["tag_name"] = tag.NAME;
          e["id"] = i;
        });
        setAllData(res.data);
        client[index] = new W3CWebSocket(
          `${wsBaseUrl}/ws/tabular/${tag.TAG_ID}/${
            res.data[res.data.length - 1]?.[0]
              ? res.data[res.data.length - 1][0]
              : 0
          }/${
            highchartProps["Widget Refresh (seconds)"] === ""
              ? 5
              : parseInt(highchartProps["Widget Refresh (seconds)"])
          }/${res.data.length}/`
        );
        // }
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

                // if (backfillData) {
                //   jsonData.map((data) => {
                //     setAllData((prev) => [
                //       ...prev,
                //       {
                //         tag_name: tag.NAME,
                //         completion: data.completion,
                //         created_by: data.created_by,
                //         createdTime: dateFormatterDMY(new Date(data.createdTime)),
                //         layer: data.layer,
                //         uom: data.uom,
                //         timestamp: dateFormatterDMY(
                //           new Date(data.timestamp * 1000)
                //         ),
                //         value: data.tag_value,
                //         id: uuidv4(),
                //       },
                //     ]);
                //   });
                //   return true;
                // }
                jsonData.map((data) => {
                  setAllData((prev) => {
                    return [
                      ...prev,
                      { ...data, id: uuidv4(), tag_name: tag.NAME },
                    ];
                  });
                });
                return true;
              }
            }
          }
          sendNumber();
        };
      });
    }
    return () => {
      setAllData([]);

      client.map((e) => {
        e.close();
      });
    };
  }, [backfillData, highchartProps?.Inputs?.length]);

  return (
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
  );
};

export default Tabular;
