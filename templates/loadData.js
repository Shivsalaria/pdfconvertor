import { initialClientWorksheet } from '../src/redux/slices/initialClientWorksheetSlice';

// Company Info
document.querySelector('#company-display').textContent = initialClientWorksheet.formData.companyInfo.name;
document.querySelector('#company-logo').src = initialClientWorksheet.formData.companyInfo.logo;
document.querySelector('#company-address').textContent = initialClientWorksheet.formData.companyInfo.address;
document.querySelector('#company-phone').textContent = initialClientWorksheet.formData.companyInfo.phone;
document.querySelector('#company-email').textContent = initialClientWorksheet.formData.companyInfo.email;
document.querySelector('#company-website').textContent = initialClientWorksheet.formData.companyInfo.website;

// Project Info
document.querySelector('#project-id').textContent = initialClientWorksheet.formData.projectInfo.projectId;
document.querySelector('#project-title').textContent = initialClientWorksheet.formData.projectInfo.projectTitle;
document.querySelector('#start-date').textContent = initialClientWorksheet.formData.projectInfo.startDate;
document.querySelector('#end-date').textContent = initialClientWorksheet.formData.projectInfo.expectedEndDate;
document.querySelector('#confidentiality-level').textContent = initialClientWorksheet.formData.projectInfo.confidentialityLevel;

// Client Info
document.querySelector('#client-company').textContent = initialClientWorksheet.formData.clientInfo.company;
document.querySelector('#client-address').textContent = initialClientWorksheet.formData.clientInfo.streetAddress;
document.querySelector('#client-city-state').textContent = initialClientWorksheet.formData.clientInfo.cityStateZIP;
document.querySelector('#primary-contact-name').textContent = initialClientWorksheet.formData.clientInfo.primaryContactName;
document.querySelector('#primary-contact-phone').textContent = initialClientWorksheet.formData.clientInfo.primaryContactPhone;
document.querySelector('#primary-contact-email').textContent = initialClientWorksheet.formData.clientInfo.primaryContactEmail;
document.querySelector('#alternate-contact-name').textContent = initialClientWorksheet.formData.clientInfo.alternateContactName;
document.querySelector('#alternate-contact-phone').textContent = initialClientWorksheet.formData.clientInfo.alternateContactPhone;
document.querySelector('#alternate-contact-email').textContent = initialClientWorksheet.formData.clientInfo.alternateContactEmail;

// Teleconference Info
document.querySelector('#teleconference-date').textContent = initialClientWorksheet.formData.teleconferenceInfo.dateTime;
document.querySelector('#teleconference-contact').textContent = initialClientWorksheet.formData.teleconferenceInfo.pointOfContact;
document.querySelector('#teleconference-number').textContent = initialClientWorksheet.formData.teleconferenceInfo.teleconferenceNumber;

// Client Requirements
// FRAP
document.querySelector('#frap-initial').checked = initialClientWorksheet.formData.clientRequirements.frap.initialFrap;
document.querySelector('#frap-followup').checked = initialClientWorksheet.formData.clientRequirements.frap.followUpRiskActionPlan;
document.querySelector('#frap-detailed').checked = initialClientWorksheet.formData.clientRequirements.frap.detailedAnalysisRiskActionPlan;
document.querySelector('#frap-notes').textContent = initialClientWorksheet.formData.clientRequirements.frap.notes;

// ISSA
document.querySelector('#issa-antivirus').checked = initialClientWorksheet.formData.clientRequirements.issa.antivirusAdministration;
document.querySelector('#issa-continuity').checked = initialClientWorksheet.formData.clientRequirements.issa.businessContinuityPlan;
document.querySelector('#issa-core-app').checked = initialClientWorksheet.formData.clientRequirements.issa.coreApplicationSystemSecurity;
document.querySelector('#issa-core-systems').textContent = initialClientWorksheet.formData.clientRequirements.issa.coreSystemInUse;
document.querySelector('#issa-policy').checked = initialClientWorksheet.formData.clientRequirements.issa.policyProcedures;
document.querySelector('#issa-firewall').checked = initialClientWorksheet.formData.clientRequirements.issa.firewallAdministration;
document.querySelector('#issa-followup').checked = initialClientWorksheet.formData.clientRequirements.issa.followUpStatus;
document.querySelector('#issa-monitoring').checked = initialClientWorksheet.formData.clientRequirements.issa.networkMonitoring;
document.querySelector('#issa-topology').checked = initialClientWorksheet.formData.clientRequirements.issa.networkTopology;
document.querySelector('#issa-patch').checked = initialClientWorksheet.formData.clientRequirements.issa.patchManagementProcess;
document.querySelector('#issa-physical').checked = initialClientWorksheet.formData.clientRequirements.issa.physicalSecurity;
document.querySelector('#issa-backup').checked = initialClientWorksheet.formData.clientRequirements.issa.dataBackupRecovery;
document.querySelector('#issa-router').checked = initialClientWorksheet.formData.clientRequirements.issa.routerAdministration;
document.querySelector('#issa-server').checked = initialClientWorksheet.formData.clientRequirements.issa.serverAdministration;
document.querySelector('#issa-switch').checked = initialClientWorksheet.formData.clientRequirements.issa.switchAdministration;
document.querySelector('#issa-insurance').checked = initialClientWorksheet.formData.clientRequirements.issa.insuranceCoverage;
document.querySelector('#issa-workstation').checked = initialClientWorksheet.formData.clientRequirements.issa.workstationAdministration;
document.querySelector('#issa-notes').textContent = initialClientWorksheet.formData.clientRequirements.issa.notes;

// Other Requirements
const otherRequirementsList = document.querySelector('#other-requirements-list');
initialClientWorksheet.formData.clientRequirements.otherRequirements.forEach(req => {
    const li = document.createElement('li');
    li.textContent = req;
    otherRequirementsList.appendChild(li);
});
document.querySelector('#other-requirements-notes').textContent = initialClientWorksheet.formData.clientRequirements.otherRequirementsNotes;