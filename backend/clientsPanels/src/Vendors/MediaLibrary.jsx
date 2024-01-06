import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Typography, Button } from 'antd';
import moment from 'moment';
import { AdminUrl } from '../Admin/constant';
import { AiOutlineDownload } from 'react-icons/ai'; // Import the download icon
import AuthCheck from './components/AuthCheck';

const { Title, Text } = Typography;

const MediaLibrary = ({ vendorDatastate }) => {
    const [data, setData] = useState([]);
    const vendorId = vendorDatastate?.[0]?.id;

    useEffect(() => {
        const fetchVendorLibrary = async () => {
            try {
                const response = await axios.post(`${AdminUrl}/api/fetchVendorLibrary`, {
                    vendorId,
                });

                // Assuming the response.data is an array of media items
                setData(response.data);
            } catch (error) {
                console.error('Error fetching vendor library:', error);
            }
        };

        fetchVendorLibrary();
    }, [vendorId]); // Empty dependency array to ensure the effect runs only once

    const columns = [
        { title: 'Media ID', dataIndex: 'media_id', key: 'media_id', sorter: (a, b) => a.media_id - b.media_id, defaultSortOrder: 'descend', width: 60 },
        { title: 'Title', dataIndex: 'title', key: 'title', ellipsis: { showTitle: false }, render: text => <Text title={text} className="line-clamp-1">{text}</Text>, width: 100 },
        { title: 'File Path', dataIndex: 'file_path', key: 'file_path', render: text => <Text title={text} className="line-clamp-1">{text}</Text>, width: 250 },
        {
            title: 'Creation Date',
            dataIndex: 'creation_date',
            key: 'creation_date',
            render: (text, record) => moment(text).format('MMMM Do YYYY, h:mm:ss a'),
            sorter: (a, b) => moment(a.creation_date).unix() - moment(b.creation_date).unix(),
            width: 100,
            defaultSortOrder: 'desc',  // Set the default sort order to descending
        },
        {
            title: 'Download',
            dataIndex: 'file_path',
            key: 'download',
            render: (text, record) => <Button type="primary" href={text} download icon={<AiOutlineDownload />} className="excel-theme-button">
                Download
            </Button>,
            width: 100,
        },
    ];

    return (
        !vendorDatastate?.[0].email_verification_status ||
            // !vendorDatastate?.[0].mobile_verification_status ||
            vendorDatastate?.[0].status === 1 ||
            vendorDatastate?.[0].status === 4 || vendorDatastate?.[0].status !== 3 ? (
            <>
                <AuthCheck vendorDatastate={vendorDatastate} />
            </>
        ) : (
            <div>
                <Title level={2} className="mb-4">Media Library</Title>
                <div className='overflow-hidden w-full overflow-x-auto bg-white p-4'>
                    <Table dataSource={data} columns={columns} />
                </div>
            </div>
        )
    )
};

export default MediaLibrary;
