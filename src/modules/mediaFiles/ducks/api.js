import axiosInstance from '../../../config/axiosConfig';

export const fetchMedia = () => axiosInstance.get('/files');
export const uploadMedia = (data) => axiosInstance.post('/files/upload', data);
export const updateMedia = (id, data) => axiosInstance.put(`/files/${id}`, data);
export const deleteMedia = (id) => axiosInstance.delete(`/files/${id}`);
