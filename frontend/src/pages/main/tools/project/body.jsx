import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Select, MyTextField } from "../../../../components";
import { Box } from "@mui/material";

import { updateData } from "../../../../services/actions/project/project";

const Postgre = () => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.project?.data?.Postgre);

  return (
    <Select
      values={["", "Posrtgre SQL"]}
      handleChangeFunc={(value) => {
        dispatch(updateData("Postgre", value));
      }}
      defaultValue={defaultValue}
    />
  );
};

const Kubernetes = () => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.project?.data?.Kubernetes);
  return (
    <Select
      values={["", "ASD", "dsa"]}
      handleChangeFunc={(value) => {
        dispatch(updateData("Kubernetes", value));
      }}
      defaultValue={defaultValue}
    />
  );
};

const ProjectName = () => {
  const dispatch = useDispatch();
  const defaultValue = useSelector((state) => state.project?.data?.ProjectName);
  return (
    <MyTextField
      defaultValue={defaultValue}
      handleChangeFunc={(value) => {
        dispatch(updateData("ProjectName", value));
      }}
    />
  );
};

const Body = () => {
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
    </Box>
  );
};

export default Body;
