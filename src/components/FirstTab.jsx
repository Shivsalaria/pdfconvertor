import React, { useState } from 'react';

const FirstTab = () => {
  const [currentDate] = useState('March 03, 2025');
  const reportRef = 'VAPT-2025-0303-001';
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 dark:from-gray-900 to-white dark:to-gray-800 flex justify-center items-center transition-colors duration-200">
      <div className="w-[1440px] min-h-[1024px] bg-white dark:bg-gray-800 shadow-2xl dark:shadow-gray-900/50 rounded-xl relative overflow-hidden transition-colors duration-200">
        {/* Left Decorative Panel */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
        {/* Main Content */}
        <div className="relative ml-24 p-16">
          {/* Top Security Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 opacity-5"></div>
          {/* Header with Logo */}
          <div className="flex items-center mb-20">
            <img
              src="https://public.readdy.ai/ai/img_res/12b38c4915f10c934660f7aa1fb9e0eb.jpg"
              alt="CyberShield Logo"
              className="h-16 object-contain"
            />
            <div className="ml-auto text-sm text-gray-500 dark:text-gray-400 text-right transition-colors duration-200">
              <div className="font-semibold">Reference: {reportRef}</div>
              <div>{currentDate}</div>
            </div>
          </div>
          {/* Report Title Section */}
          <div className="mb-20">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6 transition-colors duration-200">
              Vulnerability Assessment<br />& Penetration Testing
            </h1>
            <div className="flex items-center">
              <div className="h-1 w-32 bg-blue-600 dark:bg-blue-500"></div>
              <span className="ml-4 text-xl text-blue-600 dark:text-blue-400 font-semibold transition-colors duration-200">Technical Report</span>
            </div>
          </div>
          {/* Project Details Grid */}
          <div className="grid grid-cols-2 gap-12 mb-20">
            <div className="bg-slate-50 dark:bg-gray-700 p-8 rounded-lg transition-colors duration-200">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Target System</h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200">Enterprise Resource Planning System v3.2</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Assessment Duration:</p>
                <p className="text-gray-700 dark:text-gray-200">February 15, 2025 - March 01, 2025</p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-gray-700 p-8 rounded-lg transition-colors duration-200">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Client Information</h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200">Quantum Dynamics Corporation</p>
                <p className="text-gray-600 dark:text-gray-400">1234 Innovation Drive, Suite 500</p>
                <p className="text-gray-600 dark:text-gray-400">Silicon Valley, CA 94025</p>
              </div>
            </div>
          </div>
          {/* Stakeholders Section */}
          <div className="flex justify-between items-start mb-20">
            <div className="w-1/2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Prepared For</h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200 font-medium">Dr. Elizabeth Chen</p>
                <p className="text-gray-600 dark:text-gray-400">Chief Information Security Officer</p>
                <p className="text-gray-600 dark:text-gray-400">Quantum Dynamics Corporation</p>
              </div>
            </div>
            <div className="w-1/2">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Prepared By</h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200 font-medium">CyberShield Security Solutions</p>
                <p className="text-gray-600 dark:text-gray-400">contact@cybershield.com</p>
                <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
          {/* Bottom Security Badge */}
          <div className="absolute bottom-16 right-16 flex items-center">
            <div className="w-16 h-16 mr-4">
              <img
                src="https://public.readdy.ai/ai/img_res/f82cd87b7c5ce3f50919608c08ad11d9.jpg"
                alt="Security Badge"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800 dark:text-white">CONFIDENTIAL</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 max-w-xs">
                This document contains confidential information and is intended for authorized personnel only.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstTab;


