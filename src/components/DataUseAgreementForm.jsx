import React, { useState } from 'react';
import { Calendar, FileText, Users, Shield, AlertTriangle, CheckSquare, Plus, Trash2 } from 'lucide-react';

const DataUseAgreementForm = () => {
  const [formData, setFormData] = useState({
    agreementDate: '',
    coveredEntity: {
      name: '',
      title: '',
      signatureDate: ''
    },
    dataUser: {
      name: '',
      title: '',
      signatureDate: ''
    },
    limitedDataSet: '',
    activities: '',
    permittedIndividuals: [''],
    project: '',
    authorizedUsers: [
      { name: '', date: '' }
    ]
  });

  const [showFullAgreement, setShowFullAgreement] = useState(false);

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' ? 
        { ...prev[section], [field]: value } : value
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: value
      }
    }));
  };

  const addPermittedIndividual = () => {
    setFormData(prev => ({
      ...prev,
      permittedIndividuals: [...prev.permittedIndividuals, '']
    }));
  };

  const removePermittedIndividual = (index) => {
    setFormData(prev => ({
      ...prev,
      permittedIndividuals: prev.permittedIndividuals.filter((_, i) => i !== index)
    }));
  };

  const updatePermittedIndividual = (index, value) => {
    setFormData(prev => {
      const updated = [...prev.permittedIndividuals];
      updated[index] = value;
      return { ...prev, permittedIndividuals: updated };
    });
  };

  const addAuthorizedUser = () => {
    setFormData(prev => ({
      ...prev,
      authorizedUsers: [...prev.authorizedUsers, { name: '', date: '' }]
    }));
  };

  const removeAuthorizedUser = (index) => {
    setFormData(prev => ({
      ...prev,
      authorizedUsers: prev.authorizedUsers.filter((_, i) => i !== index)
    }));
  };

  const updateAuthorizedUser = (index, field, value) => {
    setFormData(prev => {
      const updated = [...prev.authorizedUsers];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, authorizedUsers: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Data Use Agreement form data captured successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">DATA USE AGREEMENT</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Agreement Date */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> 
            Agreement Effective Date
          </h2>
          <div>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={formData.agreementDate}
              onChange={(e) => setFormData({...formData, agreementDate: e.target.value})}
            />
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Covered Entity Information */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <Shield className="mr-2 h-5 w-5" />
              Covered Entity
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.coveredEntity.name}
                  onChange={(e) => handleNestedInputChange('coveredEntity', 'name', e.target.value)}
                  placeholder="Enter covered entity name"
                />
              </div>
            </div>
          </div>

          {/* Data User Information */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Data User
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.dataUser.name}
                  onChange={(e) => handleNestedInputChange('dataUser', 'name', e.target.value)}
                  placeholder="Enter data user name"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Limited Data Set */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Limited Data Set
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Protected Health Information to be shared
            </label>
            <textarea
              className="w-full p-2 border rounded h-24"
              value={formData.limitedDataSet}
              onChange={(e) => setFormData({...formData, limitedDataSet: e.target.value})}
              placeholder="Describe the Protected Health Information that will be included in the Limited Data Set"
            />
            <p className="text-xs text-gray-500 mt-1">
              Note: The Limited Data Set will not contain any of the following identifiers: names; postal address (other than town/city, state, and zip code); phone numbers; fax numbers; email addresses; social security numbers; medical record numbers; health plan beneficiary numbers; account numbers; certificate/license numbers; vehicle identifiers; device identifiers; web URLs; IP addresses; biometric identifiers; full face photos.
            </p>
          </div>
        </div>

        {/* Activities */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Activities Description
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Use of Limited Data Set
            </label>
            <div className="flex gap-2 mb-2">
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="research" 
                  name="activityType" 
                  className="mr-1"
                  onChange={() => handleInputChange('activityType', 'research')}
                />
                <label htmlFor="research" className="text-sm">Research</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="publicHealth" 
                  name="activityType" 
                  className="mr-1"
                  onChange={() => handleInputChange('activityType', 'publicHealth')}
                />
                <label htmlFor="publicHealth" className="text-sm">Public Health</label>
              </div>
              <div className="flex items-center">
                <input 
                  type="radio" 
                  id="healthCare" 
                  name="activityType" 
                  className="mr-1"
                  onChange={() => handleInputChange('activityType', 'healthCare')}
                />
                <label htmlFor="healthCare" className="text-sm">Health Care Operations</label>
              </div>
            </div>
            <textarea
              className="w-full p-2 border rounded h-24"
              value={formData.activities}
              onChange={(e) => setFormData({...formData, activities: e.target.value})}
              placeholder="Describe the activities for which the Data User may use the Limited Data Set"
            />
          </div>
        </div>

        {/* Permitted Individuals */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Permitted Individuals
          </h2>
          <div className="space-y-3">
            <p className="text-sm text-gray-700">
              List individuals or classes of individuals who need the Limited Data Set for the performance of the Activities:
            </p>
            
            {formData.permittedIndividuals.map((individual, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  className="flex-1 p-2 border rounded"
                  value={individual}
                  onChange={(e) => updatePermittedIndividual(index, e.target.value)}
                  placeholder={`Individual ${index + 1}`}
                />
                {formData.permittedIndividuals.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removePermittedIndividual(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                )}
              </div>
            ))}
            
            <button
              type="button"
              onClick={addPermittedIndividual}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Another Individual
            </button>
          </div>
        </div>

        {/* Agreement Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-gray-700" />
            <span className="font-semibold">Full Agreement Content</span>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 focus:outline-none"
            onClick={() => setShowFullAgreement(!showFullAgreement)}
          >
            {showFullAgreement ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {/* Full Agreement Text */}
        {showFullAgreement && (
          <div className="p-4 border rounded-md bg-white text-sm text-gray-700 max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-2">1. Definitions</h3>
            <p className="mb-2">The parties agree that the following terms, when used in this Agreement, shall have the following meanings, and that the terms set forth below shall be deemed to be modified to reflect any changes made hereafter to such terms by law or regulation.</p>
            <p className="mb-2"><strong>"HIPAA"</strong> means the Health Insurance Portability and Accountability Act of 1996, Public Law 104-191.</p>
            <p className="mb-2"><strong>"HIPAA Regulations"</strong> means the regulations promulgated under HIPAA by the United States Department of Health and Human Services, including, but not limited to, 45 C.F.R. Part 160 and 45 C.F.R. Part 164.</p>
            <p className="mb-2"><strong>"Covered Entity"</strong> means a health plan, a health care clearinghouse, or a health care provider (each as defined by HIPAA and the HIPAA Regulations) who transmits any health information in electronic form in connection with a transaction covered by the HIPAA Regulations.</p>
            <p className="mb-2"><strong>"Individually Identifiable Health Information"</strong> means information that is a subset of health information, including demographic information collected from an individual, that is:</p>
            <ul className="list-disc pl-5 mb-2">
              <li>created or received by a health care provider, health plan, employer, or health care clearinghouse; and</li>
              <li>relates to the past, present, or future physical or mental health or condition of an individual; the provision of health care to an individual; or the past, present, or future payment for the provision of health care to an individual; and</li>
              <li>that identifies the individual; or</li>
              <li>with respect to which there is a reasonable basis to believe the information can be used to identify the individual.</li>
            </ul>
            <p className="mb-4"><strong>"Protected Health Information" or "PHI"</strong> means Individually Identifiable Health Information, except that Protected Health Information excludes Individually Identifiable Health Information in education records covered by the Family Educational Right and Privacy Act, as amended, 20 U.S.C. § 1232g, records described at 20 U.S.C. § 1232g(a)(4)(B)(iv), and employment records held by a covered entity in its role as employer.</p>
            
            <h3 className="font-bold mb-2">2. Obligations of Covered Entity</h3>
            <p className="mb-4"><strong>Limited Data Set.</strong> Covered Entity agrees to share the Protected Health Information with Data User(s) (the "Limited Data Set"). Such Limited Data Set shall not contain any of the following identifiers of the individual who is the subject of the Protected Health Information, or of relatives, employers or household members of the individual: names; postal address information, other than town or city, State, and zip code; telephone numbers; fax numbers; electronic mail addresses; social security numbers; medical record numbers; health plan beneficiary numbers; account numbers; certificate/license numbers; vehicle identifiers and serial numbers, including license plate numbers; device identifiers and serial numbers; Web Universal Resource Locators (URLs); Internet Protocol (IP) address numbers; biometric identifiers, including finger and voice prints; and full face photographic images and any comparable images.</p>
            
            <h3 className="font-bold mb-2">3. Obligations of Data User</h3>
            <p className="mb-2"><strong>Performance of Activities.</strong> Data User may use and disclose the Limited Data Set received from Covered Entity only in connection with the performance of the [research activities] [public health activities] [health care operations] [described in Exhibit A attached to this Agreement] [described under Agreement] (the "Activities").</p>
            <p className="mb-2"><strong>Permitted Access to Limited Data Set.</strong> Data User shall limit the use or receipt of the Limited Data Set to the individuals or classes of individuals who need the Limited Data Set for the performance of the Activities.</p>
            <p className="mb-2"><strong>Assurances of Data User's Non-Employee Agents.</strong> Data User shall not disclose the Limited Data Set to any non-employee agent or subcontractor of Data User except with the prior written consent of Covered Entity. Data User shall ensure that any agents, including subcontractors, to whom it provides the Limited Data Set agree in writing to be bound by the same restrictions and conditions that apply to Data User with respect to such Limited Data Set.</p>
            <p className="mb-2"><strong>Nondisclosure Except As Provided In Agreement.</strong> Data User shall not use or further disclose the Limited Data Set except as permitted or required by this Agreement.</p>
            <p className="mb-2"><strong>Use Or Disclosure As If Covered Entity.</strong> Data User may not use or disclose the Limited Data Set in any manner that would violate the requirements of HIPAA or the HIPAA Regulations if Data User were a Covered Entity.</p>
            <p className="mb-2"><strong>Identification Of Individual.</strong> Data User may not use the Limited Data Set to identify or contact any individual who is the subject of the PHI from which the Limited Data Set was created.</p>
            <p className="mb-2"><strong>Disclosures Required By Law.</strong> Data User shall not, without the prior written consent of Covered Entity, disclose the Limited Data Set on the basis that such disclosure is required by law without notifying Covered Entity so that Covered Entity shall have an opportunity to object to the disclosure and to seek appropriate relief. If Covered Entity objects to such disclosure, Data User shall refrain from disclosing the Limited Data Set until Covered Entity has exhausted all reasonably available alternatives for relief.</p>
            <p className="mb-2"><strong>Safeguards.</strong> Data User shall use appropriate safeguards to prevent use or disclosure of the Limited Data Set other than as provided by this Agreement.</p>
            <p className="mb-2"><strong>Reporting.</strong> Data User shall report to Covered Entity within twenty-four (24) hours of Data User becoming aware of any use or disclosure of the Limited Data Set in violation of this Agreement or applicable law.</p>
            <p className="mb-4"><strong>Breaches of PHI.</strong> "Breach" shall mean the acquisition, access, use or disclosure of PHI in a manner not permitted by the Privacy Rule that compromises the security or privacy of the PHI as defined, and subject to the exceptions set forth, in 45 C.F.R. 164.402.</p>
            
            <h3 className="font-bold mb-2">4. Material Breach, Enforcement and Termination</h3>
            <p className="mb-2"><strong>Term.</strong> This Agreement shall be effective as of the Agreement Effective Date, and shall continue until the Agreement is terminated in accordance with the provisions of Section 4.c.</p>
            <p className="mb-2"><strong>Covered Entity's Rights of Access and Inspection.</strong> From time to time upon reasonable notice, or upon a reasonable determination by Covered Entity that Data User has breached this Agreement, Covered Entity may inspect the facilities, systems, books and records of Data User to monitor compliance with this Agreement.</p>
            <p className="mb-2"><strong>Termination.</strong> Covered Entity may terminate this Agreement:</p>
            <ul className="list-disc pl-5 mb-2">
              <li>immediately if Data User is named as a defendant in a criminal proceeding for a violation of HIPAA or the HIPAA Regulations;</li>
              <li>immediately if a finding or stipulation that Data User has violated any standard or requirement of HIPAA, the HIPAA Regulations, or any other security or privacy laws is made in any administrative or civil proceeding in which Data User has been joined;</li>
              <li>immediately, if Covered Entity determines that Data User has breached or violated a material term of this Agreement; or</li>
              <li>pursuant to Section 5.b. of this Agreement.</li>
            </ul>
            
            <h3 className="font-bold mb-2">5. Miscellaneous Terms</h3>
            <p className="mb-2"><strong>State Law.</strong> Nothing in this Agreement shall be construed to require Data User to use or disclose the Limited Data Set without a written authorization from an individual who is a subject of the PHI from which the Limited Data Set was created, or written authorization from any other person, where such authorization would be required under state law for such use or disclosure.</p>
            <p className="mb-2"><strong>Amendment.</strong> Covered Entity and Data User agree that amendment of this Agreement may be required to ensure that Covered Entity and Data User comply with changes in state and federal laws and regulations relating to the privacy, security, and confidentiality of PHI or the Limited Data Set.</p>
            <p className="mb-2"><strong>No Third Party Beneficiaries.</strong> Nothing express or implied in this Agreement is intended or shall be deemed to confer upon any person other than Covered Entity and Data User, and their respective successors and assigns, any rights, obligations, remedies or liabilities.</p>
            <p className="mb-2"><strong>Ambiguities.</strong> The parties agree that any ambiguity in this Agreement shall be resolved in favor of a meaning that complies and is consistent with applicable law protecting the privacy, security and confidentiality of PHI and the Limited Data Set, including, but not limited to, HIPAA and the HIPAA Regulations.</p>
            <p className="mb-4"><strong>Primacy.</strong> To the extent that any provisions of this Agreement conflict with the provisions of any other agreement or understanding between the parties, this Agreement shall control.</p>
          </div>
        )}

        {/* Legal Notice */}
        <div className="p-4 border rounded-md bg-amber-50 text-amber-800">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Important HIPAA Notice</p>
              <p className="text-sm mt-1">
                This agreement is governed by HIPAA regulations and creates legal obligations regarding protected health information.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>Data User must implement appropriate safeguards to prevent unauthorized use or disclosure</li>
                <li>Breaches must be reported within 24 hours</li>
                <li>The Limited Data Set cannot be used to identify individuals</li>
                <li>Covered Entity may terminate this agreement for violations of HIPAA regulations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Authorized Users */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <Users className="mr-2 h-5 w-5" />
            Assurance of Compliance with Data Use Agreement
          </h2>
          <p className="text-sm text-gray-700 mb-3">
            The following individuals are authorized to receive and use the Limited Data Set for the purposes described in this agreement.
          </p>
          
          {formData.authorizedUsers.map((user, index) => (
            <div key={index} className="p-3 border rounded-md mb-3 bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Authorized User #{index + 1}</span>
                {formData.authorizedUsers.length > 1 && (
                  <button 
                    type="button" 
                    onClick={() => removeAuthorizedUser(index)}
                    className="p-1 text-red-500 hover:bg-red-100 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={user.name}
                    onChange={(e) => updateAuthorizedUser(index, 'name', e.target.value)}
                    placeholder="Enter user name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={user.date}
                    onChange={(e) => updateAuthorizedUser(index, 'date', e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="border-t pt-3 mt-1">
                    <div className="h-16 border-b border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                      Signature Area
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={addAuthorizedUser}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Another Authorized User
          </button>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Covered Entity Signature */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              For Covered Entity
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.coveredEntity.name}
                  onChange={(e) => handleNestedInputChange('coveredEntity', 'name', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.coveredEntity.title}
                  onChange={(e) => handleNestedInputChange('coveredEntity', 'title', e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.coveredEntity.signatureDate}
                  onChange={(e) => handleNestedInputChange('coveredEntity', 'signatureDate', e.target.value)}
                />
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="h-20 border-b border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                  Signature Area
                </div>
              </div>
            </div>
          </div>

          {/* Data User Signature */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              For Data User
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.dataUser.name}
                  onChange={(e) => handleNestedInputChange('dataUser', 'name', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.dataUser.title}
                  onChange={(e) => handleNestedInputChange('dataUser', 'title', e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded"
                  value={formData.dataUser.signatureDate}
                  onChange={(e) => handleNestedInputChange('dataUser', 'signatureDate', e.target.value)}
                />
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="h-20 border-b border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                  Signature Area
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Identifier */}
        <div className="p-2 border-t text-xs text-gray-500 text-right">
          Document: Data Use Agreement | Page 1-5
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Generate Data Use Agreement
          </button>
        </div>
      </form>
    </div>
  );
};

export default DataUseAgreementForm;