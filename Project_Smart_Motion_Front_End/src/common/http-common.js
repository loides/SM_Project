import axios from "axios";
import authHeader from "../services/AuthHeader";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    ...authHeader()
  }
});