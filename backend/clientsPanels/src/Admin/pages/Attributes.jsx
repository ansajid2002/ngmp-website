import React, { useEffect, useState } from "react";
import { Table, Input, Button, Space, Modal, Form, Select } from "antd";
import { AdminUrl } from "../constant";
import Swal from "sweetalert2";

const AdminAttributes = () => {
    const [attributeName, setAttributeName] = useState("");
    const [attributeValue, setAttributeValue] = useState("");
    const [attributes, setAttributes] = useState([]);
    const [visible, setVisible] = useState(false);
    const [attributeValues, setAttributeValues] = useState([]);
    const [selectedAttributeIndex, setSelectedAttributeIndex] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalValues, setModalValues] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [filteredSubcategories, setFilteredSubcategories] = useState([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [selectedCategoryType, setSelectedCategoryType] = useState("Products");
    const [selectedCategory, setSelectedCategory] = useState(null);

    console.log(selectedSubcategory, "selectedSubcategory");
    const showModal = () => {
        setVisible(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${AdminUrl}/api/GetAttributesByVendor`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Assuming the backend responds with JSON data containing attributes
                const responseData = await response.json();
                const transformedData = responseData.attributes.map((attribute) => ({
                    attribute_id: attribute.attribute_id, // Add this line
                    name: attribute.attribute_name,
                    values: attribute.attribute_values,
                    category: attribute.category,
                    subcategory: attribute.subcategory
                }));

                // Assuming responseData is the JSON response from your backend
                // Transform the data and set it in your component's state
                setAttributes(transformedData);
            } catch (error) {
                console.error("Error:", error);
                // Handle the error as needed, e.g., show an error message to the user
            }
        };

        // Fetch data when the component mounts
        fetchData();
    }, [selectedCategory, selectedSubcategory]);

    const handleOk = async () => {
        if (!selectedCategory) return alert('Kindly select category')
        if (!selectedSubcategory) return alert('Kindly select subcategory')
        if (attributeName && attributeValues.length > 0) {
            if (selectedAttributeIndex !== null) {
                // Update the existing attribute at the selected index
                const updatedAttributes = [...attributes];
                updatedAttributes[selectedAttributeIndex] = {
                    name: attributeName,
                    values: attributeValues,
                    category: selectedCategory,
                    subcategory: selectedSubcategory
                };
                setAttributes(updatedAttributes);

                try {
                    const dataToSend = {
                        attributeName: attributeName,
                        attributeValues: attributeValues,
                        type: "update",
                        category: selectedCategory,
                        subcategory: selectedSubcategory
                    };

                    const response = await fetch(`${AdminUrl}/api/SetAttributesValues`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            // Add any additional headers if needed
                        },
                        body: JSON.stringify(dataToSend),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Assuming the backend responds with JSON data
                    const responseData = await response.json();

                    // Show a success alert using sweetalert2
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: responseData.message || "Operation completed successfully",
                    });
                } catch (error) {
                    console.error("Error:", error);

                    // Show an error alert using sweetalert2
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred. Please try again later.",
                    });
                }
            } else {
                // Add a new attribute
                const newAttribute = { name: attributeName, values: attributeValues, category: selectedCategory, subcategory: selectedSubcategory };

                try {
                    const dataToSend = {
                        attributeName: attributeName,
                        attributeValues: attributeValues,
                        type: "add",
                        category: selectedCategory,
                        subcategory: selectedSubcategory
                    };

                    const response = await fetch(`${AdminUrl}/api/SetAttributesValues`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            // Add any additional headers if needed
                        },
                        body: JSON.stringify(dataToSend),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    // Assuming the backend responds with JSON data
                    const responseData = await response.json();
                    setAttributes([...attributes, newAttribute]);

                    // Show a success alert using sweetalert2
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: responseData.message || "Operation completed successfully",
                    });
                } catch (error) {
                    console.error("Error:", error);

                    // Show an error alert using sweetalert2
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "An error occurred. Please try again later.",
                    });
                }
            }

            // Clear the input fields and close the modal
            setAttributeName("");
            setAttributeValues([]);
            setSelectedAttributeIndex(null);
            setVisible(false);
            setEditModalVisible(false);
        } else {
            Swal.fire({
                icon: "info",
                text: "",
                title: "Attribute Name or Value is missing..."
            })
        }
    };
    console.log(attributeValue, "attributeValue");
    const handleCancel = () => {
        setVisible(false);
        setEditModalVisible(false);
        setSelectedAttributeIndex(null);
        setAttributeName("");
        setAttributeValues([]);
        setSelectedCategory(null)
        setSelectedSubcategory(null)
    };

    const addAttributeValue = () => {
        if (attributeValue) {
            setAttributeValues([...attributeValues, attributeValue]);
            setAttributeValue("");
        }
    };

    const removeAttributeValue = (index) => {
        if (selectedAttributeIndex !== null) {
            const updatedAttributes = [...attributes];
            updatedAttributes[selectedAttributeIndex].values.splice(index, 1);
            setAttributes(updatedAttributes);
            // Check if the selected attribute is deleted
            if (selectedAttributeIndex === index) {
                setSelectedAttributeIndex(null);
            }
        }
    };

    const handleEditAttribute = (index) => {
        setSelectedAttributeIndex(index);
        setEditModalVisible(true);
        setSelectedCategory(null)
        setSelectedSubcategory(null)

        // Pre-fill edit modal fields with selected attribute's data
        const selectedAttribute = attributes[index];

        console.log(selectedAttribute, "selectedAttribute");
        setAttributeName(selectedAttribute.name);
        setSelectedCategory(selectedAttribute.category);
        setSelectedSubcategory(selectedAttribute.subcategory);
        setAttributeValues(selectedAttribute.values);
    };

    const handleReadMore = (values) => {
        setModalValues(values);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    const columns = [
        {
            title: "Catgeory",
            dataIndex: "category",
            key: "category",
            width: 150
        },
        {
            title: "Subcatgeory",
            dataIndex: "subcategory",
            key: "subcategory",
            width: 150
        },
        {
            title: "Attribute Name",
            dataIndex: "name",
            key: "name",
            width: 150
        },
        {
            title: 'Attribute Values',
            dataIndex: 'values',
            key: 'values',
            render: (values) => (
                <div className="">
                    {values?.slice(0, 5).map((value, valueIndex) => (
                        <span key={valueIndex}>
                            {value}
                            {valueIndex !== values?.slice(0, 5).length - 1 && ', '}
                        </span>
                    ))}

                    {values && values.length > 5 && (
                        <span className="cursor-pointer text-blue-500 ml-2" onClick={() => handleReadMore(values)}>
                            Read more...
                        </span>
                    )}
                </div>
            ),
        },
        {
            title: "Action",
            key: "action",
            width: 250,
            render: (text, record, index) => (
                <Space size="middle">
                    <Button type="default" onClick={() => handleEditAttribute(index)}>
                        Edit
                    </Button>
                    <Button
                        type="danger"
                        onClick={() => handleDeleteAttribute(index, record.attribute_id)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const handleDeleteAttribute = async (index, attribute_id) => {
        // Display a confirmation dialog
        const isConfirmed = window.confirm(
            "Are you sure you want to delete this attribute?"
        );

        if (isConfirmed) {
            const updatedAttributes = [...attributes];
            updatedAttributes.splice(index, 1);
            setAttributes(updatedAttributes);

            try {
                const dataToSend = {
                    attribute_id: attribute_id,
                };

                const response = await fetch(`${AdminUrl}/api/DeleteAttribute`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // Add any additional headers if needed
                    },
                    body: JSON.stringify(dataToSend),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // Assuming the backend responds with JSON data
                const responseData = await response.json();

                // Show a success alert using sweetalert2
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: responseData.message || "Attribute deleted successfully",
                });
            } catch (error) {
                console.error("Error:", error);

                // Show an error alert using sweetalert2
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred. Please try again later.",
                });
            }
        }
    };

    const categoryFunction = async () => {
        try {
            // Your API call to fetch categories data
            const response = await fetch(`${AdminUrl}/api/getAllProductCatgeory`);
            const data = await response.json();
            setCategories(data);
        } catch (err) {
            console.log(err);
        }
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

    const handleCategoryChange = (categoryId) => {
        const selectedCategory = categories.find(
            (category) => category.category_name === categoryId
        );

        setSelectedCategoryId(categoryId);
        setSelectedSubcategory(null);
        setSelectedCategory(
            selectedCategory
                ? selectedCategory.category_name.replace(/[^\w\s]/g, "")
                    .replace(/\s/g, "")
                : ""
        );
        setFilteredSubcategories([]);
        document.getElementById("subcategory").value = "";
    };

    const handleSubcategoryChange = (subcategoryId) => {
        // Find the selected subcategory object from the filteredSubcategories array
        const selectedSubcategorys = filteredSubcategories.find(
            (subcategory) => subcategory.subcategory_name === subcategoryId
        );
        // Set the subcategory name in state
        setSelectedSubcategory(
            selectedSubcategorys
                ? selectedSubcategorys.subcategory_name
                    .replace(/[^\w\s]/g, "")
                    .replace(/\s/g, "")
                : ""
        );
    };

    useEffect(() => {
        // Check if 'categories' and 'subcategories' are empty
        const categoriesEmpty = categories === null || categories.length === 0;
        const subcategoriesEmpty = subcategories.length === 0;

        // Fetch data only if both 'categories' and 'subcategories' are empty
        if (categoriesEmpty || subcategoriesEmpty) {
            categoryFunction();
            subcategoryFunction();
        }
    }, [categories, subcategories]);

    // useEffect to filter subcategories based on the selected category ID
    useEffect(() => {
        // Find the corresponding category ID from the categories array
        const selectedCategory = categories.find(
            (category) => category.category_name === selectedCategoryId
        );

        if (selectedCategory) {
            // Filter subcategories based on the selected category ID
            const filteredSubcategories = subcategories.filter(
                (subcategory) =>
                    subcategory.parent_category_id === selectedCategory.category_id
            );
            setFilteredSubcategories(filteredSubcategories);
        }
    }, [selectedCategoryId, categories, subcategories]);

    return (
        <div className="sm:ml-72">
            <button
                onClick={showModal}
                className="bg-[#EC642A] hover:bg-[#EC642A]/80 text-white rounded-full p-2  absolute right-10 top-24"
            >
                <svg
                    className="w-10 h-10"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </button>
            <div className="mt-20">
                <Table
                    dataSource={attributes}
                    columns={columns}
                    pagination={false}
                    rowKey={(record, index) => index.toString()}
                    className="w-full"
                />
            </div>
            <Modal
                title={
                    selectedAttributeIndex !== null ? "Edit Attribute" : "Add Attribute"
                }
                visible={visible || editModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{
                    style: { background: "#4CAF50", borderColor: "#4CAF50" },
                }}
                width={700}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                    <div className="flex justify-between items-center">
                        <Select
                            showSearch
                            id="category"
                            placeholder="Select category"
                            className="w-full"
                            onChange={(category) => handleCategoryChange(category)}
                            allowClear
                            value={selectedCategory || undefined}
                        >
                            {categories
                                .filter(
                                    (category) =>
                                        category.category_type === selectedCategoryType
                                )
                                .map((category) => (
                                    <Select.Option
                                        key={category.category_id}
                                        value={category.category_name}
                                        category={category}
                                    >
                                        {category.category_name}
                                    </Select.Option>
                                ))}
                        </Select>

                    </div>

                    <div className="flex justify-between items-center">

                        <Select
                            id="subcategory"
                            placeholder="Select subcategory"
                            className="w-full"
                            onChange={(subcategory) =>
                                handleSubcategoryChange(subcategory)
                            }
                            value={selectedSubcategory || undefined}
                            allowClear // Add this prop to enable clearing the selected value
                            showSearch
                        >
                            {filteredSubcategories.map((subcategory) => (
                                <Select.Option
                                    key={subcategory.subcategory_id}
                                    value={subcategory.subcategory_name}
                                >
                                    {subcategory.subcategory_name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <Input
                    value={attributeName}
                    onChange={(e) => setAttributeName(e.target.value)}
                    placeholder="Attribute Name"
                    className="mb-2"
                />
                <Input
                    value={attributeValue}
                    onChange={(e) => setAttributeValue(e.target.value)}
                    placeholder="Attribute Value"
                    className="mb-2"
                />
                <div className="flex justify-end">
                    <button
                        className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300`}
                        onClick={addAttributeValue}
                        disabled={attributeValue.length === 0}
                    >
                        Add Value
                    </button>
                </div>

                <div className="mt-4">
                    <strong>Attribute Values:</strong>
                    <ul className="list-disc pl-4">
                        {attributeValues.map((value, index) => (
                            <li key={index}>
                                {value}
                                {
                                    selectedAttributeIndex !== null && <Button
                                        type="text"
                                        className="text-red-500 ml-2"
                                        onClick={() => removeAttributeValue(index)}
                                    >
                                        Remove
                                    </Button>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>

            <Modal title="All Values" visible={modalVisible} onCancel={handleCloseModal} footer={null}>
                <ul className="list-disc pl-4">
                    {modalValues.map((value, valueIndex) => (
                        <li key={valueIndex}>{value}</li>
                    ))}
                </ul>
            </Modal>
        </div>
    );
};

export default AdminAttributes;