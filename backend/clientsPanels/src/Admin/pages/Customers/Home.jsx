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
  const [currentPage, setCurrentPage] = useState(1);
  const [customers, setCustomers] = useState([]);
  const [FilteredCustomer, setFilteredCustomer] = useState([]);
  const [selectedCustomers, setselectedCustomers] = useState([]);
  const [imageUploadTab, setImageUploadTab] = useState("1"); // Separate state for the second set of tabs

  const [form] = useForm();

  // import { RiShieldCrossFill } from 'react-icons/ri';
  const callCustomers = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/allCustomers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        const sortedCustomers = data.sort(
          (a, b) => b.total_followers - a.total_followers
        );
        setCustomers(sortedCustomers);
        setFilteredCustomer(sortedCustomers);
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
    callCustomers();
  }, [selectedCustomers]);

  const allVendors = FilteredCustomer.filter((vendor) => vendor);
  const activeVendors = FilteredCustomer.filter((vendor) => vendor.status === 0);
  const blockedVendors = FilteredCustomer.filter((vendor) => vendor.status === 1);
  const archivedVendors = FilteredCustomer.filter((vendor) => vendor.status === 2);
  const approvedVendor = FilteredCustomer.filter((vendor) => vendor.status === 3);
  const rejectvendor = FilteredCustomer.filter((vendor) => vendor.status === 4);
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    // Call your search function here based on the value
    const searchResults = searchCustomers(value);
    setFilteredCustomer(searchResults);
  };

  const searchCustomers = (searchText) => {
    return customers.filter((customer) => {
      const fullName = `${customer.given_name} ${customer.family_name}`;
      const lowerCaseSearch = searchText.toLowerCase();
      return (
        fullName.toLowerCase().includes(lowerCaseSearch) ||
        customer.email.toLowerCase().includes(lowerCaseSearch)
      );
    });
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
      width: 40,
      sorter: (a, b) => a.customer_id - b.customer_id,
    },
    {
      title: "Name & Contact",
      key: "nameAndContact",
      width: 240,
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
            <div className="flex mt-1">
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
            </div>
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
  };

  const pageSize = 10;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  function handleCreate() {
    // form.resetFields();
    setModalVisible(true);
    setselectedCustomers(null);
    setSelectedKey(null);
  }

  function handleUpdate(key) {
    callCustomers();
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
            Customer Listing ({FilteredCustomer?.length})
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
                  <TabPane tab={`All (${allVendors?.length})`} key="1">
                    <Table
                      columns={columns}
                      dataSource={allVendors?.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                    />
                    <div className="mt-4">
                      <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={allVendors?.length}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Pending (${activeVendors?.length})`} key="2">
                    <Table
                      columns={columns}
                      dataSource={activeVendors?.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                    />
                    <div className="mt-4">
                      <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={activeVendors?.length}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Blocked (${blockedVendors?.length})`} key="3">
                    <Table
                      columns={columns}
                      dataSource={blockedVendors?.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                    />
                    <div className="mt-4">
                      <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={blockedVendors?.length}
                      />
                    </div>
                  </TabPane>
                  <TabPane
                    tab={`Archived (${archivedVendors?.length})`}
                    key="4"
                  >
                    <Table
                      columns={columns}
                      dataSource={archivedVendors?.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                    />
                    <div className="mt-4">
                      <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={archivedVendors?.length}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Approved (${approvedVendor?.length})`} key="5">
                    <Table
                      columns={columns}
                      dataSource={approvedVendor?.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                    />
                    <div className="mt-4">
                      <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={approvedVendor?.length}
                      />
                    </div>
                  </TabPane>
                  <TabPane tab={`Rejected (${rejectvendor?.length})`} key="6">
                    <Table
                      columns={columns}
                      dataSource={rejectvendor?.slice(
                        (currentPage - 1) * pageSize,
                        currentPage * pageSize
                      )}
                      pagination={false}
                      className="w-full mt-10"
                      rowClassName="dark:bg-secondary-dark-bg no-hover text-gray-600 dark:text-gray-200 hover:text-slate-800 dark:hover:text-slate-800 rounded-none border-b-2 border-zinc-300"
                    />
                    <div className="mt-4">
                      <Pagination
                        current={currentPage}
                        onChange={handlePageChange}
                        pageSize={pageSize}
                        total={rejectvendor?.length}
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
