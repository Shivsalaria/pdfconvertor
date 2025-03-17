import React, { useEffect, useState } from 'react';
import SearchModal from './modals/SearchModal';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ searchQuery, setSearchQuery, isUserMenuOpen, setIsUserMenuOpen, userMenuRef, notifications, isDarkMode, setIsDarkMode }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleThemeToggle = () => {
    if (typeof setIsDarkMode === 'function') {
      setIsDarkMode(!isDarkMode);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuRef, setIsUserMenuOpen]);

  return (
    <>
      <header className="h-14 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-4">
        <div className="flex items-center flex-1">
          <div className="relative flex-1 max-w-72">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setIsSearchModalOpen(true)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border-none bg-gray-100 dark:bg-gray-700 focus:bg-white dark:focus:bg-gray-600 focus:ring-2 focus:ring-blue-500 text-sm dark:text-gray-200 cursor-pointer"
              readOnly
            />
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-3 !rounded-button whitespace-nowrap"
            >
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQE5m459UtC23g/profile-displayphoto-shrink_200_200/B56ZPxlLXFGQAc-/0/1734924879868?e=1746662400&v=beta&t=_Qj-NfISAlM4RYzuJN66Uk_TByyd_BehBbzxx1O1sfI"
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover"
              />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                <button className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left !rounded-button whitespace-nowrap">
                  <i className="fa-solid fa-user mr-2"></i> Profile
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left !rounded-button whitespace-nowrap">
                  <i className="fa-solid fa-gear mr-2"></i> Settings
                </button>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    navigate('/login');
                  }}
                  className="px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-full text-left !rounded-button whitespace-nowrap">
                  <i className="fa-solid fa-right-from-bracket mr-2"></i> Logout
                </button>
              </div>
            )}
          </div>
          <div className='flex items-center space-x-4 mr-4'>
            <button
              onClick={handleThemeToggle}
              className="bg-gray-200  dark:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 !rounded-button whitespace-nowrap"
            >
              <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-xl`}></i>
            </button>
          </div>
        </div>
      </header>
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} handleThemeToggle={handleThemeToggle} />
    </>
  );
};

export default Topbar; 