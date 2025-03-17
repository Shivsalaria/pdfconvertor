import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = ({
  clientName,
  clientAddress,
  vendorName,
  vendorAddress,
  date,
  contactName,
  projectDuration,
  reportDelivery,
  reportFrequency,
  includeWebTesting,
  includeNetworkTesting,
  includeDatabaseTesting,
  includeRoleTesting,
  systemInfoTable,
  locationTable,
  ipAddressTable,
  webAppTable,
  databaseTable,
  rolesTable,
  includedTestingItems,
  excludedTestingItems
}) => {
  // Create new PDF document
  const pdf = new jsPDF('p', 'mm', 'a4');
  let pageNumber = 1;
  let currentY = 40;

  // Add watermark to each page
  const addWatermark = () => {
    // Save current styles
    const currentFontSize = pdf.getFontSize();
    const currentTextColor = pdf.getTextColor();
    const currentFontStyle = pdf.getFont();
    
    // Set watermark styles
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(60);
    pdf.setTextColor(230, 230, 230); // Light gray color
    
    // Add diagonal watermarks
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    
    // Add multiple watermarks to cover the page
    for(let i = 0; i < pageHeight; i += 100) {
      pdf.text('CONFIDENTIAL', pageWidth/2, i + 50, {
        align: 'center',
        angle: 45
      });
    }
    
    // Restore original styles
    pdf.setFontSize(currentFontSize);
    pdf.setTextColor(currentTextColor);
    pdf.setFont(currentFontStyle.fontName, currentFontStyle.fontStyle);
  };
  
  // Add header to each page
  const addHeader = () => {
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(14);
    pdf.setTextColor(0, 123, 255);
    pdf.text('PEN TEST ENGAGEMENT LETTER', pdf.internal.pageSize.width/2, 20, {align: 'center'});
  };
  
  // Add footer to each page
  const addFooter = () => {
    const pageHeight = pdf.internal.pageSize.height;
    
    pdf.setDrawColor(200, 200, 200);
    pdf.setLineWidth(0.5);
    pdf.line(20, pageHeight - 15, pdf.internal.pageSize.width - 20, pageHeight - 15);
    
    pdf.setFont('helvetica', 'italic');
    pdf.setFontSize(8);
    pdf.setTextColor(100, 100, 100);
    pdf.text('CONFIDENTIAL', pdf.internal.pageSize.width/2, pageHeight - 10, {align: 'center'});
    
    const currentDate = new Date().toLocaleDateString();
    pdf.text(`Generated on: ${currentDate}`, 20, pageHeight - 10);
    pdf.text(`Page ${pageNumber}`, pdf.internal.pageSize.width - 20, pageHeight - 10, {align: 'right'});
  };

  // Function to check and add new page if needed
  const checkAndAddNewPage = (requiredSpace) => {
    const pageHeight = pdf.internal.pageSize.height;
    if (currentY + requiredSpace > pageHeight - 20) {
      pdf.addPage();
      pageNumber++;
      addHeader();
      addWatermark();
      addFooter();
      currentY = 40;
    }
  };

  // Function to add a section title with styling
  const addSectionTitle = (title) => {
    checkAndAddNewPage(15);
    pdf.setFillColor(240, 240, 240);
    pdf.rect(20, currentY - 6, pdf.internal.pageSize.width - 40, 10, 'F');
    
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(0, 80, 170);
    pdf.text(title, 25, currentY);
    
    currentY += 15;
  };

  // Function to add text content
  const addText = (text, indent = 0) => {
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(60, 60, 60);
    
    const maxWidth = pdf.internal.pageSize.width - 40 - indent;
    const splitText = pdf.splitTextToSize(text, maxWidth);
    
    checkAndAddNewPage(splitText.length * 5 + 5);
    pdf.text(splitText, 20 + indent, currentY);
    currentY += (splitText.length * 5) + 5;
  };

  // Start building the PDF
  addHeader();
  addWatermark();
  addFooter();

  // Add client and vendor information
  addText(`${date}\n\n${clientName}\n${clientAddress}\n\nDear ${contactName},`);
  
  addText(`This letter agreement, if acceptable to and countersigned by you, will serve as the agreement ("Agreement") between ${clientName} and ${vendorName} governing ${vendorName}'s conduct of the Pen Test ("Pen Test") required by the "Pen Test Section" of this Engagement Letter.`);

  // Add sections
  addSectionTitle('1. BACKGROUND');
  addText(`The ${clientName} board requires, within 45 days of the date of the respective board meeting, to retain an independent consultant to conduct an independent security review of all ${clientName} information systems.`);

  addSectionTitle('2. SCOPE OF TESTING');
  // Add tables
  if (systemInfoTable.length > 0) {
    pdf.autoTable({
      startY: currentY,
      head: [['Unique Identifier', 'Information System Name', 'Information System Abbreviation']],
      body: systemInfoTable.map(row => [row.identifier, row.systemName, row.abbreviation]),
      margin: { left: 20, right: 20 },
      headStyles: { fillColor: [0, 123, 255] }
    });
    currentY = pdf.lastAutoTable.finalY + 10;
  }

  // Add testing scope items
  addSectionTitle('3. SECURITY TESTING INCLUDES');
  includedTestingItems.forEach(item => {
    addText(`• ${item}`, 5);
  });

  addSectionTitle('4. SECURITY TESTING EXCLUDES');
  excludedTestingItems.forEach(item => {
    addText(`• ${item}`, 5);
  });

  // Add project timeline
  addSectionTitle('5. PROJECT TIMELINE');
  addText(`Project Duration: ${projectDuration} days\nReport Delivery: ${reportDelivery} days after completion\nStatus Report Frequency: Every ${reportFrequency} days`);

  // Add signature section
  checkAndAddNewPage(60);
  currentY += 20;
  
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  
  const signatureY = currentY;
  
  // Client signature
  pdf.text(clientName, 40, signatureY);
  pdf.line(40, signatureY + 20, 120, signatureY + 20);
  pdf.text('Authorized Signature', 40, signatureY + 25);
  pdf.text('Date: _____________', 40, signatureY + 35);
  
  // Vendor signature
  pdf.text(vendorName, pdf.internal.pageSize.width - 120, signatureY);
  pdf.line(pdf.internal.pageSize.width - 120, signatureY + 20, pdf.internal.pageSize.width - 40, signatureY + 20);
  pdf.text('Authorized Signature', pdf.internal.pageSize.width - 120, signatureY + 25);
  pdf.text('Date: _____________', pdf.internal.pageSize.width - 120, signatureY + 35);

  // Save the PDF
  const formattedDate = new Date().toISOString().split('T')[0];
  const safeClientName = clientName.replace(/[^a-z0-9]/gi, '_');
  pdf.save(`${safeClientName}_PenTest_Engagement_Letter_${formattedDate}.pdf`);
}; 