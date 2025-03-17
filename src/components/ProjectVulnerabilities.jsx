import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import ReportVulnerabilityModal from './modals/ReportVulnerabilityModal';
import DeleteVulnerabilityModal from './modals/DeleteVulnerabilityModal';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const App = () => {
    const navigate = useNavigate();
    const { projectName } = useParams();
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSeverity, setSelectedSeverity] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [dateRange, setDateRange] = useState('all');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    // const [showReportModal, setShowReportModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [vulnerabilityToDelete, setVulnerabilityToDelete] = useState(null);
    const [formData, setFormData] = useState({
        projectName: 'hello',
        severity: '',
        visibility: 'private',
    });

    const staticVulnerabilities = [
        {
            id: 1,
            projectName: "Secure Thread",
            title: "SQL Injection in Login Form",
            description: "Critical SQL injection vulnerability found in authentication module",
            severity: "critical",
            cvssScore: "9.8",
            visibility: "private",
            status: "open",
            category: "Application"
        },
        {
            id: 2,
            projectName: "Secure Thread",
            title: "Weak Encryption",
            description: "Outdated encryption algorithm being used for data storage",
            severity: "high",
            cvssScore: "8.5",
            visibility: "private",
            status: "in-progress",
            category: "Infrastructure"
        },
        {
            id: 3,
            projectName: "Vulnerability Management",
            title: "Cross-Site Scripting (XSS)",
            description: "Stored XSS vulnerability in user profile section",
            severity: "medium",
            cvssScore: "6.5",
            visibility: "public",
            status: "open",
            category: "Application"
        },
        {
            id: 4,
            projectName: "Vulnerability Management",
            title: "Insecure File Upload",
            description: "File upload functionality allows dangerous file types",
            severity: "high",
            cvssScore: "7.2",
            visibility: "private",
            status: "in-progress",
            category: "Application"
        },
        {
            id: 5,
            projectName: "hello",
            title: "Authentication Bypass",
            description: "Critical authentication bypass in admin panel",
            severity: "critical",
            cvssScore: "9.5",
            visibility: "private",
            status: "open",
            category: "Application"
        },
        {
            id: 6,
            projectName: "hello",
            title: "Outdated Dependencies",
            description: "Multiple outdated npm packages with known vulnerabilities",
            severity: "medium",
            cvssScore: "5.5",
            visibility: "private",
            status: "resolved",
            category: "Infrastructure"
        }, {
            id: 6,
            projectName: "Vulnerabilty Management",
            title: "Outdated Dependencies",
            description: "Multiple outdated npm packages with known vulnerabilities",
            severity: "medium",
            cvssScore: "5.5",
            visibility: "private",
            status: "resolved",
            category: "Infrastructure"
        }
    ];

    const projectVulnerabilities = staticVulnerabilities.filter(vuln =>
        vuln.projectName === projectName &&
        (selectedSeverity === 'all' || vuln.severity === selectedSeverity) &&
        (vuln.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vuln.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleDelete = async (id) => {
        setVulnerabilityToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        toast.success('Vulnerability deleted successfully');
        setDeleteModalOpen(false);
        setVulnerabilityToDelete(null);
    };

    const handleEdit = (vulnerability) => {
        navigate('/detail', { 
            state: { 
                isEditMode: true,
                vulnerabilityData: vulnerability
            }
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-full mx-auto">
                <header className="bg-white dark:bg-gray-800 shadow rounded-sm max-w-full mx-auto px-4">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vulnerabilities for {projectName}</h1>
                            </div>
                            <div className="flex space-x-4">
                                <Link to="/detail">
                                    <button className="!rounded-button rounded-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                                        <i className="fas fa-plus mr-2"></i>Report New Vulnerability
                                    </button>
                                </Link>
                                <button className="!rounded-button px-4 py-2 bg-white dark:bg-gray-700 rounded-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <i className="fas fa-download mr-2"></i>Export
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="max-w-full mx-auto py-3">
                    {/* Statistics Cards */}
                    <div className="grid grid-cols-4 gap-6 mb-4">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                                    <i className="fas fa-exclamation-triangle text-red-600 dark:text-red-400 text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Critical</h3>
                                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                                        {staticVulnerabilities.filter(v => v.severity === 'critical').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                                    <i className="fas fa-exclamation-circle text-orange-500 dark:text-orange-400 text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">High</h3>
                                    <p className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                                        {staticVulnerabilities.filter(v => v.severity === 'high').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
                                    <i className="fas fa-exclamation text-yellow-500 dark:text-yellow-400 text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Medium</h3>
                                    <p className="text-3xl font-bold text-yellow-500 dark:text-yellow-400">
                                        {staticVulnerabilities.filter(v => v.severity === 'medium').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                    <i className="fas fa-info-circle text-green-500 dark:text-green-400 text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Low</h3>
                                    <p className="text-3xl font-bold text-green-500 dark:text-green-400">
                                        {staticVulnerabilities.filter(v => v.severity === 'low').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Filters */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search vulnerabilities..."
                                        className="w-96 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <i className="fas fa-search absolute right-3 top-3 text-gray-400 dark:text-gray-500"></i>
                                </div>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedStatus('all');
                                        setSelectedSeverity('all');
                                        setSelectedCategory('all');
                                        setDateRange('all');
                                    }}
                                    className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <i className="fas fa-times mr-2"></i>
                                    Clear Filters
                                </button>
                            </div>
                            <div className="relative">
                                <button
                                    className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                >
                                    Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                                        <div className="py-1">
                                            {['all', 'open', 'in-progress', 'resolved', 'closed'].map((status) => (
                                                <button
                                                    key={status}
                                                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    onClick={() => {
                                                        setSelectedStatus(status);
                                                        setShowStatusDropdown(false);
                                                    }}
                                                >
                                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    onClick={() => setShowSeverityDropdown(!showSeverityDropdown)}
                                >
                                    Severity: {selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                                {showSeverityDropdown && (
                                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                                        <div className="py-1">
                                            {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
                                                <button
                                                    key={severity}
                                                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    onClick={() => {
                                                        setSelectedSeverity(severity);
                                                        setShowSeverityDropdown(false);
                                                    }}
                                                >
                                                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                                >
                                    Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                                {showCategoryDropdown && (
                                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                                        <div className="py-1">
                                            {['all', 'Network', 'Application', 'Infrastructure', 'Data'].map((category) => (
                                                <button
                                                    key={category}
                                                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    onClick={() => {
                                                        setSelectedCategory(category);
                                                        setShowCategoryDropdown(false);
                                                    }}
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="relative">
                                <button
                                    className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    onClick={() => setShowDateDropdown(!showDateDropdown)}
                                >
                                    Date Range: {dateRange.charAt(0).toUpperCase() + dateRange.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                                {showDateDropdown && (
                                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                                        <div className="py-1">
                                            {['all', 'today', 'this week', 'this month', 'this year'].map((range) => (
                                                <button
                                                    key={range}
                                                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                    onClick={() => {
                                                        setDateRange(range);
                                                        setShowDateDropdown(false);
                                                    }}
                                                >
                                                    {range.charAt(0).toUpperCase() + range.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Vulnerability Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-8">
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Total Projects and vulnerablities</h2>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vulnerability</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Risk Level</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Visibility</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {projectVulnerabilities.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                No vulnerabilities found for project {projectName}. Try adding a new vulnerability.
                                            </td>
                                        </tr>
                                    ) : (
                                        projectVulnerabilities.map((vuln) => (
                                            <tr key={vuln.id || vuln._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{vuln.projectName}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">{vuln.title || vuln.name || vuln.vulnerabilityName}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{vuln.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vuln.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                                                            vuln.severity === 'high' ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400' :
                                                                vuln.severity === 'medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                                    'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                        }`}>
                                                        {vuln.severity?.charAt(0).toUpperCase() + vuln.severity?.slice(1)}
                                                    </span>
                                                    <div className="text-sm mt-1 text-gray-500 dark:text-gray-400">CVSS: {vuln.cvssScore}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vuln.visibility === 'private' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                                                            'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                        }`}>
                                                        {vuln.visibility?.charAt(0).toUpperCase() + vuln.visibility?.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vuln.status === 'open' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                                                            vuln.status === 'in-progress' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' :
                                                                vuln.status === 'resolved' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                                    'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400'
                                                        }`}>
                                                        {vuln.status?.charAt(0).toUpperCase() + vuln.status?.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-start justify-start">
                                                        <button
                                                            onClick={() => handleEdit(vuln)}
                                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900"
                                                            title="Edit Vulnerability"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(vuln.id || vuln._id)}
                                                            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30"
                                                            title="Delete Vulnerability"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                {/* <ReportVulnerabilityModal
                    isOpen={showReportModal}
                    onClose={() => setShowReportModal(false)}
                    selectedProject={formData.projectName}
                /> */}
                <DeleteVulnerabilityModal
                    isOpen={deleteModalOpen}
                    onClose={() => setDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            </div>
        </div>
    );
};

export default App;
