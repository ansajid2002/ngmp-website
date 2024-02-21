
import React, { useState } from 'react';
import { Upload, Modal, Button, message, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { AdminUrl } from '../../constant';
import Swal from 'sweetalert2';
import { Option } from 'antd/es/mentions';

const index = () => {
  const [groupedTranslations, setGroupedTranslations] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('so');

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
    const chunkSize = 100; // Set the chunk size to 100 records
    const translationsArray = groupedTranslations[selectedCountry]
      ? Object.entries(groupedTranslations[selectedCountry]).map(([key, value]) => ({ [key]: value }))
      : [];
    const chunkCount = Math.ceil(translationsArray?.length / chunkSize); // Calculate the number of chunks
    setLoader(true)
    try {
      for (let i = 0; i < chunkCount; i++) {
        const formData = new FormData(); // Create a new FormData instance for each chunk
        const chunkStart = i * chunkSize;
        const chunkEnd = Math.min(chunkStart + chunkSize, translationsArray.length);
        const chunk = translationsArray.slice(chunkStart, chunkEnd);

        // Append the chunk as a JSON file to the FormData
        const blob = new Blob([JSON.stringify(chunk)], { type: 'application/json' });
        formData.append('translationsFile', blob, `translations-chunk-${i}.json`);
        formData.append('selectedCountry', selectedCountry);

        const response = await fetch(`${AdminUrl}/api/writeTranslations`, {
          method: 'POST',
          body: formData,
        });

        console.log((chunkCount - 1), i);

        if (!response.ok) {
          console.error('Failed to send translations to the server in chunk', i);
          await Swal.fire({
            icon: 'error',
            title: 'Failed to send translations',
            text: 'Please try again.',
          });
        } else {
          if ((chunkCount - 1) === i) {
            await Swal.fire({
              icon: 'success',
              title: 'Translations Sent Successfully',
              text: 'Translations have been sent successfully.',
            });
            setLoader(false)

          }
        }
      }
    } catch (error) {
      console.error('Error sending translations:', error);
      await Swal.fire({
        icon: 'error',
        title: 'Failed to send translations',
        text: 'Please try again.',
      });
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

  const countryCodes = {
    so: 'Somalia',
    hi: 'Hindi',
    sw: 'Swahili',
    am: 'Amharic',
    ar: 'Arabic',
    fr: 'French'
  };


  const handleChange = (value) => {
    setSelectedCountry(value);
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

      <Select className='w-96 mt-5 ml-2' defaultValue={'English'} onChange={handleChange} value={selectedCountry}>
        {Object.entries(countryCodes).map(([code, name], index) => (
          <Option key={index} value={code}>{name} ({code.toUpperCase()})</Option>
        ))}
      </Select>

      {/* Button for sending the response */}
      {groupedTranslations && (
        <>
          <Button
            style={{ marginTop: '16px' }}
            onClick={openmodal}
            loading={loader}
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