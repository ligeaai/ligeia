import * as React from 'react';
import { GridEditInputCell } from '@mui/x-data-grid-pro';

import { isNewUpdated } from '../../../../services/utils/permissions';

function renderEditcell(params) {
    return (
        <GridEditInputCell {...params} disabled={!params.colDef.editable} placeholder="Mandatory" sx={{
            padding: "0px important", fontSize: "12px", "input": {
                padding: "0px"
            }
        }} />
    )
}


export const getColumns = () => (dispatch, getState) => {
    const columns = [
        {
            field: "CODE",
            headerName: "Code",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 150,
            renderCell: renderEditcell,
        },
        {
            field: "CODE_TEXT",
            headerName: "Code Text",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 150,
            renderCell: renderEditcell,
        },
        {
            field: "PARENT",
            headerName: "Parent",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 100,
        },
        {
            field: "LEGACY_CODE",
            headerName: "Legacy Code",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 100,
        },
        {
            field: "VAL1",
            headerName: "Val1",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "number",
            headerAlign: "left",
            align: "left",
            width: 100,
        },
        {
            field: "VAL2",
            headerName: "Val2",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "number",
            headerAlign: "left",
            align: "left",
            width: 100,
        },
        {
            field: "VAL3",
            headerName: "Val3",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "number",
            headerAlign: "left",
            align: "left",
            width: 100,
        },
        {
            field: "DATE1",
            headerName: "Date1",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "date",
            width: 100,
        },
        {
            field: "DATE2",
            headerName: "Date2",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "date",
            width: 100,
        },
        {
            field: "CHAR1",
            headerName: "Char1",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 100,
        },
        {
            field: "CHAR2",
            headerName: "Char2",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 100,
        },
        {
            field: "CULTURE",
            headerName: "Culture",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 100,
        },
        {
            field: "LAYER_NAME",
            headerName: "Layer Name",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: 100,
            renderCell: renderEditcell,
        },
        {
            field: "HIDDEN",
            headerName: "Hidden",
            width: 100,
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "singleSelect",
            valueOptions: ["True", "False"],
            renderCell: renderEditcell,
        },
        {
            field: "LAST_UPDT_USER",
            headerName: "Last Update User",
            editable: false,
            cellClassName: "super-app-theme--cell",
            width: 100,
        },
        {
            field: "LAST_UPDT_DATE",
            headerName: "Last Update Date",
            editable: false,
            cellClassName: "super-app-theme--cell",
            width: 100,
        },
    ];
    return columns
}