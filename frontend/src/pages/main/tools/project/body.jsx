import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Select, MyTextField, MyNumberTextField } from "../../../../components";
import { Box } from "@mui/material";
import {
  setBodyConfirmation,
  setSaveFunctonConfirmation,
  setTitleConfirmation,
} from "../../../../services/actions/confirmation/historyConfirmation";
import {
  updateData,
  loadDatabases,
  loadKubernetes,
  saveProject,
  cleanProjectData,
  loadProject,
} from "../../../../services/actions/project/project";
import { useIsMount } from "../../../../hooks/useIsMount";
const Postgre = () => {
  const isMount = useIsMount();
  const dispatch = useDispatch();
  const values = useSelector((state) => state.project?.databases);
  const defaultValue = useSelector((state) => state.project?.data?.DATA_SOURCE);
  React.useEffect(() => {
    if (!isMount && defaultValue) dispatch(loadKubernetes());
  }, [defaultValue]);
  return (
    <Select
      values={values}
      valuesPath="CODE"
      dataTextPath="CODE_TEXT"
      handleChangeFunc={(value) => {
        dispatch(updateData("DATA_SOURCE", value));
      }}
      defaultValue={defaultValue}
    />
  );
};

const Kubernetes = () => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.project?.kubernetes);
  const defaultValue = useSelector((state) => state.project?.data?.DB_SETTINGS);
  return (
    <Select
      values={values}
      dataTextPath="NAME"
      valuesPath="HOST"
      handleChangeFunc={(value) => {
        dispatch(updateData("DB_SETTINGS", value));
      }}
      defaultValue={defaultValue}
    />
  );
};

const ProjectName = () => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.project?.data?.LAYER_NAME);
  return (
    <MyTextField
      defaultValue={defaultValue}
      handleChangeFunc={(value) => {
        dispatch(updateData("LAYER_NAME", value));
      }}
    />
  );
};

const LayerLevel = () => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.project?.data?.LAYER_LEVEL);
  return (
    <MyNumberTextField
      defaultValue={defaultValue}
      handleChangeFunc={(value) => {
        dispatch(updateData("LAYER_LEVEL", value));
      }}
    />
  );
};

const LayerOrder = () => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.project?.data?.LAYER_ORDER);
  return (
    <MyNumberTextField
      defaultValue={defaultValue}
      handleChangeFunc={(value) => {
        dispatch(updateData("LAYER_ORDER", value));
      }}
    />
  );
};

const Body = () => {
  const dispatch = useDispatch();
  const selectedIndex = useSelector(
    (state) => state.treeview.selectedItem.selectedIndex
  );
  const name = useSelector((state) => state.treeview.selectedItem.LAYER_NAME);

  React.useEffect(() => {
    dispatch(loadDatabases());
    dispatch(setSaveFunctonConfirmation(saveProject));
    dispatch(setTitleConfirmation("Are you sure you want to save this ? "));
    dispatch(setBodyConfirmation(`${name ? name : "new"}`));
    if (selectedIndex !== -3) dispatch(cleanProjectData());
    if (selectedIndex !== -2 && selectedIndex !== -3) {
      dispatch(loadProject());
    }
  }, [selectedIndex, name]);

  return (
    <Box className="project-container__body">
      <Box className="project-container__body__input-container">
        <Box className="project-container__body__input-container__label">
          Data Source
        </Box>
        <Box className="project-container__body__input-container__input">
          <Postgre />
        </Box>
      </Box>
      <Box className="project-container__body__input-container">
        <Box className="project-container__body__input-container__label">
          Kubernetes
        </Box>
        <Box className="project-container__body__input-container__input">
          <Kubernetes />
        </Box>
      </Box>
      <Box className="project-container__body__input-container">
        <Box className="project-container__body__input-container__label">
          Project Name
        </Box>
        <Box className="project-container__body__input-container__input">
          <ProjectName />
        </Box>
      </Box>
      <Box className="project-container__body__input-container">
        <Box className="project-container__body__input-container__label">
          Layer Level
        </Box>
        <Box className="project-container__body__input-container__input">
          <LayerLevel />
        </Box>
      </Box>
      <Box className="project-container__body__input-container">
        <Box className="project-container__body__input-container__label">
          Layer Order
        </Box>
        <Box className="project-container__body__input-container__input">
          <LayerOrder />
        </Box>
      </Box>
    </Box>
  );
};

export default Body;
