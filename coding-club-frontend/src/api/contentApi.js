import api from "./axiosConfig";

// Events API
export const getEvents = async (params = {}) => {
  const response = await api.get("content/events", { params });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`content/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post("content/events", eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`content/events/${id}`, eventData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`content/events/${id}`);
  return response.data;
};

// FAQs API
export const getFAQs = async (params = {}) => {
  const response = await api.get("content/faqs", { params });
  return response.data;
};

export const createFAQ = async (faqData) => {
  const response = await api.post("content/faqs", faqData);
  return response.data;
};

export const updateFAQ = async (id, faqData) => {
  const response = await api.put(`content/faqs/${id}`, faqData);
  return response.data;
};

export const deleteFAQ = async (id) => {
  const response = await api.delete(`content/faqs/${id}`);
  return response.data;
};

// Testimonials API
export const getTestimonials = async (params = {}) => {
  const response = await api.get("content/testimonials", { params });
  return response.data;
};

export const createTestimonial = async (testimonialData) => {
  const response = await api.post("content/testimonials", testimonialData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateTestimonial = async (id, testimonialData) => {
  const response = await api.put(`content/testimonials/${id}`, testimonialData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteTestimonial = async (id) => {
  const response = await api.delete(`content/testimonials/${id}`);
  return response.data;
};

// Achievements API
export const getAchievements = async (params = {}) => {
  const response = await api.get("content/achievements", { params });
  return response.data;
};

export const getAchievementById = async (id) => {
  const response = await api.get(`content/achievements/${id}`);
  return response.data;
};

export const createAchievement = async (achievementData) => {
  const response = await api.post("content/achievements", achievementData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const updateAchievement = async (id, achievementData) => {
  const response = await api.put(`content/achievements/${id}`, achievementData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const deleteAchievement = async (id) => {
  const response = await api.delete(`content/achievements/${id}`);
  return response.data;
};