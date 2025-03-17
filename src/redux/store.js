import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './slices/projectSlice';
import vulnerabilityReducer from './slices/vulnerabilitySlice';
import initialClientWorksheetReducer from './slices/initialClientWorksheetSlice';

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    vulnerabilities: vulnerabilityReducer,
    initialClientWorksheet: initialClientWorksheetReducer,
  },
}); 