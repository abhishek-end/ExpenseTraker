import { getUserFromStorage } from "../../utils/getUserfromStorage";
import { BASE_URL } from "../../utils/url";
import axios from "axios";

//!addTransaction
const token = getUserFromStorage();
export const addTransactionAPI = async ({
  type,
  amount,
  category,
  date,
  description,
}) => {
  const response = await axios.post(
    `${BASE_URL}/transaction/add`,
    {
      type,
      amount,
      category,
      date,
      description,
    },
    {
      headers: {
        Authorization: [`Bearer ${token}`],
      },
    }
  );
  return response.data;
};
// //!ListTransactionAPI
export const ListTransactionAPI = async ({
  startDate,
  endDate,
  type,
  category,
}) => {
  const response = await axios.get(`${BASE_URL}/transaction/lists/`, {
    params: {
      category,
      endDate,
      startDate,
      type,
    },
    headers: {
      Authorization: [`Bearer ${token}`],
    },
  });
  return response.data;
};

//!DeleteTransactionAPI
export const DeleteTransactionAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/transaction/${id}`, {
    headers: {
      Authorization: [`Bearer ${token}`],
    },
  });
  return response.data;
};
