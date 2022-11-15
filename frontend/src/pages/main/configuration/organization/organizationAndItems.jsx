import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanAllDataGrid } from "../../../../services/actions/company/datagrid";
import { cleanAllTreeMenu } from "../../../../services/actions/company/item";
import { cleanAllLinks } from "../../../../services/actions/company/linkEditor";
import Company from "./unitOne";
const OrganizationAndItems = (props) => {
  const dispatch = useDispatch();
  const { type } = useParams();
  const { isHome } = props;
  console.log(type);
  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanAllDataGrid());
      dispatch(cleanAllTreeMenu());
      dispatch(cleanAllLinks());
    }
  }, [isHome]);

  return <Company type={type.toUpperCase()} />;
};

export default OrganizationAndItems;
