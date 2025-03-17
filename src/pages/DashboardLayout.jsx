import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    // Get the current path without the leading slash
    const currentPath = location.pathname.substring(1);
    // If path is empty, return dashboard, otherwise return the current path
    return currentPath || 'dashboard';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      return savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const userMenuRef = useRef(null);

  useEffect(() => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      console.error('Error updating theme:', error);
    }
  }, [isDarkMode]);

  useEffect(() => {
    const currentPath = location.pathname.substring(1);
    setActiveSection(currentPath || 'dashboard');
  }, [location]);

  const navigationItems = [
    { id: 'dashboard', icon: 'fa-solid fa-chart-line', label: 'Dashboard', count: null },
    { id: 'projects', icon: 'fa-solid fa-folder', label: 'Projects', count: null },
    { id: 'vulnerabilities', icon: 'fa-solid fa-shield', label: 'Vulnerabilities', count: null },
    { id: 'vulnerability-report', icon: 'fa-solid fa-file-lines', label: 'Vulnerability Report', count:null },
    // { id: 'collaboration', icon: 'fa-solid fa-clipboard-check', label: 'collaboration', count: null },
    { id: 'vulnerability-management', icon: 'fa-solid fa-shield', label: 'Vulnerability Pdf', count:null },
    { id: 'ecworksheet', icon: 'fa-solid fa-file-lines', label: 'EC Worksheet', count:null },
    { id: 'ndafrom', icon: 'fa-solid fa-file-lines', label: 'NDA Form', count:null },
    { id: 'datauseagreement', icon: 'fa-solid fa-file-lines', label: 'Data Use Agreement', count:null },
    { id: 'rule-engagement', icon: 'fa-solid fa-file-lines', label: 'Rule Engagement', count:null },

  ];

  const notifications = [
    { id: 1, title: 'New High Risk Vulnerability', time: '2 hours ago', type: 'danger' },
    { id: 2, title: 'Project Assessment Completed', time: '5 hours ago', type: 'success' },
    { id: 3, title: 'Team Meeting Reminder', time: 'Tomorrow, 10:00 AM', type: 'info' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar
        isSidebarCollapsed={isSidebarCollapsed}
        setIsSidebarCollapsed={setIsSidebarCollapsed}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        navigationItems={navigationItems || []}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isUserMenuOpen={isUserMenuOpen}
          setIsUserMenuOpen={setIsUserMenuOpen}
          userMenuRef={userMenuRef}
          notifications={notifications}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
        <main className="flex-1 overflow-auto p-2 dark:bg-gray-900">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout; 