import React, { useState } from 'react';
// import PreviewForm from './PreviewForm';

const InitialClientWorksheet = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [formData, setFormData] = useState({
    companyInfo: {
      name: 'EGS Security Solutions',
      logo: 'https://example.com/logo.png',
      address: '123 Security Street, Cyber City, 12345',
      phone: '+1 (555) 123-4567',
      email: 'contact@egssecurity.com',
      website: 'www.egssecurity.com'
    },
    projectInfo: {
      projectId: '23-12-PROJ001',
      projectTitle: 'Comprehensive Security Assessment 2024',
      startDate: '2024-03-15',
      expectedEndDate: '2024-04-15',
      confidentialityLevel: 'CONFIDENTIAL'
    },
    clientInfo: {
      company: 'TechCorp Solutions Inc.',
      streetAddress: '456 Business Avenue, Suite 100, Tech Park',
      cityStateZIP: 'San Francisco, CA 94105',
      primaryContactName: 'John Smith',
      primaryContactPhone: '+1 (555) 987-6543',
      primaryContactEmail: 'john.smith@techcorp.com',
      alternateContactName: 'Sarah Johnson',
      alternateContactPhone: '+1 (555) 456-7890',
      alternateContactEmail: 'sarah.j@techcorp.com'
    },
    teleconferenceInfo: {
      dateTime: '2024-03-20T10:00',
      pointOfContact: 'John Smith',
      teleconferenceNumber: '+1 (555) 123-4567'
    },
    clientRequirements: {
      frap: {
        initialFrap: true,
        followUpRiskActionPlan: true,
        detailedAnalysisRiskActionPlan: true,
        customOptions: [
          { id: 1, label: 'Custom Risk Assessment', checked: true },
          { id: 2, label: 'Compliance Review', checked: true }
        ],
        notes: 'Need comprehensive risk assessment focusing on cloud infrastructure and data protection.'
      },
      issa: {
        antivirusAdministration: true,
        businessContinuityPlan: true,
        coreApplicationSystemSecurity: true,
        coreSystemInUse: 'Salesforce, SAP, Oracle',
        policyProcedures: true,
        firewallAdministration: true,
        followUpStatus: true,
        networkMonitoring: true,
        networkTopology: true,
        patchManagementProcess: true,
        physicalSecurity: true,
        dataBackupRecovery: true,
        routerAdministration: true,
        serverAdministration: true,
        switchAdministration: true,
        insuranceCoverage: true,
        workstationAdministration: true,
        customOptions: [
          { id: 1, label: 'Cloud Security Assessment', checked: true },
          { id: 2, label: 'Mobile Device Management', checked: true }
        ],
        notes: 'Focus on cloud security and mobile device management policies.'
      },
      footprinting: true,
      footprintingNotes: 'Include social media presence and public domain analysis.',
      externalVulnerabilityAssessment: {
        internetVulnerabilityAssessment: true,
        externalIPsToTest: '5',
        totalExternalIPs: '10',
        customOptions: [
          { id: 1, label: 'Web Application Security', checked: true },
          { id: 2, label: 'API Security Testing', checked: true }
        ],
        notes: 'Focus on web applications and API endpoints.'
      },
      internalVulnerabilityAssessment: {
        networkVulnerabilityAssessment: true,
        internalIPsToTest: '50',
        totalInternalIPs: '100',
        customOptions: [
          { id: 1, label: 'Internal Network Segmentation', checked: true },
          { id: 2, label: 'Privileged Access Management', checked: true }
        ],
        notes: 'Include network segmentation and access control review.'
      },
      externalPenetrationTesting: {
        testingType: 'whiteBox',
        components: {
          firewalls: true,
          passwords: true,
          webServers: true,
          webApplications: true,
          ids: true,
          sqlInjection: true,
          routers: true,
          emailServer: true,
          customOptions: [
            { id: 1, label: 'Cloud Infrastructure Testing', checked: true },
            { id: 2, label: 'API Security Testing', checked: true }
          ]
        },
        notes: 'Include cloud infrastructure and API security testing.'
      },
      internalPenetrationTesting: {
        testingType: 'whiteBox',
        components: {
          operatingSystems: true,
          routers: true,
          applications: true,
          switches: true,
          customOptions: [
            { id: 1, label: 'Active Directory Security', checked: true },
            { id: 2, label: 'Privilege Escalation Testing', checked: true }
          ]
        },
        notes: 'Focus on Active Directory and privilege escalation vectors.'
      },
      externalModemAssessment: true,
      externalModemNotes: 'Include remote access security review.',
      socialEngineering: {
        humanBased: true,
        computerBased: true,
        dumpsterDiving: true,
        shoulderSurfing: true,
        customOptions: [
          { id: 1, label: 'Phishing Campaign', checked: true },
          { id: 2, label: 'Vishing Assessment', checked: true }
        ],
        notes: 'Include comprehensive social engineering assessment.'
      },
      wirelessNetworkAssessment: true,
      wirelessNetworkNotes: 'Focus on WPA3 implementation and guest network security.',
      physicalSecurityAssessment: true,
      physicalSecurityNotes: 'Include data center and server room security.',
      cloudSecurityAssessment: true,
      cloudSecurityNotes: 'Focus on AWS and Azure security configurations.',
      mobileDeviceSecurityAssessment: true,
      mobileDeviceNotes: 'Include BYOD policy review and mobile device management.',
      gapAnalysis: {
        grammLeachBliley: true,
        pciDss: true,
        hippa: true,
        fisma: true,
        sox: true,
        customOptions: [
          { id: 1, label: 'GDPR Compliance', checked: true },
          { id: 2, label: 'ISO 27001', checked: true }
        ],
        notes: 'Comprehensive compliance gap analysis required.'
      },
      otherRequirements: [
        'Custom Security Training',
        'Incident Response Plan Review',
        'Security Documentation Review'
      ],
      otherRequirementsNotes: 'Additional focus on security awareness training and documentation.'
    },
    teleconferenceNotes: 'Initial kickoff meeting to discuss project scope and timeline. Key stakeholders will be present. Need to discuss access requirements and testing windows.'
  });

  const handleChange = (section, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value
      }
    }));
  };

  const handleNestedChange = (section, subsection, field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subsection]: {
          ...prevData[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleComponentChange = (section, subsection, component, value) => {
    setFormData(prevData => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [subsection]: {
          ...prevData[section][subsection],
          components: {
            ...prevData[section][subsection].components,
            [component]: value
          }
        }
      }
    }));
  };

  const addOtherItem = (section, subsection, item) => {
    if (item && item.trim() !== '') {
      setFormData(prevData => {
        if (subsection === 'otherRequirements') {
          return {
            ...prevData,
            [section]: {
              ...prevData[section],
              [subsection]: [...prevData[section][subsection], item]
            }
          };
        } else {
          return {
            ...prevData,
            [section]: {
              ...prevData[section],
              [subsection]: {
                ...prevData[section][subsection],
                other: [...prevData[section][subsection].other, item]
              }
            }
          };
        }
      });
    }
  };

  // Add custom option to a section
  const addCustomOption = (section, subsection, option) => {
    if (option && option.trim() !== '') {
      setFormData(prevData => {
        if (subsection) {
          // Handle nested sections
          return {
            ...prevData,
            [section]: {
              ...prevData[section],
              [subsection]: {
                ...prevData[section][subsection],
                customOptions: [
                  ...prevData[section][subsection].customOptions,
                  { id: Date.now(), label: option, checked: false }
                ]
              }
            }
          };
        } else {
          // Handle direct sections
          return {
            ...prevData,
            [section]: {
              ...prevData[section],
              customOptions: [
                ...prevData[section].customOptions,
                { id: Date.now(), label: option, checked: false }
              ]
            }
          };
        }
      });
    }
  };

  // Remove custom option from a section
  const removeCustomOption = (section, subsection, optionId) => {
    setFormData(prevData => {
      if (subsection) {
        // Handle nested sections
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [subsection]: {
              ...prevData[section][subsection],
              customOptions: prevData[section][subsection].customOptions.filter(
                option => option.id !== optionId
              )
            }
          }
        };
      } else {
        // Handle direct sections
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            customOptions: prevData[section].customOptions.filter(
              option => option.id !== optionId
            )
          }
        };
      }
    });
  };

  // Toggle custom option state
  const toggleCustomOption = (section, subsection, optionId) => {
    setFormData(prevData => {
      if (subsection) {
        // Handle nested sections
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            [subsection]: {
              ...prevData[section][subsection],
              customOptions: prevData[section][subsection].customOptions.map(
                option => option.id === optionId
                  ? { ...option, checked: !option.checked }
                  : option
              )
            }
          }
        };
      } else {
        // Handle direct sections
        return {
          ...prevData,
          [section]: {
            ...prevData[section],
            customOptions: prevData[section].customOptions.map(
              option => option.id === optionId
                ? { ...option, checked: !option.checked }
                : option
            )
          }
        };
      }
    });
  };

  const handleExportPDF = async () => {
    try {
      setIsExporting(true);

      const response = await fetch('http://localhost:5000/pdf/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          formData: formData,
          url: window.location.href
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate PDF');
      }

      const pdfBlob = await response.blob();
      const blobUrl = window.URL.createObjectURL(pdfBlob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'securethread-website.pdf';  // Changed filename

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);

    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF: ' + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">EGS Security Solutions</h1>
        <h2 className="text-xl">Initial Client Worksheet</h2>
        <p className="text-gray-600">CONFIDENTIAL - Engagement Task Log</p>
        <p className="text-gray-600">EGS SECURITY SERVICES PENETRATION TESTING TELECONFERENCE WORKSHEET</p>
      </div>

      {/* SECTION 1 - CLIENT INFORMATION */}
      <div className="mb-8 border p-4 rounded">
        <h3 className="text-lg font-bold mb-4 bg-gray-100 p-2">SECTION 1 - CLIENT INFORMATION</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Company:</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.clientInfo.company}
              onChange={(e) => handleChange('clientInfo', 'company', e.target.value)}
            />
          </div>

          <div className="md:row-span-2">
            <label className="block text-gray-700 font-semibold mb-1">Street Address:</label>
            <textarea
              className="w-full border rounded p-2 h-24"
              value={formData.clientInfo.streetAddress}
              onChange={(e) => handleChange('clientInfo', 'streetAddress', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">City, State, ZIP:</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.clientInfo.cityStateZIP}
              onChange={(e) => handleChange('clientInfo', 'cityStateZIP', e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <h4 className="font-semibold mb-2">Primary Contact</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 mb-1">Name:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientInfo.primaryContactName}
                  onChange={(e) => handleChange('clientInfo', 'primaryContactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientInfo.primaryContactPhone}
                  onChange={(e) => handleChange('clientInfo', 'primaryContactPhone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email:</label>
                <input
                  type="email"
                  className="w-full border rounded p-2"
                  value={formData.clientInfo.primaryContactEmail}
                  onChange={(e) => handleChange('clientInfo', 'primaryContactEmail', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Alternate Contact</h4>
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 mb-1">Name:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientInfo.alternateContactName}
                  onChange={(e) => handleChange('clientInfo', 'alternateContactName', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Phone:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientInfo.alternateContactPhone}
                  onChange={(e) => handleChange('clientInfo', 'alternateContactPhone', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Email:</label>
                <input
                  type="email"
                  className="w-full border rounded p-2"
                  value={formData.clientInfo.alternateContactEmail}
                  onChange={(e) => handleChange('clientInfo', 'alternateContactEmail', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2 - TELECONFERENCE INFORMATION */}
      <div className="mb-8 border p-4 rounded">
        <h3 className="text-lg font-bold mb-4 bg-gray-100 p-2">SECTION 2 - TELECONFERENCE INFORMATION</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Date & Time:</label>
            <input
              type="datetime-local"
              className="w-full border rounded p-2"
              value={formData.teleconferenceInfo.dateTime}
              onChange={(e) => handleChange('teleconferenceInfo', 'dateTime', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Point of Contact:</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.teleconferenceInfo.pointOfContact}
              onChange={(e) => handleChange('teleconferenceInfo', 'pointOfContact', e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">Teleconference Number:</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.teleconferenceInfo.teleconferenceNumber}
              onChange={(e) => handleChange('teleconferenceInfo', 'teleconferenceNumber', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* SECTION 3 - CLIENT REQUIREMENTS */}
      <div className="mb-8 border p-4 rounded">
        <h3 className="text-lg font-bold mb-4 bg-gray-100 p-2">SECTION 3 - CLIENT REQUIREMENTS</h3>

        {/* FRAP Section */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">FACILITATED RISK ANALYSIS PROCESS (FRAP)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="initialFrap"
                className="mr-2"
                checked={formData.clientRequirements.frap.initialFrap}
                onChange={(e) => handleNestedChange('clientRequirements', 'frap', 'initialFrap', e.target.checked)}
              />
              <label htmlFor="initialFrap">Initial FRAP</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="followUpRiskActionPlan"
                className="mr-2"
                checked={formData.clientRequirements.frap.followUpRiskActionPlan}
                onChange={(e) => handleNestedChange('clientRequirements', 'frap', 'followUpRiskActionPlan', e.target.checked)}
              />
              <label htmlFor="followUpRiskActionPlan">Follow-up on Risk Action Plan</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="detailedAnalysisRiskActionPlan"
                className="mr-2"
                checked={formData.clientRequirements.frap.detailedAnalysisRiskActionPlan}
                onChange={(e) => handleNestedChange('clientRequirements', 'frap', 'detailedAnalysisRiskActionPlan', e.target.checked)}
              />
              <label htmlFor="detailedAnalysisRiskActionPlan">Detailed analysis of Risk Action Plan</label>
            </div>

            {/* Custom FRAP Options */}
            {formData.clientRequirements.frap.customOptions.map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`frap-${option.id}`}
                  className="mr-2"
                  checked={option.checked}
                  onChange={() => toggleCustomOption('clientRequirements', 'frap', option.id)}
                />
                <label htmlFor={`frap-${option.id}`} className="flex-grow">{option.label}</label>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => removeCustomOption('clientRequirements', 'frap', option.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add custom FRAP option */}
          <div className="mt-4 flex">
            <input
              type="text"
              id="newFrapOption"
              placeholder="Add custom FRAP option..."
              className="border rounded p-2 flex-grow"
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                const input = document.getElementById('newFrapOption');
                addCustomOption('clientRequirements', 'frap', input.value);
                input.value = '';
              }}
            >
              Add
            </button>
          </div>

          {/* FRAP Notes */}
          <div className="mt-4">
            <label htmlFor="frapNotes" className="block text-gray-700 font-semibold mb-1">
              FRAP Notes:
            </label>
            <textarea
              id="frapNotes"
              className="w-full border rounded p-2 h-20"
              placeholder="Enter additional notes about FRAP requirements..."
              value={formData.clientRequirements.frap.notes}
              onChange={(e) => handleNestedChange('clientRequirements', 'frap', 'notes', e.target.value)}
            />
          </div>
        </div>

        {/* ISSA Section */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">INFORMATION SYSTEMS SECURITY ASSESSMENT</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="antivirusAdministration"
                className="mr-2"
                checked={formData.clientRequirements.issa.antivirusAdministration}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'antivirusAdministration', e.target.checked)}
              />
              <label htmlFor="antivirusAdministration">Antivirus Administration & Configuration</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="networkTopology"
                className="mr-2"
                checked={formData.clientRequirements.issa.networkTopology}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'networkTopology', e.target.checked)}
              />
              <label htmlFor="networkTopology">Network Topology</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="businessContinuityPlan"
                className="mr-2"
                checked={formData.clientRequirements.issa.businessContinuityPlan}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'businessContinuityPlan', e.target.checked)}
              />
              <label htmlFor="businessContinuityPlan">Business Continuity Plan (BCP) & Disaster Recovery Plan (DRP)</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="patchManagementProcess"
                className="mr-2"
                checked={formData.clientRequirements.issa.patchManagementProcess}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'patchManagementProcess', e.target.checked)}
              />
              <label htmlFor="patchManagementProcess">Patch Management Process</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="coreApplicationSystemSecurity"
                className="mr-2"
                checked={formData.clientRequirements.issa.coreApplicationSystemSecurity}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'coreApplicationSystemSecurity', e.target.checked)}
              />
              <label htmlFor="coreApplicationSystemSecurity">Core Application System Security</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="physicalSecurity"
                className="mr-2"
                checked={formData.clientRequirements.issa.physicalSecurity}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'physicalSecurity', e.target.checked)}
              />
              <label htmlFor="physicalSecurity">Physical Security</label>
            </div>
          </div>

          <div className="mt-2">
            <label className="block text-gray-700 mb-1">What core system is in use?</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={formData.clientRequirements.issa.coreSystemInUse}
              onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'coreSystemInUse', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="policyProcedures"
                className="mr-2"
                checked={formData.clientRequirements.issa.policyProcedures}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'policyProcedures', e.target.checked)}
              />
              <label htmlFor="policyProcedures">Policy, Procedures and Documentation</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="dataBackupRecovery"
                className="mr-2"
                checked={formData.clientRequirements.issa.dataBackupRecovery}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'dataBackupRecovery', e.target.checked)}
              />
              <label htmlFor="dataBackupRecovery">Data Backup & Recovery</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="firewallAdministration"
                className="mr-2"
                checked={formData.clientRequirements.issa.firewallAdministration}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'firewallAdministration', e.target.checked)}
              />
              <label htmlFor="firewallAdministration">Firewall Administration & Configuration</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="routerAdministration"
                className="mr-2"
                checked={formData.clientRequirements.issa.routerAdministration}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'routerAdministration', e.target.checked)}
              />
              <label htmlFor="routerAdministration">Router Administration & Configuration</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="followUpStatus"
                className="mr-2"
                checked={formData.clientRequirements.issa.followUpStatus}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'followUpStatus', e.target.checked)}
              />
              <label htmlFor="followUpStatus">Follow-up Status of Recommendations</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="serverAdministration"
                className="mr-2"
                checked={formData.clientRequirements.issa.serverAdministration}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'serverAdministration', e.target.checked)}
              />
              <label htmlFor="serverAdministration">Server Administration & Configuration</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="insuranceCoverage"
                className="mr-2"
                checked={formData.clientRequirements.issa.insuranceCoverage}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'insuranceCoverage', e.target.checked)}
              />
              <label htmlFor="insuranceCoverage">Insurance Coverage</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="switchAdministration"
                className="mr-2"
                checked={formData.clientRequirements.issa.switchAdministration}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'switchAdministration', e.target.checked)}
              />
              <label htmlFor="switchAdministration">Switch Administration & Configuration</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="networkMonitoring"
                className="mr-2"
                checked={formData.clientRequirements.issa.networkMonitoring}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'networkMonitoring', e.target.checked)}
              />
              <label htmlFor="networkMonitoring">Network Monitoring & Intrusion Detection</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="workstationAdministration"
                className="mr-2"
                checked={formData.clientRequirements.issa.workstationAdministration}
                onChange={(e) => handleNestedChange('clientRequirements', 'issa', 'workstationAdministration', e.target.checked)}
              />
              <label htmlFor="workstationAdministration">Workstation Administration & Configuration</label>
            </div>
          </div>
        </div>

        {/* Footprinting Section */}
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="footprinting"
              className="mr-2"
              checked={formData.clientRequirements.footprinting}
              onChange={(e) => handleChange('clientRequirements', 'footprinting', e.target.checked)}
            />
            <label htmlFor="footprinting" className="font-bold">FOOTPRINTING INFORMATION ANALYSIS</label>
          </div>

          {/* Footprinting Notes */}
          <div className="mt-4">
            <label htmlFor="footprintingNotes" className="block text-gray-700 font-semibold mb-1">
              Footprinting Notes:
            </label>
            <textarea
              id="footprintingNotes"
              className="w-full border rounded p-2 h-20"
              placeholder="Enter additional notes about footprinting analysis..."
              value={formData.clientRequirements.footprintingNotes}
              onChange={(e) => handleChange('clientRequirements', 'footprintingNotes', e.target.value)}
            />
          </div>
        </div>

        {/* External Vulnerability Assessment */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">EXTERNAL VULNERABILITY ASSESSMENT</h4>
          <div className="ml-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="internetVulnerabilityAssessment"
                className="mr-2"
                checked={formData.clientRequirements.externalVulnerabilityAssessment.internetVulnerabilityAssessment}
                onChange={(e) => handleNestedChange('clientRequirements', 'externalVulnerabilityAssessment', 'internetVulnerabilityAssessment', e.target.checked)}
              />
              <label htmlFor="internetVulnerabilityAssessment">Internet Vulnerability Assessment (Once)</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-gray-700 mb-1">Number External IPs to be tested:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientRequirements.externalVulnerabilityAssessment.externalIPsToTest}
                  onChange={(e) => handleNestedChange('clientRequirements', 'externalVulnerabilityAssessment', 'externalIPsToTest', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Total number external IPs in organization:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientRequirements.externalVulnerabilityAssessment.totalExternalIPs}
                  onChange={(e) => handleNestedChange('clientRequirements', 'externalVulnerabilityAssessment', 'totalExternalIPs', e.target.value)}
                />
              </div>
            </div>

            {/* Custom External Vulnerability Assessment Options */}
            {formData.clientRequirements.externalVulnerabilityAssessment.customOptions.map(option => (
              <div key={option.id} className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id={`eva-${option.id}`}
                  className="mr-2"
                  checked={option.checked}
                  onChange={() => toggleCustomOption('clientRequirements', 'externalVulnerabilityAssessment', option.id)}
                />
                <label htmlFor={`eva-${option.id}`} className="flex-grow">{option.label}</label>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => removeCustomOption('clientRequirements', 'externalVulnerabilityAssessment', option.id)}
                >
                  ✕
                </button>
              </div>
            ))}

            {/* Add custom External Vulnerability Assessment option */}
            <div className="mt-4 flex">
              <input
                type="text"
                id="newEvaOption"
                placeholder="Add custom option..."
                className="border rounded p-2 flex-grow"
              />
              <button
                type="button"
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => {
                  const input = document.getElementById('newEvaOption');
                  addCustomOption('clientRequirements', 'externalVulnerabilityAssessment', input.value);
                  input.value = '';
                }}
              >
                Add
              </button>
            </div>

            {/* External Vulnerability Assessment Notes */}
            <div className="mt-4">
              <label htmlFor="evaNote" className="block text-gray-700 font-semibold mb-1">
                External Vulnerability Assessment Notes:
              </label>
              <textarea
                id="evaNote"
                className="w-full border rounded p-2 h-20"
                placeholder="Enter additional notes about external vulnerability assessment..."
                value={formData.clientRequirements.externalVulnerabilityAssessment.notes}
                onChange={(e) => handleNestedChange('clientRequirements', 'externalVulnerabilityAssessment', 'notes', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Internal Vulnerability Assessment */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">INTERNAL VULNERABILITY ASSESSMENT</h4>
          <div className="ml-4">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="networkVulnerabilityAssessment"
                className="mr-2"
                checked={formData.clientRequirements.internalVulnerabilityAssessment.networkVulnerabilityAssessment}
                onChange={(e) => handleNestedChange('clientRequirements', 'internalVulnerabilityAssessment', 'networkVulnerabilityAssessment', e.target.checked)}
              />
              <label htmlFor="networkVulnerabilityAssessment">Network Vulnerability Assessment (Once)</label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div>
                <label className="block text-gray-700 mb-1">Number Internal IPs to be tested:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientRequirements.internalVulnerabilityAssessment.internalIPsToTest}
                  onChange={(e) => handleNestedChange('clientRequirements', 'internalVulnerabilityAssessment', 'internalIPsToTest', e.target.value)}
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1">Total number internal IPs in organization:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.clientRequirements.internalVulnerabilityAssessment.totalInternalIPs}
                  onChange={(e) => handleNestedChange('clientRequirements', 'internalVulnerabilityAssessment', 'totalInternalIPs', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* More assessments would go here, following the same pattern... */}

        {/* Various other security assessment sections would be added similarly */}
        <div className="space-y-8">
          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="wirelessNetworkAssessment"
                className="mr-2"
                checked={formData.clientRequirements.wirelessNetworkAssessment}
                onChange={(e) => handleChange('clientRequirements', 'wirelessNetworkAssessment', e.target.checked)}
              />
              <label htmlFor="wirelessNetworkAssessment" className="font-bold">WIRELESS NETWORK (WLAN) SECURITY ASSESSMENT</label>
            </div>
            <div className="mt-2 ml-6">
              <textarea
                className="w-full border rounded p-2 h-20"
                placeholder="Enter wireless network assessment notes..."
                value={formData.clientRequirements.wirelessNetworkNotes}
                onChange={(e) => handleChange('clientRequirements', 'wirelessNetworkNotes', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="physicalSecurityAssessment"
                className="mr-2"
                checked={formData.clientRequirements.physicalSecurityAssessment}
                onChange={(e) => handleChange('clientRequirements', 'physicalSecurityAssessment', e.target.checked)}
              />
              <label htmlFor="physicalSecurityAssessment" className="font-bold">PHYSICAL SECURITY ASSESSMENT</label>
            </div>
            <div className="mt-2 ml-6">
              <textarea
                className="w-full border rounded p-2 h-20"
                placeholder="Enter physical security assessment notes..."
                value={formData.clientRequirements.physicalSecurityNotes}
                onChange={(e) => handleChange('clientRequirements', 'physicalSecurityNotes', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cloudSecurityAssessment"
                className="mr-2"
                checked={formData.clientRequirements.cloudSecurityAssessment}
                onChange={(e) => handleChange('clientRequirements', 'cloudSecurityAssessment', e.target.checked)}
              />
              <label htmlFor="cloudSecurityAssessment" className="font-bold">CLOUD SECURITY ASSESSMENT</label>
            </div>
            <div className="mt-2 ml-6">
              <textarea
                className="w-full border rounded p-2 h-20"
                placeholder="Enter cloud security assessment notes..."
                value={formData.clientRequirements.cloudSecurityNotes}
                onChange={(e) => handleChange('clientRequirements', 'cloudSecurityNotes', e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="mobileDeviceSecurityAssessment"
                className="mr-2"
                checked={formData.clientRequirements.mobileDeviceSecurityAssessment}
                onChange={(e) => handleChange('clientRequirements', 'mobileDeviceSecurityAssessment', e.target.checked)}
              />
              <label htmlFor="mobileDeviceSecurityAssessment" className="font-bold">MOBILE DEVICE SECURITY ASSESSMENT</label>
            </div>
            <div className="mt-2 ml-6">
              <textarea
                className="w-full border rounded p-2 h-20"
                placeholder="Enter mobile device security assessment notes..."
                value={formData.clientRequirements.mobileDeviceNotes}
                onChange={(e) => handleChange('clientRequirements', 'mobileDeviceNotes', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* GAP Analysis Section */}
        <div className="mt-6">
          <h4 className="font-bold mb-2">GAP ANALYSIS</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="grammLeachBliley"
                className="mr-2"
                checked={formData.clientRequirements.gapAnalysis.grammLeachBliley}
                onChange={(e) => handleNestedChange('clientRequirements', 'gapAnalysis', 'grammLeachBliley', e.target.checked)}
              />
              <label htmlFor="grammLeachBliley">GRAMM-LEACH-BLILEY GAP ANALYSIS</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="pciDss"
                className="mr-2"
                checked={formData.clientRequirements.gapAnalysis.pciDss}
                onChange={(e) => handleNestedChange('clientRequirements', 'gapAnalysis', 'pciDss', e.target.checked)}
              />
              <label htmlFor="pciDss">PCI-DSS GAP ANALYSIS</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="hippa"
                className="mr-2"
                checked={formData.clientRequirements.gapAnalysis.hippa}
                onChange={(e) => handleNestedChange('clientRequirements', 'gapAnalysis', 'hippa', e.target.checked)}
              />
              <label htmlFor="hippa">HIPPA GAP ANALYSIS</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="fisma"
                className="mr-2"
                checked={formData.clientRequirements.gapAnalysis.fisma}
                onChange={(e) => handleNestedChange('clientRequirements', 'gapAnalysis', 'fisma', e.target.checked)}
              />
              <label htmlFor="fisma">FISMA GAP ANALYSIS</label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="sox"
                className="mr-2"
                checked={formData.clientRequirements.gapAnalysis.sox}
                onChange={(e) => handleNestedChange('clientRequirements', 'gapAnalysis', 'sox', e.target.checked)}
              />
              <label htmlFor="sox">SOX GAP ANALYSIS</label>
            </div>

            {/* Custom GAP Analysis Options */}
            {formData.clientRequirements.gapAnalysis.customOptions.map(option => (
              <div key={option.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`gap-${option.id}`}
                  className="mr-2"
                  checked={option.checked}
                  onChange={() => toggleCustomOption('clientRequirements', 'gapAnalysis', option.id)}
                />
                <label htmlFor={`gap-${option.id}`} className="flex-grow">{option.label}</label>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => removeCustomOption('clientRequirements', 'gapAnalysis', option.id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add custom GAP Analysis option */}
          <div className="mt-4 flex">
            <input
              type="text"
              id="newGapOption"
              placeholder="Add custom GAP analysis..."
              className="border rounded p-2 flex-grow"
            />
            <button
              type="button"
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                const input = document.getElementById('newGapOption');
                addCustomOption('clientRequirements', 'gapAnalysis', input.value);
                input.value = '';
              }}
            >
              Add
            </button>
          </div>

          {/* GAP Analysis Notes */}
          <div className="mt-4">
            <label htmlFor="gapNotes" className="block text-gray-700 font-semibold mb-1">
              GAP Analysis Notes:
            </label>
            <textarea
              id="gapNotes"
              className="w-full border rounded p-2 h-20"
              placeholder="Enter additional notes about GAP analysis requirements..."
              value={formData.clientRequirements.gapAnalysis.notes}
              onChange={(e) => handleNestedChange('clientRequirements', 'gapAnalysis', 'notes', e.target.value)}
            />
          </div>
        </div>

        {/* Other Requirements */}
        <div className="mt-6">
          <h4 className="font-bold mb-2">OTHER REQUIREMENTS</h4>
          <div className="space-y-2">
            {formData.clientRequirements.otherRequirements.map((item, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" checked className="mr-2" readOnly />
                <span className="flex-grow">{item}</span>
                <button
                  type="button"
                  className="text-red-500 ml-2"
                  onClick={() => {
                    setFormData(prevData => ({
                      ...prevData,
                      clientRequirements: {
                        ...prevData.clientRequirements,
                        otherRequirements: prevData.clientRequirements.otherRequirements.filter((_, i) => i !== index)
                      }
                    }));
                  }}
                >
                  ✕
                </button>
              </div>
            ))}

            <div className="flex">
              <input
                type="text"
                className="border rounded p-2 flex-grow"
                id="otherRequirement"
                placeholder="Specify other requirement"
              />
              <button
                type="button"
                className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={(e) => {
                  const input = document.getElementById('otherRequirement');
                  addOtherItem('clientRequirements', 'otherRequirements', input.value);
                  input.value = '';
                }}
              >
                Add
              </button>
            </div>

            {/* Other Requirements Notes */}
            <div className="mt-4">
              <label htmlFor="otherRequirementsNotes" className="block text-gray-700 font-semibold mb-1">
                Other Requirements Notes:
              </label>
              <textarea
                id="otherRequirementsNotes"
                className="w-full border rounded p-2 h-20"
                placeholder="Enter additional notes about other requirements..."
                value={formData.clientRequirements.otherRequirementsNotes}
                onChange={(e) => handleChange('clientRequirements', 'otherRequirementsNotes', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4 - TELECONFERENCE NOTES */}
      <div className="mb-8 border p-4 rounded">
        <h3 className="text-lg font-bold mb-4 bg-gray-100 p-2">SECTION 4 - TELECONFERENCE NOTES</h3>

        <div>
          <textarea
            className="w-full border rounded p-2 h-32"
            value={formData.teleconferenceNotes}
            onChange={(e) => handleChange('teleconferenceNotes', '', e.target.value)}
            placeholder="Enter teleconference notes here..."
          />
        </div>
      </div>

      {/* SECTION 5 - FREQUENTLY ASKED QUESTIONS */}
      <div className="mb-8 border p-4 rounded">
        <h3 className="text-lg font-bold mb-4 bg-gray-100 p-2">SECTION 5 - FREQUENTLY ASKED QUESTIONS</h3>

        <div className="space-y-4">
          <div className="border-b pb-4">
            <h4 className="font-semibold mb-2">FRAP (Facilitated Risk Assessment Process)</h4>
            <div className="space-y-2">
              <p><strong>Initial FRAP:</strong> Sessions with key personnel from EACH department. Participants identify critical information assets, assess threats and vulnerabilities to identified assets, analyze the impact on the organization of identified threats and identify mitigating controls. Risks are identified and prioritized using the CIA Triad of Confidentiality, Integrity and Availability. Mitigating controls are then assigned to each risk. Deliverables include a Risk Action Plan template that the client organization will use to assign timelines and responsible persons to each identified risk and associated controls.</p>
              <p><strong>Follow Up of Risk Action Plan:</strong> Review of existing RAP in light of changes in the client organization's security environment.</p>
              <p><strong>Detailed analysis of Risk Action Plan:</strong> Review of existing RAP, breaking general risks into specific areas, e.g., power outage becomes power outage {'>'}  30 min, power outage {'>'} 1 day, power outage {'>'} 1 week.</p>
            </div>
          </div>

          <div className="border-b pb-4">
            <h4 className="font-semibold mb-2">ISSA (Information Systems Security Assessment)</h4>
            <div className="space-y-2">
              <p><strong>Antivirus Administration & Configuration:</strong> Includes review of existing policies and procedures with recommendations for minimum included items; review of installed AV software (version, patch & hotfix level, capabilities, update frequency, distribution scheme); host/appliance OS security, patch & hotfix level; AV client configuration and AV training for administrators and end users. Includes recommendations for industry "best practices".</p>
              <p><strong>BCP/DRP:</strong> Documentation, content and sufficiency of policies and procedures relating to the core application system; includes logical controls, physical access controls, reports and error reporting, change management, third party remote access control and recommendations for industry "best practices."</p>
              <p><strong>Core Application Systems Security:</strong> Includes review of existing policies and procedures related to the control of the client organization's core system host and application. Includes recommendations for industry "best practices".</p>
              <p><strong>Data Backup & Recovery:</strong> Includes review of existing policies and procedures with recommendations for minimum included items; review of installed backup software (version, patch & hotfix level, capabilities); host/appliance OS security, patch & hotfix level; backup software change control processes; types and frequency of data backups; media labeling, accountability, inventory and reconciliation procedures; on and off-site storage of media and data recovery testing procedures. Includes recommendations for industry "best practices".</p>
              <p><strong>Firewall Administration & Configuration:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, FAC includes review of existing policies and procedures related to the administration of the credit union's firewall(s); examination of firewall configuration files and access control lists. Includes recommendations for industry "best practices". If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.</p>
              <p><strong>Follow-up Status of Recommendations:</strong> Includes examination of previous Information Systems reviews conducted by the client organization's regulators and external auditors; examination of follow up actions on the findings of those reviews.</p>
              <p><strong>Insurance Coverage:</strong> Includes review of existing insurance policies and coverage levels; recommendations of coverage levels based on current the client organization's environment.</p>
              <p><strong>Network Monitoring & Intrusion Detection:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, NMP includes review of existing policies and procedures related to intrusion detection and review of the configuration files of intrusion detection systems and host devices. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.</p>
              <p><strong>Network Topology:</strong> Includes review of existing policies and procedures related to network topology configuration and documentation; verification that network documentation is current and reflects the actual network topology.</p>
              <p><strong>Patch Management Process:</strong> Includes review of existing policies and procedures with recommendations for minimum included items; review of installed PM software (version, patch & hotfix level, capabilities, update frequency, distribution scheme); host/appliance OS security, patch & hotfix level; PM change control and back out procedures.</p>
              <p><strong>Physical Security:</strong> If Social Engineering as not part of the engagement, PS includes review of existing policies and procedures related to the physical security of the client organization and its assets, walk through during both business and non-business hours and sanitation reconnaissance. Includes recommendations for industry "best practices." If Social Engineering is part of the engagement, these items as well as additional items are reported in the appropriate section of the SEA.</p>
              <p><strong>Policy, Procedure and Documentation:</strong> Includes review of existing policies and procedures related to Information Security.</p>
              <p><strong>Router Administration & Configuration:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, RAC includes review of existing policies and procedures related to the administration of the client organization's router(s); examination of router configuration files and access control lists. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.</p>
              <p><strong>Server Administration & Configuration:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, SAC includes review of existing policies and procedures related to the administration of the client organization's server(s); examination of server configuration files and access control lists. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.</p>
              <p><strong>Switch Administration & Configuration:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, SWAC includes review of existing policies and procedures related to the administration of the client organization's switch(es); examination of switch configuration files and access control lists. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.</p>
              <p><strong>Workstation Administration & Configuration:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, DAC includes review of existing policies and procedures related to the administration of the client organization's desktop computers and review of the security configuration of desktop operating systems and host devices. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.</p>
            </div>
          </div>

          <div className="border-b pb-4">
            <h4 className="font-semibold mb-2">Assessments and Testing</h4>
            <div className="space-y-2">
              <p><strong>Internet Foot Print Information Analysis:</strong> Uses the Internet to search for information that could assist an attacker in gaining access to the client organization's network. Includes examination of the client organization's web site HTML code (as seen by an attacker) and search results for contact names, email addresses, product endorsements, personal information, etc. that could be used by an attacker.</p>
              <p><strong>External Vulnerability Assessment:</strong> Examines an organization's security profile from the perspective of an outsider or someone who does not have access to systems and networks behind the organization's external security perimeter.</p>
              <p><strong>Network Vulnerability Assessment:</strong> Scan, investigate, analyze, and report on the level of risk associated with any security vulnerabilities discovered on the public, internet-facing devices and to provide your organization with appropriate mitigation strategies to address those discovered vulnerabilities.</p>
              <p><strong>External Penetration Testing:</strong> Attempts to breach the target as an unauthorized user with varying levels of access. An External Penetration Test mimics the actions of an actual attacker exploiting weaknesses in the network security without the usual dangers. This test examines external IT systems for any weakness that could be used by an external attacker to disrupt the confidentiality, availability or integrity of the network, thereby allowing the organisation to address each weakness.</p>
              <p><strong>Internal Penetration Testing:</strong> Mimics the actions of an actual attacker exploiting weaknesses in network security. This test examines internal IT systems for any weakness that could be used to disrupt the confidentiality, availability, or integrity of the network, thereby allowing the organization to address each weakness.</p>
              <p><strong>Social Engineering Security Assessment:</strong> Consists of impersonating a trusted individual in an attempt to gain information and/or access to information or the client network infrastructure.</p>
              <p><strong>Gramm-Leach-Bliley Gap Analysis:</strong> Performed in conjunction with the Internal Vulnerability Assessments and Analysis order to evaluate our client's compliance in respect to "safeguarding member information" per the Gramm-Leach-Bliley Act.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded"
          onClick={() => {
            if (window.confirm('Are you sure you want to clear the form? This action cannot be undone.')) {
              window.location.reload();
            }
          }}
        >
          Clear Form
        </button>
        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-2 rounded"
          onClick={() => setShowPreview(true)}
        >
          Preview Form
        </button>
        <button
          type="button"
          className={`bg-green-500 text-white px-6 py-2 rounded flex items-center ${isExporting ? 'opacity-75 cursor-not-allowed' : ''}`}
          onClick={handleExportPDF}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating PDF...
            </>
          ) : 'Export PDF'}
        </button>
      </div>

      {/* {showPreview && (
        <PreviewForm 
          formData={formData} 
          onClose={() => setShowPreview(false)} 
        />
      )} */}
    </div>
  );
};

export default InitialClientWorksheet;
