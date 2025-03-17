import React, {useState } from 'react';
import FirstTab from './FirstTab';
import LastTab from './LastTab';
import ReportContent from './ReportContent';



const Report = () => {
  const [activeTab, setActiveTab] = useState('content');
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Tabs */}
      <div className="bg-gray-800  shadow-sm mb-6">
        <div className="w-full mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('content')}
              className={`py-4 px-4 focus:outline-none ${activeTab === 'content'
                  ? 'border-b-2 border-blue-500 text-blue-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200'
                }`}
            >
              Report Content
            </button>
            <button
              onClick={() => setActiveTab('first')}
              className={`py-4 px-4 focus:outline-none ${activeTab === 'first'
                  ? 'border-b-2 border-blue-500 text-blue-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200'
                }`}
            >
              Report First Page
            </button>
            <button
              onClick={() => setActiveTab('last')}
              className={`py-4 px-4 focus:outline-none ${activeTab === 'last'
                  ? 'border-b-2 border-blue-500 text-blue-400 font-medium'
                  : 'text-gray-400 hover:text-gray-200'
                }`}
            >
              Report Last Page
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'content' ? (
        <ReportContent />
      ) : activeTab === 'first' ? (
        <FirstTab />
      ) : (
        <LastTab />
      )}
    </div>
  );
};

export default Report;
