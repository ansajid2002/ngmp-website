import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AdminUrl } from '../constant';
import { Form, Input, Button, Space, message, Typography, Table, Modal, Descriptions, Select } from 'antd';
import AddFieldModal from './AddFieldModal';  // Import the AddFieldModal component
import { FaPlusCircle } from 'react-icons/fa';
import AddFieldModalinCategory from './AddFieldModalinCategory';

const { Option } = Select;

const EditSpecification = () => {
    const [form] = Form.useForm();
    const [specifications, setSpecifications] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [addFieldModalVisible, setAddFieldModalVisible] = useState(false);
    const [selectedCategoryFields, setSelectedCategoryFields] = useState([]);
    const [editCategoryData, setEditCategoryData] = useState({});
    const [addNewFieldCATEGORY, setAddNewFieldsinCATEGORY] = useState(false);

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
            const response = await axios.post(`${AdminUrl}/api/addFieldSpecification`, values);

            if (response.data.success) {
                // If the backend responds with success
                message.success('Field added successfully!');
                setAddFieldModalVisible(false);
                fetchSpecification();  // Refresh the specifications data
            } else {
                // If the backend responds with an error message
                message.error(response.data.error || 'Failed to add field.');
            }
        } catch (error) {
            // If an error occurs during the request
            console.error('Error adding field:', error);
            message.error('Failed to add field.');
        }
    };


    const handleDeleteCategory = async (index, category) => {
        try {
            // Send the request to delete the category to the backend
            const response = await axios.post(`${AdminUrl}/api/deleteCategorySpecification`, { category });

            // Filter out the category to be deleted from the specifications array
            const updatedData = specifications.filter(item => item.category !== category);

            // Update the state with the filtered data
            setSpecifications(updatedData);

            // Display success message from the backend response
            message.success(response.data.message);
        } catch (error) {
            console.error('Error deleting category:', error);
            message.error('Failed to delete category.');
        }
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

        console.log(fieldsToShow);
        setSelectedCategoryFields(fieldsToShow);
        setEditCategoryData(categoryData);

        const optionsArray = categoryData && categoryData?.fields?.map((field) => field.type === 'select' && field?.options);

        // Set default values in the form for the selected category
        form.setFieldsValue({
            category: categoryData?.category,
            options: optionsArray && JSON.stringify(optionsArray) || [],
        });

        setVisibleModal(true);
    };

    const handleEditCategory = (category) => {
        const categoryData = specifications.find((spec) => spec.category === category);
        const fieldsToShow = categoryData?.fields.slice(0, 5);
        setSelectedCategoryFields(fieldsToShow);
        setEditCategoryData(categoryData);

        // Convert the array of objects to an array of options arrays
        const optionsArray = categoryData && categoryData?.fields.map((field) => field.options);

        // Set default values in the form for the selected category
        form.setFieldsValue({
            category: categoryData?.category,
            options: JSON.stringify(optionsArray),
        });

        setVisibleModal(true);
    };

    const handleCloseModal = () => {
        setVisibleModal(false);
    };

    const handleAddNewField = () => {
        setAddFieldModalVisible(true);
    };

    const handleAddNewFieldsinCATEGORY = () => {
        setAddNewFieldsinCATEGORY(true);
    };


    const handleAddOption = async (fieldIndex, fieldName, optionValue) => {
        try {
            const updatedFields = [...selectedCategoryFields];
            updatedFields[fieldIndex].options.push(optionValue);
            setSelectedCategoryFields(updatedFields);
            const response = await axios.post(`${AdminUrl}/api/updateOptions`, {
                fieldName,
                newOptions: updatedFields[fieldIndex].options,
            });
            message.success(response.data.message);
        } catch (error) {
            console.error('Error adding option:', error);
            message.error('Failed to add option.');
        }
    };

    const handleEditLabel = async (fieldIndex, event) => {
        const updatedFields = [...selectedCategoryFields];
        updatedFields[fieldIndex].label = event.target.innerText;

        console.log(editCategoryData, 'editCategoryData');
        // Prepare data to send to the endpoint
        const newData = {
            category: editCategoryData?.category, // Assuming you have the selected category stored somewhere
            fieldIndex: fieldIndex,
            label: event.target.innerText
        };

        try {
            // Make an HTTP POST request to the endpoint
            const response = await fetch(`${AdminUrl}/api/updateLabel`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newData)
            });

            // Check if the request was successful
            if (response.ok) {
                console.log('Label updated successfully');
            } else {
                // Handle error response from the server
                const errorData = await response.json();
                console.error('Error updating label:', errorData.error);
            }
        } catch (error) {
            console.error('Error updating label:', error);
        }

        // Update the state with the modified fields
        setSelectedCategoryFields(updatedFields);
    };


    const handleEditOption = (fieldIndex, optionIndex, event) => {
        const updatedFields = [...selectedCategoryFields];
        updatedFields[fieldIndex].options[optionIndex] = event.target.innerText;
        setSelectedCategoryFields(updatedFields);
    };

    const handleAddFieldinCATEGORY_BACKEND = async (values) => {
        try {
            console.log(values, 'ne cat field');

            // Add the category to the values object
            const dataToSend = { ...values, category: editCategoryData?.category };

            // Send the field values along with the category to the backend
            const response = await axios.post(`${AdminUrl}/api/addFieldSpecificationinCATEGORY`, dataToSend);

            // Log the response from the backend
            console.log('Response from backend:', response);

            // Update the specifications array with the updated category object
            const updatedSpecifications = specifications.map(spec => {
                if (spec.category === editCategoryData?.category) {
                    // If the category matches, update the fields array with the new field
                    spec.fields.push({
                        name: values.label.toLowerCase().replace(/\s/g, ''),
                        label: values.label,
                        type: values.type,
                        options: values.options ? values.options.split(',').map(option => option.trim()) : []
                    });
                }
                return spec;
            });

            // Update the state with the updated specifications array
            setSpecifications(updatedSpecifications);

            // Handle success (display success message, etc.)
            if (selectedCategoryFields && selectedCategoryFields.category === editCategoryData?.category) {
                setSelectedCategoryFields(prevFields => [
                    ...prevFields,
                    {
                        name: values.label.toLowerCase().replace(/\s/g, ''),
                        label: values.label,
                        type: values.type,
                        options: values.options ? values.options.split(',').map(option => option.trim()) : []
                    }
                ]);
            }

            setAddNewFieldsinCATEGORY(false)
        } catch (error) {
            console.error('Error adding field to category:', error);
            // Handle errors (display error message, etc.)
        }
    };

    const handleDeleteFieldinCategory = (field, fieldname) => {
        try {
            console.log(field, fieldname, editCategoryData.category);

            // Prepare the data to send to the backend
            const dataToSend = {
                field,
                fieldname,
                category: editCategoryData.category
            };

            // Send the data to the backend
            axios.post(`${AdminUrl}/api/deleteFieldinCategory`, dataToSend)
                .then(response => {
                    console.log('Response from backend:', response.data);

                    // Filter out the deleted field from specifications
                    const updatedSpecifications = specifications.map(spec => {
                        if (spec.category === editCategoryData?.category) {
                            spec.fields = spec.fields.filter(item => item.name !== fieldname);
                        }
                        return spec;
                    });

                    // Update the specifications state
                    setSpecifications(updatedSpecifications);

                    // Filter out the deleted field from selectedCategoryFields
                    const updatedSelectedCategoryFields = selectedCategoryFields.filter(item => item.name !== fieldname);

                    // Update the selectedCategoryFields state
                    setSelectedCategoryFields(updatedSelectedCategoryFields);

                    message.success("Fields Deleted Successfully....")
                    // Handle response as needed
                })
                .catch(error => {
                    console.error('Error deleting field in category:', error);
                    // Handle errors (display error message, etc.)
                });
        } catch (error) {
            console.error('Error in handleDeleteFieldinCategory:', error);
            // Handle errors (display error message, etc.)
        }
    };

    return (
        <div>

            <div className='py-4 flex justify-between'>
                <Typography className='text-2xl mb-4 font-semibold'>Manage Specifications</Typography>
                <Button type="default" className="flex justify-between items-center gap-3 border border-orange-500 text-orange-500" onClick={handleAddNewField}>
                    <FaPlusCircle /> Add New Field
                </Button>
            </div>

            <Table dataSource={specifications} columns={columns} rowKey="category" />

            <Modal
                title="All Fields and Options"
                visible={visibleModal}
                onCancel={handleCloseModal}
                footer={null}
                width={1000}
            >
                {/* Existing modal content */}
                <div className='flex justify-end py-4'>
                    <Button type="default" className="flex justify-between items-center gap-3 border border-orange-500 text-orange-500" onClick={handleAddNewFieldsinCATEGORY}>
                        <FaPlusCircle /> Add New Field in {editCategoryData?.category}
                    </Button>
                </div>
                <Descriptions column={1} bordered>
                    {selectedCategoryFields.map((field, fieldIndex) => (
                        <Descriptions.Item key={field.name} label={<div>
                            <div>
                                <strong contentEditable onBlur={(e) => handleEditLabel(fieldIndex, e)}>{field.label}</strong>
                            </div>
                            <button className='text-red-500 text-sm tracking-widest' onClick={() => handleDeleteFieldinCategory(fieldIndex, field.name)}>Delete</button>
                        </div>}>
                            {field && field.type === 'select' && Array.isArray(field?.options) && field?.options?.length > 0 ? (
                                <>
                                    {field && field.type === 'select' && field?.options?.map((option, optionIndex) => (
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
                                                    handleAddOption(fieldIndex, field.name, e.target.value);
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

            <AddFieldModalinCategory
                visible={addNewFieldCATEGORY}
                onCancel={() => setAddNewFieldsinCATEGORY(false)}
                onSubmit={handleAddFieldinCATEGORY_BACKEND}
                category={editCategoryData?.category}
            />
        </div>
    );
};

export default EditSpecification;
