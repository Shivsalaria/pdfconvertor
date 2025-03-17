import React, { useState } from 'react';

const LastTab = () => {
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signature, setSignature] = useState('');
  const currentDate = '2025-03-03';

  const backgroundImagePrompt = 'A subtle and professional abstract cybersecurity themed pattern with soft blue gradients and interconnected network lines, perfect for a corporate security report background, modern minimalist style with low opacity for watermark effect';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center  transition-colors duration-200">
      <div className="w-[1440px] min-h-[1024px] bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50 relative transition-colors duration-200">
        {/* Background Watermark */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(https://readdy.ai/api/search-image?query=${backgroundImagePrompt}&width=1440&height=1024&orientation=landscape)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />

        {/* Main Content Container */}
        <div className="relative z-10 px-16 py-12">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <i className="fas fa-shield-alt text-4xl text-blue-700 dark:text-blue-400"></i>
            </div>
            <div className="text-center flex-grow">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 transition-colors duration-200">VAPT Assessment Report</h1>
              <div className="text-red-600 dark:text-red-400 font-semibold tracking-wider">CONFIDENTIAL</div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">Doc Ref: VAPT-2025-0303</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Version: 2.1.0</p>
            </div>
          </div>

          {/* Closing Statement */}
          <div className="mb-12 p-8 bg-gray-50 dark:bg-gray-700 rounded-lg transition-colors duration-200">
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
              This Vulnerability Assessment and Penetration Testing (VAPT) report presents a comprehensive evaluation of the security posture for Quantum Secure Solutions Ltd. The assessment was conducted between February 15, 2025, and March 1, 2025, following industry-standard methodologies and best practices.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed mb-6">
              All identified vulnerabilities have been documented, risk-rated, and accompanied by detailed remediation recommendations. The findings have been validated and cross-verified by our senior security analysts to ensure accuracy and completeness.
            </p>
            <p className="text-gray-700 dark:text-gray-200 leading-relaxed">
              This report marks the conclusion of the current assessment phase. Implementation of the recommended security measures should be prioritized according to the risk ratings provided.
            </p>
          </div>

          {/* Testing Team Information */}
          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-200">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">Assessment Team</h3>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200"><span className="font-medium">Lead Assessor:</span> Dr. Alexander Mitchell</p>
                <p className="text-gray-700 dark:text-gray-200"><span className="font-medium">Technical Lead:</span> Sarah Thompson</p>
                <p className="text-gray-700 dark:text-gray-200"><span className="font-medium">Security Analysts:</span> James Chen, Emily Rodriguez</p>
              </div>
            </div>
            <div className="p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg transition-colors duration-200">
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300 mb-4">Contact Information</h3>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-200"><i className="fas fa-envelope mr-2"></i>security@quantumsecure.com</p>
                <p className="text-gray-700 dark:text-gray-200"><i className="fas fa-phone mr-2"></i>+1 (555) 123-4567</p>
                <p className="text-gray-700 dark:text-gray-200"><i className="fas fa-map-marker-alt mr-2"></i>123 Cyber Street, Tech City, TC 12345</p>
              </div>
            </div>
          </div>

          {/* Signatures Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">Authorized Signatures</h3>
            <div className="grid grid-cols-2 gap-8">
              <div className="border-t-2 border-gray-200 dark:border-gray-600 pt-4">
                <button 
                  className="!rounded-button mb-2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap"
                  onClick={() => setShowSignatureModal(true)}
                >
                  Add Digital Signature
                </button>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lead Assessor: Dr. Alexander Mitchell</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date: {currentDate}</p>
              </div>
              <div className="border-t-2 border-gray-200 dark:border-gray-600 pt-4">
                <div className="h-10 mb-2">{signature && <p className="italic text-blue-600 dark:text-blue-400">{signature}</p>}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Client Representative: Michael Anderson</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Date: {currentDate}</p>
              </div>
            </div>
          </div>

          {/* Certifications */}
          <div className="flex items-center justify-center space-x-8 mb-12">
            <i className="fas fa-certificate text-3xl text-blue-600 dark:text-blue-400"></i>
            <i className="fas fa-award text-3xl text-blue-600 dark:text-blue-400"></i>
            <i className="fas fa-shield-check text-3xl text-blue-600 dark:text-blue-400"></i>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gray-50 dark:bg-gray-700 transition-colors duration-200">
            <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
              <p>© 2025 Quantum Secure Solutions Ltd. All rights reserved.</p>
              <p>Final Page</p>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 transition-colors duration-200">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add Digital Signature</h3>
            <input
              type="text"
              className="w-full p-2 border dark:border-gray-600 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Type your name to sign"
              onChange={(e) => setSignature(e.target.value)}
            />
            <div className="flex justify-end space-x-4">
              <button 
                className="!rounded-button bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors whitespace-nowrap"
                onClick={() => setShowSignatureModal(false)}
              >
                Cancel
              </button>
              <button 
                className="!rounded-button bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors whitespace-nowrap"
                onClick={() => setShowSignatureModal(false)}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LastTab;

