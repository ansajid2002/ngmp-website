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
} from "antd";
import React, { useEffect, useState } from "react";
import { AdminUrl } from "../../constant";
import moment from "moment";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { NavLink } from "react-router-dom";

const VendorClaimsAdimin = () => {
  const [error, setError] = useState(null);
  const [claimsData, setClaims] = useState([]);
  const [visible, showModal] = useState(false);
  const [desc, setDescription] = useState("");
  const [openReply, setOpenReply] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [claimId, setSelectedClaim] = useState(null);
  const [claimStatus, setClaimStatus] = useState("");
  const [closureText, setClosureText] = useState("");
  const [previewImages, setPreviewImages] = useState([]);

  const [form] = Form.useForm();

  const columns = [
    {
      title: "Claim ID",
      dataIndex: "claim_id",
      key: "claim_id",
      width: 100,
      sorter: (a, b) => a.claim_id - b.claim_id,
    },
    {
      title: "Vendor",
      dataIndex: "vendor",
      key: "vendor",
      width: 300,
      render: (_, record) => (
        <div className="flex gap-2">
          <Image
            width={50}
            height={50}
            className="w-full rounded-full"
            src={`${AdminUrl}/uploads/vendorBrandLogo/${record.brand_logo?.images[0]}`}
          />
          <div>
            <p>Id:{record.id}</p>
            <p>Name: {record.vendorname}</p>
            <p>Email: {record.email}</p>
          </div>
        </div>
      ),
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
      width: 150,
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
      width: 150,
      render: (reply_description, record) => {
        if (!reply_description) {
          return (
            <Button type="default" onClick={() => handleOpenReply(record)}>
              <FaPlus />
            </Button>
          );
        }
        return (
          <>
            {reply_description}
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

    // Add other columns as needed
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch coupons by vendorId
        const claimResponse = await fetch(`${AdminUrl}/api/getAllClaims`);
        if (!claimResponse.ok) {
          setClaims([]);
        }
        const claimsData = await claimResponse.json();
        console.log(claimsData);
        setClaims(claimsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []);

  const handleOpenReply = (record) => {
    form.setFieldsValue({
      replyText: record.reply_description,
      claimStatus: record.claim_status,
      closureText: record.closure_description,
    });
    // Logic to open the modal for reply
    setOpenReply(true);
    setSelectedClaim(record.claim_id);
  };

  const handleSaveReply = async () => {
    try {
      // Make an API call to update the reply description
      const response = await axios.post(
        `${AdminUrl}/api/updateClaimReply`,
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
          claim.claim_id === claimId
            ? {
                ...claim,
                reply_description: replyText,
                claim_status: claimStatus,
                closure_description: closureText,
                reply_date: response.data.reply_date, // Adjust this based on your API response
                closure_date: response.data.closure_date,
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
        Manage Vendor's Claims
      </h1>
      <nav
        aria-label="Breadcrumbs"
        className="order-first flex text-sm font-semibold sm:space-x-2"
      >
        <NavLink to={`${AdminUrl}`}>
          <a
            href=""
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
          Manage Vendor's Claims
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
          />
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

export default VendorClaimsAdimin;
