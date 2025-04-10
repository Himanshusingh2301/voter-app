import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/", // Your Django API Base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;
