import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Layout = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
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

  const navigationItems = [
    { id: 'dashboard', icon: 'fa-solid fa-chart-line', label: 'Dashboard', count: null },
    { id: 'projects', icon: 'fa-solid fa-folder', label: 'Projects', count: 12 },
    { id: 'vulnerabilities', icon: 'fa-solid fa-shield', label: 'Vulnerabilities', count: 28 },
    { id: 'assessment', icon: 'fa-solid fa-clipboard-check', label: 'Assessment', count: null },
    { id: 'reports', icon: 'fa-solid fa-file-lines', label: 'Reports', count: 5 },
    // { id: 'collaboration', icon: 'fa-solid fa-users', label: 'Collaboration', count: null },
    // { id: 'documents', icon: 'fa-solid fa-vault', label: 'Documents', count: null },
    // { id: 'analytics', icon: 'fa-solid fa-chart-pie', label: 'Analytics', count: null },
    // { id: 'administration', icon: 'fa-solid fa-gear', label: 'Administration', count: null },
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
        navigationItems={navigationItems}
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
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout; 