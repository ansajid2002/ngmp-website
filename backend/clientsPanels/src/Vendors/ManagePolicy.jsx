import React, { useState, useEffect } from 'react';
import { Table, Modal, Spin, Button, Form, Input, Select, Switch } from 'antd';
import { AdminUrl } from '../Admin/constant';
import moment from 'moment';

const ManagePolicy = ({ vendorDatastate }) => {
    const [policies, setPolicies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewDescriptionModalVisible, setViewDescriptionModalVisible] = useState(false);
    const [addPolicyModalVisible, setAddPolicyModalVisible] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [form] = Form.useForm();
    const id = vendorDatastate?.[0]?.id;

    useEffect(() => {
        // Fetch policies  based on vendor ID from backend
        id && fetchPolicies();
    }, [id]);

    const fetchPolicies = async () => {
        try {
            const response = await fetch(`${AdminUrl}/api/vendorPolicies/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any required authentication headers
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch policies : ${response.status} ${response.statusText}`);
            }

            if (response.status === 204) {
                setPolicies([]);
            } else {
                const data = await response.json();
                console.log(data);
                setPolicies(data?.data);
            }
            setLoading(false);
        } catch (error) {
            console.error('Error fetching policies :', error);
            // Handle error fetching policies 
        }
    };

    const handleViewDescription = (record) => {
        setSelectedPolicy(record);
        setViewDescriptionModalVisible(true);
    };

    const handleAddPolicy = () => {
        setAddPolicyModalVisible(true);
    };

    const handleViewDescriptionModalOk = () => {
        setViewDescriptionModalVisible(false);
    };

    const handleAddPolicyModalOk = () => {
        form.validateFields().then(values => {
            const valuesWithId = {
                ...values,
                vendor_id: id // Assuming id is the vendor ID
            };
            // Submit form data to add policy
            fetch(`${AdminUrl}/api/addPolicy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any required authentication headers
                },
                body: JSON.stringify(valuesWithId)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to add policy: ${response.status} ${response.statusText}`);
                }
                return response.json();
            }).then(data => {
                // Assuming the response contains the added policy data
                setPolicies([...policies, data?.data]);
                setAddPolicyModalVisible(false);
                form.resetFields()
            }).catch(error => {
                console.error('Error adding policy:', error);
                // Handle error adding policy
            });
        }).catch(errorInfo => {
            console.error('Form validation failed:', errorInfo);
        });
    };


    const columns = [
        {
            title: 'Policy ID',
            dataIndex: 'policy_id',
            key: 'policy_id',
        },
        {
            title: 'Policy Name',
            dataIndex: 'policy_name',
            key: 'policy_name',
        },
        {
            title: 'Policy Type',
            dataIndex: 'policy_type',
            key: 'policy_type',
        },
        {
            title: 'Policy Status',
            dataIndex: 'policy_status',
            key: 'policy_status',
            render: (policy_status) => (
                <div>
                    <p>{policy_status ? 'Active' : 'Not Active'}</p>
                </div>
            )
        },
        {
            title: 'Policy Created Date',
            dataIndex: 'policy_created_date',
            key: 'policy_created_date',
            render: (policy_created_date) => (
                <p>{moment(policy_created_date).format('lll')}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Button type="link" onClick={() => handleViewDescription(record)}>View Description</Button>
            ),
        },
    ];

    return (
        <div>
            <div className="p-5 md:p-8 bg-white shadow-lg rounded mb-8 flex flex-col items-center xl:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-xl font-semibold text-heading">Manage Policy</h1>
                </div>
                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <div

                    >

                    </div>
                    <a
                        className="inline-flex cursor-pointer items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-orange-400 text-light text-white border border-transparent px-5 py-0 h-12 h-12 w-full md:w-auto md:ms-6 h-12 w-full md:w-auto md:ms-6"
                        onClick={handleAddPolicy} // Handle adding a new coupon
                        hred="#"
                    >
                        <span>+ Add New Policy</span>
                    </a>
                </div>
            </div>

            <Spin spinning={loading}>
                <Table columns={columns} dataSource={policies} rowKey="policy_id" />
            </Spin>
            <Modal
                title="View Policy Description"
                visible={viewDescriptionModalVisible}
                onOk={handleViewDescriptionModalOk}
                onCancel={() => setViewDescriptionModalVisible(false)}
                footer={null}
            >
                {selectedPolicy && selectedPolicy.policy_description}
            </Modal>
            <Modal
                title="Add Policy"
                visible={addPolicyModalVisible}
                onOk={handleAddPolicyModalOk}
                onCancel={() => setAddPolicyModalVisible(false)}
                okButtonProps={{ style: { background: 'blue' } }}
            >
                <div>
                    <p>Vendors are advised that once this form is submitted, the policy cannot be edited or deleted. Please ensure all fields are correctly filled before submission.</p>
                </div>

                <Form form={form} layout="vertical">
                    <Form.Item
                        name="policy_name"
                        label="Policy Name"
                        rules={[{ required: true, message: 'Please enter policy name' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="policy_type"
                        label="Policy Type"
                        rules={[{ required: true, message: 'Please select policy type' }]}
                    >
                        <Select>
                            <Select.Option value="return">Return</Select.Option>
                            <Select.Option value="cancel">Cancel</Select.Option>
                            <Select.Option value="refund">Refund</Select.Option>
                            <Select.Option value="exchange">Exchange</Select.Option>
                            {/* Add more policy types as needed */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="policy_description"
                        label="Policy Description"
                        rules={[{ required: true, message: 'Please enter policy description' }]}
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="policy_status"
                        label="Policy Status"
                        valuePropName="checked"
                    >
                        <Switch className='bg-gray-500' />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default ManagePolicy;
