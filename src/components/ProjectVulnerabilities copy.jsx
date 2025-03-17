import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVulnerabilities, deleteVulnerability } from '../redux/actions/vulnerabilityActions';
import ReportVulnerabilityModal from './modals/ReportVulnerabilityModal';
import DeleteVulnerabilityModal from './modals/DeleteVulnerabilityModal';
import toast from 'react-hot-toast';

const App = () => {
    const { projectName } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { vulnerabilities, loading, error } = useSelector((state) => state.vulnerabilities);
    const { selectedProject } = useSelector((state) => state.projects);
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedSeverity, setSelectedSeverity] = useState('all');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [showSeverityDropdown, setShowSeverityDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
    const [dateRange, setDateRange] = useState('all');
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [vulnerabilityToDelete, setVulnerabilityToDelete] = useState(null);
    const [formData, setFormData] = useState({
        projectName: 'hello',
        severity: '',
        visibility: 'private',
        // ... other fields
    });
    const severityColors = {
        critical: 'bg-red-600',
        high: 'bg-orange-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500',
    };
    const statusColors = {
        open: 'bg-red-100 text-red-800',
        'in-progress': 'bg-blue-100 text-blue-800',
        resolved: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800',
    };

    useEffect(() => {
        const loadVulnerabilities = async () => {
            try {
                console.log('Fetching vulnerabilities...');
                const resultAction = await dispatch(fetchVulnerabilities());
                console.log('Redux Action Result:', resultAction);
                console.log('Redux Action Payload:', resultAction.payload);
                console.log('Current Redux State:', {
                    vulnerabilities: vulnerabilities,
                    loading: loading,
                    error: error
                });
            } catch (error) {
                console.error('Error fetching vulnerabilities:', error);
                toast.error('Failed to fetch vulnerabilities. Please try again later.');
            }
        };

        loadVulnerabilities();
    }, [dispatch]);

    const projectVulnerabilities = vulnerabilities.filter(vuln =>
        vuln.projectName === projectName &&
        (selectedSeverity === 'all' || vuln.severity === selectedSeverity) &&
        (vuln.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vuln.description?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const refreshVulnerabilities = async () => {
        try {
            await dispatch(fetchVulnerabilities());
            console.log('Vulnerabilities refreshed after adding new one');
        } catch (error) {
            console.error('Error refreshing vulnerabilities:', error);
        }
    };

    const handleDelete = async (id) => {
        setVulnerabilityToDelete(id);
        setDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await dispatch(deleteVulnerability(vulnerabilityToDelete)).unwrap();
            toast.success('Vulnerability deleted successfully');
            setDeleteModalOpen(false);
            setVulnerabilityToDelete(null);
            refreshVulnerabilities();
        } catch (error) {
            toast.error('Failed to delete vulnerability');
        }
    };

    const filteredVulnerabilities = vulnerabilities.filter(vuln => {
        const matchesSearch = vuln.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            vuln.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || vuln.status === selectedStatus;
        const matchesSeverity = selectedSeverity === 'all' || vuln.severity === selectedSeverity;
        const matchesCategory = selectedCategory === 'all' || vuln.category === selectedCategory;

        let matchesDate = true;
        if (vuln.discoveredDate) {
            const vulnDate = new Date(vuln.discoveredDate);
            const today = new Date();
            const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
            const oneMonthAgo = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());

            switch (dateRange) {
                case 'today':
                    matchesDate = vulnDate.toDateString() === today.toDateString();
                    break;
                case 'this week':
                    matchesDate = vulnDate >= oneWeekAgo;
                    break;
                case 'this month':
                    matchesDate = vulnDate >= oneMonthAgo;
                    break;
                case 'this year':
                    matchesDate = vulnDate >= oneYearAgo;
                    break;
                default:
                    matchesDate = true;
            }
        }

        return matchesSearch && matchesStatus && matchesSeverity && matchesCategory && matchesDate;
    });

    return (
        <div className="min-h-screen bg-gray-50">
             <div className="max-w-full mx-auto">
            <header className="bg-white shadow rounded-sm max-w-full mx-auto px-4 ">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900">Vulnerabilities for {projectName}</h1> 
                        </div>
                        <div className="flex space-x-4">
                            <button onClick={() => setShowReportModal(true)} className="!rounded-button rounded-sm px-4 py-2 bg-blue-600 text-white hover:bg-blue-700">
                                <i className="fas fa-plus mr-2"></i>Report New Vulnerability
                            </button>
                            <button className="!rounded-button px-4 py-2 bg-white rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-50">
                                <i className="fas fa-download mr-2"></i>Export
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <main className="max-w-full mx-auto px-4 py-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Critical</h3>
                                <p className="text-3xl font-bold text-red-600">
                                    {vulnerabilities.filter(v => v.severity === 'critical').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                                <i className="fas fa-exclamation-circle text-orange-500 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">High</h3>
                                <p className="text-3xl font-bold text-orange-500">
                                    {vulnerabilities.filter(v => v.severity === 'high').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                                <i className="fas fa-exclamation text-yellow-500 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Medium</h3>
                                <p className="text-3xl font-bold text-yellow-500">
                                    {vulnerabilities.filter(v => v.severity === 'medium').length}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                <i className="fas fa-info-circle text-green-500 text-xl"></i>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold text-gray-900">Low</h3>
                                <p className="text-3xl font-bold text-green-500">
                                    {vulnerabilities.filter(v => v.severity === 'low').length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6 mb-8">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search vulnerabilities..."
                                    className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
                            </div>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedStatus('all');
                                    setSelectedSeverity('all');
                                    setSelectedCategory('all');
                                    setDateRange('all');
                                }}
                                className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                                <i className="fas fa-times mr-2"></i>
                                Clear Filters
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                            >
                                Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                            </button>
                            {showStatusDropdown && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                    <div className="py-1">
                                        {['all', 'open', 'in-progress', 'resolved', 'closed'].map((status) => (
                                            <button
                                                key={status}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
                                className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowSeverityDropdown(!showSeverityDropdown)}
                            >
                                Severity: {selectedSeverity.charAt(0).toUpperCase() + selectedSeverity.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                            </button>
                            {showSeverityDropdown && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                    <div className="py-1">
                                        {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
                                            <button
                                                key={severity}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
                                className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                            >
                                Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                    <div className="py-1">
                                        {['all', 'Network', 'Application', 'Infrastructure', 'Data'].map((category) => (
                                            <button
                                                key={category}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
                                className="!rounded-button whitespace-nowrap px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                                onClick={() => setShowDateDropdown(!showDateDropdown)}
                            >
                                Date Range: {dateRange.charAt(0).toUpperCase() + dateRange.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                            </button>
                            {showDateDropdown && (
                                <div className="absolute z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                    <div className="py-1">
                                        {['all', 'today', 'this week', 'this month', 'this year'].map((range) => (
                                            <button
                                                key={range}
                                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
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
                <div className="bg-white rounded-lg shadow mb-8">
                    <div className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Total Projects and vulnerablities</h2>
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            </div>
                        ) : error ? (
                            <div className="text-red-500 text-center py-4">{error}</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerability</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th> */}
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visibility</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {vulnerabilities.length === 0 ? (
                                        <tr>
                                            <td colSpan="9" className="px-6 py-4 text-center text-gray-500">
                                                No vulnerabilities found. Try adjusting your filters or add a new vulnerability.
                                            </td>
                                        </tr>
                                    ) : (
                                        vulnerabilities.map((vuln) => (
                                            <tr key={vuln.id || vuln._id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{projectName || 'No Project Selected'}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{vuln.title || vuln.name || vuln.vulnerabilityName}</div>
                                                    <div className="text-sm text-gray-500">{vuln.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vuln.severity === 'critical' ? 'bg-red-100 text-red-800' :
                                                            vuln.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                                                                vuln.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                                                    'bg-green-100 text-green-800'
                                                        }`}>
                                                        {vuln.severity?.charAt(0).toUpperCase() + vuln.severity?.slice(1)}
                                                    </span>
                                                    <div className="text-sm mt-1 text-gray-500">CVSS: {vuln.cvssScore}</div>
                                                </td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-900">{vuln.category}</div>
                                                    {vuln.affectedComponents && (
                                                        <div className="text-sm text-gray-500"> {vuln.affectedComponents}</div>
                                                    )}
                                                </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vuln.visibility === 'private' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {vuln.visibility?.charAt(0).toUpperCase() + vuln.visibility?.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${vuln.status === 'open' ? 'bg-red-100 text-red-800' :
                                                        vuln.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                                                            vuln.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                                                'bg-gray-100 text-gray-800'
                                                        }`}>
                                                        {vuln.status?.charAt(0).toUpperCase() + vuln.status?.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex items-start justify-start">
                                                        {/* <button
                                                            onClick={() => navigate(`/vulnerability/${vuln.id || vuln._id}`)}
                                                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                                                            title="View Details"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                                            </svg>
                                                        </button> */}
                                                        <button
                                                            onClick={() => handleDelete(vuln.id || vuln._id)}
                                                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
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
                        )}
                    </div>
                </div>
            </main>
            <ReportVulnerabilityModal
                isOpen={showReportModal}
                onClose={() => setShowReportModal(false)}
                selectedProject={formData.projectName}
                onVulnerabilityAdded={refreshVulnerabilities}
            />
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
