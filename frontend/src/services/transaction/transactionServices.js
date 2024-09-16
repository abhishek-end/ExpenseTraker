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
// //!ListCategoryAPI
// export const ListCategoryAPI = async () => {
//   const response = await axios.get(`${BASE_URL}/category/lists`, {
//     headers: {
//       Authorization: [`Bearer ${token}`],
//     },
//   });
//   return response.data;
// };
// //!updateAPI
// export const updateAPI = async ({ name, type, id }) => {
//   const response = await axios.put(
//     `${BASE_URL}/category/update/${id}`,
//     { name, type },
//     {
//       headers: {
//         Authorization: [`Bearer ${token}`],
//       },
//     }
//   );
//   return response.data;
// };
// export const DeleteCategoryAPI = async (id) => {
//   const response = await axios.delete(`${BASE_URL}/category/delete/${id}`, {
//     headers: {
//       Authorization: [`Bearer ${token}`],
//     },
//   });
//   return response.data;
// };
