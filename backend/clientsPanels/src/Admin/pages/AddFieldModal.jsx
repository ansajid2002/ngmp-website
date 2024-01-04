import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, Space } from 'antd';

const { Option } = Select;

const AddFieldModal = ({ visible, onCancel, onSubmit }) => {
    const [form] = Form.useForm();
    const [showOptions, setShowOptions] = useState([false]);

    const handleTypeChange = (value, index) => {
        // Reset options when changing the field type
        const updatedShowOptions = [...showOptions];
        updatedShowOptions[index] = value === 'select';
        setShowOptions(updatedShowOptions);

    };

    return (
        <Modal
            title="Add New Field"
            visible={visible}
            onCancel={onCancel}
            footer={null}
        >
            <Form form={form} onFinish={onSubmit} name="dynamic_form_nest_item" autoComplete="off">
                <Form.List
                    name="fields"
                    initialValue={[{}]}
                >
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                                <>
                                    <Form.Item
                                        {...restField}
                                        label="Category"
                                        name={[name, 'category']}
                                        fieldKey={[fieldKey, 'category']}
                                    >
                                        <Input placeholder="Enter category" />
                                        <p className="ant-form-item-explain">Enter the category for the new field. If Category Name is Laptop & Computers then Enter LaptopComputers</p>
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        label="Label Name"
                                        name={[name, 'label']}
                                        fieldKey={[fieldKey, 'label']}
                                    >
                                        <Input placeholder="Enter label name" />
                                        <p className="ant-form-item-explain">Enter a name for the label.</p>
                                    </Form.Item>

                                    <Form.Item
                                        {...restField}
                                        label="Field Type"
                                        name={[name, 'type']}
                                        fieldKey={[fieldKey, 'type']}
                                    >
                                        <Select onChange={(value) => handleTypeChange(value, index)} placeholder="Select field type">
                                            <Option value="text">Text</Option>
                                            <Option value="select">Select</Option>
                                        </Select>
                                        <p className="ant-form-item-explain">Select the type of the new field.</p>
                                    </Form.Item>

                                    {showOptions[index] && (
                                        <Form.Item
                                            {...restField}
                                            label="Options"
                                            name={[name, 'options']}
                                            fieldKey={[fieldKey, 'options']}
                                        >
                                            <Input placeholder="Enter options (comma-separated)" />
                                            <p className="ant-form-item-explain">Enter options for the select field (comma-separated).</p>
                                        </Form.Item>
                                    )}

                                    <Button
                                        type="dashed"
                                        onClick={() => remove(name)}
                                        style={{ width: '20px' }}
                                    >
                                        -
                                    </Button>
                                </>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{ width: '100%' }}
                                >
                                    + Add Field
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Fields
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AddFieldModal;
