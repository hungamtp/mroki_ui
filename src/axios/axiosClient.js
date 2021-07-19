import axios from "axios";

const jwtToken = localStorage.getItem("jwtToken") || "";
const axiosClient = axios.create({
  baseURL: "http://localhost:8081/",
  headers: {
    "Authorization": `${jwtToken}`,
    "Content-Type": "application/json",
  },
});

export default axiosClient;
