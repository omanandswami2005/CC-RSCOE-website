import api from "./axiosConfig";


export const getUser = async () => {
    const response = await api.get("user/profile");
    return response;
};

export const updateUser = async (id, profileData) => {
  const response = await api.put(`user/profile/${id}`, profileData);
  return response;
};