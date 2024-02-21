import React from 'react';
import { Tabs } from 'antd';
import EditSpecification from './EditSpecification';
import ManageCountry from './ManageCountry';
import { useLocation } from 'react-router-dom';

const { TabPane } = Tabs;

const AdminSettings = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get('mode');

    // Example object containing tab information
    const tabsData = [
        { key: '1', title: 'Country Code', content: <ManageCountry /> },
        { key: '2', title: 'Manage Specification', content: mode === 'Specification' ? <EditSpecification /> : null },
        // { key: '3', title: 'Tab 3', content: 'Content of Tab 3' },
    ];

    // Determine the active key based on the mode
    const activeKey = mode === 'Specification' ? '2' : '1'; // Set to '2' if mode is 'Specification', otherwise set to '1'

    return (
        <div className='sm:ml-72 sm:p-2'>
            <Tabs defaultActiveKey={activeKey} type='link'>
                {tabsData.map(tab => (
                    <TabPane tab={tab.title} key={tab.key}>
                        {tab.content}
                    </TabPane>
                ))}
            </Tabs>
        </div>
    );
};

export default AdminSettings;
