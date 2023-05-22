import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Chip } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { DataGrid } from "../../../../components";

import { swapYearAndDay } from "../../../../services/utils/dateFormatter";
import {
  deleteUser,
  toggleLayer,
  toggleRoles,
} from "../../../../services/actions/users/users";

const UserEditor = () => {
  const dispatch = useDispatch();
  const rows = useSelector((state) => state.users.users);
  const layers = useSelector((state) => state.users.layers);
  const roles = useSelector((state) => state.users.roles);
  const instantUserId = useSelector((state) => state.auth.user.id);
  const usersColumn = [
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
        return roles.map((role) => {
          return (
            <>
              <Chip
                label={role.ROLES_NAME}
                color="secondary"
                variant={
                  role.ROLES_ID === params?.value ? "filled" : "outlined"
                }
                onClick={() => {
                  dispatch(toggleRoles(role, params.row.id));
                }}
                size="small"
                sx={{ mr: 0.5 }}
              />
            </>
          );
        });
      },
    },
    {
      field: "date_joined",
      headerName: "Joined Date",
      renderCell: (params) => {
        return swapYearAndDay(params.value);
      },
      flex: 1,
    },
    {
      field: "layer_name",
      headerName: "Layer Name",
      renderCell: (params) => {
        return layers.map((layer) => {
          return (
            <>
              <Chip
                label={layer}
                color="secondary"
                variant={
                  params.value.find((e) => e === layer) !== undefined
                    ? "filled"
                    : "outlined"
                }
                onClick={() => {
                  dispatch(toggleLayer(layer, params.row.id));
                }}
                size="small"
                sx={{ mr: 0.5, display: "block" }}
              />
            </>
          );
        });
      },
      flex: 2,
    },
    {
      field: "edit",
      headerName: "",
      renderCell: (params) => (
        <IconButton
          onClick={() => {
            dispatch(deleteUser(params.row.id, params.row.email));
          }}
          disabled={params.row.id === instantUserId}
        >
          <ClearIcon
            color={params.row.id === instantUserId ? "disabled" : "error"}
          />
        </IconButton>
      ),
      flex: 0.2,
    },
  ];
  return (
    <DataGrid
      columns={usersColumn}
      rows={rows}
      pagination
      autoPageSize={true}
      componentsProps={{
        footer: {
          style: { justifyContent: "flex-start" },
        },
      }}
    />
  );
};

export default UserEditor;
