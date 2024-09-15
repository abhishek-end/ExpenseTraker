import { BASE_URL } from "../../utils/url";
import axios from "axios";
//!login
export const loginAPI = async ({ email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response.data;
};
//!Register
export const RegisterApi = async ({ username, email, password }) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    username,
    email,
    password,
  });
  return response.data;
};
