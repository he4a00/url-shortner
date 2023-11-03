import axios from "axios";

const api = axios.create({
  //   baseURL: "https://students-system-api-isyj.onrender.com/api/",
  baseURL: "http://localhost:9090/",
});

export default api;
