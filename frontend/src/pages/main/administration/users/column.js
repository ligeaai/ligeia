import React from "react";

import { IconButton, Box } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import { MyDialog } from "../../../../components";

import { swapYearAndDay } from "../../../../services/utils/dateFormatter";

import UpdateDialogBody from "./updateDialogBody"

export const usersColumn = [
    {
        field: "first_name",
        headerName: "Name",
        flex: 1,
    },
    {
        field: "last_name",
        headerName: "Surname",
        flex: 1,
    },
    {
        field: "email",
        headerName: "Email",
        flex: 2,
    },
    {
        field: "role",
        headerName: "Role",
        flex: 1,
        renderCell: (params) => {
            return params?.role?.ROLES_NAME
        },
    },
    {
        field: "date_joined",
        headerName: "Joined Date",
        renderCell: (params) => {
            return swapYearAndDay(params.value)
        },
        flex: 1,
    },
    {
        field: "layer_name",
        headerName: "Layer Name",
        renderCell: (params) => {
            return params.value.map((e, i) => {
                return <Box key={i}>{e}, </Box>
            })
        },
        flex: 2,
    },
    {
        field: "edit",
        headerName: "",
        renderCell: (params) => <MyDialog
            Button={
                <IconButton>
                    <EditIcon />
                </IconButton>
            }
            DialogBody={UpdateDialogBody}
            rowData={params.row}
        />,
        flex: 0.2,
    }
]