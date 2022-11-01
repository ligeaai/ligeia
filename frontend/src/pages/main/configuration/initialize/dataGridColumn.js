import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { DataGridPro, GridEditInputCell } from '@mui/x-data-grid-pro';






function renderEditcell(params) {
    return (
        // <Tooltip
        //     open={parseInt(params.formattedValue.length) === 0}
        //     title={"Mandatory"}
        //     componentsProps={{
        //         tooltip: { sx: { backgroundColor: "primary.dark", position: "relative" } },
        //     }}
        // >
        <GridEditInputCell {...params} placeholder="Mandatory" sx={{ padding: "0px important" }} />
        // </Tooltip>
    )
}

const preProcessEditCellProps = async (params) => {
    const hasError = params.props.value.length === 0;
    return { ...params.props, error: hasError };
};

export const columns = [
    // {
    //     field: "LIST_TYPE",
    //     headerName: "List type",
    //     editable: true,
    //     width: 150
    // },
    {
        field: "CODE",
        headerName: "Code",
        editable: true,
        width: 150,
        // cellClassName: "mandatory"
        // "isValid": isInvalidBuildingTSI,
        // "cellClassName": isInvalidBuildingTSI(param.value) ? "invalid" : ""
        //preProcessEditCellProps,
        renderCell: renderEditcell,
    },
    {
        field: "CODE_TEXT",
        headerName: "Code Text",
        editable: true,
        width: 150,
        //preProcessEditCellProps,
        renderCell: renderEditcell,
    },
    {
        field: "PARENT",
        headerName: "Parent",
        editable: true,
        width: 100,
    },
    {
        field: "LEGACY_CODE",
        headerName: "Legacy Code",
        editable: true,
        width: 100
    },
    {
        field: "VAL1",
        headerName: "Val1",
        editable: true,
        type: "number",
        headerAlign: "left",
        align: "left",
        width: 100
    },
    {
        field: "VAL2",
        headerName: "Val2",
        editable: true,
        type: "number",
        headerAlign: "left",
        align: "left",
        width: 100
    },
    {
        field: "VAL3",
        headerName: "Val3",
        editable: true,
        type: "number",
        headerAlign: "left",
        align: "left",
        width: 100
    },
    // {
    //     field: "VAL4",
    //     headerName: "Val4",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },
    // {
    //     field: "VAL5",
    //     headerName: "Val5",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },
    // {
    //     field: "VAL6",
    //     headerName: "Val6",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },
    // {
    //     field: "VAL7",
    //     headerName: "Val7",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },
    // {
    //     field: "VAL8",
    //     headerName: "Val8",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },
    // {
    //     field: "VAL9",
    //     headerName: "Val9",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },
    // {
    //     field: "VAL10",
    //     headerName: "Val10",
    //     width: 100,
    //     editable: true,
    //     type: "number",
    // },

    {
        field: "DATE1",
        headerName: "Date1",
        editable: true,
        type: "date",
        width: 100
    },
    {
        field: "DATE2",
        headerName: "Date2",
        editable: true,
        type: "date",
        width: 100
    },
    // {
    //     field: "DATE3",
    //     headerName: "Date3",
    //     width: 100,
    //     editable: true,
    //     type: "date",
    // },
    // {
    //     field: "DATE4",
    //     headerName: "Date4",
    //     width: 100,
    //     editable: true,
    //     type: "date",
    // },
    // {
    //     field: "DATE5",
    //     headerName: "Date5",
    //     width: 100,
    //     editable: true,
    //     type: "date",
    // },

    {
        field: "CHAR1",
        headerName: "Char1",
        editable: true,
        width: 100
    },
    {
        field: "CHAR2",
        headerName: "Char2",
        editable: true,
        width: 100
    },
    // {
    //     field: "CHAR3",
    //     headerName: "Char3",
    //     width: 100,
    //     editable: true,
    // },
    // {
    //     field: "CHAR4",
    //     headerName: "Char4",
    //     width: 100,
    //     editable: true,
    // },
    // {
    //     field: "CHAR5",
    //     headerName: "Char5",
    //     width: 100,
    //     editable: true,
    // },
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
        //preProcessEditCellProps,
        renderCell: renderEditcell,
    },
    // {
    //     field: "DESCRIPTION_ID",
    //     headerName: "Description Id",
    //     width: 100,
    //     editable: true,
    // },
    {
        field: "HIDDEN",
        headerName: "Hidden",
        width: 100,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['True', 'False'],
        //preProcessEditCellProps,
        renderCell: renderEditcell,
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