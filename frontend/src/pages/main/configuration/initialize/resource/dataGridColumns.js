import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DataGridPro, GridEditInputCell } from '@mui/x-data-grid-pro';




const preProcessEditCellProps = async (params) => {
    const hasError = params.props.value.length === 0;
    return { ...params.props, error: hasError };
};

export const columns = [
    {
        field: "ID",
        headerName: "Id",
        editable: true,
        width: 150,
    },
    {
        field: "SHORT_LABEL",
        headerName: "Short Label",
        editable: true,
        width: 150,
    },
    {
        field: "MOBILE_LABEL",
        headerName: "Mobile Label",
        editable: true,
        width: 150,
    },
    {
        field: "PARENT",
        headerName: "Parent",
        editable: true,
        width: 100
    },

    {
        field: "CULTURE",
        headerName: "Culture",
        editable: true,
        width: 100
    },
    {
        field: "LAYER_NAME",
        headerName: "Layer Name",
        editable: true,
        width: 100,
    },
    {
        field: "HIDDEN",
        headerName: "Hidden",
        width: 100,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['True', 'False'],
    },
    {
        field: "LAST_UPDT_USER",
        headerName: "Last Update User",
        editable: false,
        cellClassName: "super-app-theme--cell",
        width: 100
    },
    {
        field: "LAST_UPDT_DATE",
        headerName: "Last Update Date",
        editable: false,
        cellClassName: "super-app-theme--cell",
        width: 100
    },
];