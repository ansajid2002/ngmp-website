
import React, { useState } from 'react';
import { Upload, Modal, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { AdminUrl } from '../../constant';
import Swal from 'sweetalert2';

const index = () => {
  const [groupedTranslations, setGroupedTranslations] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const formData = new FormData();
  console.log(groupedTranslations, "");
  const openmodal = () => {
    setIsModalVisible(true);
  }
  const handleConfirm = () => {

    handleSendResponse();

    // Close the modal
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Close the modal
    setIsModalVisible(false);
  };


  const handleFileUpload = (file) => {
    const reader = new FileReader();

    if (file.status === 'removed') {
      // File is removed, set groupedTranslations to null
      setGroupedTranslations(null);
    } else {

      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const excelData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

          // Transforming the data into the desired format
          const translations = {};

          excelData.forEach(item => {
            Object.keys(item).forEach(key => {
              const languageKey = key.toLowerCase();
              const englishValue = item['English'];
              const translatedValue = item[key];

              if (['so', 'hi', 'sw', 'am', 'ar', 'fr'].includes(languageKey) && translatedValue !== undefined && translatedValue.trim() !== '') {
                if (!translations[languageKey]) {
                  translations[languageKey] = {};
                }
                translations[languageKey][englishValue] = translatedValue;
              }
            });
          });

          // Display the grouped translations
          console.log('Grouped Translations:', translations);

          // Set the translations in the state
          setGroupedTranslations(translations);

        } catch (error) {
          console.error('Error reading Excel file:', error);
          message.error('Error reading Excel file. Please try again.');
        }
      };

      reader.readAsBinaryString(file);
    }
  };


  const handleSendResponse = async () => {
    try {

      // Append the groupedTranslations as a JSON file to the FormData
      const blob = new Blob([JSON.stringify(groupedTranslations)], { type: 'application/json' });
      formData.append('translationsFile', blob, 'translations.json');
      // Send a POST request with groupedTranslations to the server
      const response = await fetch(`${AdminUrl}/api/writeTranslations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        //   message.success('Translations sent successfully!');
        Swal.fire({
          icon: 'success',
          title: 'Translations sent successfully!',
        });
      } else {
        console.error('Failed to send translations to the server.');
        Swal.fire({
          icon: 'error',
          title: 'Failed to send translations',
          text: 'Please try again.',
        });
      }

    } catch (error) {
      console.error('Error sending translations:', error);
      message.error('Error sending translations. Please try again.');
    }
  };

  const downloadexcel = async () => {
    try {
      // Fetch API to get the translations as Excel
      const response = await fetch(`${AdminUrl}/api/getTranslationsAsExcel`); // Replace with your actual API endpoint

      if (!response.ok) {
        throw new Error('Failed to fetch translations as Excel.');
      }

      // Read the response as a blob
      const blob = await response.blob();

      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'translations.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Error downloading Excel:', error);
      // Handle the error as needed
    }
  };


  return (
    <div className='sm:ml-72'>
      <Upload
        accept=".xlsx"
        className="w-full"
        beforeUpload={() => false}
        onChange={(info) => handleFileUpload(info.file)}
      >
        <Button style={{ width: '80vw' }} className="h-48 text-xl" icon={<UploadOutlined />}>
          Upload Excel File
        </Button>
      </Upload>

      {/* Button for sending the response */}
      {groupedTranslations && (
        <>
          <Button
            style={{ marginTop: '16px' }}
            onClick={openmodal}
          >
            Upload Translations
          </Button>
          <Modal
            visible={isModalVisible}
            okButtonProps={{ style: { background: "green", fontWeight: "bold" } }}
            cancelButtonProps={{ style: { background: "red", color: "white", fontWeight: "bold" } }}
            onOk={handleConfirm}
            onCancel={handleCancel}
          >
            <p className='text-base'>All the Previous Translation will be replaced By this file.</p>
            <p className='text-lg mt-2 font-medium'>Do you want to proceed?</p>
          </Modal>
        </>

      )}
      <div className='mt-4 '>
        <Button className='hover:bg-green-300 ' onClick={() => downloadexcel()}>Download Existing Languages </Button>
      </div>
      <h1 className='text-gray-500 mt-4'><b>NOTE : </b>First, download the existing Excel file, append the new data, and then upload the updated file.</h1>
    </div>
  );
};


export default index