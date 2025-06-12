import axios from "axios";
import constants from "../../constants";

// Define the base URL for API requests (update as needed)
const API_BASE_URL = `${constants.serverUrl}/api`;

// Axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // Ensures cookies are included in requests if needed
  headers: {
    "Content-Type": "application/json",    
  },
});

export default api;