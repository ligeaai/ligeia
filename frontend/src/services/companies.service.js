<<<<<<< HEAD
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

=======
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

>>>>>>> a0d7b77f029b977fd804aed91e17ffad3b5bf592
export default CompaniesService;