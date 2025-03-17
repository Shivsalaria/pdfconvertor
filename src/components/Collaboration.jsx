// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
const App = () => {
const severityChartRef = useRef<HTMLDivElement>(null);
const vulnerabilityTrendRef = useRef<HTMLDivElement>(null);
useEffect(() => {
if (severityChartRef.current) {
const chart = echarts.init(severityChartRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'item'
},
legend: {
top: '5%',
left: 'center'
},
series: [
{
name: 'Severity Distribution',
type: 'pie',
radius: ['40%', '70%'],
avoidLabelOverlap: false,
itemStyle: {
borderRadius: 10,
borderColor: '#fff',
borderWidth: 2
},
label: {
show: false,
position: 'center'
},
emphasis: {
label: {
show: true,
fontSize: 20,
fontWeight: 'bold'
}
},
labelLine: {
show: false
},
data: [
{ value: 12, name: 'Critical', itemStyle: { color: '#dc2626' } },
{ value: 18, name: 'High', itemStyle: { color: '#ea580c' } },
{ value: 24, name: 'Medium', itemStyle: { color: '#ca8a04' } },
{ value: 32, name: 'Low', itemStyle: { color: '#2563eb' } },
{ value: 14, name: 'Info', itemStyle: { color: '#64748b' } }
]
}
]
};
chart.setOption(option);
}
if (vulnerabilityTrendRef.current) {
const chart = echarts.init(vulnerabilityTrendRef.current);
const option = {
animation: false,
tooltip: {
trigger: 'axis'
},
legend: {
data: ['Vulnerabilities']
},
grid: {
left: '3%',
right: '4%',
bottom: '3%',
containLabel: true
},
xAxis: {
type: 'category',
data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
},
yAxis: {
type: 'value'
},
series: [
{
name: 'Vulnerabilities',
type: 'line',
data: [45, 42, 38, 34, 28, 22],
itemStyle: {
color: '#2563eb'
}
}
]
};
chart.setOption(option);
}
}, []);
return (
<div className="min-h-screen bg-gray-50">
{/* Header */}
<header className="bg-white shadow-sm sticky top-0 z-10">
<div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
<h1 className="text-2xl font-bold text-gray-900">VAPT Security Assessment Report</h1>
<div className="flex items-center space-x-4">
<span className="text-sm text-gray-500">Last Updated: March 3, 2025</span>
<button className="bg-blue-600 text-white px-4 py-2 !rounded-button whitespace-nowrap">
<i className="fas fa-download mr-2"></i>Export Report
</button>
</div>
</div>
</header>
<div className="max-w-7xl mx-auto px-4 py-6">
<div className="space-y-8">
{/* Confidentiality Statement */}
<section id="confidentiality" className="bg-red-50 rounded-lg shadow p-6 border-l-4 border-red-500">
<h2 className="text-xl font-semibold mb-4 text-red-700">Confidentiality Statement and Disclaimer</h2>
<div className="prose max-w-none text-red-700">
<p className="text-sm">
CONFIDENTIAL DOCUMENT - RESTRICTED DISTRIBUTION
</p>
<p className="text-sm mt-2">
This security assessment report contains sensitive information about system vulnerabilities and security controls. Distribution is limited to authorized personnel only. All recipients must maintain strict confidentiality and implement appropriate security controls to prevent unauthorized disclosure.
</p>
<div className="mt-4 space-y-2 text-sm">
<p><strong>Distribution Restrictions:</strong> Internal use only, authorized personnel</p>
<p><strong>Legal Notice:</strong> This report is protected under non-disclosure agreements and applicable security laws</p>
<p><strong>Liability Statement:</strong> The assessment was performed within agreed scope and limitations</p>
</div>
</div>
</section>
{/* Scope and Methodology */}
<section id="scope-methodology" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Scope and Methodology</h2>
<div className="grid grid-cols-2 gap-6">
<div className="space-y-4">
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-medium mb-3">Assessment Scope</h3>
<ul className="space-y-2 text-gray-600">
<li className="flex items-center">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
Web Applications (12 domains)
</li>
<li className="flex items-center">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
Network Infrastructure (48 IP ranges)
</li>
<li className="flex items-center">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
Cloud Services (AWS, Azure)
</li>
<li className="flex items-center">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
API Endpoints (32 services)
</li>
</ul>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-medium mb-3">Testing Period</h3>
<div className="text-gray-600">
<p>Start Date: February 1, 2025</p>
<p>End Date: March 3, 2025</p>
<p>Duration: 31 days</p>
</div>
</div>
</div>
<div className="space-y-4">
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-medium mb-3">Methodology</h3>
<ul className="space-y-2 text-gray-600">
<li className="flex items-center">
<i className="fas fa-shield-alt text-blue-500 mr-2"></i>
OWASP Testing Framework
</li>
<li className="flex items-center">
<i className="fas fa-shield-alt text-blue-500 mr-2"></i>
NIST Cybersecurity Framework
</li>
<li className="flex items-center">
<i className="fas fa-shield-alt text-blue-500 mr-2"></i>
CIS Controls Assessment
</li>
</ul>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-medium mb-3">Tools Employed</h3>
<div className="grid grid-cols-2 gap-2">
<span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">Nessus Pro</span>
<span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">Burp Suite</span>
<span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">Metasploit</span>
<span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">Acunetix</span>
</div>
</div>
</div>
</div>
</section>
{/* Risk Rating System */}
<section id="risk-rating" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Risk Rating System</h2>
<div className="grid grid-cols-2 gap-6">
<div>
<h3 className="text-lg font-medium mb-4">Severity Ratings</h3>
<div className="space-y-4">
{[
{ level: 'Critical', score: '9.0-10.0', color: 'red', description: 'Immediate threat to core systems' },
{ level: 'High', score: '7.0-8.9', color: 'orange', description: 'Significant risk to operations' },
{ level: 'Medium', score: '4.0-6.9', color: 'yellow', description: 'Moderate risk requiring attention' },
{ level: 'Low', score: '0.1-3.9', color: 'blue', description: 'Minor risk to operations' }
].map((rating) => (
<div key={rating.level} className="bg-gray-50 p-3 rounded-lg">
<div className="flex items-center justify-between mb-2">
<span className={`px-2 py-1 text-sm rounded ${
rating.color === 'red' ? 'bg-red-100 text-red-600' :
rating.color === 'orange' ? 'bg-orange-100 text-orange-600' :
rating.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
'bg-blue-100 text-blue-600'
}`}>{rating.level}</span>
<span className="text-sm font-medium">CVSS: {rating.score}</span>
</div>
<p className="text-sm text-gray-600">{rating.description}</p>
</div>
))}
</div>
</div>
<div>
<h3 className="text-lg font-medium mb-4">Risk Calculation Factors</h3>
<div className="bg-gray-50 p-4 rounded-lg">
<div className="space-y-4">
<div>
<h4 className="font-medium mb-2">Impact Factors</h4>
<ul className="space-y-2 text-sm text-gray-600">
<li className="flex items-center">
<i className="fas fa-impact text-blue-500 mr-2"></i>
Data Sensitivity
</li>
<li className="flex items-center">
<i className="fas fa-chart-line text-blue-500 mr-2"></i>
Business Impact
</li>
<li className="flex items-center">
<i className="fas fa-users text-blue-500 mr-2"></i>
User Exposure
</li>
</ul>
</div>
<div>
<h4 className="font-medium mb-2">Likelihood Factors</h4>
<ul className="space-y-2 text-sm text-gray-600">
<li className="flex items-center">
<i className="fas fa-shield-alt text-blue-500 mr-2"></i>
Exploit Complexity
</li>
<li className="flex items-center">
<i className="fas fa-user-shield text-blue-500 mr-2"></i>
Authentication Required
</li>
<li className="flex items-center">
<i className="fas fa-network-wired text-blue-500 mr-2"></i>
Network Vector
</li>
</ul>
</div>
</div>
</div>
</div>
</div>
</section>
{/* Detailed Vulnerability Findings */}
<section id="detailed-findings" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Detailed Vulnerability Findings</h2>
<div className="space-y-6">
{[
{
id: 'CVE-2025-0001',
title: 'Remote Code Execution in API Gateway',
severity: 'Critical',
cvss: 9.8,
affected: 'API Gateway v2.1.0',
description: 'A vulnerability in the API Gateway allows remote attackers to execute arbitrary code via crafted HTTP requests.',
impact: 'Complete system compromise, data breach risk',
evidence: 'Proof of concept exploit developed and tested in isolated environment',
references: ['OWASP Top 10 2025: A1', 'CWE-78']
},
{
id: 'CVE-2025-0002',
title: 'SQL Injection in User Management',
severity: 'High',
cvss: 8.5,
affected: 'User Management Module v3.2.1',
description: 'SQL injection vulnerability in user management module allows unauthorized access to database.',
impact: 'Unauthorized data access, potential data manipulation',
evidence: 'Successfully extracted sample records using SQLmap',
references: ['OWASP Top 10 2025: A3', 'CWE-89']
},
{
id: 'CVE-2025-0003',
title: 'Cross-Site Scripting in Dashboard',
severity: 'Medium',
cvss: 6.4,
affected: 'Dashboard UI v1.8.0',
description: 'Stored XSS vulnerability in dashboard allows injection of malicious scripts.',
impact: 'Session hijacking, defacement risk',
evidence: 'Demonstrated script execution in user context',
references: ['OWASP Top 10 2025: A7', 'CWE-79']
}
].map((vuln) => (
<div key={vuln.id} className="bg-gray-50 p-4 rounded-lg">
<div className="flex items-center justify-between mb-4">
<div className="flex items-center space-x-4">
<span className={`px-2 py-1 text-sm rounded ${
vuln.severity === 'Critical' ? 'bg-red-100 text-red-600' :
vuln.severity === 'High' ? 'bg-orange-100 text-orange-600' :
'bg-yellow-100 text-yellow-600'
}`}>{vuln.severity}</span>
<span className="font-medium">{vuln.title}</span>
</div>
<span className="text-sm text-gray-500">{vuln.id}</span>
</div>
<div className="grid grid-cols-2 gap-4 mb-4">
<div>
<h4 className="text-sm font-medium mb-2">CVSS Score</h4>
<span className="text-lg font-bold">{vuln.cvss}</span>
</div>
<div>
<h4 className="text-sm font-medium mb-2">Affected Component</h4>
<span className="text-gray-600">{vuln.affected}</span>
</div>
</div>
<div className="space-y-3">
<div>
<h4 className="text-sm font-medium mb-1">Description</h4>
<p className="text-gray-600 text-sm">{vuln.description}</p>
</div>
<div>
<h4 className="text-sm font-medium mb-1">Impact</h4>
<p className="text-gray-600 text-sm">{vuln.impact}</p>
</div>
<div>
<h4 className="text-sm font-medium mb-1">Evidence</h4>
<p className="text-gray-600 text-sm">{vuln.evidence}</p>
</div>
<div>
<h4 className="text-sm font-medium mb-1">References</h4>
<div className="flex flex-wrap gap-2">
{vuln.references.map((ref, index) => (
<span key={index} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
{ref}
</span>
))}
</div>
</div>
</div>
</div>
))}
</div>
</section>
{/* Executive Summary */}
<section id="executive-summary" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Executive Summary</h2>
<div className="space-y-6">
<div className="prose max-w-none">
<p className="text-gray-600">
The comprehensive security assessment conducted between February 1, 2025 and March 3, 2025 revealed several critical and high-risk vulnerabilities that require immediate attention. The assessment covered web applications, network infrastructure, and cloud services, identifying significant security gaps that pose potential risks to business operations.
</p>
</div>
<div className="grid grid-cols-2 gap-6">
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-medium mb-4">Critical Findings Overview</h3>
<div className="space-y-3">
<div className="flex items-center justify-between">
<span className="text-gray-600">Remote Code Execution</span>
<span className="px-2 py-1 text-sm rounded bg-red-100 text-red-600">Critical</span>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-600">SQL Injection Vulnerability</span>
<span className="px-2 py-1 text-sm rounded bg-orange-100 text-orange-600">High</span>
</div>
<div className="flex items-center justify-between">
<span className="text-gray-600">Authentication Bypass</span>
<span className="px-2 py-1 text-sm rounded bg-red-100 text-red-600">Critical</span>
</div>
</div>
</div>
<div className="bg-gray-50 p-4 rounded-lg">
<h3 className="font-medium mb-4">Security Posture Evaluation</h3>
<div className="space-y-3">
<div>
<div className="flex justify-between text-sm mb-1">
<span>Overall Security Score</span>
<span>72/100</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div className="bg-yellow-500 h-2 rounded-full" style={{ width: '72%' }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-sm mb-1">
<span>Compliance Rate</span>
<span>85%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
</div>
</div>
<div>
<div className="flex justify-between text-sm mb-1">
<span>Risk Mitigation</span>
<span>68%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div className="bg-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
</div>
</div>
</div>
</div>
</div>
<div className="grid grid-cols-4 gap-4">
<div className="bg-red-50 p-4 rounded-lg">
<div className="text-red-600 text-sm font-medium">Critical Issues</div>
<div className="text-2xl font-bold mt-1">12</div>
<div className="text-sm text-red-600 mt-1">Immediate Action Required</div>
</div>
<div className="bg-orange-50 p-4 rounded-lg">
<div className="text-orange-600 text-sm font-medium">High Risk</div>
<div className="text-2xl font-bold mt-1">18</div>
<div className="text-sm text-orange-600 mt-1">Urgent Attention Needed</div>
</div>
<div className="bg-yellow-50 p-4 rounded-lg">
<div className="text-yellow-600 text-sm font-medium">Medium Risk</div>
<div className="text-2xl font-bold mt-1">24</div>
<div className="text-sm text-yellow-600 mt-1">Planned Resolution</div>
</div>
<div className="bg-blue-50 p-4 rounded-lg">
<div className="text-blue-600 text-sm font-medium">Low Risk</div>
<div className="text-2xl font-bold mt-1">32</div>
<div className="text-sm text-blue-600 mt-1">Monitor and Review</div>
</div>
</div>
<div className="bg-blue-50 p-4 rounded-lg">
<h4 className="text-blue-800 font-medium mb-2">Key Recommendations</h4>
<ul className="space-y-2">
<li className="flex items-center text-gray-600">
<i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
Immediate patching of critical vulnerabilities in cloud infrastructure
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-exclamation-circle text-orange-500 mr-2"></i>
Implementation of enhanced access controls and authentication mechanisms
</li>
<li className="flex items-center text-gray-600">
<i className="fas fa-exclamation-circle text-yellow-500 mr-2"></i>
Regular security training and awareness programs for staff
</li>
</ul>
</div>
</div>
</section>

{/* Compliance Status */}
<section id="compliance" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Compliance Status</h2>
<div className="grid grid-cols-2 gap-6">
{[
{ standard: 'ISO 27001', status: 'Compliant', progress: 92, color: 'green' },
{ standard: 'GDPR', status: 'Partial', progress: 78, color: 'yellow' },
{ standard: 'PCI DSS', status: 'Non-Compliant', progress: 45, color: 'red' },
{ standard: 'SOC 2', status: 'Compliant', progress: 95, color: 'green' }
].map((item) => (
<div key={item.standard} className="bg-gray-50 p-4 rounded-lg">
<div className="flex justify-between items-center mb-2">
<span className="font-medium">{item.standard}</span>
<span className={`px-2 py-1 text-sm rounded ${
item.color === 'green' ? 'bg-green-100 text-green-600' :
item.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
'bg-red-100 text-red-600'
}`}>{item.status}</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div
className={`h-2 rounded-full ${
item.color === 'green' ? 'bg-green-500' :
item.color === 'yellow' ? 'bg-yellow-500' :
'bg-red-500'
}`}
style={{ width: `${item.progress}%` }}
></div>
</div>
<div className="text-sm text-gray-500 mt-2">{item.progress}% Complete</div>
</div>
))}
</div>
</section>
{/* Technical Stack */}
<section id="technical-stack" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Technical Stack</h2>
<div className="overflow-x-auto">
<table className="min-w-full">
<thead>
<tr className="bg-gray-50">
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Type</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Count</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vulnerable</th>
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
</tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
{[
{ type: 'Web Servers', count: 24, vulnerable: 3, risk: 'High' },
{ type: 'Databases', count: 12, vulnerable: 2, risk: 'Critical' },
{ type: 'Cloud Services', count: 8, vulnerable: 1, risk: 'Medium' },
{ type: 'Network Devices', count: 36, vulnerable: 4, risk: 'High' }
].map((asset) => (
<tr key={asset.type}>
<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.type}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.count}</td>
<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.vulnerable}</td>
<td className="px-6 py-4 whitespace-nowrap">
<span className={`px-2 py-1 text-sm rounded ${
asset.risk === 'Critical' ? 'bg-red-100 text-red-600' :
asset.risk === 'High' ? 'bg-orange-100 text-orange-600' :
'bg-yellow-100 text-yellow-600'
}`}>{asset.risk}</span>
</td>
</tr>
))}
</tbody>
</table>
</div>
</section>

