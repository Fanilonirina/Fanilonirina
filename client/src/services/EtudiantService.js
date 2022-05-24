import http from "../http-common";

const getAll = () => {
  return http.get("/etudiants");
};

const getAllInsc = () => {
  return http.get("/etudiants_insc");
};

const getAllReInsc = () => {
  return http.get("/etudiants_reinsc");
};

const get = id => {
  return http.get(`/etudiants/${id}`);
};

const create = data => {
  return http.post("/etudiants", data);
};

const update = (id, data) => {
  return http.put(`/etudiants/${id}`, data);
};

const updateProfile = (id, data) => {
  return http.put(`/etudiants_profile/${id}`, data);
};

const updateReinscription = (id, data) => {
  return http.put(`/etudiantsre/${id}`, data, {
    headers : {
      "Content-Type": "multipart/form-data",
    }
  });
};

const remove = id => {
  return http.delete(`/etudiants/${id}`);
};

const removeAll = () => {
  return http.delete(`/etudiants`);
};

const findById = id => {
  return http.get(`/etudiants/${id}`);
};

const find = txt => {
  return http.get(`/etudiants/search/${txt}`);
};

const last = () => {
  return http.get(`/etudiants_last`);
};

const connect = (user)  => {
    return http.post(`/connexion/etudiant`, user);
};

const validation = (id,user)  => {
  return http.put(`/etudiants/validation/${id}`, user);
};

const validationRe = (id,user)  => {
  return http.put(`/etudiants/validationre/${id}`, user);
};

const findByIdInscription = (id,type) => {
  return http.get(`/inscriptions/${id}/${type}`);
};

const findByIdInscriptionAll = (id,type) => {
  return http.get(`/inscriptionarray/${id}/${type}`);
};

const findByIdQuitus = (id) => {
  return http.get(`/quitus/${id}`);
};

const isUserAuth = ()  => {
  return http.get(`/isUserAuth/`, {
    headers : {
      "x-access-token" : localStorage.getItem("token")
    }
  });
};

const EtudiantService = {
  getAll,
  getAllInsc,
  getAllReInsc,
  get,
  create,
  update,
  updateProfile,
  remove,
  removeAll,
  findById,
  find,
  last,
  connect,
  isUserAuth,
  validation,
  findByIdInscription,
  updateReinscription,
  findByIdInscriptionAll,
  findByIdQuitus,
  validationRe
};

export default EtudiantService;