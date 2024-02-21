import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, Button, Select } from 'antd';
import { AdminUrl } from '../constant';

const { Option } = Select;

const AddFieldModalinCategory = ({ visible, onCancel, onSubmit, category }) => {
    const [form] = Form.useForm();
    const [showOptions, setShowOptions] = useState(false);

    const handleTypeChange = (value) => {
        // Reset options when changing the field type
        setShowOptions(value === 'select');
    };

    // Validation rules for Label Name and Field Type fields
    const labelRules = [{ required: true, message: 'Please enter label name' }];
    const typeRules = [{ required: true, message: 'Please select field type' }];
    // Validation rules for Options field when it's displayed
    const optionsRules = [{ required: showOptions, message: 'Please enter options' }];

    return (
        <Modal
            title={`Add New Field in ${category}`}
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={onSubmit} >

                <Form.Item
                    label="Label Name"
                    name="label"
                    rules={labelRules} // Add validation rules for Label Name field
                >
                    <Input placeholder="Enter label name" />
                </Form.Item>

                <Form.Item
                    label="Field Type"
                    name="type"
                    rules={typeRules} // Add validation rules for Field Type field
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
                        rules={optionsRules} // Add validation rules for Options field
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

export default AddFieldModalinCategory;
