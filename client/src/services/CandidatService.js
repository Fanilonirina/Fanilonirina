import http from "../http-common";

const getAll = () => {
  return http.get("/candidats");
};

const get = id => {
  return http.get(`/candidats/${id}`);
};

const create = data => {
  return http.post("/candidats", data);
};

const update = (id, data) => {
  return http.put(`/candidats/${id}`, data);
};

const send_mail = (id) => {
  return http.post(`/candidats/${id}`);
};

const remove = id => {
  return http.delete(`/candidats/${id}`);
};

const removeAll = () => {
  return http.delete(`/candidats`);
};

const findById = id => {
  return http.get(`/candidats/${id}`);
};

const find = txt => {
  return http.get(`/candidats/search/${txt}`);
};

const last = () => {
  return http.get(`/candidats_last`);
};

const CandidatService = {
  getAll,
  get,
  create,
  update,
  remove,
  send_mail,
  removeAll,
  findById,
  find,
  last,
};

export default CandidatService;