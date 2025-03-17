import React, { useState, useRef, useEffect } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';

const teamOptions = [
  { value: 'Bharat', label: 'Bharat' },
  { value: 'Suman', label: 'Suman' },
  { value: 'Shiv', label: 'Shiv' },
  { value: 'Harshit', label: 'Harshit' }
];

const programmingLanguagesOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' }
];

const frameworksOptions = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'django', label: 'Django' },
  { value: 'spring', label: 'Spring' },
  { value: 'laravel', label: 'Laravel' }
];

const databaseOptions = [
  { value: 'mysql', label: 'MySQL' },
  { value: 'postgresql', label: 'PostgreSQL' },
  { value: 'mongodb', label: 'MongoDB' },
  { value: 'redis', label: 'Redis' },
  { value: 'elasticsearch', label: 'Elasticsearch' }
];

const cloudServicesOptions = [
  { value: 'aws', label: 'AWS' },
  { value: 'azure', label: 'Azure' },
  { value: 'gcp', label: 'Google Cloud' },
  { value: 'digitalocean', label: 'DigitalOcean' }
];

const versionControlOptions = [
  { value: 'git', label: 'Git' },
  { value: 'svn', label: 'SVN' },
  { value: 'bitbucket', label: 'Bitbucket' }
];

const securityStandardsOptions = [
  { value: 'owasp', label: 'OWASP' },
  { value: 'nist', label: 'NIST' },
  { value: 'iso27001', label: 'ISO 27001' }
];

const complianceOptions = [
  { value: 'gdpr', label: 'GDPR' },
  { value: 'pcidss', label: 'PCI-DSS' },
  { value: 'hipaa', label: 'HIPAA' }
];

const securityToolsOptions = [
  { value: 'sast', label: 'SAST' },
  { value: 'dast', label: 'DAST' },
  { value: 'iast', label: 'IAST' },
  { value: 'dependency', label: 'Dependency Checkers' }
];

