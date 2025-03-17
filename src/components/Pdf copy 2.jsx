import React, { useState, useRef } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const PenTestEngagementLetter = () => {
  const printContentRef = useRef(null);


  const handleExportPDF = () => {
    // Create new PDF document
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add company logo placeholder
    // const addLogo = () => {
    //   // Draw a placeholder rectangle for logo
    //   pdf.setDrawColor(200, 200, 200);
    //   pdf.setFillColor(240, 240, 240);
    //   pdf.roundedRect(20, 15, 40, 15, 2, 2, 'FD');
    //   pdf.setFontSize(8);
    //   pdf.setTextColor(100, 100, 100);
    //   pdf.text('COMPANY LOGO', 40, 23, {align: 'center'});
    // };
    
    // Add watermark to each page
    const addWatermark = () => {
      // Save current state
      const currentFontSize = pdf.getFontSize();
      const currentTextColor = pdf.getTextColor();
      const currentFontStyle = pdf.getFont();
      
      // Set watermark properties
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(72); // Larger font size
      pdf.setTextColor(240, 240, 240); // Even lighter gray for subtlety
      
      // Calculate page dimensions
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height;
      
      // Add multiple watermarks to cover the page
      for(let y = 0; y < pageHeight + 100; y += 120) { // Increased spacing
        for(let x = -50; x < pageWidth + 100; x += 200) { // Multiple columns
          pdf.saveGraphicsState();
          pdf.translate(x, y);
          pdf.rotate(-45); // Diagonal angle
          pdf.text('CONFIDENTIAL', 0, 0, {
            align: 'center',
            baseline: 'middle'
          });
          pdf.restoreGraphicsState();
        }
      }
      
      // Restore previous state
      pdf.setFontSize(currentFontSize);
      pdf.setTextColor(currentTextColor);
      pdf.setFont(currentFontStyle.fontName, currentFontStyle.fontStyle);
    };
    
    // Add header to each page
    const addHeader = (pageNumber) => {
      // Add light gray background for full header width
      pdf.setFillColor(245, 245, 245); // Light gray color
      pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F'); // Full width with 15px height
      
      if (pageNumber === 1) {
        // Add document title in center only on first page
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(12); // Reduced font size for smaller header
        pdf.setTextColor(51,51,51);
        pdf.text('PEN TEST ENGAGEMENT LETTER', pdf.internal.pageSize.width/2, 28, {align: 'center'}); // Adjusted Y position for smaller header
      }
    };
    
    // Add footer to each page
    const addFooter = () => {
      const pageHeight = pdf.internal.pageSize.height;
      
      // Add line with light gray color and make it thinner
      pdf.setDrawColor(220, 220, 220); // Lighter gray color
      pdf.setLineWidth(0.1); // Thinner line
      pdf.line(20, pageHeight - 15, pdf.internal.pageSize.width - 20, pageHeight - 15); // Added 20mm margins
      
      // Add confidentiality text in red
      pdf.setFont('helvetica', 'italic');
      pdf.setFontSize(8);
      pdf.setTextColor(255, 0, 0); // Red color for CONFIDENTIAL
      pdf.text('CONFIDENTIAL', pdf.internal.pageSize.width/2, pageHeight - 10, {align: 'center'});
      
      // Add date and page number
      pdf.setTextColor(100, 100, 100); // Reset to gray for other text
      const currentDate = new Date().toLocaleDateString();
      pdf.text(`Generated on: ${currentDate}`, 20, pageHeight - 5); // Added 20mm left margin
      pdf.text(`Page ${pageNumber}`, pdf.internal.pageSize.width - 20, pageHeight - 5, {align: 'right'}); // Added 20mm right margin
    };
    
    // Function to add a section title with styling
    const addSectionTitle = (title, yPosition) => {
      // Add background rectangle
      pdf.setFillColor(240, 240, 240);
      pdf.rect(20, yPosition - 6, pdf.internal.pageSize.width - 40, 10, 'F');
      
      // Add section title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(12);
      pdf.setTextColor(0, 80, 170);
      pdf.text(title, 25, yPosition);
      
      return yPosition + 15; // Return the new Y position after the title
    };
    
    // Function to add a subsection title with styling
    const addSubsectionTitle = (title, yPosition) => {
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(11);
      pdf.setTextColor(80, 80, 80);
      pdf.text(title, 20, yPosition);
      
      // Add underline
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.2);
      pdf.line(25, yPosition + 1, 25 + pdf.getTextWidth(title), yPosition + 1);
      
      return yPosition + 10; // Return the new Y position after the title
    };
    
    // Function to add a styled paragraph
    const addParagraph = (text, yPosition, indent = 0) => {
      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      
      const splitText = pdf.splitTextToSize(text, pdf.internal.pageSize.width - 40 - indent);
      pdf.text(splitText, 20 + indent, yPosition);
      
      // Calculate new Y position based on number of lines
      return yPosition + (splitText.length * 5) + 5;
    };
    
    // Function to add a styled table
    const addStyledTable = (headers, data, yPosition, title = null) => {
      if (title) {
        pdf.setFont('helvetica', 'bold');
        pdf.setFontSize(10);
        pdf.setTextColor(80, 80, 80);
        pdf.text(title, 20, yPosition - 5);
      }
      
      pdf.autoTable({
        startY: yPosition,
        head: [headers],
        body: data,
        margin: { left: 20, right: 20 },
        headStyles: { 
          fillColor: [0, 0, 0], 
          textColor: 255,
          fontStyle: 'bold'
        },
        styles: {
          fontSize: 9,
          cellPadding: 3
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        // tableLineColor: [200, 200, 200],
        // tableLineWidth: 0.1
      });
      
      return pdf.lastAutoTable.finalY + 10;
    };
    
    // Start building the PDF
    let pageNumber = 1;
    let currentY = 45; // Increased to account for heading position
    
    // Add header and footer to first page
    addHeader(pageNumber);
    addFooter();
    
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(80, 80, 80);
    pdf.text(date, 20, currentY);
    currentY += 5;
    pdf.text(clientName, 20, currentY);
    currentY += 5;
    pdf.text(clientAddress, 20, currentY);
    currentY += 8;
    
    // Add greeting with styling
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Dear ${contactName},`, 20, currentY);
    currentY += 10;
    
    // Add opening paragraph with word wrapping and styling
    const openingText = `This letter agreement, if acceptable to and countersigned by you, will serve as the agreement ("Agreement") between ${clientName} and ${vendorName} governing ${vendorName}'s conduct of the Pen Test ("Pen Test") required by the "Pen Test Section" of this Engagement Letter. The effective date of the Agreement (the "Effective Date") will be the date on which this letter agreement is executed by ${clientName}. ${vendorName} and ${clientName} are each referred to herein as a "Party" and collectively, the "Parties."`;
    currentY = addParagraph(openingText, currentY);
    currentY += 2;
    
    // Background section with styling
    currentY = addSectionTitle('1. BACKGROUND', currentY);
    
    const backgroundText = `The ${clientName} board requires, within 45 days of the date of the respective board meeting, to retain an independent consultant to conduct an independent security review of all ${clientName} information systems. The review is to include a comprehensive vulnerability and risk assessment, security posture assessment, and assessment of security controls implemented across ${clientName} information systems. This Agreement, together with its attachments, constitutes that engagement letter.`;
    currentY = addParagraph(backgroundText, currentY);
    
    currentY = addSectionTitle('2. ORGANIZATION OF THIS AGREEMENT', currentY);
    
    const organizationText = `Section 3 of this document sets forth the scope of pen testing service, section 4 list the proposed services, section 5 prescribes the timing of pen testing services, section 6 defines reporting requirements and section 7 sets forth the terms and conditions for this pen test assignment.`;
    currentY = addParagraph(organizationText, currentY);
    currentY += 5;
        if (currentY > pdf.internal.pageSize.height - 80) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 40;
    }
    currentY = addSectionTitle('3. SCOPE OF PEN TESTING SERVICE', currentY);
    currentY = addSubsectionTitle('I. System Name/Title', currentY);
    currentY += 5;
    
    const systemTableData = systemInfoTable.map(row => [
      row.identifier,
      row.systemName,
      row.abbreviation
    ]);
    
    currentY = addStyledTable(
      ['Unique Identifier', 'Information System Name', 'Information System Abbreviation'],
      systemTableData,
      currentY,
      'Table 1-1. Information System Name and Title'
    );
    
    // Check if we need a new page based on remaining space
    if (currentY > pdf.internal.pageSize.height - 120) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 22;
    }
    // currentY += 10;
    currentY = addSubsectionTitle('II. IP Addresses Slated for Testing', currentY);
    currentY += 5;
    
    if (includeNetworkTesting) {
      const ipTableData = ipAddressTable.map(row => [
        row.ipAddress,
        row.hostname,
        row.software,
        row.functionDesc
      ]);
      
      currentY = addStyledTable(
        ['IP Address(s) or Ranges', 'Hostname', 'Software & Version', 'Function'],
        ipTableData,
        currentY,
        'Table 1-3. Components Slated for Testing'
      );
    } else {
      currentY = addParagraph('Network testing is not included in the scope of this engagement.', currentY, 5);
      currentY += 5;
    }
    
    // Web Applications Table
    if (currentY > pdf.internal.pageSize.height - 80) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 40;
    }
    
    currentY += 10;
    currentY = addSubsectionTitle('III. Web Applications Slated for Testing', currentY);
    // currentY += 5;
    
    if (includeWebTesting) {
      const webAppText = 'Activities employed to perform role testing on web applications may include capturing POST and GET requests for each function. The various web based applications that make up the system, and the logins and their associated roles that will be used for testing are noted by URL in Table 1-4.';
      currentY = addParagraph(webAppText, currentY, 0);
      currentY += 5;
      
      const webAppTableData = webAppTable.map(row => [
        row.url,
        row.ipAddress,
        row.functionDesc
      ]);
      
      currentY = addStyledTable(
        ['Web URL', 'IP Address', 'Function'],
        webAppTableData,
        currentY,
        'Table 1-4. Application URLs Slated for Testing'
      );
    } else {
      currentY = addParagraph('Web application testing is not included in the scope of this engagement.', currentY, 5);
      currentY += 5;
    }
    
    // Databases Table
    if (currentY > pdf.internal.pageSize.height - 80) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 22;
    }
    
    currentY = addSubsectionTitle('IV. Databases Slated for Testing', currentY);
    // currentY += 5;
    
    if (includeDatabaseTesting) {
      const databaseText = 'Databases that are slated for testing include those listed in Table 1-5. These databases will be assessed for security vulnerabilities, configuration issues, and access control problems.';
      currentY = addParagraph(databaseText, currentY, 0);
      currentY += 5;
      
      const databaseTableData = databaseTable.map(row => [
        row.name,
        row.hostname,
        row.ipAddress,
        row.additionalInfo
      ]);
      
      currentY = addStyledTable(
        ['Database Name', 'Hostname', 'IP Address', 'Additional Info'],
        databaseTableData,
        currentY,
        'Table 1-5. Databases Slated for Testing'
      );
    } else {
      currentY = addParagraph('Database testing is not included in the scope of this engagement.', currentY, 5);
      currentY += 5;
    }
    
    // Roles Table
    if (currentY > pdf.internal.pageSize.height - 80) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 22;
    }
    
    currentY += 10;
    currentY = addSubsectionTitle('V. Roles Slated for Testing', currentY);
    // currentY += 5;
    
    if (includeRoleTesting) {
      const rolesText = 'Role testing will be performed to test the authorization restrictions for each role. ' + vendorName + ' will access the system while logged in as different user types and attempt to perform restricted functions as unprivileged users. Functions and roles that will be tested are noted in Table 1-6.';
      currentY = addParagraph(rolesText, currentY, 0);
      currentY += 5;
      
      const rolesTableData = rolesTable.map(row => [
        row.roleName,
        row.userId,
        row.functionsDesc
      ]);
      
      currentY = addStyledTable(
        ['Role Name', 'Test User ID', 'Associated Functions'],
        rolesTableData,
        currentY,
        'Table 1-6. Role Based Testing'
      );
    } else {
      currentY = addParagraph('Role-based testing is not included in the scope of this engagement.', currentY, 5);
      currentY += 5;
    }
    
    // Function to check if enough space remains on page (30% excluding footer)
    const hasEnoughSpace = (currentYPos) => {
      const pageHeight = pdf.internal.pageSize.height;
      const footerHeight = 20; // Approximate footer height
      const usableHeight = pageHeight - footerHeight;
      const remainingSpace = usableHeight - currentYPos;
      return (remainingSpace / usableHeight) > 0.3; // Check if more than 30% space remains
    };

    // Add Schedule section
    if (!hasEnoughSpace(currentY)) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 22;
    }
    currentY += 5;
    currentY = addSectionTitle('4. EXPECTED TIME DURATION AND SCHEDULE', currentY);
    
    // Add timeline visualization
    pdf.setDrawColor(200, 200, 200);
    pdf.setFillColor(240, 240, 240);
    pdf.roundedRect(20, currentY, pdf.internal.pageSize.width - 40, 30, 2, 2, 'F');
    
    // Draw timeline
    const timelineY = currentY + 15;
    const timelineStartX = 40;
    const timelineEndX = pdf.internal.pageSize.width - 40;
    
    // Timeline line
    pdf.setDrawColor(0, 123, 255);
    pdf.setLineWidth(1);
    pdf.line(timelineStartX, timelineY, timelineEndX, timelineY);
    
    // Timeline points
    const point1X = timelineStartX;
    const point2X = timelineStartX + ((timelineEndX - timelineStartX) * 0.5);
    const point3X = timelineEndX;
    
    // Draw points
    pdf.setFillColor(0, 123, 255);
    pdf.circle(point1X, timelineY, 3, 'F');
    pdf.circle(point2X, timelineY, 3, 'F');
    pdf.circle(point3X, timelineY, 3, 'F');
    
    // Add labels
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(8);
    pdf.setTextColor(80, 80, 80);
    pdf.text('Start', point1X, timelineY + 8, {align: 'center'});
    pdf.text(`Report (${reportDelivery} days)`, point2X, timelineY + 8, {align: 'center'});
    pdf.text(`Completion (${projectDuration} days)`, point3X, timelineY + 8, {align: 'center'});
    
    currentY += 40;
    
    const scheduleText = `The Engagement Letter requires ${vendorName} to confirm the review will be completed within ${projectDuration} days following ${clientName} approval of this Agreement.`;
    currentY = addParagraph(scheduleText, currentY);
    // currentY += 10;
    
    const reportText = `Within ${reportDelivery} days of completing the Pen Test, ${vendorName} will prepare a written report detailing the findings of the Pen Test ("Pen Test Report"). Upon completion, ${vendorName} will simultaneously deliver the Report to the members of the Board of Directors of ${clientName}.`;
    currentY = addParagraph(reportText, currentY);
    currentY += 10;
    
    // Add Acceptance section
    if (!hasEnoughSpace(currentY)) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 22;
    }
    currentY = addSectionTitle('5. ACCEPTANCE OF PROPOSED SERVICES', currentY);
    
    // Add decorative elements for included testing
    pdf.setFillColor(230, 240, 255);
    pdf.roundedRect(20, currentY, pdf.internal.pageSize.width - 40, 10, 2, 2, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(0, 80, 170);
    pdf.text('I. Security Testing May Include', 25, currentY + 7);
    currentY += 15;
    
    // Add included testing items with checkmarks
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    
    includedTestingItems.forEach(item => {
      // Draw checkmark
      pdf.setFillColor(0, 180, 0);
      pdf.circle(25, currentY + 4, 2, 'F');
      
      // Add item text
      const splitItem = pdf.splitTextToSize(item, pdf.internal.pageSize.width - 60);
      pdf.text(splitItem, 30, currentY+5);
      
      // Calculate height needed for this item
      const itemHeight = splitItem.length * 5;
      currentY += itemHeight + 5;
      
      // Check if we need a new page
      if (currentY > pdf.internal.pageSize.height - 40) {
        pdf.addPage();
        pageNumber++;
        addHeader(pageNumber);
        addFooter();
        currentY = 40;
      }
    });
    
    currentY += 5;
    
    // Check if enough space remains for the next section
    if (!hasEnoughSpace(currentY)) {
      pdf.addPage();
      pageNumber++;
      addHeader(pageNumber);
      addFooter();
      currentY = 22;
    }
    
    // Add decorative elements for excluded testing
    pdf.setFillColor(255, 240, 240);
    pdf.roundedRect(20, currentY, pdf.internal.pageSize.width - 40, 10, 2, 2, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(11);
    pdf.setTextColor(170, 0, 0);
    pdf.text('II. Security Testing Will Not Include', 25, currentY + 7);
    currentY += 15;
    
    // Add excluded testing items with X marks
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    
    excludedTestingItems.forEach(item => {
      // Draw X mark
      pdf.setDrawColor(180, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.line(23, currentY, 27, currentY + 4);
      pdf.line(23, currentY + 4, 27, currentY);
      
      // Add item text
      const splitItem = pdf.splitTextToSize(item, pdf.internal.pageSize.width - 60);
      pdf.text(splitItem, 30, currentY+4);
      
      // Calculate height needed for this item
      const itemHeight = splitItem.length * 5;
      currentY += itemHeight + 5;
      
      // Check if we need a new page
      if (currentY > pdf.internal.pageSize.height - 40) {
        pdf.addPage();
        pageNumber++;
        addHeader(pageNumber);
        addFooter();
        currentY = 40;
      }
    });
    
    // Add Reporting Requirements section - Always start on new page
    pdf.addPage();
    pageNumber++;
    addHeader(pageNumber);
    addFooter();
    currentY = 22;  // Starting at Y position 22
    
    currentY = addSectionTitle('6. REPORTING REQUIREMENTS', currentY);
    
    // Add reporting icon
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setFillColor(230, 240, 255);
    // pdf.roundedRect(pdf.internal.pageSize.width - 60, currentY - 10, 30, 30, 2, 2, 'F');
    
    // Draw document icon
    // const iconX = pdf.internal.pageSize.width - 45;
    // const iconY = currentY + 5;
    // pdf.setFillColor(0, 123, 255);
    // pdf.rect(iconX - 7, iconY - 7, 14, 16, 'F');
    // pdf.setFillColor(255, 255, 255);
    // pdf.rect(iconX - 5, iconY - 5, 10, 2, 'F');
    // pdf.rect(iconX - 5, iconY - 1, 10, 2, 'F');
    // pdf.rect(iconX - 5, iconY + 3, 10, 2, 'F');
    
    currentY = addSubsectionTitle('I. Periodic Reports to Management', currentY);    
    const reportingText = `${vendorName} will report to ${clientName} at regular intervals and in a form to be mutually agreed, no less than every ${reportFrequency} days, concerning the status of its performance of services under this Agreement. At a minimum, ${vendorName}'s reporting will identify any respects in which the accomplishment of milestones set forth in the Pen Test Project Plan is at risk, any need(s) for assistance from ${clientName}, and any findings or observations believed by ${vendorName} to warrant inclusion in the Pen Test Report.`;
    currentY = addParagraph(reportingText, currentY);
    // currentY += 10;
    
    currentY = addSubsectionTitle('II. Ad Hoc Reports to Management', currentY);
    // currentY += 5;
    
    const adhocText = `Managing Directors assigned by ${vendorName} to this engagement shall be reasonably available to ${clientName} management by telephone, e-mail, or in-person for ad hoc consultations and status reports throughout the period of this Agreement.`;
    currentY = addParagraph(adhocText, currentY);
    // currentY += 10;
    
    currentY = addSubsectionTitle('III. Reporting to the Board', currentY);
    // currentY += 5;
    
    const boardText = `Upon reasonable notice, ${vendorName} will report to the Board of ${clientName}, or any committee of the Board charged with oversight of ${clientName}'s efforts to comply with the Engagement Letter for the purpose of discussing the status of ${vendorName}'s provision of services pursuant to this Agreement and any findings or observations ${vendorName} may have made in the course of providing such services.`;
    currentY = addParagraph(boardText, currentY);
    // currentY += 10;
    
    currentY = addSubsectionTitle('IV. Reporting to the CLIENT', currentY);
    // currentY += 5;
    
    const clientText = `If requested by ${clientName}, ${vendorName} will meet with representatives of the ${clientName} to discuss the status of the Pen Test, the findings set forth in the Pen Test Report, or any other matters germane to this engagement.`;
    currentY = addParagraph(clientText, currentY);
    // currentY += 10;
    
    // Add Terms and Conditions section - Always start on new page
    pdf.addPage();
    pageNumber++;
    addHeader(pageNumber);
    addFooter();
    currentY = 22;  // Starting at Y position 22
    
    currentY = addSectionTitle('7. TERMS AND CONDITIONS', currentY);
    
    // Add decorative legal scales icon
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setFillColor(230, 240, 255);
    // pdf.roundedRect(pdf.internal.pageSize.width - 60, currentY - 10, 30, 30, 2, 2, 'F');
    
    // Draw scales icon
    // const scalesX = pdf.internal.pageSize.width - 45;
    // const scalesY = currentY + 5;
    // pdf.setDrawColor(0, 80, 170);
    // pdf.setLineWidth(0.5);
    // // Draw the balance beam
    // pdf.line(scalesX - 10, scalesY, scalesX + 10, scalesY);
    // // Draw the stand
    // pdf.line(scalesX, scalesY, scalesX, scalesY - 5);
    // pdf.line(scalesX - 3, scalesY - 5, scalesX + 3, scalesY - 5);
    // // Draw the scales
    // pdf.circle(scalesX - 7, scalesY + 3, 3);
    // pdf.circle(scalesX + 7, scalesY + 3, 3);
    
    currentY = addSubsectionTitle('A. DEFINITIONS', currentY);
    currentY += 5;
    
    // Add definitions with styled numbering
    const definitions = [
      { term: '"Affiliates"', definition: `means ${clientName} and any present or future subsidiary thereof.` },
      { term: '"Confidential Information"', definition: 'means any and all information, including trade secrets, knowhow and proprietary information, techniques, plans or any other information relating to the business of a Party.' },
      { term: '"Customer/Consumer Information"', definition: `means any and all information or data that is provided by, through or on behalf of ${clientName} or any Affiliate to any ${vendorName} Personnel.` },
      { term: '"Deliverables"', definition: `means materials that ${vendorName} will furnish to ${clientName} as a result of the services performed under this Agreement, including, but not limited to the Pen Test Report.` },
      { term: '"Intellectual Property Rights"', definition: 'means all patents, patent applications, copyrights, trade secrets, service marks, trademarks, trade names, and other proprietary and intellectual property rights.' }
    ];
    
    definitions.forEach((item, index) => {
      // Draw numbered circle
      pdf.setFillColor(230, 240, 255);
      pdf.circle(25, currentY + 2, 4, 'F');  // Reduced radius from 6 to 4
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(7);  // Slightly smaller font for better fit
      pdf.setTextColor(60, 60, 60);
      pdf.text((index + 1).toString(), 25, currentY + 2, {align: 'center', baseline: 'middle'});
      
      // Add term and definition
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(60, 60, 60);
      pdf.text(item.term, 35, currentY);
      
      pdf.setFont('helvetica', 'normal');
      const splitDef = pdf.splitTextToSize(item.definition, pdf.internal.pageSize.width - 70);
      pdf.text(splitDef, 35, currentY + 5);
      
      // Calculate height needed for this item
      const itemHeight = splitDef.length * 5 + 10;
      currentY += itemHeight;
      
      // Check if we need a new page
      if (currentY > pdf.internal.pageSize.height - 40) {
        pdf.addPage();
        pageNumber++;
        addHeader(pageNumber);
        addFooter();
        currentY = 40;
      }
    });
    
    // Add signature section at the end with styling
    // pdf.addPage();
    // pageNumber++;
    // addHeader(pageNumber);
    // addFooter();
    
    // // Add decorative background for signature page
    // pdf.setFillColor(245, 245, 250);
    // pdf.rect(0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height, 'F');
    
    // // Add decorative top border
    // pdf.setFillColor(0, 123, 255, 0.7);
    // pdf.rect(0, 0, pdf.internal.pageSize.width, 15, 'F');
    
    // // Add decorative bottom border
    // pdf.setFillColor(0, 123, 255, 0.7);
    // pdf.rect(0, pdf.internal.pageSize.height - 15, pdf.internal.pageSize.width, 15, 'F');
    
    // // Re-add header and footer since we covered them
    // addHeader(pageNumber);
    // addFooter();
    
    // // Add decorative element
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setFillColor(0, 123, 255, 0.1);
    // pdf.roundedRect(20, 60, pdf.internal.pageSize.width - 40, 30, 3, 3, 'F');
    
    // // Signature title with styling
    // pdf.setFont('helvetica', 'bold');
    // pdf.setFontSize(16);
    // pdf.setTextColor(0, 80, 170);
    // pdf.text('IN WITNESS WHEREOF', pdf.internal.pageSize.width/2, 75, {align: 'center'});
    
    // pdf.setFont('helvetica', 'normal');
    // pdf.setFontSize(11);
    // pdf.setTextColor(80, 80, 80);
    // pdf.text('the parties have executed this Agreement as of the date first written above.', pdf.internal.pageSize.width/2, 85, {align: 'center'});
    
    // // Add document seal/stamp image placeholder
    // pdf.setDrawColor(200, 200, 200);
    // pdf.setFillColor(245, 245, 245, 0.7);
    // pdf.circle(pdf.internal.pageSize.width/2, 120, 25, 'FD');
    
    // // Add text in the seal
    // pdf.setFont('helvetica', 'bold');
    // pdf.setFontSize(8);
    // pdf.setTextColor(100, 100, 100);
    // pdf.text('OFFICIAL', pdf.internal.pageSize.width/2, 115, {align: 'center'});
    // pdf.text('DOCUMENT', pdf.internal.pageSize.width/2, 122, {align: 'center'});
    // pdf.text('SEAL', pdf.internal.pageSize.width/2, 129, {align: 'center'});
    
    // // Draw radial lines in the seal
    // pdf.setDrawColor(180, 180, 180);
    // pdf.setLineWidth(0.2);
    // for (let i = 0; i < 12; i++) {
    //   const angle = (i * 30) * Math.PI / 180;
    //   const innerX = pdf.internal.pageSize.width/2 + Math.cos(angle) * 15;
    //   const innerY = 120 + Math.sin(angle) * 15;
    //   const outerX = pdf.internal.pageSize.width/2 + Math.cos(angle) * 25;
    //   const outerY = 120 + Math.sin(angle) * 25;
    //   pdf.line(innerX, innerY, outerX, outerY);
    // }

    // // Signature blocks with styling
    // const signatureY = 160;
    // const leftX = 40;
    // const rightX = pdf.internal.pageSize.width - 80;

    // // Client signature box
    // pdf.setFillColor(255, 255, 255, 0.8);
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setLineWidth(0.5);
    // pdf.roundedRect(leftX - 15, signatureY - 15, 90, 100, 3, 3, 'FD');
    
    // // Add decorative corner elements to client box
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setLineWidth(1);
    // // Top left corner
    // pdf.line(leftX - 15, signatureY - 5, leftX - 5, signatureY - 15);
    // // Top right corner
    // pdf.line(leftX + 65, signatureY - 15, leftX + 75, signatureY - 5);
    // // Bottom left corner
    // pdf.line(leftX - 15, signatureY + 75, leftX - 5, signatureY + 85);
    // // Bottom right corner
    // pdf.line(leftX + 65, signatureY + 85, leftX + 75, signatureY + 75);
    
    // pdf.setFont('helvetica', 'bold');
    // pdf.setFontSize(12);
    // pdf.setTextColor(0, 80, 170);
    // pdf.text('CLIENT', leftX + 30, signatureY, {align: 'center'});
    // pdf.text(clientName, leftX + 30, signatureY + 10, {align: 'center'});
    
    // pdf.setDrawColor(100, 100, 100);
    // pdf.setLineWidth(0.2);
    // pdf.line(leftX, signatureY + 35, leftX + 60, signatureY + 35);
    
    // pdf.setFont('helvetica', 'normal');
    // pdf.setFontSize(9);
    // pdf.setTextColor(80, 80, 80);
    // pdf.text('Authorized Signature', leftX + 30, signatureY + 40, {align: 'center'});

    // pdf.line(leftX, signatureY + 55, leftX + 60, signatureY + 55);
    // pdf.text('Name/Title', leftX + 30, signatureY + 60, {align: 'center'});

    // pdf.line(leftX, signatureY + 75, leftX + 60, signatureY + 75);
    // pdf.text('Date', leftX + 30, signatureY + 80, {align: 'center'});

    // // Vendor signature box
    // pdf.setFillColor(255, 255, 255, 0.8);
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setLineWidth(0.5);
    // pdf.roundedRect(rightX - 15, signatureY - 15, 90, 100, 3, 3, 'FD');
    
    // // Add decorative corner elements to vendor box
    // pdf.setDrawColor(0, 123, 255);
    // pdf.setLineWidth(1);
    // // Top left corner
    // pdf.line(rightX - 15, signatureY - 5, rightX - 5, signatureY - 15);
    // // Top right corner
    // pdf.line(rightX + 65, signatureY - 15, rightX + 75, signatureY - 5);
    // // Bottom left corner
    // pdf.line(rightX - 15, signatureY + 75, rightX - 5, signatureY + 85);
    // // Bottom right corner
    // pdf.line(rightX + 65, signatureY + 85, rightX + 75, signatureY + 75);
    
    // pdf.setFont('helvetica', 'bold');
    // pdf.setFontSize(12);
    // pdf.setTextColor(0, 80, 170);
    // pdf.text('VENDOR', rightX + 30, signatureY, {align: 'center'});
    // pdf.text(vendorName, rightX + 30, signatureY + 10, {align: 'center'});
    
    // pdf.setDrawColor(100, 100, 100);
    // pdf.setLineWidth(0.2);
    // pdf.line(rightX, signatureY + 35, rightX + 60, signatureY + 35);
    
    // pdf.setFont('helvetica', 'normal');
    // pdf.setFontSize(9);
    // pdf.setTextColor(80, 80, 80);
    // pdf.text('Authorized Signature', rightX + 30, signatureY + 40, {align: 'center'});

    // pdf.line(rightX, signatureY + 55, rightX + 60, signatureY + 55);
    // pdf.text('Name/Title', rightX + 30, signatureY + 60, {align: 'center'});

    // pdf.line(rightX, signatureY + 75, rightX + 60, signatureY + 75);
    // pdf.text('Date', rightX + 30, signatureY + 80, {align: 'center'});
    
    // // Add a final note at the bottom
    // pdf.setFont('helvetica', 'italic');
    // pdf.setFontSize(8);
    // pdf.setTextColor(100, 100, 100);
    // pdf.text('This document is confidential and contains proprietary information.', 
    //          pdf.internal.pageSize.width/2, pdf.internal.pageSize.height - 25, {align: 'center'});
    
    // Save the PDF with a formatted filename
    const formattedDate = new Date().toISOString().split('T')[0];
    const safeClientName = clientName.replace(/[^a-z0-9]/gi, '_');
    pdf.save(`${safeClientName}_PenTest_Engagement_Letter_${formattedDate}.pdf`);
  };

  const [clientName, setClientName] = useState('CLIENT NAME');
  const [clientAddress, setClientAddress] = useState('CLIENT ADDRESS');
  const [vendorName, setVendorName] = useState('VENDOR NAME');
  const [vendorAddress, setVendorAddress] = useState('VENDOR ADDRESS');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [contactName, setContactName] = useState('CONTACT NAME');
  const [projectDuration, setProjectDuration] = useState(120);
  const [reportDelivery, setReportDelivery] = useState(30);
  const [reportFrequency, setReportFrequency] = useState(14);
  const [includeWebTesting, setIncludeWebTesting] = useState(true);
  const [includeNetworkTesting, setIncludeNetworkTesting] = useState(true);
  const [includeDatabaseTesting, setIncludeDatabaseTesting] = useState(true);
  const [includeRoleTesting, setIncludeRoleTesting] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  // Table data
  const [systemInfoTable, setSystemInfoTable] = useState([
    { id: 1, identifier: '', systemName: '', abbreviation: '' }
  ]);

  const [locationTable, setLocationTable] = useState([
    { id: 1, siteName: '', address: '', description: '' }
  ]);

  const [ipAddressTable, setIpAddressTable] = useState([
    { id: 1, ipAddress: '', hostname: '', software: '', functionDesc: '' }
  ]);

  const [webAppTable, setWebAppTable] = useState([
    { id: 1, url: '', ipAddress: '', functionDesc: '' }
  ]);

  const [databaseTable, setDatabaseTable] = useState([
    { id: 1, name: '', hostname: '', ipAddress: '', additionalInfo: '' }
  ]);

  const [rolesTable, setRolesTable] = useState([
    { id: 1, roleName: '', userId: '', functionsDesc: '' }
  ]);

  // Testing scope items (editable)
  const [includedTestingItems, setIncludedTestingItems] = useState([
    'Port scans and other network service interaction and queries',
    'Network sniffing, traffic monitoring, traffic analysis, and host discovery',
    'Attempted logins or other use of systems, with any account name/password',
    'Attempted SQL injection and other forms of input parameter testing',
    'Use of exploit code for leveraging discovered vulnerabilities',
    'Password cracking via capture and scanning of authentication databases',
    'Spoofing or deceiving servers regarding network traffic',
    'Altering the running system configuration except where denial of service would result',
    'Adding user accounts'
  ]);

  const [excludedTestingItems, setExcludedTestingItems] = useState([
    'Changes to assigned user passwords',
    'Modification of user files or system files',
    'Telephone modem probes and scans (active and passive)',
    'Intentional viewing of staff email, Internet caches, and/or personnel cookie files',
    'Denial of Service attacks (Smurf, land, SYN flood, etc.)',
    'Exploits that will introduce new weaknesses to the system',
    'Intentional introduction of malicious code (viruses, Trojans, worms, etc.)'
  ]);

  // New item inputs
  const [newIncludedItem, setNewIncludedItem] = useState('');
  const [newExcludedItem, setNewExcludedItem] = useState('');

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Table management functions
  const addTableRow = (table, setTable, tableType) => {
    const newId = table.length > 0 ? Math.max(...table.map(row => row.id)) + 1 : 1;
    let newRow = { id: newId };

    // Initialize fields based on table type
    if (tableType === 'systemInfo') {
      newRow = { ...newRow, identifier: '', systemName: '', abbreviation: '' };
    } else if (tableType === 'location') {
      newRow = { ...newRow, siteName: '', address: '', description: '' };
    } else if (tableType === 'ipAddress') {
      newRow = { ...newRow, ipAddress: '', hostname: '', software: '', functionDesc: '' };
    } else if (tableType === 'webApp') {
      newRow = { ...newRow, url: '', ipAddress: '', functionDesc: '' };
    } else if (tableType === 'database') {
      newRow = { ...newRow, name: '', hostname: '', ipAddress: '', additionalInfo: '' };
    } else if (tableType === 'roles') {
      newRow = { ...newRow, roleName: '', userId: '', functionsDesc: '' };
    }

    setTable([...table, newRow]);
  };

  const removeTableRow = (table, setTable, id) => {
    if (table.length <= 1) return; // Keep at least one row
    setTable(table.filter(row => row.id !== id));
  };

  const updateTableCell = (table, setTable, id, field, value) => {
    setTable(
      table.map(row =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  // Functions to add and remove testing scope items
  const addIncludedItem = () => {
    if (newIncludedItem.trim() !== '') {
      setIncludedTestingItems([...includedTestingItems, newIncludedItem]);
      setNewIncludedItem('');
    }
  };

  const removeIncludedItem = (index) => {
    const updatedItems = [...includedTestingItems];
    updatedItems.splice(index, 1);
    setIncludedTestingItems(updatedItems);
  };

  const addExcludedItem = () => {
    if (newExcludedItem.trim() !== '') {
      setExcludedTestingItems([...excludedTestingItems, newExcludedItem]);
      setNewExcludedItem('');
    }
  };

  const removeExcludedItem = (index) => {
    const updatedItems = [...excludedTestingItems];
    updatedItems.splice(index, 1);
    setExcludedTestingItems(updatedItems);
  };

  // Renders an editable table
  const renderEditableTable = (table, setTable, headers, fields, tableType) => {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
          <thead>
            <tr className="bg-gray-200">
              {headers.map((header, index) => (
                <th key={index} className="border border-gray-300 p-2 text-left">{header}</th>
              ))}
              <th className="border border-gray-300 p-2 text-center w-16">Actions</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.id} className="bg-gray-50">
                {fields.map((field, index) => (
                  <td key={index} className="border border-gray-300 p-2">
                    <input
                      type="text"
                      value={row[field] || ''}
                      onChange={(e) => updateTableCell(table, setTable, row.id, field, e.target.value)}
                      className="w-full p-1 border border-gray-300 rounded"
                    />
                  </td>
                ))}
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    onClick={() => removeTableRow(table, setTable, row.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove row"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={() => addTableRow(table, setTable, tableType)}
          className="mt-1 mb-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
        >
          Add Row
        </button>
      </div>
    );
  };

  const Section = ({ title, id, children }) => {
    const isPrinting = false; // We'll assume we're not printing by default

    return (
      <div className="mb-6">
        <div
          className="flex justify-between items-center cursor-pointer bg-gray-100 p-3 border-b-2 border-gray-300 font-bold no-print"
          onClick={() => toggleSection(id)}
        >
          <h2 className="text-lg">{title}</h2>
          <span>{expandedSections[id] ? '▼' : '►'}</span>
        </div>
        {/* Always show content when printing, otherwise respect expanded state */}
        <div className={`p-4 border border-gray-200 ${isPrinting || expandedSections[id] ? 'block expanded-for-print' : 'hidden'}`}>
          {children}
        </div>
      </div>
    );
  };

  const SubSection = ({ title, children }) => {
    return (
      <div className="mb-4">
        <h3 className="font-bold text-md mb-2">{title}</h3>
        {children}
      </div>
    );
  };

  return (

    <div className="w-full mx-auto bg-white text-gray-800">
      <style>
        {`
          @media print {
            .no-print, .no-print * {
              display: none !important;
            }
            
            .print-only {
              display: block !important;
            }
            
            body {
              font-size: 12pt;
              margin: 0;
              padding: 0;
            }
            
            .page-break {
              page-break-before: always;
            }
            
            /* Ensure proper table formatting in print */
            table {
              width: 100%;
              border-collapse: collapse;
            }
            
            table, th, td {
              border: 1px solid #ddd;
            }
            
            th, td {
              padding: 8px;
              text-align: left;
            }
            
            /* Make sure expanded sections stay expanded in print */
            .expanded-for-print {
              display: block !important;
            }
          }
        `}
      </style>

      {/* Export button - will not show in PDF */}
      <div className="sticky top-0 bg-white z-10 p-4 mb-4 border-b border-gray-200 flex justify-between items-center no-print">
        <h2 className="text-xl font-bold">Pen Test Engagement Letter</h2>
        <button
          onClick={handleExportPDF}

          className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 flex items-center"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export as PDF
        </button>
      </div>

      {/* Printable content */}
      <div ref={printContentRef} className="p-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-2">PEN TEST ENGAGEMENT LETTER</h1>
        </div>

        {/* Form for key information */}
        <div className="mb-8 p-4 border border-gray-300 bg-gray-50 rounded no-print">
          <div className="mb-6" ref={printContentRef}  >
            <h3 className="text-md font-bold mb-2 border-b border-gray-300 pb-1">Client &amp; Vendor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client Name:</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client Address:</label>
                <input
                  type="text"
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vendor Name:</label>
                <input
                  type="text"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Vendor Address:</label>
                <input
                  type="text"
                  value={vendorAddress}
                  onChange={(e) => setVendorAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-bold mb-2 border-b border-gray-300 pb-1">Engagement Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date:</label>
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Name:</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Duration (days):</label>
                <input
                  type="number"
                  value={projectDuration}
                  onChange={(e) => setProjectDuration(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Report Delivery (days after completion):</label>
                <input
                  type="number"
                  value={reportDelivery}
                  onChange={(e) => setReportDelivery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status Report Frequency (days):</label>
                <input
                  type="number"
                  value={reportFrequency}
                  onChange={(e) => setReportFrequency(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-bold mb-2 border-b border-gray-300 pb-1">Testing Scope Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="webTesting"
                  checked={includeWebTesting}
                  onChange={(e) => setIncludeWebTesting(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="webTesting">Include Web Application Testing</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="networkTesting"
                  checked={includeNetworkTesting}
                  onChange={(e) => setIncludeNetworkTesting(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="networkTesting">Include Network Testing</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="databaseTesting"
                  checked={includeDatabaseTesting}
                  onChange={(e) => setIncludeDatabaseTesting(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="databaseTesting">Include Database Testing</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="roleTesting"
                  checked={includeRoleTesting}
                  onChange={(e) => setIncludeRoleTesting(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="roleTesting">Include Role-Based Testing</label>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-bold mb-2 border-b border-gray-300 pb-1">Security Testing May Include</h3>
            <div className="mb-4">
              <ul className="list-disc pl-8 mb-4">
                {includedTestingItems.map((item, index) => (
                  <li key={index} className="mb-1 flex justify-between">
                    <span>{item}</span>
                    <button
                      onClick={() => removeIncludedItem(index)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex">
                <input
                  type="text"
                  value={newIncludedItem}
                  onChange={(e) => setNewIncludedItem(e.target.value)}
                  placeholder="Add new testing item..."
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l"
                />
                <button
                  onClick={addIncludedItem}
                  className="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="mb-2">
            <h3 className="text-md font-bold mb-2 border-b border-gray-300 pb-1">Security Testing Will Not Include</h3>
            <div className="mb-4">
              <ul className="list-disc pl-8 mb-4">
                {excludedTestingItems.map((item, index) => (
                  <li key={index} className="mb-1 flex justify-between">
                    <span>{item}</span>
                    <button
                      onClick={() => removeExcludedItem(index)}
                      className="ml-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex">
                <input
                  type="text"
                  value={newExcludedItem}
                  onChange={(e) => setNewExcludedItem(e.target.value)}
                  placeholder="Add new excluded item..."
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l"
                />
                <button
                  onClick={addExcludedItem}
                  className="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-md font-bold mb-2 border-b border-gray-300 pb-1">System &amp; Infrastructure Tables</h3>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">System Information Table</h4>
              {renderEditableTable(
                systemInfoTable,
                setSystemInfoTable,
                ['Unique Identifier', 'Information System Name', 'Information System Abbreviation'],
                ['identifier', 'systemName', 'abbreviation'],
                'systemInfo'
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">Location Components Table</h4>
              {renderEditableTable(
                locationTable,
                setLocationTable,
                ['Data Center Site Name', 'Address', 'Description of Components'],
                ['siteName', 'address', 'description'],
                'location'
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">IP Addresses Table</h4>
              {renderEditableTable(
                ipAddressTable,
                setIpAddressTable,
                ['IP Address(s) or Ranges', 'Hostname', 'Software & Version', 'Function'],
                ['ipAddress', 'hostname', 'software', 'functionDesc'],
                'ipAddress'
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">Web Applications Table</h4>
              {renderEditableTable(
                webAppTable,
                setWebAppTable,
                ['Web URL', 'IP Address', 'Function'],
                ['url', 'ipAddress', 'functionDesc'],
                'webApp'
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">Databases Table</h4>
              {renderEditableTable(
                databaseTable,
                setDatabaseTable,
                ['Database Name', 'Hostname', 'IP Address', 'Additional Info'],
                ['name', 'hostname', 'ipAddress', 'additionalInfo'],
                'database'
              )}
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-1">Roles Table</h4>
              {renderEditableTable(
                rolesTable,
                setRolesTable,
                ['Role Name', 'Test User ID', 'Associated Functions'],
                ['roleName', 'userId', 'functionsDesc'],
                'roles'
              )}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-1 font-medium">{date}</p>
          <p className="mb-1">{clientName}</p>
          <p className="mb-4">{clientAddress}</p>

          <p>Dear {contactName},</p>
          <p className="mt-4">
            This letter agreement, if acceptable to and countersigned by you, will serve as the agreement ("Agreement")
            between {clientName} and {vendorName} governing {vendorName}'s conduct of the Pen Test ("Pen Test")
            required by the "Pen Test Section" of this Engagement Letter. The effective date of the Agreement (the "Effective Date")
            will be the date on which this letter agreement is executed by {clientName}. {vendorName} and {clientName} are
            each referred to herein as a "Party" and collectively, the "Parties."
          </p>
        </div>

        <Section title="1. BACKGROUND" id="background">
          <p>
            The {clientName} board requires, within 45 days of the date of the respective board meeting, to retain an
            independent consultant to conduct an independent security review of all {clientName} information systems.
            The review is to include a comprehensive vulnerability and risk assessment, security posture assessment, and
            assessment of security controls implemented across {clientName} information systems. This Agreement, together
            with its attachments, constitutes that engagement letter.
          </p>
        </Section>

        <Section title="2. ORGANIZATION OF THIS AGREEMENT" id="organization">
          <p>
            Section 3 of this document sets forth the scope of pen testing service, section 4 list the proposed services,
            section 5 prescribes the timing of pen testing services, section 6 defines reporting requirements and section 7
            sets forth the terms and conditions for this pen test assignment.
          </p>
        </Section>

        <Section title="3. SCOPE OF PEN TESTING SERVICE" id="scope">
          <p className="mb-4">
            The scope of the security tests that will be performed for the {clientName} is limited and well defined.
            Tests on systems and interfaces that are outside the boundary of the {clientName} are not included in this plan.
          </p>

          <SubSection title="I. System Name/Title">
            <p className="mb-2">The Information System that is undergoing testing as described in this Security Assessment Plan is named in Table 1-1.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-left">Unique Identifier</th>
                    <th className="border border-gray-300 p-2 text-left">Information System Name</th>
                    <th className="border border-gray-300 p-2 text-left">Information System Abbreviation</th>
                  </tr>
                </thead>
                <tbody>
                  {systemInfoTable.map((row) => (
                    <tr key={row.id} className="bg-gray-50">
                      <td className="border border-gray-300 p-2">{row.identifier}</td>
                      <td className="border border-gray-300 p-2">{row.systemName}</td>
                      <td className="border border-gray-300 p-2">{row.abbreviation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm mb-4">Table 1-1. Information System Name and Title</p>

            <p className="mb-2">The physical locations of all the different components that will be tested are described in Table 1-2.</p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2 text-left">Data Center Site Name</th>
                    <th className="border border-gray-300 p-2 text-left">Address</th>
                    <th className="border border-gray-300 p-2 text-left">Description of Components</th>
                  </tr>
                </thead>
                <tbody>
                  {locationTable.map((row) => (
                    <tr key={row.id} className="bg-gray-50">
                      <td className="border border-gray-300 p-2">{row.siteName}</td>
                      <td className="border border-gray-300 p-2">{row.address}</td>
                      <td className="border border-gray-300 p-2">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-sm mb-4">Table 1-2. Location of Components</p>
          </SubSection>

          <SubSection title="II. IP Addresses Slated for Testing">
            {includeNetworkTesting ? (
              <>
                <p className="mb-2">IP addresses, and network ranges, of the system that will be tested are noted in Table 1-3.</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">IP Address(s) or Ranges</th>
                        <th className="border border-gray-300 p-2 text-left">Hostname</th>
                        <th className="border border-gray-300 p-2 text-left">Software &amp; Version</th>
                        <th className="border border-gray-300 p-2 text-left">Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ipAddressTable.map((row) => (
                        <tr key={row.id} className="bg-gray-50">
                          <td className="border border-gray-300 p-2">{row.ipAddress}</td>
                          <td className="border border-gray-300 p-2">{row.hostname}</td>
                          <td className="border border-gray-300 p-2">{row.software}</td>
                          <td className="border border-gray-300 p-2">{row.functionDesc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm mb-4">Table 1-3. Components Slated for Testing</p>
              </>
            ) : (
              <p className="text-gray-600 italic">Network testing is not included in the scope of this engagement.</p>
            )}
          </SubSection>

          <SubSection title="III. Web Applications Slated for Testing">
            {includeWebTesting ? (
              <>
                <p className="mb-2">
                  Activities employed to perform role testing on web applications may include capturing POST and GET requests for each function.
                  The various web based applications that make up the system, and the logins and their associated roles that will be used for testing are noted by URL in Table 1-4.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">Web URL</th>
                        <th className="border border-gray-300 p-2 text-left">IP Address</th>
                        <th className="border border-gray-300 p-2 text-left">Function</th>
                      </tr>
                    </thead>
                    <tbody>
                      {webAppTable.map((row) => (
                        <tr key={row.id} className="bg-gray-50">
                          <td className="border border-gray-300 p-2">{row.url}</td>
                          <td className="border border-gray-300 p-2">{row.ipAddress}</td>
                          <td className="border border-gray-300 p-2">{row.functionDesc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm mb-4">Table 1-4. Application URLs Slated for Testing</p>
              </>
            ) : (
              <p className="text-gray-600 italic">Web application testing is not included in the scope of this engagement.</p>
            )}
          </SubSection>

          <SubSection title="IV. Databases Slated for Testing">
            {includeDatabaseTesting ? (
              <>
                <p className="mb-2">Databases that are slated for testing include those listed in Table 1-5.</p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">Database Name</th>
                        <th className="border border-gray-300 p-2 text-left">Hostname</th>
                        <th className="border border-gray-300 p-2 text-left">IP Address</th>
                        <th className="border border-gray-300 p-2 text-left">Additional Info</th>
                      </tr>
                    </thead>
                    <tbody>
                      {databaseTable.map((row) => (
                        <tr key={row.id} className="bg-gray-50">
                          <td className="border border-gray-300 p-2">{row.name}</td>
                          <td className="border border-gray-300 p-2">{row.hostname}</td>
                          <td className="border border-gray-300 p-2">{row.ipAddress}</td>
                          <td className="border border-gray-300 p-2">{row.additionalInfo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm mb-4">Table 1-5. Databases Slated for Testing</p>
              </>
            ) : (
              <p className="text-gray-600 italic">Database testing is not included in the scope of this engagement.</p>
            )}
          </SubSection>

          <SubSection title="V. Roles Slated for Testing">
            {includeRoleTesting ? (
              <>
                <p className="mb-2">
                  Role testing will be performed to test the authorization restrictions for each role. {vendorName} will access the system
                  while logged in as different user types and attempt to perform restricted functions as unprivileged users.
                  Functions and roles that will be tested are noted in Table 1-6.
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 mt-2 mb-2">
                    <thead>
                      <tr className="bg-gray-200">
                        <th className="border border-gray-300 p-2 text-left">Role Name</th>
                        <th className="border border-gray-300 p-2 text-left">Test User ID</th>
                        <th className="border border-gray-300 p-2 text-left">Associated Functions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rolesTable.map((row) => (
                        <tr key={row.id} className="bg-gray-50">
                          <td className="border border-gray-300 p-2">{row.roleName}</td>
                          <td className="border border-gray-300 p-2">{row.userId}</td>
                          <td className="border border-gray-300 p-2">{row.functionsDesc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-center text-sm mb-4">Table 1-6. Role Based Testing</p>
              </>
            ) : (
              <p className="text-gray-600 italic">Role-based testing is not included in the scope of this engagement.</p>
            )}
          </SubSection>
        </Section>

        <Section title="4. EXPECTED TIME DURATION AND SCHEDULE" id="schedule">
          <SubSection title="I. Pen Test">
            <p>
              The Engagement Letter requires {vendorName} to confirm the review will be completed within {projectDuration} days following {clientName} approval of this Agreement.
            </p>
          </SubSection>

          <SubSection title="II. Report of Findings">
            <p>
              Within {reportDelivery} days of completing the Pen Test, {vendorName} will prepare a written report detailing the findings of the Pen Test
              ("Pen Test Report"). Upon completion, {vendorName} will simultaneously deliver the Report to the members of the Board of Directors of {clientName}.
            </p>
          </SubSection>
        </Section>

        <Section title="5. ACCEPTANCE OF PROPOSED SERVICES" id="acceptance">
          <SubSection title="I. Security Testing May Include">
            <p className="mb-2">Security testing may include the following activities:</p>
            <ul className="list-disc pl-8 mb-4">
              {includedTestingItems.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))}
            </ul>
          </SubSection>

          <SubSection title="II. Security Testing Will Not Include">
            <p className="mb-2">Security testing will not include any of the following activities:</p>
            <ul className="list-disc pl-8 mb-4">
              {excludedTestingItems.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
              ))}
            </ul>
          </SubSection>
        </Section>

        <Section title="6. REPORTING REQUIREMENTS" id="reporting">
          <SubSection title="I. Periodic Reports to Management">
            <p>
              {vendorName} will report to {clientName} at regular intervals and in a form to be mutually agreed, no less than every
              {reportFrequency} days, concerning the status of its performance of services under this Agreement. At a minimum, {vendorName}'s reporting
              will identify any respects in which the accomplishment of milestones set forth in the Pen Test Project Plan is at risk, any need(s)
              for assistance from {clientName}, and any findings or observations believed by {vendorName} to warrant inclusion in the Pen Test Report.
            </p>
          </SubSection>

          <SubSection title="II. Ad Hoc Reports to Management">
            <p>
              Managing Directors assigned by {vendorName} to this engagement shall be reasonably available to {clientName} management by telephone, e-mail,
              or in-person for ad hoc consultations and status reports throughout the period of this Agreement.
            </p>
          </SubSection>

          <SubSection title="III. Reporting to the Board">
            <p>
              Upon reasonable notice, {vendorName} will report to the Board of {clientName}, or any committee of the Board charged with oversight of
              {clientName}'s efforts to comply with the Engagement Letter for the purpose of discussing the status of {vendorName}'s provision of services
              pursuant to this Agreement and any findings or observations {vendorName} may have made in the course of providing such services.
            </p>
          </SubSection>

          <SubSection title="IV. Reporting to the CLIENT">
            <p>
              If requested by {clientName}, {vendorName} will meet with representatives of the {clientName} to discuss the status of the Pen Test, the findings
              set forth in the Pen Test Report, or any other matters germane to this engagement.
            </p>
          </SubSection>
        </Section>

        <Section title="7. TERMS AND CONDITIONS" id="terms">
          <SubSection title="A. DEFINITIONS">
            <ol className="list-decimal pl-8 mb-4">
              <li className="mb-2">
                <strong>"Affiliates"</strong> means {clientName} and any present or future subsidiary thereof.
              </li>
              <li className="mb-2">
                <strong>"Confidential Information"</strong> means any and all information, including trade secrets, knowhow and proprietary information, techniques, plans or any other information relating to the business of a Party.
              </li>
              <li className="mb-2">
                <strong>"Customer/Consumer Information"</strong> means any and all information or data that is provided by, through or on behalf of {clientName} or any Affiliate to any {vendorName} Personnel.
              </li>
              <li className="mb-2">
                <strong>"Deliverables"</strong> means materials that {vendorName} will furnish to {clientName} as a result of the services performed under this Agreement, including, but not limited to the Pen Test Report.
              </li>
              <li className="mb-2">
                <strong>"Intellectual Property Rights"</strong> means all patents, patent applications, copyrights, trade secrets, service marks, trademarks, trade names, and other proprietary and intellectual property rights.
              </li>
              <li className="mb-2">
                <strong>"Services"</strong> means the services to be provided by {vendorName} under this Agreement.
              </li>
              <li className="mb-2">
                <strong>"{vendorName} Personnel"</strong> means {vendorName} and each of its employees, along with any subcontractors or agents of {vendorName}.
              </li>
            </ol>
          </SubSection>

          <SubSection title="B. COMPLIANCE WITH ENGAGEMENT LETTER">
            <p>
              The Parties intend this Agreement to comply fully with the requirements of the Pen Test Section of the Engagement Letter.
              In the event that the {clientName} requires further refinement of this letter as a condition of its approval, the Parties
              agree to work together in good faith to make refinements acceptable to the {clientName}.
            </p>
          </SubSection>

          <SubSection title="C. INDEPENDENCE OF VENDOR CONDUCTING PEN TEST">
            <ol className="list-decimal pl-8 mb-4">
              <li className="mb-2">
                The Pen Test conducted by {vendorName} shall not be subject to the direction, control, supervision, oversight, or influence by {clientName}, its contractors or agents.
              </li>
              <li className="mb-2">
                {vendorName} agrees that it is solely responsible for the conduct and results of the Pen Test, in accordance with the requirements of this Engagement Letter.
              </li>
              <li className="mb-2">
                The conduct of the Pen Test shall be subject to the monitoring, oversight, and direction of the {clientName}.
              </li>
              <li className="mb-2">
                {vendorName} agrees to provide regular progress reports, updates and information concerning the conduct of the Pen Test to the {clientName}.
              </li>
              <li className="mb-2">
                {vendorName} will conduct the Pen Test using only personnel employed or retained by {vendorName} to perform the work required to complete the Pen Test.
              </li>
              <li className="mb-2">
                {vendorName} may utilize documents, materials or other information provided by {clientName}, and may communicate with {clientName}, its contractors or agents, in order to conduct the Pen Test.
              </li>
              <li className="mb-2">
                {vendorName} agrees that any legal advice needed in conducting the Pen Test shall be obtained from the outside law firm whose retention for that purpose will be approved in advance by the {clientName}.
              </li>
              <li className="mb-2">
                If the {clientName} determines, in its sole discretion, that {vendorName} has not been fully compliant with the foregoing standards, the {clientName} may retain a successor consultant.
              </li>
            </ol>
          </SubSection>
        </Section>

        <div className="mt-12">
          <div className="mb-8">
            <p className="text-center mb-2">IN WITNESS WHEREOF, the parties have executed this Agreement as of the date first written above.</p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-bold text-center mb-8">{clientName}</p>
              <div className="border-t border-black pt-2">
                <p className="text-center">Authorized Signature</p>
              </div>
              <div className="border-t border-black mt-8 pt-2">
                <p className="text-center">Name/Title</p>
              </div>
              <div className="border-t border-black mt-8 pt-2">
                <p className="text-center">Date</p>
              </div>
            </div>

            <div>
              <p className="font-bold text-center mb-8">{vendorName}</p>
              <div className="border-t border-black pt-2">
                <p className="text-center">Authorized Signature</p>
              </div>
              <div className="border-t border-black mt-8 pt-2">
                <p className="text-center">Name/Title</p>
              </div>
              <div className="border-t border-black mt-8 pt-2">
                <p className="text-center">Date</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 mb-4 border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-500 text-center">
            This template is provided for informational purposes only and should be reviewed by legal counsel before use.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PenTestEngagementLetter;
