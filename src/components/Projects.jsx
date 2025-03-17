import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, createProject, updateProject, deleteProjects } from '../redux/actions/projectActions';
import { Toaster } from 'react-hot-toast';
import CreateProjectModal from './modals/CreateProjectModal';
import DeleteProjectModal from './modals/DeleteProjectModal';
import ProjectTable from './projects/ProjectTable';
import Pagination from './projects/Pagination';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector((state) => state.projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ show: false, project: null });
  const [newProject, setNewProject] = useState({
    PROJECT_NAME: '',
    STATUS: '',
    TEAM: [],
    VISIBILITY: '',
    LAST_UPDATED: new Date().toISOString().split('T')[0]
  });
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortDirection, setSortDirection] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMember, setTeamMember] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  // Filter projects based on search term
  const filteredProjects = projects?.filter(project =>
    project.PROJECT_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.STATUS.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.TEAM.some(member => member.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setNewProject({
      PROJECT_NAME: project.PROJECT_NAME,
      STATUS: project.STATUS,
      TEAM: project.TEAM,
      VISIBILITY: project.VISIBILITY,
      LAST_UPDATED: project.LAST_UPDATED
    });
    setIsModalOpen(true);
  };

  const handleDeleteClick = (project) => {
    setDeleteConfirmation({ show: true, project });
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmation.project) {
      dispatch(deleteProjects(deleteConfirmation.project.id));
    }
    setDeleteConfirmation({ show: false, project: null });
  };

  const handleBulkDelete = () => {
    if (selectedProjects.length > 0) {
      dispatch(deleteProjects(selectedProjects));
      setSelectedProjects([]);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingProject(null);
    setNewProject({
      PROJECT_NAME: '',
      STATUS: '',
      TEAM: [],
      VISIBILITY: '',
      LAST_UPDATED: new Date().toISOString().split('T')[0]
    });
  };

  const handleCreateOrUpdate = (e) => {
    e.preventDefault();
    if (editingProject) {
      dispatch(updateProject({
        projectId: editingProject.id,
        projectData: newProject
      }));
    } else {
      dispatch(createProject(newProject));
    }
    handleModalClose();
  };

  const toggleProjectSelection = (projectId) => {
    if (selectedProjects.includes(projectId)) {
      setSelectedProjects(selectedProjects.filter((id) => id !== projectId));
    } else {
      setSelectedProjects([...selectedProjects, projectId]);
    }
  };

  const toggleAllProjects = () => {
    if (selectedProjects.length === projects.length) {
      setSelectedProjects([]);
    } else {
      setSelectedProjects(projects.map((project) => project.id));
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Blocked":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-0">
      <div className="max-w-full mx-auto px-4 sm:px-0 lg:px-0">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <Toaster position="top-right" />

          {/* Header Section */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Project Management</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="!rounded-button bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition-colors whitespace-nowrap"
              >
                <i className="fas fa-plus mr-2"></i>New Project
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500"></i>
              </div>
              <button className="!rounded-button px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 whitespace-nowrap">
                <i className="fas fa-filter mr-2"></i>Filters
              </button>
              <button className="!rounded-button px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 whitespace-nowrap">
                <i className="fas fa-download mr-2"></i>Export
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProjects.length > 0 && (
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-300">{selectedProjects.length} selected</span>
                <button
                  onClick={handleBulkDelete}
                  className="!rounded-button text-sm px-3 py-1 bg-red-600 text-white hover:bg-red-700 whitespace-nowrap"
                >
                  <i className="fas fa-trash-alt mr-2"></i>Delete
                </button>
                <button className="!rounded-button text-sm px-3 py-1 bg-gray-600 text-white hover:bg-gray-700 whitespace-nowrap">
                  <i className="fas fa-archive mr-2"></i>Archive
                </button>
                <button className="!rounded-button text-sm px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 whitespace-nowrap">
                  <i className="fas fa-users mr-2"></i>Assign Team
                </button>
              </div>
            </div>
          )}

          {/* Projects Table */}
          {loading ? (
            <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>
          ) : error ? (
            <div className="p-6 text-center text-red-500 dark:text-red-400">{error}</div>
          ) : (
            <ProjectTable
              projects={currentProjects}
              selectedProjects={selectedProjects}
              toggleProjectSelection={toggleProjectSelection}
              toggleAllProjects={toggleAllProjects}
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              handleSort={handleSort}
              getStatusColor={getStatusColor}
            />
          )}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
            startIndex={startIndex}
            endIndex={endIndex}
            totalResults={filteredProjects.length}
          />
        </div>
      </div>

      {/* Modals */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        newProject={newProject}
        setNewProject={setNewProject}
        handleCreateOrUpdate={handleCreateOrUpdate}
        editingProject={editingProject}
        teamMember={teamMember}
        setTeamMember={setTeamMember}
      />

      <DeleteProjectModal
        isOpen={deleteConfirmation.show}
        onClose={() => setDeleteConfirmation({ show: false, project: null })}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default Projects;