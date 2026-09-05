/* eslint-disable no-control-regex */
import { sanitizeText } from '../utils/security';

const API_URL = '/api/v1';

const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined' || !document.cookie) return undefined;
  const cookies = document.cookie.split("; ");
  
  const cookie = cookies.find((row) =>
    row.startsWith(`${name}=`)
  );

  if (!cookie) return undefined;
  const rawValue = cookie.slice(name.length + 1);
  try {
    return decodeURIComponent(rawValue).replace(/[\u0000-\u001F\u007F]/g, '');
  } catch {
    return rawValue.replace(/[\u0000-\u001F\u007F]/g, '');
  }
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

interface BookingData {
  name: string;
  phone: string;
  service_category?: string;
  service?: string;
  address?: string;
  preferred_date?: string;
  preferred_time?: string;
  problem_description?: string;
}

interface ApiError extends Error {
  status?: number;
  errors?: unknown;
}

export const createBooking = async (bookingData: BookingData) => {
  const csrfToken = await getCsrfToken();

  if (!csrfToken) {
    throw new Error("CSRF token not found");
  }

  // Defensively construct and sanitize payload
  const safePayload = {
    name: sanitizeText(bookingData.name, { maxLength: 70 }),
    phone: sanitizeText(bookingData.phone, { maxLength: 20 }),
    service_category: bookingData.service_category ? sanitizeText(bookingData.service_category, { maxLength: 50 }) : undefined,
    service: bookingData.service ? sanitizeText(bookingData.service, { maxLength: 80 }) : undefined,
    address: bookingData.address ? sanitizeText(bookingData.address, { maxLength: 300 }) : undefined,
    preferred_date: bookingData.preferred_date ? sanitizeText(bookingData.preferred_date, { maxLength: 10 }) : undefined,
    preferred_time: bookingData.preferred_time ? sanitizeText(bookingData.preferred_time, { maxLength: 60 }) : undefined,
    problem_description: bookingData.problem_description ? sanitizeText(bookingData.problem_description, { allowNewlines: true, maxLength: 1000 }) : undefined,
  };

  const response = await fetch(`${API_URL}/booking`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-XSRF-TOKEN": csrfToken,
    },
    body: JSON.stringify(safePayload),
  });

  const data = await response.json();

  if (!response.ok) {
    const error: ApiError = new Error(
      data.message || "Failed to submit booking"
    );

    error.status = response.status;
    error.errors = data.errors;

    throw error;
  }

  return data;
};
