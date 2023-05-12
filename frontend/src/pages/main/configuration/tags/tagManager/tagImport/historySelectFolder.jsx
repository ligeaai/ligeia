import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box } from "@mui/material";

import {
  DialogHeaderHelper,
  FooterHelper,
  MyRadioButton,
} from "../../../../../components";
import TagService from "../../../../../services/api/tags";
import { showHistory } from "../../../../../services/actions/tagImport/tagImport";
const HistorySelect = ({ handleClose }) => {
  const dispatch = useDispatch();
  const [folderList, setFolderList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(false);
  const handleSave = () => {
    if (selectedFile) {
      dispatch(showHistory(selectedFile));
      handleClose();
    }
  };
  const handleToggle = (val) => {
    setSelectedFile(val);
  };
  React.useEffect(() => {
    async function myFunc() {
      let res = await TagService.historyFolderList();
      setFolderList(res.data);
    }
    myFunc();
  }, []);
  return (
    <React.Fragment>
      <Box>
        <DialogHeaderHelper text="Tag Import Helper Exel" />
      </Box>
      <Box>
        <MyRadioButton data={folderList} handleToggleFunc={handleToggle} />
      </Box>
      <Box>
        <FooterHelper handleClose={handleClose} handleSave={handleSave} />
      </Box>
    </React.Fragment>
  );
};

export default HistorySelect;