const CreateProjectModal = ({ 
  isOpen, 
  onClose, 
  newProject, 
  setNewProject, 
  handleCreateOrUpdate, 
  editingProject,
  teamMember,
  setTeamMember 
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is on a Select component or its menu
      const isSelectClick = event.target.closest('.select__menu') || 
                          event.target.closest('.select__clear-indicator') ||
                          event.target.closest('.select__dropdown-indicator');
      
      if (modalRef.current && !modalRef.current.contains(event.target) && !isSelectClick) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  const selectStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      borderColor: state.isFocused ? '#3B82F6' : '#D1D5DB',
      boxShadow: state.isFocused ? '0 0 0 1px #3B82F6' : 'none',
      '&:hover': {
        borderColor: state.isFocused ? '#3B82F6' : '#9CA3AF'
      }
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#1F2937' : '#FFFFFF',
      border: '1px solid',
      borderColor: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB'
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused 
        ? document.documentElement.classList.contains('dark') ? '#374151' : '#F3F4F6'
        : state.isSelected 
        ? document.documentElement.classList.contains('dark') ? '#2563EB' : '#3b82f6'
        : 'transparent',
      color: state.isSelected ? 'white' : document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
      '&:hover': {
        backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#F3F4F6',
      }
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: document.documentElement.classList.contains('dark') ? '#374151' : '#E5E7EB',
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: document.documentElement.classList.contains('dark') ? '#D1D5DB' : '#4B5563',
      '&:hover': {
        backgroundColor: '#DC2626',
        color: 'white',
      },
    }),
    input: (base) => ({
      ...base,
      color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
    }),
    placeholder: (base) => ({
      ...base,
      color: document.documentElement.classList.contains('dark') ? '#9CA3AF' : '#6B7280',
    }),
    singleValue: (base) => ({
      ...base,
      color: document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999
    }),
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-4xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold dark:text-white">
            {editingProject ? 'Edit Project' : 'Create New Project'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <form onSubmit={handleCreateOrUpdate} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Project/Application Name *
                </label>
                <input
                  type="text"
                  value={newProject.projectName}
                  onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Project Owner/Contact Person *
                </label>
                <input
                  type="text"
                  value={newProject.projectOwner}
                  onChange={(e) => setNewProject({ ...newProject, projectOwner: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Brief Description *
                </label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Business Functionality and Criticality *
                </label>
                <textarea
                  value={newProject.businessFunctionality}
                  onChange={(e) => setNewProject({ ...newProject, businessFunctionality: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="3"
                  required
                />
              </div>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Technical Stack</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Programming Languages
                </label>
                <CreatableSelect
                  isMulti
                  options={programmingLanguagesOptions}
                  value={newProject.programmingLanguages}
                  onChange={(selected) => setNewProject({ ...newProject, programmingLanguages: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  placeholder="Select or type to add..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Frameworks and Libraries
                </label>
                <Select
                  isMulti
                  options={frameworksOptions}
                  value={newProject.frameworks}
                  onChange={(selected) => setNewProject({ ...newProject, frameworks: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Databases and Storage
                </label>
                <Select
                  isMulti
                  options={databaseOptions}
                  value={newProject.databases}
                  onChange={(selected) => setNewProject({ ...newProject, databases: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Cloud Services
                </label>
                <Select
                  isMulti
                  options={cloudServicesOptions}
                  value={newProject.cloudServices}
                  onChange={(selected) => setNewProject({ ...newProject, cloudServices: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Number of Files/Endpoints
                </label>
                <input
                  type="number"
                  value={newProject.numberOfEndpoints}
                  onChange={(e) => setNewProject({ ...newProject, numberOfEndpoints: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Version Control System
                </label>
                <Select
                  options={versionControlOptions}
                  value={newProject.versionControl}
                  onChange={(selected) => setNewProject({ ...newProject, versionControl: selected })}
                  styles={selectStyles}
                  className="basic-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>

          {/* Security Requirements */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Security Requirements</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Codebase Scope
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="full"
                      checked={newProject.codebaseScope === 'full'}
                      onChange={(e) => setNewProject({ ...newProject, codebaseScope: e.target.value })}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">Full Application</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="specific"
                      checked={newProject.codebaseScope === 'specific'}
                      onChange={(e) => setNewProject({ ...newProject, codebaseScope: e.target.value })}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">Specific Modules</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Critical Components to Review
                </label>
                <textarea
                  value={newProject.criticalComponents}
                  onChange={(e) => setNewProject({ ...newProject, criticalComponents: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="3"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Security Aspects to Review
                </label>
                {[
                  'Authentication and Authorization',
                  'Input Validation and Sanitization',
                  'Secure Data Storage and Transmission',
                  'Session Management',
                  'API Security',
                  'Third-Party Dependencies',
                  'Cryptography Usage',
                  'Error Handling and Logging'
                ].map((aspect) => (
                  <label key={aspect} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newProject.securityAspects?.includes(aspect)}
                      onChange={(e) => {
                        const aspects = newProject.securityAspects || [];
                        if (e.target.checked) {
                          setNewProject({ ...newProject, securityAspects: [...aspects, aspect] });
                        } else {
                          setNewProject({
                            ...newProject,
                            securityAspects: aspects.filter(a => a !== aspect)
                          });
                        }
                      }}
                      className="form-checkbox rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">{aspect}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Expected Deliverables
                </label>
                <textarea
                  value={newProject.expectedDeliverables}
                  onChange={(e) => setNewProject({ ...newProject, expectedDeliverables: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Security Standards to Follow
                </label>
                <Select
                  isMulti
                  options={securityStandardsOptions}
                  value={newProject.securityStandards}
                  onChange={(selected) => setNewProject({ ...newProject, securityStandards: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </div>
          </div>

          {/* Compliance and Tools */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Compliance and Tools</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-gray-200 mb-1">
                  Compliance Requirements
                </label>
                <Select
                  isMulti
                  options={complianceOptions}
                  value={newProject.complianceRequirements}
                  onChange={(selected) => setNewProject({ ...newProject, complianceRequirements: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Known Security Concerns
                </label>
                <textarea
                  value={newProject.securityConcerns}
                  onChange={(e) => setNewProject({ ...newProject, securityConcerns: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Security Tools in Use
                </label>
                <Select
                  isMulti
                  options={securityToolsOptions}
                  value={newProject.securityTools}
                  onChange={(selected) => setNewProject({ ...newProject, securityTools: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Additional Requirements
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newProject.automatedTools}
                    onChange={(e) => setNewProject({ ...newProject, automatedTools: e.target.checked })}
                    className="form-checkbox rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    Combine automated tools with manual review
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newProject.penetrationTesting}
                    onChange={(e) => setNewProject({ ...newProject, penetrationTesting: e.target.checked })}
                    className="form-checkbox text-blue-600"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-200">
                    Conduct penetration testing after code review
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Access and Timeline */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-white">Access and Timeline</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Source Code Access
                </label>
                <select
                  value={newProject.sourceCodeAccess}
                  onChange={(e) => setNewProject({ ...newProject, sourceCodeAccess: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                >
                  <option value="readonly">Read-only</option>
                  <option value="full">Full Repository Access</option>
                  <option value="limited">Limited Access</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Review Location
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="onsite"
                      checked={newProject.reviewLocation === 'onsite'}
                      onChange={(e) => setNewProject({ ...newProject, reviewLocation: e.target.value })}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">Onsite</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      value="remote"
                      checked={newProject.reviewLocation === 'remote'}
                      onChange={(e) => setNewProject({ ...newProject, reviewLocation: e.target.value })}
                      className="form-radio text-blue-600"
                    />
                    <span className="ml-2 text-gray-700 dark:text-gray-200">Remote Access</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Data Transfer Restrictions
                </label>
                <textarea
                  value={newProject.dataRestrictions}
                  onChange={(e) => setNewProject({ ...newProject, dataRestrictions: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Key Stakeholders
                </label>
                <Select
                  isMulti
                  options={teamOptions}
                  value={newProject.keyStakeholders}
                  onChange={(selected) => setNewProject({ ...newProject, keyStakeholders: selected })}
                  styles={selectStyles}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Expected Timeline and Milestones
                </label>
                <textarea
                  value={newProject.timeline}
                  onChange={(e) => setNewProject({ ...newProject, timeline: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:text-white"
                  rows="3"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingProject ? 'Update Project' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal; 