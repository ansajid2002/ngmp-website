import React, { useEffect, useState } from 'react'
import { AdminUrl, ProductImageUrl, formatCurrency } from "../../Admin/constant";
import moment from "moment";
import { FaCheck, FaClock, FaExchangeAlt, FaShippingFast, FaTimes, FaTruck, FaTruckMoving, FaTruckPickup, FaUndo } from 'react-icons/fa';
import { RiRefund2Fill } from 'react-icons/ri';
import {
  Table,
  Tag,
  Button,
  Modal,
  Descriptions,
  Image,
  Pagination,
  Select,
  Input,
  Space,
  Dropdown,
  Typography,
  Menu,
} from "antd";
import { websiteUrl } from "../../App";
import { FiEdit3, FiMap, FiTrash2 } from 'react-icons/fi';
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf } from 'react-icons/gr';
import { DownOutlined } from '@ant-design/icons';
import { BiDotsVertical } from 'react-icons/bi';
import Swal from 'sweetalert2';


const OrderManagementTable = ({
  vendorDatastate,
  type,
}) => {
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [vendorOrder, setvendorOrder] = useState([]);
  const [FilteredOrder, setFilteredOrder] = useState([]);
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [searchValue, setSearchValue] = useState('');
  const [tabchange, setTabChange] = useState('All')

  const [PdfLoader, setPdfLoader] = useState(false);
  const [modalvisible, setModalVisisble] = useState(false);
  const [order_id_modal, setOrderId] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  const [selectedOption, setSelectedOption] = useState("last7days");

  const vendorId = vendorDatastate?.[0].id;

  const callVendorProductOrder = async (page, pageSize, value, tabchange, selectedOption) => {
    try {
      const response = await fetch(`${AdminUrl}/api/VendorProductOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, vendorId, page, pageSize, value, selectedOption, tabchange }),
      });

      if (response.ok) {
        // Handle successful response
        const data = await response.json();
        setvendorOrder(data);
        setFilteredOrder(data);
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
    callVendorProductOrder(page, pageSize, searchValue, tabchange, selectedOption);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    callVendorProductOrder(1, 10, value, 'All', selectedOption)
    setSearchValue(value);
    // setFilteredOrder(filteredProducts);
  };


  const statusColorMap = {
    Ordered: "blue",
    Confirmed: "green",
    Shipped: "blue", // You can adjust this color as needed
    Returned: "orange",
    Refunded: "yellow",
    Exchanged: "orange",
    Cancelled: "red",
    Delivered: "green",
    Picked: "green",
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


  const showProductDetailsModal = (product) => {
    setSelectedProduct(product);
    setProductModalVisible(true);
  };

  const showCustomerDetailsModal = (product) => {
    setSelectedCustomer(product);
    setCustomerModalVisible(true);
  };

  const handleActionClick = async (key, order_id, orderid, customer_id) => {
    if (key === 'print') {
      try {
        const response = await fetch(`${AdminUrl}/api/generate-order-slip`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ order_id, orderid, vendorId })
        });

        if (!response.ok) {
          throw new Error('Failed to generate PDF');
        }

        const pdfData = await response.blob();

        // Create a URL for the PDF blob
        const pdfUrl = URL.createObjectURL(pdfData);

        // Open the PDF in a new window
        window.open(pdfUrl, '_blank');

        // Alternatively, you can use a library like jsPDF to directly print the PDF
        // const pdf = new jsPDF();
        // pdf.open(pdfData);
        // pdf.print();

      } catch (error) {
        console.error('Error generating PDF:', error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    }
    else if (key === 'shipped') {
      // Create a modal element
      setModalVisisble(true)
      setOrderId(order_id)
    } else if (key === 'cancel') {
      const cancelPageUrl = `/Vendors/Orders/Cancel?order_id=${order_id}`;
      window.open(cancelPageUrl, '_blank');
    } else if (key === 'buyer') {
      const buyerChat = `/Vendors/ChatwithCustomers?customer=${customer_id}`;
      window.open(buyerChat, '_blank');
    } else if (key === 'report') {
      const buyerChat = `/Vendors/ReportBuyer?order=${order_id}&customer=${customer_id}`;
      window.open(buyerChat, '_blank');
    } else if (key === 'refund') {
      console.log('refund');
      const refundlink = `/Vendors/InitiateRefund?order=${order_id}&customer=${customer_id}`;
      window.open(refundlink, '_blank');
    }
  }

  const columns = [
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (record) => (
        <Space>
          <Dropdown
            overlay={
              <Menu
                onClick={({ key }) => handleActionClick(key, record.order_id, record.orderid, record?.customer_id)}
              >
                <Menu.Item key="print">Print Packing Slip</Menu.Item>
                <Menu.Item key="cancel">Cancel Order</Menu.Item>
                <Menu.Item key="shipped">Mark as Shipped</Menu.Item>
                <Menu.Item key="buyer">Contact Buyer</Menu.Item>
                <Menu.Item key="report">Report a Buyer</Menu.Item>
                <Menu.Item key="refund">Initiate Refund</Menu.Item>
              </Menu>
            }
            trigger={["click"]}
          >
            <Button type="button" icon={<BiDotsVertical />} title='Action' />
          </Dropdown>
        </Space>
      ),
    },
    {
      title: "Order ID",
      dataIndex: "orderid",
      key: "orderid",
      width: 150,
      render: (orderid, record) => {
        return (
          <div className="flex flex-col justify-center text-center">
            <Button type="link" onClick={() => showProductDetailsModal(record)}>
              {orderid}
            </Button>
            {type !== 'admin' && <a href={`/${type !== 'admin' ? 'Vendors' : 'Admin'}/Orders/OrderDetails?order_id=${record.order_id}`} className='text-blue-700 tracking-wide' target='_blank'>View Order</a>}
          </div>
        );
      },
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 200,
      render: (product_name, record) => {
        return (
          <a
            href={`${websiteUrl}/product-detail?product=${record?.productDetails?.prod_slug}&uniqueid=${record.product_uniqueid}`}
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
          <p className=" font-sans text-sm font-bold text-gray-600">{`${formatCurrency(total_amount, 'USD')}`}</p>
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
      width: 250,
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
      width: 150,
    },

  ];


  const fullAddress = selectedProduct && `${selectedProduct?.customerInfo?.apartment ? selectedProduct?.customerInfo?.apartment + ', ' : ''}${selectedProduct?.customerInfo?.selected_city}, ${selectedProduct?.customerInfo?.selected_state}, ${selectedProduct?.customerInfo?.zip_code}, ${selectedProduct?.customerInfo?.selected_country}`;
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

  const statusSteps = [
    { status: "Ordered", label: "Order Placed", color: "blue" },
    { status: "Confirmed", label: "Order Confirmed", color: "orange" },
    { status: "Processing", label: "Order Processing", color: "orange" },
    { status: "Shipped", label: "Order Shipped", color: "green" },
    { status: "Delivered", label: "Order Delivered", color: "green" },
    { status: "Cancelled", label: "Order Cancelled", color: "red" },
    { status: "Returned", label: "Returned", color: "red" },
  ];

  const currentStep = statusSteps.find(
    (step) => step.status === selectedProduct?.order_status
  );

  const handleChange = value => {
    setSelectedOption(value);
    callVendorProductOrder(page, pageSize, searchValue, tabchange, value)
  };

  const handleTabChange = value => {
    setTabChange(value);
    callVendorProductOrder(page, pageSize, searchValue, value, selectedOption)
  };


  const handleDownload = (type) => {
    switch (type) {
      case 'pdf':
        // Logic to export data to PDF
        exportToPdf()
        break;
      case 'csv':
        exportToCsv()
        break;
      case 'excel':
        exportToExcel()
        break;
      default:
        break;
    }
  };

  const exportToPdf = async () => {
    // setPdfLoader(true)
    try {

      const response = await fetch(`${AdminUrl}/api/orders-pdf?searchValue=${searchValue}&selectedOption=${selectedOption}&tabChange=${tabchange}&vendorId=${vendorId}&type=${type}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const blob = await response.blob();

      // Define filename with selected option prefix
      const filename = `${selectedOption}_orders_products.pdf`;

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;

      // Simulate click to trigger download
      link.click();

      // Clean up
      URL.revokeObjectURL(link.href);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      setPdfLoader(false)
    }
  };

  const handleOk = async () => {
    setButtonLoading(true);
    try {
      const response = await fetch(`${AdminUrl}/api/markAsShipped`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: order_id_modal,
          vendorId
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Display success message using Swal
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: data.message // Assuming the response contains a "message" field
        });
        // Optionally, close the modal after successful operation
        setModalVisisble(false);
        setvendorOrder(prevOrder => prevOrder.map(order => {
          if (order.order_id === order_id_modal) {
            return { ...order, order_status: 'Shipped' };
          }
          return order;
        }));
      } else {
        const data = await response.json();

        // Handle error response here
        console.error('Failed to mark order as shipped');
        // Display error message using Swal
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data?.error || ''
        });
      }
    } catch (error) {
      console.error('Error marking order as shipped:', error);
      // Display error message using Swal
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while marking order as shipped. Please try again.'
      });
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <div className='mt-10'>
      <div>
        <h1 className='text-2xl font-semibold mb-4'>Orders</h1>
        <div className="flex justify-end mb-4 py-4 gap-2">
          <Button loading={PdfLoader} onClick={() => handleDownload('pdf')} className="mr-2 flex justify-center items-center gap-4">
            <GrDocumentPdf />
            <p>PDF</p>
          </Button>
          {/* <Button loading={csvLoader} onClick={() => handleDownload('csv')} className="mr-2 flex justify-center items-center gap-4">
            <GrDocumentCsv />
            <p>CSV</p>
          </Button>
          <Button loading={excelLoader} onClick={() => handleDownload('excel')} className='mr-2 flex justify-center items-center gap-4'>
            <GrDocumentExcel />
            <p>Excel</p>
          </Button> */}

          <Select value={selectedOption} onChange={handleChange} style={{ width: 200 }}>
            <Option value="last7days">Last 7 days</Option>
            <Option value="last30days">Last 30 days</Option>
            <Option value="last60days">Last 60 days</Option>
            <Option value="last90days">Last 90 days</Option>
            <Option value="last6months">Last 6 months</Option>
            <Option value="last12months">Last 12 months</Option>
            <Option value="last18months">Last 18 months</Option>
            <Option value="last24months">Last 24 months</Option>
            <Option value="">Overall Report</Option>
          </Select>

          <Select value={tabchange} onChange={handleTabChange} style={{ width: 200 }}>
            <Option value="All">All</Option>
            {Object.keys(statusColorMap).map((status) => (
              <Option key={status} value={status}>{status}</Option>
            ))}
          </Select>

          <div className='w-96'>
            <Input onChange={handleInputChange} type="text"
              placeholder="Search by OrderID, Product Name, SKU number"
              value={searchValue} />
          </div>
        </div>
      </div>
      <Table columns={type !== 'admin' ? columns : columns.slice(1)} pagination={false} dataSource={vendorOrder} scroll={{ x: 1200, y: 600 }} />
      <div className="p-5 flex justify-center">
        <Pagination
          hideOnSinglePage
          total={vendorOrder?.[0]?.totalCount || 0}
          showSizeChanger
          showQuickJumper
          current={page}
          pageSize={pageSize}
          showTotal={(total) => `Total ${total} items`}
          responsive={true}
          onChange={(page, pageSize) => {
            setPage(page)
            setPageSize(pageSize)
            callVendorProductOrder(page, pageSize, searchValue, tabchange, selectedOption)
          }}
        />
      </div>

      <Modal
        title="Mark as Shipped"
        open={modalvisible}
        onCancel={() => setModalVisisble(false)}
        okButtonProps={{ style: { background: 'green' } }}
        okText={"Yes, Mark as Shipped"}
        onOk={handleOk}
        confirmLoading={buttonLoading}
      >
        <p>Do you want to mark this item as shipped?</p>

      </Modal>

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
                  <Descriptions.Item label="Email">{selectedProduct?.customerInfo?.email}</Descriptions.Item>
                  <Descriptions.Item label="Phone Number">{selectedProduct?.customerInfo?.phone_number}</Descriptions.Item>
                  <Descriptions.Item label="Name">
                    {`${selectedProduct?.customerInfo?.given_name} ${selectedProduct?.customerInfo?.family_name}`}
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



    </div>
  )
}

export default OrderManagementTable