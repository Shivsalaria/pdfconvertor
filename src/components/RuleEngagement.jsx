import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const RuleEngagement = () => {
  const [formData, setFormData] = useState({
    // Document Metadata
    metadata: {
      documentTitle: 'Rules of Engagement (ROE)',
      organizationName: 'EGS Test Team',
      date: new Date().toISOString().substr(0, 10),
      version: '1.0',
      author: 'Test Team',
      revisionHistory: [
        { date: new Date().toISOString().substr(0, 10), version: '1.0', description: 'First version', author: 'Test Team' }
      ]
    },
    // Introduction
    introduction: {
      content: `These Rules of Engagement (ROE) establish guidelines that determine how EGS (AC) will conduct electronic and physical security tests for Tested Organization. They are based on the National Institute of Standards and Technology (NIST) Special Publication 800-42, "Guideline on Network Security Testing."`
    },
    // Test Objective
    testObjective: {
      content: `Determine the effectiveness of Tested Organization's security program in preventing or detecting unauthorized external and internal access to logical and physical assets. Specific objectives for each test are contained in the "Tested Organization Test Plan."`
    },
    // Test Scope
    testScope: {
      startDate: '',
      endDate: '',
      includeExternalLogicalTesting: true,
      includeInternalLogicalTesting: true,
      includePhysicalPenetrationTesting: true,
      additionalNotes: ''
    },
    // General Approach
    generalApproach: {
      conductLogicalExternalTesting: true,
      conductLogicalInternalTesting: true,
      conductPhysicalPenetrationTesting: true,
      socialEngineeringDescription: `Physical penetration testing will be conducted using various social engineering techniques to persuade or deceive TORG employees to provide access to non-public facilities and information.`,
      testingType: 'covert', // covert or overt
      testingApproach: 'redTeam', // redTeam or blueTeam
      knowledgeLevel: 'outsider', // outsider, someKnowledge, completeKnowledge
      methodologyDescription: `We use a four-step approach: Discovery (Information Gathering), Vulnerability analysis, Exploitation, Reporting`,
      reportingMethod: 'NIST', // NIST, FISCAM, FISMA, ISO/IEC 17799, bestPractices
      additionalNotes: ''
    },
    // Testing Timetable
    testingTimetable: {
      externalTestingStartDate: '',
      externalTestingEndDate: '',
      internalTestingStartDate: '',
      internalTestingEndDate: '',
      physicalTestingStartDate: '',
      physicalTestingEndDate: '',
      additionalNotes: ''
    },
    // Testing Locations
    testingLocations: {
      externalTestingLocation: 'Tucson AZ',
      internalTestingLocation: '',
      additionalNotes: ''
    },
    // Tools and Methods
    toolsAndMethods: {
      informationGatheringTools: 'Internet search engines, WebFerret and NewsRover',
      vulnerabilityAssessmentTools: 'Tenable Nessus 3.0.2 (Direct Feed) or Internet Security Systems Internet Security Scanner (ISS)',
      penetrationTestTools: 'Immunity Inc. CANVAS 6.x, Metasploit Framework 2.x and other scripts/tools as required',
      physicalPenetrationMethods: `Physical penetration methods may include impersonation and persuasion using the telephone, email, postal mail and by personal visits to the organization. Attempts to gain unaccompanied physical access to restricted areas of the organization may include posing as utility workers, vendors, employees from another department, or technical and delivery personnel. We may attempt to recover discarded information by searching through bags of garbage discarded in public waste receptacles.`,
      exploitationLimitations: `Exploitation is limited to demonstrating that a specific vulnerability exists and can be used to compromise network security. Only minimal exploitation actions will be taken, sufficient to validate a specific vulnerability. Once the vulnerability has been confirmed, no additional exploitation to escalate privileges or further compromise the host will be taken.`,
      additionalTools: ''
    },
    // Items to be Tested
    itemsToBeTested: {
      logical: {
        externalIPs: '',
        internalIPs: ''
      },
      physical: {
        locations: [
          { name: 'Corporate Headquarters', selected: true },
          { name: 'East Side Branch', selected: true },
          { name: 'West Side Branch', selected: true }
        ],
        personnel: [
          { name: 'Members of the Help Desk Department', selected: true },
          { name: 'Members of the IT Staff', selected: true }
        ],
        customLocations: [],
        customPersonnel: []
      }
    },
    // Items not to be Tested
    itemsNotToBeTested: {
      logical: {
        externalIPs: '',
        internalIPs: ''
      },
      physical: {
        locations: [
          { name: 'Data Center', selected: true },
          { name: 'North Branch', selected: true },
          { name: 'South Branch', selected: true }
        ],
        personnel: [
          { name: 'Senior Management', selected: true },
          { name: 'Tellers', selected: true }
        ],
        customLocations: [],
        customPersonnel: []
      }
    },
    // Designated Points of Contact
    pointsOfContact: {
      testedOrganization: {
        administrative: [
          { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
        ],
        operationalLogical: [
          { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
        ],
        operationalPhysical: [
          { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
        ]
      },
      egs: {
        administrative: [
          { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
        ],
        operationalLogical: [
          { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
        ],
        operationalPhysical: [
          { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
        ]
      }
    },
    // General Rules
    generalRules: {
      egsWill: [
        'Provide identification information for all machines used during vulnerability assessment and penetration testing to the designated POC.',
        'Coordinate internal and external testing schedules with the client POC',
        'Notify ONLY the designated POC at the target organization prior to commencement of testing',
        'Inform client immediately upon verification of significant network weakness or vulnerability',
        'Accomplish all testing within the specified time period(s)',
        'Use only tools and techniques that have been used previously and with which the test team is familiar',
        'Limit script uses to minimum actions required to validate detected vulnerability and remove scripts as soon as possible after the vulnerability has been validated',
        'Provide a list of all changes made to systems configurations inherent in the verification of a vulnerability to Tested Organization operations staff and assist in the reversal of these changes as soon as feasible but no later than the conclusion of the test',
        'Limit exploitation to establishing that a vulnerability exists that can be exercised with more aggressive and destructive techniques',
        'Protect, and keep confidential, all user files and other data in Tested Organization\'s information systems in accordance with The Privacy Act of 1974 (5 USC 552a) and other applicable regulatory requirements',
        'Protect, and keep confidential, all information about test results such as information systems vulnerabilities and potential security compromises',
        'Report any inadvertently disabled user accounts to Tested Organization POC immediately upon discovery of the disabled account',
        'Present a list of potential exploits to the TORG POC for authorization to exploit before the penetration test phase begins',
        'Only exploit vulnerabilities approved by the TORG POC'
      ],
      egsMay: [
        'Scan all files and directories for file names and attributes',
        'Open all system and software files',
        'Add to or modify password files and user lists only where required to validate a detected vulnerability',
        'Upload scripts or applications only for the purpose of validating a detected vulnerability',
        'Disclose test windows, but not specific test times and dates'
      ],
      egsWillNot: [
        'Modify or delete system or data files',
        'Redirect traffic within or outside of the TORG network',
        'Leave "footprints" on a system indicating access',
        'Configure a system to allow future/return access',
        'Intentionally conduct a denial of service attack against the organization\'s systems unless specifically authorized by written agreement with Tested Organization',
        'Continue to exploit a validated vulnerability with more aggressive and destructive techniques once the existence of the vulnerability has been established',
        'Intentionally disable user accounts',
        'Disclose in advance to anyone other than the designated and authorized POC, the specific dates and times of testing'
      ],
      clientWill: ['Provide a list of ___________________________.'],
      clientMay: ['Provide a list of ___________________________.'],
      clientWillNot: ['Attempt to ___________________________.'],
      // Add custom rule fields
      customEgsWill: [],
      customEgsMay: [],
      customEgsWillNot: [],
      customClientWill: [],
      customClientMay: [],
      customClientWillNot: []
    },
    // Allowed and Prohibited Procedures
    proceduresPermissions: {
      externalLogical: [
        { name: 'Electronic mapping of network topology -- external', permitted: false },
        { name: 'Gain remote access to the client\'s system(s) to view, copy or modify data', permitted: false },
        { name: 'Remotely copy, modify or delete system configuration files', permitted: false },
        { name: 'Remotely view, modify or obtain password files', permitted: false },
        { name: 'Remotely redirect traffic to or from the network', permitted: false },
        { name: 'Identify the ability to remotely deny service to computer system(s)', permitted: false },
        { name: 'Remotely deny service to computer system(s)', permitted: false },
        { name: 'Remotely reading corporate or private email', permitted: false },
        { name: 'Targeting of sensitive corporate resources', permitted: false },
        { name: 'Remote penetration of business partners', permitted: false }
      ],
      internalLogical: [
        { name: 'Electronic mapping of network topology -- internal', permitted: false },
        { name: 'Gain local access to the client\'s system(s) to view, copy or modify data', permitted: false },
        { name: 'Locally copy, modify or delete system configuration files', permitted: false },
        { name: 'Locally view, modify or obtain password files', permitted: false },
        { name: 'Locally redirect traffic to or from the target or other portion of the network', permitted: false },
        { name: 'Identify the ability to locally deny service to computer system(s)', permitted: false },
        { name: 'Locally deny service to computer system(s)', permitted: false },
        { name: 'Locally reading corporate or private email', permitted: false },
        { name: 'Targeting of sensitive corporate resources', permitted: false },
        { name: 'Installation of software keyloggers to obtain sensitive corporate information', permitted: false },
        { name: 'Local penetration of business partners', permitted: false }
      ],
      physical: [
        { name: 'Remotely or locally adopting the identity of an employee or posing as an authorized user, member or other individual to gain physical access to sensitive data', permitted: false },
        { name: 'Breaking into employee work areas and workstations', permitted: false },
        { name: 'Remotely or locally adopting the identity of a technical supplier', permitted: false },
        { name: 'Obtaining information discarded by the client to gain information about the client (on and offsite, inside and outside "dumpster diving")', permitted: false },
        { name: 'Installation of hardware keyloggers to obtain sensitive corporate information', permitted: false },
        { name: 'Local or remote penetration of business partners', permitted: false }
      ],
      socialEngineering: [
        { name: 'Obtaining sensitive corporate, customer or member information via telephone or email', permitted: false },
        { name: 'Personnel extortion, blackmail and coercion', permitted: false },
        { name: 'Investigation of backgrounds of staff personnel', permitted: false },
        { name: 'Phishing of employees for sensitive corporate information', permitted: false },
        { name: 'Pharming of employees for sensitive corporate information', permitted: false }
      ],
      customProcedures: {
        externalLogical: [],
        internalLogical: [],
        physical: [],
        socialEngineering: []
      }
    },
    // Incident Detection and Response
    incidentDetection: {
      content: `Tested Organization will follow normal network monitoring/intrusion detection processes and respond to any detected activity as though the activity were from an unknown, hostile source.
TORG will retain all logs and communications pertaining to detection activities and provide copies to EGS for inclusion in the engagement documentation.
EGS will acknowledge verified detected activities.
Detected activities will not be reported to law enforcement or to any agency outside of Tested Organization.`,
      customRules: []
    },
    // Apprehension and Detention
    apprehensionDetention: {
      content: `TORG will provide each member of the EGS test team a "Letter of Introduction and Authorization", commonly referred to as a "Get Out of Jail Free" letter to protect members of the test team against policy violations, apprehension and/or detainment during the performance of their duties.
The letter, written on client letterhead, clearly states that the bearer is authorized to conduct social engineering, logical and physical vulnerability and penetration testing against the organization and that no crime or policy violation is being or has been committed.
Each letter will be an original copy, with blue ink signature to preclude copying and should have the designated point of contact's business card(s) attached.
These letters are distributed immediately before testing begins and collected immediately afterward.`,
      customRules: []
    },
    // Vulnerability Notification
    vulnerabilityNotification: {
      content: `After completion of the external discovery phase, all high and medium vulnerabilities will be verified either through additional vulnerability testing or through penetration testing. Verified high or medium external vulnerabilities will be reported to the TORG POC immediately for corrective action. Discovered high or medium vulnerability that present an immediate threat to the network will be reported and verified without waiting for the end of the discovery phase.
After the completion of the internal discovery phase, all discovered high vulnerabilities will be verified either through additional vulnerability testing or through penetration testing. Verified high vulnerabilities will be reported to the TORG POC immediately for corrective action. Discovered high vulnerabilities that present an immediate threat to the network will be reported and verified without waiting for the end of the discovery phase.
High vulnerabilities discovered during the physical penetration phase will be reported to the TORG POC immediately for corrective action.`,
      customRules: []
    },
    // Suspension of Testing
    suspensionOfTesting: {
      timeLimit: '',
      effortLevel: '',
      content: `If EGS is unable to gain access to the client's systems after [TIME] time or [EFFORT] level of effort, testing will cease. If EGS is able to gain access, revealing the capability for exploitation, the vulnerability is documented and that portion of the testing ceases immediately. Testing will also cease if AC, in conjunction with client representatives, determine that any of the following conditions exist:
unexpected occurrences are encountered that prohibit further testing
client reports that testing procedures materially affect computer operations in a negative manner
Once a determination has been made to suspend testing, the appropriate interested parties are informed. The justification for the suspension will be well documented using the "Memorandum of Understanding".`,
      customRules: []
    },
    // Test Monitoring
    testMonitoring: {
      content: `Tested Organization may monitor EGS activities during any portion of logical testing, however testing will not be delayed due to unavailability of test monitors.
Monitors may have unrestricted access to view test sessions, screen displays and results of logical testing and verification.
If assigned, monitors must be present for all verification testing as unbiased observers that the vulnerabilities were verified.
Monitors may not accompany EGS personnel during physical penetration testing because their presence would compromise the test.`,
      internalStartDate: '',
      internalEndDate: '',
      customRules: []
    },
    // Testing Status Updates
    testingStatusUpdates: {
      frequency: 'daily', // daily or weekly
      content: `EGS will provide Tested Organization with in-process reviews (IPR) [FREQUENCY].
Immediate threats to network security will not be held pending announcement at an IPR.`,
      customRules: []
    },
    // Approvals
    approvals: {
      clientName: '',
      clientTitle: '',
      clientSignature: '',
      clientDate: '',
      egsName: '',
      egsTitle: '',
      egsSignature: '',
      egsDate: ''
    }
  });

  // Handle adding a custom item
  const addCustomItem = (section, subsection, value) => {
    if (value.trim() === '') return;
    
    setFormData(prev => {
      const newData = { ...prev };
      if (subsection) {
        newData[section][subsection].push(value);
      } else {
        newData[section].push(value);
      }
      return newData;
    });
  };

  // Handle removing a custom item
  const removeCustomItem = (section, subsection, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (subsection) {
        newData[section][subsection] = newData[section][subsection].filter((_, i) => i !== index);
      } else {
        newData[section] = newData[section].filter((_, i) => i !== index);
      }
      return newData;
    });
  };

  // Handle basic form changes
  const handleChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  // Handle nested changes
  const handleNestedChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  // Handle procedure permissions
  const toggleProcedurePermission = (category, index) => {
    setFormData(prev => {
      const newProcedures = [...prev.proceduresPermissions[category]];
      newProcedures[index] = {
        ...newProcedures[index],
        permitted: !newProcedures[index].permitted
      };
      
      return {
        ...prev,
        proceduresPermissions: {
          ...prev.proceduresPermissions,
          [category]: newProcedures
        }
      };
    });
  };

  // Add a custom procedure
  const addCustomProcedure = (category, name) => {
    if (name.trim() === '') return;
    
    setFormData(prev => ({
      ...prev,
      proceduresPermissions: {
        ...prev.proceduresPermissions,
        customProcedures: {
          ...prev.proceduresPermissions.customProcedures,
          [category]: [
            ...prev.proceduresPermissions.customProcedures[category],
            { name, permitted: false }
          ]
        }
      }
    }));
  };

  // Remove a custom procedure
  const removeCustomProcedure = (category, index) => {
    setFormData(prev => {
      const newCustomProcedures = [...prev.proceduresPermissions.customProcedures[category]];
      newCustomProcedures.splice(index, 1);
      
      return {
        ...prev,
        proceduresPermissions: {
          ...prev.proceduresPermissions,
          customProcedures: {
            ...prev.proceduresPermissions.customProcedures,
            [category]: newCustomProcedures
          }
        }
      };
    });
  };

  // Toggle a custom procedure permission
  const toggleCustomProcedurePermission = (category, index) => {
    setFormData(prev => {
      const newCustomProcedures = [...prev.proceduresPermissions.customProcedures[category]];
      newCustomProcedures[index] = {
        ...newCustomProcedures[index],
        permitted: !newCustomProcedures[index].permitted
      };
      
      return {
        ...prev,
        proceduresPermissions: {
          ...prev.proceduresPermissions,
          customProcedures: {
            ...prev.proceduresPermissions.customProcedures,
            [category]: newCustomProcedures
          }
        }
      };
    });
  };

  // Add a POC
  const addPOC = (organization, type) => {
    setFormData(prev => {
      const newPOCs = [...prev.pointsOfContact[organization][type], 
        { name: '', title: '', responsibilityArea: '', email: '', contactNo: '', address: '' }
      ];
      
      return {
        ...prev,
        pointsOfContact: {
          ...prev.pointsOfContact,
          [organization]: {
            ...prev.pointsOfContact[organization],
            [type]: newPOCs
          }
        }
      };
    });
  };

  // Remove a POC
  const removePOC = (organization, type, index) => {
    setFormData(prev => {
      if (prev.pointsOfContact[organization][type].length <= 1) {
        return prev; // Don't remove the last POC
      }
      
      const newPOCs = [...prev.pointsOfContact[organization][type]];
      newPOCs.splice(index, 1);
      
      return {
        ...prev,
        pointsOfContact: {
          ...prev.pointsOfContact,
          [organization]: {
            ...prev.pointsOfContact[organization],
            [type]: newPOCs
          }
        }
      };
    });
  };

  // Update a POC field
  const updatePOC = (organization, type, index, field, value) => {
    setFormData(prev => {
      const newPOCs = [...prev.pointsOfContact[organization][type]];
      newPOCs[index] = {
        ...newPOCs[index],
        [field]: value
      };
      
      return {
        ...prev,
        pointsOfContact: {
          ...prev.pointsOfContact,
          [organization]: {
            ...prev.pointsOfContact[organization],
            [type]: newPOCs
          }
        }
      };
    });
  };

  // Handle adding a custom location or personnel
  const addCustomTarget = (section, type, category, value) => {
    if (value.trim() === '') return;
    
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][type][`custom${category}`].push({ name: value, selected: true });
      return newData;
    });
  };

  // Handle removing a custom location or personnel
  const removeCustomTarget = (section, type, category, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      newData[section][type][`custom${category}`].splice(index, 1);
      return newData;
    });
  };

  // Toggle a location or personnel selection
  const toggleTargetSelection = (section, type, category, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (category === 'custom') {
        const targetCategory = type === 'physical' ? 
          (section === 'itemsToBeTested' ? 'customLocations' : 'customPersonnel') : '';
        
        newData[section][type][targetCategory][index].selected = 
          !newData[section][type][targetCategory][index].selected;
      } else {
        newData[section][type][category][index].selected = 
          !newData[section][type][category][index].selected;
      }
      return newData;
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow">
      <Tabs>
        <TabList className="flex border-b mb-4">
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Document Info</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Objectives & Scope</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Methodology</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Testing Targets</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Points of Contact</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Rules & Procedures</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Operational Details</Tab>
          <Tab className="px-4 py-2 border-b-2 border-transparent cursor-pointer hover:bg-gray-50">Approvals</Tab>
        </TabList>

        {/* DOCUMENT INFO TAB */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Incident Detection and Response</h2>
            <textarea
              className="w-full border rounded p-2 h-32"
              value={formData.incidentDetection.content}
              onChange={(e) => handleNestedChange('incidentDetection', 'content', e.target.value)}
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
              <div className="space-y-2 mb-4">
                {formData.incidentDetection.customRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-grow">• {rule}</span>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        const newRules = [...formData.incidentDetection.customRules];
                        newRules.splice(index, 1);
                        handleNestedChange('incidentDetection', 'customRules', newRules);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  id="newIncidentDetectionRule"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom incident detection rule"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newIncidentDetectionRule') ;
                    const newRules = [...formData.incidentDetection.customRules, input.value];
                    handleNestedChange('incidentDetection', 'customRules', newRules);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Apprehension and Detention</h2>
            <textarea
              className="w-full border rounded p-2 h-32"
              value={formData.apprehensionDetention.content}
              onChange={(e) => handleNestedChange('apprehensionDetention', 'content', e.target.value)}
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
              <div className="space-y-2 mb-4">
                {formData.apprehensionDetention.customRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-grow">• {rule}</span>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        const newRules = [...formData.apprehensionDetention.customRules];
                        newRules.splice(index, 1);
                        handleNestedChange('apprehensionDetention', 'customRules', newRules);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  id="newApprehensionRule"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom apprehension rule"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newApprehensionRule') ;
                    const newRules = [...formData.apprehensionDetention.customRules, input.value];
                    handleNestedChange('apprehensionDetention', 'customRules', newRules);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Vulnerability Notification</h2>
            <textarea
              className="w-full border rounded p-2 h-32"
              value={formData.vulnerabilityNotification.content}
              onChange={(e) => handleNestedChange('vulnerabilityNotification', 'content', e.target.value)}
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
              <div className="space-y-2 mb-4">
                {formData.vulnerabilityNotification.customRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-grow">• {rule}</span>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        const newRules = [...formData.vulnerabilityNotification.customRules];
                        newRules.splice(index, 1);
                        handleNestedChange('vulnerabilityNotification', 'customRules', newRules);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  id="newVulnerabilityRule"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom vulnerability notification rule"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newVulnerabilityRule') ;
                    const newRules = [...formData.vulnerabilityNotification.customRules, input.value];
                    handleNestedChange('vulnerabilityNotification', 'customRules', newRules);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Suspension of Testing</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Time Limit:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.suspensionOfTesting.timeLimit}
                  onChange={(e) => handleNestedChange('suspensionOfTesting', 'timeLimit', e.target.value)}
                  placeholder="e.g. 4 hours"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Effort Level:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.suspensionOfTesting.effortLevel}
                  onChange={(e) => handleNestedChange('suspensionOfTesting', 'effortLevel', e.target.value)}
                  placeholder="e.g. 3 different approaches"
                />
              </div>
            </div>
            
            <textarea
              className="w-full border rounded p-2 h-32"
              value={formData.suspensionOfTesting.content.replace('[TIME]', formData.suspensionOfTesting.timeLimit || 'XXXX').replace('[EFFORT]', formData.suspensionOfTesting.effortLevel || 'YYYY')}
              onChange={(e) => {
                const newContent = e.target.value
                  .replace(formData.suspensionOfTesting.timeLimit || 'XXXX', '[TIME]')
                  .replace(formData.suspensionOfTesting.effortLevel || 'YYYY', '[EFFORT]');
                handleNestedChange('suspensionOfTesting', 'content', newContent);
              }}
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
              <div className="space-y-2 mb-4">
                {formData.suspensionOfTesting.customRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-grow">• {rule}</span>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        const newRules = [...formData.suspensionOfTesting.customRules];
                        newRules.splice(index, 1);
                        handleNestedChange('suspensionOfTesting', 'customRules', newRules);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  id="newSuspensionRule"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom suspension rule"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newSuspensionRule') ;
                    const newRules = [...formData.suspensionOfTesting.customRules, input.value];
                    handleNestedChange('suspensionOfTesting', 'customRules', newRules);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Test Monitoring</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Internal Testing Start Date:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.testMonitoring.internalStartDate}
                  onChange={(e) => handleNestedChange('testMonitoring', 'internalStartDate', e.target.value)}
                  placeholder="e.g. XXXX"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Internal Testing End Date:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.testMonitoring.internalEndDate}
                  onChange={(e) => handleNestedChange('testMonitoring', 'internalEndDate', e.target.value)}
                  placeholder="e.g. YYYY"
                />
              </div>
            </div>
            
            <textarea
              className="w-full border rounded p-2 h-32"
              value={formData.testMonitoring.content}
              onChange={(e) => handleNestedChange('testMonitoring', 'content', e.target.value)}
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
              <div className="space-y-2 mb-4">
                {formData.testMonitoring.customRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-grow">• {rule}</span>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        const newRules = [...formData.testMonitoring.customRules];
                        newRules.splice(index, 1);
                        handleNestedChange('testMonitoring', 'customRules', newRules);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  id="newMonitoringRule"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom monitoring rule"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newMonitoringRule') ;
                    const newRules = [...formData.testMonitoring.customRules, input.value];
                    handleNestedChange('testMonitoring', 'customRules', newRules);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4">Testing Status Updates</h2>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Update Frequency:</label>
              <div className="flex space-x-4">
                <div 
                  className={`cursor-pointer px-4 py-2 rounded ${formData.testingStatusUpdates.frequency === 'daily' ? 'bg-blue-100 text-blue-800 font-semibold' : 'bg-gray-100'}`}
                  onClick={() => handleNestedChange('testingStatusUpdates', 'frequency', 'daily')}
                >
                  Daily
                </div>
                <div 
                  className={`cursor-pointer px-4 py-2 rounded ${formData.testingStatusUpdates.frequency === 'weekly' ? 'bg-blue-100 text-blue-800 font-semibold' : 'bg-gray-100'}`}
                  onClick={() => handleNestedChange('testingStatusUpdates', 'frequency', 'weekly')}
                >
                  Weekly
                </div>
              </div>
            </div>
            
            <textarea
              className="w-full border rounded p-2 h-20"
              value={formData.testingStatusUpdates.content.replace('[FREQUENCY]', formData.testingStatusUpdates.frequency)}
              onChange={(e) => {
                const newContent = e.target.value.replace(formData.testingStatusUpdates.frequency, '[FREQUENCY]');
                handleNestedChange('testingStatusUpdates', 'content', newContent);
              }}
            />
            
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Additional Rules</h3>
              <div className="space-y-2 mb-4">
                {formData.testingStatusUpdates.customRules.map((rule, index) => (
                  <div key={index} className="flex items-start">
                    <span className="flex-grow">• {rule}</span>
                    <button
                      className="text-red-500 ml-2"
                      onClick={() => {
                        const newRules = [...formData.testingStatusUpdates.customRules];
                        newRules.splice(index, 1);
                        handleNestedChange('testingStatusUpdates', 'customRules', newRules);
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="flex">
                <input
                  type="text"
                  id="newStatusUpdateRule"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom status update rule"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newStatusUpdateRule') ;
                    const newRules = [...formData.testingStatusUpdates.customRules, input.value];
                    handleNestedChange('testingStatusUpdates', 'customRules', newRules);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Document Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Document Title:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.metadata.documentTitle}
                  onChange={(e) => handleNestedChange('metadata', 'documentTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Organization Name:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.metadata.organizationName}
                  onChange={(e) => handleNestedChange('metadata', 'organizationName', e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Date:</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  value={formData.metadata.date}
                  onChange={(e) => handleNestedChange('metadata', 'date', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Version:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.metadata.version}
                  onChange={(e) => handleNestedChange('metadata', 'version', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Author:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.metadata.author}
                  onChange={(e) => handleNestedChange('metadata', 'author', e.target.value)}
                />
              </div>
            </div>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">Revision History</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border">
                <thead>
                  <tr>
                    <th className="border p-2">Date</th>
                    <th className="border p-2">Version</th>
                    <th className="border p-2">Description</th>
                    <th className="border p-2">Author</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.metadata.revisionHistory.map((revision, index) => (
                    <tr key={index}>
                      <td className="border p-2">
                        <input
                          type="date"
                          className="w-full border rounded p-1"
                          value={revision.date}
                          onChange={(e) => {
                            const newHistory = [...formData.metadata.revisionHistory];
                            newHistory[index].date = e.target.value;
                            handleNestedChange('metadata', 'revisionHistory', newHistory);
                          }}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          className="w-full border rounded p-1"
                          value={revision.version}
                          onChange={(e) => {
                            const newHistory = [...formData.metadata.revisionHistory];
                            newHistory[index].version = e.target.value;
                            handleNestedChange('metadata', 'revisionHistory', newHistory);
                          }}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          className="w-full border rounded p-1"
                          value={revision.description}
                          onChange={(e) => {
                            const newHistory = [...formData.metadata.revisionHistory];
                            newHistory[index].description = e.target.value;
                            handleNestedChange('metadata', 'revisionHistory', newHistory);
                          }}
                        />
                      </td>
                      <td className="border p-2">
                        <input
                          type="text"
                          className="w-full border rounded p-1"
                          value={revision.author}
                          onChange={(e) => {
                            const newHistory = [...formData.metadata.revisionHistory];
                            newHistory[index].author = e.target.value;
                            handleNestedChange('metadata', 'revisionHistory', newHistory);
                          }}
                        />
                      </td>
                      <td className="border p-2 text-center">
                        {formData.metadata.revisionHistory.length > 1 && (
                          <button
                            type="button"
                            className="bg-red-500 text-white px-2 py-1 rounded"
                            onClick={() => {
                              const newHistory = [...formData.metadata.revisionHistory];
                              newHistory.splice(index, 1);
                              handleNestedChange('metadata', 'revisionHistory', newHistory);
                            }}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              type="button"
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                const newHistory = [...formData.metadata.revisionHistory, {
                  date: new Date().toISOString().substr(0, 10),
                  version: '',
                  description: '',
                  author: ''
                }];
                handleNestedChange('metadata', 'revisionHistory', newHistory);
              }}
            >
              Add Revision
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Introduction</h2>
            <textarea
              className="w-full border rounded p-2 h-40"
              value={formData.introduction.content}
              onChange={(e) => handleNestedChange('introduction', 'content', e.target.value)}
            />
          </div>
        </TabPanel>

        {/* OBJECTIVES & SCOPE TAB */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Test Objective</h2>
            <textarea
              className="w-full border rounded p-2 h-32"
              value={formData.testObjective.content}
              onChange={(e) => handleNestedChange('testObjective', 'content', e.target.value)}
            />
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Test Scope</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">Start Date:</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  value={formData.testScope.startDate}
                  onChange={(e) => handleNestedChange('testScope', 'startDate', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">End Date:</label>
                <input
                  type="date"
                  className="w-full border rounded p-2"
                  value={formData.testScope.endDate}
                  onChange={(e) => handleNestedChange('testScope', 'endDate', e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeExternalLogicalTesting"
                  className="mr-2"
                  checked={formData.testScope.includeExternalLogicalTesting}
                  onChange={(e) => handleNestedChange('testScope', 'includeExternalLogicalTesting', e.target.checked)}
                />
                <label htmlFor="includeExternalLogicalTesting">Include External Logical Testing</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includeInternalLogicalTesting"
                  className="mr-2"
                  checked={formData.testScope.includeInternalLogicalTesting}
                  onChange={(e) => handleNestedChange('testScope', 'includeInternalLogicalTesting', e.target.checked)}
                />
                <label htmlFor="includeInternalLogicalTesting">Include Internal Logical Testing</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="includePhysicalPenetrationTesting"
                  className="mr-2"
                  checked={formData.testScope.includePhysicalPenetrationTesting}
                  onChange={(e) => handleNestedChange('testScope', 'includePhysicalPenetrationTesting', e.target.checked)}
                />
                <label htmlFor="includePhysicalPenetrationTesting">Include Physical Penetration Testing</label>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Additional Notes:</label>
              <textarea
                className="w-full border rounded p-2 h-20"
                value={formData.testScope.additionalNotes}
                onChange={(e) => handleNestedChange('testScope', 'additionalNotes', e.target.value)}
                placeholder="Additional scope details..."
              />
            </div>
          </div>
        </TabPanel>

        {/* METHODOLOGY TAB */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">General Approach</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-2">Testing Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="conductLogicalExternalTesting"
                      className="mr-2"
                      checked={formData.generalApproach.conductLogicalExternalTesting}
                      onChange={(e) => handleNestedChange('generalApproach', 'conductLogicalExternalTesting', e.target.checked)}
                    />
                    <label htmlFor="conductLogicalExternalTesting">External Logical Testing</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="conductLogicalInternalTesting"
                      className="mr-2"
                      checked={formData.generalApproach.conductLogicalInternalTesting}
                      onChange={(e) => handleNestedChange('generalApproach', 'conductLogicalInternalTesting', e.target.checked)}
                    />
                    <label htmlFor="conductLogicalInternalTesting">Internal Logical Testing</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="conductPhysicalPenetrationTesting"
                      className="mr-2"
                      checked={formData.generalApproach.conductPhysicalPenetrationTesting}
                      onChange={(e) => handleNestedChange('generalApproach', 'conductPhysicalPenetrationTesting', e.target.checked)}
                    />
                    <label htmlFor="conductPhysicalPenetrationTesting">Physical Penetration Testing</label>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-2">Testing Approach</h3>
                <div className="space-y-2">
                  <div>
                    <label className="block text-gray-700 mb-1">Testing Type:</label>
                    <select
                      className="w-full border rounded p-2"
                      value={formData.generalApproach.testingType}
                      onChange={(e) => handleNestedChange('generalApproach', 'testingType', e.target.value)}
                    >
                      <option value="covert">Covert (Try to avoid detection)</option>
                      <option value="overt">Overt (No measures to avoid detection)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Testing Methodology:</label>
                    <select
                      className="w-full border rounded p-2"
                      value={formData.generalApproach.testingApproach}
                      onChange={(e) => handleNestedChange('generalApproach', 'testingApproach', e.target.value)}
                    >
                      <option value="redTeam">Red Team (Without IT staff knowledge)</option>
                      <option value="blueTeam">Blue Team (With IT staff knowledge)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border p-4 rounded">
                <h3 className="font-semibold mb-2">Knowledge Level</h3>
                <div className="space-y-2">
                  <div>
                    <select
                      className="w-full border rounded p-2"
                      value={formData.generalApproach.knowledgeLevel}
                      onChange={(e) => handleNestedChange('generalApproach', 'knowledgeLevel', e.target.value)}
                    >
                      <option value="outsider">Outsider (No information)</option>
                      <option value="someKnowledge">Some Knowledge (Average user)</option>
                      <option value="completeKnowledge">Complete Knowledge (Administrative access)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-700 mb-1">Social Engineering Description:</label>
              <textarea
                className="w-full border rounded p-2 h-20"
                value={formData.generalApproach.socialEngineeringDescription}
                onChange={(e) => handleNestedChange('generalApproach', 'socialEngineeringDescription', e.target.value)}
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-700 mb-1">Testing Methodology Description:</label>
              <textarea
                className="w-full border rounded p-2 h-20"
                value={formData.generalApproach.methodologyDescription}
                onChange={(e) => handleNestedChange('generalApproach', 'methodologyDescription', e.target.value)}
              />
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-700 mb-1">Reporting Method:</label>
              <select
                className="w-full border rounded p-2"
                value={formData.generalApproach.reportingMethod}
                onChange={(e) => handleNestedChange('generalApproach', 'reportingMethod', e.target.value)}
              >
                <option value="NIST">NIST</option>
                <option value="FISCAM">FISCAM</option>
                <option value="FISMA">FISMA</option>
                <option value="ISO/IEC 17799">ISO/IEC 17799</option>
                <option value="bestPractices">Generally Accepted Best Practices</option>
              </select>
            </div>
            
            <div className="mt-4">
              <label className="block text-gray-700 mb-1">Additional Notes:</label>
              <textarea
                className="w-full border rounded p-2 h-20"
                value={formData.generalApproach.additionalNotes}
                onChange={(e) => handleNestedChange('generalApproach', 'additionalNotes', e.target.value)}
                placeholder="Additional methodology details..."
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Testing Timetable</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-2">External Testing</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 mb-1">Start Date:</label>
                    <input
                      type="date"
                      className="w-full border rounded p-2"
                      value={formData.testingTimetable.externalTestingStartDate}
                      onChange={(e) => handleNestedChange('testingTimetable', 'externalTestingStartDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">End Date:</label>
                    <input
                      type="date"
                      className="w-full border rounded p-2"
                      value={formData.testingTimetable.externalTestingEndDate}
                      onChange={(e) => handleNestedChange('testingTimetable', 'externalTestingEndDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Internal Testing</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-gray-700 mb-1">Start Date:</label>
                    <input
                      type="date"
                      className="w-full border rounded p-2"
                      value={formData.testingTimetable.internalTestingStartDate}
                      onChange={(e) => handleNestedChange('testingTimetable', 'internalTestingStartDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">End Date:</label>
                    <input
                      type="date"
                      className="w-full border rounded p-2"
                      value={formData.testingTimetable.internalTestingEndDate}
                      onChange={(e) => handleNestedChange('testingTimetable', 'internalTestingEndDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Physical Testing</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1">Start Date:</label>
                  <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={formData.testingTimetable.physicalTestingStartDate}
                    onChange={(e) => handleNestedChange('testingTimetable', 'physicalTestingStartDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-1">End Date:</label>
                  <input
                    type="date"
                    className="w-full border rounded p-2"
                    value={formData.testingTimetable.physicalTestingEndDate}
                    onChange={(e) => handleNestedChange('testingTimetable', 'physicalTestingEndDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Additional Notes:</label>
              <textarea
                className="w-full border rounded p-2 h-20"
                value={formData.testingTimetable.additionalNotes}
                onChange={(e) => handleNestedChange('testingTimetable', 'additionalNotes', e.target.value)}
                placeholder="Additional timetable details..."
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Testing Locations</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-1">External Testing Location:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.testingLocations.externalTestingLocation}
                  onChange={(e) => handleNestedChange('testingLocations', 'externalTestingLocation', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-1">Internal Testing Location:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.testingLocations.internalTestingLocation}
                  onChange={(e) => handleNestedChange('testingLocations', 'internalTestingLocation', e.target.value)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-1">Additional Notes:</label>
              <textarea
                className="w-full border rounded p-2 h-20"
                value={formData.testingLocations.additionalNotes}
                onChange={(e) => handleNestedChange('testingLocations', 'additionalNotes', e.target.value)}
                placeholder="Additional location details..."
              />
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Tools and Methods</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Information Gathering Tools:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.toolsAndMethods.informationGatheringTools}
                  onChange={(e) => handleNestedChange('toolsAndMethods', 'informationGatheringTools', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Vulnerability Assessment Tools:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.toolsAndMethods.vulnerabilityAssessmentTools}
                  onChange={(e) => handleNestedChange('toolsAndMethods', 'vulnerabilityAssessmentTools', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Penetration Test Tools:</label>
                <input
                  type="text"
                  className="w-full border rounded p-2"
                  value={formData.toolsAndMethods.penetrationTestTools}
                  onChange={(e) => handleNestedChange('toolsAndMethods', 'penetrationTestTools', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Physical Penetration Methods:</label>
                <textarea
                  className="w-full border rounded p-2 h-20"
                  value={formData.toolsAndMethods.physicalPenetrationMethods}
                  onChange={(e) => handleNestedChange('toolsAndMethods', 'physicalPenetrationMethods', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Exploitation Limitations:</label>
                <textarea
                  className="w-full border rounded p-2 h-20"
                  value={formData.toolsAndMethods.exploitationLimitations}
                  onChange={(e) => handleNestedChange('toolsAndMethods', 'exploitationLimitations', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-1">Additional Tools:</label>
                <textarea
                  className="w-full border rounded p-2 h-20"
                  value={formData.toolsAndMethods.additionalTools}
                  onChange={(e) => handleNestedChange('toolsAndMethods', 'additionalTools', e.target.value)}
                  placeholder="List any additional tools not mentioned above..."
                />
              </div>
            </div>
          </div>
        </TabPanel>

        {/* TESTING TARGETS TAB */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Items to be Tested</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Logical</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">External IPs to be Tested:</label>
                  <textarea
                    className="w-full border rounded p-2 h-20"
                    value={formData.itemsToBeTested.logical.externalIPs}
                    onChange={(e) => handleNestedChange('itemsToBeTested', 'logical', 'externalIPs', e.target.value)}
                    placeholder="List IP addresses separated by commas or new lines"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Internal IPs to be Tested:</label>
                  <textarea
                    className="w-full border rounded p-2 h-20"
                    value={formData.itemsToBeTested.logical.internalIPs}
                    onChange={(e) => handleNestedChange('itemsToBeTested', 'logical', 'internalIPs', e.target.value)}
                    placeholder="List IP addresses separated by commas or new lines"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Physical</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Locations</h4>
                  
                  <div className="space-y-2 mb-4">
                    {formData.itemsToBeTested.physical.locations.map((location, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`location-to-test-${index}`}
                          className="mr-2"
                          checked={location.selected}
                          onChange={() => toggleTargetSelection('itemsToBeTested', 'physical', 'locations', index)}
                        />
                        <label htmlFor={`location-to-test-${index}`}>{location.name}</label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {formData.itemsToBeTested.physical.customLocations.map((location, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`custom-location-to-test-${index}`}
                          className="mr-2"
                          checked={location.selected}
                          onChange={() => toggleTargetSelection('itemsToBeTested', 'physical', 'customLocations', index)}
                        />
                        <label htmlFor={`custom-location-to-test-${index}`} className="flex-grow">{location.name}</label>
                        <button 
                          className="text-red-500 ml-2"
                          onClick={() => removeCustomTarget('itemsToBeTested', 'physical', 'Locations', index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      id="newLocationToTest"
                      className="flex-grow border rounded p-2"
                      placeholder="Add custom location"
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                      onClick={() => {
                        const input = document.getElementById('newLocationToTest') ;
                        addCustomTarget('itemsToBeTested', 'physical', 'Locations', input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Personnel</h4>
                  
                  <div className="space-y-2 mb-4">
                    {formData.itemsToBeTested.physical.personnel.map((person, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`personnel-to-test-${index}`}
                          className="mr-2"
                          checked={person.selected}
                          onChange={() => toggleTargetSelection('itemsToBeTested', 'physical', 'personnel', index)}
                        />
                        <label htmlFor={`personnel-to-test-${index}`}>{person.name}</label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {formData.itemsToBeTested.physical.customPersonnel.map((person, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`custom-personnel-to-test-${index}`}
                          className="mr-2"
                          checked={person.selected}
                          onChange={() => toggleTargetSelection('itemsToBeTested', 'physical', 'customPersonnel', index)}
                        />
                        <label htmlFor={`custom-personnel-to-test-${index}`} className="flex-grow">{person.name}</label>
                        <button 
                          className="text-red-500 ml-2"
                          onClick={() => removeCustomTarget('itemsToBeTested', 'physical', 'Personnel', index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      id="newPersonnelToTest"
                      className="flex-grow border rounded p-2"
                      placeholder="Add custom personnel"
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                      onClick={() => {
                        const input = document.getElementById('newPersonnelToTest') ;
                        addCustomTarget('itemsToBeTested', 'physical', 'Personnel', input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Items NOT to be Tested</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Logical</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-1">External IPs NOT to be Tested:</label>
                  <textarea
                    className="w-full border rounded p-2 h-20"
                    value={formData.itemsNotToBeTested.logical.externalIPs}
                    onChange={(e) => handleNestedChange('itemsNotToBeTested', 'logical', 'externalIPs', e.target.value)}
                    placeholder="List IP addresses separated by commas or new lines"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-1">Internal IPs NOT to be Tested:</label>
                  <textarea
                    className="w-full border rounded p-2 h-20"
                    value={formData.itemsNotToBeTested.logical.internalIPs}
                    onChange={(e) => handleNestedChange('itemsNotToBeTested', 'logical', 'internalIPs', e.target.value)}
                    placeholder="List IP addresses separated by commas or new lines"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Physical</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Locations</h4>
                  
                  <div className="space-y-2 mb-4">
                    {formData.itemsNotToBeTested.physical.locations.map((location, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`location-not-to-test-${index}`}
                          className="mr-2"
                          checked={location.selected}
                          onChange={() => toggleTargetSelection('itemsNotToBeTested', 'physical', 'locations', index)}
                        />
                        <label htmlFor={`location-not-to-test-${index}`}>{location.name}</label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {formData.itemsNotToBeTested.physical.customLocations.map((location, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`custom-location-not-to-test-${index}`}
                          className="mr-2"
                          checked={location.selected}
                          onChange={() => toggleTargetSelection('itemsNotToBeTested', 'physical', 'customLocations', index)}
                        />
                        <label htmlFor={`custom-location-not-to-test-${index}`} className="flex-grow">{location.name}</label>
                        <button 
                          className="text-red-500 ml-2"
                          onClick={() => removeCustomTarget('itemsNotToBeTested', 'physical', 'Locations', index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      id="newLocationNotToTest"
                      className="flex-grow border rounded p-2"
                      placeholder="Add custom location"
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                      onClick={() => {
                        const input = document.getElementById('newLocationNotToTest') ;
                        addCustomTarget('itemsNotToBeTested', 'physical', 'Locations', input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Personnel</h4>
                  
                  <div className="space-y-2 mb-4">
                    {formData.itemsNotToBeTested.physical.personnel.map((person, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`personnel-not-to-test-${index}`}
                          className="mr-2"
                          checked={person.selected}
                          onChange={() => toggleTargetSelection('itemsNotToBeTested', 'physical', 'personnel', index)}
                        />
                        <label htmlFor={`personnel-not-to-test-${index}`}>{person.name}</label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    {formData.itemsNotToBeTested.physical.customPersonnel.map((person, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`custom-personnel-not-to-test-${index}`}
                          className="mr-2"
                          checked={person.selected}
                          onChange={() => toggleTargetSelection('itemsNotToBeTested', 'physical', 'customPersonnel', index)}
                        />
                        <label htmlFor={`custom-personnel-not-to-test-${index}`} className="flex-grow">{person.name}</label>
                        <button 
                          className="text-red-500 ml-2"
                          onClick={() => removeCustomTarget('itemsNotToBeTested', 'physical', 'Personnel', index)}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-2 flex">
                    <input
                      type="text"
                      id="newPersonnelNotToTest"
                      className="flex-grow border rounded p-2"
                      placeholder="Add custom personnel"
                    />
                    <button
                      className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                      onClick={() => {
                        const input = document.getElementById('newPersonnelNotToTest') ;
                        addCustomTarget('itemsNotToBeTested', 'physical', 'Personnel', input.value);
                        input.value = '';
                      }}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* POINTS OF CONTACT TAB */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Designated Points of Contact</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Tested Organization</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Administrative Point(s) of Contact</h4>
                {formData.pointsOfContact.testedOrganization.administrative.map((poc, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">Contact #{index + 1}</div>
                      {formData.pointsOfContact.testedOrganization.administrative.length > 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => removePOC('testedOrganization', 'administrative', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.name}
                          onChange={(e) => updatePOC('testedOrganization', 'administrative', index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.title}
                          onChange={(e) => updatePOC('testedOrganization', 'administrative', index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Responsibility Area:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.responsibilityArea}
                          onChange={(e) => updatePOC('testedOrganization', 'administrative', index, 'responsibilityArea', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email:</label>
                        <input
                          type="email"
                          className="w-full border rounded p-2"
                          value={poc.email}
                          onChange={(e) => updatePOC('testedOrganization', 'administrative', index, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Contact Number:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.contactNo}
                          onChange={(e) => updatePOC('testedOrganization', 'administrative', index, 'contactNo', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Address:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.address}
                          onChange={(e) => updatePOC('testedOrganization', 'administrative', index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addPOC('testedOrganization', 'administrative')}
                >
                  Add Administrative Contact
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Operational Point(s) of Contact for Logical Testing</h4>
                {formData.pointsOfContact.testedOrganization.operationalLogical.map((poc, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">Contact #{index + 1}</div>
                      {formData.pointsOfContact.testedOrganization.operationalLogical.length > 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => removePOC('testedOrganization', 'operationalLogical', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.name}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalLogical', index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.title}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalLogical', index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Responsibility Area:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.responsibilityArea}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalLogical', index, 'responsibilityArea', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email:</label>
                        <input
                          type="email"
                          className="w-full border rounded p-2"
                          value={poc.email}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalLogical', index, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Contact Number:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.contactNo}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalLogical', index, 'contactNo', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Address:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.address}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalLogical', index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addPOC('testedOrganization', 'operationalLogical')}
                >
                  Add Logical Testing Contact
                </button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Operational Point(s) of Contact for Physical Testing</h4>
                {formData.pointsOfContact.testedOrganization.operationalPhysical.map((poc, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">Contact #{index + 1}</div>
                      {formData.pointsOfContact.testedOrganization.operationalPhysical.length > 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => removePOC('testedOrganization', 'operationalPhysical', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.name}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalPhysical', index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.title}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalPhysical', index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Responsibility Area:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.responsibilityArea}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalPhysical', index, 'responsibilityArea', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email:</label>
                        <input
                          type="email"
                          className="w-full border rounded p-2"
                          value={poc.email}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalPhysical', index, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Contact Number:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.contactNo}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalPhysical', index, 'contactNo', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Address:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.address}
                          onChange={(e) => updatePOC('testedOrganization', 'operationalPhysical', index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addPOC('testedOrganization', 'operationalPhysical')}
                >
                  Add Physical Testing Contact
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">EGS Security Solutions</h3>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Administrative Point(s) of Contact</h4>
                {formData.pointsOfContact.egs.administrative.map((poc, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">Contact #{index + 1}</div>
                      {formData.pointsOfContact.egs.administrative.length > 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => removePOC('egs', 'administrative', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.name}
                          onChange={(e) => updatePOC('egs', 'administrative', index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.title}
                          onChange={(e) => updatePOC('egs', 'administrative', index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Responsibility Area:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.responsibilityArea}
                          onChange={(e) => updatePOC('egs', 'administrative', index, 'responsibilityArea', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email:</label>
                        <input
                          type="email"
                          className="w-full border rounded p-2"
                          value={poc.email}
                          onChange={(e) => updatePOC('egs', 'administrative', index, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Contact Number:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.contactNo}
                          onChange={(e) => updatePOC('egs', 'administrative', index, 'contactNo', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Address:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.address}
                          onChange={(e) => updatePOC('egs', 'administrative', index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addPOC('egs', 'administrative')}
                >
                  Add Administrative Contact
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-medium mb-2">Operational Point(s) of Contact for Logical Testing</h4>
                {formData.pointsOfContact.egs.operationalLogical.map((poc, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">Contact #{index + 1}</div>
                      {formData.pointsOfContact.egs.operationalLogical.length > 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => removePOC('egs', 'operationalLogical', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.name}
                          onChange={(e) => updatePOC('egs', 'operationalLogical', index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.title}
                          onChange={(e) => updatePOC('egs', 'operationalLogical', index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Responsibility Area:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.responsibilityArea}
                          onChange={(e) => updatePOC('egs', 'operationalLogical', index, 'responsibilityArea', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email:</label>
                        <input
                          type="email"
                          className="w-full border rounded p-2"
                          value={poc.email}
                          onChange={(e) => updatePOC('egs', 'operationalLogical', index, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Contact Number:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.contactNo}
                          onChange={(e) => updatePOC('egs', 'operationalLogical', index, 'contactNo', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Address:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.address}
                          onChange={(e) => updatePOC('egs', 'operationalLogical', index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addPOC('egs', 'operationalLogical')}
                >
                  Add Logical Testing Contact
                </button>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Operational Point(s) of Contact for Physical Testing</h4>
                {formData.pointsOfContact.egs.operationalPhysical.map((poc, index) => (
                  <div key={index} className="border rounded p-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <div className="font-semibold">Contact #{index + 1}</div>
                      {formData.pointsOfContact.egs.operationalPhysical.length > 1 && (
                        <button
                          className="text-red-500"
                          onClick={() => removePOC('egs', 'operationalPhysical', index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-700 mb-1">Name:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.name}
                          onChange={(e) => updatePOC('egs', 'operationalPhysical', index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Title:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.title}
                          onChange={(e) => updatePOC('egs', 'operationalPhysical', index, 'title', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Responsibility Area:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.responsibilityArea}
                          onChange={(e) => updatePOC('egs', 'operationalPhysical', index, 'responsibilityArea', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Email:</label>
                        <input
                          type="email"
                          className="w-full border rounded p-2"
                          value={poc.email}
                          onChange={(e) => updatePOC('egs', 'operationalPhysical', index, 'email', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Contact Number:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.contactNo}
                          onChange={(e) => updatePOC('egs', 'operationalPhysical', index, 'contactNo', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 mb-1">Address:</label>
                        <input
                          type="text"
                          className="w-full border rounded p-2"
                          value={poc.address}
                          onChange={(e) => updatePOC('egs', 'operationalPhysical', index, 'address', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => addPOC('egs', 'operationalPhysical')}
                >
                  Add Physical Testing Contact
                </button>
              </div>
            </div>
          </div>
        </TabPanel>

        {/* RULES & PROCEDURES TAB */}
        <TabPanel>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">General Rules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-2">EGS WILL:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {formData.generalRules.egsWill.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-grow">{rule}</span>
                      <button
                        className="text-red-500 ml-2 mt-1"
                        onClick={() => {
                          const newRules = [...formData.generalRules.egsWill];
                          newRules.splice(index, 1);
                          handleNestedChange('generalRules', 'egsWill', newRules);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  {formData.generalRules.customEgsWill.map((rule, index) => (
                    <div key={index} className="flex items-start mb-1">
                      <span className="flex-grow">• {rule}</span>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => removeCustomItem('generalRules', 'customEgsWill', index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    id="newEgsWill"
                    className="flex-grow border rounded p-2"
                    placeholder="Add custom rule"
                  />
                  <button
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      const input = document.getElementById('newEgsWill') ;
                      addCustomItem('generalRules', 'customEgsWill', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">EGS MAY:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {formData.generalRules.egsMay.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-grow">{rule}</span>
                      <button
                        className="text-red-500 ml-2 mt-1"
                        onClick={() => {
                          const newRules = [...formData.generalRules.egsMay];
                          newRules.splice(index, 1);
                          handleNestedChange('generalRules', 'egsMay', newRules);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  {formData.generalRules.customEgsMay.map((rule, index) => (
                    <div key={index} className="flex items-start mb-1">
                      <span className="flex-grow">• {rule}</span>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => removeCustomItem('generalRules', 'customEgsMay', index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    id="newEgsMay"
                    className="flex-grow border rounded p-2"
                    placeholder="Add custom rule"
                  />
                  <button
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      const input = document.getElementById('newEgsMay') ;
                      addCustomItem('generalRules', 'customEgsMay', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">EGS WILL NOT:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {formData.generalRules.egsWillNot.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-grow">{rule}</span>
                      <button
                        className="text-red-500 ml-2 mt-1"
                        onClick={() => {
                          const newRules = [...formData.generalRules.egsWillNot];
                          newRules.splice(index, 1);
                          handleNestedChange('generalRules', 'egsWillNot', newRules);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  {formData.generalRules.customEgsWillNot.map((rule, index) => (
                    <div key={index} className="flex items-start mb-1">
                      <span className="flex-grow">• {rule}</span>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => removeCustomItem('generalRules', 'customEgsWillNot', index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    id="newEgsWillNot"
                    className="flex-grow border rounded p-2"
                    placeholder="Add custom rule"
                  />
                  <button
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      const input = document.getElementById('newEgsWillNot') ;
                      addCustomItem('generalRules', 'customEgsWillNot', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Tested Organization WILL:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {formData.generalRules.clientWill.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-grow">{rule}</span>
                      <button
                        className="text-red-500 ml-2 mt-1"
                        onClick={() => {
                          const newRules = [...formData.generalRules.clientWill];
                          newRules.splice(index, 1);
                          handleNestedChange('generalRules', 'clientWill', newRules);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  {formData.generalRules.customClientWill.map((rule, index) => (
                    <div key={index} className="flex items-start mb-1">
                      <span className="flex-grow">• {rule}</span>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => removeCustomItem('generalRules', 'customClientWill', index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    id="newClientWill"
                    className="flex-grow border rounded p-2"
                    placeholder="Add custom rule"
                  />
                  <button
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      const input = document.getElementById('newClientWill') ;
                      addCustomItem('generalRules', 'customClientWill', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Tested Organization MAY:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {formData.generalRules.clientMay.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-grow">{rule}</span>
                      <button
                        className="text-red-500 ml-2 mt-1"
                        onClick={() => {
                          const newRules = [...formData.generalRules.clientMay];
                          newRules.splice(index, 1);
                          handleNestedChange('generalRules', 'clientMay', newRules);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  {formData.generalRules.customClientMay.map((rule, index) => (
                    <div key={index} className="flex items-start mb-1">
                      <span className="flex-grow">• {rule}</span>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => removeCustomItem('generalRules', 'customClientMay', index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    id="newClientMay"
                    className="flex-grow border rounded p-2"
                    placeholder="Add custom rule"
                  />
                  <button
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      const input = document.getElementById('newClientMay') ;
                      addCustomItem('generalRules', 'customClientMay', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold mt-6 mb-2">Tested Organization WILL NOT:</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  {formData.generalRules.clientWillNot.map((rule, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-grow">{rule}</span>
                      <button
                        className="text-red-500 ml-2 mt-1"
                        onClick={() => {
                          const newRules = [...formData.generalRules.clientWillNot];
                          newRules.splice(index, 1);
                          handleNestedChange('generalRules', 'clientWillNot', newRules);
                        }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="mb-4">
                  {formData.generalRules.customClientWillNot.map((rule, index) => (
                    <div key={index} className="flex items-start mb-1">
                      <span className="flex-grow">• {rule}</span>
                      <button
                        className="text-red-500 ml-2"
                        onClick={() => removeCustomItem('generalRules', 'customClientWillNot', index)}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                
                <div className="flex">
                  <input
                    type="text"
                    id="newClientWillNot"
                    className="flex-grow border rounded p-2"
                    placeholder="Add custom rule"
                  />
                  <button
                    className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                    onClick={() => {
                      const input = document.getElementById('newClientWillNot') ;
                      addCustomItem('generalRules', 'customClientWillNot', input.value);
                      input.value = '';
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Allowed and Prohibited Procedures</h2>
            
            <p className="mb-4">Tested Organization authorizes or prohibits the specific procedures indicated below:</p>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">External Logical Attacks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="border p-2 w-3/4">Attack Methodology</th>
                      <th className="border p-2 w-1/4">Permitted?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.proceduresPermissions.externalLogical.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2">{procedure.name}</td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('externalLogical', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('externalLogical', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {formData.proceduresPermissions.customProcedures.externalLogical.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2 flex justify-between">
                          <span>{procedure.name}</span>
                          <button 
                            className="text-red-500"
                            onClick={() => removeCustomProcedure('externalLogical', index)}
                          >
                            ✕
                          </button>
                        </td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('externalLogical', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('externalLogical', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-2 flex">
                <input
                  type="text"
                  id="newExternalLogicalProcedure"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom external logical attack procedure"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newExternalLogicalProcedure') ;
                    addCustomProcedure('externalLogical', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Internal Logical Attacks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="border p-2 w-3/4">Attack Methodology</th>
                      <th className="border p-2 w-1/4">Permitted?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.proceduresPermissions.internalLogical.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2">{procedure.name}</td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('internalLogical', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('internalLogical', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {formData.proceduresPermissions.customProcedures.internalLogical.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2 flex justify-between">
                          <span>{procedure.name}</span>
                          <button 
                            className="text-red-500"
                            onClick={() => removeCustomProcedure('internalLogical', index)}
                          >
                            ✕
                          </button>
                        </td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('internalLogical', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('internalLogical', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-2 flex">
                <input
                  type="text"
                  id="newInternalLogicalProcedure"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom internal logical attack procedure"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newInternalLogicalProcedure') ;
                    addCustomProcedure('internalLogical', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Physical Attacks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="border p-2 w-3/4">Attack Methodology</th>
                      <th className="border p-2 w-1/4">Permitted?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.proceduresPermissions.physical.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2">{procedure.name}</td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('physical', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('physical', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {formData.proceduresPermissions.customProcedures.physical.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2 flex justify-between">
                          <span>{procedure.name}</span>
                          <button 
                            className="text-red-500"
                            onClick={() => removeCustomProcedure('physical', index)}
                          >
                            ✕
                          </button>
                        </td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('physical', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('physical', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-2 flex">
                <input
                  type="text"
                  id="newPhysicalProcedure"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom physical attack procedure"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newPhysicalProcedure') ;
                    addCustomProcedure('physical', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">Social Engineering Attacks</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr>
                      <th className="border p-2 w-3/4">Attack Methodology</th>
                      <th className="border p-2 w-1/4">Permitted?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.proceduresPermissions.socialEngineering.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2">{procedure.name}</td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('socialEngineering', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleProcedurePermission('socialEngineering', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {formData.proceduresPermissions.customProcedures.socialEngineering.map((procedure, index) => (
                      <tr key={index}>
                        <td className="border p-2 flex justify-between">
                          <span>{procedure.name}</span>
                          <button 
                            className="text-red-500"
                            onClick={() => removeCustomProcedure('socialEngineering', index)}
                          >
                            ✕
                          </button>
                        </td>
                        <td className="border p-2 text-center">
                          <div className="flex justify-center space-x-4">
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${procedure.permitted ? 'bg-green-100 text-green-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('socialEngineering', index)}
                            >
                              YES
                            </div>
                            <div 
                              className={`cursor-pointer px-3 py-1 rounded ${!procedure.permitted ? 'bg-red-100 text-red-800 font-semibold' : 'bg-gray-100'}`}
                              onClick={() => toggleCustomProcedurePermission('socialEngineering', index)}
                            >
                              NO
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-2 flex">
                <input
                  type="text"
                  id="newSocialEngineeringProcedure"
                  className="flex-grow border rounded p-2"
                  placeholder="Add custom social engineering attack procedure"
                />
                <button
                  className="ml-2 bg-blue-500 text-white px-3 py-2 rounded"
                  onClick={() => {
                    const input = document.getElementById('newSocialEngineeringProcedure') ;
                    addCustomProcedure('socialEngineering', input.value);
                    input.value = '';
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default RuleEngagement;


