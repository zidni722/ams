import axios from "axios";
import { servicePath, token } from "../constants/defaultValues";

const apiUrl = servicePath;

class AuthService {
  login(email, password) {
    return axios
      .post(`${apiUrl}/auth/login`, {
        email,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();