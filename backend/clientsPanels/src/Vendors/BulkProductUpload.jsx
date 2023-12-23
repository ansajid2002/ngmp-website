import React, { useEffect, useState } from "react";
import ExcelJS from "exceljs"; // Import the exceljs library
import { Table, Button, Upload, Typography, message, Alert, Modal, Image } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { AdminUrl } from "../Admin/constant";
import Swal from "sweetalert2";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import DownloadSampleExcel from "./components/DownloadSampleExcel";
import AuthCheck from "./components/AuthCheck";
import axios from "axios";

const { Title } = Typography;
const BulkProductUpload = ({ vendorDatastate }) => {
  const [jsonData, setJsonData] = useState(null);
  const vendorid = vendorDatastate?.[0]?.id;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [SelectedSubcategory, setSelectedSubcategory] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [FilteredSubcategories, setFilteredSubcategories] = useState(null);
  const [selectedExcel, setSelectedExcel] = useState(null);

  const [locationData, setLocationData] = useState({
    city: "",
    state: "",
    country: "",
    postalcode: '',
  });

  const [locationRetrieved, setLocationRetrieved] = useState(false);

  useEffect(() => {
    if (!locationRetrieved && 'geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (success) => {
          const { latitude, longitude } = success.coords;

          try {
            // Use Nominatim API to get address details
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

            const response = await axios.get(url);
            const data = response.data;

            if (data) {
              const { city, state, country, postcode } = data.address;
              setLocationData({
                city: data?.state_district || data?.city_district || data?.city || data?.neighbourhood,
                state,
                country,
                postcode,
              });
              setLocationRetrieved(true);
            }
          } catch (error) {
            console.error('Error getting address:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    } else if (!locationRetrieved) {
      console.error('Geolocation is not available in this browser.');
    }
  }, [locationData, locationRetrieved]);

  function generateUniqueID() {
    const randomPart = Math.floor(Math.random() * 10000).toString(); // Generate a random 4-digit number
    const timestampPart = new Date().getTime().toString().substr(-6, 2); // Use last 2 digits of the current timestamp
    const uniqueID = `${randomPart}${timestampPart}`; // Combine the parts
    return uniqueID;
  }

  const handleFileUpload = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer(); // Convert the file to ArrayBuffer
      setSelectedExcel(file)
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(arrayBuffer); // Load the workbook using the ArrayBuffer

      const worksheet = workbook.worksheets[0];
      const rows = worksheet.getSheetValues();

      // Starting from the 5th row (index 4) for JSON data
      const jsonRows = rows.slice(5);
      // Convert rows into JSON format as needed
      const sheetData = jsonRows.reduce((acc, row) => {
        const key1 = row[2];
        const key2 = row[3];
        const key3 = row[4];
        const key4 = row[5];
        const key5 = row[6];
        const key6 = row[7];
        const key7 = row[8];
        const key8 = row[9];
        const key9 = row[10];
        const key10 = row[11];
        const key11 = row[12];
        const key12 = row[13];
        const key13 = row[14];
        const key14 = row[15];
        const key15 = row[16];
        const key16 = row[17];
        const key17 = row[18];
        const key18 = row[19];
        const key19 = row[20];

        const uniquepid = generateUniqueID(); // Generate a unique ID for each row

        const rowData = {
          key1,
          key2,
          key3,
          key4,
          key5,
          key6,
          key7,
          key8,
          key9,
          key10,
          key11,
          key12,
          key13,
          key14,
          key15,
          key16,
          key17,
          key18,
          key19,
          ...locationData,
          vendorid,
          uniquepid, // Include the generated unique ID
          category: selectedCategory?.category_name.trim() || '',
          subcatgeory: SelectedSubcategory?.subcategory_name.trim() || ''
        };

        // Check if keys from key1 to key16 are all undefined
        const keysFrom1To16AreUndefined = Object.values(rowData).slice(0, 16).every(value => value === undefined);

        // Only include the row if keys from key1 to key16 are not all undefined
        if (!keysFrom1To16AreUndefined) {
          return [...acc, rowData];
        } else {
          return acc; // Exclude the row if keys from key1 to key16 are all undefined
        }

      }, []);

      setJsonData(sheetData);
    } catch (error) {
      console.error("Error reading the uploaded file:", error);
      message.error("Error reading the uploaded file.");
      setJsonData(null);
    }
  };

  let columns = [];

  if (jsonData) {
    if (
      jsonData[0]?.key7
    ) {
      columns = [
        {
          title: "SKUID",
          dataIndex: "key17",
          key: "key17",
          width: 100,
          ellipsis: true,
          // render: (text) => <img src={text} width={80} height={80} />,
        },
        {
          title: "Product Title",
          dataIndex: "key1",
          key: "key1",
          width: 250,
          ellipsis: true,
          render: (text) => (
            <span title={text} className="text-blue-600">
              {text}
            </span>
          ),
        },
        {
          title: "Image",
          dataIndex: "key8",
          key: "key8",
          width: 100,
          ellipsis: true,
          render: (text) => {
            return <Image src={text.text || text} width={80} height={80} />
          },
        },
        {
          title: "Description",
          dataIndex: "key2",
          key: "key2",
          width: 250,
          ellipsis: true,
          render: (text) => (
            <span title={text}>
              {text?.length > 20 ? `${text?.substring(0, 20)}...` : text}
              {text?.length > 20 && (
                <button
                  className="text-blue-600 underline ml-1"
                  onClick={() => {
                    setSelectedDescription(text);
                    setModalVisible(true);
                  }}
                >
                  Read more
                </button>
              )}
            </span>
          ),
        },
        {
          title: "Brand",
          dataIndex: "key3",
          key: "key3",
          width: 100,
          ellipsis: true,
        },
        {
          title: "Product Type",
          dataIndex: "key9",
          key: "key9",
          width: 100,
          ellipsis: true,
        },
        {
          title: "Currency",
          dataIndex: "key4",
          key: "key4",
          width: 80,
          ellipsis: true,
        },
        {
          title: "Price",
          dataIndex: "key5",
          key: "key5",
          width: 80,
          ellipsis: true,
        },
        {
          title: "SellingPrice",
          dataIndex: "key10",
          key: "key10",
          width: 80,
          ellipsis: true,
        },
        {
          title: "Category",
          dataIndex: "key6",
          key: "key6",
          width: 100,
          ellipsis: true,
        },
        {
          title: "Subcategory",
          dataIndex: "key7",
          key: "key7",
          width: 100,
          ellipsis: true,
        },
        {
          title: "State",
          dataIndex: "state",
          key: "state",
          width: 100,
          ellipsis: true,
        },
        {
          title: "Country",
          dataIndex: "country",
          key: "country",
          width: 100,
          ellipsis: true,
        },
      ];
    }
    // Add more condition checks for other subcategories
  }

  const handleUpload = async () => {
    try {
      const subcategory = jsonData[0]?.key7;

      if (!subcategory) {
        console.error("Subcategory data not available.");
        return;
      }

      const dataToSend = new FormData();
      const currentDate = new Date();

      dataToSend.append("jsonData", JSON.stringify(jsonData));
      dataToSend.append("subcategory", subcategory);
      dataToSend.append("selectedExcel", selectedExcel);
      dataToSend.append("currentDateTime", currentDate.toISOString());
      dataToSend.append("vendorId", vendorid);


      // Show loading message using Swal with a minimum timer of 3 seconds
      const loadingSwal = Swal.fire({
        title: "Uploading Data",
        text: "Please wait...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
          // setTimeout(() => {
          //   loadingSwal.close();
          // }, 3000); // Minimum timer of 3 seconds
        },
      });

      const response = await fetch(`${AdminUrl}/api/BulkProductUpload`, {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) {
        const responseData = await response.json();

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error uploading data. " + responseData.error,
        });
        return;
      }

      await response.json();

      loadingSwal.close();

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Data uploaded successfully.",
      });
      setJsonData(null); // Clear jsonData after successful upload
    } catch (error) {
      console.error("Error uploading data to the backend:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
      });
    }
  };

  const categoryFunction = async () => {
    try {
      // Your API call to fetch categories data
      const response = await fetch(`${AdminUrl}/api/getAllProductCatgeory`);
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const subcategoryFunction = async () => {
    try {
      // Your API call to fetch subcategories data
      const response = await fetch(`${AdminUrl}/api/getAllSubcategories`);
      const data = await response.json();
      setSubcategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Find the corresponding category ID from the categories array
    const selectedCategory = categories.find(
      (category) => category.category_id === selectedCategoryId
    );
    if (selectedCategory) {
      // Filter subcategories based on the selected category ID
      const filteredSubcategories = subcategories.filter(
        (subcategory) =>
          subcategory.parent_category_id === selectedCategory.category_id
      );
      setFilteredSubcategories(filteredSubcategories);
    }
  }, [selectedCategoryId, categories, subcategories]);

  useEffect(() => {
    // Check if 'categories' and 'subcategories' are empty
    const categoriesEmpty = categories === null || categories.length === 0;
    const subcategoriesEmpty = subcategories.length === 0;

    // Fetch data only if both 'categories' and 'subcategories' are empty
    if (categoriesEmpty || subcategoriesEmpty) {
      categoryFunction();
      subcategoryFunction();
    }
  }, [categories, subcategories]);

  const handleCategoryChange = (category) => {
    setSelectedCategoryId(category?.category_id);
    setSelectedCategory(category);
    setJsonData(null);
  };

  const handleSubcategoryChange = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setJsonData(null);
  };

  return vendorDatastate && vendorDatastate.length > 0 ? (
    <>
      {!vendorDatastate?.[0].email_verification_status ||
        // !vendorDatastate?.[0].mobile_verification_status ||
        vendorDatastate?.[0].status === 1 ? (
        <AuthCheck vendorDatastate={vendorDatastate} />
      ) : (
        <>
          <div className="bg-white rounded p-6">
            <div className="mb-8 mt-4">
              <h1 className="font-bold text-2xl mb-5 text-gray-700">
                Choose Category
              </h1>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.category_id}
                    onClick={() => handleCategoryChange(category)}
                    className={`py-4 px-3 cursor-pointer rounded ${selectedCategory === category
                      ? "bg-slate-200 text-black transition-all"
                      : "hover:bg-gray-100"
                      } flex flex-col items-center justify-center`}
                    title={`${category.category_name}`}
                  >
                    {/* Image */}
                    <div className="h-24 mb-2">
                      <img
                        src={`${AdminUrl}/uploads/CatgeoryImages/${category.category_image_url}`}
                        alt={`${category.category_name}`}
                        className="w-full h-24 border border-gray-300 rounded-lg object-cover"
                        onError={(e) => {
                          e.target.onerror = null; // Reset the event handler to avoid infinite loops
                          e.target.src = '/noimage.jpg'; // Provide the path to your alternative image
                        }}
                      />
                    </div>
                    {/* Text */}
                    <p className="font-medium text-center text-lg">{category.category_name}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              {FilteredSubcategories && (
                <h1 className="font-bold text-2xl mb-5 text-gray-700">
                  Select SubCategory
                </h1>
              )}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {FilteredSubcategories &&
                  FilteredSubcategories.map((subcat) => (
                    <div
                      key={subcat.subcategory_id}
                      onClick={() => handleSubcategoryChange(subcat)}
                      className={`py-4 px-3 cursor-pointer rounded ${SelectedSubcategory === subcat
                        ? "bg-slate-200 text-black transition-all"
                        : "hover:bg-gray-100"
                        } flex flex-col items-center`}
                      title={`${subcat.subcategory_name}`}
                    >
                      {/* Image */}
                      <div className="h-24 mb-2">

                        <img
                          src={`${AdminUrl}/uploads/SubcategoryImages/${subcat.subcategory_image_url}`}
                          alt=""
                          className="w-full h-24 border border-gray-300 rounded-lg object-cover"
                          onError={(e) => {
                            e.target.onerror = null; // Reset the event handler to avoid infinite loops
                            e.target.src = '/noimage.jpg'; // Provide the path to your alternative image
                          }}
                        />
                      </div>


                      {/* Text */}
                      <p className="font-semibold text-center text-lg">{subcat.subcategory_name}</p>
                    </div>
                  ))}
              </div>
            </div>

            {
              SelectedSubcategory && <>
                <Title
                  level={3}
                  className="font-bold text-2xl mb-5 text-gray-700"
                >
                  Bulk Product Upload
                </Title>
                <div className="mb-4 w-full overflow-hidden">
                  <Upload
                    accept=".xlsx"
                    className="w-full"
                    beforeUpload={() => false}
                    onChange={(info) => handleFileUpload(info.file)}
                  >
                    <Button
                      style={{ width: "80vw" }} // Set the width to 100% to make the button full-width
                      className="h-48 text-xl"
                      icon={<UploadOutlined />}
                    >
                      Upload Excel File
                    </Button>
                  </Upload>
                  <Button
                    type="button"
                    onClick={handleUpload}
                    disabled={!jsonData && jsonData?.length > 0}
                    className={`flex mt-4 items-center ml-2 transition-all duration-300 ${jsonData
                      ? "bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                  >
                    <UploadOutlined className="mr-1" />
                    Upload
                  </Button>
                </div>
                <div className={jsonData ? "hidden" : ""}>
                  <DownloadSampleExcel />
                </div>
              </>
            }

            {jsonData && jsonData?.length > 0 && (
              <div>
                <div className="py-4">
                  <h1 className="text-xl font-semibold tracking-wider">Total Products: {jsonData?.length}</h1>
                </div>
                <div className="bg-white rounded shadow overflow-x-auto mb-4">
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={jsonData}
                  />
                </div>
                <Alert
                  type="info"
                  message={
                    <div className="flex items-start">
                      <InfoCircleOutlined className="text-blue-500 mr-4 mt-1" />
                      <div>
                        <p className="mb-2">Review and Confirm Details</p>
                        <p className="text-gray-600 mb-4">
                          You have selected category "
                          <strong>{jsonData[0]?.key6}</strong>" and
                          subcategory "<strong>{jsonData[0]?.key7}</strong>
                          ". Before proceeding, please review and confirm
                          the details extracted from the Excel file below.
                          If any discrepancies are found, make the necessary
                          edits in the Excel file and then proceed.
                        </p>
                        <ul className="list-disc ml-8 mt-2">
                          <li>Product titles and descriptions</li>
                          <li>Brands, currencies, and prices</li>
                          <li>
                            Category, subcategory, city, state, and country
                            information
                          </li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                          Once you have reviewed and confirmed the details,
                          click the <strong>"Upload"</strong> button above
                          to proceed.
                        </p>
                      </div>
                    </div>
                  }
                  className="mb-4"
                />
              </div>
            )}

          </div>

          <Modal
            title="Description"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            <p>{selectedDescription}</p>
          </Modal>
        </>
      )}
    </>
  ) : (
    ""
  );
};

export default BulkProductUpload;
