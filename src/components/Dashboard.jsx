import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("7d");
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
  const userMenuRef = useRef(null);
  const trendChartRef = useRef(null);
  const severityChartRef = useRef(null);

  // Listen for dark mode changes
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  // Combined useEffect for both charts that depends on isDarkMode
  useEffect(() => {
    // Vulnerability Trend Chart
    if (trendChartRef.current) {
      const trendChart = echarts.init(trendChartRef.current);
      
      const trendOption = {
        animation: false,
        backgroundColor: "transparent",
        tooltip: {
          trigger: "axis",
          backgroundColor: isDarkMode ? "rgba(23, 23, 23, 0.9)" : "rgba(255, 255, 255, 0.9)",
          borderColor: isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
          textStyle: { color: isDarkMode ? "#fff" : "#333" },
        },
        legend: {
          data: ["Critical", "High", "Medium"],
          textStyle: { color: isDarkMode ? "#94a3b8" : "#64748b" },
          top: 0,
          right: 0,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          axisLabel: {
            color: isDarkMode ? "#94a3b8" : "#64748b",
            fontSize: 12,
          },
          axisLine: {
            lineStyle: { color: isDarkMode ? "#334155" : "#e2e8f0" },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: isDarkMode ? "#1e293b" : "#f1f5f9",
              type: "dashed",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: isDarkMode ? "#94a3b8" : "#64748b",
            fontSize: 12,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              color: isDarkMode ? "#1e293b" : "#f1f5f9",
              type: "dashed",
            },
          },
        },
        series: [
          {
            name: "Critical",
            type: "line",
            smooth: true,
            symbolSize: 8,
            data: [35, 32, 29, 24, 18, 15],
            itemStyle: { color: "#ef4444" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: isDarkMode ? "rgba(239, 68, 68, 0.2)" : "rgba(239, 68, 68, 0.1)",
                  },
                  {
                    offset: 1,
                    color: isDarkMode ? "rgba(239, 68, 68, 0)" : "rgba(239, 68, 68, 0)",
                  },
                ],
              },
            },
          },
          {
            name: "High",
            type: "line",
            smooth: true,
            symbolSize: 8,
            data: [22, 18, 20, 15, 13, 11],
            itemStyle: { color: "#f97316" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: isDarkMode ? "rgba(249, 115, 22, 0.2)" : "rgba(249, 115, 22, 0.1)",
                  },
                  {
                    offset: 1,
                    color: isDarkMode ? "rgba(249, 115, 22, 0)" : "rgba(249, 115, 22, 0)",
                  },
                ],
              },
            },
          },
          {
            name: "Medium",
            type: "line",
            smooth: true,
            symbolSize: 8,
            data: [12, 15, 10, 8, 7, 5],
            itemStyle: { color: "#eab308" },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: isDarkMode ? "rgba(234, 179, 8, 0.2)" : "rgba(234, 179, 8, 0.1)",
                  },
                  {
                    offset: 1,
                    color: isDarkMode ? "rgba(234, 179, 8, 0)" : "rgba(234, 179, 8, 0)",
                  },
                ],
              },
            },
          },
        ],
      };
      trendChart.setOption(trendOption);
    }

    // Severity Distribution Chart
    if (severityChartRef.current) {
      const severityChart = echarts.init(severityChartRef.current);
      const severityOption = {
        animation: false,
        tooltip: {
          trigger: 'item',
          backgroundColor: isDarkMode ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          textStyle: {
            color: isDarkMode ? '#e5e7eb' : '#333'
          }
        },
        legend: {
          orient: 'vertical',
          right: 10,
          top: 'center',
          textStyle: {
            color: isDarkMode ? '#e5e7eb' : '#333'
          },
          itemStyle: {
            borderColor: isDarkMode ? '#374151' : '#e5e7eb'
          }
        },
        series: [
          {
            name: 'Severity',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              color: isDarkMode ? '#e5e7eb' : '#333'
            },
            data: [
              { 
                value: 42, 
                name: 'Critical', 
                itemStyle: { color: isDarkMode ? '#f87171' : '#ef4444' }
              },
              { 
                value: 78, 
                name: 'High', 
                itemStyle: { color: isDarkMode ? '#fbbf24' : '#f59e0b' }
              },
              { 
                value: 89, 
                name: 'Medium', 
                itemStyle: { color: isDarkMode ? '#60a5fa' : '#3b82f6' }
              },
              { 
                value: 38, 
                name: 'Low', 
                itemStyle: { color: isDarkMode ? '#4ade80' : '#22c55e' }
              }
            ]
          }
        ]
      };
      severityChart.setOption(severityOption);
    }

    // Cleanup function
    return () => {
      if (trendChartRef.current) {
        echarts.getInstanceByDom(trendChartRef.current)?.dispose();
      }
      if (severityChartRef.current) {
        echarts.getInstanceByDom(severityChartRef.current)?.dispose();
      }
    };
  }, [isDarkMode]); // Now depends on isDarkMode state

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const recentProjects = [
    { id: 'AAAF/2502/1DD62', name: 'Cloud Infrastructure Security Assessment', status: 'In Progress', risk: 'High' },
    { id: 'AAAF/2502/1DD63', name: 'Mobile Application Penetration Testing', status: 'Completed', risk: 'Medium' },
    { id: 'AAAF/2502/1DD64', name: 'Network Security Audit', status: 'Planned', risk: 'Low' },
    { id: 'AAAF/2502/1DD65', name: 'Web Application Security Review', status: 'In Progress', risk: 'High' },
  ];
  return (
    <div className="max-w-full mx-auto mt-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400">Active Projects</p>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">12</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-folder text-blue-600 dark:text-blue-400 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  font-bold text-gray-500 dark:text-gray-400">Open Vulnerabilities</p>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">28</h3>
            </div>
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-shield text-red-600 dark:text-red-400 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  font-bold text-gray-500 dark:text-gray-400">Completed Assessments</p>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">45</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-check-circle text-green-600 dark:text-green-400 text-xl"></i>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm  font-bold text-gray-500 dark:text-gray-400">Team Members</p>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">16</h3>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center">
              <i className="fa-solid fa-users text-purple-600 dark:text-purple-400 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      
      <div className="flex flex-col lg:flex-row gap-6 w-full">
        <div className="w-full lg:w-[60%] bg-whiterounded-lg shadow-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Vulnerability Trend</h3>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-3 py-1 text-sm rounded-full transition-all ${selectedPeriod === "7d" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                  onClick={() => setSelectedPeriod("7d")}
                >
                  7D
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full transition-all ${selectedPeriod === "30d" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                  onClick={() => setSelectedPeriod("30d")}
                >
                  30D
                </button>
                <button
                  className={`px-3 py-1 text-sm rounded-full transition-all ${selectedPeriod === "90d" ? "bg-blue-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"}`}
                  onClick={() => setSelectedPeriod("90d")}
                >
                  90D
                </button>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
              <div ref={trendChartRef} style={{ height: "300px" }}></div>
            </div>
          </div>
        </div>

        {/* Security Score */}
        <div className="w-full lg:w-[40%] bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-4 dark:text-white">Severity Distribution</h3>
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg" ref={severityChartRef} style={{ height: '300px' }}></div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Recent Projects</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900/50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {recentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{project.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{project.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${project.status === 'Completed' ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400' :
                        project.status === 'In Progress' ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-400' :
                          'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-400'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${project.risk === 'High' ? 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-400' :
                        project.risk === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-400' :
                          'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400'}`}>
                      {project.risk}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mr-3 !rounded-button whitespace-nowrap"
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 !rounded-button whitespace-nowrap">
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
  );
};

export default Dashboard;
