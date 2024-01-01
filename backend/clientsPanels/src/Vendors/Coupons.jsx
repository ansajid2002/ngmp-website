import React, { useState, useEffect } from 'react';
import { AdminUrl } from '../Admin/constant';
import { Table, Form, Input, DatePicker, Popconfirm, Button, message, Modal, InputNumber, Select } from 'antd';
import moment from 'moment';


const Coupons = ({ vendorDatastate }) => {
    const [coupons, setCoupons] = useState([]);
    const [error, setError] = useState(null);
    const [searchText, setSearchText] = useState(''); // State for search text
    const discountTypeOptions = ['%', 'F', 'Free Shipping'];
    const [createdDate, setCreatedDate] = useState(null); // State for created_date
    const [expirationDate, setExpirationDate] = useState(null); // State for expiration_date
    const [SelectedKey, setSelectedKey] = useState(null); // State for expiration_date
    const [VendorProducts, setVendorProducts] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState(null);

    const [form] = Form.useForm();

    const id = vendorDatastate?.[0]?.id;

    const [editedCouponData, setEditedCouponData] = useState(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const handleAddCoupon = () => {
        // Set the modal to add mode
        setSelectedKey(null)

        // Clear any previous data
        setEditedCouponData(null);
        setCreatedDate(null);
        setExpirationDate(null);

        // Reset the form fields
        form.resetFields();
        // Show the modal
        setIsEditModalVisible(true);
    };

    const handleCreatedDateChange = (dateString) => {
        // Convert the date string to a JavaScript Date object
        const date = new Date(dateString);
        setCreatedDate(date.toISOString()); // Set it as a string in the same format
    };

    const handleExpirationDateChange = (dateString) => {
        // Convert the date string to a JavaScript Date object
        const date = new Date(dateString);
        setExpirationDate(date.toISOString()); // Set it as a string in the same format
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'coupon_id',
            key: 'coupon_id',
        },
        {
            title: 'COUPON CODE',
            dataIndex: 'coupon_code',
            key: 'coupon_code',
            // Enable searching on Coupon Code

        },
        {
            title: 'DISCOUNT AMOUNT',
            dataIndex: 'discount_amount',
            key: 'discount_amount',
            render: (_, record) => {
                return <p>{record.discount_amount} {record.discount_type}</p>;
            },
            sorter: (a, b) => a.discount_amount - b.discount_amount, // Enable sorting by discount_amount
        },
        {
            title: 'CREATED',
            dataIndex: 'created_date',
            key: 'created_date',
            render: (createdDate) => {
                const date = new Date(createdDate);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                return `${day} ${month} ${year}`;
            },
            sorter: (a, b) => new Date(a.created_date) - new Date(b.created_date), // Enable sorting by created_date
        },
        {
            title: 'EXPIRATION',
            dataIndex: 'expiration_date',
            key: 'expiration_date',
            render: (expirationDate) => {
                const date = new Date(expirationDate);
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'short' });
                const year = date.getFullYear();
                return `${day} ${month} ${year}`;
            },
            sorter: (a, b) => new Date(a.expiration_date) - new Date(b.expiration_date), // Enable sorting by expiration_date
        },
        {
            title: 'ASSOCIATED PRODUCTS',
            dataIndex: 'associated_products',
            key: 'associated_products',
            render: (associationProducts) => {
                if (Array.isArray(associationProducts)) {
                    return associationProducts.join(', ');
                } else {
                    return 'ALL PRODUCTS';
                }
            },
        }, {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <div>
                    <Button type="default" className='bg-green-400 text-white' onClick={() => handleEditCoupon(record)}>Edit</Button>
                    <Popconfirm
                        title="Are you sure you want to delete this coupon?"
                        onConfirm={() => handleDeleteCoupon(record)}
                        okText="Yes"
                        cancelText="No"
                        okButtonProps={{ style: { background: 'red', color: 'white' } }}

                    >
                        <Button type="danger" className='text-sky-800'>Delete</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const handleEditCoupon = (coupon) => {
        form.setFieldsValue({
            ...coupon, expiration_date: moment(coupon.expiration_date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
        });
        setSelectedKey(coupon?.coupon_id)
        setEditedCouponData(coupon);

        setIsEditModalVisible(true);
        setCreatedDate(coupon?.created_date)
        setExpirationDate(coupon?.expiration_date)
    };

    const modalTitle = !SelectedKey ? 'Add Coupon' : 'Edit Coupon';
    const saveButtonLabel = !SelectedKey ? 'Add' : 'Save';

    const handleSaveEdit = () => {
        form
            .validateFields()
            .then((values) => {
                if (expirationDate === null || createdDate === null) {
                    // Display an alert to select the date
                    alert('Please select both Created Date and Expiration Date.');
                    return; // Exit the function
                }

                if (!values) {
                    return;
                }

                const requestData = {
                    ...values,
                    expiration_date: expirationDate,
                    created_date: createdDate,
                    vendorid: id,
                    associationProducts: selectedProducts
                };

                if (SelectedKey == null) {
                    fetch(`${AdminUrl}/api/addCoupons`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(requestData),
                    })
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(`Request failed with status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .then((data) => {
                            // Handle the response from the backend, which may include the new coupon's ID
                            // If successful, update the state with the new coupon

                            // Replace 'receivedCouponId' with the actual coupon ID received from the response
                            const newCoupon = {
                                coupon_id: data.coupon_id, // Use the received coupon_id
                                ...requestData,
                            };

                            // Update the state with the new coupon
                            setCoupons([...coupons, newCoupon]);

                            // Close the modal
                            setIsEditModalVisible(false);

                            // Optionally, you can display a success message to the user
                            message.success('Coupon added successfully');
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            // Optionally, display an error message to the user
                            message.error('Failed to add the coupon. Please try again.');
                        });
                } else {
                    // Handle editing the coupon

                    const editedCouponIndex = coupons.findIndex((coupon) => coupon.coupon_id === editedCouponData.coupon_id);
                    if (editedCouponIndex !== -1) {
                        const updatedCoupon = { ...coupons[editedCouponIndex], ...values };
                        updatedCoupon.expiration_date = expirationDate;
                        updatedCoupon.created_date = createdDate;
                        const updatedCoupons = [...coupons];
                        updatedCoupons[editedCouponIndex] = updatedCoupon;
                        setCoupons(updatedCoupons);

                        // Implement logic to save the edited data (e.g., send a request to the server)
                        // Prepare the data to send to the backend
                        const requestData = {
                            coupon_id: editedCouponData.coupon_id, // Assuming you need to send the coupon_id for identification
                            ...values, // Other updated fields
                            vendorid: id, // Assuming you have the vendor id available
                            created_date: createdDate,
                            expiration_date: expirationDate,
                            associationProducts: selectedProducts
                        };

                        // Send a POST request to the editCoupons endpoint
                        fetch(`${AdminUrl}/api/editCoupons`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(requestData),
                        })
                            .then((response) => {
                                if (response.ok) {
                                    // Handle success, e.g., show a success message
                                    message.success('Coupon updated successfully');
                                } else {
                                    // Handle errors, e.g., show an error message
                                    console.error('Failed to update coupon');
                                    message.error('Failed to update the coupon. Please try again.');
                                }
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                                message.error('Failed to update the coupon. Please try again.');
                            });

                        // Close the modal
                        setIsEditModalVisible(false);
                    }
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    const handleDeleteCoupon = (coupon) => {
        // Assuming `coupon` is an object with a `coupon_id` property

        // Send a DELETE request to the server
        fetch(`${AdminUrl}/api/deleteCoupons/${coupon.coupon_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    // Handle success, e.g., show a success message
                    message.success(`Coupon with ID ${coupon.coupon_id} deleted successfully`);

                    // Optionally, you can also update your local state to remove the deleted coupon.
                    // For example, filter out the deleted coupon from your state and update it.
                    const updatedCoupons = coupons.filter((c) => c.coupon_id !== coupon.coupon_id);
                    setCoupons(updatedCoupons);
                } else {
                    // Handle errors, e.g., show an error message
                    message.error(`Failed to delete coupon with ID ${coupon.coupon_id}`);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                // Handle any network errors
            });
    };


    const handleProductSelection = (selectedValues) => {
        // Convert the selected values to integers and store them in the state
        const selectedIntValues = selectedValues.map((value) => value?.label);
        console.log(selectedIntValues);
        setSelectedProducts(selectedIntValues);
    };


    useEffect(() => {
        const fetchData = async () => {
            if (id !== undefined) {
                try {
                    // Fetch coupons by vendorId
                    const couponsResponse = await fetch(`${AdminUrl}/api/getCouponsByVendorId?vendorId=${id}`);
                    if (!couponsResponse.ok) {
                        setCoupons([]);
                    }
                    const couponsData = await couponsResponse.json();
                    setCoupons(couponsData);

                    // Fetch vendor products by vendorId
                    const productsResponse = await fetch(`${AdminUrl}/api/getVendorProducts?vendorid=${id}&currency=USD`);
                    if (!productsResponse.ok) {
                        throw new Error(`Request for vendor products failed with status: ${productsResponse.status}`);
                    }
                    const productsData = await productsResponse.json();
                    console.log(productsData);
                    // Set the response data in your state for vendor products
                    setVendorProducts(productsData?.AllProducts);
                } catch (err) {
                    setError(err.message);
                }
            }
        };

        fetchData();
    }, [id]);


    // Filter coupons based on the search text
    const filteredCoupons = coupons.filter((coupon) =>
        coupon.coupon_code.toLowerCase().includes(searchText.toLowerCase())
    );


    return (
        <div>
            <div className="p-5 md:p-8 bg-white shadow-lg rounded mb-8 flex flex-col items-center xl:flex-row">
                <div className="mb-4 md:mb-0 md:w-1/4">
                    <h1 className="text-xl font-semibold text-heading">Coupons</h1>
                </div>
                <div className="flex w-full flex-col items-center space-y-4 ms-auto md:flex-row md:space-y-0 xl:w-1/2">
                    <div noValidate role="search" className="relative flex w-full items-center">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <button className="absolute p-2 text-body outline-none start-1 focus:outline-none active:outline-none">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                ></path>
                            </svg>
                        </button>
                        <input
                            type="text"
                            id="search"
                            name="searchText"
                            className="ps-10 pe-4 h-12 flex items-center w-full rounded appearance-none transition duration-300 ease-in-out text-heading text-sm focus:outline-none focus:ring-0 border border-border-base focus:border-accent"
                            placeholder="Search by Coupon Code"
                            aria-label="Search"
                            autoComplete="off"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                    <a
                        className="inline-flex cursor-pointer items-center justify-center flex-shrink-0 font-semibold leading-none rounded outline-none transition duration-300 ease-in-out focus:outline-none focus:shadow bg-orange-400 text-light text-white border border-transparent px-5 py-0 h-12 h-12 w-full md:w-auto md:ms-6 h-12 w-full md:w-auto md:ms-6"
                        onClick={handleAddCoupon} // Handle adding a new coupon
                        hred="#"
                    >
                        <span>+ Add Coupon</span>
                    </a>
                </div>
            </div>
            {error ? (
                <p>Error: {error}</p>
            ) : (
                <Table
                    dataSource={filteredCoupons} // Use filtered list of coupons
                    columns={columns}
                    rowKey="coupon_id"
                    pagination={false}
                />
            )}

            <Modal
                title={modalTitle} // Dynamically set the modal title
                visible={isEditModalVisible}
                onOk={handleSaveEdit}
                onCancel={() => setIsEditModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
                        Cancel
                    </Button>,
                    <Button key="save" type="primary" onClick={handleSaveEdit}>
                        {saveButtonLabel} {/* Dynamically set the button label */}
                    </Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <div>
                        <Form.Item
                            label="Coupon Code"
                            name="coupon_code"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter the Coupon Code',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <div className="flex gap-6">
                            <Form.Item
                                label="Discount Amount"
                                name="discount_amount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter the Discount Amount',
                                    },
                                ]}
                            >
                                <InputNumber min={0} precision={2} />
                            </Form.Item>

                            <Form.Item
                                label="Discount Type"
                                name="discount_type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the Discount Type',
                                    },
                                ]}
                            >
                                <Select>
                                    {discountTypeOptions.map((type) => (
                                        <Select.Option key={type} value={type}>
                                            {type}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </div>
                        <div className='flex justify-between' >
                            <Form.Item
                                label={`Created Date (${moment(editedCouponData?.created_date).format('LL')})`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the Created Date',
                                    },
                                ]}
                            >
                                <DatePicker format="DD MMM YYYY" onChange={handleCreatedDateChange} />
                            </Form.Item>
                            <Form.Item
                                label={`Expiration Date (${moment(editedCouponData?.expiration_date).format('LL')})`}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select the Expiration Date',
                                    },
                                ]}
                            >
                                <DatePicker format="DD MMM YYYY" onChange={handleExpirationDateChange} />
                            </Form.Item>
                        </div>

                        {/* Add Select box for choosing multiple products */}
                        <Form.Item
                            label={
                                <span>
                                    Associated Products&nbsp;
                                    <span style={{ fontSize: '0.8rem', color: 'gray' }}>
                                        (If none selected, coupon applies to all products)
                                    </span>
                                </span>
                            }
                            name="associated_products"
                            rules={[
                                {
                                    type: 'array',
                                },
                            ]}
                        >
                            <Select
                                mode="multiple"
                                placeholder="Select products"
                                value={selectedProducts || []}
                                onChange={handleProductSelection}
                                showSearch
                                optionFilterProp="label"
                                labelInValue
                                optionLabelProp="label"
                                dropdownRender={(menu) => (
                                    <div>
                                        {menu}
                                    </div>
                                )}
                            >
                                {VendorProducts && VendorProducts.map((product) => (
                                    <Select.Option key={product.uniquepid} value={product.ad_title} label={product.ad_title}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${product.images?.[0]}`} alt={product.ad_title} style={{ width: '30px', height: '30px', marginRight: '8px' }} />
                                            {product.ad_title}
                                        </div>
                                    </Select.Option>
                                ))}
                            </Select>

                        </Form.Item>

                    </div>
                </Form>

            </Modal>


        </div>
    );
};

export default Coupons;
