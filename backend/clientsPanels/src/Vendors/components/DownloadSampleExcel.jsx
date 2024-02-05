import React from 'react';
import { DownloadOutlined } from '@ant-design/icons'; // Import the Excel icon from Ant Design
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

import { speicificationFields } from '../constants/ProductsForm/Specifications';
import { Button } from 'antd';

const DownloadSampleExcel = ({ category, subcategory, nestedSubcategory }) => {
    console.log(nestedSubcategory, 's');
    const Specifications = (speicificationFields.filter(item => item?.category == subcategory?.subcategory_name.replace(/[^\w\s]/g, "").replace(/\s/g, "")))
    // console.log();
    const specificationData = Specifications?.[0]?.fields || []

    const handleDownload = async (type) => {
        // Generate the download link based on the selected subcategory
        const downloadLink = `/SampleExcelSheet/Sample__Listing.xlsx`;

        try {
            // Use fetch to get the file
            const response = await fetch(downloadLink);
            const data = await response.arrayBuffer();

            // Read the Excel file
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.load(data);

            // Get the second sheet
            const SPecifcaiton = 'Specifications';
            const newSheetSpecific = workbook.addWorksheet(SPecifcaiton);
            const labels = specificationData.map(field => field.label);
            newSheetSpecific.addRow(labels);


            newSheetSpecific.columns && newSheetSpecific.columns.forEach((col, columnIndex) => {
                col.width = labels[columnIndex].length + 5; // You can adjust the padding as needed

                // Check if the field has options (for dropdown)
                if (specificationData[columnIndex].type === 'select') {
                    const dropdownOptions = specificationData[columnIndex].options;

                    console.log(dropdownOptions.join(','));
                    // Add data validation for dropdown in the entire column (excluding the first row)
                    newSheetSpecific.eachRow({ startingRow: 2 }, (row, rowNumber) => {
                        row.getCell(columnIndex + 1).dataValidation = {
                            type: 'list',
                            formula1: [`"${dropdownOptions.join(',')}"`],
                            showErrorMessage: true,
                            errorTitle: 'Invalid Value',
                            error: 'Please select a value from the dropdown list.',
                        };
                    });
                }
            });

            // Optional: AutoFit columns (if needed)
            // newSheetSpecific.columns.forEach((col) => {
            //     col.width = col.max - col.min + 2; // Adding padding
            // });


            // Check if type is "Variant" and create a new sheet
            if (type === "Variant") {
                const newSheetName = 'List Variants';
                const newSheet = workbook.addWorksheet(newSheetName);
            }

            // Get the FIRST sheet
            const startSheet = workbook.getWorksheet(1); // Assuming the first sheet is at index 1

            // Modify cell values (for example, change G1 and H1)
            startSheet.getCell('A5').value = type;
            startSheet.getCell('G3').value = category?.category_name;
            startSheet.getCell('H3').value = `${subcategory?.subcategory_name} -> ${nestedSubcategory?.nested_subcategory_name || ''}`;

            // Convert the modified workbook back to array buffer
            const modifiedData = await workbook.xlsx.writeBuffer();

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
        } catch (error) {
            console.error('Error fetching the file:', error);
        }
    };

    return (
        <div className='md:flex  justify-center md:gap-4'>
            <Button
                onClick={() => handleDownload('Simple')}
                className='flex justify-center items-center text-xl md:text-2xl py-6 mt-5'
            >
                <DownloadOutlined className='text-blue-600 mr-2' /> {/* Add Excel icon */}
                Download Single Product Listing Sample
            </Button>
            <Button
                onClick={() => handleDownload('Variant')}
                className='flex justify-center items-center text-xl md:text-2xl py-6 mt-5'
            >
                <DownloadOutlined className='text-blue-600 mr-2' /> {/* Add Excel icon */}
                Download Variant Product Listing Sample
            </Button>
        </div>
    );
};

export default DownloadSampleExcel;
