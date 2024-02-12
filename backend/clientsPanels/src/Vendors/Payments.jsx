import React, { useState } from 'react'
import PaymentHistoryTable from "./components/PaymentHistoryTable";
import AuthCheck from './components/AuthCheck';
import { Button, Select } from 'antd';
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf } from 'react-icons/gr';
import { AdminUrl } from '../Admin/constant';
import * as XLSX from 'xlsx';

const Payments = ({ vendorDatastate }) => {
  const [PdfLoader, setPdfLoader] = useState(false);
  const [excelLoader, setExcelLoader] = useState(false);
  const [csvLoader, setCsvLoader] = useState(false);
  const [selectedOption, setSelectedOption] = useState("last7days");

  const id = vendorDatastate?.[0].id;

  const handleChange = value => {
    setSelectedOption(value);
  };

  const handleDownload = (type) => {
    switch (type) {
      case 'pdf':
        // Logic to export data to PDF
        exportToPdf()
        break;
      case 'csv':
        exportToCsv()
        break;
      case 'excel':
        exportToExcel()
        break;
      default:
        break;
    }
  };

  const exportToPdf = async () => {
    setPdfLoader(true)
    try {

      const response = await fetch(`${AdminUrl}/api/payment-pdf?vendorId=${id}&selectedOption=${selectedOption}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Define filename with selected option prefix
      const filename = `${selectedOption}_business_reports.pdf`;

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Simulate click to trigger download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      setPdfLoader(false)
    }
  };

  const exportToCsv = async () => {
    setCsvLoader(true)
    try {
      const response = await fetch(`${AdminUrl}/api/payment-csv?vendorId=${id}&selectedOption=${selectedOption}&format=csv`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const csvContent = await response.text();

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'business_report.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error exporting to CSV:', error);
    } finally {
      setCsvLoader(false)
    }
  };

  const exportToExcel = async () => {
    setExcelLoader(true)
    try {
      const response = await fetch(`${AdminUrl}/api/payment-excel?vendorId=${id}&selectedOption=${selectedOption}&format=excel`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Convert blob to ArrayBuffer
      const arrayBuffer = await new Response(blob).arrayBuffer();

      // Parse Excel data
      const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });

      // Save the Excel file
      XLSX.writeFile(workbook, 'business_report.xlsx');
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    } finally {
      setExcelLoader(false)
    }
  };

  return (
    vendorDatastate && vendorDatastate.length > 0 ?
      <>
        {
          !vendorDatastate?.[0].email_verification_status || vendorDatastate?.[0].status === 1 ?
            <AuthCheck vendorDatastate={vendorDatastate} /> :
            <>
              <div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-700 mb-2 md:text-3xl lg:text-4xl">
                    Business Reports
                  </h1>

                  <p className="text-sm text-gray-600 md:text-lg lg:text-xl">
                    Gain valuable insights into your payment data and financial
                    transactions.
                  </p>
                </div>

                <div className="flex justify-end mb-4 py-4">
                  <Button loading={PdfLoader} onClick={() => handleDownload('pdf')} className="mr-2 flex justify-center items-center gap-4">
                    <GrDocumentPdf />
                    <p>PDF</p>
                  </Button>
                  <Button loading={csvLoader} onClick={() => handleDownload('csv')} className="mr-2 flex justify-center items-center gap-4">
                    <GrDocumentCsv />
                    <p>CSV</p>
                  </Button>
                  <Button loading={excelLoader} onClick={() => handleDownload('excel')} className='mr-2 flex justify-center items-center gap-4'>
                    <GrDocumentExcel />
                    <p>Excel</p>
                  </Button>

                  <Select value={selectedOption} onChange={handleChange} style={{ width: 200 }}>
                    <Option value="last7days">Last 7 days</Option>
                    <Option value="last30days">Last 30 days</Option>
                    <Option value="last60days">Last 60 days</Option>
                    <Option value="last90days">Last 90 days</Option>
                    <Option value="last6months">Last 6 months</Option>
                    <Option value="last12months">Last 12 months</Option>
                    <Option value="last18months">Last 18 months</Option>
                    <Option value="last24months">Last 24 months</Option>
                    <Option value="">Overall Report</Option>
                  </Select>
                </div>
              </div>

              <PaymentHistoryTable vendorId={id} selectedOption={selectedOption} />
            </>
        }
      </>
      : ''
  );
}

export default Payments