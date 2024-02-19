import React, { useEffect, useState } from 'react'
import { Button, message, theme, Form, Input, Steps, Select, InputNumber } from 'antd';
import { AdminUrl } from './Admin/constant';
import Swal from 'sweetalert2';
import { countryCodes } from './Vendors/constants/ProductsForm/Specifications';
import { FaAlignLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const SellerForm = ({ onModal }) => {
    const [form] = Form.useForm();
    const { token } = theme.useToken();
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedKey, setSelectedKey] = useState(null);

    const [showDistrictSelect, setShowDistrictSelect] = useState(false);
    const cities = [
        "WARTA NABADA",
        "KAARAN",
        "WADAJIR",
        "YAAQSHID",
        "ABDIAZIZ",
        "KAXDA",
        "HELIWAA",
        "DAYNILE",
        "SHIBIS",
        "HOLWADAG",
        "BOONDHERE",
        "XAMAR WEYNE",
        "XAMAR JAJAB",
        "WAABERI",
        "DHARKENLEY",
        "SHANGANI",
        "AFGOOYE",
        "DARUSALAM",
        "GUBUDLEY",
        "HODAN",
    ];
    const handleCountryChange = (value) => {
        // Update state based on the selected country value
        console.log(value, "value");
        setShowDistrictSelect(value);
    };

    const handleNext = async () => {
        try {
            await form.validateFields();

            form.submit();
        } catch (error) {
            // Handle validation errors if any
            console.error("Validation Error:", error);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem('formData');
        return savedFormData ? JSON.parse(savedFormData) : {};
    });

    useEffect(() => {
        // Set form fields when component mounts
        form.setFieldsValue(formData);
    }, []);

    console.log(formData);
    const Pinfo = () => {
        const [, forceUpdate] = useState({});
        const { Option } = Select;


        // To disable submit button at the beginning.
        useEffect(() => {
            forceUpdate({});
        }, []);

        const onFinish = async (values) => {

            // Save updated form data to state
            form.validateFields(values).then(value => {
                const { confirmPassword, ...newRequest } = value;

                // Merge new form data with existing form data
                const updatedFormData = { ...formData, ...newRequest };

                localStorage.setItem('formData', JSON.stringify(updatedFormData));

                setFormData(updatedFormData);

                // Proceed to the next step
                setCurrentStep(currentStep + 1);

            })
            // Rest of your code...
        };


        const prefixSelector = (
            <Form.Item name="country_code" noStyle >
                <Select
                    style={{
                        width: 70,
                    }}
                >
                    {countryCodes.map((country) => (
                        <Option key={country.code} value={country.code}>
                            {country.code}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
        );

        return (
            <>
                <div className="mt-10 p-2">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        layout="horizontal" // Set the layout to "horizontal"
                    >
                        <div className='grid grid-cols-2 gap-4'>
                            <Form.Item
                                name="vendor_username"
                                label="Username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter your username!',
                                    },
                                    {
                                        min: 3,
                                        message: 'Username must be at least 3 characters!',
                                    },
                                    {
                                        max: 20,
                                        message: 'Username cannot exceed 20 characters!',
                                    },
                                    {
                                        pattern: /^[a-zA-Z0-9_]+$/,
                                        message: 'Username can only contain letters, numbers, and underscores!',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.trim() !== "") {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Username cannot be empty"));
                                        },
                                    }),
                                ]}
                            >
                                <Input
                                    placeholder="Username"
                                />
                            </Form.Item>
                            <Form.Item
                                name="mobile_number"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                            >
                                <Input
                                    addonBefore={prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                />
                            </Form.Item>

                            <Form.Item
                                name="vendorname"
                                label="Vendor Name"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your Full Name",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.trim() !== "") {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Name cannot be empty"));
                                        },
                                    }),
                                ]}
                            >
                                <Input type='text' placeholder="Ex. Shadab Khan" />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your email address!",
                                    },
                                    {
                                        type: "email",
                                        message: "Please enter a valid email address!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.trim() !== "") {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Email cannot be empty"));
                                        },
                                    }),
                                ]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please enter your password!",
                                    },
                                    {
                                        min: 6,
                                        message: "Password must be at least 6 characters long",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || value.trim() !== "") {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error("Password cannot be empty"));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Password" />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    {
                                        required: true,
                                        message: "Please confirm your password!",
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('Both passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password placeholder="Confirm Password" />
                            </Form.Item>

                        </div>


                    </Form>
                </div>
            </>
        );
    };

    const BrandsDetails = () => {
        const [error, updateError] = useState();
        const [, forceUpdate] = useState({});
        useEffect(() => {
            forceUpdate({});
        }, []);

        const onFinish = async (values) => {
            form.validateFields(values).then(value => {
                // Merge new form data with existing form data
                const updatedFormData = { ...formData, ...value };

                localStorage.setItem('formData', JSON.stringify(updatedFormData));

                setFormData(updatedFormData);

                // Proceed to the next step
                setCurrentStep(currentStep + 1);

            })
        };

        return (
            <>

                <div className="mt-10 p-2">
                    <Form
                        form={form}
                        onFinish={onFinish}
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                    >
                        <Form.Item
                            name="brand_name"
                            label="Brand Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input the brand name!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Brand Name cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Brand Name" />
                        </Form.Item>

                        <Form.Item
                            name="business_model"
                            label="Business Model"
                            rules={[
                                {
                                    required: true,
                                    message: "Please select the business model!",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Business Model cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Select placeholder="Select Business Model">
                                <Select.Option value="manufacturer">
                                    Manufacturer
                                </Select.Option>
                                <Select.Option value="designer">Designer</Select.Option>
                                <Select.Option value="wholesaler">Wholesaler</Select.Option>
                                <Select.Option value="trader">Trader</Select.Option>
                            </Select>
                        </Form.Item>


                    </Form>
                    {/* <hr /> */}
                    {/* <div className='grid justify-center w-full items-center' style={{ gridTemplateColumns: '50% 50%' }}>
                            <div className="mt-4">
                                <div className='mb-2'>
                                    <label className="mr-4 font-semibold text-gray-600 text-right">Upload Few Products Images</label>
                                </div>
                                <div>
                                    <button className="bg-gray-300 text-black px-3 py-2 rounded flex items-center" onClick={handleImageUpload(selectedKey)}>
                                        <FiUpload className="mr-2" />
                                        <span className='text-sm'>Upload</span>
                                    </button>
                                </div>
                            </div>
    
                        </div> */}

                    {error && <p>{error}</p>}
                </div>

            </>
        );
    };

    const CompanyDetailsForm = () => {

        const onFinish = async (values) => {
            form.validateFields(values).then(value => {

                // Merge new form data with existing form data
                const updatedFormData = { ...formData, ...value };

                localStorage.setItem('formData', JSON.stringify(updatedFormData));

                setFormData(updatedFormData);

                // Proceed to the next step
                setCurrentStep(currentStep + 1);

            })
        };

        return (
            <div className="mt-10">

                <Form
                    form={form}
                    name="company_details"
                    onFinish={onFinish}
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                >
                    {/* Basic Details */}
                    <Form.Item
                        label="Company Name"
                        name="company_name"
                        rules={[
                            { required: true, message: "Please enter company name" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("company name cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    {/* Add more basic details here */}
                    <Form.Item
                        label="Business Phone"
                        name="business_phone"
                        rules={[
                            { required: true, message: "Please enter business phone" },

                        ]}
                    >
                        <InputNumber className="border w-full border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Business Email"
                        name="business_email"
                        rules={[
                            { required: true, message: "Please enter business email" },
                            {
                                type: "email",
                                message: "Please enter a valid email address",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Email Address cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Business Website"
                        name="business_website"
                        rules={[
                           
                            {
                                pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._?%&=]*)?$/,
                                message: "Please enter a valid website URL",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Business Website cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>


                    <Form.Item
                        label="Business Description"
                        name="business_description"
                        rules={[
                            {
                                required: true,
                                message: "Please enter business description",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Business Description cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input.TextArea className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    {/* Intermediate Details */}

                    <Form.Item
                        label="Country"
                        name="company_country"

                        rules={[{ required: true, message: "Please enter country" }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || value.trim() !== "") {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Country cannot be empty"));
                            },
                        }),]}
                    >
                        <Input className="border border-gray-300 rounded-md" onBlur={(e) => {
                            const value = e.target.value
                            setShowDistrictSelect(value.toLowerCase())
                        }} />
                    </Form.Item>
                    {showDistrictSelect === "somalia" && (
                        <Form.Item
                            label="Mogadishu District"
                            name="company_district"
                            rules={[{ required: true, message: "Please enter district" }, ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("District cannot be empty"));
                                },
                            }),]}
                        >
                            <Select placeholder="Select Ship From Location" showSearch>
                                {cities.map((city) => (
                                    <Select.Option key={city} value={city}>
                                        {city}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>)}

                    <Form.Item
                        label="State"
                        name="company_state"
                        rules={[{ required: true, message: "Please enter state" }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || value.trim() !== "") {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("State cannot be empty"));
                            },
                        }),]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Company City"
                        name="company_city"
                        rules={[{ required: true, message: "Please enter company city" }, ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || value.trim() !== "") {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("City cannot be empty"));
                            },
                        }),]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Zip Code"
                        name="company_zip_code"

                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Shipping Address"
                        name="shipping_address"
                        rules={[
                            { required: true, message: "Please enter shipping address" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Shipping Address cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Business Type"
                        name="business_type"
                        rules={[
                            { required: true, message: "Please enter business type" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Business Type cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    {/* Add more intermediate details here */}

                    {/* Hard Details */}
                    <Form.Item
                        label="Tax ID Number"
                        name="tax_id_number"
                    // rules={[{ required: true, message: 'Please enter tax ID registration number' }]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Support Contact 1"
                        name="support_contact_1"
                        rules={[
                            { required: true, message: "Please enter support contact 1" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Support Number cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                    <Form.Item
                        label="Support Contact 2"
                        name="support_contact_2"
                        rules={[
                            { required: true, message: "Please enter support contact 2" },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || value.trim() !== "") {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error("Support Number cannot be empty"));
                                },
                            }),
                        ]}
                    >
                        <Input className="border border-gray-300 rounded-md" />
                    </Form.Item>

                </Form>

            </div>
        );
    };

    const BankDetails = () => {
        const [, forceUpdate] = useState({});
        const { Option } = Select;

        // To disable submit button at the beginning.
        useEffect(() => {
            forceUpdate({});
        }, []);

        const onFinish = async (values) => {
            setLoading(true)
            try {
                await form.validateFields();

                // Check if any field is empty or contains only whitespace
                for (const key in values) {
                    if (!values[key] || values[key].trim() === "") {
                        throw new Error(`Please fill in ${key}`);
                    }
                }

                // If all fields pass validation, proceed
                const updatedFormData = { ...formData, ...values };
                setFormData(updatedFormData);

                // Send data to backend
                const response = await fetch(`${AdminUrl}/api/addVendorstoDb`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedFormData),
                });

                if (response.ok) {
                    // Handle successful response
                    const responseData = await response.json();
                    console.log("Response from backend:", responseData);

                    localStorage.removeItem('formData');
                    // Show success message with redirect button
                    Swal.fire({
                        icon: "success",
                        title: "Account Created Successfully",
                        text: "Thank you for creating an account! An admin staff member will connect with you within 48 hours for further tasks. You can access your dashboard now.",
                        showConfirmButton: true,
                        confirmButtonText: "Go to Login Page",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Redirect to login page
                            window.location.href = "/Vendors/Login"; // Replace "/login" with the actual login page URL
                        }
                    });
                } else {
                    // Handle error response
                    const errorResponse = await response.json();
                    console.error("Error adding vendor to DB:", errorResponse);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: errorResponse.error || "An error occurred while adding the vendor",
                    });
                    // Further error handling if necessary
                }

            } catch (errorInfo) {
                console.error('Validation failed:', errorInfo);
                // Handle validation errors, if necessary
            } finally {
                setLoading(false)
            }
        };


        return (
            <>
                <div className="mt-10 p-2">
                    <Form
                        name="bankAccountForm"
                        form={form}
                        onFinish={onFinish}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                    >
                        <Form.Item
                            label="Bank Name"
                            name="bank_name"
                            rules={[
                                { required: true, message: "Please enter the bank name" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Bank name cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Bank Name" />
                        </Form.Item>

                        <Form.Item
                            label="Bank Account Number"
                            name="bank_account_number"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the bank account number",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Bank Account Number cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Bank Account Number" />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Bank Account Number"
                            name="confirm_bank_account_number"
                            rules={[
                                {
                                    required: true,
                                    message: "Please confirm the bank account number",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (
                                            !value ||
                                            getFieldValue("bank_account_number") === value
                                        ) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(
                                            new Error("The two bank account numbers do not match")
                                        );
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Confirm Bank Account Number" />
                        </Form.Item>

                        <Form.Item
                            label="Bank Routing Number"
                            name="bank_routing_number"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the bank routing number",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Bank routing number cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Bank Routing Number" />
                        </Form.Item>

                        <Form.Item
                            label="Bank Account Name"
                            name="bank_account_name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the bank account name",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Bank Account name cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Bank Account Name" />
                        </Form.Item>

                        <Form.Item
                            label="Bank Branch"
                            name="bank_branch"
                            rules={[
                                { required: true, message: "Please enter the bank branch" },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Bank Branch cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Bank Branch" />
                        </Form.Item>

                        <Form.Item
                            label="Bank Swift Code"
                            name="bank_swift_code"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the bank Swift code",
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || value.trim() !== "") {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error("Bank Swift Code cannot be empty"));
                                    },
                                }),
                            ]}
                        >
                            <Input placeholder="Bank Swift Code" />
                        </Form.Item>


                    </Form>
                </div>
            </>
        );
    };

    const steps = [
        {
            title: 'Verification',
            content: <Pinfo />,
        },
        {
            title: 'Brand Details',
            content: <BrandsDetails />,
        },
        {
            title: 'Company Details',
            content: <CompanyDetailsForm />,
        },
        {
            title: 'Bank Details',
            content: <BankDetails />,
        },
    ];

    const items = steps.map((item) => ({
        key: item.title,
        title: item.title,
    }));
    const contentStyle = {
        lineHeight: '260px',
        textAlign: 'center',
        color: token.colorTextTertiary,
        marginTop: 16,
    };

    return (
        <div className='mt-10'>
            <Steps onChange={(e) => setCurrentStep(e)} current={currentStep} items={items} />
            <div style={contentStyle}>{steps[currentStep].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
                className='flex justify-center gap-4'
            >
                {currentStep > 0 && (
                    <Button

                        className='border border-slate-900 gap-2 h-10 text-lg flex hover:gap-4 justify-center items-center font-semibold'
                        onClick={() => handlePrev()}

                    >
                        <FaChevronLeft /> Previous
                    </Button>
                )}

                {currentStep < steps.length && (
                    <Button type=""
                        className={`border border-slate-900 gap-2 h-10 text-lg flex justify-center items-center font-semibold ${currentStep === steps.length - 1 ? 'bg-green-500 text-white border-green-700 hover:bg-green-800' : "hover:border-gray-800 hover:text-black "} hover:gap-4 overflow-hidden max-w-full`}

                        loading={loading} onClick={() => handleNext()}>
                        {currentStep === steps.length - 1 ? 'Submit Registration' : 'Next'} <FaChevronRight />
                    </Button>
                )}
            </div>






        </div>
    )
}

export default SellerForm
