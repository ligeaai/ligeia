import React from "react";
import { useSelector } from "react-redux";

import { DataGrid } from "../../../../components";
import { usersColumn } from "./column";

const UserEditor = () => {
  const rows = useSelector((state) => state.users.users);

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
