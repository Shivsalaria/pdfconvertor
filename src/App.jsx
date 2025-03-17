import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Vulnerabilities from './components/Vulnerabilties';
import Collaboration from './components/Collaboration';
import Projects from './components/Projects';
import Repo from './components/Repo';
import VulnerabilityReport from './components/VulnerabilityReport';
import Detail from './components/Detail';
import Report from './components/Report';
import Dashboard from './components/Dashboard';
import ReportVulnerability from './components/ReportVulnerability';
import ProjectVulnerabilities from './components/ProjectVulnerabilities';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import PenTestForm from './components/PenTestForm';
import InitialClientWorksheet from './components/InitialClientWorksheet';
import Nda from './components/NDAForm';
import DataUseAgreementForm from './components/DataUseAgreementForm';
import RuleEngagement from './components/RuleEngagement';
import Previewecworksheet from './components/Previewecworksheet';
import PreviewWorksheet from './components/PreviewWorksheet';

import { testConnection } from './services/api';


function App() {
    const [connectionStatus, setConnectionStatus] = useState('Checking...')

    useEffect(() => {
        testConnection()
            .then(response => {
                setConnectionStatus(response.message)
            })
            .catch(error => {
                setConnectionStatus('Error connecting to backend')
                console.error('Backend connection error:', error)
            })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Protected Routes */}
                <Route path="/" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="vulnerabilities" element={<Vulnerabilities />} />
                    <Route path="vulnerabilities/:projectName" element={<ProjectVulnerabilities />} />
                    <Route path="collaboration" element={<Collaboration />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projects/:projectName" element={<ProjectVulnerabilities />} />
                    <Route path="repo" element={<Repo />} />
                    <Route path="vulnerability-report" element={<VulnerabilityReport />} />
                    <Route path="detail" element={<Detail />} />
                    <Route path="report" element={<Report />} />
                    <Route path="vulnerability-management" element={<PenTestForm />} />
                    <Route path="ecworksheet" element={<InitialClientWorksheet />} />
                    <Route path="preview-worksheet" element={<PreviewWorksheet />} />
                    <Route path="ndafrom" element={<Nda />} />
                    <Route path="datauseagreement" element={<DataUseAgreementForm />} />
                    <Route path="rule-engagement" element={<RuleEngagement />} />
                    <Route path="preview-worksheet" element={<PreviewWorksheet />} />


                </Route>

                <Route path="/report-vulnerability" element={
                    <ProtectedRoute>
                        <ReportVulnerability />
                    </ProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default App


