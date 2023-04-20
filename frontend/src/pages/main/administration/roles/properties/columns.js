import {
    GridEditBooleanCell,
} from "@mui/x-data-grid-pro";
import { Checkbox } from "@mui/material";
import { isNewUpdated } from "../../../../../services/utils/permissions"
import {
    editCell,

} from "../../../../../services/actions/roles/properties";

export const getColumns = () => (dispatch, getState) => {
    const cell = {
        renderCell: (params) => {
            return <Checkbox
                {...params}
                disabled={!params.colDef.editable}
                onChange={(value) => {
                    console.log(params);
                    console.log(params.id);
                    dispatch(
                        editCell(params.id, params.field, value.target.checked)
                    );
                }}
                checked={params.value}

                sx={{ margin: "auto" }}
            />
        },
        renderEditCell: (params) => {
            return <Checkbox
                {...params}
                disabled={!params.colDef.editable}
                onChange={(value) => {
                    dispatch(
                        editCell(params.id, params.field, value.target.checked)
                    );
                }}
                checked={params.value}

                sx={{ margin: "auto" }}
            />
        }
    }
    const columns = [
        {
            field: "ROLES_TYPES",
            headerName: "Type",
            flex: 1.5,

        },

        {
            field: "CREATE",
            headerName: "Create",
            flex: 1,
            editable: dispatch(isNewUpdated("ROLES")),
            ...cell
        },

        {
            field: "READ",
            headerName: "Read",
            flex: 1,
            editable: dispatch(isNewUpdated("ROLES")),
            ...cell
        },

        {
            field: "UPDATE",
            headerName: "Update",
            flex: 1,
            editable: dispatch(isNewUpdated("ROLES")),
            ...cell
        },

        {
            field: "DELETE",
            headerName: "Delete",
            flex: 1,
            editable: dispatch(isNewUpdated("ROLES")),
            ...cell
        }
    ]
    return columns
}