import { getUserFromStorage } from "../../utils/getUserfromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

const token = getUserFromStorage();
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

//!changePasswordAPI
export const changePasswordAPI = async (newPassword) => {
  const response = await axios.put(
    `${BASE_URL}/users/change-password`,
    { newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

//!updateProfileAPI
export const updateProfileAPI = async ({ email, username }) => {
  const response = await axios.put(
    `${BASE_URL}/users/update-profile`,
    { email, username },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
