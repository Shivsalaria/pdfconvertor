import { createAsyncThunk } from '@reduxjs/toolkit';
import { projectApi } from '../services/projectService';
import toast from 'react-hot-toast';

export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectApi.getAllProjects();
      return response;
    } catch (error) {
      toast.error('Failed to fetch projects');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectApi.createProject(projectData);
      toast.success('Project created successfully!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create project');
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/updateProject',
  async ({ projectId, projectData }, { rejectWithValue }) => {
    try {
      const response = await projectApi.updateProject(projectId, projectData);
      toast.success('Project updated successfully!');
      return response;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update project');
      return rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
  }
);

export const deleteProjects = createAsyncThunk(
  'projects/deleteProjects',
  async (projectIds, { rejectWithValue }) => {
    try {
      const response = await projectApi.deleteProjects(projectIds);
      toast.success(response.message || 'Projects deleted successfully!');
      return { projectIds, response };
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete projects');
      return rejectWithValue(error.response?.data?.message || 'Failed to delete projects');
    }
  }
); 