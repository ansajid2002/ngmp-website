import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminUrl } from '../constant';
import { Form, Input, Button, Space, message } from 'antd';

const ManageCountry = () => {
    const [form] = Form.useForm();
    const [countryCodes, setCountryCodes] = useState([]);
    const [isFormDirty, setFormDirty] = useState(false);

    useEffect(() => {
        // Fetch initial data when the component mounts
        fetchCountryCodes();
    }, []);

    const fetchCountryCodes = async () => {
        try {
            const response = await axios.get(`${AdminUrl}/api/country-codes`);
            setCountryCodes(response.data);

            // Set initial values in the form fields
            form.setFieldsValue({ countryCodes: response.data });
        } catch (error) {
            console.error('Error fetching country codes:', error);
        }
    };

    const handleAddCountry = async (values) => {
        try {
            // Send the new country data to the backend
            await axios.post(`${AdminUrl}/api/country-codes`, values.countryCodes);
            message.success('Data saved successfully!');
            setFormDirty(false); // Reset the form dirty state
        } catch (error) {
            console.error('Error saving data:', error);
            message.error('Failed to save data.');
        }
    };

    const handleDeleteCountry = async (index) => {
        const updatedData = [...countryCodes];
        updatedData.splice(index, 1);

        setCountryCodes(updatedData);

        // Update the form data after deleting a country
        form.setFieldsValue({ countryCodes: updatedData });
        setFormDirty(true); // Mark the form as dirty

        // Send the updated data to the backend
        await axios.post(`${AdminUrl}/api/country-codes`, updatedData);
        message.success('Data Removed successfully!');
    };

    return (
        <div>
            <h2>Manage Country</h2>
            <Form
                form={form}
                onFinish={handleAddCountry}
                onFieldsChange={() => setFormDirty(true)} // Set the form as dirty when any field changes
            >
                <Form.List name="countryCodes">
                    {(fields, { add }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'code']}
                                        fieldKey={[fieldKey, 'code']}
                                        rules={[{ required: true, message: 'Please input the code!' }]}
                                    >
                                        <Input placeholder="Code" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'country']}
                                        fieldKey={[fieldKey, 'country']}
                                        rules={[{ required: true, message: 'Please input the country!' }]}
                                    >
                                        <Input placeholder="Country" />
                                    </Form.Item>
                                    <Button type="link" onClick={() => handleDeleteCountry(index)}>
                                        Remove
                                    </Button>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()}>
                                    Add Country
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item name={['newCountry', 'code']} style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item name={['newCountry', 'country']} style={{ display: 'none' }}>
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="default" htmlType="submit" disabled={!form.isFieldsTouched() || !isFormDirty}>
                        Save Data
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ManageCountry;
