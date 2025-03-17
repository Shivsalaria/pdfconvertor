import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const generatePDF = (formData) => {
    const doc = new jsPDF();

    // Helper function for checkbox display
    const getCheckboxValue = (value) => value ? '✓' : '✗';

    // Add header
    doc.setFontSize(16);
    doc.text("EGS SECURITY SOLUTIONS", doc.internal.pageSize.width / 2, 15, { align: "center" });
    doc.setFontSize(14);
    doc.text("Initial Client Worksheet", doc.internal.pageSize.width / 2, 25, { align: "center" });
    doc.setFontSize(12);
    doc.text("CONFIDENTIAL - Engagement Task Log", doc.internal.pageSize.width / 2, 35, { align: "center" });

    // Project Info
    autoTable(doc, {
        startY: 45,
        head: [["Project Information"]],
        body: [
            ["Project ID: " + formData.projectInfo.projectId],
            ["Project Title: " + formData.projectInfo.projectTitle],
            ["Start Date: " + formData.projectInfo.startDate],
            ["Expected End Date: " + formData.projectInfo.expectedEndDate],
            ["Confidentiality Level: " + formData.projectInfo.confidentialityLevel]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Company Info
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Company Information"]],
        body: [
            ["Company Name: " + formData.companyInfo.name],
            ["Address: " + formData.companyInfo.address],
            ["Phone: " + formData.companyInfo.phone],
            ["Email: " + formData.companyInfo.email],
            ["Website: " + formData.companyInfo.website]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Client Info
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Client Information"]],
        body: [
            ["Company: " + formData.clientInfo.company],
            ["Address: " + formData.clientInfo.streetAddress],
            ["City, State, ZIP: " + formData.clientInfo.cityStateZIP],
            ["Primary Contact: " + formData.clientInfo.primaryContactName],
            ["Phone: " + formData.clientInfo.primaryContactPhone],
            ["Email: " + formData.clientInfo.primaryContactEmail],
            ["Alternate Contact: " + formData.clientInfo.alternateContactName],
            ["Phone: " + formData.clientInfo.alternateContactPhone],
            ["Email: " + formData.clientInfo.alternateContactEmail]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Teleconference Info
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [["Teleconference Information"]],
        body: [
            ["Date & Time: " + formData.teleconferenceInfo.dateTime],
            ["Point of Contact: " + formData.teleconferenceInfo.pointOfContact],
            ["Teleconference Number: " + formData.teleconferenceInfo.teleconferenceNumber]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // FRAP Section
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [[{ content: 'FRAP - FACILITATED RISK ASSESSMENT PROCESS', colSpan: 1 }]],
        body: [['']],
        theme: 'grid',
        headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontSize: 12,
            fontStyle: 'bold',
            halign: 'left',
            cellPadding: 8
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 6,
            fontSize: 10
        }
    });

    // FRAP Content
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        head: [['FRAP Components']],
        body: [
            [{
                content: `Initial FRAP - Sessions with key personnel from EACH department. Participants identify critical information assets, assess threats and vulnerabilities to identified assets, analyze the impact on the organization of identified threats and identify mitigating controls. Risks are identified and prioritized using the CIA Triad of Confidentiality, Integrity and Availability. Mitigating controls are then assigned to each risk. Deliverables include a Risk Action Plan template that the client organization will use to assign timelines and responsible persons to each identified risk and associated controls.

Follow Up of Risk Action Plan - Review of existing RAP in light of changes in the client organization's security environment.

Detailed analysis of Risk Action Plan - Review of existing RAP, breaking general risks into specific areas, e.g., power outage becomes power outage > 30 min, power outage > 1 day, power outage > 1 week.`
            }]
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontSize: 11,
            fontStyle: 'bold'
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 8,
            fontSize: 10,
            lineHeight: 1.5
        },
        columnStyles: {
            0: { cellWidth: 'auto' }
        }
    });

    // FRAP Checklist
    const frapHeaders = [
        ['Component', 'Y', 'N', 'Notes']
    ];

    const frapBody = [
        [
            'Initial FRAP',
            formData.clientRequirements.frap.initialFrap ? '✓' : '',
            !formData.clientRequirements.frap.initialFrap ? '✓' : '',
            ''
        ],
        [
            'Follow-up Risk Action Plan',
            formData.clientRequirements.frap.followUpRiskActionPlan ? '✓' : '',
            !formData.clientRequirements.frap.followUpRiskActionPlan ? '✓' : '',
            ''
        ],
        [
            'Detailed Analysis Risk Action Plan',
            formData.clientRequirements.frap.detailedAnalysisRiskActionPlan ? '✓' : '',
            !formData.clientRequirements.frap.detailedAnalysisRiskActionPlan ? '✓' : '',
            formData.clientRequirements.frap.notes || ''
        ]
    ];

    // Add custom FRAP options
    formData.clientRequirements.frap.customOptions.forEach(option => {
        frapBody.push([
            option.label,
            option.checked ? '✓' : '',
            !option.checked ? '✓' : '',
            ''
        ]);
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 5,
        head: frapHeaders,
        body: frapBody,
        theme: 'grid',
        headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontSize: 10
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 6,
            fontSize: 10
        }
    });

    // ISSA Table
    const issaHeaders = [
        [{ content: 'Information Systems Security Assessment', colSpan: 4 }],
        ['Component', 'Y', 'N', 'Notes']
    ];

    const issaBody = [
        [
            'Data Backup & Recovery',
            formData.clientRequirements.issa.dataBackupRecovery ? '✓' : '',
            !formData.clientRequirements.issa.dataBackupRecovery ? '✓' : '',
            ''
        ],
        [
            'Firewall Administration & Configuration',
            formData.clientRequirements.issa.firewallAdministration ? '✓' : '',
            !formData.clientRequirements.issa.firewallAdministration ? '✓' : '',
            ''
        ],
        [
            'Follow-up Status of Recommendations',
            formData.clientRequirements.issa.followUpStatus ? '✓' : '',
            !formData.clientRequirements.issa.followUpStatus ? '✓' : '',
            ''
        ],
        [
            'Insurance Coverage',
            formData.clientRequirements.issa.insuranceCoverage ? '✓' : '',
            !formData.clientRequirements.issa.insuranceCoverage ? '✓' : '',
            ''
        ],
        [
            'Network Monitoring & Intrusion Detection',
            formData.clientRequirements.issa.networkMonitoring ? '✓' : '',
            !formData.clientRequirements.issa.networkMonitoring ? '✓' : '',
            ''
        ],
        [
            'Core System in Use',
            '',
            '',
            formData.clientRequirements.issa.coreSystemInUse
        ]
    ];

    // Add custom ISSA options
    formData.clientRequirements.issa.customOptions.forEach(option => {
        issaBody.push([
            option.label,
            option.checked ? '✓' : '',
            !option.checked ? '✓' : '',
            ''
        ]);
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: issaHeaders,
        body: issaBody,
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Footprinting Section
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [[{ content: 'FOOTPRINTING INFORMATION ANALYSIS', colSpan: 3 }]],
        body: [
            ['', 'Y', 'N'],
            ['Footprinting Analysis', formData.clientRequirements.footprinting ? '✓' : '', !formData.clientRequirements.footprinting ? '✓' : ''],
            ['Notes:', { content: formData.clientRequirements.footprintingNotes || '', colSpan: 2 }]
        ],
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // External Vulnerability Assessment
    const evaHeaders = [
        [{ content: 'EXTERNAL VULNERABILITY ASSESSMENT', colSpan: 4 }],
        ['Component', 'Y', 'N', 'Details']
    ];

    const evaBody = [
        [
            'Internet Vulnerability Assessment (Once)',
            formData.clientRequirements.externalVulnerabilityAssessment.internetVulnerabilityAssessment ? '✓' : '',
            !formData.clientRequirements.externalVulnerabilityAssessment.internetVulnerabilityAssessment ? '✓' : '',
            ''
        ],
        [
            'External IPs to test',
            '',
            '',
            formData.clientRequirements.externalVulnerabilityAssessment.externalIPsToTest
        ],
        [
            'Total External IPs',
            '',
            '',
            formData.clientRequirements.externalVulnerabilityAssessment.totalExternalIPs
        ]
    ];

    // Add custom EVA options
    formData.clientRequirements.externalVulnerabilityAssessment.customOptions.forEach(option => {
        evaBody.push([
            option.label,
            option.checked ? '✓' : '',
            !option.checked ? '✓' : '',
            ''
        ]);
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: evaHeaders,
        body: evaBody,
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Internal Vulnerability Assessment
    const ivaHeaders = [
        [{ content: 'INTERNAL VULNERABILITY ASSESSMENT', colSpan: 4 }],
        ['Component', 'Y', 'N', 'Details']
    ];

    const ivaBody = [
        [
            'Network Vulnerability Assessment (Once)',
            formData.clientRequirements.internalVulnerabilityAssessment.networkVulnerabilityAssessment ? '✓' : '',
            !formData.clientRequirements.internalVulnerabilityAssessment.networkVulnerabilityAssessment ? '✓' : '',
            ''
        ],
        [
            'Internal IPs to test',
            '',
            '',
            formData.clientRequirements.internalVulnerabilityAssessment.internalIPsToTest
        ],
        [
            'Total Internal IPs',
            '',
            '',
            formData.clientRequirements.internalVulnerabilityAssessment.totalInternalIPs
        ]
    ];

    // Add custom IVA options
    formData.clientRequirements.internalVulnerabilityAssessment.customOptions.forEach(option => {
        ivaBody.push([
            option.label,
            option.checked ? '✓' : '',
            !option.checked ? '✓' : '',
            ''
        ]);
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: ivaHeaders,
        body: ivaBody,
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // External Penetration Testing
    const eptHeaders = [
        [{ content: 'EXTERNAL PENETRATION TESTING', colSpan: 4 }],
        ['Component', 'Y', 'N', 'Details']
    ];

    const eptBody = [
        [
            'Testing Type',
            '',
            '',
            formData.clientRequirements.externalPenetrationTesting.testingType
        ],
        [
            'Firewalls',
            formData.clientRequirements.externalPenetrationTesting.components.firewalls ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.firewalls ? '✓' : '',
            ''
        ],
        [
            'Passwords',
            formData.clientRequirements.externalPenetrationTesting.components.passwords ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.passwords ? '✓' : '',
            ''
        ],
        [
            'Web Servers',
            formData.clientRequirements.externalPenetrationTesting.components.webServers ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.webServers ? '✓' : '',
            ''
        ],
        [
            'Web Applications',
            formData.clientRequirements.externalPenetrationTesting.components.webApplications ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.webApplications ? '✓' : '',
            ''
        ],
        [
            'IDS',
            formData.clientRequirements.externalPenetrationTesting.components.ids ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.ids ? '✓' : '',
            ''
        ],
        [
            'SQL Injection',
            formData.clientRequirements.externalPenetrationTesting.components.sqlInjection ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.sqlInjection ? '✓' : '',
            ''
        ],
        [
            'Routers',
            formData.clientRequirements.externalPenetrationTesting.components.routers ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.routers ? '✓' : '',
            ''
        ],
        [
            'Email Server',
            formData.clientRequirements.externalPenetrationTesting.components.emailServer ? '✓' : '',
            !formData.clientRequirements.externalPenetrationTesting.components.emailServer ? '✓' : '',
            ''
        ]
    ];

    // Add custom EPT options
    formData.clientRequirements.externalPenetrationTesting.components.customOptions.forEach(option => {
        eptBody.push([
            option.label,
            option.checked ? '✓' : '',
            !option.checked ? '✓' : '',
            ''
        ]);
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: eptHeaders,
        body: eptBody,
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Other Assessments
    const otherAssessmentsHeaders = [
        [{ content: 'OTHER ASSESSMENTS', colSpan: 4 }],
        ['Assessment Type', 'Y', 'N', 'Notes']
    ];

    const otherAssessmentsBody = [
        [
            'Wireless Network Assessment',
            formData.clientRequirements.wirelessNetworkAssessment ? '✓' : '',
            !formData.clientRequirements.wirelessNetworkAssessment ? '✓' : '',
            formData.clientRequirements.wirelessNetworkNotes || ''
        ],
        [
            'Physical Security Assessment',
            formData.clientRequirements.physicalSecurityAssessment ? '✓' : '',
            !formData.clientRequirements.physicalSecurityAssessment ? '✓' : '',
            formData.clientRequirements.physicalSecurityNotes || ''
        ],
        [
            'Cloud Security Assessment',
            formData.clientRequirements.cloudSecurityAssessment ? '✓' : '',
            !formData.clientRequirements.cloudSecurityAssessment ? '✓' : '',
            formData.clientRequirements.cloudSecurityNotes || ''
        ],
        [
            'Mobile Device Security Assessment',
            formData.clientRequirements.mobileDeviceSecurityAssessment ? '✓' : '',
            !formData.clientRequirements.mobileDeviceSecurityAssessment ? '✓' : '',
            formData.clientRequirements.mobileDeviceNotes || ''
        ]
    ];

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: otherAssessmentsHeaders,
        body: otherAssessmentsBody,
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // GAP Analysis
    const gapHeaders = [
        [{ content: 'GAP ANALYSIS', colSpan: 4 }],
        ['Analysis Type', 'Y', 'N', 'Notes']
    ];

    const gapBody = [
        [
            'GRAMM-LEACH-BLILEY',
            formData.clientRequirements.gapAnalysis.grammLeachBliley ? '✓' : '',
            !formData.clientRequirements.gapAnalysis.grammLeachBliley ? '✓' : '',
            ''
        ],
        [
            'PCI-DSS',
            formData.clientRequirements.gapAnalysis.pciDss ? '✓' : '',
            !formData.clientRequirements.gapAnalysis.pciDss ? '✓' : '',
            ''
        ],
        [
            'HIPAA',
            formData.clientRequirements.gapAnalysis.hippa ? '✓' : '',
            !formData.clientRequirements.gapAnalysis.hippa ? '✓' : '',
            ''
        ],
        [
            'FISMA',
            formData.clientRequirements.gapAnalysis.fisma ? '✓' : '',
            !formData.clientRequirements.gapAnalysis.fisma ? '✓' : '',
            ''
        ],
        [
            'SOX',
            formData.clientRequirements.gapAnalysis.sox ? '✓' : '',
            !formData.clientRequirements.gapAnalysis.sox ? '✓' : '',
            formData.clientRequirements.gapAnalysis.notes || ''
        ]
    ];

    // Add custom GAP options
    formData.clientRequirements.gapAnalysis.customOptions.forEach(option => {
        gapBody.push([
            option.label,
            option.checked ? '✓' : '',
            !option.checked ? '✓' : '',
            ''
        ]);
    });

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: gapHeaders,
        body: gapBody,
        theme: 'grid',
        headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
    });

    // Other Requirements
    if (formData.clientRequirements.otherRequirements.length > 0) {
        const otherReqHeaders = [
            [{ content: 'OTHER REQUIREMENTS', colSpan: 2 }]
        ];

        const otherReqBody = formData.clientRequirements.otherRequirements.map(req => [req, '✓']);

        if (formData.clientRequirements.otherRequirementsNotes) {
            otherReqBody.push(['Notes:', formData.clientRequirements.otherRequirementsNotes]);
        }

        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: otherReqHeaders,
            body: otherReqBody,
            theme: 'grid',
            headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
        });
    }

    // Teleconference Notes
    if (formData.teleconferenceNotes) {
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            head: [["Teleconference Notes"]],
            body: [[formData.teleconferenceNotes]],
            theme: 'grid',
            headStyles: { fillColor: [200, 200, 200], textColor: [0, 0, 0] }
        });
    }

    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [[{ content: 'FREQUENTLY ASKED QUESTIONS', colSpan: 1 }]],
        body: [['']],  // Empty row to create space for the title
        theme: 'grid',
        headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontSize: 12,
            fontStyle: 'bold',
            halign: 'left',
            cellPadding: 8
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 6,
            fontSize: 10
        }
    });

    // FAQ Content - FRAP section similar to the image
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY,
        head: [['FRAP - Facilitated Risk Assessment Process']],
        body: [
            [{
                content: `Initial FRAP - Sessions with key personnel from EACH department. Participants identify critical information assets, assess threats and vulnerabilities to identified assets, analyze the impact on the organization of identified threats and identify mitigating controls. Risks are identified and prioritized using the CIA Triad of Confidentiality, Integrity and Availability. Mitigating controls are then assigned to each risk. Deliverables include a Risk Action Plan template that the client organization will use to assign timelines and responsible persons to each identified risk and associated controls.`
            }],
            [{
                content: `Follow Up of Risk Action Plan - Review of existing RAP in light of changes in the client organization's security environment.`
            }],
            [{
                content: `Detailed analysis of Risk Action Plan - Review of existing RAP, breaking general risks into specific areas, e.g., power outage becomes power outage > 30 min, power outage > 1 day, power outage > 1 week.`
            }]
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontSize: 11,
            fontStyle: 'bold'
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 8,
            fontSize: 10,
            lineHeight: 1.5
        },
        columnStyles: {
            0: { cellWidth: 'auto' }
        }
    });

    // You can add more FAQ items following the same pattern
    // For example, to add an ISSA FAQ section:
    autoTable(doc, {
        startY: doc.lastAutoTable.finalY + 10,
        head: [['Information Systems Security Assessment']],
        body: [
            [{
                content: `Description of Information Systems Security Assessment and its components...`
            }]
        ],
        theme: 'grid',
        headStyles: {
            fillColor: [240, 240, 240],
            textColor: [0, 0, 0],
            fontSize: 11,
            fontStyle: 'bold'
        },
        styles: {
            overflow: 'linebreak',
            cellPadding: 8,
            fontSize: 10,
            lineHeight: 1.5
        }
    });

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text('Page ' + i + ' of ' + pageCount, doc.internal.pageSize.width - 20, doc.internal.pageSize.height - 10);
    }

    // Save the PDF
    doc.save('InitialClientWorksheet.pdf');
};

export default generatePDF;