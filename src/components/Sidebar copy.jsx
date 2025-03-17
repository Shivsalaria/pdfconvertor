import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = ({ isSidebarCollapsed, setIsSidebarCollapsed, activeSection, setActiveSection, navigationItems = [] }) => (
  <div className={`bg-white shadow-lg transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-60'}`}>
    <div className="h-14 flex items-center justify-between px-4 mb-2">
      <div className={`flex items-center justify-center ${isSidebarCollapsed ? 'w-8' : 'w-32'}`}>
        <img
          src={logo}
          alt="Vulnerability management"
          className={`h-8 object-contain transition-all duration-300 ${isSidebarCollapsed ? 'scale-90' : 'scale-100'}`}
        />
      </div>
      <button
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        className="text-gray-500 hover:text-gray-700 !rounded-button whitespace-nowrap z-10 "
      >
        <i className={`fa-solid ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
      </button>
    </div>
    <nav className="p-2">
      {navigationItems && navigationItems.map((item) => (
        <Link
          key={item.id}
          to={`/${item.id}`}
          onClick={() => setActiveSection(item.id)}
          className={`w-full flex items-center px-3 py-2 rounded-lg mb-1 transition-colors !rounded-button whitespace-nowrap
          ${activeSection === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          <i className={`${item.icon} w-6`}></i>
          {!isSidebarCollapsed && (
            <>
              <span className="">{item.label}</span>
              {item.count && <span className="bg-blue-100 text-blue-600 px-2 mx-auto rounded-full text-xs">{item.count}</span>}
            </>
          )}
        </Link>
      ))}
    </nav>
  </div>
);

export default Sidebar;