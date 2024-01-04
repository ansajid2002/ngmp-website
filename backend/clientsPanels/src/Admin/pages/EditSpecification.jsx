import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminUrl } from '../constant';
import { Form, Input, Button, Space, message, Typography, Table, Modal, Descriptions, Select } from 'antd';
import AddFieldModal from './AddFieldModal';  // Import the AddFieldModal component

const { Option } = Select;

const EditSpecification = () => {
    const [form] = Form.useForm();
    const [specifications, setSpecifications] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [addFieldModalVisible, setAddFieldModalVisible] = useState(false);
    const [selectedCategoryFields, setSelectedCategoryFields] = useState([]);
    const [isFormDirty, setFormDirty] = useState(false);
    const [editCategoryData, setEditCategoryData] = useState({});

    useEffect(() => {
        fetchSpecification();
    }, []);

    const fetchSpecification = async () => {
        try {
            const response = await axios.get(`${AdminUrl}/api/getSpecifications`);
            setSpecifications(response.data);
            form.setFieldsValue({ specifications: response.data });
        } catch (error) {
            console.error('Error fetching specifications:', error);
        }
    };

    const handleAddField = async (values) => {
        try {
            console.log('Field data:', values); // Log the field data
            // Send the new field data to the backend
            await axios.post(`${AdminUrl}/api/addField`, values);
            message.success('Field added successfully!');
            setAddFieldModalVisible(false);
            fetchSpecification();  // Refresh the specifications data
        } catch (error) {
            console.error('Error adding field:', error);
            message.error('Failed to add field.');
        }
    };


    const handleDeleteCategory = async (index, category) => {
        const updatedData = [...specifications];

        try {
            // Send the updated data to the backend for deletion
            const response = await axios.post(`${AdminUrl}/api/deleteCategorySpecification`, { category });
            updatedData.splice(index, 1);
            setSpecifications(updatedData);
            message.success(response.data.message);
        } catch (error) {
            console.error('Error deleting category:', error);
            message.error('Failed to delete category.');
        }
    };

    const handleEditCategory = (category) => {
        const categoryData = specifications.find((spec) => spec.category === category);
        const fieldsToShow = categoryData?.fields.slice(0, 5);
        setSelectedCategoryFields(fieldsToShow);
        setEditCategoryData(categoryData);

        // Convert the array of objects to an array of options arrays
        const optionsArray = categoryData?.fields.map((field) => field.options);

        // Set default values in the form for the selected category
        form.setFieldsValue({
            category: categoryData?.category,
            options: JSON.stringify(optionsArray),
        });

        setVisibleModal(true);
    };

    const columns = [
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Fields',
            key: 'fields',
            render: (_, record) => (
                <>
                    {record.fields.slice(0, 5).map((field) => (
                        <div key={field.name}>
                            <strong>{field.label}:</strong> {field.options ? field.options.filter(option => option.trim() !== '').join(', ') : 'N/A'}
                        </div>
                    ))}
                    {record.fields.length > 5 && (
                        <Button type="link" onClick={() => handleShowMore(record.category)}>
                            Show More
                        </Button>
                    )}
                </>
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record, index) => (
                <Space>
                    <Button type="link" onClick={() => handleEditCategory(record.category)}>
                        Edit
                    </Button>
                    <Button type="link" onClick={() => handleDeleteCategory(index, record.category)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleShowMore = (category) => {
        const categoryData = specifications.find((spec) => spec.category === category);
        const fieldsToShow = categoryData?.fields;
        setSelectedCategoryFields(fieldsToShow);
        setEditCategoryData(categoryData);
        setVisibleModal(true);
    };

    const handleCloseModal = () => {
        setVisibleModal(false);
    };

    const handleAddNewField = () => {
        setAddFieldModalVisible(true);
    };

    return (
        <div>
            <Typography className='text-2xl mb-4 font-semibold'>Manage Specifications</Typography>

            {/* <Button type="primary" onClick={handleAddNewField}>
                Add New Field
            </Button> */}

            <Table dataSource={specifications} columns={columns} rowKey="category" />

            <Modal
                title="All Fields and Options"
                visible={visibleModal}
                onCancel={handleCloseModal}
                footer={null}
                width={1000}
            >
                {/* Existing modal content */}
                <Descriptions column={1} bordered>
                    {selectedCategoryFields.map((field, fieldIndex) => (
                        <Descriptions.Item key={field.name} label={<strong contentEditable onBlur={(e) => handleEditLabel(fieldIndex, e)}>{field.label}</strong>}>
                            {field.options ? (
                                <>
                                    {field.options.map((option, optionIndex) => (
                                        <div
                                            key={optionIndex}
                                            style={{ width: '100%', maxHeight: '100px', overflow: 'auto' }}
                                        >
                                            <strong contentEditable
                                                onBlur={(e) => handleEditOption(fieldIndex, optionIndex, e)}>{option}</strong>
                                        </div>
                                    ))}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Add new option"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    handleAddOption(fieldIndex, e.target.value);
                                                    e.target.value = ''; // Clear the input after adding the option
                                                }
                                            }}
                                        />
                                    </div>
                                </>
                            ) : (
                                'This is Input Box'
                            )}
                        </Descriptions.Item>
                    ))}
                </Descriptions>
            </Modal>

            {/* AddFieldModal component for adding a new field */}
            <AddFieldModal
                visible={addFieldModalVisible}
                onCancel={() => setAddFieldModalVisible(false)}
                onSubmit={handleAddField}
            />
        </div>
    );
};

export default EditSpecification;
