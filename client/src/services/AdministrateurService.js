import http from "../http-common";

const getAll = () => {
  return http.get("/administrateurs");
};

const get = id => {
  return http.get(`/administrateurs/${id}`);
};

const create = data => {
  return http.post("/administrateurs", data);
};

const update = (id, data) => {
  return http.put(`/administrateurs/${id}`, data);
};

const remove = id => {
  return http.delete(`/administrateurs/${id}`);
};

const removeAll = () => {
  return http.delete(`/administrateurs`);
};

const findById = id => {
  return http.get(`/administrateurs/${id}`);
};

const find = txt => {
  return http.get(`/administrateurs/search/${txt}`);
};

const last = () => {
  return http.get(`/administrateurs_last`);
};

const connect = (user)  => {
    return http.post(`/connexion/admin`, user);
};

const isUserAuth = ()  => {
  return http.get(`/isUserAuth/`, {
    headers : {
      "x-access-token" : localStorage.getItem("token")
    }
  });
};

const AdministrateurService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findById,
  find,
  last,
  connect,
  isUserAuth
};

export default AdministrateurService;