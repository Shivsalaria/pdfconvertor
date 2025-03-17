import React from 'react';
import Select from 'react-select';

const teamOptions = [
  { value: 'Bharat', label: 'Bharat' },
  { value: 'Suman', label: 'Suman' },
  { value: 'Shiv', label: 'Shiv' },
  { value: 'Harshit', label: 'Harshit' }
];

const CreateProjectModal = ({ 
  isOpen, 
  onClose, 
  newProject, 
  setNewProject, 
  handleCreateOrUpdate, 
  editingProject,
  teamMember,
  setTeamMember 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleCreateOrUpdate}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Project Name
              </label>
              <input
                type="text"
                value={newProject.PROJECT_NAME}
                onChange={(e) =>
                  setNewProject({ ...newProject, PROJECT_NAME: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="Enter project name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Status
              </label>
              <select
                value={newProject.STATUS}
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    STATUS: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Blocked">Blocked</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Team Members
              </label>
              <Select
                isMulti
                name="team-members"
                options={teamOptions}
                className="basic-multi-select"
                classNamePrefix="select"
                value={newProject.TEAM?.map(member => ({ value: member, label: member }))}
                onChange={(selectedOptions) => {
                  setNewProject({
                    ...newProject,
                    TEAM: selectedOptions ? selectedOptions.map(option => option.value) : []
                  });
                }}
                placeholder="Select team members"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: 'var(--tw-bg-opacity-1)',
                    borderColor: state.isFocused ? '#3b82f6' : 'var(--tw-border-opacity-1)',
                    boxShadow: state.isFocused ? '0 0 0 1px #3b82f6' : 'none',
                    '&:hover': {
                      borderColor: state.isFocused ? '#3b82f6' : 'var(--tw-border-hover)',
                    },
                    '@media (prefers-color-scheme: dark)': {
                      backgroundColor: '#374151',
                      borderColor: state.isFocused ? '#3b82f6' : '#4B5563',
                      '&:hover': {
                        borderColor: state.isFocused ? '#3b82f6' : '#6B7280',
                      },
                    },
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: 'white',
                    '@media (prefers-color-scheme: dark)': {
                      backgroundColor: '#374151',
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused 
                      ? '#E5E7EB'
                      : state.isSelected 
                      ? '#3b82f6'
                      : 'transparent',
                    color: state.isSelected ? 'white' : '#111827',
                    '&:active': {
                      backgroundColor: '#3b82f6',
                      color: 'white',
                    },
                    '@media (prefers-color-scheme: dark)': {
                      backgroundColor: state.isFocused 
                        ? '#4B5563'
                        : state.isSelected 
                        ? '#3b82f6'
                        : 'transparent',
                      color: state.isSelected ? 'white' : '#F3F4F6',
                      '&:active': {
                        backgroundColor: '#3b82f6',
                      },
                    },
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: '#E5E7EB',
                    '@media (prefers-color-scheme: dark)': {
                      backgroundColor: '#4B5563',
                    },
                  }),
                  multiValueLabel: (base) => ({
                    ...base,
                    color: '#111827',
                    '@media (prefers-color-scheme: dark)': {
                      color: '#F3F4F6',
                    },
                  }),
                  multiValueRemove: (base) => ({
                    ...base,
                    color: '#4B5563',
                    '&:hover': {
                      backgroundColor: '#DC2626',
                      color: 'white',
                    },
                    '@media (prefers-color-scheme: dark)': {
                      color: '#D1D5DB',
                      '&:hover': {
                        backgroundColor: '#DC2626',
                        color: 'white',
                      },
                    },
                  }),
                  input: (base) => ({
                    ...base,
                    color: '#111827',
                    '@media (prefers-color-scheme: dark)': {
                      color: '#F3F4F6',
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: '#6B7280',
                    '@media (prefers-color-scheme: dark)': {
                      color: '#9CA3AF',
                    },
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: '#111827',
                    '@media (prefers-color-scheme: dark)': {
                      color: '#F3F4F6',
                    },
                  }),
                }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Visibility:
              </label>
              <button
                type="button"
                onClick={() =>
                  setNewProject({
                    ...newProject,
                    VISIBILITY: newProject.VISIBILITY === 'Private' ? 'Public' : 'Private',
                  })
                }
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  newProject.VISIBILITY === 'Public' ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    newProject.VISIBILITY === 'Public' ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                {newProject.VISIBILITY}
              </span>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="!rounded-button px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="!rounded-button bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 whitespace-nowrap"
            >
              {editingProject ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal; 