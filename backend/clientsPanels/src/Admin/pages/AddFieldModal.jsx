import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { AdminUrl } from '../constant';

const { Option } = Select;

const AddFieldModal = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    const [showOptions, setShowOptions] = useState(false);
    const [subcategories, setSubcategories] = useState(false);

    const handleTypeChange = (value) => {
        // Reset options when changing the field type
        setShowOptions(value === 'select');
    };


    const subcategoryFunction = async () => {
        try {
            // Your API call to fetch subcategories data
            const response = await fetch(`${AdminUrl}/api/getAllSubcategories`);
            const data = await response.json();
            setSubcategories(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        !subcategories && subcategoryFunction()
    }, [subcategories])

    return (
        <Modal
            title="Add New Field"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={onSubmit} >
                <Form.Item
                    label="Category"
                    name="category"
                >
                    <Select showSearch mode='multiple'>
                        {
                            subcategories && subcategories.map((item, index) => (
                                <Option key={index} value={item.subcategory_name?.replace(/\s+/g, '')}>{item.subcategory_name}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Label Name"
                    name="label"
                >
                    <Input placeholder="Enter label name" />
                </Form.Item>

                <Form.Item
                    label="Field Type"
                    name="type"
                >
                    <Select showSearch onChange={handleTypeChange} placeholder="Select field type">
                        <Option value="text">Text</Option>
                        <Option value="select">Select</Option>
                    </Select>
                </Form.Item>

                {showOptions && (
                    <Form.Item
                        label="Options"
                        name="options"
                    >
                        <Input placeholder="Enter options (comma-separated)" />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button type="default" htmlType="submit">
                        Add Field
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFieldModal;
