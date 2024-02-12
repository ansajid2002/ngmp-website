import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input, Pagination, Select } from 'antd';
import { AdminUrl } from '../Admin/constant';
import { FiAlertCircle, FiCheckCircle, FiClock, FiTrash2, FiXCircle } from 'react-icons/fi';
import AuthCheck from './components/AuthCheck';
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf, GrRevert } from "react-icons/gr";
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import { Option } from 'antd/es/mentions';
import * as XLSX from 'xlsx';

const RejectedProducts = ({ vendorDatastate }) => {
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [showFullReason, setShowFullReason] = useState(false);
  const [RejectedReason, setRejectedReason] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedOption, setSelectedOption] = useState("last7days");

  const id = vendorDatastate?.[0].id;

  const statusMappings = {
    0: { icon: <FiClock />, color: 'orange', label: 'Pending' }, // Pending
    2: { icon: <FiAlertCircle />, color: 'red', label: 'Rejected' }, // Rejected
  };

  const columns = [
    {
      title: '',
      dataIndex: 'uniquepid',
      key: 'uniquepid',
      width: 250,
      render: (_, record) => (
        <>
          <p><b>Skuid: </b>{record.skuid}</p>
          <p><b>Nile UniqueId: </b>{record.uniquepid}</p>
        </>
      )
    },
    {
      title: 'Product Name',
      dataIndex: 'ad_title',
      key: 'ad_title',
      width: 300
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: productstatus => {
        const statusInfo = statusMappings[productstatus] || {};
        const { icon, color } = statusInfo;
        return (
          <span style={{ color }} className='flex justify-center items-center space-x-1'>
            {icon} <span>{statusInfo.label}</span>
          </span>
        );
      },
    },
    {
      title: 'Reason for Rejection',
      dataIndex: 'rejection_reason',
      key: 'rejection_reason',
      render: (rejectionReason) => {

        if (!rejectionReason) {
          return <span style={{ color: 'red' }}>No Reason Provided</span>;
        }

        return (
          <div>
            {rejectionReason.slice(0, 25)}...
            <Button
              type="link"
              size="small"
              onClick={() => handleModal(rejectionReason)}
            >
              View Full Reason
            </Button>
          </div>
        );
      },
    },
    {
      title: 'Updated At',
      dataIndex: 'updated_at_product',
      key: 'updated_at_product',
      render: (updated_at_product) => {
        const formattedDateTime = new Date(updated_at_product).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
        });
        return formattedDateTime;
      },
      sorter: (a, b) => new Date(a.updated_at_product) - new Date(b.updated_at_product),
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
    },
    {
      title: 'Reupload',
      dataIndex: 'reupload',
      key: 'reupload',
      width: 200,
      render: (_, record) => (
        <Button type="" className='border border-blue-700 text-blue-500 flex justify-center items-center gap-2' onClick={() => handleReupload(record)}><GrRevert color='blue' /> Reupload</Button>
      ),
    },
  ];

  const handleReupload = (record) => {
    const productName = record.ad_title;
    const confirmationMessage = `Are you sure you want to reupload ${productName}?`;

    Swal.fire({
      title: 'Confirm Reupload',
      text: confirmationMessage,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reupload it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const requestData = {
          productId: record.id,
        };

        fetch(`${AdminUrl}/api/reupload-product`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            setRejectedProducts(rejectedProducts.filter(item => item.uniquepid !== record?.uniquepid))
            console.log(`Reupload request for ${productName} sent successfully.`);
            // Notify the user about the success
            Swal.fire(
              'Success!',
              `Your product "${productName}" has been successfully reuploaded and will be live soon.`,
              'success'
            );
            // Handle success response as needed
          })
          .catch(error => {
            console.error('Error sending reupload request:', error);
            // Handle error
            Swal.fire(
              'Error!',
              'An error occurred while reuploading the product. Please try again later.',
              'error'
            );
          });
      }
    });
  };


  const handleModal = (reason) => {
    setShowFullReason(true)
    setRejectedReason(reason)
  }

  const closeModal = () => {
    setShowFullReason(false)
    setRejectedReason('')
  }

  const fetchRejectedProducts = async (page, pageSize, selectedOption) => {
    try {
      const response = await fetch(`${AdminUrl}/api/product-rejected?vendorId=${id}&page=${page}&pageSize=${pageSize}&selectedOption=${selectedOption}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setRejectedProducts(data?.products);
      setTotalProducts(data?.total)
    } catch (error) {
      console.error('Error fetching rejected products:', error);
    }
  };

  useEffect(() => {
    id && fetchRejectedProducts(page, pageSize, selectedOption);
  }, [id]);


  const handleChange = value => {
    setSelectedOption(value);
    fetchRejectedProducts(page, 5005000000000000, value)
  };

  const handleDownload = (type) => {
    switch (type) {
      case 'pdf':
        // Logic to export data to PDF
        exportToPdf(rejectedProducts)
        break;
      case 'csv':
        exportToCsv(rejectedProducts)
        break;
      case 'excel':
        exportToExcel(rejectedProducts)
        break;
      default:
        break;
    }
  };

  const exportToPdf = (products) => {
    // Initialize jsPDF instance with A0 size
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a2'
    });

    // Set title
    doc.setFontSize(18);
    doc.text('Rejected Products', 10, 10);

    // Set table headers
    const headers = [['Product Name', 'Nile UniqueID', 'MRP', 'Selling Price', 'Category', 'Category Type', 'City', 'Condition', 'Country', 'Country of Origin', 'Currency Symbol', 'Manufacturer Name', 'Shipping From', 'Sales Package', 'Postal Code', 'Rejection Reason', 'SKU ID', 'State', 'Weight', 'Width']];

    // Prepare table data
    const data = products.map(({ ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, searchkeywords, skuid, state, weight, width }) => [ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, skuid, state, weight, width]);

    // Add table to the document
    doc.autoTable({
      startY: 20,
      head: headers,
      body: data,
    });

    // Save the document
    doc.save('rejected_products.pdf');
  };

  const exportToCsv = (products) => {
    let csvContent = 'Product Name,Nile UniqueID,MRP,Selling Price,Category,Category Type,City,Condition,Country,Country of Origin,Currency Symbol,Manufacturer Name,Shipping From,Sales Package,Postal Code,Rejection Reason,SKU ID,State,Weight,Width\n';

    products.forEach(product => {
      // Enclose ad_title within double quotes to handle commas
      const adTitle = `"${product.ad_title.replace(/"/g, '""')}"`;
      const category = `"${product.category.replace(/"/g, '""')}"`;
      const categoryType = `"${product.category_type.replace(/"/g, '""')}"`;
      const city = `"${product.city ? product.city : ''}"`;
      const condition = `"${product.condition.replace(/"/g, '""')}"`;
      const country = `"${product.country.replace(/"/g, '""')}"`;
      const countryOfOrigin = `"${product.countryoforigin.replace(/"/g, '""')}"`;
      const currencySymbol = `"${product.currency_symbol.replace(/"/g, '""')}"`;
      const manufacturerName = `"${product.manufacturername.replace(/"/g, '""')}"`;
      const shippingFrom = `"${product.mogadishudistrict_ship_from ? product.mogadishudistrict_ship_from : ''}"`;
      const mrp = `"${product.mrp.replace(/"/g, '""')}"`;
      const salesPackage = `"${product.salespackage.replace(/"/g, '""')}"`;
      const postalCode = `"${product.postalcode.replace(/"/g, '""')}"`;
      const rejectionReason = `"${product.rejection_reason.replace(/"/g, '""')}"`;
      const sellingPrice = `"${product.sellingprice.replace(/"/g, '""')}"`;
      const skuId = `"${product.skuid.replace(/"/g, '""')}"`;
      const state = `"${product.state.replace(/"/g, '""')}"`;
      const weight = `"${product.weight.replace(/"/g, '""')}"`;
      const width = `"${product.width.replace(/"/g, '""')}"`;

      csvContent += `${adTitle},${product.uniquepid},${mrp},${sellingPrice},${category},${categoryType},${city},${condition},${country},${countryOfOrigin},${currencySymbol},${manufacturerName},${shippingFrom},${salesPackage},${postalCode},${rejectionReason},${skuId},${state},${weight},${width}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'rejected_products.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const exportToExcel = (products) => {
    const headers = ['Product Name', 'Nile UniqueID', 'MRP', 'Selling Price', 'Category', 'Category Type', 'City', 'Condition', 'Country', 'Country of Origin', 'Currency Symbol', 'Manufacturer Name', 'Shipping From', 'Sales Package', 'Postal Code', 'Rejection Reason', 'SKU ID', 'State', 'Weight', 'Width'];

    const data = products.map(({ ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, searchkeywords, skuid, state, weight, width }) => [ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, skuid, state, weight, width]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Rejected Products');
    XLSX.writeFile(wb, 'rejected_products.xlsx');
  };

  return (
    vendorDatastate && vendorDatastate.length > 0 ?
      <>
        {
          !vendorDatastate?.[0].email_verification_status || vendorDatastate?.[0].status === 1 ?
            <AuthCheck vendorDatastate={vendorDatastate} /> :
            <>
              <div>
                <h1 className='text-2xl font-semibold mb-4'>Rejected Products ({rejectedProducts.length})</h1>
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
                scroll={{ x: true, y: 600 }}
                columns={columns} dataSource={rejectedProducts} pagination={false} rowClassName={'h-[100px]'} />
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
                    fetchRejectedProducts(page, pageSize)
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

export default RejectedProducts;
