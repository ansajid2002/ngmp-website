import React, { useEffect, useState } from 'react';
import { Table, Pagination, Spin, Descriptions, Button, notification, Popconfirm } from 'antd';
import { AdminUrl } from '../../constant';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiTwotoneFileExcel } from 'react-icons/ai';
import { RiFileExcelLine } from 'react-icons/ri';

const BulkApprove = () => {
    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({ current: 1, pageSize: 10, total: 0 });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [totalCount, setPageTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchData = async (page, pageSize) => {
        try {
            setLoading(true); // Set loading to true before making the API request

            // Construct the URL with query parameters
            const apiUrl = `${AdminUrl}/api/fetchVendorBulkUpload?page=${page}&pageSize=${pageSize}`;

            // Make the API request
            const response = await fetch(apiUrl);
            const responseData = await response.json();

            // Assuming responseData contains the required data structure
            setData(responseData?.data);

            // Update pagination information
            setPageTotal(parseInt(responseData?.totalCount) || 0)

        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false); // Set loading to false after the API request is completed
        }
    };

    useEffect(() => {
        fetchData(page, pageSize);
    }, []); // Empty dependency array to ensure the effect runs only once on component mount

    const handlePageChange = (page, pageSize) => {
        setPage(page)
        fetchData(page, pageSize);
    };

    const columns = [
        // Existing columns
        {
            title: 'Bulk ID',
            dataIndex: 'bulk_id',
            key: 'bulk_id',
            width: 80
        },
        // New column for the length of productids array
        {
            title: 'Vendor Detail',
            dataIndex: 'vendor_id',
            key: 'vendor_id',
            width: 300,
            render: (_, record) => (
                <div onClick={() => handleVendor(record.vendor)} className='cursor-pointer'>
                    <Descriptions bordered column={1} >
                        <Descriptions.Item label="Vendor Name" key="vendorname">
                            <p className='text-blue-800'>{record?.vendor?.vendorname}</p>
                        </Descriptions.Item>
                        <Descriptions.Item label="Brand Name" key="brand_name">
                            <p className='text-blue-800'>{record?.vendor?.brand_name}</p>
                        </Descriptions.Item>
                    </Descriptions>
                </div>

            ),
        },
        {
            title: 'Product Count',
            dataIndex: 'productids',
            key: 'productCount',
            width: 200,
            render: (productids) => (
                <div className="container bg-green-300 flex justify-center items-center rounded-full hover:bg-green-400" title='Readable Only'>
                    <RiFileExcelLine className='text-lg text-green-800 ' />
                    <p className="text-center  text-green-800 p-2 rounded-md"> Excel Products ({productids.length})</p>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 200,
            render: (status) => (
                status ? (status === 'approved' ? <p className='text-green-500 text-xl font-semibold'>Approved</p> : (status === 'rejected' ? <p className='text-red-500 text-xl font-semibold'>Rejected</p> : '')) : <p className='text-orange-500 text-xl font-semibold'>Not Approved Yet</p>
            ),
        },
        {
            title: 'Datetime',
            dataIndex: 'datetime',
            key: 'datetime',
            width: 200,
            render: (datetime) => (
                <p>{moment(datetime).format('DD MMM, YYYY hh:mm:ss A')}</p>
            ),
            sorter: (a, b) => moment(b.datetime).valueOf() - moment(a.datetime).valueOf(),
            sortDirections: ['descend', 'ascend'],
            defaultSortOrder: 'ascend', // Set default sort order to descending
        },
        // Actions column with Approve and Reject buttons
        {
            title: 'Actions',
            key: 'actions',
            width: 200,
            render: (text, record) => (
                <div className="flex">
                    <Popconfirm
                        title="Are you sure you want to approve all?"
                        onConfirm={() => handleRequest(record, 'approve')}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { background: 'green' } }}

                    >
                        <Button
                            className="mr-2 flex items-center bg-green-500 rounded-lg hover:bg-green-700 text-white px-4 py-2  focus:outline-none"
                            type=""
                        >
                            <span className="mr-1">
                                <AiOutlineCheckCircle className="h-5 w-5" />
                            </span>
                            Approve all
                        </Button>
                    </Popconfirm>

                    <Popconfirm
                        title="Are you sure you want to reject all?"
                        onConfirm={() => handleRequest(record, 'reject')}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { background: 'red' } }}
                    >
                        <Button
                            className="flex items-center bg-red-500 rounded-lg hover:bg-red-700 text-white px-4 py-2  focus:outline-none"
                            type="primary"
                            danger  // Use "danger" to highlight it as a destructive action
                        >
                            <span className="mr-1">
                                <AiOutlineCloseCircle className="h-5 w-5" />
                            </span>
                            Reject all
                        </Button>
                    </Popconfirm>
                </div>
            ),
        }

    ];

    const navigate = useNavigate();

    const handleVendor = (vendor) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/Admin/Vendors/viewDetails', { state: vendor })
    }

    // Define functions to handle Approve and Reject actions
    const handleRequest = async (record, type) => {
        try {
            const { bulk_id, productids, vendor_id } = record;
            const { email } = record.vendor;

            // Assuming you want to send batches of 100 ids at a time
            const batchSize = 100;
            const totalBatches = Math.ceil(productids.length / batchSize);

            for (let batchIndex = 0; batchIndex < totalBatches; batchIndex++) {
                const startIdx = batchIndex * batchSize;
                const endIdx = Math.min(startIdx + batchSize, productids.length);
                const batchIds = productids.slice(startIdx, endIdx);

                const response = await fetch(`${AdminUrl}/api/approveProducts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Last-Batch': batchIndex === totalBatches - 1 ? 'true' : 'false', // Add a custom header to indicate the last batch
                    },
                    body: JSON.stringify({
                        bulkId: bulk_id,
                        ids: batchIds,
                        type
                    }),
                });

                if (!response.ok) {
                    const responseData = await response.json();
                    console.error('Error approving products:', responseData.error);
                    // Handle the error, show a message, etc.
                    return;
                }

                // Check if it's the last batch
                const lastBatch = batchIndex === totalBatches - 1;
                if (lastBatch) {
                    // Send another request or execute additional logic after the last batch is approved
                    const anotherResponse = await fetch(`${AdminUrl}/api/senBulkApproveMailNotification`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            email,
                            vendor_id,
                            length: productids?.length,
                            type,
                            bulkId: bulk_id,

                        }),
                    });

                    if (!anotherResponse.ok) {
                        const anotherResponseData = await anotherResponse.json();
                        console.error('Error in another request:', anotherResponseData.error);
                        // Handle the error, show a message, etc.
                    } else {
                        console.log('Another request successful!');
                        notification.success({ message: `${type === 'approve' ? 'Approved' : 'Rejected'} Mail Sended Successfully` })

                    }
                }
            }
        } catch (error) {
            console.error('Error approving products:', error.message);
            // Handle the error, show a message, etc.
        }
    };

    return (
        <div className="sm:p-4 sm:ml-64">
            <h1 className="text-4xl text-gray-700 font-bold mb-10">
                Approve Bulk Product's
            </h1>

            <Spin spinning={loading} tip="Loading...">
                <Table
                    dataSource={data}
                    columns={columns}
                    pagination={false} // We'll use custom pagination
                    scroll={{ y: 600 }}
                />
            </Spin>
            <Pagination
                current={page}
                pageSize={pageSize}
                total={totalCount}
                onChange={handlePageChange}
                showSizeChanger={false}
                style={{ marginTop: '16px', textAlign: 'center' }}
            />
        </div>
    );
};

export default BulkApprove;
