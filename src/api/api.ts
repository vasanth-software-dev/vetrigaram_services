const API_URL = '/api/v1'

const getCookie = (name: string): string | undefined => {
  const cookies = document.cookie.split("; ");
  
  const cookie = cookies.find((row) =>
    row.startsWith(`${name}=`)
  );

  return cookie?.split("=")[1];
};

export const getCsrfToken = async () => {
  const response = await fetch(`${API_URL}/csrf`, {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to get CSRF token");
  }

  return getCookie("XSRF-TOKEN");
};

export const createBooking = async (bookingData: {
  name: string;
  phone: string;
  service_category?: string;
  service?: string;
  address?: string;
  preferred_date?: string;
  preferred_time?: string;
  problem_description?: string;
}) => {
  const csrfToken = await getCsrfToken();

  if (!csrfToken) {
    throw new Error("CSRF token not found");
  }

  const response = await fetch(`${API_URL}/booking`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(bookingData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(
      data.message || "Failed to submit booking"
    );

    error.status = response.status;
    error.errors = data.errors;

    throw error;
  }

  return data;
};
