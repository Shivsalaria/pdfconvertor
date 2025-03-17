
import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';



const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [validationResult, setValidationResult] = useState({ isValid: true, message: '' });
  const [showTooltip, setShowTooltip] = useState(false);
  const [strengthScore, setStrengthScore] = useState(0);

  useEffect(() => {
    const strengthChart = echarts.init(document.getElementById('strengthChart'));
    const option = {
      series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 4,
        animation: false,
        itemStyle: {
          color: getStrengthColor(strengthScore)
        },
        progress: {
          show: true,
          width: 12
        },
        pointer: {
          show: false
        },
        axisLine: {
          lineStyle: {
            width: 12,
            color: [[1, '#e5e7eb']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        title: {
          show: false
        },
        detail: {
          show: false
        },
        data: [{
          value: strengthScore
        }]
      }]
    };
    strengthChart.setOption(option);

    return () => {
      strengthChart.dispose();
    };
  }, [strengthScore]);

  const validateInput = (value) => {
    if (!value) {
      return { isValid: false, message: 'This field is required' };
    }
    if (value.length < 8) {
      return { isValid: false, message: 'Must be at least 8 characters' };
    }
    if (!/[A-Z]/.test(value)) {
      return { isValid: false, message: 'Must contain uppercase letter' };
    }
    if (!/[a-z]/.test(value)) {
      return { isValid: false, message: 'Must contain lowercase letter' };
    }
    if (!/[0-9]/.test(value)) {
      return { isValid: false, message: 'Must contain number' };
    }
    if (!/[!@#$%^&*]/.test(value)) {
      return { isValid: false, message: 'Must contain special character' };
    }
    return { isValid: true, message: 'Password is strong' };
  };

  const calculateStrength = (value) => {
    let score = 0;
    if (value.length >= 8) score += 20;
    if (/[A-Z]/.test(value)) score += 20;
    if (/[a-z]/.test(value)) score += 20;
    if (/[0-9]/.test(value)) score += 20;
    if (/[!@#$%^&*]/.test(value)) score += 20;
    return score;
  };

  const getStrengthColor = (score) => {
    if (score < 40) return '#ef4444';
    if (score < 70) return '#f59e0b';
    return '#22c55e';
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setValidationResult(validateInput(value));
    setStrengthScore(calculateStrength(value));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Password</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  className={`w-full px-4 py-3 border ${validationResult.isValid ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900`}
                  value={inputValue}
                  onChange={handleInputChange}
                  onFocus={() => setShowTooltip(true)}
                  onBlur={() => setShowTooltip(false)}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="!rounded-button absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {!validationResult.isValid && (
                <p className="mt-2 text-sm text-red-600">
                  <i className="fas fa-exclamation-circle mr-1"></i>
                  {validationResult.message}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Password Strength</span>
                <span className="text-sm font-medium" style={{ color: getStrengthColor(strengthScore) }}>
                  {strengthScore < 40 ? 'Weak' : strengthScore < 70 ? 'Medium' : 'Strong'}
                </span>
              </div>
              <div id="strengthChart" style={{ height: '60px' }}></div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Password Requirements</h3>
              <ul className="space-y-2">
                {[
                  { text: 'At least 8 characters', check: inputValue.length >= 8 },
                  { text: 'One uppercase letter', check: /[A-Z]/.test(inputValue) },
                  { text: 'One lowercase letter', check: /[a-z]/.test(inputValue) },
                  { text: 'One number', check: /[0-9]/.test(inputValue) },
                  { text: 'One special character', check: /[!@#$%^&*]/.test(inputValue) }
                ].map((requirement, index) => (
                  <li key={index} className="flex items-center text-sm">
                    <i className={`fas fa-${requirement.check ? 'check text-green-500' : 'times text-gray-400'} w-5`}></i>
                    <span className={requirement.check ? 'text-gray-900' : 'text-gray-500'}>
                      {requirement.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              className={`!rounded-button w-full py-3 px-4 text-white font-medium ${
                validationResult.isValid
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
              disabled={!validationResult.isValid}
            >
              Create Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

