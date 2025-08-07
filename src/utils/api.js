require("dotenv").config();
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

export const api = {
  // Student APIs
  submitApplication: (formData) =>
    fetch(`${API_BASE_URL}/api/admission`, {
      method: "POST",
      body: formData,
    }),

  // Admin APIs
  adminLogin: (credentials) =>
    fetch(`${API_BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    }),

  getApplications: (token) =>
    fetch(`${API_BASE_URL}/api/admin/applications`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getStatistics: (token) =>
    fetch(`${API_BASE_URL}/api/admin/statistics`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  downloadExcel: (token) =>
    fetch(`${API_BASE_URL}/api/admin/applications/download/excel`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
