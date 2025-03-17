import React, { useState } from 'react';
import * as echarts from 'echarts';
import { useNavigate } from 'react-router-dom';

const Repotwo = () => {
  const [selectedView, setSelectedView] = useState('table');
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);
  const [activeTab, setActiveTab] = useState('logs');
  const [showCodeCopied, setShowCodeCopied] = useState(false);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sortColumn, setSortColumn] = useState('id');
  const [sortDirection, setSortDirection] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [activeDropdownId, setActiveDropdownId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
  const [dateRange, setDateRange] = useState('all');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);





  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const navigate = useNavigate();

  const vulnerabilityDetails = {
    name: "SQL Injection in Authentication Module",
    components: ["auth-service", "user-api", "login-portal"],
    cvssScore: 8.9,
    cweReference: "CWE-89"
  };

  React.useEffect(() => {
    if (selectedView === 'report' && selectedVulnerability) {
      const cvssChart = echarts.init(document.getElementById('cvssChart'));
      const option = {
        series: [{
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 10,
          splitNumber: 5,
          animation: false,
          itemStyle: {
            color: '#ff4d4f'
          },
          progress: {
            show: true,
            width: 18
          },
          pointer: {
            show: false
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
            show: false
          },
          axisLabel: {
            show: false
          },
          title: {
            fontSize: 14
          },
          detail: {
            fontSize: 20,
            offsetCenter: [0, '0%'],
            formatter: '{value}'
          },
          data: [{
            value: selectedVulnerability.cvssScore,
            name: 'CVSS Score'
          }]
        }]
      };
      cvssChart.setOption(option);

      return () => {
        cvssChart.dispose();
      };
    }
  }, [selectedView, selectedVulnerability]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setShowCodeCopied(true);
    setTimeout(() => setShowCodeCopied(false), 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Blocked':
        return 'bg-red-100 text-red-800';
      case 'Completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleProjectSelection = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter(id => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const toggleAllProjects = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects.map(project => project.id));
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const toggleDropdown = (projectId) => {
    setActiveDropdownId(activeDropdownId === projectId ? null : projectId);
  };

  const handleProjectClick = (project) => {
    setSelectedVulnerability(project);
    setSelectedView('report');
  };

  const handleBackToTable = () => {
    setSelectedView('table');
    setSelectedVulnerability(null);
  };

  const handleViewVulnerability = (vulnerability) => {
    setSelectedVulnerability(vulnerability);
    setSelectedView('report');
  };

  const projects = [
    {
      id: 'AAAF/2502/1DD62',
      name: 'Global Marketing Campaign 2025',
      status: 'Active',
      team: ['Alexander Mitchell', 'Emma Thompson', 'Michael Chen', 'Sarah Williams'],
      isPublic: true,
      lastUpdated: '2025-03-03'
    },
    {
      id: 'BBAF/2502/2DD63',
      name: 'E-commerce Platform Redesign',
      status: 'Pending',
      team: ['James Wilson', 'Isabella Rodriguez', 'David Kim'],
      isPublic: false,
      lastUpdated: '2025-03-02'
    },
    {
      id: 'CCAF/2502/3DD64',
      name: 'AI Integration Initiative',
      status: 'Blocked',
      team: ['Oliver Brown', 'Sophia Garcia', 'William Taylor', 'Ava Martinez'],
      isPublic: true,
      lastUpdated: '2025-03-01'
    },
    {
      id: 'DDAF/2502/4DD65',
      name: 'Customer Experience Enhancement',
      status: 'Completed',
      team: ['Ethan Anderson', 'Mia Johnson', 'Lucas Lee'],
      isPublic: false,
      lastUpdated: '2025-02-28'
    },
    {
      id: 'EEAF/2502/5DD66',
      name: 'Mobile App Development',
      status: 'Active',
      team: ['Daniel White', 'Emily Davis', 'Christopher Martin'],
      isPublic: true,
      lastUpdated: '2025-02-27'
    },
    {
      id: 'FFAF/2502/6DD67',
      name: 'Data Analytics Dashboard',
      status: 'Pending',
      team: ['Sophie Wilson', 'Ryan Thompson', 'Victoria Chang'],
      isPublic: false,
      lastUpdated: '2025-02-26'
    }
  ];

  const staticVulnerabilities = [
    {
      id: 1,
      projectName: "Secure Thread",
      title: "SQL Injection in Login Form",
      description: "Critical SQL injection vulnerability found in authentication module",
      severity: "critical",
      cvssScore: "9.8",
      visibility: "private",
      status: "Completed",
      category: "Application"
    },
    {
      id: 4,
      projectName: "Vulnerabilty Management",
      title: "Outdated Dependencies",
      description: "Multiple outdated npm packages with known vulnerabilities",
      severity: "high",
      cvssScore: "8.5",
      visibility: "private",
      status: "in-progress",
      category: "Infrastructure"
    },
  ];

  if (selectedView === 'report') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-full mx-auto px-4 py-2">
          <button
            onClick={handleBackToTable}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Vulnerabilities
          </button>
        </div>

        <main className="max-w-full mx-auto">
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-full mx-auto px-4 py-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedVulnerability.title}</h1>
                  <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                    <span>Project: {selectedVulnerability.projectName}</span>
                    <span>Status: {selectedVulnerability.status}</span>
                    <span>Category: {selectedVulnerability.category}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedVulnerability.severity === 'critical' ? 'bg-red-100 text-red-800' :
                    selectedVulnerability.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                      selectedVulnerability.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                    }`}>
                    {selectedVulnerability.severity.charAt(0).toUpperCase() + selectedVulnerability.severity.slice(1)}
                  </span>
                  <button className="!rounded-button bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700">
                    Export PDF
                  </button>
                </div>
              </div>
            </div>
          </header>

          


          
          {/* Summary Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                <p className="text-gray-700">{selectedVulnerability.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Impact</h3>
                <div className="border rounded-md p-4 bg-red-50">
                  <ul className="text-gray-700 space-y-2">
                    <li>• CVSS Score: {selectedVulnerability.cvssScore}</li>
                    <li>• Visibility: {selectedVulnerability.visibility}</li>
                    <li>• Status: {selectedVulnerability.status}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Vulnerability Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Vulnerability Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Affected Components</h3>
                  <div className="flex flex-wrap gap-2">
                    {vulnerabilityDetails.components.map((component) => (
                      <span key={component} className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                        {component}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">CWE Reference</h3>
                  <a href="#" className="text-blue-600 hover:underline">
                    {vulnerabilityDetails.cweReference}
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">CVSS Score</h3>
                <div id="cvssChart" style={{ height: '200px' }}></div>
              </div>
            </div>
          </div>

          {/* PoC Section */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Proof of Concept</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Reproduction Steps</h3>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  <li>Navigate to login page at /auth/login</li>
                  <li>Intercept the login request using a proxy tool</li>
                  <li>Modify the username parameter with SQL injection payload</li>
                  <li>Observe the error response revealing database structure</li>
                </ol>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-3">Exploit Code</h3>
                <div className="relative">
                  <pre className="bg-gray-800 rounded-lg p-4 text-gray-100 font-mono text-sm">
                    {`POST /auth/login HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "username": "admin' OR '1'='1",
  "password": "anything"
}`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`POST /auth/login HTTP/1.1\nHost: example.com\nContent-Type: application/json\n\n{\n  "username": "admin' OR '1'='1",\n  "password": "anything"\n}`)}
                    className="!rounded-button absolute top-2 right-2 bg-gray-700 text-gray-300 px-3 py-1 text-sm hover:bg-gray-600"
                  >
                    Copy
                  </button>
                  {showCodeCopied && (
                    <div className="absolute top-2 right-20 bg-gray-700 text-gray-300 px-3 py-1 rounded text-sm">
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Remediation */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-6">Remediation Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Short-term Fixes</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">Implement input validation for all user inputs</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">Update SQL query construction to use parameterized queries</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">Enable WAF rules specifically for SQL injection</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-4">Long-term Solutions</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-clock text-blue-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">Migrate to prepared statements across all database operations</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock text-blue-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">Implement comprehensive security testing in CI/CD pipeline</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-clock text-blue-500 mt-1 mr-2"></i>
                    <span className="text-gray-700">Regular security training for development team</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Appendices */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-6">Appendices</h2>
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {['Logs', 'References', 'Attachments'].map((tab) => (
                  <button
                    key={tab.toLowerCase()}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`!rounded-button px-3 py-2 text-sm font-medium whitespace-nowrap ${activeTab === tab.toLowerCase()
                      ? 'border-b-2 border-blue-500 text-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div className="mt-6">
              {activeTab === 'logs' && (
                <pre className="bg-gray-50 p-4 rounded-lg text-sm font-mono text-gray-700 max-h-60 overflow-auto">
                  {`2025-03-03 18:15:23 [ERROR] SQL Error: syntax error at or near "OR"
2025-03-03 18:15:23 [WARN] Failed login attempt from IP: 192.168.1.100
2025-03-03 18:15:24 [INFO] Security alert triggered: Possible SQL injection attempt
2025-03-03 18:15:24 [DEBUG] Request parameters: username=admin' OR '1'='1`}
                </pre>
              )}
              {activeTab === 'references' && (
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">OWASP SQL Injection Prevention Cheat Sheet</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">CWE-89: SQL Injection</a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">NIST Database Security Guidelines</a>
                  </li>
                </ul>
              )}
              {activeTab === 'attachments' && (
                <ul className="space-y-3">
                  <li className="flex items-center space-x-3">
                    <i className="fas fa-file-pdf text-red-500"></i>
                    <span className="text-gray-700">Full Technical Analysis Report.pdf</span>
                    <button className="!rounded-button text-blue-600 text-sm hover:text-blue-700">Download</button>
                  </li>
                  <li className="flex items-center space-x-3">
                    <i className="fas fa-file-code text-yellow-500"></i>
                    <span className="text-gray-700">Security Scan Results.json</span>
                    <button className="!rounded-button text-blue-600 text-sm hover:text-blue-700">Download</button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full mx-auto px-4 sm:px-0 lg:px-0">
        <div className="bg-white rounded-lg shadow">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-2xl font-semibold text-gray-900">
              Vulnerablities Report
            </h1>
          </div>

          {/* Bulk Actions */}
          {selectedProjects.length > 0 && (
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{selectedProjects.length} selected</span>
                <button className="!rounded-button text-sm px-3 py-1 bg-red-600 text-white hover:bg-red-700 whitespace-nowrap">
                  <i className="fas fa-trash-alt mr-2"></i>Delete
                </button>
                <button className="!rounded-button text-sm px-3 py-1 bg-gray-600 text-white hover:bg-gray-700 whitespace-nowrap">
                  <i className="fas fa-archive mr-2"></i>Archive
                </button>
                <button className="!rounded-button text-sm px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap">
                  <i className="fas fa-users mr-2"></i>Assign Team
                </button>
              </div>
            </div>
          )}

          <div className="p-6 mb-2">
            <div className="flex items-center space-x-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedStatus('all');
                    setSelectedSeverity('all');
                    setSelectedCategory('all');
                    setDateRange('all');
                  }}
                  className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <i className="fas fa-times mr-2"></i>
                  Clear Filters
                </button>

              <div className="relative">
                <button
                  className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                >
                  Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                </button>
                {showStatusDropdown && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <div className="py-1">
                      {['all', 'open', 'in-progress', 'resolved', 'closed'].map((status) => (
                        <button
                          key={status}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedStatus(status);
                            setShowStatusDropdown(false);
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  onClick={() => setShowSeverityDropdown(!showSeverityDropdown)}
                >
                  Severity: {selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                </button>
                {showSeverityDropdown && (
                  <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                    <div className="py-1">
                      {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
                        <button
                          key={severity}
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => {
                            setSelectedSeverity(severity);
                            setShowSeverityDropdown(false);
                          }}
                        >
                          {severity.charAt(0).toUpperCase() + severity.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerability</th> */}
                {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th> */}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staticVulnerabilities.map((vuln) => (
                <tr key={vuln.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vuln.projectName}</div>
                  </td>
                  {/* <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900">{vuln.title}</div>
                    <div className="text-sm text-gray-500">{vuln.description}</div>
                  </td> */}
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vuln.severity === 'critical' ? 'bg-red-100 text-red-800' :
                        vuln.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                        }`}>
                        {vuln.severity.charAt(0).toUpperCase() + vuln.severity.slice(1)}
                      </span>
                      <div className="text-sm text-gray-500 mt-1">CVSS: {vuln.cvssScore}</div>
                    </div>
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vuln.visibility === 'private' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                      {vuln.visibility.charAt(0).toUpperCase() + vuln.visibility.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${vuln.status === 'open' ? 'bg-red-100 text-red-800' :
                      vuln.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        vuln.status === 'resolved' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                      }`}>
                      {vuln.status.charAt(0).toUpperCase() + vuln.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewVulnerability(vuln)}
                      className="flex items-center justify-center px-4 p-2 rounded-md bg-green-500 border-dotted border-2 border-gray-300 text-white hover:bg-blue-600 transition"
                      title="View Report"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>


                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-white px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-medium">1</span> to <span className="font-medium">6</span> of{' '}
                  <span className="font-medium">6</span> results
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="!rounded-button px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                  Previous
                </button>
                <button className="!rounded-button px-3 py-1 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 whitespace-nowrap">
                  Next
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default Repotwo;