import { Descriptions, Avatar, Table, Button } from 'antd';
import {
    AiOutlineUser,
} from 'react-icons/ai';
import { FiCheckCircle, FiClock, FiTrash2, FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AdminUrl } from '../constant';


const VendorProfileDetails = ({ vendor }) => {
    const vendorProductData = vendor.rejectedProducts
    const navigate = useNavigate()
    const statusMappings = {
        0: { icon: <FiClock />, color: 'orange', label: 'Pending' }, // Pending
        1: { icon: <FiCheckCircle />, color: 'green', label: 'Approved' }, // Approved
        2: { icon: <FiXCircle />, color: 'red', label: 'Rejected' }, // Rejected
    };

    const columns = [
        {
            title: 'Ad Title',
            dataIndex: 'ad_title',
            key: 'ad_title',
            width: 350,
            render: (_, record) => {
                let additionaldescription = record.additionaldescription;
                let words = additionaldescription?.split(' ');

                if (additionaldescription?.length <= 10) {
                    return (
                        <>
                            <p className='text-lg font-semibold text-justify'>{record.ad_title}</p>
                            <p className='text-sm text-gray-400 text-justify'>{additionaldescription}</p>
                        </>
                    );
                } else {
                    let shortadditionaldescription = words?.slice(0, 10)?.join(' ');
                    return (
                        <>
                            <p className='text-lg font-semibold text-justify'>{record.ad_title}</p>
                            <p className='text-sm text-gray-400 text-justify'>{shortadditionaldescription}... <span className='text-[12px] cursor-pointer text-blue-500' type onClick={() => { }}>Read More</span></p>

                        </>
                    );
                }
            },
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: status => {
                const statusInfo = statusMappings[status] || {};
                const { icon, color } = statusInfo;
                console.log(statusInfo);
                return (
                    <span style={{ color }} className='flex justify-center items-center space-x-1'>
                        {icon} <span>{statusInfo.label}</span>
                    </span>
                );
            },
            filters: [
                { text: 'Pending', value: 0 },
                { text: 'Active', value: 1 },
                { text: 'Blocked', value: 2 },
                { text: 'Approved', value: 3 },
                { text: 'Rejected', value: 4 },
                // ... Add more filter options if needed
            ],
            onFilter: (value, record) => record.productstatus === value,
            sorter: (a, b) => a.productstatus - b.productstatus,
            width: 150,
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: created_at => {
                const formattedDate = new Date(created_at).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                });
                return formattedDate;
            },
        },
    ]

    const handleVendor = (vendor) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Open the link in a new tab using navigate
        navigate('/Admin/Vendors/viewDetails', { state: { ...vendor } });
    }

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Vendor Profile </h2>
            <Descriptions layout="vertical" bordered>
                <Descriptions.Item
                    label="Vendor Name"
                >
                    {vendor?.vendor?.vendor_profile_picture_url ? (
                        <img
                            src={`${AdminUrl}/uploads/vendorProfile/${vendor?.vendor?.vendor_profile_picture_url?.images?.[0]}`}
                            alt="Vendor Profile"
                            style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                        />
                    ) : (
                        <Avatar size={64} icon={<AiOutlineUser />} className='flex justify-center items-center flex-row' />
                    )}
                    <p className='mt-2'>{vendor?.vendor.vendorname} (VID: {vendor.id})</p>
                </Descriptions.Item>
                <Descriptions.Item
                    label="Created At"
                >
                    {vendor?.vendor.registration_date}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Email"
                >
                    {vendor?.vendor.email || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Mobile Number"
                >
                    {vendor?.vendor.mobile_number || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Business Model"
                >
                    {vendor?.vendor.business_model || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Brand Name"
                >
                    {vendor?.vendor.brand_name || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Company Name"
                >
                    {vendor?.vendor.company_name || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Company Address"
                >
                    {vendor?.vendor.company_address || 'N/A'}
                </Descriptions.Item>
                <Descriptions.Item
                    label="Bank Name"
                >
                    {vendor?.vendor.bank_name || 'N/A'}
                </Descriptions.Item>
                {/* Add more items as needed */}
            </Descriptions>

            <h2 className="text-xl font-semibold mt-6 mb-4">All Products ({vendorProductData?.length})</h2>
            <Table
                columns={columns}
                dataSource={vendorProductData || []}
                pagination={false}
            />

            <Button type="link" className='mt-4 flex justify-end self-end w-full' onClick={() => handleVendor(vendor)}>
                View Vendor Full Details
            </Button>
        </div>
    );
};

export default VendorProfileDetails;
