import React from "react";
import {
    ErrorOutline,
    WarningAmberOutlined,
    InfoOutlined,
} from "@mui/icons-material";

import { dateFormatterDMY } from "../../utils/dateFormatter";

const alarmIcon = {
    1: <ErrorOutline fontSize="small" />,
    2: <WarningAmberOutlined fontSize="small" />,
    3: <InfoOutlined fontSize="small" />,
};

export const alarmHistory = [
    {
        field: "priority",
        headerName: "Priority",
        renderCell: (params) => {
            return alarmIcon[params.value]
        },
        flex: 1,
    },

    {
        field: "error_message",
        headerName: "Error Message",
        flex: 9,
    },
    {
        field: "timestamp",
        headerName: "Time",
        renderCell: (params) => {
            return dateFormatterDMY(new Date(params.value * 1000))
        },
        flex: 2,
    }
]