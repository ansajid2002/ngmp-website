// ClaimForm.js
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal, Table, Tag, Space, Image } from "antd";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { AdminUrl } from "../Admin/constant";
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";

// Register FilePond plugins
registerPlugin(/* Import necessary plugins */);

const ClaimForm = ({ vendorDatastate }) => {
  const [videoFiles, setVideoFiles] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [additionalText, setAdditionalText] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState(null);
  const [claimsData, setClaims] = useState([]);
  const [visible, showModal] = useState(false);
  const [desc, setDescription] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [loader, setLoader] = useState(false);

  const columns = [
    {
      title: "Claim ID",
      dataIndex: "claim_id",
      key: "claim_id",
      sorter: (a, b) => a.claim_id - b.claim_id,
    },
    {
      title: "Claim Status",
      dataIndex: "claim_status",
      key: "claim_status",
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Ongoing", value: "Ongoing" },
        { text: "Closed", value: "Closed" },
      ],
      onFilter: (value, record) => record.claim_status === value,
      render: (status) => (
        <Tag
          color={
            status === "Pending"
              ? "orange"
              : status === "Ongoing"
                ? "blue"
                : "green"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Claim Description",
      dataIndex: "claim_description",
      key: "claim_description",
      width: 100,
      render: (text) => {
        if (text.length > 20) {
          return (
            <span>
              {text.slice(0, 20)}

              <a
                onClick={() => {
                  showModal(true);
                  setDescription(text);
                }}
                className="text-blue-800"
              >
                ... Read more
              </a>
            </span>
          );
        }
        return <span>{text}</span>;
      },
    },

    {
      title: "Claim Date",
      dataIndex: "claim_date",
      key: "claim_date",
      defaultSortOrder: "ascend",

      render: (date) => moment(date).format("LLL"),
      sorter: (a, b) => new Date(b.claim_date) - new Date(a.claim_date), // Sorting function
    },
    {
      title: "Response Description",
      dataIndex: "reply_description",
      key: "reply_description",
    },
    {
      title: "Response Date",
      dataIndex: "reply_date",
      key: "reply_date",
      render: (date) => (date ? moment(date).format("LLL") : "N/A"),
    },
    {
      title: "Closure Description",
      dataIndex: "closure_description",
      key: "closure_description",
    },
    {
      title: "Closure Date",
      dataIndex: "closure_date",
      key: "closure_date",
      render: (date) => (date ? moment(date).format("LLL") : "N/A"),
    },
    {
      title: "Video",
      dataIndex: "video_files",
      key: "video_files",
      render: (video_files) => (
        <Space>
          <a
            href={`${AdminUrl}/uploads/Claims/${video_files}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Video
          </a>
        </Space>
      ),
    },
    {
      title: "Images",
      dataIndex: "image_files",
      key: "image_files",
      render: (image_files) => (
        <Space className="gap-2 flex">
          <a
            onClick={() => setPreviewImages(image_files)}
            rel="noopener noreferrer"
          >
            View Images
          </a>
        </Space>
      ),
    },
    // Add other columns as needed
  ];

  const [filePondKey, setFilePondKey] = useState(Date.now()); // Used to reset FilePond instances
  const id = vendorDatastate?.[0]?.id;

  const onFinish = async (values) => {
    try {
      setLoader(true);

      // Create a FormData object to append the files
      const formData = new FormData();

      // Append the video file to the FormData
      if (videoFiles.length > 0) {
        formData.append("video", videoFiles[0]);
      }

      // Append each image file to the FormData
      if (imageFiles.length > 0) {
        imageFiles.forEach((imageFile, index) => {
          formData.append(`image`, imageFile);
        });
      }

      formData.append("vendorid", id);

      // Append the additional text input value
      formData.append("additionalText", additionalText);

      // Make an HTTP request to the server
      const response = await axios.post(`${AdminUrl}/api/claims`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setClaims((prevClaims) => [response.data.data, ...prevClaims]);

      console.log("Server response:", response.data);
      Swal.fire({
        icon: "success",
        title: "Claim Submitted Successfully!",
        text: response.data.message, // You can customize this based on your API response
      });

      // Reset state values and FilePond instances on successful response
      setVideoFiles([]);
      setImageFiles([]);
      setAdditionalText("");
      setFilePondKey(Date.now()); // Reset FilePond instances by changing the key
      setmodalVisible(false);
    } catch (error) {
      console.error("Error uploading files:", error);
      setError(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an error submitting the claim. Please try again.",
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        setLoader(true);
        try {
          // Fetch coupons by vendorId
          const claimResponse = await fetch(
            `${AdminUrl}/api/getClaimsofVendors?vendorId=${id}`
          );
          if (!claimResponse.ok) {
            setClaims([]);
          }
          const claimsData = await claimResponse.json();
          console.log(claimsData);
          setClaims(claimsData);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoader(false);
        }
      }
    };

    fetchData();
  }, [id]);

  const filterClaims =
    claimsData &&
    claimsData.filter((claim) =>
      claim.claim_id.toString().includes(searchText.toString())
    );

  return (
    <div>
      <div className="p-5 md:p-8 bg-white shadow-lg rounded mb-8 flex flex-col items-center xl:flex-row">
        <div className="mb-4 md:mb-0 md:w-1/4">
          <h1 className="text-xl font-semibold text-heading">Vendor Claims</h1>
        </div>
        <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
          <div
            noValidate
            role="search"
            className="relative flex w-full items-center"
          >
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <button className="absolute p-2 text-body outline-none start-1 focus:outline-none active:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </button>
            <input
              type="text"
              id="search"
              name="searchText"
              className="ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
              placeholder="Search by Claim Id"
              aria-label="Search"
              autoComplete="off"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <a
            className="inline-flex cursor-pointer items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-orange-400 text-light text-white border border-transparent px-5 py-0 h-12 h-12 w-full md:w-auto md:ms-6 h-12 w-full md:w-auto md:ms-6"
            onClick={() => setmodalVisible(true)} // Handle adding a new coupon
            hred="#"
          >
            <span>+ Raise Claim</span>
          </a>
        </div>
      </div>

      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="w-full overflow-hidden overflow-x-auto bg-white">
          <Table
            dataSource={filterClaims || []} // Use filtered list of coupons
            columns={columns}
            rowKey="coupon_id"
            pagination={false}
          />
        </div>
      )}

      <Modal
        title={"Raise Claim"}
        visible={modalVisible}
        onOk={() => {
          console.log("OK clicked");
        }}
        onCancel={() => setmodalVisible(false)}
        footer={null}
      >
        <Form onFinish={onFinish} className="max-w-2xl mx-auto">
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Video Upload:
            </label>
            <FilePond
              key={filePondKey}
              files={videoFiles}
              acceptedFileTypes={"video/*"}
              onupdatefiles={(fileItems) => {
                setVideoFiles(fileItems.map((fileItem) => fileItem.file));
              }}
              allowMultiple={false}
              maxFiles={1}
              maxFileSize="100MB"
              allowFileValidateType
              allowFileValidateSize
              server={{
                process: (
                  fieldName,
                  file,
                  metadata,
                  load,
                  error,
                  progress,
                  abort
                ) => {
                  // Handle video upload logic here
                },
              }}
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Image Upload (Up to 8 images):
            </label>
            <FilePond
              key={filePondKey}
              files={imageFiles}
              acceptedFileTypes={"image/*"}
              onupdatefiles={(fileItems) => {
                setImageFiles(fileItems.map((fileItem) => fileItem.file));
              }}
              allowMultiple={true}
              maxFiles={8}
              maxFileSize="256kb"
              allowFileValidateType
              allowFileValidateSize
              server={{
                process: (
                  fieldName,
                  file,
                  metadata,
                  load,
                  error,
                  progress,
                  abort
                ) => {
                  // Handle image upload logic here
                },
              }}
            />
          </div>

          {/* Additional text input field */}
          <Form.Item
            label="Write Claim"
            name="additionalText"
            rules={[
              { required: true, message: "Please enter additional text!" },
              { min: 20, message: "Minimum 20 characters required!" },
              { max: 200, message: "Maximum 200 characters allowed!" },
            ]}
          >
            <Input.TextArea
              value={additionalText}
              onChange={(e) => setAdditionalText(e.target.value)}
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item className="flex justify-center">
            <Button
              type="default"
              htmlType="submit"
              disabled={
                !additionalText.trim() ||
                additionalText.length < 20 ||
                additionalText.length > 200
              }
              className={
                !additionalText.trim() ||
                  additionalText.length < 20 ||
                  additionalText.length > 200
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white"
              }
              loading={loader}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Full Claim Description"
        visible={visible}
        onCancel={() => showModal(false)}
        footer={null}
      >
        {desc}
      </Modal>

      <Modal
        title="Image Preview"
        visible={previewImages.length > 0}
        onCancel={() => setPreviewImages([])}
        footer={null}
        width={1000}
      >
        <Image.PreviewGroup>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "16px",
            }}
          >
            {previewImages.map((filename) => (
              <div
                key={filename}
                className="border p-2 flex justify-center items-center"
              >
                <Image
                  src={`${AdminUrl}/uploads/Claims/${filename}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </Image.PreviewGroup>
      </Modal>
    </div>
  );
};

export default ClaimForm;
