import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Image,
  Descriptions,
  Pagination,
  Row,
  Col,
  Tabs,
  Badge,
  Tooltip,
  Dropdown,
  Menu,
  Input,
  InputNumber,
} from "antd";
import {
  FaBoxOpen,
  FaCheck,
  FaClock,
  FaCross,
  FaExchangeAlt,
  FaFilePdf,
  FaMapPin,
  FaShippingFast,
  FaTimes,
  FaTruck,
  FaTruckMoving,
  FaTruckPickup,
  FaUndo,
} from "react-icons/fa";
import { AdminUrl, ProductImageUrl } from "../../Admin/constant";
import jsPDF from "jspdf";
import {
  CalendarOutlined,
  MoreOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  UndoOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import autoTable from "jspdf-autotable"; // Import the autotable function from jspdf-autotable
import OrderMetics from "./OrderMetrics";
import { DatePicker } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import Swal from "sweetalert2"; // Import SweetAlert2
import { RiRefund2Fill } from "react-icons/ri";
import { DateTime } from 'luxon';
import moment from "moment";
import CreateShip from "./CreateShip";
import { FiMap } from "react-icons/fi";
import { websiteUrl } from "../../App";
import { AiOutlineDeliveredProcedure } from "react-icons/ai";

const OrderManagementTable = ({
  vendorDatastate,
  type,
  conversionRates,
  isCurrencyloading,
}) => {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [showCalendar, setshowCalendar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vendorOrder, setvendorOrder] = useState([]);
  const [FilteredOrder, setFilteredOrder] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [DownloadOrders, setDownloadOrders] = useState([]);
  const [filteredDateRange, setFilteredDateRange] = useState(null);
  const [ShipmentModal, setShipmentModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // console.log(type, "Type");
  const vendorId = vendorDatastate?.[0].id;
  const { confirm } = Modal; // Import the Modal component


  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    callVendorProductOrder(1, 10, value)

    setFilteredOrder(filteredProducts);
  };


  const handleDateRangeChange = (dates) => {
    setFilteredDateRange(dates);
  };

  const showProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setProductModalVisible(true);
  };
  const showCustomerDetailsModal = (product) => {
    setSelectedCustomer(product);
    console.log(product);
    setCustomerModalVisible(true);
  };

  const callVendorProductOrder = async (page, pageSize, value) => {
    try {
      const response = await fetch(`${AdminUrl}/api/VendorProductOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, vendorId, page, pageSize, value }),
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setvendorOrder(data);
        setFilteredOrder(data);
        setDownloadOrders(data);
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

    callVendorProductOrder(page, pageSize, searchValue);
  }, []);


  const statusColorMap = {
    Ordered: "blue",
    Confirmed: "green",
    Shipped: "blue", // You can adjust this color as needed
    Returned: "orange",
    Refunded: "yellow",
    Exchanged: "orange",
    Cancelled: "red",
    Delivered: "green",
  };

  const statusIconMap = {
    Ordered: <FaClock />,
    Confirmed: <FaCheck />,
    Shipped: <FaTruck />,
    Returned: <FaUndo />,
    Exchanged: <FaExchangeAlt />,
    Refunded: <RiRefund2Fill />,
    Cancelled: <FaTimes />,
    Delivered: <FaTruck />,
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      defaultSortOrder: "ascend",
      sorter: (a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (dateA.toDateString() === today.toDateString()) {
          return -1; // Date A is "Today", so it comes first
        } else if (dateB.toDateString() === today.toDateString()) {
          return 1; // Date B is "Today", so it comes first
        } else if (dateA.toDateString() === yesterday.toDateString()) {
          return -1; // Date A is "Yesterday", so it comes next
        } else if (dateB.toDateString() === yesterday.toDateString()) {
          return 1; // Date B is "Yesterday", so it comes next
        } else {
          return dateB - dateA; // Compare other dates normally in descending order
        }
      },
      render: (created_at) => {
        const date = new Date(created_at);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        let dateString;

        if (date.toDateString() === today.toDateString()) {
          dateString = "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
          dateString = "Yesterday";
        } else {
          dateString = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }

        return (
          <p
            style={{
              fontSize: "16px", // Adjust the font size as needed
              fontWeight: "bold", // Set text to bold
              fontFamily: "Arial", // Change to desired font family
              margin: "0", // Remove any margin to avoid extra spacing
            }}
          >
            {dateString}
          </p>
        );
      },
      // Add filter properties
    },


    {
      title: "Order ID",
      dataIndex: "orderid",
      key: "orderid",
      width: 80,
      render: (orderid, record) => {
        return (
          <Button type="link" onClick={() => showProductDetailsModal(record)}>
            {orderid}
          </Button>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 100,
      render: (product_name, record) => {
        return (
          <a
            href={`${websiteUrl}/product-detail?product=${record.prod_slug}&uniqueid=${record.product_uniqueid}`}
            target="_blank"
            className="line-clamp-2 min-w-[100px]"
          >
            {product_name}
          </a>
        );

      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      width: 100,
      render: (quantity, record) => {
        return (

          <h1 className="text-center font-bold">{`${quantity}`}</h1>
        );
      },
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      width: 150,
      render: (total_amount, record) =>
        <>
          <p className=" font-sans text-sm font-bold">{`$${total_amount}`}</p>
        </>
    },
    {
      title: "Customer Info",
      dataIndex: "customer_info",
      key: "customer_info",
      width: 150,
      render: (customer_info, record) => {
        return (

          <p onClick={() => showCustomerDetailsModal(record?.customerInfo)} className=" font-sans text-left text-sm font-semibold cursor-pointer hover:text-gray-400 min-w-[100px] line-clamp-2">{`${record.customerInfo?.given_name} ${record.customerInfo?.family_name}`} <br />  CID - ({record.customerInfo?.customer_id})
          </p>
        )
      }

    },
    {
      title: "Order Date",
      dataIndex: "created_at",
      key: "created_at",
      width: 250,
      sorter: (a, b) => new Date(a.created_at) - new Date(b.created_at),
      render: (created_at, record) => {
        // const formattedDate = new Date(created_at).toLocaleDateString("en-US", {
        //   year: "numeric",
        //   month: "short",
        //   day: "numeric",
        //   hour: "numeric",
        //   minute: "numeric",
        //   hour12: true,
        // });

        return <p className="text-[12px]">{moment(record.created_at).format('LLL')}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "order_status",
      key: "order_status",
      width: 150,
      onFilter: (value, record) => record.order_status.includes(value),
      render: (order_status) => (
        <Tag
          className={`flex justify-center items-center px-2 py-2 border-none text-sm text-${statusColorMap[order_status]}-500`}
        >
          {statusIconMap[order_status]}
          <p className="px-2">{order_status}</p>
        </Tag>
      ),
    },
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
      width: 150,
      render: (transactionId) => transactionId || "N/A", // Render 'N/A' if transaction_id is null
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
      width: 150,
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      width: 80,
    },

  ];


  const handleShipmentModal = (record) => {
    setShipmentModal(true)
    setSelectedProduct(record)
  }
  // Define a function to send the status update request
  const sendStatusUpdateRequest = async (order_id, status, orderid, vendorId) => {
    try {
      const requestData = {
        order_id: order_id,
        status: status,
        vendorId: vendorId,
        orderid: orderid
      };

      const response = await fetch(`${AdminUrl}/api/manageStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const updatedOrders = vendorOrder.map((order) => {
          if (order.order_id === order_id) {
            return {
              ...order,
              order_status: status,
            };
          }
          return order;
        });

        setvendorOrder(updatedOrders);
        setFilteredOrder(updatedOrders);

        // Display a success message using SweetAlert2
        Swal.fire({
          icon: "success",
          title: `Order ${status} successfully`,
          showConfirmButton: false,
          timer: 1500, // Automatically close after 1.5 seconds
        });
      } else {
        // Display an error message using SweetAlert2
        Swal.fire({
          icon: "error",
          title: `Error ${status} order`,
          text: "An error occurred while updating the order status.",
        });
      }
    } catch (error) {
      console.error(`An error occurred while ${status}ing the order`, error);

      // Display an error message using SweetAlert2
      Swal.fire({
        icon: "error",
        title: `Error ${status}ing order`,
        text: "An error occurred while updating the order status.",
      });
    }
  };

  // Define the handleActionClick function
  const handleActionClick = (action, order_id, orderid, vendorId) => {
    let confirmationMessage = "";
    let actionIcon = null;
    let valuableInfo = "";
    let okButtonText = "OK";
    let status = "";
    let buttonColor = "";

    switch (action) {
      case "confirm":
        confirmationMessage = "Are you sure you want to confirm this order?";
        actionIcon = <CheckCircleOutlined className="text-green-600" />;
        valuableInfo = "confirm this order to proceed.";
        okButtonText = "Confirm";
        status = "Confirmed";
        buttonColor = "green";
        break;
      case "cancel":
        confirmationMessage = "Are you sure you want to cancel this order?";
        actionIcon = <CloseCircleOutlined className="text-red-600" />;
        valuableInfo = "Cancelling this order will mark it as cancelled.";
        okButtonText = "Cancel";
        status = "Cancelled";
        buttonColor = "red";
        break;
      case "return":
        confirmationMessage =
          "Are you sure you want to process a return for this order?";
        actionIcon = <UndoOutlined className="text-blue-600" />;
        valuableInfo =
          "Processing a return for this order will initiate a return request.";
        okButtonText = "Return";
        status = "Returned";
        buttonColor = "blue";
        break;
      case "refund":
        confirmationMessage =
          "Are you sure you want to process a refund for this order?";
        actionIcon = <UndoOutlined className="text-blue-600" />;
        valuableInfo =
          "Processing a refund for this order will initiate a refund request.";
        okButtonText = "Refund";
        status = "Refunded";
        buttonColor = "blue";
        break;
      case "exchange":
        confirmationMessage =
          "Are you sure you want to process an exchange for this order?";
        actionIcon = <SwapOutlined className="text-orange-600" />;
        valuableInfo =
          "Processing an exchange for this order will initiate an exchange request.";
        okButtonText = "Exchange";
        status = "Exchanged";
        buttonColor = "orange";
        break;
      default:
        break;
    }

    confirm({
      title: "Confirm Action",
      icon: actionIcon,
      content: (
        <div>
          <p>{confirmationMessage}</p>
          <p style={{ color: buttonColor }}>{valuableInfo}</p>
        </div>
      ),
      okText: okButtonText,
      okButtonProps: {
        style: {
          background: buttonColor,
          borderColor: buttonColor,
          color: "white",
        },
      },
      onOk() {
        sendStatusUpdateRequest(order_id, status, orderid, vendorId);
      },
      onCancel() {
        // User canceled the action
      },
    });
  };

  const statusSteps = [
    { status: "Ordered", label: "Order Placed", color: "blue" },
    { status: "Confirmed", label: "Order Confirmed", color: "orange" },
    { status: "Processing", label: "Order Processing", color: "orange" },
    { status: "Shipped", label: "Order Shipped", color: "green" },
    { status: "Delivered", label: "Order Delivered", color: "green" },
    { status: "Cancelled", label: "Order Cancelled", color: "red" },
  ];

  // Find the corresponding status step object based on the order status
  const currentStep = statusSteps.find(
    (step) => step.status === selectedProduct?.order_status
  );

  const handleDownloadPDF = () => {
    if (!jsPDF) {
      return;
    }

    const doc = new jsPDF();
    const shortenedTableHeaders = [
      "ID",
      "Prod",
      "Date",
      "Amount",
      "Status",
      "Trans",
      "Method",
      "Pay",
    ];

    const filteredOrders = DownloadOrders.filter((order) => {
      const orderDate = new Date(order.created_at);
      return (
        !filteredDateRange ||
        (orderDate >= filteredDateRange[0] && orderDate <= filteredDateRange[1])
      );
    });

    const sortedVendorOrder = filteredOrders
      .slice()
      .sort((a, b) => a.order_id - b.order_id);


    const tableData = sortedVendorOrder.map((order) => [
      order.order_id,
      order.product_name,
      moment(order.created_at).format('MMMM Do YYYY, h:mm:ss a'), // Change the format here
      `${order.currency_symbol} ${order.total_amount}`,
      order.order_status,
      order.transaction_id || "N/A",
      order.payment_method,
      order.payment_status,
    ]);

    const startY = 46;
    const startX = 10;

    const logoDataURL = "/logo.png";

    const logoElement = document.createElement("img");
    logoElement.src = logoDataURL;

    logoElement.onload = function () {
      const logoWidth = 20;
      const logoHeight = (logoElement.height * logoWidth) / logoElement.width;

      const tableOptions = {
        startY,
        startX,
        margin: { top: 10, bottom: 10 },
        headStyles: { fontSize: 8, textColor: [255, 255, 255] },
        bodyStyles: { fontSize: 8 },
        styles: { overflow: "linebreak" },
        columnStyles: {
          2: { columnWidth: "auto" },
          3: { columnWidth: "auto" },
          4: { columnWidth: "auto" },
          6: { columnWidth: "auto" },
          8: { columnWidth: "auto" },
        },
      };

      const titleText = "All Orders";
      const dateRangeText = filteredDateRange
        ? `Date Range: ${filteredDateRange[0].format(
          "DD MMM, YYYY"
        )} - ${filteredDateRange[1].format("DD MMM, YYYY")}`
        : "Overall Records";

      const textWidth =
        (doc.getStringUnitWidth(titleText) * doc.internal.getFontSize()) /
        doc.internal.scaleFactor;
      const pageWidth = doc.internal.pageSize.getWidth();

      doc.addImage(logoElement, "PNG", 10, 15, logoWidth, logoHeight);
      doc.text(titleText, (pageWidth - textWidth) / 2, 25);
      doc.text(
        dateRangeText,
        (pageWidth -
          (doc.getStringUnitWidth(dateRangeText) * doc.internal.getFontSize()) /
          doc.internal.scaleFactor) /
        2,
        35
      );
      doc.setFontSize(10);

      doc.autoTable(shortenedTableHeaders, tableData, tableOptions);
      doc.save("order_management.pdf");
    };
  };

  const generateOrderTableContent = (orderStatus) => {
    let filteredOrders;
    if (orderStatus === "All") {
      filteredOrders = FilteredOrder.filter((order) => {
        if (!filteredDateRange) {
          return true; // No filter applied
        }
        const orderDate = new Date(order.created_at);
        const startDate = new Date(filteredDateRange[0]);
        startDate.setDate(startDate.getDate() - 1); // Subtract 1 day from the start date
        const endDate = new Date(filteredDateRange[1]);
        return orderDate >= startDate && orderDate <= endDate;
      });
    } else {
      filteredOrders = FilteredOrder
        .filter((order) => order.order_status === orderStatus)
        .filter((order) => {
          if (!filteredDateRange) {
            return true; // No filter applied
          }
          const orderDate = new Date(order.created_at);
          const startDate = new Date(filteredDateRange[0]);
          startDate.setDate(startDate.getDate() - 1); // Subtract 1 day from the start date
          const endDate = new Date(filteredDateRange[1]);
          return orderDate >= startDate && orderDate <= endDate;
        });
    }

    const groupedOrders = filteredOrders.reduce((result, order) => {
      const orderDate = new Date(order.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

      if (!result[orderDate]) {
        result[orderDate] = [];
      }

      result[orderDate].push(order);
      return result;
    }, {});

    const expandedRowKeys = Object.keys(groupedOrders);

    return (
      <div className="w-full overflow-hidden overflow-x-auto">
        <Table
          columns={columns.slice(0, -11)}
          dataSource={Object.entries(groupedOrders).map(
            ([orderDate, orders]) => ({
              created_at: orderDate,
              orders,
            })
          )}
          pagination={false}
          className="ant-table-bordered"
          expandable={{
            expandedRowKeys: expandedRowKeys,
            onExpand: (expanded, record) => {
              // This part can be left as is
              if (expanded) {
                setExpandedRowKeys((prevKeys) => [
                  ...prevKeys,
                  record.created_at,
                ]);
              } else {
                setExpandedRowKeys((prevKeys) =>
                  prevKeys.filter((key) => key !== record.created_at)
                );
              }
            },
            expandedRowRender: (record) => {
              const filteredNestedOrders = record.orders;

              return (
                <div className="bg-white">
                  <Table
                    columns={columns.slice(1)} // Exclude the Order Date column
                    dataSource={filteredNestedOrders}
                    rowKey="order_id"
                    pagination={false}
                  />
                </div>
              );
            },
          }}
          rowKey="created_at"
          scroll={{
            x: 1200,
            y: 600
          }}
        />
        <div className="flex justify-center mt-10">
          <Pagination
            current={page}
            total={vendorOrder?.[0]?.totalCount}
            onChange={(page, pageSize) => {
              setPage(page)
              setPageSize(pageSize)
              callVendorProductOrder(page, pageSize, searchValue)
            }}
          />
        </div>
      </div>

    );
  };

  const CustomBadge = ({ count }) => (
    <span
      className={`inline-flex items-center justify-center rounded-full w-8 h-8 text-[14px]  ml-2 ${count === 0 ? "bg-red-200" : "bg-green-200"
        }`}
    >
      {count === 0 ? 0 : count}
    </span>
  );

  const generateTabTitle = (orderStatus, count) => (
    <div className="flex justify-center w-full items-center">
      {orderStatus} <CustomBadge count={count} />
    </div>
  );

  const handleTabChange = (key) => {
    // Filter the vendorOrder array based on the order_status using the key parameter
    const filteredOrders =
      key === "All"
        ? vendorOrder.filter((order) => {
          if (!filteredDateRange) {
            return true; // No filter applied
          }
          const orderDate = new Date(order.created_at);
          const startDate = new Date(filteredDateRange[0]);
          startDate.setDate(startDate.getDate() - 1); // Subtract 1 day from the start date
          const endDate = new Date(filteredDateRange[1]);
          return orderDate >= startDate && orderDate <= endDate;
        })
        : vendorOrder
          .filter((order) => order.order_status === key)
          .filter((order) => {
            if (!filteredDateRange) {
              return true; // No filter applied
            }
            const orderDate = new Date(order.created_at);
            const startDate = new Date(filteredDateRange[0]);
            startDate.setDate(startDate.getDate() - 1); // Subtract 1 day from the start date
            const endDate = new Date(filteredDateRange[1]);
            return orderDate >= startDate && orderDate <= endDate;
          });

    setDownloadOrders(filteredOrders);

    // Add your logic here with the filteredOrders array
  };

  const OpenDatepicker = () => {
    setshowCalendar(!showCalendar);
  };

  const fullAddress = selectedProduct && `${selectedProduct.apartment ? selectedProduct.apartment + ', ' : ''}${selectedProduct.selected_city}, ${selectedProduct.selected_state}, ${selectedProduct.zip_code}, ${selectedProduct.selected_country}`;
  const { brand_name, company_city, company_state, company_zip_code, company_country, shipping_address, email, country_code, mobile_number, status, vendor_profile_picture_url, brand_logo, vendorname } = selectedProduct && selectedProduct.vendorProfile || {}
  const vendorFullAddress = selectedProduct && `${shipping_address ? shipping_address + ', ' : ''}${company_city}, ${company_state}, ${company_zip_code}, ${company_country}`
  const viewOnMap = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(mapUrl, '_blank');
  };
  const viewOnMapAddress = () => {
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(vendorFullAddress)}`;
    window.open(mapUrl, '_blank');
  };


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleButtonClick = (order) => {
    setModalVisible(true);
    setSelectedOrder(order)
  };

  const handleModalOk = () => {
    // Handle the logic for Ship or Delivered/Picked Up by Customer
    // ...

    console.log(selectedOrder);

    // Close the modal
    // setModalVisible(false);
  };

  const handleModalCancel = () => {
    // Close the modal
    setModalVisible(false);
  };


  return (
    <div className="mb-72">
      {type !== "admin" && (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-semibold mb-4 ">Order Management</h2>
              <p className="text-lg text-gray-600 mb-10">
                Explore the key metrics and performance indicators for your
                order management.
              </p>
            </div>
          </div>

          <OrderMetics
            vendorDatastate={vendorDatastate}
            type={""}
            conversionRates={conversionRates}
            isCurrencyloading={isCurrencyloading}
          />
        </>
      )}

      <div className="mt-10 px-2 md:px-4">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-xl md:text-3xl font-semibold mb-2">
              {type === "admin"
                ? "Handle All Orders "
                : "Manage Your Orders Here "}
              {filteredDateRange && (
                <>
                  ({filteredDateRange[0].format("DD MMM, YYYY")} -{" "}
                  {filteredDateRange[1].format("DD MMM, YYYY")})
                </>
              )}
            </h1>

            <p className="text-gray-600 mb-6 text-sm md:text-base">
              Effortlessly organize and control orders in a structured table
            </p>
          </div>
          <div>

            {DownloadOrders?.length > 0 && (
              <Row justify="end" align="middle" className="mb-5 mr-4">
                <div className="relative">
                  <CalendarOutlined
                    onClick={OpenDatepicker}
                    className="  lg:w-36 p-2 sm:justify-end flex text-2xl mr-4"
                  />
                  {showCalendar && (
                    <div className=" w-full">
                      <DatePicker.RangePicker
                        value={filteredDateRange}
                        onChange={handleDateRangeChange}
                        className="mb-4 w-full"
                        suffixIcon={<CalendarOutlined />}
                      />
                    </div>
                  )}
                </div>
                <Col>
                  <Button
                    type="primary"
                    icon={<FaFilePdf style={{ fontSize: "24px" }} />} // Increase the fontSize value to adjust the size
                    onClick={handleDownloadPDF}
                    className="flex py-5 justify-center items-center bg-gradient-to-r from-red-500 to-red-600 border-red-500 hover:from-red-600 hover:to-red-700 hover:border-red-600 text-white transform transition-all duration-300 ease-in-out hover:scale-105 hover:rotate-3"
                  >

                  </Button>
                </Col>
              </Row>
            )}
          </div>
        </div>
        <div className="">
          <Input
            type="text"
            placeholder="Search by OrderID, Product Name, SKU number"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        <Tabs defaultActiveKey="All" onChange={handleTabChange}>
          <TabPane
            tab={generateTabTitle("All", FilteredOrder?.length)}
            key={"All"}
          >
            {generateOrderTableContent("All")}
          </TabPane>
          <TabPane
            tab={generateTabTitle(
              "Ordered",
              FilteredOrder.filter((order) => order.order_status === "Ordered")
                .length
            )}
            key={"Ordered"}
          >
            {generateOrderTableContent("Ordered")}
          </TabPane>

          <TabPane
            tab={generateTabTitle(
              "Confirmed",
              FilteredOrder.filter((order) => order.order_status === "Confirmed")
                .length
            )}
            key={"Confirmed"}
          >
            {generateOrderTableContent("Confirmed")}
          </TabPane>

          <TabPane
            tab={generateTabTitle(
              "Shipped",
              FilteredOrder.filter((order) => order.order_status === "Shipped")
                .length
            )}
            key={"Shipped"}
          >
            {generateOrderTableContent("Shipped")}
          </TabPane>

          <TabPane
            tab={generateTabTitle(
              "Returned",
              FilteredOrder.filter((order) => order.order_status === "Returned")
                .length
            )}
            key={"Returned"}
          >
            {generateOrderTableContent("Returned")}
          </TabPane>

          <TabPane
            tab={generateTabTitle(
              "Refunded",
              FilteredOrder.filter((order) => order.order_status === "Refunded")
                .length
            )}
            key={"Refunded"}
          >
            {generateOrderTableContent("Refunded")}
          </TabPane>
          <TabPane
            tab={generateTabTitle(
              "Exchanged",
              FilteredOrder.filter((order) => order.order_status === "Exchanged")
                .length
            )}
            key={"Exchanged"}
          >
            {generateOrderTableContent("Exchanged")}
          </TabPane>

          <TabPane
            tab={generateTabTitle(
              "Cancelled",
              FilteredOrder.filter((order) => order.order_status === "Cancelled")
                .length
            )}
            key={"Cancelled"}
          >
            {generateOrderTableContent("Cancelled")}
          </TabPane>

          <TabPane
            tab={generateTabTitle(
              "Delivered",
              FilteredOrder.filter((order) => order.order_status === "Delivered")
                .length
            )}
            key={"Delivered"}
          >
            {generateOrderTableContent("Delivered")}
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title="Product Details"
        open={productModalVisible}
        onCancel={() => setProductModalVisible(false)}
        footer={null}
        width={1000} // Set an appropriate width for the modal

      >
        {selectedProduct && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
            <div className="md:pr-4 grid place-items-center md:mb-24 max-sm:p-2 md:sticky top-0">
              {selectedProduct.product_image ? (
                <Image
                  src={`${ProductImageUrl}/${selectedProduct.product_image}`}
                  alt={selectedProduct.product_name}
                  className="max-w-full h-full cursor-pointer object-contain"
                />
              ) : (
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3iWCijcyjAgZtojGrZI_-2w3Xi8L3xHkoMDnSRmPRquaCRgXYhoeoDZDydqgRUGlG28&usqp=CAU"
                  alt={selectedProduct.product_name}
                  className="max-w-full h-full cursor-pointer object-contain"
                />
              )}
            </div>

            <div className="h-full md:h-[80vh] overflow-y-auto">
              <h3 className="text-xl font-semibold mb-4">
                {selectedProduct.product_name}
              </h3>
              <Descriptions column={1} bordered>
                <Descriptions.Item label="Unique ID">
                  {selectedProduct.product_uniqueid}
                </Descriptions.Item>
                <Descriptions.Item label="Sku ID">
                  {selectedProduct.skuid_order}
                </Descriptions.Item>
                <Descriptions.Item label="Price">
                  {selectedProduct.currency_symbol}{" "}
                  {selectedProduct.total_amount}
                </Descriptions.Item>
                <Descriptions.Item label="Category">
                  {selectedProduct.category}
                </Descriptions.Item>
                <Descriptions.Item label="Subcategory">
                  {selectedProduct.subcategory}
                </Descriptions.Item>

                <Descriptions.Item label="Status">
                  {currentStep ? (
                    <span className={`text-${currentStep.color}-600`}>
                      {currentStep.label}
                    </span>
                  ) : (
                    <span className="text-gray-600">Unknown Status</span>
                  )}
                </Descriptions.Item>
                {selectedProduct.rejection_reason && (
                  <Descriptions.Item label="Rejection Reason">
                    {selectedProduct.rejection_reason}
                  </Descriptions.Item>
                )}
                <Descriptions.Item label="Product Type">
                  {selectedProduct.product_type}
                </Descriptions.Item>
                {/* Add more product details as needed */}
              </Descriptions>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Customer Information</h4>

                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Email">{selectedProduct.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone Number">{selectedProduct.phone_number}</Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {`${selectedProduct.first_name} ${selectedProduct.last_name}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Country">{selectedProduct.selected_country}</Descriptions.Item>
                  <Descriptions.Item label="City">{selectedProduct.selected_city}</Descriptions.Item>
                  <Descriptions.Item label="State">{selectedProduct.selected_state}</Descriptions.Item>
                  <Descriptions.Item label="Zip Code">{selectedProduct.zip_code}</Descriptions.Item>
                  <Descriptions.Item label="Apartment">{selectedProduct.apartment}</Descriptions.Item>
                  <Descriptions.Item label="Full Address">{fullAddress}
                    <Button type="default" onClick={viewOnMap} className="mt-2 flex justify-center items-center gap-2">
                      <FiMap color="green" /> View on Map
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Vendor Information</h4>

                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Brand Name">{brand_name}</Descriptions.Item>
                  <Descriptions.Item label="Phone Number">{country_code} {mobile_number}</Descriptions.Item>
                  <Descriptions.Item label="Vendor Name">
                    {vendorname}
                  </Descriptions.Item>
                  <Descriptions.Item label="Country">{selectedProduct.selected_country}</Descriptions.Item>
                  <Descriptions.Item label="City">{company_city || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="State">{company_state || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Zip Code">{company_zip_code || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Apartment">{shipping_address || 'N/A'}</Descriptions.Item>
                  <Descriptions.Item label="Full Address">{vendorFullAddress}
                    {
                      company_city && shipping_address &&
                      <Button type="default" onClick={viewOnMapAddress} className="mt-2 flex justify-center items-center gap-2">
                        <FiMap color="green" /> View on Map
                      </Button>}
                  </Descriptions.Item>
                </Descriptions>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold">Payment Information</h4>

                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Method">{selectedProduct.payment_method}</Descriptions.Item>
                  <Descriptions.Item label="Status">{selectedProduct.payment_status}</Descriptions.Item>
                  {selectedProduct.payment_method !== 'Cash' && (
                    <Descriptions.Item label="Transaction ID">
                      {selectedProduct.transaction_id}
                    </Descriptions.Item>
                  )}
                </Descriptions>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        title=""
        open={customerModalVisible}
        onCancel={() => setCustomerModalVisible(false)}
        footer={null}
        width={500} // Set an appropriate width for the modal

      >
        {selectedCustomer && (
          <div className=" gap-4 relative">

            <div className="h-full md:h-[80vh] overflow-y-auto">

              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Customer Information</h4>

                <Descriptions column={1} bordered>
                  <Descriptions.Item label="Email">{selectedCustomer.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone Number">{selectedCustomer.phone_number}</Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {`${selectedCustomer.given_name} ${selectedCustomer.family_name}`}
                  </Descriptions.Item>
                  <Descriptions.Item label="Country">{selectedCustomer.selected_country}</Descriptions.Item>
                  <Descriptions.Item label="City">{selectedCustomer.selected_city}</Descriptions.Item>
                  <Descriptions.Item label="State">{selectedCustomer.selected_state}</Descriptions.Item>
                  <Descriptions.Item label="Zip Code">{selectedCustomer.zip_code}</Descriptions.Item>
                  <Descriptions.Item label="Apartment">{selectedCustomer.apartment}</Descriptions.Item>
                  <Descriptions.Item label="Full Address">{fullAddress}
                    <Button type="default" onClick={viewOnMap} className="mt-2 flex justify-center items-center gap-2">
                      <FiMap color="green" /> View on Map
                    </Button>
                  </Descriptions.Item>
                </Descriptions>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={ShipmentModal} onCancel={() => setShipmentModal(false)} title="Create Shipment" width={1000}>
        <CreateShip product={selectedProduct} />
      </Modal>

      <Modal
        title="Select Action"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={"Update Status"}
        okButtonProps={{ style: { background: 'blue' } }}
      >
        {/* Add your Ship and Delivered/Picked Up by Customer options here */}
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 py-10">
          <Button type="default" className="flex justify-center items-center gap-3 border border-blue-500 text-blue-500 py-4 text-lg" onClick={() => handleAction('Shipped')}>
            <FaShippingFast /> Ship
          </Button>
          <Button type="default" className="flex justify-center items-center gap-3 border border-green-500 text-green-500 py-4 text-lg" onClick={() => handleAction('Delivered')}>
            <FaTruckMoving />  Delivered
          </Button>
          <Button type="default" className="flex justify-center items-center gap-3 border border-orange-500 text-orange-500 py-4 text-lg" onClick={() => handleAction('Picked')}>
            <FaTruckPickup /> Picked
          </Button>
        </div>

        <div className="flex flex-col w-full space-y-1">
          <label htmlFor="Verify Receiver" className="text-sm text-gray-600"> Verify Receiver</label>
          <InputNumber className="p-2 w-full" placeholder="Enter 4 digit Verification Code" maxLength={4} />
        </div>
      </Modal>
    </div>
  );
};

export default OrderManagementTable;
