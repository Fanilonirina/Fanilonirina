import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000/eni/",
  headers: {
    "Content-type": "application/json;charset=UTF-8",
  },
  withCredentials: true
});