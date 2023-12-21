import React from 'react';
import { DownloadOutlined } from '@ant-design/icons'; // Import the Excel icon from Ant Design

const DownloadSampleExcel = () => {


    const handleDownload = () => {
        // Generate the download link based on the selected subcategory
        const downloadLink = `/SampleExcelSheet/Sample__Listing.xlsx`;

        // Create a virtual anchor element to trigger the download
        const anchor = document.createElement('a');
        anchor.href = downloadLink;
        anchor.download = `Sample__Listing.xlsx`;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
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
