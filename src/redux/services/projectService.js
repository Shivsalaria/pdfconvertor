import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// const API_URL = import.meta.env.VITE_API_URL;


export const projectApi = {
  getAllProjects: async () => {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  },

  createProject: async (projectData) => {
    const response = await axios.post(`${API_URL}/projects`, projectData);
    return response.data;
  },

  updateProject: async (projectId, projectData) => {
    const encodedProjectId = encodeURIComponent(projectId);
    const response = await axios.put(`${API_URL}/projects/update/${encodedProjectId}`, projectData);
    return response.data;
  },

  deleteProjects: async (projectIds) => {
    const response = await axios.delete(`${API_URL}/projects`, {
      data: { projectIds: projectIds }
    });
    return response.data;
  }
}; 