import {
    GridEditBooleanCell,
} from "@mui/x-data-grid-pro";
const cell = {
    renderCell: (params) => {
        return <GridEditBooleanCell
            checked={params.value}
            type="checkbox"
            {...params}
        />
    },
    renderEditCell: (params) => {
        return <GridEditBooleanCell
            checked={params.value}
            type="checkbox"
            {...params}
        />
    }
}

export const columns = [
    {
        field: "ROLES_TYPES",
        headerName: "Type",
        flex: 1.5,
    },

    {
        field: "CREATE",
        headerName: "Create",
        flex: 1,
        ...cell
    },

    {
        field: "READ",
        headerName: "Read",
        flex: 1,
        ...cell
    },

    {
        field: "UPDATE",
        headerName: "Update",
        flex: 1,
        ...cell
    },

    {
        field: "DELETE",
        headerName: "Delete",
        flex: 1,
        ...cell
    }
]