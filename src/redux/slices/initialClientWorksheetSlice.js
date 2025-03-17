import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    companyInfo: {
      name: 'securetharead',
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
  },
  isExporting: false
};

const initialClientWorksheetSlice = createSlice({
  name: 'initialClientWorksheet',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const { section, field, value } = action.payload;
      state.formData[section] = {
        ...state.formData[section],
        [field]: value
      };
    },
    updateNestedFormData: (state, action) => {
      const { section, subsection, field, value } = action.payload;
      state.formData[section][subsection] = {
        ...state.formData[section][subsection],
        [field]: value
      };
    },
    updateComponentData: (state, action) => {
      const { section, subsection, component, value } = action.payload;
      state.formData[section][subsection].components[component] = value;
    },
    addCustomOption: (state, action) => {
      const { section, subsection, option } = action.payload;
      if (subsection) {
        state.formData[section][subsection].customOptions.push({
          id: Date.now(),
          label: option,
          checked: false
        });
      } else {
        state.formData[section].customOptions.push({
          id: Date.now(),
          label: option,
          checked: false
        });
      }
    },
    removeCustomOption: (state, action) => {
      const { section, subsection, optionId } = action.payload;
      if (subsection) {
        state.formData[section][subsection].customOptions = state.formData[section][subsection].customOptions.filter(
          option => option.id !== optionId
        );
      } else {
        state.formData[section].customOptions = state.formData[section].customOptions.filter(
          option => option.id !== optionId
        );
      }
    },
    toggleCustomOption: (state, action) => {
      const { section, subsection, optionId } = action.payload;
      if (subsection) {
        const option = state.formData[section][subsection].customOptions.find(
          opt => opt.id === optionId
        );
        if (option) {
          option.checked = !option.checked;
        }
      } else {
        const option = state.formData[section].customOptions.find(
          opt => opt.id === optionId
        );
        if (option) {
          option.checked = !option.checked;
        }
      }
    },
    addOtherRequirement: (state, action) => {
      const { requirement } = action.payload;
      if (requirement && requirement.trim() !== '') {
        state.formData.clientRequirements.otherRequirements.push(requirement);
      }
    },
    removeOtherRequirement: (state, action) => {
      const { index } = action.payload;
      state.formData.clientRequirements.otherRequirements.splice(index, 1);
    },
    setExporting: (state, action) => {
      state.isExporting = action.payload;
    },
    resetForm: (state) => {
      state.formData = initialState.formData;
    }
  }
});

export const {
  updateFormData,
  updateNestedFormData,
  updateComponentData,
  addCustomOption,
  removeCustomOption,
  toggleCustomOption,
  addOtherRequirement,
  removeOtherRequirement,
  setExporting,
  resetForm
} = initialClientWorksheetSlice.actions;

export default initialClientWorksheetSlice.reducer; 