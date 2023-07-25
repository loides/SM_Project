import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, password) => {
  return axios.post(API_URL + "signup", {
    username,
    password,
  })
  .catch((error) => {
    if (error.response && error.response.status === 400) {
      throw new Error("Username is already taken.");
    } else {
      throw error;
    }
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        throw new Error("Incorrect username or password.");
      } else {
        throw error;
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;
