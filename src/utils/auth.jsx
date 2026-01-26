import API from "../api/axios"; // Adjust path as needed

export const saveAuth = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("role", data.user.role);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const logout = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const handleError = (error) => {
  if (!error.response) return "Network error. Please check your connection.";
  const message = error.response.data?.message;
  if (message) return message;

  const status = error.response.status;
  const errors = {
    400: "Invalid request. Check your input.",
    401: "Session expired. Please log in again.",
    403: "Access denied.",
    404: "Resource not found.",
    500: "Server error. Try again later."
  };
  return errors[status] || "Unexpected error occurred.";
};