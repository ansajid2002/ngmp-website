import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, Button, Collapse, Modal, Descriptions, Form, Input, message } from 'antd';
import axios from 'axios';
import Swal from 'sweetalert2';

const { Panel } = Collapse;
const { Item, useForm } = Form;

const AdminProfile = ({ adminLoginData }) => {
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [form] = useForm();
    const adminid = useMemo(() => adminLoginData?.[0]?.id || '', [adminLoginData]);
    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmNewPassword: '',
    });

    const handleEditButtonClick = useCallback(() => {
        setEditModalVisible(true);
    }, []);

    const handleEditModalCancel = useCallback(() => {
        setEditModalVisible(false);
    }, []);

    const handleSaveChanges = useCallback(async () => {
        try {
            const response = await axios.put('/api/update-admin', {
                adminid,
                newName,
                newEmail,
            });

            console.log('Response from backend:', response.data);

            if (response.status === 200 && response.data.success) {
                // Show success message using Swal
                Swal.fire({
                    icon: 'success',
                    title: 'Changes saved successfully',
                    showConfirmButton: false,
                    timer: 1500,
                });

                setEditModalVisible(false);
                window.location.href = '/Admin'
            } else {
                // Handle other success scenarios or unexpected responses
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to save changes',
                    text: 'Please try again later',
                });
            }
        } catch (error) {
            console.error('Error updating user information:', error);

            // Handle specific error scenarios based on the error response
            if (error.response && error.response.status === 409) {
                Swal.fire({
                    icon: 'error',
                    title: 'Email conflict',
                    text: 'This email is already in use',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed to save changes',
                    text: 'Please try again later',
                });
            }
        }
    }, [adminid, newName, newEmail, setEditModalVisible]);

    const handleUpdatePassword = useCallback(() => {
        form.validateFields().then(async () => {
            // Password validation logic
            if (passwords.newPassword === passwords.confirmNewPassword) {
                try {
                    // Send request to update password
                    const response = await axios.put('/api/update-password', {
                        adminid,
                        currentPassword: passwords.currentPassword,
                        newPassword: passwords.newPassword,
                    });

                    console.log('Response from backend:', response.data);

                    if (response.status === 200 && response.data.success) {
                        // Password update successful
                        Swal.fire({
                            icon: 'success',
                            title: 'Password updated successfully',
                            showConfirmButton: false,
                            timer: 1500,
                            didClose: () => {
                                // Redirect to /Admin after the success message is closed
                                window.location.href = '/Admin';
                            },
                        });
                    } else {
                        // Handle other success scenarios or unexpected responses
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed to update password',
                            text: response.data.message || 'Please try again later.',
                        });
                        message.error('Passwords do not match');

                    }
                } catch (error) {
                    console.error('Error updating password:', error);

                    // Handle specific error scenarios based on the error response
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed to update password',
                        text: 'Please try again later.',
                    });
                }
            } else {
                // Passwords do not match, show an error message
                message.error('Passwords do not match');
            }
        });
    }, [form, passwords, adminid]);




    useEffect(() => {
        if (adminLoginData?.[0]) {
            setNewName(adminLoginData[0].name || '');
            setNewEmail(adminLoginData[0].email || '');
        }
    }, [adminLoginData]);

    return (
        <div className=" my-8 sm:p-4 sm:ml-64">
            <Card
                title={
                    <div className="flex justify-between items-center">
                        <span>Admin Information</span>
                        <Button onClick={handleEditButtonClick}> Edit</Button>
                    </div>
                }
                className="mb-4"
            >
                <Descriptions column={1} bordered>
                    <Descriptions.Item label="Name">{newName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{newEmail}</Descriptions.Item>
                    <Descriptions.Item label="Position">{adminLoginData?.[0]?.position}</Descriptions.Item>
                </Descriptions>
            </Card>

            <Collapse accordion>
                <Panel header="Change Password" key="3">
                    <Form form={form} layout="vertical" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <Item
                            label="Current Password"
                            name="currentPassword"
                            className="col-span-full sm:col-span-1 lg:col-span-1"
                            rules={[
                                { required: true, message: 'Please enter your current password' },
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter current password"
                                onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                            />
                        </Item>
                        <Item
                            label="New Password"
                            name="newPassword"
                            className="col-span-full sm:col-span-1 lg:col-span-1"
                            rules={[
                                { required: true, message: 'Please enter a new password' },
                                { min: 6, message: 'Password must be at least 6 characters' },
                            ]}
                        >
                            <Input.Password
                                placeholder="Enter new password"
                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                            />
                        </Item>
                        <Item
                            label="Confirm New Password"
                            name="confirmNewPassword"
                            dependencies={['newPassword']}
                            className="col-span-full sm:col-span-1 lg:col-span-1"
                            rules={[
                                { required: true, message: 'Please confirm the new password' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Passwords do not match');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Confirm new password"
                                onChange={(e) => setPasswords({ ...passwords, confirmNewPassword: e.target.value })}
                            />
                        </Item>
                        <div className='col-span-full flex justify-center'>
                            <Button type="default" className='bg-[#3E91FF] text-white' onClick={handleUpdatePassword}>
                                Update Password
                            </Button>
                        </div>
                    </Form>
                </Panel>
            </Collapse>



            <Modal
                title="Edit Name and Email"
                visible={editModalVisible}
                onOk={handleSaveChanges}
                onCancel={handleEditModalCancel}
                footer={[
                    <Button key="cancel" onClick={handleEditModalCancel}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveChanges} style={{ backgroundColor: '#0000FF' }}>
                        Save Changes
                    </Button>,
                ]}
            >
                <div>
                    <label htmlFor="newName" className='mb-1 block'>Name:</label>
                    <Input id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <div className='mt-5'>
                    <label htmlFor="newEmail" className='mb-1 block'>Email:</label>
                    {adminLoginData?.[0]?.position === 'Staff' ? (
                        <Input id="newEmail" value={`${newEmail} (Admin Access Required)`} disabled className="bg-gray-200 cursor-not-allowed" />
                    ) : (
                        <Input id="newEmail" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    )}
                </div>


            </Modal>
        </div>
    );
};

export default AdminProfile;
