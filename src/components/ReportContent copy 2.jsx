import React, { useState } from 'react';

const ReportContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExecutiveModalOpen, setIsExecutiveModalOpen] = useState(false);
  const [isComplianceModalOpen, setIsComplianceModalOpen] = useState(false);
  const [isTechnicalStackModalOpen, setIsTechnicalStackModalOpen] = useState(false);
  const [isSecurityControlsModalOpen, setIsSecurityControlsModalOpen] = useState(false);
  const [isRecommendationsModalOpen, setIsRecommendationsModalOpen] = useState(false);
  const [editData, setEditData] = useState({
    assessmentScope: [],
    testingPeriod: {
      startDate: '',
      endDate: '',
      duration: ''
    },
    methodology: [],
    toolsEmployed: []
  });

  const [executiveData, setExecutiveData] = useState({
    summaryText: '',
    securityPosture: {
      overallScore: '',
      complianceRate: '',
      riskMitigation: ''
    },
    recommendations: []
  });

  const [complianceData, setComplianceData] = useState([
    { standard: 'ISO 27001', progress: 92 },
    { standard: 'GDPR', progress: 78 },
    { standard: 'PCI DSS', progress: 45 },
    { standard: 'SOC 2', progress: 95 }
  ]);

  const [technicalStackData, setTechnicalStackData] = useState([
    { type: 'Web Servers', count: 24, vulnerable: 3, risk: 'High' },
    { type: 'Databases', count: 12, vulnerable: 2, risk: 'Critical' },
    { type: 'Cloud Services', count: 8, vulnerable: 1, risk: 'Medium' },
    { type: 'Network Devices', count: 36, vulnerable: 4, risk: 'High' }
  ]);

  const [securityControlsData, setSecurityControlsData] = useState([
    {
      category: 'Access Control',
      score: 92,
      items: ['Multi-factor Authentication', 'Role-based Access', 'Password Policies']
    },
    {
      category: 'Network Security',
      score: 78,
      items: ['Firewall Rules', 'IDS/IPS', 'Network Segmentation']
    },
    {
      category: 'Data Protection',
      score: 65,
      items: ['Encryption', 'Data Classification', 'DLP Solutions']
    }
  ]);

  const [recommendationsData, setRecommendationsData] = useState([
    {
      title: 'Immediate Actions',
      items: [
        'Patch critical vulnerabilities in cloud infrastructure',
        'Implement Content Security Policy headers',
        'Review and update SSL/TLS configurations'
      ]
    },
    {
      title: 'Short-term Improvements',
      items: [
        'Enhance authentication mechanisms',
        'Implement regular security scanning',
        'Update security policies and procedures'
      ]
    },
    {
      title: 'Long-term Strategy',
      items: [
        'Develop security training program',
        'Implement continuous security monitoring',
        'Establish incident response procedures'
      ]
    }
  ]);

  const getStatusAndColor = (progress) => {
    if (progress >= 90) {
      return { status: 'Compliant', color: 'green' };
    } else if (progress >= 70) {
      return { status: 'Partial', color: 'yellow' };
    } else {
      return { status: 'Non-Compliant', color: 'red' };
    }
  };

  const getControlStatus = (score) => {
    if (score >= 90) {
      return { status: 'Strong', color: 'green' };
    } else if (score >= 70) {
      return { status: 'Moderate', color: 'yellow' };
    } else {
      return { status: 'Needs Improvement', color: 'red' };
    }
  };

  const handleOpenModal = () => {
    setEditData({
      assessmentScope: [
        'Web Applications (12 domains)',
        'Network Infrastructure (48 IP ranges)',
        'Cloud Services (AWS, Azure)',
        'API Endpoints (32 services)'
      ],
      testingPeriod: {
        startDate: 'February 1, 2025',
        endDate: 'March 3, 2025',
        duration: '31 days'
      },
      methodology: [
        'OWASP Testing Framework',
        'NIST Cybersecurity Framework',
        'CIS Controls Assessment'
      ],
      toolsEmployed: ['Nessus Pro', 'Burp Suite', 'Metasploit', 'Acunetix']
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Here you can handle saving the edited data
    setIsModalOpen(false);
  };

  const handleOpenExecutiveModal = () => {
    setExecutiveData({
      summaryText: 'The comprehensive security assessment conducted between February 1, 2025 and March 3, 2025 revealed several critical and high-risk vulnerabilities that require immediate attention. The assessment covered web applications, network infrastructure, and cloud services, identifying significant security gaps that pose potential risks to business operations.',
      securityPosture: {
        overallScore: '72',
        complianceRate: '85',
        riskMitigation: '68'
      },
      recommendations: [
        'Immediate patching of critical vulnerabilities in cloud infrastructure',
        'Implementation of enhanced access controls and authentication mechanisms',
        'Regular security training and awareness programs for staff'
      ]
    });
    setIsExecutiveModalOpen(true);
  };

  const handleCloseExecutiveModal = () => {
    setIsExecutiveModalOpen(false);
  };

  const handleSaveExecutive = () => {
    setIsExecutiveModalOpen(false);
  };

  const handleOpenComplianceModal = () => {
    setIsComplianceModalOpen(true);
  };

  const handleCloseComplianceModal = () => {
    setIsComplianceModalOpen(false);
  };

  const handleSaveCompliance = () => {
    setIsComplianceModalOpen(false);
  };

  const handleOpenTechnicalStackModal = () => {
    setIsTechnicalStackModalOpen(true);
  };

  const handleCloseTechnicalStackModal = () => {
    setIsTechnicalStackModalOpen(false);
  };

  const handleSaveTechnicalStack = () => {
    setIsTechnicalStackModalOpen(false);
  };

  const handleOpenSecurityControlsModal = () => {
    setIsSecurityControlsModalOpen(true);
  };

  const handleCloseSecurityControlsModal = () => {
    setIsSecurityControlsModalOpen(false);
  };

  const handleSaveSecurityControls = () => {
    setIsSecurityControlsModalOpen(false);
  };

  const handleOpenRecommendationsModal = () => {
    setIsRecommendationsModalOpen(true);
  };

  const handleCloseRecommendationsModal = () => {
    setIsRecommendationsModalOpen(false);
  };

  const handleSaveRecommendations = () => {
    setIsRecommendationsModalOpen(false);
  };

  return (
    <div className="w-full mx-auto px-4 py-6 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="space-y-8">
        <section id="confidentiality" className="bg-red-50 dark:bg-red-900/30 rounded-lg shadow p-6 border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700 dark:text-red-400">Confidentiality Statement and Disclaimer</h2>
          <div className="prose max-w-none text-red-700 dark:text-red-400">
            <p className="text-sm">
              CONFIDENTIAL DOCUMENT - RESTRICTED DISTRIBUTION
            </p>
            <p className="text-sm mt-2">
              This security assessment report contains sensitive information about system vulnerabilities and security controls. Distribution is limited to authorized personnel only. All recipients must maintain strict confidentiality and implement appropriate security controls to prevent unauthorized disclosure.
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>Distribution Restrictions:</strong> Internal use only, authorized personnel</p>
              <p><strong>Legal Notice:</strong> This report is protected under non-disclosure agreements and applicable security laws</p>
              <p><strong>Liability Statement:</strong> The assessment was performed within agreed scope and limitations</p>
            </div>
          </div>
        </section>
        
        {/* Scope and Methodology */}
        <section id="scope-methodology" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Scope and Methodology</h2>
            <button
              onClick={handleOpenModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-edit text-xl"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Assessment Scope</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {editData.assessmentScope.map((scope, index) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-check-circle text-green-500 dark:text-green-400 mr-2"></i>
                      {scope}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Testing Period</h3>
                <div className="text-gray-600 dark:text-gray-300">
                  <p>Start Date: {editData.testingPeriod.startDate}</p>
                  <p>End Date: {editData.testingPeriod.endDate}</p>
                  <p>Duration: {editData.testingPeriod.duration}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Methodology</h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  {editData.methodology.map((method, index) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-shield-alt text-blue-500 dark:text-blue-400 mr-2"></i>
                      {method}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="font-medium mb-3 text-gray-900 dark:text-white">Tools Employed</h3>
                <div className="grid grid-cols-2 gap-2">
                  {editData.toolsEmployed.map((tool, index) => (
                    <span key={index} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded text-sm">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Scope and Methodology</h3>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Assessment Scope */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Assessment Scope</h4>
                  <div className="space-y-2">
                    {editData.assessmentScope.map((scope, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={scope}
                          onChange={(e) => {
                            const newScope = [...editData.assessmentScope];
                            newScope[index] = e.target.value;
                            setEditData({ ...editData, assessmentScope: newScope });
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newScope = editData.assessmentScope.filter((_, i) => i !== index);
                            setEditData({ ...editData, assessmentScope: newScope });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditData({
                          ...editData,
                          assessmentScope: [...editData.assessmentScope, '']
                        });
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-plus mr-2"></i>Add Scope Item
                    </button>
                  </div>
                </div>

                {/* Testing Period */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Testing Period</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
                      <input
                        type="text"
                        value={editData.testingPeriod.startDate}
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            testingPeriod: { ...editData.testingPeriod, startDate: e.target.value }
                          });
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">End Date</label>
                      <input
                        type="text"
                        value={editData.testingPeriod.endDate}
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            testingPeriod: { ...editData.testingPeriod, endDate: e.target.value }
                          });
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Duration</label>
                      <input
                        type="text"
                        value={editData.testingPeriod.duration}
                        onChange={(e) => {
                          setEditData({
                            ...editData,
                            testingPeriod: { ...editData.testingPeriod, duration: e.target.value }
                          });
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Methodology */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Methodology</h4>
                  <div className="space-y-2">
                    {editData.methodology.map((method, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={method}
                          onChange={(e) => {
                            const newMethodology = [...editData.methodology];
                            newMethodology[index] = e.target.value;
                            setEditData({ ...editData, methodology: newMethodology });
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newMethodology = editData.methodology.filter((_, i) => i !== index);
                            setEditData({ ...editData, methodology: newMethodology });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditData({
                          ...editData,
                          methodology: [...editData.methodology, '']
                        });
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-plus mr-2"></i>Add Methodology Item
                    </button>
                  </div>
                </div>

                {/* Tools Employed */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Tools Employed</h4>
                  <div className="space-y-2">
                    {editData.toolsEmployed.map((tool, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={tool}
                          onChange={(e) => {
                            const newTools = [...editData.toolsEmployed];
                            newTools[index] = e.target.value;
                            setEditData({ ...editData, toolsEmployed: newTools });
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newTools = editData.toolsEmployed.filter((_, i) => i !== index);
                            setEditData({ ...editData, toolsEmployed: newTools });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditData({
                          ...editData,
                          toolsEmployed: [...editData.toolsEmployed, '']
                        });
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-plus mr-2"></i>Add Tool
                    </button>
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Risk Rating System */}
        <section id="risk-rating" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Risk Rating System</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Severity Ratings</h3>
              <div className="space-y-4">
                {[
                  { level: 'Critical', score: '9.0-10.0', color: 'red', description: 'Immediate threat to core systems' },
                  { level: 'High', score: '7.0-8.9', color: 'orange', description: 'Significant risk to operations' },
                  { level: 'Medium', score: '4.0-6.9', color: 'yellow', description: 'Moderate risk requiring attention' },
                  { level: 'Low', score: '0.1-3.9', color: 'blue', description: 'Minor risk to operations' }
                ].map((rating) => (
                  <div key={rating.level} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 text-sm rounded ${rating.color === 'red' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                          rating.color === 'orange' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                            rating.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                              'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        }`}>{rating.level}</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">CVSS: {rating.score}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{rating.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Risk Calculation Factors</h3>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Impact Factors</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <i className="fas fa-impact text-blue-500 dark:text-blue-400 mr-2"></i>
                        Data Sensitivity
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-chart-line text-blue-500 dark:text-blue-400 mr-2"></i>
                        Business Impact
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-users text-blue-500 dark:text-blue-400 mr-2"></i>
                        User Exposure
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Likelihood Factors</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                      <li className="flex items-center">
                        <i className="fas fa-shield-alt text-blue-500 dark:text-blue-400 mr-2"></i>
                        Exploit Complexity
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-user-shield text-blue-500 dark:text-blue-400 mr-2"></i>
                        Authentication Required
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-network-wired text-blue-500 dark:text-blue-400 mr-2"></i>
                        Network Vector
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Vulnerability Findings */}
        <section id="detailed-findings" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Detailed Vulnerability Findings</h2>
          <div className="space-y-6">
            {[
              {
                id: 'CVE-2025-0001',
                title: 'Remote Code Execution in API Gateway',
                severity: 'Critical',
                cvss: 9.8,
                affected: 'API Gateway v2.1.0',
                description: 'A vulnerability in the API Gateway allows remote attackers to execute arbitrary code via crafted HTTP requests.',
                impact: 'Complete system compromise, data breach risk',
                evidence: 'Proof of concept exploit developed and tested in isolated environment',
                references: ['OWASP Top 10 2025: A1', 'CWE-78']
              },
              {
                id: 'CVE-2025-0002',
                title: 'SQL Injection in User Management',
                severity: 'High',
                cvss: 8.5,
                affected: 'User Management Module v3.2.1',
                description: 'SQL injection vulnerability in user management module allows unauthorized access to database.',
                impact: 'Unauthorized data access, potential data manipulation',
                evidence: 'Successfully extracted sample records using SQLmap',
                references: ['OWASP Top 10 2025: A3', 'CWE-89']
              },
              {
                id: 'CVE-2025-0003',
                title: 'Cross-Site Scripting in Dashboard',
                severity: 'Medium',
                cvss: 6.4,
                affected: 'Dashboard UI v1.8.0',
                description: 'Stored XSS vulnerability in dashboard allows injection of malicious scripts.',
                impact: 'Session hijacking, defacement risk',
                evidence: 'Demonstrated script execution in user context',
                references: ['OWASP Top 10 2025: A7', 'CWE-79']
              }
            ].map((vuln) => (
              <div key={vuln.id} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 text-sm rounded ${vuln.severity === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                        vuln.severity === 'High' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                          'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                      }`}>{vuln.severity}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{vuln.title}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{vuln.id}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CVSS Score</h4>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">{vuln.cvss}</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Affected Component</h4>
                    <span className="text-gray-600 dark:text-gray-300">{vuln.affected}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{vuln.description}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Impact</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{vuln.impact}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Evidence</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{vuln.evidence}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">References</h4>
                    <div className="flex flex-wrap gap-2">
                      {vuln.references.map((ref, index) => (
                        <span key={index} className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-2 py-1 rounded text-sm">
                          {ref}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Summary */}
        <section id="executive-summary" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Executive Summary</h2>
            <button
              onClick={handleOpenExecutiveModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-edit text-xl"></i>
            </button>
          </div>

          <div className="space-y-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                {executiveData.summaryText}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Critical Findings Overview</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Remote Code Execution</span>
                    <span className="px-2 py-1 text-sm rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">Critical</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">SQL Injection Vulnerability</span>
                    <span className="px-2 py-1 text-sm rounded bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">High</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Authentication Bypass</span>
                    <span className="px-2 py-1 text-sm rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">Critical</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="font-medium mb-4 text-gray-900 dark:text-white">Security Posture Evaluation</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Overall Security Score</span>
                      <span className="text-gray-900 dark:text-white">{executiveData.securityPosture.overallScore}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-yellow-500 dark:bg-yellow-400 h-2 rounded-full" style={{ width: `${executiveData.securityPosture.overallScore}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Compliance Rate</span>
                      <span className="text-gray-900 dark:text-white">{executiveData.securityPosture.complianceRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-green-500 dark:bg-green-400 h-2 rounded-full" style={{ width: `${executiveData.securityPosture.complianceRate}%` }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-300">Risk Mitigation</span>
                      <span className="text-gray-900 dark:text-white">{executiveData.securityPosture.riskMitigation}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div className="bg-orange-500 dark:bg-orange-400 h-2 rounded-full" style={{ width: `${executiveData.securityPosture.riskMitigation}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
                <div className="text-red-600 dark:text-red-400 text-sm font-medium">Critical Issues</div>
                <div className="text-2xl font-bold text-red-700 dark:text-red-400 mt-1">12</div>
                <div className="text-sm text-red-600 dark:text-red-400 mt-1">Immediate Action Required</div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-900/30 p-4 rounded-lg">
                <div className="text-orange-600 dark:text-orange-400 text-sm font-medium">High Risk</div>
                <div className="text-2xl font-bold text-orange-700 dark:text-orange-400 mt-1">18</div>
                <div className="text-sm text-orange-600 dark:text-orange-400 mt-1">Urgent Attention Needed</div>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
                <div className="text-yellow-600 dark:text-yellow-400 text-sm font-medium">Medium Risk</div>
                <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-400 mt-1">24</div>
                <div className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">Planned Resolution</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
                <div className="text-blue-600 dark:text-blue-400 text-sm font-medium">Low Risk</div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400 mt-1">32</div>
                <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">Monitor and Review</div>
              </div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <h4 className="text-blue-800 dark:text-blue-400 font-medium mb-2">Key Recommendations</h4>
              <ul className="space-y-2">
                {executiveData.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                    <i className="fas fa-check-circle text-green-500 dark:text-green-400 mr-2"></i>
                    {recommendation}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Executive Summary Edit Modal */}
        {isExecutiveModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Executive Summary</h3>
                <button
                  onClick={handleCloseExecutiveModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Summary Text */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Summary Text</h4>
                  <textarea
                    value={executiveData.summaryText}
                    onChange={(e) => setExecutiveData({ ...executiveData, summaryText: e.target.value })}
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white h-32"
                  />
                </div>

                {/* Security Posture */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Security Posture</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Overall Score</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={executiveData.securityPosture.overallScore}
                        onChange={(e) => setExecutiveData({
                          ...executiveData,
                          securityPosture: { ...executiveData.securityPosture, overallScore: e.target.value }
                        })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Compliance Rate</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={executiveData.securityPosture.complianceRate}
                        onChange={(e) => setExecutiveData({
                          ...executiveData,
                          securityPosture: { ...executiveData.securityPosture, complianceRate: e.target.value }
                        })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Risk Mitigation</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={executiveData.securityPosture.riskMitigation}
                        onChange={(e) => setExecutiveData({
                          ...executiveData,
                          securityPosture: { ...executiveData.securityPosture, riskMitigation: e.target.value }
                        })}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                <div>
                  <h4 className="font-medium mb-3 text-gray-900 dark:text-white">Key Recommendations</h4>
                  <div className="space-y-2">
                    {executiveData.recommendations.map((recommendation, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={recommendation}
                          onChange={(e) => {
                            const newRecommendations = [...executiveData.recommendations];
                            newRecommendations[index] = e.target.value;
                            setExecutiveData({ ...executiveData, recommendations: newRecommendations });
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                          onClick={() => {
                            const newRecommendations = executiveData.recommendations.filter((_, i) => i !== index);
                            setExecutiveData({ ...executiveData, recommendations: newRecommendations });
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setExecutiveData({
                          ...executiveData,
                          recommendations: [...executiveData.recommendations, '']
                        });
                      }}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <i className="fas fa-plus mr-2"></i>Add Recommendation
                    </button>
                  </div>
                </div>

                {/* Save and Cancel Buttons */}
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCloseExecutiveModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveExecutive}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Status */}
        <section id="compliance" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Compliance Status</h2>
            <button
              onClick={handleOpenComplianceModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-edit text-xl"></i>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {complianceData.map((item) => {
              const { status, color } = getStatusAndColor(item.progress);
              return (
                <div key={item.standard} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-900 dark:text-white">{item.standard}</span>
                    <span className={`px-2 py-1 text-sm rounded ${
                      color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>{status}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        color === 'green' ? 'bg-green-500 dark:bg-green-400' :
                        color === 'yellow' ? 'bg-yellow-500 dark:bg-yellow-400' :
                        'bg-red-500 dark:bg-red-400'
                      }`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{item.progress}% Complete</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Compliance Edit Modal */}
        {isComplianceModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Compliance Status</h3>
                <button
                  onClick={handleCloseComplianceModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {complianceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <input
                      type="text"
                      value={item.standard}
                      onChange={(e) => {
                        const newComplianceData = [...complianceData];
                        newComplianceData[index].standard = e.target.value;
                        setComplianceData(newComplianceData);
                      }}
                      className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Standard Name"
                    />
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={item.progress}
                      onChange={(e) => {
                        const newComplianceData = [...complianceData];
                        newComplianceData[index].progress = parseInt(e.target.value) || 0;
                        setComplianceData(newComplianceData);
                      }}
                      className="w-24 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <button
                      onClick={() => {
                        const newComplianceData = complianceData.filter((_, i) => i !== index);
                        setComplianceData(newComplianceData);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setComplianceData([...complianceData, { standard: '', progress: 0 }]);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-plus mr-2"></i>Add Standard
                </button>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCloseComplianceModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveCompliance}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Technical Stack */}
        <section id="technical-stack" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Technical Stack</h2>
            <button
              onClick={handleOpenTechnicalStackModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-edit text-xl"></i>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Count</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vulnerable</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {technicalStackData.map((asset) => (
                  <tr key={asset.type} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{asset.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{asset.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{asset.vulnerable}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-sm rounded ${
                        asset.risk === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' :
                        asset.risk === 'High' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400' :
                        asset.risk === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                        'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}>{asset.risk}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Technical Stack Edit Modal */}
        {isTechnicalStackModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Technical Stack</h3>
                <button
                  onClick={handleCloseTechnicalStackModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Headers */}
                <div className="grid grid-cols-12 gap-4 items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                  <div className="col-span-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Asset Type</h4>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Count</h4>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Vulnerable</h4>
                  </div>
                  <div className="col-span-3">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Risk Level</h4>
                  </div>
                  <div className="col-span-2">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Actions</h4>
                  </div>
                </div>

                {/* Input Fields */}
                {technicalStackData.map((asset, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <input
                        type="text"
                        value={asset.type}
                        onChange={(e) => {
                          const newData = [...technicalStackData];
                          newData[index].type = e.target.value;
                          setTechnicalStackData(newData);
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter asset type"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={asset.count}
                        onChange={(e) => {
                          const newData = [...technicalStackData];
                          newData[index].count = parseInt(e.target.value) || 0;
                          setTechnicalStackData(newData);
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter count"
                        min="0"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={asset.vulnerable}
                        onChange={(e) => {
                          const newData = [...technicalStackData];
                          newData[index].vulnerable = parseInt(e.target.value) || 0;
                          setTechnicalStackData(newData);
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter vulnerable"
                        min="0"
                      />
                    </div>
                    <div className="col-span-3">
                      <select
                        value={asset.risk}
                        onChange={(e) => {
                          const newData = [...technicalStackData];
                          newData[index].risk = e.target.value;
                          setTechnicalStackData(newData);
                        }}
                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="Critical">Critical</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                    <div className="col-span-2 flex justify-end">
                      <button
                        onClick={() => {
                          const newData = technicalStackData.filter((_, i) => i !== index);
                          setTechnicalStackData(newData);
                        }}
                        className="text-red-500 hover:text-red-700"
                        title="Delete row"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setTechnicalStackData([
                      ...technicalStackData,
                      { type: '', count: 0, vulnerable: 0, risk: 'Low' }
                    ]);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-plus mr-2"></i>Add Asset
                </button>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCloseTechnicalStackModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTechnicalStack}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Controls */}
        <section id="security-controls" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Controls Assessment</h2>
            <button
              onClick={handleOpenSecurityControlsModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-edit text-xl"></i>
            </button>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {securityControlsData.map((control, index) => {
              const { status, color } = getControlStatus(control.score);
              return (
                <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium text-gray-900 dark:text-white">{control.category}</h3>
                    <span className={`px-2 py-1 text-sm rounded ${
                      color === 'green' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                      color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' :
                      'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                    }`}>{status}</span>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                      <span>Effectiveness Score</span>
                      <span>{control.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          color === 'green' ? 'bg-green-500 dark:bg-green-400' :
                          color === 'yellow' ? 'bg-yellow-500 dark:bg-yellow-400' :
                          'bg-red-500 dark:bg-red-400'
                        }`}
                        style={{ width: `${control.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {control.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <i className="fas fa-check-circle text-green-500 dark:text-green-400 mr-2"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Security Controls Edit Modal */}
        {isSecurityControlsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Security Controls</h3>
                <button
                  onClick={handleCloseSecurityControlsModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {securityControlsData.map((control, controlIndex) => (
                  <div key={controlIndex} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                        <input
                          type="text"
                          value={control.category}
                          onChange={(e) => {
                            const newData = [...securityControlsData];
                            newData[controlIndex].category = e.target.value;
                            setSecurityControlsData(newData);
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Enter category name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Effectiveness Score</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={control.score}
                          onChange={(e) => {
                            const newData = [...securityControlsData];
                            newData[controlIndex].score = parseInt(e.target.value) || 0;
                            setSecurityControlsData(newData);
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Items</label>
                      <div className="space-y-2">
                        {control.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newData = [...securityControlsData];
                                newData[controlIndex].items[itemIndex] = e.target.value;
                                setSecurityControlsData(newData);
                              }}
                              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Enter item"
                            />
                            <button
                              onClick={() => {
                                const newData = [...securityControlsData];
                                newData[controlIndex].items = control.items.filter((_, i) => i !== itemIndex);
                                setSecurityControlsData(newData);
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete item"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newData = [...securityControlsData];
                            newData[controlIndex].items.push('');
                            setSecurityControlsData(newData);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <i className="fas fa-plus mr-2"></i>Add Item
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setSecurityControlsData([
                      ...securityControlsData,
                      {
                        category: '',
                        score: 0,
                        items: ['']
                      }
                    ]);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-plus mr-2"></i>Add Security Control
                </button>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCloseSecurityControlsModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveSecurityControls}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Security Recommendations */}
        <section id="recommendations" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security Recommendations</h2>
            <button
              onClick={handleOpenRecommendationsModal}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <i className="fas fa-edit text-xl"></i>
            </button>
          </div>
          <div className="space-y-6">
            {recommendationsData.map((section, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-white">{section.title}</h3>
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                      <i className="fas fa-check-circle text-green-500 dark:text-green-400 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Security Recommendations Edit Modal */}
        {isRecommendationsModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-3/4 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Edit Security Recommendations</h3>
                <button
                  onClick={handleCloseRecommendationsModal}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {recommendationsData.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1 mr-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Title</label>
                        <input
                          type="text"
                          value={section.title}
                          onChange={(e) => {
                            const newData = [...recommendationsData];
                            newData[sectionIndex].title = e.target.value;
                            setRecommendationsData(newData);
                          }}
                          className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder="Enter section title"
                        />
                      </div>
                      <button
                        onClick={() => {
                          const newData = recommendationsData.filter((_, i) => i !== sectionIndex);
                          setRecommendationsData(newData);
                        }}
                        className="text-red-500 hover:text-red-700"
                        title="Delete section"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Recommendations</label>
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item}
                              onChange={(e) => {
                                const newData = [...recommendationsData];
                                newData[sectionIndex].items[itemIndex] = e.target.value;
                                setRecommendationsData(newData);
                              }}
                              className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                              placeholder="Enter recommendation"
                            />
                            <button
                              onClick={() => {
                                const newData = [...recommendationsData];
                                newData[sectionIndex].items = section.items.filter((_, i) => i !== itemIndex);
                                setRecommendationsData(newData);
                              }}
                              className="text-red-500 hover:text-red-700"
                              title="Delete recommendation"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newData = [...recommendationsData];
                            newData[sectionIndex].items.push('');
                            setRecommendationsData(newData);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <i className="fas fa-plus mr-2"></i>Add Recommendation
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => {
                    setRecommendationsData([
                      ...recommendationsData,
                      {
                        title: '',
                        items: ['']
                      }
                    ]);
                  }}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <i className="fas fa-plus mr-2"></i>Add Section
                </button>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={handleCloseRecommendationsModal}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveRecommendations}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Threat Intelligence */}
        <section id="threat-intelligence" className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Threat Intelligence Feed</h2>
          <div className="space-y-4">
            {[
              {
                type: 'APT Activity',
                severity: 'Critical',
                source: 'External Intelligence',
                details: 'Detected sophisticated APT group targeting financial sector',
                timestamp: '2 hours ago',
                indicators: ['Suspicious IP ranges', 'Known malware signatures', 'Command & Control patterns']
              },
              {
                type: 'Ransomware Campaign',
                severity: 'High',
                source: 'Industry Partners',
                details: 'New ransomware variant spreading through phishing emails',
                timestamp: '6 hours ago',
                indicators: ['Email patterns', 'Malicious attachments', 'Bitcoin wallet addresses']
              },
              {
                type: 'Zero-day Exploit',
                severity: 'Critical',
                source: 'Security Researchers',
                details: 'Unpatched vulnerability in common web framework',
                timestamp: '12 hours ago',
                indicators: ['Exploit code', 'Affected versions', 'Attack vectors']
              }
            ].map((threat, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg transition-colors duration-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 text-sm rounded ${
                      threat.severity === 'Critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                      'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    }`}>{threat.severity}</span>
                    <span className="font-medium text-gray-900 dark:text-white">{threat.type}</span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{threat.timestamp}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-3">{threat.details}</p>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Source: {threat.source}</div>
                <div className="flex flex-wrap gap-2">
                  {threat.indicators.map((indicator, i) => (
                    <span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                      {indicator}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
export default ReportContent


