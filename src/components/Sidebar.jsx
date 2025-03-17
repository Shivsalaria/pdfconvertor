import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import logo from '../assets/logo.png';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed, activeSection, setActiveSection, navigationItems = [] }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 flex flex-col h-screen ${isSidebarCollapsed ? 'w-16' : 'w-60'}`}>
      <div className="h-14 flex items-center justify-between px-4 mb-2">
        <div className={`flex items-center justify-center ${isSidebarCollapsed ? 'w-8' : 'w-32'}`}>
          <div className="flex items-center">
            <i className="fas fa-shield-alt text-3xl text-blue-500 mr-3"></i>
            {!isSidebarCollapsed && (
              <h1 className="text-sm font-bold text-gray-800 dark:text-gray-200">Vulnerability Manager</h1>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 !rounded-button whitespace-nowrap z-10"
        >
          <i className={`fa-solid ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
        </button>
      </div>
      <nav className="p-2 flex-grow">
        {navigationItems && navigationItems.map((item) => (
          <div key={item.id} className="relative group">
            <Link
              to={`/${item.id}`}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center px-3 py-2 rounded-md mb-1 transition-colors !rounded-button whitespace-nowrap
              ${activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
            >
              <i className={`${item.icon} w-6`}></i>
              {!isSidebarCollapsed && (
                <>
                  <span className="">{item.label}</span>
                  {item.count && <span className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 px-2 mx-auto rounded-full text-xs">{item.count}</span>}
                </>
              )}
            </Link>
            {isSidebarCollapsed && (
              <div className="absolute left-full top-1/2 -translate-y-1/2  ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {item.label}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* User Profile Section at Bottom */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-2 relative" ref={profileMenuRef}>
        <button
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
          className="w-full flex items-center  py-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 !rounded-button"
        >
          <div className={`${isSidebarCollapsed ? 'w-8 h-8' : 'w-10 h-10'} rounded-full bg-blue-500 flex items-center justify-center text-white overflow-hidden`}>
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQE5m459UtC23g/profile-displayphoto-shrink_200_200/B56ZPxlLXFGQAc-/0/1734924879868?e=1746662400&v=beta&t=_Qj-NfISAlM4RYzuJN66Uk_TByyd_BehBbzxx1O1sfI"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          {!isSidebarCollapsed && (
            <div className="ml-3 text-left">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Shiv Salaria</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">shivsalaria@securethread.io</p>
            </div>
          )}
        </button>

        {/* Profile Popup Menu */}
        {isProfileMenuOpen && (
          <div className="absolute bottom-full left-2 right-2 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2">
            <Link to="/profile" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <i className="fas fa-user w-5"></i>
              <span>Profile</span>
            </Link>
            <Link to="/settings" className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <i className="fas fa-cog w-5"></i>
              <span>Settings</span>
            </Link>
            <button className="w-full flex items-center px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
              <i className="fas fa-sign-out-alt w-5"></i>
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;