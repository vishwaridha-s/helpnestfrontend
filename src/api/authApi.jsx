import API from "./axios";

export const fetchMe = async () => {
  const res = await API.get("/api/auth/me");
  return res.data;
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};