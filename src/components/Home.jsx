import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import DashboardLayout from '../pages/DashboardLayout'

const Home = () => {
  const chartRef = useRef(null);
  const securityScoreRef = useRef(null);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);
      const option = {
        animation: false,
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['High', 'Medium', 'Low']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'High',
            type: 'line',
            data: [12, 15, 10, 8, 7, 5],
            color: '#ef4444'
          },
          {
            name: 'Medium',
            type: 'line',
            data: [22, 18, 20, 15, 14, 12],
            color: '#f59e0b'
          },
          {
            name: 'Low',
            type: 'line',
            data: [35, 32, 30, 25, 20, 18],
            color: '#10b981'
          }
        ]
      };
      chart.setOption(option);
    }
    if (securityScoreRef.current) {
      const chart = echarts.init(securityScoreRef.current);
      const option = {
        animation: false,
        series: [{
          type: 'gauge',
          progress: {
            show: true,
            width: 18
          },
          axisLine: {
            lineStyle: {
              width: 18
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            length: 15,
            lineStyle: {
              width: 2,
              color: '#999'
            }
          },
          axisLabel: {
            distance: 25,
            color: '#999',
            fontSize: 14
          },
          anchor: {
            show: true,
            showAbove: true,
            size: 25,
            itemStyle: {
              borderWidth: 10
            }
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            fontSize: 30,
            offsetCenter: [0, '70%']
          },
          data: [{
            value: 78,
            name: 'Security Score'
          }]
        }]
      };
      chart.setOption(option);
    }
  }, []);

  const recentProjects = [
    { id: 'AAAF/2502/1DD62', name: 'Cloud Infrastructure Security Assessment', status: 'In Progress', risk: 'High' },
    { id: 'AAAF/2502/1DD63', name: 'Mobile Application Penetration Testing', status: 'Completed', risk: 'Medium' },
    { id: 'AAAF/2502/1DD64', name: 'Network Security Audit', status: 'Planned', risk: 'Low' },
    { id: 'AAAF/2502/1DD65', name: 'Web Application Security Review', status: 'In Progress', risk: 'High' },
  ];
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Security Dashboard</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 !rounded-button whitespace-nowrap">
            <i className="fa-solid fa-plus"></i>
            <span>New Assessment</span>
          </button>
        </div>
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <h3 className="text-2xl font-semibold text-gray-800">12</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-folder text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Open Vulnerabilities</p>
                <h3 className="text-2xl font-semibold text-gray-800">28</h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-shield text-red-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed Assessments</p>
                <h3 className="text-2xl font-semibold text-gray-800">45</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-check-circle text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Team Members</p>
                <h3 className="text-2xl font-semibold text-gray-800">16</h3>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-users text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Vulnerability Trends Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vulnerability Trends</h3>
            <div ref={chartRef} style={{ height: '300px' }}></div>
          </div>
          {/* Security Score */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Score</h3>
            <div ref={securityScoreRef} style={{ height: '300px' }}></div>
          </div>
        </div>
        {/* Recent Projects */}
        <div className="mt-6 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Recent Projects</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{project.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{project.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${project.risk === 'High' ? 'bg-red-100 text-red-800' :
                          project.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'}`}>
                        {project.risk}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-blue-600 hover:text-blue-800 mr-3 !rounded-button whitespace-nowrap"
                      >
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 !rounded-button whitespace-nowrap">
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
