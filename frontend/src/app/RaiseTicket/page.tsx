"use client"
import { Button, Form, Image, Input, Modal, Pagination, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react'
import { Dropzone, ExtFile, FileMosaic, ValidateFileResponse } from "@files-ui/react";
import { useAppSelector } from '@/redux/store';
import axios from 'axios';
import { AdminUrl } from '../layout';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import Swal from 'sweetalert2';
import moment from 'moment';

// Register the plugins
registerPlugin();
const RaiseTicket = () => {
    const [videoFiles, setVideoFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);
    const [modalVisible, setmodalVisible] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState(null);
    const [claimsData, setClaims] = useState(null);
    const [visible, showModal] = useState(false);
    const [desc, setDescription] = useState("");
    const [previewImages, setPreviewImages] = useState([]);
    const [loader, setLoader] = useState(false);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const { customerData } = useAppSelector((store) => store.customerData)
    const customer_id = customerData?.customer_id

    const [filePondKey, setFilePondKey] = useState(Date.now()); // Used to reset FilePond instances


    const [form] = Form.useForm()

    // Function to handle form submission
    const onFinish = async (values: any) => {
        if (!customer_id) return alert("Kindly Login First....")
        try {
            setLoader(true);

            // Create a FormData object to append the files
            const formData = new FormData();

            if (videoFiles?.length === 0 || imageFiles?.length === 0) return Swal.fire({
                icon: "error",
                title: "Error",
                text: "Choose Your Claim Media Files.",
            });

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

            formData.append("customer_id", customer_id);

            // Append the additional text input value
            formData.append("additionalText", values.additionalText);

            // Make an HTTP request to the server
            const response = await axios.post(`${AdminUrl}/api/Customer_claims`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setClaims((prevClaims) => [response.data.data, ...(prevClaims ?? [])]);

            Swal.fire({
                icon: "success",
                title: "Claim Submitted Successfully!",
                text: response.data.message, // You can customize this based on your API response
            });

            // Reset state values and FilePond instances on successful response
            setVideoFiles([]);
            setImageFiles([]);
            setFilePondKey(Date.now()); // Reset FilePond instances by changing the key
            setmodalVisible(false);
            form.resetFields()
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

    const fetchData = async (page, pageSize, search) => {
        if (customer_id !== undefined) {
            setLoader(true);
            try {
                // Construct the URL with page, pageSize, and search parameters
                let apiUrl = `${AdminUrl}/api/getClaimsofCustomers?customer_id=${customer_id}&page=${page}&pageSize=${pageSize}&search=${search}`;

                // Fetch claims by customer_id, page, pageSize, and search
                const claimResponse = await fetch(apiUrl);

                if (!claimResponse.ok) {
                    setClaims([]);
                }

                const claimsData = await claimResponse.json();
                console.log(claimsData);
                setClaims(claimsData?.claims);
                setTotal(claimsData?.totalClaims);
            } catch (err) {
                setError(err.message || '');
            } finally {
                setLoader(false);
            }
        }
    };

    useEffect(() => {
        !claimsData && fetchData(1, 10, '');
    }, [customer_id]);

    const columns = [
        {
            title: "Claim ID",
            dataIndex: "customer_claim_id",
            key: "customer_claim_id",
            sorter: (a, b) => a.customer_claim_id - b.customer_claim_id,
        },
        {
            title: "Claim Status",
            dataIndex: "customer_claim_status",
            key: "customer_claim_status",
            filters: [
                { text: "Pending", value: "Pending" },
                { text: "Ongoing", value: "Ongoing" },
                { text: "Closed", value: "Closed" },
            ],
            onFilter: (value, record) => record.customer_claim_status === value,
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
            dataIndex: "customer_claim_description",
            key: "customer_claim_description",
            width: 300,
            render: (text) => {
                if (text?.length > 20) {
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
            dataIndex: "customer_claim_date",
            key: "customer_claim_date",
            defaultSortOrder: "ascend",

            render: (date) => moment(date).format("LLL"),
            sorter: (a, b) => new Date(b.customer_claim_date) - new Date(a.customer_claim_date), // Sorting function
        },
        {
            title: "Response Description",
            dataIndex: "customer_reply_description",
            key: "customer_reply_description",
        },
        {
            title: "Response Date",
            dataIndex: "customer_reply_date",
            key: "customer_reply_date",
            render: (date) => (date ? moment(date).format("LLL") : "N/A"),
        },
        {
            title: "Closure Description",
            dataIndex: "customer_closure_description",
            key: "customer_closure_description",
        },
        {
            title: "Closure Date",
            dataIndex: "customer_closure_date",
            key: "customer_closure_date",
            render: (date) => (date ? moment(date).format("LLL") : "N/A"),
        },
        {
            title: "Video",
            dataIndex: "customer_video_files",
            key: "customer_video_files",
            render: (customer_video_files) => (
                <Space>
                    <a
                        href={`${AdminUrl}/uploads/Customer_Claims/${customer_video_files}`}
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
            dataIndex: "customer_image_files",
            key: "customer_image_files",
            render: (customer_image_files) => (
                <Space className="gap-2 flex">
                    <a
                        onClick={() => setPreviewImages(customer_image_files)}
                        rel="noopener noreferrer"
                    >
                        View Images
                    </a>
                </Space>
            ),
        },
        // Add other columns as needed
    ];

    const handleSearch = (value) => {
        setSearchText(value)
        fetchData(1, 10, value)
    }
    return (
        <>
            <div className="p-5 md:p-8 bg-white shadow-lg rounded mb-8 flex flex-col xl:flex-row items-center">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-xl font-semibold text-heading">All Claims</h1>
                </div>
                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <div
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
                            type="number"
                            id="search"
                            name="searchText"
                            className="ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                            placeholder="Search by Claim Id"
                            aria-label="Search"
                            autoComplete="off"
                            value={searchText}
                            onChange={(e) => handleSearch(e.target.value)}
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

                <Modal
                    title={"Raise Claim"}
                    visible={modalVisible}
                    onOk={onFinish}
                    onCancel={() => setmodalVisible(false)}
                    footer={null}
                >
                    <Form form={form} onFinish={onFinish} className="max-w-2xl mx-auto">
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
                                maxFileSize="5MB"
                                allowFileValidateType
                                allowFileValidateSize


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
                                value={'asd'}
                                autoSize={{ minRows: 3, maxRows: 6 }}
                            />
                        </Form.Item>

                        <Form.Item className="flex justify-center">
                            <Button
                                type="default"
                                htmlType="submit"
                                loading={loader}
                            // disabled={
                            //     !additionalText.trim() ||
                            //     additionalText.length < 20 ||
                            //     additionalText.length > 200
                            // }
                            // className={
                            //     !additionalText.trim() ||
                            //         additionalText.length < 20 ||
                            //         additionalText.length > 200
                            //         ? "bg-gray-400 cursor-not-allowed"
                            //         : "bg-blue-500 text-white"
                            // }
                            // loading={loader}
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
                                        src={`${AdminUrl}/uploads/Customer_Claims/${filename}`}
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
            <div className='p-10'>
                {error ? (
                    <p>Error: {error}</p>
                ) : (
                    <div className="w-full overflow-hidden overflow-x-auto bg-white">
                        <Table
                            dataSource={claimsData || []} // Use filtered list of coupons
                            columns={columns}
                            rowKey="coupon_id"
                            pagination={false}
                        />
                        <div className='flex justify-end mt-10'>
                            <Pagination
                                total={total}
                                current={page}
                                onChange={(page, size) => {
                                    setPage(page)
                                    fetchData(page, size, '')
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>

    )
}

export default RaiseTicket