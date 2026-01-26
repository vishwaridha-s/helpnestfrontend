export const handleError = (error) => {
  if (!error.response) {
    return "Network error. Please check your connection.";
  }

  const status = error.response.status;
  const message = error.response.data?.message;

  if (message) return message;

  switch (status) {
    case 400:
      return "Invalid request. Please check your input.";
    case 401:
      return "Please log in to continue.";
    case 403:
      return "You are not authorized to perform this action.";
    case 404:
      return "Requested resource not found.";
    case 500:
      return "Something went wrong on our side. Please try again later.";
    default:
      return "Unexpected error occurred.";
  }
};
