import React from "react";
import { useParams } from "react-router-dom";

import Company from "./unitOne";
const OrganizationAndItems = () => {
  const { type } = useParams();
  return <Company type={type.toUpperCase()} />;
};

export default OrganizationAndItems;
