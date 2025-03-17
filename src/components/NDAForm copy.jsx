import React, { useState } from 'react';
import { Calendar, FileText, Users, Briefcase, CheckSquare, AlertTriangle } from 'lucide-react';

const NDAForm = () => {
  const [formData, setFormData] = useState({
    effectiveDate: {
      day: '',
      month: '',
      year: ''
    },
    company: {
      name: 'EGS Security Solutions',
      address1: '',
      address2: ''
    },
    client: {
      name: '',
      address1: '',
      address2: ''
    },
    project: '',
    signatures: {
      company: {
        name: '',
        title: ''
      },
      client: {
        name: '',
        title: ''
      }
    }
  });

  const [showFullNDA, setShowFullNDA] = useState(false);

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
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('NDA form data captured successfully!');
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">NON-DISCLOSURE AGREEMENT</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Effective Date */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <Calendar className="mr-2 h-5 w-5" /> 
            Effective Date
          </h2>
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Day</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.effectiveDate.day}
                onChange={(e) => handleNestedInputChange('effectiveDate', 'day', e.target.value)}
                placeholder="DD"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.effectiveDate.month}
                onChange={(e) => handleNestedInputChange('effectiveDate', 'month', e.target.value)}
                placeholder="Month"
              />
            </div>
            <div className="w-1/3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={formData.effectiveDate.year}
                onChange={(e) => handleNestedInputChange('effectiveDate', 'year', e.target.value)}
                placeholder="YYYY"
              />
            </div>
          </div>
        </div>

        {/* Parties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Information */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Company Information (1)
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded bg-gray-100"
                  value={formData.company.name}
                  onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.company.address1}
                  onChange={(e) => handleInputChange('company', 'address1', e.target.value)}
                  placeholder="Enter company address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.company.address2}
                  onChange={(e) => handleInputChange('company', 'address2', e.target.value)}
                  placeholder="Enter additional address details"
                />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Client Information (2)
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.client.name}
                  onChange={(e) => handleInputChange('client', 'name', e.target.value)}
                  placeholder="Enter client name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.client.address1}
                  onChange={(e) => handleInputChange('client', 'address1', e.target.value)}
                  placeholder="Enter client address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.client.address2}
                  onChange={(e) => handleInputChange('client', 'address2', e.target.value)}
                  placeholder="Enter additional address details"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="p-4 border rounded-md bg-gray-50">
          <h2 className="font-semibold mb-2 flex items-center">
            <Briefcase className="mr-2 h-5 w-5" />
            Project Details
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
            <textarea
              className="w-full p-2 border rounded h-24"
              value={formData.project}
              onChange={(e) => setFormData({...formData, project: e.target.value})}
              placeholder="Enter project description"
            />
          </div>
        </div>

        {/* Agreement Toggle */}
        <div className="flex items-center justify-between p-4 border rounded-md bg-gray-50">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5 text-gray-700" />
            <span className="font-semibold">Full NDA Content</span>
          </div>
          <button
            type="button"
            className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 focus:outline-none"
            onClick={() => setShowFullNDA(!showFullNDA)}
          >
            {showFullNDA ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {/* Full NDA Text */}
        {showFullNDA && (
          <div className="p-4 border rounded-md bg-white text-sm text-gray-700 max-h-96 overflow-y-auto">
            <h3 className="font-bold mb-2">1.0 Definitions:</h3>
            <p className="mb-2">In this Agreement the following terms shall, unless the context otherwise requires, have the following meanings:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>1.1 'Disclosing Party'</strong> means the Party disclosing Confidential Information to the other Party under this Agreement.</li>
              <li><strong>1.2 'Receiving Party'</strong> means the Party receiving Confidential Information from the other Party under this Agreement.</li>
              <li>
                <strong>1.3 'Confidential Information'</strong> means any information, which shall include but is not limited to, design, fabrication & assembly drawings, know-how, processes, product specifications, raw materials, trade secrets, market opportunities, or business or financial affairs of the Parties or their customers, product samples, inventions, concepts and any other technical and/or commercial information, disclosed directly or indirectly and in any form whatsoever (including, but not limited to, disclosure made in writing, oral or in the form of samples, models, computer programs, drawings or other instruments) furnished by the Disclosing Party to the Receiving Party under this Agreement.
                <ol className="list-decimal pl-5 space-y-1 mt-2">
                  <li>
                    <strong>1.3.1</strong> Such Confidential Information shall also include, but shall not be limited to:
                    <ol className="list-decimal pl-5 space-y-1 mt-1">
                      <li><strong>1.3.1.1</strong> Information disclosed by the Disclosing Party in writing marked as confidential at the time of disclosure;</li>
                      <li><strong>1.3.1.2</strong> Information disclosed by the Disclosing Party orally, which is slated to be confidential at the time of disclosure;</li>
                      <li><strong>1.3.1.3</strong> Information disclosed in any other manner is designated in writing as Confidential Information at the time of disclosure; or</li>
                      <li><strong>1.3.1.4</strong> Notwithstanding sub-clauses 1.3.1.1, 1.3.1.2 and 1.3.1.3 of this definition, any information whose nature makes it obvious that it is confidential.</li>
                    </ol>
                  </li>
                  <li>
                    <strong>1.3.2</strong> Such Confidential Information shall not include any information which:
                    <ol className="list-decimal pl-5 space-y-1 mt-1">
                      <li><strong>1.3.2.1</strong> is, at the time of disclosure, publicly known; or</li>
                      <li><strong>1.3.2.2</strong> becomes at a later date, publicly available, otherwise than a wrongful act or negligence or breach of this Agreement of or by the Receiving Party; or</li>
                      <li><strong>1.3.2.3</strong> the Receiving Party can demonstrate by its written records was in its possession, or known to the Receiving Party, before receipt under this Agreement, and which was not previously acquired under an obligation of confidentiality; or</li>
                      <li><strong>1.3.2.4</strong> is legitimately obtained at any time by the Receiving Party from a third party without restrictions in respect of disclosure or use; or</li>
                      <li><strong>1.3.2.5</strong> the Receiving Party can demonstrate to the satisfaction of the Disclosing Party, has been developed independently of its obligations under this Agreement and without access to the Confidential Information.</li>
                    </ol>
                  </li>
                </ol>
              </li>
              <li><strong>1.4 'Purpose'</strong> means the evaluations, discussions, negotiations and execution regarding a contractual relationship between the Parties in respect of the Project defined in paragraph (i) of the Background section.</li>
              <li><strong>1.5 'Affiliate'</strong> means any legal entity which, at the time of disclosure to it on any Confidential Information, is directly or indirectly controlling, controlled by or under common control with any of the Parties.</li>
              <li><strong>1.6 'Contemplated Agreement'</strong> means any future legally binding Agreement between the Parties in respect of the Project envisaged under this Agreement.</li>
            </ol>

            <h3 className="font-bold mb-2">2.0 Non-Disclosure of Confidential Information:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>2.1</strong> In consideration of the disclosure of Confidential Information by the Disclosing Party to the Receiving Party solely for the Purpose, the Receiving Party undertakes, whether by itself, its successors and heirs, not to disclose Confidential Information to any third party, unless in accordance with Clause 4.</li>
              <li>
                <strong>2.2</strong> In addition to the undertaking in Clause 2.1, the Receiving Party shall be liable for:
                <ol className="list-decimal pl-5 space-y-1 mt-1">
                  <li><strong>2.2.1</strong> any loss, theft or other inadvertent disclosure of Confidential Information, and</li>
                  <li><strong>2.2.2</strong> any unauthorized disclosure of Confidential Information by persons (including, but not limited to, present and former employees) or entities to whom the Receiving Party under this Agreement has the right to disclose Confidential Information, except where, the Receiving Party has used the same degree of care in safeguarding such Confidential Information as it uses for its own Confidential Information of like importance and in no event less than a reasonable degree of care; and upon becoming aware of such inadvertent or unauthorized disclosure the Receiving Party has promptly notified the Disclosing Party thereof and taken all reasonable measures to mitigate the effects of such disclosure and to prevent further disclosure.</li>
                </ol>
              </li>
              <li>
                <strong>2.3</strong> The Receiving Party understands and agrees that:
                <ol className="list-decimal pl-5 space-y-1 mt-1">
                  <li><strong>2.3.1</strong> any information known only to a few people to whom it might be of commercial interest and not generally known to the public is not public knowledge;</li>
                  <li><strong>2.3.2</strong> a combination of two or more parts of the Confidential Information is not public knowledge merely because each part is separately available to the public.</li>
                </ol>
              </li>
              <li><strong>2.4</strong> The Receiving Party acknowledges the technical, commercial and strategic value of the Confidential Information to the Disclosing Party and understands that unauthorized disclosure of such Confidential Information will be injurious to the Disclosing Party.</li>
            </ol>

            <h3 className="font-bold mb-2">3.0 Use of Confidential Information:</h3>
            <p className="mb-4 pl-5">The Receiving Party is entitled to use the Confidential Information, but only for the Purpose.</p>

            <h3 className="font-bold mb-2">4.0 Permitted Disclosure of Confidential Information:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>4.1</strong> The Receiving Party may disclose in confidence Confidential Information to any of its Affiliates and employees, in which event the Affiliate and the employee shall be entitled to use the Confidential Information, but only to the same extent the Receiving Party is permitted to do so under this Agreement. The Receiving Party agrees that such Affiliates or employees are subject to confidentiality obligations no less restrictive than those of this Agreement.</li>
              <li><strong>4.2</strong> The Receiving Party shall limit the dissemination of Confidential Information of its Affiliates and employees having a need to receive such information to carry out the Purpose.</li>
              <li><strong>4.3</strong> The Receiving Party may disclose Confidential Information to its consultants, contractors, sub-contractors, agents or similar persons and entities having a need to receive such information to carry out the Purpose on the prior written consent of the Disclosing Party. In the event that the Disclosing Party gives such consents, the Receiving Party agrees that such individuals are subject to confidentiality obligations no less restrictive than those of this Agreement.</li>
              <li><strong>4.4</strong> Notwithstanding Clause 2.1, the Receiving Party shall not be prevented from disclosing Confidential Information, where (i) such disclosure is in response to a valid order of a court or any other governmental body having jurisdiction over this Agreement or (ii) such disclosure is otherwise required by law, provided that the Receiving Party, to the extent possible, has first given prior written notice to the Disclosing Party and made reasonable efforts to protect the Confidential Information in connection with such disclosure.</li>
            </ol>

            <h3 className="font-bold mb-2">5.0 Copying and Return of Furnished Instruments:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>5.1</strong> The Receiving Party shall not be entitled to copy samples, models, computer programs, drawings, documents or other instruments furnished by the Disclosing Party hereunder and containing Confidential Information, unless and to the extent it is necessary for the Purpose.</li>
              <li><strong>5.2</strong> All samples, models, computer programs, drawings, documents and other instruments furnished hereunder and containing Confidential Information shall remain the Disclosing Party's property.</li>
              <li><strong>5.3</strong> At any time upon request from the Disclosing Party or upon the conclusion of the Purpose or expiry of this Agreement, the Receiving Party, at its own cost, will return or procure the return, promptly and in any event within 14 days of receipt of such request, of each and every copy of Confidential Information given by the Disclosing Party, and satisfy the Disclosing Party that it no longer holds any further Confidential Information.</li>
            </ol>

            <h3 className="font-bold mb-2">6.0 Non-Disclosure of Negotiations:</h3>
            <p className="mb-4 pl-5">Except as provided in Clause 4, each Party agrees that it will not, without the other Party's prior written approval, disclose to any third party the fact that the Parties are discussing the Project. The Parties acknowledge that the provisions of this Agreement shall apply in respect of the content of any such discussions. The undertaking set forth in this Clause 7 shall survive the termination of this Agreement.</p>

            <h3 className="font-bold mb-2">7.0 Term and Termination:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>7.1</strong> This Agreement shall become effective on the Effective Date. The provisions of this Agreement shall however, apply retroactively to any Confidential Information, which may have been disclosed in connection with discussions and negotiations regarding the Project prior to the Effective Date.</li>
              <li><strong>7.2</strong> This Agreement shall remain in force for five (5) years from the Effective Date, except to the extent this Agreement is superseded by stipulations of the Contemplated Agreement.</li>
              <li><strong>7.3</strong> The rights and obligations of each Party with respect to all Confidential Information of the other Party that is received under this Agreement shall remain in effect for a period of five (5) years from the date of disclosure of Confidential Information.</li>
            </ol>

            <h3 className="font-bold mb-2">8.0 Intellectual Property Rights:</h3>
            <p className="mb-4 pl-5">All Confidential Information disclosed herein shall remain the sole property of the Disclosing Party and the Receiving Party shall obtain no right thereto of any kind by reason of this Agreement.</p>

            <h3 className="font-bold mb-2">9.0 Future Agreements:</h3>
            <p className="mb-4 pl-5">Nothing in this Agreement shall obligate either Party to enter into any further Agreements.</p>

            <h3 className="font-bold mb-2">10.0 Amendments:</h3>
            <p className="mb-4 pl-5">Any amendment to this Agreement shall be agreed in writing by both Parties and shall refer to this Agreement.</p>

            <h3 className="font-bold mb-2">11.0 Severance:</h3>
            <p className="mb-4 pl-5">If any term or provision in this Agreement is held to be either illegal or unenforceable, in whole or in part, under any enactment or rule of law, such term or provision or part shall to that extent be deemed not to form part of this Agreement, but the validity and enforceability of the remainder of this Agreement shall not be affected.</p>

            <h3 className="font-bold mb-2">12.0 Governing Law:</h3>
            <p className="mb-4 pl-5">This Agreement shall be governed by and construed in accordance with the laws of India and in any dispute arising out of or relating to this agreement, the Parties submit to the exclusive jurisdiction of the Courts situated at Delhi, India.</p>

            <h3 className="font-bold mb-2">13.0 General:</h3>
            <ol className="list-decimal pl-5 space-y-2 mb-4">
              <li><strong>13.1</strong> Upon 45 days written notice, the Disclosing Party may audit the use of the programs, materials, marketing materials, services, and such additional disclosed resources. The Receiving Party agrees to co-operate with the Disclosing Party's audit and to provide reasonable assistance and access to information.</li>
              <li><strong>13.2</strong> The Disclosing Party shall not have any liability to the Receiving Party for any claims made by third parties arising out of their use of the Disclosing Party's trademarks (including "Logo") or marketing materials. The Receiving Party agrees to indemnify the Disclosing Party for any loss, liability, damages, cost or expense (including attorney's fees) arising out of any claims, which may be made against the Disclosing Party arising out of their use of the Logo or marketing materials where such claim relates to their activities, products or services. Notwithstanding above, the Receiving Party shall have no obligation to indemnify the Disclosing Party with respect to a claim of trademark or copyright infringement based upon their use of the Logo or marketing materials, as expressly permitted under this Agreement.</li>
              <li><strong>13.3</strong> The Receiving Party shall disclose of any similar agreements explicit or otherwise, for similar purpose/application within its own organization, or any other third party.</li>
              <li><strong>13.4</strong> In the event of a breach or threatened breach by the Receiving Party of any provisions of this Agreement, the Disclosing Party, in addition to and not in limitation of any other rights, remedies or damages available to the Disclosing Party at law or in equity, shall be entitled to a temporary restraining order / preliminary injunction in order to prevent or to restrain any such breach by the Receiving Party, or by any or all persons directly or indirectly acting for, on behalf of, or with the Receiving Party.</li>
            </ol>
          </div>
        )}

        {/* Legal Notice */}
        <div className="p-4 border rounded-md bg-amber-50 text-amber-800">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Important Legal Notice</p>
              <p className="text-sm mt-1">
                This document is a legally binding agreement. By proceeding, you acknowledge that:
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                <li>The agreement remains in force for five (5) years from the Effective Date</li>
                <li>Obligations related to Confidential Information remain for five (5) years from disclosure</li>
                <li>This agreement is governed by the laws of India with jurisdiction in Delhi, India</li>
                <li>All disclosed Confidential Information remains the property of the Disclosing Party</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Signatures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Signature */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              For EGS Security Solutions
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.signatures.company.name}
                  onChange={(e) => handleNestedInputChange('signatures', 'company', 'name', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.signatures.company.title}
                  onChange={(e) => handleNestedInputChange('signatures', 'company', 'title', e.target.value)}
                  placeholder="Enter title"
                />
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="h-20 border-b border-dashed border-gray-400 flex items-center justify-center text-gray-400">
                  Signature Area
                </div>
              </div>
            </div>
          </div>

          {/* Client Signature */}
          <div className="p-4 border rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2 flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              For {formData.client.name || "Client"}
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.signatures.client.name}
                  onChange={(e) => handleNestedInputChange('signatures', 'client', 'name', e.target.value)}
                  placeholder="Enter name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={formData.signatures.client.title}
                  onChange={(e) => handleNestedInputChange('signatures', 'client', 'title', e.target.value)}
                  placeholder="Enter title"
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
          Document ID: YY-MM-ABCD | NON-DISCLOSURE AGREEMENT | CONFIDENTIAL
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Generate NDA Document
          </button>
        </div>
      </form>
    </div>
  );
};

export default NDAForm;