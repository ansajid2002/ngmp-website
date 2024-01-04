import React from 'react';
import { DownloadOutlined } from '@ant-design/icons'; // Import the Excel icon from Ant Design
import * as XLSX from 'xlsx';

const DownloadSampleExcel = ({ category, subcategory }) => {

    console.log(category, subcategory);
    const handleDownload = () => {
        // Generate the download link based on the selected subcategory
        const downloadLink = `/SampleExcelSheet/Sample__Listing.xlsx`;

        // Use fetch to get the file
        fetch(downloadLink)
            .then(response => response.arrayBuffer())
            .then(data => {
                // Read the Excel file
                const workbook = XLSX.read(data, { type: 'array' });

                // Get the first sheet
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Modify a cell value (for example, change A1 to 'Hello')
                XLSX.utils.sheet_add_aoa(sheet, [[category?.category_name]], { origin: 'G3' });
                XLSX.utils.sheet_add_aoa(sheet, [[subcategory?.subcategory_name]], { origin: 'H3' });

                // Convert the modified workbook back to array buffer
                const modifiedData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

                // Create a virtual anchor element to trigger the download
                const anchor = document.createElement('a');
                const modifiedBlob = new Blob([modifiedData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                const modifiedUrl = URL.createObjectURL(modifiedBlob);

                anchor.href = modifiedUrl;
                anchor.download = `${category?.category_name.replace(/[^\w\s]/g, "").replace(/\s/g, "")}_${subcategory?.subcategory_name.replace(/[^\w\s]/g, "").replace(/\s/g, "")}.xlsx`;
                document.body.appendChild(anchor);
                anchor.click();

                // Clean up
                document.body.removeChild(anchor);
                URL.revokeObjectURL(modifiedUrl);
            })
            .catch(error => console.error('Error fetching the file:', error));
    };
    return (
        <button
            className='bg-green-50 hover:bg-green-100 text-green-800 py-2 px-4 rounded-full shadow-md cursor-pointer flex items-center'
            onClick={handleDownload}
        >
            <DownloadOutlined className='text-green-600 mr-2' /> {/* Add Excel icon */}
            Download Sample Excel
        </button>
    );
};

export default DownloadSampleExcel;
