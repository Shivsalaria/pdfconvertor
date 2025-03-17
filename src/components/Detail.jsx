import React, { useState, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = location.state?.isEditMode || false;
  const editData = location.state?.vulnerabilityData;

  const [cvssScore, setCvssScore] = useState(isEditMode ? parseFloat(editData?.cvssScore) || 7.5 : 7.5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: isEditMode ? editData?.title || '' : '',
    reportId: isEditMode ? editData?.reportId || '' : '',
    reporterName: isEditMode ? editData?.reporterName || [] : [],
    summary: isEditMode ? editData?.summary || '' : '',
    affectedComponents: isEditMode ? editData?.affectedComponents || '' : '',
    vulnerabilityName: isEditMode ? editData?.vulnerabilityName || editData?.title || '' : '',
    visibility: isEditMode ? editData?.visibility || 'private' : 'private',
    cweReference: isEditMode ? editData?.cweReference || '' : '',
    pocSteps: isEditMode ? editData?.pocSteps || '' : '',
    exploitCode: isEditMode ? editData?.exploitCode || '' : '',
    impactAnalysis: isEditMode ? editData?.impactAnalysis || '' : '',
    shortTermFix: isEditMode ? editData?.shortTermFix || '' : '',
    longTermFix: isEditMode ? editData?.longTermFix || '' : '',
    conclusion: isEditMode ? editData?.conclusion || '' : '',
    category: isEditMode ? editData?.category || [] : [],
    proofOfConcept: isEditMode ? editData?.proofOfConcept || [] : []
  });

  const reporterOptions = [
    { value: 'Bharat', label: 'Bharat' },
    { value: 'Suman', label: 'Suman' },
    { value: 'Shiv', label: 'Shiv' },
    { value: 'Harshit', label: 'Harshit' }
  ];

  const visibilityOptions = ['private', 'public'];

  const categoryOptions = [
    { value: 'Network Devices', label: 'Network Devices' },
    { value: 'Cloud Services', label: 'Cloud Services' },
    { value: 'Databases', label: 'Databases' },
    { value: 'Web Servers', label: 'Web Servers' },
    { value: 'Mobile Applications', label: 'Mobile Applications' },
    { value: 'Desktop Applications', label: 'Desktop Applications' },
    { value: 'IoT Devices', label: 'IoT Devices' },
    { value: 'Operating Systems', label: 'Operating Systems' },
    { value: 'APIs', label: 'APIs' },
    { value: 'Other', label: 'Other' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReporterChange = (selectedOptions) => {
    setFormData(prev => ({
      ...prev,
      reporterName: selectedOptions ? selectedOptions.map(option => option.value) : []
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      proofOfConcept: [...prev.proofOfConcept, ...files]
    }));
  };

  const removeFile = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      proofOfConcept: prev.proofOfConcept.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Calculate Risk Level based on CVSS Score
  const calculateRiskLevel = (score) => {
    if (score >= 9.0) return 'critical';
    if (score >= 7.0) return 'high';
    if (score >= 4.0) return 'medium';
    return 'low';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vulnerabilityName.trim()) {
      newErrors.vulnerabilityName = 'Vulnerability name is required';
    }
    if (!formData.reporterName || formData.reporterName.length === 0) {
      newErrors.reporterName = 'At least one reporter must be selected';
    }
    if (!formData.affectedComponents.trim()) {
      newErrors.affectedComponents = 'Affected components are required';
    }
    if (!formData.impactAnalysis.trim()) {
      newErrors.impactAnalysis = 'Impact analysis is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    
    if (!isValid) {
      console.log('Form validation failed');
      return;
    }

    setIsSubmitting(true);
    try {
      const vulnerabilityData = {
        ...formData,
        cvssScore: cvssScore,
        riskLevel: calculateRiskLevel(cvssScore),
        status: isEditMode ? editData?.status : 'open',
        discoveredDate: isEditMode ? editData?.discoveredDate : new Date().toISOString(),
        id: isEditMode ? editData?.id : undefined
      };

      console.log('Form Data:', vulnerabilityData);
      // Here you can add your submit logic
      
      // After successful submission, navigate back to project vulnerabilities
      navigate(-1);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: error.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  React.useEffect(() => {
    const chart = echarts.init(document.getElementById('cvssChart'));
    const isDarkMode = document.documentElement.classList.contains('dark');
    const option = {
      series: [{
        type: 'gauge',
        min: 0,
        max: 10,
        splitNumber: 10,
        radius: '100%',
        axisLine: {
          lineStyle: {
            width: 30,
            color: [
              [0.3, isDarkMode ? '#34d399' : '#67e0e3'],
              [0.7, isDarkMode ? '#60a5fa' : '#37a2da'],
              [1, isDarkMode ? '#ef4444' : '#fd666d']
            ]
          }
        },
        pointer: {
          itemStyle: {
            color: 'auto'
          }
        },
        axisTick: {
          distance: -30,
          length: 8,
          lineStyle: {
            color: isDarkMode ? '#374151' : '#fff',
            width: 2
          }
        },
        splitLine: {
          distance: -30,
          length: 30,
          lineStyle: {
            color: isDarkMode ? '#374151' : '#fff',
            width: 4
          }
        },
        axisLabel: {
          color: isDarkMode ? '#e5e7eb' : 'inherit',
          distance: 40,
          fontSize: 12
        },
        detail: {
          valueAnimation: true,
          formatter: '{value}',
          color: isDarkMode ? '#e5e7eb' : 'inherit'
        },
        data: [{
          value: cvssScore
        }]
      }],
      animation: false
    };
    
    chart.setOption(option);
    
    return () => {
      chart.dispose();
    };
  }, [cvssScore]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full mx-auto px-0">
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isEditMode ? 'Edit Vulnerability Report' : 'New Vulnerability Report'}
            </h1>
          </div>
          
          {/* Details Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Basic Details</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Vulnerability Name
                </label>
                <input
                  type="text"
                  name="vulnerabilityName"
                  value={formData.vulnerabilityName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${errors.vulnerabilityName ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                  placeholder="Enter vulnerability name"
                  required
                />
                {errors.vulnerabilityName && <p className="text-red-500 text-sm mt-1">{errors.vulnerabilityName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Report ID
                </label>
                <input
                  type="text"
                  name="reportId"
                  value={formData.reportId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="Enter report ID"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reporter Name
                </label>
                <Select
                  name="reporterName"
                  value={reporterOptions.filter(option => formData.reporterName.includes(option.value))}
                  onChange={handleReporterChange}
                  options={reporterOptions}
                  className="basic-select"
                  classNamePrefix="select"
                  placeholder="Select Reporters"
                  isMulti
                  isSearchable
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      backgroundColor: 'transparent',
                      borderColor: errors.reporterName ? '#EF4444' : state.isFocused ? '#3B82F6' : '#D1D5DB',
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
                        ? '#3b82f6'
                        : 'transparent',
                      color: state.isSelected ? 'white' : document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
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
                  }}
                />
                {errors.reporterName && <p className="text-red-500 text-sm mt-1">{errors.reporterName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Visibility
                </label>
                <select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  required
                >
                  {visibilityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVSS Score
                </label>
                <div className="grid grid-cols-2 gap-6">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={cvssScore}
                    onChange={(e) => setCvssScore(parseFloat(e.target.value))}
                    className="w-full accent-blue-500"
                  />
                  <div id="cvssChart" className="h-48"></div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Risk Level
                </label>
                <input
                  type="text"
                  value={calculateRiskLevel(cvssScore)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  readOnly
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <Select
                name="category"
                value={categoryOptions.filter(option => formData.category.includes(option.value))}
                onChange={(selectedOptions) => {
                  setFormData(prev => ({
                    ...prev,
                    category: selectedOptions ? selectedOptions.map(option => option.value) : []
                  }));
                }}
                options={categoryOptions}
                className="basic-select"
                classNamePrefix="select"
                placeholder="Select or type categories"
                isMulti
                isSearchable
                styles={{
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
                      ? '#3b82f6'
                      : 'transparent',
                    color: state.isSelected ? 'white' : document.documentElement.classList.contains('dark') ? '#F3F4F6' : '#111827',
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
                }}
              />
            </div>
          </div>

          {/* Proof of Concept Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 border-b pb-2 border-gray-200 dark:border-gray-700">Proof of Concept</h2>
            <div className="grid grid-cols-2 gap-6">
              <div
                className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer relative"
                onClick={() => document.getElementById('file-upload').click()}
              >
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                  accept="image/*,.pdf,.doc,.docx"
                />
                <div className="h-24 flex flex-col items-center justify-center space-y-4">
                  <svg className="w-16 h-16 text-gray-400 dark:text-gray-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-center">
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Click anywhere to upload files</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">or drag and drop</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">PNG, JPG, PDF up to 10MB</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">Uploaded Files Preview</h3>
                {formData.proofOfConcept.length > 0 ? (
                  <ul className="space-y-3">
                    {formData.proofOfConcept.map((file, index) => (
                      <li key={index} className="bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <svg className="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{file.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile(index);
                          }}
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 focus:outline-none"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p>No files uploaded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analysis Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Analysis</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Affected Components
              </label>
              <textarea
                name="affectedComponents"
                value={formData.affectedComponents}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border ${errors.affectedComponents ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                placeholder="List affected components"
                required
              ></textarea>
              {errors.affectedComponents && <p className="text-red-500 text-sm mt-1">{errors.affectedComponents}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Impact Analysis
              </label>
              <textarea
                name="impactAnalysis"
                value={formData.impactAnalysis}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-4 py-2 border ${errors.impactAnalysis ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100`}
                placeholder="Describe the impact"
                required
              ></textarea>
              {errors.impactAnalysis && <p className="text-red-500 text-sm mt-1">{errors.impactAnalysis}</p>}
            </div>
          </div>

          {/* Remediation Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Remediation</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Short-term Fix
              </label>
              <textarea
                name="shortTermFix"
                value={formData.shortTermFix}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Describe short-term remediation steps"
                required
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Long-term Fix
              </label>
              <textarea
                name="longTermFix"
                value={formData.longTermFix}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Describe long-term remediation steps"
                required
              ></textarea>
            </div>
          </div>

          {/* Conclusion Section */}
          <div className="space-y-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Conclusion</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Conclusion
              </label>
              <textarea
                name="conclusion"
                value={formData.conclusion}
                onChange={handleInputChange}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                placeholder="Enter conclusion and next steps"
                required
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {isEditMode ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                isEditMode ? 'Update Report' : 'Submit Report'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;

