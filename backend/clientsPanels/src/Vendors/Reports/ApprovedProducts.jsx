import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Select } from 'antd';
import { FiAlertCircle, FiClock } from 'react-icons/fi';
import { GrDocumentCsv, GrDocumentExcel, GrDocumentPdf } from "react-icons/gr";
import { Option } from 'antd/es/mentions';
import * as XLSX from 'xlsx';
import { AdminUrl } from '../../Admin/constant';
import AuthCheck from '../components/AuthCheck';

const ApprovedProducts = ({ vendorDatastate }) => {
    const [rejectedProducts, setApprovedProducts] = useState([]);
    const [showFullReason, setShowFullReason] = useState(false);
    const [RejectedReason, setRejectedReason] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalProducts, setTotalProducts] = useState(0);
    const [selectedOption, setSelectedOption] = useState("last7days");

    // Loader States
    const [PdfLoader, setPdfLoader] = useState(false);
    const [excelLoader, setExcelLoader] = useState(false);
    const [csvLoader, setCsvLoader] = useState(false);

    const id = vendorDatastate?.[0].id;

    const statusMappings = {
        0: { icon: <FiClock />, color: 'orange', label: 'Pending' }, // Pending
        1: { icon: <FiAlertCircle />, color: 'green', label: 'Approved' }, // Rejected
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
            dataIndex: 'prod_status',
            key: 'prod_status',
            width: 200,
            render: prod_status => {
                const statusInfo = statusMappings[prod_status] || {};
                const { icon, color } = statusInfo;
                return (
                    <span style={{ color }} className='flex justify-center items-center space-x-1'>
                        {icon} <span>{statusInfo.label}</span>
                    </span>
                );
            },
        },
        {
            title: 'Updated At',
            dataIndex: 'updated_at_product',
            key: 'updated_at_product',
            width: 200,

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

    ];


    const closeModal = () => {
        setShowFullReason(false)
        setRejectedReason('')
    }

    const fetchApprovedProducts = async (page, pageSize, selectedOption) => {
        try {
            const response = await fetch(`${AdminUrl}/api/product-approved?vendorId=${id}&page=${page}&pageSize=${pageSize}&selectedOption=${selectedOption}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setApprovedProducts(data?.products);
            setTotalProducts(data?.total)
        } catch (error) {
            console.error('Error fetching rejected products:', error);
        }
    };

    useEffect(() => {
        id && fetchApprovedProducts(page, pageSize, selectedOption);
    }, [id]);


    const handleChange = value => {
        setSelectedOption(value);
        fetchApprovedProducts(page, pageSize, value)
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
                exportToExcel()
                break;
            default:
                break;
        }
    };

    const exportToPdf = async () => {
        setPdfLoader(true)
        try {

            const response = await fetch(`${AdminUrl}/api/product-approved-pdf?vendorId=${id}&selectedOption=${selectedOption}&format=pdf`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();

            // Define filename with selected option prefix
            const filename = `${selectedOption}_approved_products.pdf`;

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


    const exportToCsv = async () => {
        setCsvLoader(true)
        try {
            const response = await fetch(`${AdminUrl}/api/product-approved-csv?vendorId=${id}&selectedOption=${selectedOption}&format=csv`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const csvContent = await response.text();

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            if (link.download !== undefined) {
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', 'approved_products.csv');
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        } finally {
            setCsvLoader(false)
        }
    };


    const exportToExcel = async () => {
        setExcelLoader(true)
        try {
            const response = await fetch(`${AdminUrl}/api/product-approved-excel?vendorId=${id}&selectedOption=${selectedOption}&format=excel`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();

            // Convert blob to ArrayBuffer
            const arrayBuffer = await new Response(blob).arrayBuffer();

            // Parse Excel data
            const workbook = XLSX.read(arrayBuffer, { type: 'buffer' });

            // Save the Excel file
            XLSX.writeFile(workbook, 'approved_products.xlsx');
        } catch (error) {
            console.error('Error exporting to Excel:', error);
        } finally {
            setExcelLoader(false)
        }
    };


    return (
        vendorDatastate && vendorDatastate.length > 0 ?
            <>
                {
                    !vendorDatastate?.[0].email_verification_status || vendorDatastate?.[0].status === 1 ?
                        <AuthCheck vendorDatastate={vendorDatastate} /> :
                        <>
                            <div>
                                <h1 className='text-2xl font-semibold mb-4'>All Approved Products ({totalProducts})</h1>
                                <div className="flex justify-end mb-4 py-4">
                                    <Button loading={PdfLoader} onClick={() => handleDownload('pdf')} className="mr-2 flex justify-center items-center gap-4">
                                        <GrDocumentPdf />
                                        <p>PDF</p>
                                    </Button>
                                    <Button loading={csvLoader} onClick={() => handleDownload('csv')} className="mr-2 flex justify-center items-center gap-4">
                                        <GrDocumentCsv />
                                        <p>CSV</p>
                                    </Button>
                                    <Button loading={excelLoader} onClick={() => handleDownload('excel')} className='mr-2 flex justify-center items-center gap-4'>
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

export default ApprovedProducts;
