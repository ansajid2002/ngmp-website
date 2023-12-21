import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form, Input } from 'antd';
import { AdminUrl } from '../Admin/constant';
import { FiAlertCircle, FiCheckCircle, FiClock, FiTrash2, FiXCircle } from 'react-icons/fi';
import AuthCheck from './components/AuthCheck';

const RejectedProducts = ({ vendorDatastate }) => {
  const [rejectedProducts, setRejectedProducts] = useState([]);
  const [showFullReason, setShowFullReason] = useState(false);
  const [RejectedReason, setRejectedReason] = useState('');
  const id = vendorDatastate?.[0].id;

  const statusMappings = {
    0: { icon: <FiClock />, color: 'orange', label: 'Pending' }, // Pending
    2: { icon: <FiAlertCircle />, color: 'red', label: 'Rejected' }, // Rejected
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'uniquepid',
      key: 'uniquepid',
      width: 80
    },
    {
      title: 'Ad Title',
      dataIndex: 'ad_title',
      key: 'ad_title',
      width: 300
    },
    {
      title: 'Status',
      dataIndex: 'productstatus',
      key: 'productstatus',
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
  ];

  const handleModal = (reason) => {
    setShowFullReason(true)
    setRejectedReason(reason)
  }

  const closeModal = () => {
    setShowFullReason(false)
    setRejectedReason('')
  }

  useEffect(() => {
    const fetchRejectedProducts = async () => {
      try {
        const response = await fetch(`${AdminUrl}/api/rejected-products`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setRejectedProducts(data.filter(item => item.productstatus === 2 && item.vendorid === id));
      } catch (error) {
        console.error('Error fetching rejected products:', error);
      }
    };

    fetchRejectedProducts();
  }, [id]);

  return (
    vendorDatastate && vendorDatastate.length > 0 ?
      <>
        {
          !vendorDatastate?.[0].email_verification_status || vendorDatastate?.[0].status === 1 ?
            <AuthCheck vendorDatastate={vendorDatastate} /> :
            <>
              <h1 className='text-2xl font-semibold mb-4'>Rejected Products ({rejectedProducts.length})</h1>
              <Table columns={columns} dataSource={rejectedProducts} pagination={false} />

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
