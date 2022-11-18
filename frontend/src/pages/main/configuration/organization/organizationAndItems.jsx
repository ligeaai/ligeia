import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cleanAllDataGrid } from "../../../../services/actions/company/datagrid";
import { cleanAllTreeMenu } from "../../../../services/actions/company/item";
import { cleanAllLinks } from "../../../../services/actions/company/linkEditor";
import Company from "./unitOne";
const OrganizationAndItems = (props) => {
  const dispatch = useDispatch();
  //const { type } = useParams();
  const { isHome } = props;
  const type = useSelector((state) => state.drawerMenu.selectedItem.TYPE);
  React.useEffect(() => {
    if (isHome) {
      dispatch(cleanAllDataGrid());
      dispatch(cleanAllTreeMenu());
      dispatch(cleanAllLinks());
    }
  }, [isHome]);

  return <Company type={type} />;
};

export default OrganizationAndItems;
