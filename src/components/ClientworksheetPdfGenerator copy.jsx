import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = (formData) => {
  const doc = new jsPDF();
  
  // Helper function for checkbox display
  const getCheckboxValue = (value) => value ? '✓' : '✗';
  
  // Add header
  doc.setFontSize(16);
  doc.text("EGS SECURITY SOLUTIONS", doc.internal.pageSize.width/2, 15, { align: "center" });
  doc.setFontSize(14);
  doc.text("Initial Client Worksheet", doc.internal.pageSize.width/2, 25, { align: "center" });
  doc.setFontSize(12);
  doc.text("CONFIDENTIAL - Engagement Task Log", doc.internal.pageSize.width/2, 35, { align: "center" });
  
  // Project Info
  autoTable(doc, {
    startY: 45,
    head: [["Project Information"]],
    body: [
      ["Project ID: " + formData.projectInfo.projectId],
      ["Project Title: " + formData.projectInfo.projectTitle],
      ["Start Date: " + formData.projectInfo.startDate],
      ["Expected End Date: " + formData.projectInfo.expectedEndDate],
      ["Confidentiality Level: " + formData.projectInfo.confidentialityLevel]
    ],
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Company Info
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Company Information"]],
    body: [
      ["Company Name: " + formData.companyInfo.name],
      ["Address: " + formData.companyInfo.address],
      ["Phone: " + formData.companyInfo.phone],
      ["Email: " + formData.companyInfo.email],
      ["Website: " + formData.companyInfo.website]
    ],
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Client Info
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Client Information"]],
    body: [
      ["Company: " + formData.clientInfo.company],
      ["Address: " + formData.clientInfo.streetAddress],
      ["City, State, ZIP: " + formData.clientInfo.cityStateZIP],
      ["Primary Contact: " + formData.clientInfo.primaryContactName],
      ["Phone: " + formData.clientInfo.primaryContactPhone],
      ["Email: " + formData.clientInfo.primaryContactEmail],
      ["Alternate Contact: " + formData.clientInfo.alternateContactName],
      ["Phone: " + formData.clientInfo.alternateContactPhone],
      ["Email: " + formData.clientInfo.alternateContactEmail]
    ],
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Teleconference Info
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [["Teleconference Information"]],
    body: [
      ["Date & Time: " + formData.teleconferenceInfo.dateTime],
      ["Point of Contact: " + formData.teleconferenceInfo.pointOfContact],
      ["Teleconference Number: " + formData.teleconferenceInfo.teleconferenceNumber]
    ],
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // FRAP Section
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [[{ content: 'FRAP - FACILITATED RISK ASSESSMENT PROCESS', colSpan: 1 }]],
    body: [['']],
    theme: 'grid',
    headStyles: { 
      fillColor: [200, 200, 200], 
      textColor: [0, 0, 0],
      fontSize: 12,
      fontStyle: 'bold',
      halign: 'left',
      cellPadding: 8
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 6,
      fontSize: 10
    }
  });

  // FRAP Content
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY,
    head: [['FRAP Components']],
    body: [
      [{
        content: `Initial FRAP - Sessions with key personnel from EACH department. Participants identify critical information assets, assess threats and vulnerabilities to identified assets, analyze the impact on the organization of identified threats and identify mitigating controls. Risks are identified and prioritized using the CIA Triad of Confidentiality, Integrity and Availability. Mitigating controls are then assigned to each risk. Deliverables include a Risk Action Plan template that the client organization will use to assign timelines and responsible persons to each identified risk and associated controls.

Follow Up of Risk Action Plan - Review of existing RAP in light of changes in the client organization's security environment.

Detailed analysis of Risk Action Plan - Review of existing RAP, breaking general risks into specific areas, e.g., power outage becomes power outage > 30 min, power outage > 1 day, power outage > 1 week.`
      }]
    ],
    theme: 'grid',
    headStyles: { 
      fillColor: [240, 240, 240], 
      textColor: [0, 0, 0],
      fontSize: 11,
      fontStyle: 'bold'
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 8,
      fontSize: 10,
      lineHeight: 1.5
    },
    columnStyles: {
      0: { cellWidth: 'auto' }
    }
  });

  // FRAP Checklist
  const frapHeaders = [
    ['Component', 'Y', 'N', 'Notes']
  ];

  const frapBody = [
    [
      'Initial FRAP',
      formData.clientRequirements.frap.initialFrap ? '✓' : '',
      !formData.clientRequirements.frap.initialFrap ? '✓' : '',
      ''
    ],
    [
      'Follow-up Risk Action Plan',
      formData.clientRequirements.frap.followUpRiskActionPlan ? '✓' : '',
      !formData.clientRequirements.frap.followUpRiskActionPlan ? '✓' : '',
      ''
    ],
    [
      'Detailed Analysis Risk Action Plan',
      formData.clientRequirements.frap.detailedAnalysisRiskActionPlan ? '✓' : '',
      !formData.clientRequirements.frap.detailedAnalysisRiskActionPlan ? '✓' : '',
      formData.clientRequirements.frap.notes || ''
    ]
  ];

  // Add custom FRAP options
  formData.clientRequirements.frap.customOptions.forEach(option => {
    frapBody.push([
      option.label,
      option.checked ? '✓' : '',
      !option.checked ? '✓' : '',
      ''
    ]);
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 5,
    head: frapHeaders,
    body: frapBody,
    theme: 'grid',
    headStyles: { 
      fillColor: [200, 200, 200], 
      textColor: [0, 0, 0],
      fontSize: 10
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 6,
      fontSize: 10
    }
  });

  // ISSA Table
  const issaHeaders = [
    [{ content: 'Information Systems Security Assessment', colSpan: 4 }],
    ['Component', 'Y', 'N', 'Notes']
  ];

  const issaBody = [
    [
      'Data Backup & Recovery',
      formData.clientRequirements.issa.dataBackupRecovery ? '✓' : '',
      !formData.clientRequirements.issa.dataBackupRecovery ? '✓' : '',
      ''
    ],
    [
      'Firewall Administration & Configuration',
      formData.clientRequirements.issa.firewallAdministration ? '✓' : '',
      !formData.clientRequirements.issa.firewallAdministration ? '✓' : '',
      ''
    ],
    [
      'Follow-up Status of Recommendations',
      formData.clientRequirements.issa.followUpStatus ? '✓' : '',
      !formData.clientRequirements.issa.followUpStatus ? '✓' : '',
      ''
    ],
    [
      'Insurance Coverage',
      formData.clientRequirements.issa.insuranceCoverage ? '✓' : '',
      !formData.clientRequirements.issa.insuranceCoverage ? '✓' : '',
      ''
    ],
    [
      'Network Monitoring & Intrusion Detection',
      formData.clientRequirements.issa.networkMonitoring ? '✓' : '',
      !formData.clientRequirements.issa.networkMonitoring ? '✓' : '',
      ''
    ],
    [
      'Core System in Use',
      '',
      '',
      formData.clientRequirements.issa.coreSystemInUse
    ]
  ];

  // Add custom ISSA options
  formData.clientRequirements.issa.customOptions.forEach(option => {
    issaBody.push([
      option.label,
      option.checked ? '✓' : '',
      !option.checked ? '✓' : '',
      ''
    ]);
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: issaHeaders,
    body: issaBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Footprinting Section
  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: [[{ content: 'FOOTPRINTING INFORMATION ANALYSIS', colSpan: 3 }]],
    body: [
      ['', 'Y', 'N'],
      ['Footprinting Analysis', formData.clientRequirements.footprinting ? '✓' : '', !formData.clientRequirements.footprinting ? '✓' : ''],
      ['Notes:', { content: formData.clientRequirements.footprintingNotes || '', colSpan: 2 }]
    ],
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // External Vulnerability Assessment
  const evaHeaders = [
    [{ content: 'EXTERNAL VULNERABILITY ASSESSMENT', colSpan: 4 }],
    ['Component', 'Y', 'N', 'Details']
  ];

  const evaBody = [
    [
      'Internet Vulnerability Assessment (Once)',
      formData.clientRequirements.externalVulnerabilityAssessment.internetVulnerabilityAssessment ? '✓' : '',
      !formData.clientRequirements.externalVulnerabilityAssessment.internetVulnerabilityAssessment ? '✓' : '',
      ''
    ],
    [
      'External IPs to test',
      '',
      '',
      formData.clientRequirements.externalVulnerabilityAssessment.externalIPsToTest
    ],
    [
      'Total External IPs',
      '',
      '',
      formData.clientRequirements.externalVulnerabilityAssessment.totalExternalIPs
    ]
  ];

  // Add custom EVA options
  formData.clientRequirements.externalVulnerabilityAssessment.customOptions.forEach(option => {
    evaBody.push([
      option.label,
      option.checked ? '✓' : '',
      !option.checked ? '✓' : '',
      ''
    ]);
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: evaHeaders,
    body: evaBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Internal Vulnerability Assessment
  const ivaHeaders = [
    [{ content: 'INTERNAL VULNERABILITY ASSESSMENT', colSpan: 4 }],
    ['Component', 'Y', 'N', 'Details']
  ];

  const ivaBody = [
    [
      'Network Vulnerability Assessment (Once)',
      formData.clientRequirements.internalVulnerabilityAssessment.networkVulnerabilityAssessment ? '✓' : '',
      !formData.clientRequirements.internalVulnerabilityAssessment.networkVulnerabilityAssessment ? '✓' : '',
      ''
    ],
    [
      'Internal IPs to test',
      '',
      '',
      formData.clientRequirements.internalVulnerabilityAssessment.internalIPsToTest
    ],
    [
      'Total Internal IPs',
      '',
      '',
      formData.clientRequirements.internalVulnerabilityAssessment.totalInternalIPs
    ]
  ];

  // Add custom IVA options
  formData.clientRequirements.internalVulnerabilityAssessment.customOptions.forEach(option => {
    ivaBody.push([
      option.label,
      option.checked ? '✓' : '',
      !option.checked ? '✓' : '',
      ''
    ]);
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: ivaHeaders,
    body: ivaBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // External Penetration Testing
  const eptHeaders = [
    [{ content: 'EXTERNAL PENETRATION TESTING', colSpan: 4 }],
    ['Component', 'Y', 'N', 'Details']
  ];

  const eptBody = [
    [
      'Testing Type',
      '',
      '',
      formData.clientRequirements.externalPenetrationTesting.testingType
    ],
    [
      'Firewalls',
      formData.clientRequirements.externalPenetrationTesting.components.firewalls ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.firewalls ? '✓' : '',
      ''
    ],
    [
      'Passwords',
      formData.clientRequirements.externalPenetrationTesting.components.passwords ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.passwords ? '✓' : '',
      ''
    ],
    [
      'Web Servers',
      formData.clientRequirements.externalPenetrationTesting.components.webServers ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.webServers ? '✓' : '',
      ''
    ],
    [
      'Web Applications',
      formData.clientRequirements.externalPenetrationTesting.components.webApplications ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.webApplications ? '✓' : '',
      ''
    ],
    [
      'IDS',
      formData.clientRequirements.externalPenetrationTesting.components.ids ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.ids ? '✓' : '',
      ''
    ],
    [
      'SQL Injection',
      formData.clientRequirements.externalPenetrationTesting.components.sqlInjection ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.sqlInjection ? '✓' : '',
      ''
    ],
    [
      'Routers',
      formData.clientRequirements.externalPenetrationTesting.components.routers ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.routers ? '✓' : '',
      ''
    ],
    [
      'Email Server',
      formData.clientRequirements.externalPenetrationTesting.components.emailServer ? '✓' : '',
      !formData.clientRequirements.externalPenetrationTesting.components.emailServer ? '✓' : '',
      ''
    ]
  ];

  // Add custom EPT options
  formData.clientRequirements.externalPenetrationTesting.components.customOptions.forEach(option => {
    eptBody.push([
      option.label,
      option.checked ? '✓' : '',
      !option.checked ? '✓' : '',
      ''
    ]);
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: eptHeaders,
    body: eptBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Other Assessments
  const otherAssessmentsHeaders = [
    [{ content: 'OTHER ASSESSMENTS', colSpan: 4 }],
    ['Assessment Type', 'Y', 'N', 'Notes']
  ];

  const otherAssessmentsBody = [
    [
      'Wireless Network Assessment',
      formData.clientRequirements.wirelessNetworkAssessment ? '✓' : '',
      !formData.clientRequirements.wirelessNetworkAssessment ? '✓' : '',
      formData.clientRequirements.wirelessNetworkNotes || ''
    ],
    [
      'Physical Security Assessment',
      formData.clientRequirements.physicalSecurityAssessment ? '✓' : '',
      !formData.clientRequirements.physicalSecurityAssessment ? '✓' : '',
      formData.clientRequirements.physicalSecurityNotes || ''
    ],
    [
      'Cloud Security Assessment',
      formData.clientRequirements.cloudSecurityAssessment ? '✓' : '',
      !formData.clientRequirements.cloudSecurityAssessment ? '✓' : '',
      formData.clientRequirements.cloudSecurityNotes || ''
    ],
    [
      'Mobile Device Security Assessment',
      formData.clientRequirements.mobileDeviceSecurityAssessment ? '✓' : '',
      !formData.clientRequirements.mobileDeviceSecurityAssessment ? '✓' : '',
      formData.clientRequirements.mobileDeviceNotes || ''
    ]
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: otherAssessmentsHeaders,
    body: otherAssessmentsBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // GAP Analysis
  const gapHeaders = [
    [{ content: 'GAP ANALYSIS', colSpan: 4 }],
    ['Analysis Type', 'Y', 'N', 'Notes']
  ];

  const gapBody = [
    [
      'GRAMM-LEACH-BLILEY',
      formData.clientRequirements.gapAnalysis.grammLeachBliley ? '✓' : '',
      !formData.clientRequirements.gapAnalysis.grammLeachBliley ? '✓' : '',
      ''
    ],
    [
      'PCI-DSS',
      formData.clientRequirements.gapAnalysis.pciDss ? '✓' : '',
      !formData.clientRequirements.gapAnalysis.pciDss ? '✓' : '',
      ''
    ],
    [
      'HIPAA',
      formData.clientRequirements.gapAnalysis.hippa ? '✓' : '',
      !formData.clientRequirements.gapAnalysis.hippa ? '✓' : '',
      ''
    ],
    [
      'FISMA',
      formData.clientRequirements.gapAnalysis.fisma ? '✓' : '',
      !formData.clientRequirements.gapAnalysis.fisma ? '✓' : '',
      ''
    ],
    [
      'SOX',
      formData.clientRequirements.gapAnalysis.sox ? '✓' : '',
      !formData.clientRequirements.gapAnalysis.sox ? '✓' : '',
      formData.clientRequirements.gapAnalysis.notes || ''
    ]
  ];

  // Add custom GAP options
  formData.clientRequirements.gapAnalysis.customOptions.forEach(option => {
    gapBody.push([
      option.label,
      option.checked ? '✓' : '',
      !option.checked ? '✓' : '',
      ''
    ]);
  });

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: gapHeaders,
    body: gapBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
  });

  // Other Requirements
  if (formData.clientRequirements.otherRequirements.length > 0) {
    const otherReqHeaders = [
      [{ content: 'OTHER REQUIREMENTS', colSpan: 2 }]
    ];

    const otherReqBody = formData.clientRequirements.otherRequirements.map(req => [req, '✓']);

    if (formData.clientRequirements.otherRequirementsNotes) {
      otherReqBody.push(['Notes:', formData.clientRequirements.otherRequirementsNotes]);
    }

    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: otherReqHeaders,
      body: otherReqBody,
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });
  }

  // Teleconference Notes
  if (formData.teleconferenceNotes) {
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Teleconference Notes"]],
      body: [[formData.teleconferenceNotes]],
      theme: 'grid',
      headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });
  }

  // FAQ Section
  const faqHeaders = [
    [{ content: 'FREQUENTLY ASKED QUESTIONS', colSpan: 2 }]
  ];

  const faqBody = [
    ['FRAP (Facilitated Risk Assessment Process)', ''],
    ['Initial FRAP', 'Sessions with key personnel from EACH department. Participants identify critical information assets, assess threats and vulnerabilities to identified assets, analyze the impact on the organization of identified threats and identify mitigating controls. Risks are identified and prioritized using the CIA Triad of Confidentiality, Integrity and Availability. Mitigating controls are then assigned to each risk. Deliverables include a Risk Action Plan template that the client organization will use to assign timelines and responsible persons to each identified risk and associated controls.'],
    ['Follow Up of Risk Action Plan', 'Review of existing RAP in light of changes in the client organization\'s security environment.'],
    ['Detailed analysis of Risk Action Plan', 'Review of existing RAP, breaking general risks into specific areas, e.g., power outage becomes power outage > 30 min, power outage > 1 day, power outage > 1 week.'],
    ['', ''],
    ['ISSA (Information Systems Security Assessment)', ''],
    ['Antivirus Administration & Configuration', 'Includes review of existing policies and procedures with recommendations for minimum included items; review of installed AV software (version, patch & hotfix level, capabilities, update frequency, distribution scheme); host/appliance OS security, patch & hotfix level; AV client configuration and AV training for administrators and end users. Includes recommendations for industry "best practices".'],
    ['BCP/DRP', 'Documentation, content and sufficiency of policies and procedures relating to the core application system; includes logical controls, physical access controls, reports and error reporting, change management, third party remote access control and recommendations for industry "best practices."'],
    ['Core Application Systems Security', 'Includes review of existing policies and procedures related to the control of the client organization\'s core system host and application. Includes recommendations for industry "best practices".'],
    ['Data Backup & Recovery', 'Includes review of existing policies and procedures with recommendations for minimum included items; review of installed backup software (version, patch & hotfix level, capabilities); host/appliance OS security, patch & hotfix level; backup software change control processes; types and frequency of data backups; media labeling, accountability, inventory and reconciliation procedures; on and off-site storage of media and data recovery testing procedures. Includes recommendations for industry "best practices".'],
    ['Firewall Administration & Configuration', 'If a Perimeter and Core Infrastructure Assessment is not part of the engagement, FAC includes review of existing policies and procedures related to the administration of the credit union\'s firewall(s); examination of firewall configuration files and access control lists. Includes recommendations for industry "best practices". If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.'],
    ['Follow-up Status of Recommendations', 'Includes examination of previous Information Systems reviews conducted by the client organization\'s regulators and external auditors; examination of follow up actions on the findings of those reviews.'],
    ['Insurance Coverage', 'Includes review of existing insurance policies and coverage levels; recommendations of coverage levels based on current the client organization\'s environment.'],
    ['Network Monitoring & Intrusion Detection', 'If a Perimeter and Core Infrastructure Assessment is not part of the engagement, NMP includes review of existing policies and procedures related to intrusion detection and review of the configuration files of intrusion detection systems and host devices. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.'],
    ['Network Topology', 'Includes review of existing policies and procedures related to network topology configuration and documentation; verification that network documentation is current and reflects the actual network topology.'],
    ['Patch Management Process', 'Includes review of existing policies and procedures with recommendations for minimum included items; review of installed PM software (version, patch & hotfix level, capabilities, update frequency, distribution scheme); host/appliance OS security, patch & hotfix level; PM change control and back out procedures.'],
    ['Physical Security', 'If Social Engineering as not part of the engagement, PS includes review of existing policies and procedures related to the physical security of the client organization and its assets, walk through during both business and non-business hours and sanitation reconnaissance. Includes recommendations for industry "best practices." If Social Engineering is part of the engagement, these items as well as additional items are reported in the appropriate section of the SEA.'],
    ['Policy, Procedure and Documentation', 'Includes review of existing policies and procedures related to Information Security.'],
    ['Router Administration & Configuration', 'If a Perimeter and Core Infrastructure Assessment is not part of the engagement, RAC includes review of existing policies and procedures related to the administration of the client organization\'s router(s); examination of router configuration files and access control lists. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.'],
    ['Server Administration & Configuration', 'If a Perimeter and Core Infrastructure Assessment is not part of the engagement, SAC includes review of existing policies and procedures related to the administration of the client organization\'s server(s); examination of server configuration files and access control lists. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.'],
    ['Switch Administration & Configuration', 'If a Perimeter and Core Infrastructure Assessment is not part of the engagement, SWAC includes review of existing policies and procedures related to the administration of the client organization\'s switch(es); examination of switch configuration files and access control lists. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.'],
    ['Workstation Administration & Configuration', 'If a Perimeter and Core Infrastructure Assessment is not part of the engagement, DAC includes review of existing policies and procedures related to the administration of the client organization\'s desktop computers and review of the security configuration of desktop operating systems and host devices. Includes recommendations for industry "best practices." If a Perimeter and Core Infrastructure Assessment is part of the engagement, these items as well as additional items are reported in the appropriate section of the PCIA.'],
    ['', ''],
    ['Assessments and Testing', ''],
    ['Internet Foot Print Information Analysis', 'Uses the Internet to search for information that could assist an attacker in gaining access to the client organization\'s network. Includes examination of the client organization\'s web site HTML code (as seen by an attacker) and search results for contact names, email addresses, product endorsements, personal information, etc. that could be used by an attacker.'],
    ['External Vulnerability Assessment', 'Examines an organization\'s security profile from the perspective of an outsider or someone who does not have access to systems and networks behind the organization\'s external security perimeter.'],
    ['Network Vulnerability Assessment', 'Scan, investigate, analyze, and report on the level of risk associated with any security vulnerabilities discovered on the public, internet-facing devices and to provide your organization with appropriate mitigation strategies to address those discovered vulnerabilities.'],
    ['External Penetration Testing', 'Attempts to breach the target as an unauthorized user with varying levels of access. An External Penetration Test mimics the actions of an actual attacker exploiting weaknesses in the network security without the usual dangers. This test examines external IT systems for any weakness that could be used by an external attacker to disrupt the confidentiality, availability or integrity of the network, thereby allowing the organisation to address each weakness.'],
    ['Internal Penetration Testing', 'Mimics the actions of an actual attacker exploiting weaknesses in network security. This test examines internal IT systems for any weakness that could be used to disrupt the confidentiality, availability, or integrity of the network, thereby allowing the organization to address each weakness.'],
    ['Social Engineering Security Assessment', 'Consists of impersonating a trusted individual in an attempt to gain information and/or access to information or the client network infrastructure.'],
    ['Gramm-Leach-Bliley Gap Analysis', 'Performed in conjunction with the Internal Vulnerability Assessments and Analysis order to evaluate our client\'s compliance in respect to "safeguarding member information" per the Gramm-Leach-Bliley Act.']
  ];

  autoTable(doc, {
    startY: doc.lastAutoTable.finalY + 10,
    head: faqHeaders,
    body: faqBody,
    theme: 'grid',
    headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] },
    columnStyles: {
      0: { cellWidth: 80 },
      1: { cellWidth: 'auto' }
    },
    styles: {
      overflow: 'linebreak',
      cellPadding: 2,
      fontSize: 8
    }
  });

  // Add page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for(let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text('Page ' + i + ' of ' + pageCount, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
  }

  // Save the PDF
  doc.save('InitialClientWorksheet.pdf');
};

export default generatePDF;