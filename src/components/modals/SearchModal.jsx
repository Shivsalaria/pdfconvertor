import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchModal = ({ isOpen, onClose, handleThemeToggle }) => {
  const navigate = useNavigate();
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  if (!isOpen) return null;

  const navigationOptions = [
    { name: 'Dashboard', path: '/dashboard', description: 'Go to Dashboard' },
    { name: 'Projects', path: '/projects', description: 'Go to Projects' },
    { name: 'Vulnerabilities', path: '/vulnerabilities', description: 'Go to Vulnerabilities' },
    { name: 'Vulnerability Report', path: '/vulnerability-report', description: 'Go to Vulnerability Report' }
  ];

  const themeOptions = [
    { name: 'Toggle Theme', action: 'toggle' },
    { name: 'Set Light Theme', action: 'light' },
    { name: 'Set Dark Theme', action: 'dark' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    onClose();
  };

  const handleThemeChange = (action) => {
    if (action === 'toggle') {
      handleThemeToggle();
    } else if (action === 'light') {
      document.documentElement.classList.remove('dark');
    } else if (action === 'dark') {
      document.documentElement.classList.add('dark');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md p-6">
        {/* Navigation Section */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">NAVIGATION</h3>
          <div className="space-y-1">
            {navigationOptions.map((option) => (
              <button
                key={option.path}
                onClick={() => handleNavigation(option.path)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                <div className="text-gray-800 dark:text-gray-200 font-medium">{option.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{option.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Theme Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2 px-2">THEME</h3>
          <div className="space-y-1">
            {themeOptions.map((option) => (
              <button
                key={option.action}
                onClick={() => handleThemeChange(option.action)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-200"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal; 