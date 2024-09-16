import { getUserFromStorage } from "../../utils/getUserfromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//!addCategory
const token = getUserFromStorage();
export const addCategoryAPI = async ({ name, type }) => {
  const response = await axios.post(
    `${BASE_URL}/category/add`,
    {
      name,
      type,
    },
    {
      headers: {
        Authorization: [`Bearer ${token}`],
      },
    }
  );
  return response.data;
};
//!ListCategoryAPI
export const ListCategoryAPI = async ({ name, type }) => {
  const response = await axios.get(`${BASE_URL}/category/lists`, {
    headers: {
      Authorization: [`Bearer ${token}`],
    },
  });
  return response.data;
};
//!updateAPI
export const updateAPI = async ({ name, type, id }) => {
  const response = await axios.put(
    `${BASE_URL}/category/update/${id}`,
    { name, type },
    {
      headers: {
        Authorization: [`Bearer ${token}`],
      },
    }
  );
  return response.data;
};
export const DeleteCategoryAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
    headers: {
      Authorization: [`Bearer ${token}`],
    },
  });
  return response.data;
};
