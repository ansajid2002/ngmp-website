import React, { useState, useEffect } from "react";
import {
  Table,
  Modal,
  Pagination,
  Space,
  Tabs,
  Avatar,
  Image,
  Tooltip,
  Button,
  Input,
} from "antd";
import { NavLink } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { AdminUrl } from "../../constant";
import { FiEdit2, FiMail, FiSmartphone } from "react-icons/fi";
import {
  BrandLogoUpdate,
  TrademarkUploader,
  VendorProductImageUploader,
  VendorProfileChange,
} from "../../components";
import { FaGoogle } from "react-icons/fa";
import CustomerProfile from "./components/Avatar";
import { useForm } from "antd/es/form/Form";

const { TabPane } = Tabs;

const CustomerHome = ({ adminLoginData }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [FilteredCustomer, setFilteredCustomer] = useState([]);
  const [selectedCustomers, setselectedCustomers] = useState([]);
  const [imageUploadTab, setImageUploadTab] = useState("1"); // Separate state for the second set of tabs
  const [status, setStatus] = useState(-1); // Separate state for the second set of tabs
  const [page, setPage] = useState(1); // Separate state for the second set of tabs
  const [pageSize, setPageSize] = useState(10); // Separate state for the second set of tabs
  const [totalCustomer, settotalCustomer] = useState(0);
  const [status0, setStatus0] = useState(0);
  const [status1, setStatus1] = useState(0);
  const [status2, setStatus2] = useState(0);
  const [status3, setStatus3] = useState(0);
  const [status4, setStatus4] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const [form] = useForm();

  // import { RiShieldCrossFill } from 'react-icons/ri';
  const callCustomers = async (status, page, pageSize, searchValue) => {
    try {
      const response = await fetch(`${AdminUrl}/api/allCustomers?status=${status}&page=${page}&pageSize=${pageSize}&searchValue=${searchValue}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();

        setCustomers(data?.data);
        setFilteredCustomer(data?.data);
        settotalCustomer(data?.total_count)
        setStatus0(data?.status_counts?.[0]?.count)
        setStatus1(data?.status_counts?.[1]?.count)
        setStatus2(data?.status_counts?.[2]?.count)
        setStatus3(data?.status_counts?.[3]?.count)
        setStatus4(data?.status_counts?.[4]?.count)
      } else {
        // Handle error response
        console.error("Error sending form data:", response.statusText);
      }
    } catch (error) {
      // Handle error
      console.error("Error sending form data:", error);
    }
  };

  useEffect(() => {
    callCustomers(status, page, pageSize, searchValue);
  }, [selectedCustomers]);

  const allVendors = FilteredCustomer.filter((vendor) => vendor);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    setPage(1)
    // Call your search function here based on the value
    callCustomers(status, 1, pageSize, value);
  };

  const getIcon = (verificationMethod) => {
    switch (verificationMethod) {
      case "Email":
        return <FiMail className="text-blue-600 text-xl ml-2" title="Email" />;
      case "Google":
        return (
          <FaGoogle className="text-red-600 text-xl ml-2" title="Google" />
        );
      case "Mobile":
        return (
          <FiSmartphone
            className="text-green-600 text-xl ml-2"
            title="Mobile"
          />
        );
      default:
        return null; // You can set a default icon or return null if no verification method matches
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "customer_id",
      key: "customer_id",
      width: 80,
      sorter: (a, b) => a.customer_id - b.customer_id,
    },
    {
      title: "Name & Contact",
      key: "nameAndContact",
      width: 250,
      render: (record) => (
        <div className="flex items-center">
          {record.picture && !record.picture.startsWith("https://") ? (
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <Image
                src={`${AdminUrl}/uploads/customerProfileImages/${record.picture}`}
                alt={`${record.given_name} ${record.family_name}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : record.picture && record.picture.startsWith("https://") ? (
            <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden">
              <Image
                src={`${record.picture}`}
                alt={`${record.given_name} ${record.family_name}`}
                className="w-full h-full object-cover"
              />
            </div>
          ) : <Avatar size={48} style={{ backgroundColor: "#1890ff" }}>
            {record.given_name?.charAt(0)?.toUpperCase()}
            {record.family_name?.charAt(0)?.toUpperCase()}
          </Avatar>}
          <div className="ml-4">
            <p className="text-gray-700 font-semibold">{`${record.given_name} ${record.family_name}`}</p>
            <p className="text-gray-500">{record.email}</p>
            <p className="text-gray-500">{record.phone_number}</p>
            {/* <div className="flex mt-1">
              <div className="mr-4">
                <span className="text-gray-700 font-semibold">Followers:</span>
                <span className="text-gray-500 ml-1">
                  {record.total_followers}
                </span>
              </div>
              <div>
                <span className="text-gray-700 font-semibold">Following:</span>
                <span className="text-gray-500 ml-1">
                  {record.total_following}
                </span>
              </div>
            </div> */}
          </div>
        </div>
      ),
    },
    {
      title: "Bio",
      dataIndex: "bio",
      key: "bio",
      width: 180,
      render: (bio) => (
        <Tooltip title={bio}>
          {bio ? bio.substring(0, 20) + "..." : "N/A"}
        </Tooltip>
      ),
    },
    {
      title: "Address",
      dataIndex: "address_line_1",
      key: "address_line_1",
      width: 250,
      render: (text, record) => (
        <>
          {record.address_line_1}
          {record.address_line_2 && <br />}
          {record.address_line_2}
          <br />
          {record.city}, {record.state}, {record.zip_code}
          <br />
          {record.country}
        </>
      ),
    },
    {
      title: "Registration Date",
      dataIndex: "created_at",
      key: "created_at",
      width: 180,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (text, record) => (
        <>{new Date(record.created_at).toLocaleString()}</>
      ),
      defaultSortOrder: "desc", // Set the default sorting order to ascending
    },
    {
      title: "Updated",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 180,
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      render: (text, record) => (
        <>{new Date(record.updated_at).toLocaleString()}</>
      ),
    },
    {
      title: "Verified With",
      dataIndex: "verified_with",
      key: "verified_with",
      width: 120,
      render: (verifiedWith) => {
        if (verifiedWith && verifiedWith.length > 0) {
          return (
            <>
              <div className="flex">
                {verifiedWith.map((method) => getIcon(method))}
              </div>
            </>
          );
        }
        return "Not Verified";
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      sorter: (a, b) => a.status - b.status,
      filters: [
        { text: "Pending", value: 0 },
        { text: "Blocked", value: 1 },
        { text: "Archived", value: 2 },
        { text: "Approved", value: 3 },
        { text: "Rejected", value: 4 },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        // 0 - Account will be Pending by default
        // 1 - Account has been Blocked by Admin
        // 2 - Account has been Archived by Admin for violating Terms & Condition
        // 3 - Account has been Approved by Admin
        // 4 - Account has been Rejected by Admin
        let statusText = "";
        switch (status) {
          case 0:
            statusText = <p className="text-orange-500">Pending</p>;
            break;
          case 1:
            statusText = <p className="text-rose-500">Blocked</p>;
            break;
          case 2:
            statusText = <p className="text-orange-500">Archived</p>;
            break;
          case 3:
            statusText = <p className="text-green-500">Approved</p>;
            break;
          case 4:
            statusText = <p className="text-rose-500">Rejected</p>;
            break;
          default:
            statusText = <p className="text-gray-500">Unknown</p>;
        }
        return <span>{statusText}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: 80,
      fixed: 'right',
      render: (record) => (
        <Space size="middle" className="flex">
          <>
            <FiEdit2
              onClick={() => handleUpdate(record.customer_id)}
              className="text-white  w-8 h-8 p-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:text-white "
            />
          </>
        </Space>
      ),
    },
  ];

  const handleTabChangeforTable = (key) => {
    setImageUploadTab(key);
    setStatus(key - 2)
    setPage(1)

    callCustomers(key - 2, 1, pageSize, searchValue);

  };

  const handlePageChange = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize)
    callCustomers(status, page, pageSize, searchValue);
  };

  function handleCreate() {
    // form.resetFields();
    setModalVisible(true);
    setselectedCustomers(null);
    setSelectedKey(null);
  }

  function handleUpdate(key) {
    const selectedRow = FilteredCustomer.find((item) => item.customer_id === key);
    setselectedCustomers(selectedRow);
    form.setFieldsValue(selectedRow);
    setModalVisible(true);
    setSelectedKey(key);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  return (
    <>
      {adminLoginData == null || adminLoginData?.length == 0 ? (
        ""
      ) : (
        <div className="mx-auto p-5 mt-10 sm:ml-72 sm:p-4">
          <h1 className="text-4xl text-gray-700 font-bold mb-2">
            Customer Listing ({totalCustomer || 0})
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
              Manage Customer Listing
            </p>
          </nav>
          <div className="flex justify-center items-center py-4 w-full">
            <Input
              type="text"
              placeholder="Search by Customer Name"
              className="w-1/2"
              value={searchValue}
              onChange={handleInputChange}
            />
          </div>
          {Loading ? (
            "Table Loading"
          ) : (
            <>
              <button
                onClick={handleCreate}
                className="bg-[#EC642A] hover:bg-[#EC642A]/80 text-white rounded-full p-2 z-[999] absolute right-10 top-20"
              >
                <svg
                  className="w-10 h-10 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
              <div className="table-responsive overflow-hidden overflow-x-auto mt-4 ">
                <Tabs
                  defaultActiveKey="1"
                  activeKey={imageUploadTab}
                  onChange={handleTabChangeforTable}
                  centered
                >
                  <TabPane tab={`All (${totalCustomer || 0})`} key="1">
                    <Table
                      columns={columns}
                      dataSource={allVendors}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                      scroll={{
                        x: 1500,
                        y: 700,
                      }}
                    />
                    <div className="mt-4">
                      <Pagination
                        hideOnSinglePage
                        current={page}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={totalCustomer || 0}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Pending (${status0 || 0})`} key="2">
                    <Table
                      columns={columns}
                      dataSource={allVendors}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                      scroll={{
                        x: 1500,
                        y: 700,
                      }}
                    />
                    <div className="mt-4">
                      <Pagination
                        hideOnSinglePage
                        current={page}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={status0}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Blocked (${status1 || 0})`} key="3">
                    <Table
                      columns={columns}
                      dataSource={allVendors}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                      scroll={{
                        x: 1500,
                        y: 700,
                      }}
                    />
                    <div className="mt-4">
                      <Pagination
                        hideOnSinglePage
                        current={page}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={status1}
                      />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={`Archived (${status2 || 0})`}
                    key="4"
                  >
                    <Table
                      columns={columns}
                      dataSource={allVendors}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                      scroll={{
                        x: 1500,
                        y: 700,
                      }}
                    />
                    <div className="mt-4">
                      <Pagination
                        hideOnSinglePage
                        current={page}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={status2}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Approved (${status3 || 0})`} key="5">
                    <Table
                      columns={columns}
                      dataSource={allVendors}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                      scroll={{
                        x: 1500,
                        y: 700,
                      }}
                    />
                    <div className="mt-4">
                      <Pagination
                        hideOnSinglePage
                        current={page}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={status3}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Rejected (${status4 || 0})`} key="6">
                    <Table
                      columns={columns}
                      dataSource={allVendors}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                      scroll={{
                        x: 1500,
                        y: 700,
                      }}
                    />
                    <div className="mt-4">
                      <Pagination
                        hideOnSinglePage
                        current={page}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={status4}
                      />
                    </div>
                  </TabPane>
                </Tabs>
              </div>

              <Modal
                title={
                  selectedKey === null ? "Create Customer" : "Update Customer"
                }
                visible={modalVisible}
                onOk={""}
                onCancel={handleCancel}
                okText={selectedKey === null ? "Create" : "Update"}
                okButtonProps={{
                  style: {
                    backgroundColor: "#1677FF",
                    color: "#fff",
                    display: "none",
                  }, // Set the background color and text color
                  disabled: false,
                }}
                width={600}
              >
                <CustomerProfile
                  selectedKey={selectedKey}
                  selectedCustomers={selectedCustomers}
                  handleCancel={handleCancel}
                  callCustomers={callCustomers}
                />
              </Modal>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CustomerHome;
