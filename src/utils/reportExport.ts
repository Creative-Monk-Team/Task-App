import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ReportExportData {
  clientName: string;
  reportPeriod: { start: Date; end: Date };
  data: {
    websiteTraffic: any[];
    socialMedia: any[];
    topPages: any[];
    conversions: any[];
  };
}

export const exportReportToPDF = async (reportData: ReportExportData) => {
  try {
    // Create a temporary container for the report
    const reportContainer = document.createElement('div');
    reportContainer.style.position = 'absolute';
    reportContainer.style.left = '-9999px';
    reportContainer.style.width = '800px';
    reportContainer.style.backgroundColor = 'white';
    reportContainer.style.padding = '40px';
    reportContainer.style.fontFamily = 'Inter, sans-serif';
    
    // Generate HTML content for the report
    reportContainer.innerHTML = `
      <div style="margin-bottom: 40px;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <div style="width: 40px; height: 40px; background-color: #f97316; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 16px;">
            <span style="color: white; font-weight: bold; font-size: 20px;">B</span>
          </div>
          <div>
            <h1 style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">Analytics Report</h1>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">${reportData.clientName}</p>
          </div>
        </div>
        
        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
          <h2 style="margin: 0 0 10px 0; font-size: 16px; font-weight: 600; color: #374151;">Report Period</h2>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            ${reportData.reportPeriod.start.toLocaleDateString()} - ${reportData.reportPeriod.end.toLocaleDateString()}
          </p>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 20px;">Key Metrics Summary</h2>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
          <div style="background-color: #fff7ed; padding: 20px; border-radius: 8px; border-left: 4px solid #f97316;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #9a3412; font-weight: 600;">Website Sessions</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">15,420</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #10b981;">+23.5% vs previous period</p>
          </div>
          <div style="background-color: #dbeafe; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #1e40af; font-weight: 600;">Unique Users</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">12,350</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #10b981;">+18.2% vs previous period</p>
          </div>
          <div style="background-color: #dcfce7; padding: 20px; border-radius: 8px; border-left: 4px solid #22c55e;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #166534; font-weight: 600;">Social Reach</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">45,600</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #10b981;">+12.8% vs previous period</p>
          </div>
          <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #b45309; font-weight: 600;">Conversion Rate</h3>
            <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">3.2%</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #ef4444;">-2.1% vs previous period</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 20px;">Top Performing Pages</h2>
        <table style="width: 100%; border-collapse: collapse; background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Page</th>
              <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Views</th>
              <th style="padding: 12px; text-align: left; font-size: 12px; font-weight: 600; color: #6b7280; text-transform: uppercase;">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            ${reportData.data.topPages.map((page, index) => `
              <tr style="border-top: 1px solid #e5e7eb;">
                <td style="padding: 12px; font-size: 14px; color: #1f2937;">${page.page}</td>
                <td style="padding: 12px; font-size: 14px; color: #1f2937;">${page.views.toLocaleString()}</td>
                <td style="padding: 12px; font-size: 14px; color: #1f2937;">${page.bounceRate}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 20px;">Key Insights</h2>
        <div style="space-y: 12px;">
          <div style="display: flex; align-items: start; padding: 16px; background-color: #dbeafe; border-radius: 8px; margin-bottom: 12px;">
            <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">📈</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #1f2937;">Website traffic increased by 23% compared to previous month</p>
          </div>
          <div style="display: flex; align-items: start; padding: 16px; background-color: #dbeafe; border-radius: 8px; margin-bottom: 12px;">
            <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">📱</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #1f2937;">Social media engagement improved by 15%</p>
          </div>
          <div style="display: flex; align-items: start; padding: 16px; background-color: #dbeafe; border-radius: 8px;">
            <div style="width: 24px; height: 24px; background-color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">🎯</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #1f2937;">Top performing content: Product launch announcement</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h2 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 20px;">Recommendations</h2>
        <div style="space-y: 12px;">
          <div style="display: flex; align-items: start; padding: 16px; background-color: #fef3c7; border-radius: 8px; margin-bottom: 12px;">
            <div style="width: 24px; height: 24px; background-color: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">!</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #1f2937;">Increase investment in high-performing social media content</p>
          </div>
          <div style="display: flex; align-items: start; padding: 16px; background-color: #fef3c7; border-radius: 8px; margin-bottom: 12px;">
            <div style="width: 24px; height: 24px; background-color: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">!</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #1f2937;">Optimize landing pages with low conversion rates</p>
          </div>
          <div style="display: flex; align-items: start; padding: 16px; background-color: #fef3c7; border-radius: 8px;">
            <div style="width: 24px; height: 24px; background-color: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px; flex-shrink: 0;">
              <span style="color: white; font-size: 12px; font-weight: bold;">!</span>
            </div>
            <p style="margin: 0; font-size: 14px; color: #1f2937;">Expand successful SEO keywords strategy</p>
          </div>
        </div>
      </div>

      <div style="margin-top: 60px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #6b7280;">
          Generated on ${new Date().toLocaleDateString()} by Bolt Agency OS
        </p>
      </div>
    `;

    document.body.appendChild(reportContainer);

    // Convert to canvas and then PDF
    const canvas = await html2canvas(reportContainer, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff'
    });

    document.body.removeChild(reportContainer);

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 295; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add first page
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if needed
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    const fileName = `${reportData.clientName.replace(/\s+/g, '_')}_Analytics_Report_${reportData.reportPeriod.start.toISOString().split('T')[0]}.pdf`;
    pdf.save(fileName);

  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF report');
  }
};