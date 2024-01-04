import React from 'react';
import { Tabs } from 'antd';
import EditSpecification from './EditSpecification';
import ManageCountry from './ManageCountry';

const { TabPane } = Tabs;

const AdminSettings = () => {
    // Example object containing tab information
    const tabsData = [
        { key: '1', title: 'Country Code', content: <ManageCountry /> },
        { key: '2', title: 'Manage Specification', content: <EditSpecification /> },
        // { key: '3', title: 'Tab 3', content: 'Content of Tab 3' },
    ];

    return (
        <div className='sm:ml-72 sm:p-2'>
            <Tabs defaultActiveKey={tabsData[0].key} type='link'>
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
