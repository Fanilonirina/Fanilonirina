import http from "../http-common";

const getAll = () => {
  return http.get("/quitus");
};

const get = id => {
  return http.get(`/quitus/${id}`);
};

const create = data => {
  return http.post("/quitus", data);
};

const update = (id, data) => {
  return http.put(`/quitus/${id}`, data);
};

const send_mail = (id) => {
  return http.post(`/quitus/${id}`);
};

const remove = id => {
  return http.delete(`/quitus/${id}`);
};

const removeAll = () => {
  return http.delete(`/quitus`);
};

const findById = id => {
  return http.get(`/quitus/${id}`);
};

const find = txt => {
  return http.get(`/quitus/search/${txt}`);
};

const last = () => {
  return http.get(`/quitus_last`);
};

const QuitusService = {
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

export default QuitusService;