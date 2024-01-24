import React, { useEffect, useState } from 'react'
import { Button, message, theme, Form, Input, Steps, Select, InputNumber } from 'antd';
import { AdminUrl } from './Admin/constant';
import Swal from 'sweetalert2';
import { countryCodes } from './Vendors/constants/ProductsForm/Specifications';

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
        console.log(value,"value");
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

    const Pinfo = () => {
        const [, forceUpdate] = useState({});
        const { Option } = Select;


        // To disable submit button at the beginning.
        useEffect(() => {
            forceUpdate({});
        }, []);

        const onFinish = async (values) => {
            const { confirmPassword, ...newRequest } = values;
            setLoading(true)
            // Adding
            try {
                // Make API call to send form data to the backend
                const response = await fetch(`${AdminUrl}/api/addVendorstoDb`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newRequest),
                });

                if (response.ok) {
                    // Handle successful response
                    Swal.fire({
                        icon: "success",
                        title: "Account Created Successfully",
                        text: 'Thank you for creating an account! Please check your email for login credentials. We encourage you to fill in further details to enhance your profile.',
                        showConfirmButton: false,
                        timer: 3000, // Adjust the timer as needed
                    });
                    const vendordata = await response.json();
                    setSelectedKey(vendordata?.lastInsertedId);
                    setCurrentStep(currentStep + 1)

                } else {
                    // Handle error response
                    console.error("Error sending form data:", response.statusText);
                    Swal.fire({
                        icon: "error",
                        title: "Email id already Exist",
                        showConfirmButton: false,
                        timer: 1500,
                    });

                }
                setLoading(false)

            } catch (error) {
                // Handle error
                console.error("Error sending form data:", error);
            }
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
            console.log("Finish:", values);
            console.log("Selectkey:", selectedKey);
            setLoading(true)

            if (selectedKey != null) {
                try {
                    // Make API call to send form data to the backend
                    const response = await fetch(`${AdminUrl}/api/updateVendorDb`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ selectedKey, values }),
                    });

                    if (response.ok) {
                        // Handle successful response
                        Swal.fire({
                            icon: "success",
                            title: "Verification Details updated successfully",
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        setCurrentStep(currentStep + 1);
                    } else {
                        // Handle error response
                        console.error("Error sending form data:", response.statusText);
                    }
                    setLoading(false)

                } catch (error) {
                    // Handle error
                    console.error("Error sending form data:", error);
                }
            }
        };
        return (
            <>
                {selectedKey == null ? (
                    <section className="bg-blue-500 py-8">
                        <div className="container mx-auto px-4">
                            <div className="max-w-md mx-auto text-center">
                                <h2 className="text-white text-2xl font-semibold mb-4">
                                    Create an Account to Get Started
                                </h2>
                                <p className="text-white text-lg">
                                    Welcome to our platform! To access all the features and
                                    services, please create an account by providing your details.
                                    It only takes a few moments, and you'll be ready to explore
                                    the possibilities.
                                </p>
                                <button onClick={() => setCurrentStep(0)} className="mt-6 bg-white text-blue-500 hover:bg-blue-100 text-lg py-2 px-6 font-semibold rounded-full">
                                    Sign Up Now
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
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
                )}
            </>
        );
    };

    const CompanyDetailsForm = () => {

        const onFinish = async (values) => {
            console.log(values,"company sajid values");
            setLoading(true)

            try {
                // Send the form data to the backend
                const response = await fetch(`${AdminUrl}/api/vendorCompanyDetails`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ selectedKey, values }),
                });

                if (!response.ok) {
                    throw new Error("Failed to submit the form");
                }

                // Parse the response data
                const data = await response.json();
                if (data?.status == 200) {
                    Swal.fire({
                        title: "Vendor details updated successfully",
                        icon: "success",
                    });
                    setCurrentStep(currentStep + 1)
                }
                // Handle the response from the backend
                console.log("Response from backend:", data);
                // Perform any additional actions based on the response

            } catch (error) {
                console.error("Error:", error);
                // Handle any errors that occur during the request
            } finally {
                setLoading(false)

            }
        };

        return (
            <div className="mt-10">
                {selectedKey == null ? (
                    <section className="bg-blue-500 py-8">
                        <div className="container mx-auto px-4">
                            <div className="max-w-md mx-auto text-center">
                                <h2 className="text-white text-2xl font-semibold mb-4">
                                    Create an Account to Get Started
                                </h2>
                                <p className="text-white text-lg">
                                    Welcome to our platform! To access all the features and
                                    services, please create an account by providing your details.
                                    It only takes a few moments, and you'll be ready to explore
                                    the possibilities.
                                </p>
                                <button
                                    className="mt-6 bg-white text-blue-500 hover:bg-blue-100 text-lg py-2 px-6 font-semibold rounded-full"
                                    onClick={() => setCurrentStep(0)}
                                >
                                    Sign Up Now
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
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
                            rules={[{ required: true, message: "Please enter company name" }]}
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
                            ]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Business Website"
                            name="business_website"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter business website",
                                },
                                {
                                    pattern: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._?%&=]*)?$/,
                                    message: "Please enter a valid website URL",
                                },
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
                            ]}
                        >
                            <Input.TextArea className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        {/* Intermediate Details */}

                        <Form.Item
                            label="Country"
                            name="company_country"

                            rules={[{ required: true, message: "Please enter country" }]}
                        >
                            <Input className="border border-gray-300 rounded-md"   onBlur={(e) => {
                                const value = e.target.value
                                setShowDistrictSelect(value.toLowerCase())
                            }} />
                        </Form.Item>
                        {showDistrictSelect === "somalia" && (
                            <Form.Item
                                label="Mogadishu District"
                                name="company_district"
                                rules={[{ required: true, message: "Please enter district" }]}
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
                            rules={[{ required: true, message: "Please enter state" }]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Company City"
                            name="company_city"
                            rules={[{ required: true, message: "Please enter company city" }]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Zip Code"
                            name="company_zip_code"
                            rules={[{ required: true, message: "Please enter zip code" }]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Shipping Address"
                            name="shipping_address"
                            rules={[
                                { required: true, message: "Please enter shipping address" },
                            ]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Business Type"
                            name="business_type"
                            rules={[
                                { required: true, message: "Please enter business type" },
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
                            ]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label="Support Contact 2"
                            name="support_contact_2"
                            rules={[
                                { required: true, message: "Please enter support contact 2" },
                            ]}
                        >
                            <Input className="border border-gray-300 rounded-md" />
                        </Form.Item>

                    </Form>
                )}
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

            if (selectedKey != null) {
                try {
                    // Make API call to send form data to the backend
                    const response = await fetch(`${AdminUrl}/api/updateVendorDb`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ selectedKey, values }),
                    });

                    if (response.ok) {
                        // Handle successful response
                        Swal.fire({
                            icon: "success",
                            title: "Account Update Successfully",
                            text: "Account is currently under verification. One of our vendor management managers will be in touch with you within a few hours to coordinate the next steps.",
                            showConfirmButton: true,
                        });

                        onModal(false)
                    } else {
                        // Handle error response
                        console.error("Error sending form data:", response.statusText);
                    }
                } catch (error) {
                    // Handle error
                    console.error("Error sending form data:", error);
                } finally {
                    setLoading(false)
                }
            }
        };



        return (
            <>
                {selectedKey == null ? (
                    <section className="bg-blue-500 py-8">
                        <div className="container mx-auto px-4">
                            <div className="max-w-md mx-auto text-center">
                                <h2 className="text-white text-2xl font-semibold mb-4">
                                    Create an Account to Get Started
                                </h2>
                                <p className="text-white text-lg">
                                    Welcome to our platform! To access all the features and
                                    services, please create an account by providing your details.
                                    It only takes a few moments, and you'll be ready to explore
                                    the possibilities.
                                </p>
                                <button
                                    className="mt-6 bg-white text-blue-500 hover:bg-blue-100 text-lg py-2 px-6 font-semibold rounded-full"
                                    onClick={() => prev()}
                                >
                                    Sign Up Now
                                </button>
                            </div>
                        </div>
                    </section>
                ) : (
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
                                ]}
                            >
                                <Input placeholder="Bank Account Name" />
                            </Form.Item>

                            <Form.Item
                                label="Bank Branch"
                                name="bank_branch"
                                rules={[
                                    { required: true, message: "Please enter the bank branch" },
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
                                ]}
                            >
                                <Input placeholder="Bank Swift Code" />
                            </Form.Item>


                        </Form>
                    </div>
                )}
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
            <Steps current={currentStep} items={items} />
            <div style={contentStyle}>{steps[currentStep].content}</div>
            <div
                style={{
                    marginTop: 24,
                }}
            >
                {currentStep < steps.length && (
                    <Button type="default" loading={loading} onClick={() => handleNext()}>
                        {currentStep === steps.length - 1 ? 'Done' : 'Next'}
                    </Button>
                )}

                {currentStep > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => handlePrev()}
                    >
                        Previous
                    </Button>
                )}
            </div>






        </div>
    )
}

export default SellerForm