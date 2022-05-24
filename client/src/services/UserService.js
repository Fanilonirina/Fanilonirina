import http from "../http-common";

const getAll = () => {
  return http.get("/utilisateurs");
};

const get = id => {
  return http.get(`/utilisateurs/${id}`);
};

const create = data => {
  return http.post("/utilisateurs", data);
};

const update = (id, data) => {
  return http.put(`/utilisateurs/${id}`, data);
};

const remove = id => {
  return http.delete(`/utilisateurs/${id}`);
};

const removeAll = () => {
  return http.delete(`/utilisateurs`);
};

const findById = id => {
  return http.get(`/utilisateurs/${id}`);
};

const find = txt => {
  return http.get(`/utilisateurs/search/${txt}`);
};

const last = () => {
  return http.get(`/utilisateurs_last`);
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

const CandidatService = {
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

export default CandidatService;