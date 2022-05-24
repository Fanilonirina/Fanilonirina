import http from "../http-common";

const getAll = () => {
  return http.get("/personnels");
};

const get = id => {
  return http.get(`/personnels/${id}`);
};

const create = data => {
  return http.post("/personnels", data);
};

const update = (id, data) => {
  return http.put(`/personnels/${id}`, data);
};

const send_mail = (id) => {
  return http.post(`/personnels/${id}`);
};

const remove = id => {
  return http.delete(`/personnels/${id}`);
};

const removeAll = () => {
  return http.delete(`/personnels`);
};

const findById = id => {
  return http.get(`/personnels/${id}`);
};

const find = txt => {
  return http.get(`/personnels/search/${txt}`);
};

const last = () => {
  return http.get(`/personnels_last`);
};

const PersonnelService = {
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

export default PersonnelService;