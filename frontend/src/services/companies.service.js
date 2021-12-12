import http from "../http-common";
import authHeader from "./auth-header";

const getAll = () => {
  return http.get("http://127.0.0.1:8000/api/v1/models/company/",);
};

const get = id => {
  return http.get(`http://127.0.0.1:8000/api/v1/models/company/${id}/`);
};

const create = data => {
  return http.post("http://127.0.0.1:8000/api/v1/models/company/", data);
};

const update = (id, data) => {
  return http.patch(`http://127.0.0.1:8000/api/v1/models/company/${id}/`, data);
};

const remove = id => {
  return http.delete(`http://127.0.0.1:8000/api/v1/models/company/${id}`);
};

const removeAll = () => {
  return http.delete(`/...`);
};

const findByTitle = title => {
  return http.get(`/tutorials?title=${title}`);
};

const CompaniesService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default CompaniesService;