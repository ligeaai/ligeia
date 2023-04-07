import React from "react";

import { DataGrid } from "../../../../components";

import { usersColumn } from "./column";
import { useSelector } from "react-redux";
const UserEditor = () => {
  const rows = useSelector((state) => state.users.users);
  return <DataGrid columns={usersColumn} rows={rows} />;
};

export default UserEditor;