{/* Security Controls */}
<section id="security-controls" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Security Controls Assessment</h2>
<div className="grid grid-cols-3 gap-6">
{[
{
category: 'Access Control',
status: 'Strong',
score: 92,
color: 'green',
items: ['Multi-factor Authentication', 'Role-based Access', 'Password Policies']
},
{
category: 'Network Security',
status: 'Moderate',
score: 78,
color: 'yellow',
items: ['Firewall Rules', 'IDS/IPS', 'Network Segmentation']
},
{
category: 'Data Protection',
status: 'Needs Improvement',
score: 65,
color: 'red',
items: ['Encryption', 'Data Classification', 'DLP Solutions']
}
].map((control, index) => (
<div key={index} className="bg-gray-50 p-4 rounded-lg">
<div className="flex justify-between items-center mb-4">
<h3 className="font-medium">{control.category}</h3>
<span className={`px-2 py-1 text-sm rounded ${
control.color === 'green' ? 'bg-green-100 text-green-600' :
control.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
'bg-red-100 text-red-600'
}`}>{control.status}</span>
</div>
<div className="mb-4">
<div className="flex justify-between text-sm text-gray-600 mb-1">
<span>Effectiveness Score</span>
<span>{control.score}%</span>
</div>
<div className="w-full bg-gray-200 rounded-full h-2">
<div
className={`h-2 rounded-full ${
control.color === 'green' ? 'bg-green-500' :
control.color === 'yellow' ? 'bg-yellow-500' :
'bg-red-500'
}`}
style={{ width: `${control.score}%` }}
></div>
</div>
</div>
<ul className="space-y-2">
{control.items.map((item, itemIndex) => (
<li key={itemIndex} className="flex items-center text-sm text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
{item}
</li>
))}
</ul>
</div>
))}
</div>
</section>
{/* Threat Intelligence */}
<section id="threat-intelligence" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Threat Intelligence Feed</h2>
<div className="space-y-4">
{[
{
type: 'APT Activity',
severity: 'Critical',
source: 'External Intelligence',
details: 'Detected sophisticated APT group targeting financial sector',
timestamp: '2 hours ago',
indicators: ['Suspicious IP ranges', 'Known malware signatures', 'Command & Control patterns']
},
{
type: 'Ransomware Campaign',
severity: 'High',
source: 'Industry Partners',
details: 'New ransomware variant spreading through phishing emails',
timestamp: '6 hours ago',
indicators: ['Email patterns', 'Malicious attachments', 'Bitcoin wallet addresses']
},
{
type: 'Zero-day Exploit',
severity: 'Critical',
source: 'Security Researchers',
details: 'Unpatched vulnerability in common web framework',
timestamp: '12 hours ago',
indicators: ['Exploit code', 'Affected versions', 'Attack vectors']
}
].map((threat, index) => (
<div key={index} className="bg-gray-50 p-4 rounded-lg">
<div className="flex items-center justify-between mb-3">
<div className="flex items-center space-x-3">
<span className={`px-2 py-1 text-sm rounded ${
threat.severity === 'Critical' ? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
}`}>{threat.severity}</span>
<span className="font-medium">{threat.type}</span>
</div>
<span className="text-sm text-gray-500">{threat.timestamp}</span>
</div>
<p className="text-gray-600 mb-3">{threat.details}</p>
<div className="text-sm text-gray-500 mb-2">Source: {threat.source}</div>
<div className="flex flex-wrap gap-2">
{threat.indicators.map((indicator, i) => (
<span key={i} className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
{indicator}
</span>
))}
</div>
</div>
))}
</div>
</section>
{/* Recommendations */}
<section id="recommendations" className="bg-white rounded-lg shadow p-6">
<h2 className="text-xl font-semibold mb-6">Security Recommendations</h2>
<div className="space-y-6">
{[
{
title: 'Immediate Actions',
items: [
'Patch critical vulnerabilities in cloud infrastructure',
'Implement Content Security Policy headers',
'Review and update SSL/TLS configurations'
]
},
{
title: 'Short-term Improvements',
items: [
'Enhance authentication mechanisms',
'Implement regular security scanning',
'Update security policies and procedures'
]
},
{
title: 'Long-term Strategy',
items: [
'Develop security training program',
'Implement continuous security monitoring',
'Establish incident response procedures'
]
}
].map((section, index) => (
<div key={index} className="bg-gray-50 p-4 rounded-lg">
<h3 className="text-lg font-medium mb-3">{section.title}</h3>
<ul className="space-y-2">
{section.items.map((item, itemIndex) => (
<li key={itemIndex} className="flex items-center text-gray-600">
<i className="fas fa-check-circle text-green-500 mr-2"></i>
{item}
</li>
))}
</ul>
</div>
))}
</div>
</section>
</div>
</div>
</div>
);
};
export default App
