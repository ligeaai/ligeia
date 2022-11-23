import React from "react";

import { MyBox } from "../../../../../components";

import LinkEditor from "./linkEditor";
const Links = ({ type }) => {
  return <MyBox Element={<LinkEditor type={type} />} />;
};

export default Links;
