// 📁 src/api/eventApi.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/events";

export const fetchEvents = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const addEvent = async (eventData) => {
  const res = await axios.post(BASE_URL, eventData);
  return res.data;
};
