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
    const rows = getState().dataGridCodeList.rows
    function calculateWidth(type) {
        let max = Math.max(
            ...Object.keys(rows).map((e) => {
                return rows[e][type]?.length === undefined ? 0 : rows[e][type]?.length;
            })
        );

        return (Number.isNaN(max) ? 150 : max * 8 + 24) < 100 ? 100 : max * 8 + 24;
    }
    const columns = [
        {
            field: "CODE",
            headerName: "Code",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("CODE"),
            renderCell: renderEditcell,
        },
        {
            field: "CODE_TEXT",
            headerName: "Code Text",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("CODE_TEXT"),
            renderCell: renderEditcell,
        },
        {
            field: "PARENT",
            headerName: "Parent",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("PARENT"),
        },
        {
            field: "LEGACY_CODE",
            headerName: "Legacy Code",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("LEGACY_CODE"),
        },
        {
            field: "VAL1",
            headerName: "Val1",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "number",
            headerAlign: "left",
            align: "left",
            width: calculateWidth("VAL1"),
        },
        {
            field: "VAL2",
            headerName: "Val2",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "number",
            headerAlign: "left",
            align: "left",
            width: calculateWidth("VAL2"),
        },
        {
            field: "VAL3",
            headerName: "Val3",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "number",
            headerAlign: "left",
            align: "left",
            width: calculateWidth("VAL3"),
        },
        {
            field: "DATE1",
            headerName: "Date1",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "date",
            width: calculateWidth("DATE1"),
        },
        {
            field: "DATE2",
            headerName: "Date2",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            type: "date",
            width: calculateWidth("DATE2"),
        },
        {
            field: "CHAR1",
            headerName: "Char1",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("CHAR1"),
        },
        {
            field: "CHAR2",
            headerName: "Char2",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("CHAR2"),
        },
        {
            field: "CULTURE",
            headerName: "Culture",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("CULTURE"),
        },
        {
            field: "LAYER_NAME",
            headerName: "Layer Name",
            editable: dispatch(isNewUpdated("CODE_LIST")),
            width: calculateWidth("LAYER_NAME"),
            renderCell: renderEditcell,
        },
        {
            field: "HIDDEN",
            headerName: "Hidden",
            width: calculateWidth("HIDDEN"),
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
            width: calculateWidth("LAST_UPDT_USER"),
        },
        {
            field: "LAST_UPDT_DATE",
            headerName: "Last Update Date",
            editable: false,
            cellClassName: "super-app-theme--cell",
            width: calculateWidth("LAST_UPDT_DATE"),
        },
    ];
    return columns
}