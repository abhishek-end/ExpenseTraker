export const getUserFromStorage = () => {
  const token = JSON.parse(localStorage.getItem("userinfo") || null);
  return token?.token;
};
