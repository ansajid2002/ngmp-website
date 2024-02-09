import React from 'react';
import { DownloadOutlined } from '@ant-design/icons'; // Import the Excel icon from Ant Design
import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';

import { speicificationFields } from '../constants/ProductsForm/Specifications';
import { Button } from 'antd';

const DownloadSampleExcel = ({ category, subcategory, nestedSubcategory, variantsData }) => {
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

            // Check if type is "Variant" and create a new sheet
            if (type === "Variant") {
                const newSheetName = 'List Variants';
                const newSheet = workbook.addWorksheet(newSheetName);

                const headerRow = ['Variant Name', 'Variant Group', 'Parent Skuid', 'Child Skuid', 'Mrp', 'Selling Price', 'Quantity'];
                const headerRowCell = newSheet.addRow(headerRow);
                headerRowCell.eachCell((cell) => {
                    cell.font = { bold: true, color: 'red' }; // Set font to bold
                });

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

    // Function to generate all combinations of variant attributes
    function generateVariantCombinations(variantsData) {
        const combinations = [];
        const generate = (index, combination) => {
            if (index === variantsData.length) {
                combinations.push([...combination]);
                return;
            }
            const variant = variantsData[index];
            variant.attribute_values.forEach(value => {
                combination.push({ attribute_name: variant.attribute_name, attribute_values: value });
                generate(index + 1, combination);
                combination.pop();
            });
        };
        generate(0, []);
        return combinations;
    }


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
