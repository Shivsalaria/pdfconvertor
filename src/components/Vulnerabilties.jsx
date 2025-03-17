import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVulnerabilities, deleteVulnerability } from '../redux/actions/vulnerabilityActions';
import ReportVulnerabilityModal from './modals/ReportVulnerabilityModal';
import DeleteVulnerabilityModal from './modals/DeleteVulnerabilityModal';
import toast from 'react-hot-toast';
import { setSelectedProject } from '../redux/slices/projectSlice';
import { fetchProjects } from '../redux/actions/projectActions';

const App = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { vulnerabilities, loading, error } = useSelector((state) => state.vulnerabilities);
    const { projects, loading: projectLoading, error: projectError } = useSelector((state) => state.projects);
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

    useEffect(() => {
        const loadProjects = async () => {
            try {
                await dispatch(fetchProjects());
            } catch (error) {
                console.error('Error fetching projects:', error);
                toast.error('Failed to fetch projects. Please try again later.');
            }
        };

        loadProjects();
    }, [dispatch]);

    // Function to refresh vulnerabilities list
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

    const handleProjectClick = (projectName) => {
        dispatch(setSelectedProject(vulnerabilities.PROJECT_NAME));
        navigate(`/vulnerabilities/${projectName}`);
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.PROJECT_NAME?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = selectedStatus === 'all' || project.STATUS === selectedStatus;
        return matchesSearch && matchesStatus;
    });

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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-full mx-auto px-4 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Vulnerabilities</h1>
                            <div className="text-gray-500 dark:text-gray-400">
                                <i className="fas fa-chevron-right text-xs mx-2"></i>
                                Projects
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* <h2 className="text-xl font-semibold mb-4">Total Projects and Vulnerabilities</h2> */}

            <main className="max-w-full mx-auto py-2">
                {/* Projects Table */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-2 transition-colors duration-200">
                    <div className="p-4 mb-2">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400 transition-colors duration-200"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <i className="fas fa-search absolute right-3 top-3 text-gray-400 dark:text-gray-500"></i>
                            </div>
                            <button
                                onClick={() => {
                                    setSearchQuery('');
                                    setSelectedStatus('all');
                                }}
                                className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                            >
                                <i className="fas fa-times mr-2"></i>
                                Clear Filters
                            </button>

                            <div className="relative">
                                <button
                                    className="!rounded-button whitespace-nowrap px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
                                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                                >
                                    Status: {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} <i className="fas fa-chevron-down ml-2"></i>
                                </button>
                                {showStatusDropdown && (
                                    <div className="absolute z-10 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600">
                                        <div className="py-1">
                                            {['all', 'Active', 'Pending', 'Blocked', 'Completed'].map((status) => (
                                                <button
                                                    key={status}
                                                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
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
                        </div>
                    </div>
                    <div className="p-6">
                        {projectLoading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400"></div>
                            </div>
                        ) : projectError ? (
                            <div className="text-red-500 dark:text-red-400 text-center py-4">{projectError}</div>
                        ) : (
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Vulnerability Count</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Visibility</th>
                                        <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredProjects.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                                                No projects found. Try adjusting your filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProjects.map((project) => (
                                            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                                                <td
                                                    className="px-6 py-4 whitespace-nowrap cursor-pointer text-gray-900 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400"
                                                    onClick={() => handleProjectClick(project.PROJECT_NAME)}
                                                >
                                                    <div className="text-sm font-medium">{project.PROJECT_NAME}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <div className="text-sm font-medium">
                                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                                                            0
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        project.STATUS === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' :
                                                        project.STATUS === 'Pending' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400' :
                                                        project.STATUS === 'Blocked' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400' :
                                                        'bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-400'
                                                    }`}>
                                                        {project.STATUS}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                        project.VISIBILITY === 'private' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400' : 
                                                        'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400'
                                                    }`}>
                                                        {project.VISIBILITY?.charAt(0).toUpperCase() + project.VISIBILITY?.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-center">
                                                    <button
                                                        onClick={() => handleProjectClick(project.PROJECT_NAME)}
                                                        className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white !rounded-button hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-200 flex items-center space-x-2 mx-auto">
                                                        <i className="fas fa-plus"></i>
                                                        <span>Vulnerability</span>
                                                    </button>
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
    );
};

export default App;
