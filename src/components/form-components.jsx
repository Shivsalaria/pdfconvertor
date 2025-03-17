// File: components/FormSection.jsx
import React from 'react';

const FormSection = ({ title, children }) => {
  return (
    <>
      <h3 className="text-lg font-bold mb-4 bg-gray-100 p-2">{title}</h3>
      {children}
    </>
  );
};

export default FormSection;

// File: components/FormError.jsx
import React from 'react';

const FormError = ({ touched, error }) => {
  if (!touched || !error) return null;
  
  return (
    <div className="text-red-500 text-sm mt-1">{error}</div>
  );
};

export default FormError;

// File: components/RequirementCheckbox.jsx
import React from 'react';

const RequirementCheckbox = ({ id, label, name, checked, onChange, onRemove, removable = false }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        className="mr-2"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={id} className="flex-grow">{label}</label>
      {removable && (
        <button 
          type="button" 
          className="text-red-500 ml-2"
          onClick={onRemove}
          aria-label={`Remove ${label}`}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default RequirementCheckbox;

// File: components/CustomOptionInput.jsx
import React, { useState } from 'react';

const CustomOptionInput = ({ id, placeholder, onAdd }) => {
  const [value, setValue] = useState('');
  
  const handleAdd = () => {
    if (value.trim() !== '') {
      onAdd(value);
      setValue('');
    }
  };
  
  return (
    <div className="mt-4 flex">
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className="border rounded p-2 flex-grow"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
      />
      <button
        type="button"
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAdd}
      >
        Add
      </button>
    </div>
  );
};

export default CustomOptionInput;

// File: components/RequirementsTab.jsx
import React from 'react';

const RequirementsTab = ({ title, children }) => {
  return (
    <div>
      <h4 className="font-bold mb-4">{title}</h4>
      {children}
    </div>
  );
};

export default RequirementsTab;

// File: components/FormProgress.jsx
import React from 'react';

const FormProgress = ({ progress, sections, activeSection, onSectionClick }) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Form Progress</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className="bg-blue-600 h-2.5 rounded-full" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="flex flex-wrap mt-4 gap-2">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={`px-3 py-1 rounded text-sm ${
              activeSection === section.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onSectionClick(section.id)}
          >
            {section.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FormProgress;
