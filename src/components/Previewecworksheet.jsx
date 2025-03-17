import React from 'react';

const Previewecworksheet = ({ formData, onClose, onExport }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 w-full max-w-6xl rounded-lg shadow-xl">
        {/* Header */}
        <div className="text-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{formData.clientInfo.company || 'N/A'}</h1>
          <h2 className="text-xl text-gray-800 dark:text-gray-200">Initial Client Worksheet Preview</h2>
          <p className="text-gray-600 dark:text-gray-400">CONFIDENTIAL - Engagement Task Log</p>
          <p className="text-gray-600 dark:text-gray-400">{formData.clientInfo.company || 'N/A'} SERVICES PENETRATION TESTING TELECONFERENCE WORKSHEET</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto">
          {/* Client Information */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-bold mb-4 bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-200">SECTION 1 - CLIENT INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Company:</label>
                  <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.clientInfo.company || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Address:</label>
                  <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.clientInfo.streetAddress || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">City, State, ZIP:</label>
                  <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.clientInfo.cityStateZIP || 'N/A'}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Primary Contact</h4>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1">Name:</label>
                      <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.clientInfo.primaryContactName || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1">Phone:</label>
                      <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.clientInfo.primaryContactPhone || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-300 mb-1">Email:</label>
                      <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.clientInfo.primaryContactEmail || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Teleconference Information */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-bold mb-4 bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-200">SECTION 2 - TELECONFERENCE INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Date & Time:</label>
                <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.teleconferenceInfo.dateTime || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Point of Contact:</label>
                <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.teleconferenceInfo.pointOfContact || 'N/A'}</p>
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Teleconference Number:</label>
                <p className="border rounded p-2 bg-gray-50 dark:bg-gray-700">{formData.teleconferenceInfo.teleconferenceNumber || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Selected Requirements */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-bold mb-4 bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-200">SECTION 3 - CLIENT REQUIREMENTS</h3>

            {/* FRAP Requirements */}
            {(formData.clientRequirements?.frap?.initialFrap ||
              formData.clientRequirements?.frap?.followUpRiskActionPlan ||
              formData.clientRequirements?.frap?.detailedAnalysisRiskActionPlan ||
              formData.clientRequirements?.frap?.customOptions?.some(o => o.checked)) && (
                <div className="mb-6">
                  <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">FACILITATED RISK ANALYSIS PROCESS (FRAP)</h4>
                  <div className="space-y-2">
                    {formData.clientRequirements.frap.initialFrap && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Initial FRAP</span>
                      </div>
                    )}
                    {formData.clientRequirements.frap.followUpRiskActionPlan && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Follow-up on Risk Action Plan</span>
                      </div>
                    )}
                    {formData.clientRequirements.frap.detailedAnalysisRiskActionPlan && (
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">Detailed analysis of Risk Action Plan</span>
                      </div>
                    )}
                    {formData.clientRequirements.frap.customOptions
                      ?.filter(o => o.checked)
                      .map(o => (
                        <div key={o.id} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{o.label}</span>
                        </div>
                      ))
                    }
                  </div>
                  {formData.clientRequirements.frap.notes && (
                    <div className="mt-2">
                      <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Notes:</label>
                      <p className="text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700 p-2 rounded">
                        {formData.clientRequirements.frap.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}

            {/* Other Requirements */}
            {formData.clientRequirements?.otherRequirements?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-200">Other Requirements</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {formData.clientRequirements.otherRequirements.map((item, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{item}</li>
                  ))}
                </ul>
                {formData.clientRequirements.otherRequirementsNotes && (
                  <div className="mt-2">
                    <label className="block text-gray-700 dark:text-gray-300 font-semibold mb-1">Notes:</label>
                    <p className="text-gray-600 dark:text-gray-400 italic bg-gray-50 dark:bg-gray-700 p-2 rounded">
                      {formData.clientRequirements.otherRequirementsNotes}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Teleconference Notes */}
          {formData.teleconferenceNotes && (
            <div className="border rounded p-4">
              <h3 className="text-lg font-bold mb-4 bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-200">SECTION 4 - TELECONFERENCE NOTES</h3>
              <p className="text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {formData.teleconferenceNotes}
              </p>
            </div>
          )}

          {/* FAQ Section */}
          <div className="border rounded p-4">
            <h3 className="text-lg font-bold mb-4 bg-gray-100 dark:bg-gray-700 p-2 text-gray-800 dark:text-gray-200">SECTION 5 - FREQUENTLY ASKED QUESTIONS</h3>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">FRAP (Facilitated Risk Assessment Process)</h4>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400"><strong>Initial FRAP:</strong> Sessions with key personnel from EACH department. Participants identify critical information assets, assess threats and vulnerabilities to identified assets, analyze the impact on the organization of identified threats and identify mitigating controls. Risks are identified and prioritized using the CIA Triad of Confidentiality, Integrity and Availability. Mitigating controls are then assigned to each risk. Deliverables include a Risk Action Plan template that the client organization will use to assign timelines and responsible persons to each identified risk and associated controls.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Follow Up of Risk Action Plan:</strong> Review of existing RAP in light of changes in the client organization's security environment.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Detailed analysis of Risk Action Plan:</strong> Review of existing RAP, breaking general risks into specific areas, e.g., power outage becomes power outage {'>'} 30 min, power outage {'>'} 1 day, power outage {'>'} 1 week.</p>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">ISSA (Information Systems Security Assessment)</h4>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400"><strong>Antivirus Administration & Configuration:</strong> Includes review of existing policies and procedures with recommendations for minimum included items; review of installed AV software (version, patch & hotfix level, capabilities, update frequency, distribution scheme); host/appliance OS security, patch & hotfix level; AV client configuration and AV training for administrators and end users. Includes recommendations for industry "best practices".</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>BCP/DRP:</strong> Documentation, content and sufficiency of policies and procedures relating to the core application system; includes logical controls, physical access controls, reports and error reporting, change management, third party remote access control and recommendations for industry "best practices."</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Core Application Systems Security:</strong> Includes review of existing policies and procedures related to the control of the client organization's core system host and application. Includes recommendations for industry "best practices".</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Data Backup & Recovery:</strong> Includes review of existing policies and procedures with recommendations for minimum included items; review of installed backup software (version, patch & hotfix level, capabilities); host/appliance OS security, patch & hotfix level; backup software change control processes; types and frequency of data backups; media labeling, accountability, inventory and reconciliation procedures; on and off-site storage of media and data recovery testing procedures. Includes recommendations for industry "best practices".</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Firewall Administration & Configuration:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, FAC includes review of existing policies and procedures related to the administration of the credit union's firewall(s); examination of firewall configuration files and access control lists. Includes recommendations for industry "best practices".</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Network Monitoring & Intrusion Detection:</strong> If a Perimeter and Core Infrastructure Assessment is not part of the engagement, NMP includes review of existing policies and procedures related to intrusion detection and review of the configuration files of intrusion detection systems and host devices. Includes recommendations for industry "best practices".</p>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Assessments and Testing</h4>
                <div className="space-y-2">
                  <p className="text-gray-600 dark:text-gray-400"><strong>Internet Foot Print Information Analysis:</strong> Uses the Internet to search for information that could assist an attacker in gaining access to the client organization's network. Includes examination of the client organization's web site HTML code (as seen by an attacker) and search results for contact names, email addresses, product endorsements, personal information, etc. that could be used by an attacker.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>External Vulnerability Assessment:</strong> Examines an organization's security profile from the perspective of an outsider or someone who does not have access to systems and networks behind the organization's external security perimeter.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Network Vulnerability Assessment:</strong> Scan, investigate, analyze, and report on the level of risk associated with any security vulnerabilities discovered on the public, internet-facing devices and to provide your organization with appropriate mitigation strategies to address those discovered vulnerabilities.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>External Penetration Testing:</strong> Attempts to breach the target as an unauthorized user with varying levels of access. An External Penetration Test mimics the actions of an actual attacker exploiting weaknesses in the network security without the usual dangers.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Internal Penetration Testing:</strong> Mimics the actions of an actual attacker exploiting weaknesses in network security. This test examines internal IT systems for any weakness that could be used to disrupt the confidentiality, availability, or integrity of the network.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Social Engineering Security Assessment:</strong> Consists of impersonating a trusted individual in an attempt to gain information and/or access to information or the client network infrastructure.</p>
                  <p className="text-gray-600 dark:text-gray-400"><strong>Gramm-Leach-Bliley Gap Analysis:</strong> Performed in conjunction with the Internal Vulnerability Assessments and Analysis order to evaluate our client's compliance in respect to "safeguarding member information" per the Gramm-Leach-Bliley Act.</p>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
            // onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors flex items-center"
            // onClick={onExport}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Previewecworksheet; 