import React from 'react';

const DeleteProjectModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900 mb-4">
            <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Delete Project</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Are you sure you want to delete this project? This action cannot be undone.
          </p>
          <div className="flex justify-center space-x-3">
            <button
              onClick={onClose}
              className="!rounded-button px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="!rounded-button bg-red-600 text-white px-4 py-2 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 whitespace-nowrap"
            >
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProjectModal; 