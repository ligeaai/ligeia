import axios from "axios";
import authHeader from "./auth-header";

const getAll = () => {
  return axios.get("http://127.0.0.1:8000/api/v1/models/company/", { headers: authHeader() });
};

const get = id => {
  return axios.get(`http://127.0.0.1:8000/api/v1/models/company/${id}/`, { headers: authHeader() });
};

const create = data => {
  return axios.post("http://127.0.0.1:8000/api/v1/models/company/", data, { headers: authHeader() });
};

const update = (id, data) => {
  return axios.patch(`http://127.0.0.1:8000/api/v1/models/company/${id}/`, data, { headers: authHeader() });
};

const remove = id => {
  return axios.delete(`http://127.0.0.1:8000/api/v1/models/company/${id}`, { headers: authHeader() });
};

const removeAll = () => {
  return axios.delete(`/...`);
};

const findByTitle = title => {
  return axios.get(`/tutorials?title=${title}`);
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