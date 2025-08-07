// API Configuration for separate frontend/backend deployment
const getApiBaseUrl = () => {
  // In production, use environment variable for backend URL
  if (process.env.NODE_ENV === "production") {
    return (
      process.env.REACT_APP_API_URL || "https://your-backend-app.vercel.app"
    );
  }
  // In development, use localhost
  return process.env.REACT_APP_API_URL || "http://localhost:5002";
};

const API_BASE_URL = getApiBaseUrl();

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
