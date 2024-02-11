import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Pagination, Select, DatePicker } from 'antd';
import { FiAlertCircle, FiCheckCircle, FiClock, FiTrash2, FiXCircle } from 'react-icons/fi';
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf, GrRevert } from "react-icons/gr";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { Option } from 'antd/es/mentions';
import * as XLSX from 'xlsx';
import { AdminUrl, formatCurrency } from '../../Admin/constant';
import AuthCheck from '../components/AuthCheck';
import { BiCross } from 'react-icons/bi';

const SalesReturns = ({ vendorDatastate }) => {
  const [returnProducts, setReturnedProduct] = useState([]);
  const [showFullReason, setShowFullReason] = useState(false);
  const [RejectedReason, setRejectedReason] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedOption, setSelectedOption] = useState("last7days");

  const id = vendorDatastate?.[0].id;

  const statusMappings = {
    'Returned': { icon: <BiCross />, color: 'red', label: 'Product Returned' }, // Pending
  };

  const columns = [
    {
      title: 'Order id',
      dataIndex: 'order_id',
      key: 'order_id',
      width: 70
    },
    {
      title: 'Group Order id',
      dataIndex: 'orderid',
      key: 'orderid',
      width: 100
    },
    {
      title: 'Product Detail',
      dataIndex: 'uniquepid',
      key: 'uniquepid',
      width: 250,
      render: (_, record) => (
        <div className='space-y-1 tracking-wide'>
          <p>({record?.product_type}) {record.product_name}</p>
          <p><b>Skuid: </b>{record.skuid_order}</p>
          <p><b>Nile UniqueId: </b>{record.product_uniqueid}</p>
        </div>
      )
    },
    {
      title: 'Buyer',
      dataIndex: 'Buyer',
      key: '_',
      width: 300,
      render: (_, record) => (
        <>
          {record?.customer?.email && (
            <p>
              <b>Email</b>: <a href={`mailto:${record.customer.email}`}>{record.customer.email}</a>
            </p>
          )}

          {record?.customer?.given_name && record?.customer?.family_name && (
            <p>
              <b>Name</b>: {record.customer.given_name} {record.customer.family_name}
            </p>
          )}

          {record?.customer?.phone_number && (
            <p>
              <b>Phone</b>: <a href={`tel:${record.customer.phone_number}`}>{record.customer.phone_number}</a>
            </p>
          )}
        </>
      )
    },
    {
      title: 'Status',
      dataIndex: 'order_status',
      key: 'order_status',
      width: 200,
      render: order_status => {
        const statusInfo = statusMappings[order_status] || {};
        const { icon, color } = statusInfo;
        return (
          <span style={{ color }} className='flex  items-center space-x-2'>
            {icon} <span>{statusInfo.label}</span>
          </span>
        );
      },
    },
    {
      title: 'Sell price (Qty + Shipping Fee)',
      dataIndex: 'sell_price',
      key: 'sell_price',
      width: 200,
      render: (sellprice, record) => (
        <>
          <p className='text-lg text-gray-800 font-bold'><b className='text-gray-500 font-semibold'>{`${sellprice} * ${record?.quantity} + ${record?.shipping_fee}`} = </b> {formatCurrency((sellprice * record?.quantity) + parseFloat(record?.shipping_fee), 'USD')}</p>
        </>
      )
    },
    {
      title: 'Payment',
      dataIndex: 'Payment',
      key: '_',
      width: 200,
      render: (_, record) => (
        <div className='space-y-1 tracking-wide'>
          <p><b>Method</b>: {record?.payment_method}</p>
          <p><b>Status</b>: {record?.payment_status}</p>
        </div>
      )
    },

    {
      title: 'Shipping Type',
      dataIndex: 'Shipping Type',
      key: '_',
      width: 200,
      render: (_, record) => (
        <div className='space-y-1 tracking-wide'>
          <p>{record?.ispickup ? 'Pickup by Customer' : 'Ship by Vendor'}</p>
        </div>
      )
    },
  ];


  const closeModal = () => {
    setShowFullReason(false)
    setRejectedReason('')
  }

  const fetchReturnedProductsAfterOrders = async (page, pageSize, selectedOption) => {
    try {
      const response = await fetch(`${AdminUrl}/api/product-returned-products?vendorId=${id}&page=${page}&pageSize=${pageSize}&selectedOption=${selectedOption}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setReturnedProduct(data?.products);
      setTotalProducts(data?.total)
    } catch (error) {
      console.error('Error fetching rejected products:', error);
    }
  };

  useEffect(() => {
    id && fetchReturnedProductsAfterOrders(page, pageSize, selectedOption);
  }, [id]);


  const handleChange = value => {
    setSelectedOption(value);
    fetchReturnedProductsAfterOrders(page, 5005000000000000, value)
  };

  const handleDownload = (type) => {
    switch (type) {
      case 'pdf':
        // Logic to export data to PDF
        exportToPdf(returnProducts)
        break;
      case 'csv':
        exportToCsv(returnProducts)
        break;
      case 'excel':
        exportToExcel(returnProducts)
        break;
      default:
        break;
    }
  };

  const exportToPdf = (products) => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a2'
    });

    doc.setFontSize(18);
    doc.text('Order Details', 10, 10);

    const headers = columns.map(column => column.title);

    const data = products.map(record => columns.map(column => {
      if (column.dataIndex === 'uniquepid') {
        return `(${record?.product_type}) ${record.product_name}\nSkuid: ${record.skuid_order}\nNile UniqueId: ${record.product_uniqueid}`;
      } else if (column.dataIndex === 'Buyer') {
        return (
          `${record?.customer?.email ? `Email: ${record.customer.email}\n` : ''}` +
          `${record?.customer?.given_name && record?.customer?.family_name ? `Name: ${record.customer.given_name} ${record.customer.family_name}\n` : ''}` +
          `${record?.customer?.phone_number ? `Phone: ${record.customer.phone_number}` : ''}`
        );
      } else if (column.dataIndex === 'sell_price') {
        return `${record.sell_price} * ${record?.quantity} + ${record?.shipping_fee} = ${formatCurrency((record.sell_price * record?.quantity) + parseFloat(record?.shipping_fee), 'USD')}`;
      } else if (column.dataIndex === 'Payment') {
        return `Method: ${record?.payment_method}\nStatus: ${record?.payment_status}`;
      } else if (column.dataIndex === 'Shipping Type') {
        return `${record?.ispickup ? 'Pickup by Customer' : 'Ship by Vendor'}`;
      } else {
        return record[column.dataIndex];
      }
    }));

    doc.autoTable({
      startY: 20,
      head: [headers],
      body: data,
    });

    doc.save('order_details.pdf');
  };



  const exportToCsv = (products) => {
    let csvContent = 'Order id,Group Order id,Product Detail,Buyer,Status,Sell price (Qty + Shipping Fee),Payment,Shipping Type\n';

    products.forEach(record => {
      const productDetail = `(${record?.product_type}) ${record?.product_name}\nSkuid: ${record?.skuid_order}\nNile UniqueId: ${record?.product_uniqueid}`;

      const buyerInfo = (
        `${record?.customer?.email ? `Email: ${record.customer.email}\n` : ''}` +
        `${record?.customer?.given_name && record?.customer?.family_name ? `Name: ${record.customer.given_name} ${record.customer.family_name}\n` : ''}` +
        `${record?.customer?.phone_number ? `Phone: ${record.customer.phone_number}` : ''}`
      );

      const sellPrice = `${record?.sell_price} * ${record?.quantity} + ${record?.shipping_fee} = ${formatCurrency((record?.sell_price * record?.quantity) + parseFloat(record?.shipping_fee), 'USD')}`;

      const paymentInfo = `Method: ${record?.payment_method}\nStatus: ${record?.payment_status}`;

      const shippingType = `${record?.ispickup ? 'Pickup by Customer' : 'Ship by Vendor'}`;

      let csvRow = `${record?.order_id},${record?.orderid},"${productDetail}","${buyerInfo}","${record?.order_status}","${sellPrice}","${paymentInfo}","${shippingType}"\n`;

      csvContent += csvRow;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'order_details.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };



  const exportToExcel = (products) => {
    const headers = ['Order id', 'Group Order id', 'Product Detail', 'Buyer', 'Status', 'Sell price (Qty + Shipping Fee)', 'Payment', 'Shipping Type'];

    const data = products.map(record => {
      const productDetail = `(${record?.product_type}) ${record?.product_name}\nSkuid: ${record?.skuid_order}\nNile UniqueId: ${record?.product_uniqueid}`;

      const buyerInfo = (
        `${record?.customer?.email ? `Email: ${record.customer.email}\n` : ''}` +
        `${record?.customer?.given_name && record?.customer?.family_name ? `Name: ${record.customer.given_name} ${record.customer.family_name}\n` : ''}` +
        `${record?.customer?.phone_number ? `Phone: ${record.customer.phone_number}` : ''}`
      );

      const sellPrice = `${record?.sell_price} * ${record?.quantity} + ${record?.shipping_fee} = ${formatCurrency((record?.sell_price * record?.quantity) + parseFloat(record?.shipping_fee), 'USD')}`;

      const paymentInfo = `Method: ${record?.payment_method}\nStatus: ${record?.payment_status}`;

      const shippingType = `${record?.ispickup ? 'Pickup by Customer' : 'Ship by Vendor'}`;

      return [record?.order_id, record?.orderid, productDetail, buyerInfo, record?.order_status, sellPrice, paymentInfo, shippingType];
    });

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Order Details');
    XLSX.writeFile(wb, 'order_details.xlsx');
  };



  return (
    vendorDatastate && vendorDatastate.length > 0 ?
      <>
        {
          !vendorDatastate?.[0].email_verification_status || vendorDatastate?.[0].status === 1 ?
            <AuthCheck vendorDatastate={vendorDatastate} /> :
            <>
              <div>
                <h1 className='text-2xl font-semibold mb-4'>Return(s) Report ({totalProducts})</h1>
                <div className="flex justify-end mb-4 py-4">
                  <Button onClick={() => handleDownload('pdf')} className="mr-2 flex justify-center items-center gap-4">
                    <GrDocumentPdf />
                    <p>PDF</p>
                  </Button>
                  <Button onClick={() => handleDownload('csv')} className="mr-2 flex justify-center items-center gap-4">
                    <GrDocumentCsv />
                    <p>CSV</p>
                  </Button>
                  <Button onClick={() => handleDownload('excel')} className='mr-2 flex justify-center items-center gap-4'>
                    <GrDocumentExcel />
                    <p>Excel</p>
                  </Button>

                  <Select value={selectedOption} onChange={handleChange} style={{ width: 200 }}>
                    <Option value="last7days">Last 7 days</Option>
                    <Option value="last30days">Last 30 days</Option>
                    <Option value="last60days">Last 60 days</Option>
                    <Option value="last90days">Last 90 days</Option>
                    <Option value="last6months">Last 6 months</Option>
                    <Option value="last12months">Last 12 months</Option>
                    <Option value="last18months">Last 18 months</Option>
                    <Option value="last24months">Last 24 months</Option>
                  </Select>
                </div>
              </div>
              <Table
                scroll={{ x: 1200, y: 600 }}
                columns={columns} dataSource={returnProducts} pagination={false} rowClassName={'h-[100px]'} />
              <div className="p-5 flex justify-center">
                <Pagination
                  hideOnSinglePage
                  total={totalProducts || 0}
                  showSizeChanger
                  showQuickJumper
                  current={page}
                  pageSize={pageSize}
                  showTotal={(total) => `Total ${total} items`}
                  responsive={true}
                  onChange={(page, pageSize) => {
                    setPage(page)
                    setPageSize(pageSize)
                    fetchApprovedProducts(page, pageSize)
                  }}
                />
              </div>
              <Modal
                title={`Rejected Reason`}
                visible={showFullReason}
                onCancel={closeModal}
                onOk={'handleModalOk'}
                okText="Reject"
                cancelText="Cancel"
                okButtonProps={{
                  className: 'hidden',
                }}
              >
                {RejectedReason}
              </Modal>
            </>
        }
      </>
      : ''
  );
};

export default SalesReturns;
