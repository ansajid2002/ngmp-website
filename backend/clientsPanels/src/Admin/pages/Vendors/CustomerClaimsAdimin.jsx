import {
    Form,
    Input,
    Button,
    Modal,
    Table,
    Tag,
    Space,
    Image,
    Select,
    Pagination,
} from "antd";
import React, { useEffect, useState } from "react";
import { AdminUrl } from "../../constant";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";

const CustomerClaimsAdimin = () => {
    const [error, setError] = useState(null);
    const [claimsData, setClaims] = useState(null);
    const [visible, showModal] = useState(false);
    const [desc, setDescription] = useState("");
    const [openReply, setOpenReply] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [claimId, setSelectedClaim] = useState(null);
    const [claimStatus, setClaimStatus] = useState("");
    const [closureText, setClosureText] = useState("");
    const [previewImages, setPreviewImages] = useState([]);
    const [total, settotal] = useState(0);
    const [page, setPage] = useState(1);

    const [form] = Form.useForm();

    const columns = [
        {
            title: "Claim ID",
            dataIndex: "customer_claim_id",
            key: "customer_claim_id",
            width: 150,
            sorter: (a, b) => a.customer_claim_id - b.customer_claim_id,
        },
        {
            title: "Customer",
            dataIndex: "CustomerId",
            key: "CustomerId",
            width: 300,
            render: (_, record) => (
                <div className="flex gap-2">
                    <Image
                        width={50}
                        height={50}
                        className="w-full rounded-full"
                        src={`${AdminUrl}/uploads/customerProfileImages/${record.picture}`}
                    />
                    <div>
                        <p>Id:{record.customer_id}</p>
                        <p>Name: {record.family_name}</p>
                        <p>Email: {record.email}</p>
                    </div>
                </div>
            ),
        },
        {
            title: "Claim Status",
            dataIndex: "customer_claim_status",
            key: "customer_claim_status",
            width: 150,
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
            width: 150,
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
            title: "Video",
            dataIndex: "customer_video_files",
            key: "customer_video_files",
            width: 150,
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
            width: 150,

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
        {
            title: "Claim Date",
            dataIndex: "customer_claim_date",
            key: "customer_claim_date",
            defaultSortOrder: "ascend",
            width: 150,
            render: (date) => moment(date).format("LLL"),
            sorter: (a, b) => new Date(b.customer_claim_date) - new Date(a.customer_claim_date), // Sorting function
        },
        {
            title: "Response Description",
            dataIndex: "customer_reply_description",
            key: "customer_reply_description",
            width: 150,
            render: (customer_reply_description, record) => {
                if (!customer_reply_description) {
                    return (
                        <Button type="default" onClick={() => handleOpenReply(record)}>
                            <FaPlus />
                        </Button>
                    );
                }
                return (
                    <>
                        {customer_reply_description}
                        <a
                            onClick={() => handleOpenReply(record)}
                            className="text-blue-800"
                        >
                            ... Edit
                        </a>
                    </>
                );
            },
        },
        {
            title: "Response Date",
            dataIndex: "customer_reply_date",
            key: "customer_reply_date",
            width: 150,
            render: (date) => (date ? moment(date).format("LLL") : "N/A"),
        },
        {
            title: "Closure Description",
            dataIndex: "customer_closure_description",
            key: "customer_closure_description",
            width: 200
        },
        {
            title: "Closure Date",
            dataIndex: "customer_closure_date",
            key: "customer_closure_date",
            width: 200,
            render: (date) => (date ? moment(date).format("LLL") : "N/A"),
        },

        // Add other columns as needed
    ];

    const fetchData = async (page, pageSize) => {
        try {
            // Fetch coupons by CustomerId
            const claimResponse = await fetch(`${AdminUrl}/api/getAllCustomerClaims?page=${page}&pageSize=${pageSize}`);
            if (!claimResponse.ok) {
                setClaims([]);
            }
            const claimsData = await claimResponse.json();
            setClaims(claimsData?.claims);
            settotal(claimsData?.totalClaims);
        } catch (err) {
            setError(err.message);
        }
    };

    useEffect(() => {
        !claimsData && fetchData(1, 10);
    }, [claimsData]);

    const handleOpenReply = (record) => {
        form.setFieldsValue({
            replyText: record.customer_reply_description,
            claimStatus: record.customer_claim_status,
            closureText: record.customer_closure_description,
        });
        // Logic to open the modal for reply
        setOpenReply(true);
        setSelectedClaim(record.customer_claim_id);
    };

    const handleSaveReply = async () => {
        try {
            // Make an API call to update the reply description
            const response = await axios.post(
                `${AdminUrl}/api/updateCustomer_ClaimReply`,
                {
                    claimId, // Provide the claim ID you want to update
                    replyDescription: replyText,
                    closureText,
                    claimStatus,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // After successfully updating the reply, you might want to update the UI accordingly
            // For example, update the claimsData state with the new reply description and date
            setClaims((prevClaims) =>
                prevClaims.map((claim) =>
                    claim.customer_claim_id === claimId
                        ? {
                            ...claim,
                            customer_reply_description: replyText,
                            customer_claim_status: claimStatus,
                            customer_closure_description: closureText,
                            customer_reply_date: response.data.customer_reply_date, // Adjust this based on your API response
                            customer_closure_date: response.data.customer_closure_date,
                        }
                        : claim
                )
            );

            setOpenReply(false); // Close the modal after saving
            setClaimStatus("");
            setReplyText("");
            setClosureText("");
        } catch (error) {
            console.error("Error updating reply:", error);
        }
    };

    return (
        <div className="sm:p-4 sm:ml-64 mt-10">
            <h1 className="text-4xl text-gray-700 font-bold mb-2">
                Manage Customer's Ticket
            </h1>
            <nav
                aria-label="Breadcrumbs"
                className="order-first flex text-sm font-semibold sm:space-x-2"
            >
                <NavLink to={`/`}>
                    <a
                        className="hover:text-slate-600 hidden text-slate-500 sm:block"
                    >
                        Home
                    </a>
                </NavLink>

                <div
                    aria-hidden="true"
                    className="hidden select-none text-slate-400 sm:block"
                >
                    /
                </div>
                <p className="text-slate-500 hover:text-slate-600">
                    Manage Customer's Ticket
                </p>
            </nav>

            {error ? (
                <p>Error: {error}</p>
            ) : (
                <div className="mt-10">
                    <Table
                        dataSource={claimsData || []} // Use filtered list of coupons
                        columns={columns}
                        rowKey="coupon_id"
                        pagination={false}
                        scroll={{
                            x: 1200,
                            y: 600
                        }}
                    />
                    <div className="flex justify-end mt-10">
                        <Pagination
                            total={total}
                            defaultCurrent={1}
                            current={page}
                            onChange={(page, pageSize) => {
                                setPage(page)
                                fetchData(page, pageSize)
                            }}
                        />
                    </div>
                </div>
            )}

            <Modal
                title="Full Claim Description"
                visible={visible}
                onCancel={() => showModal(false)}
                footer={null}
            >
                {desc}
            </Modal>
            <Modal
                title="Add Reply"
                visible={openReply}
                onCancel={() => setOpenReply(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleSaveReply}>
                    {/* Reply Description */}
                    <Form.Item
                        label="Reply Description"
                        name="replyText"
                        rules={[
                            { required: true, message: "Please enter reply text!" },
                            { min: 5, message: "Minimum 5 characters required!" },
                            { max: 200, message: "Maximum 200 characters allowed!" },
                        ]}
                    >
                        <Input.TextArea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            rows={4}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    {/* Claim Status */}
                    <Form.Item
                        label="Claim Status"
                        name="claimStatus"
                        rules={[
                            { required: true, message: "Please select a claim status!" },
                        ]}
                    >
                        <Select
                            defaultValue="Pending"
                            onChange={(value) => setClaimStatus(value)}
                        >
                            <Option value="Pending">Pending</Option>
                            <Option value="Ongoing">Ongoing</Option>
                            <Option value="Closed">Closed</Option>
                        </Select>
                    </Form.Item>

                    {/* Closure Text */}
                    <Form.Item label="Closure Text" name="closureText">
                        <Input.TextArea
                            value={closureText}
                            onChange={(e) => setClosureText(e.target.value)}
                            rows={4}
                            autoSize={{ minRows: 3, maxRows: 6 }}
                        />
                    </Form.Item>

                    {/* Save Reply Button */}
                    <Form.Item className="flex justify-center">
                        <Button
                            type="default"
                            className={
                                !replyText.trim() ||
                                    replyText.length < 5 ||
                                    replyText.length > 200
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-blue-500 text-white"
                            }
                            htmlType="submit"
                            disabled={
                                !replyText.trim() ||
                                replyText.length < 5 ||
                                replyText.length > 200
                            }
                        >
                            Save Reply
                        </Button>
                    </Form.Item>
                </Form>
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
    );
};

export default CustomerClaimsAdimin;
