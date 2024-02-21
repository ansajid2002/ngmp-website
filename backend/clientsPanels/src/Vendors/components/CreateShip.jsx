import React, { useEffect } from 'react';
import { Form, Input, DatePicker, Select, Button, Divider, Row, Col, Checkbox } from 'antd';
import { AdminUrl } from '../../Admin/constant';
import axios from 'axios'
// import moment from 'moment';
const { Option } = Select;

const CreateShip = ({ product }) => {
    // console.log(product, 'prod');

    const getshippedProductsDetails = async() => {
        try {
            const response = await fetch(`${AdminUrl}/api/dhl-api/onepiece`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });


            if (response.ok) {
                // Handle successful response
                const data = await response.json();
                console.log(data, 'data');

            }
            else {
                // Handle error response
                console.error(
                  "Error fetching ",
                  response.statusText
                );
              }
            } 
            catch (error) {
              // Handle error
              console.error("Error fetching customer orders by month:", error);
            }

    }

    useEffect(() => {
        console.log("OPEN SHIPPING ");
        getshippedProductsDetails()
        console.log("CLOSE SHIPPING ");

    },[])

    const onFinish = (values) => {
        console.log(values, 'valeus');
        // Convert Ant Design DatePicker value to the specified format
        const inputDate = new Date(values.plannedShippingDateAndTime);

        // Extract the components of the formatted date
        const year = inputDate.getUTCFullYear();
        const month = inputDate.getUTCMonth() + 1; // Month is 0-indexed, so we add 1
        const day = inputDate.getUTCDate();
        const hours = inputDate.getUTCHours();
        const minutes = inputDate.getUTCMinutes();
        const seconds = inputDate.getUTCSeconds();

        // Format the date string
        const formattedDate = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}T${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} GMT+01:00`;

        console.log(formattedDate, 'formattedDate');

        const requestData = {
            ...values,
            plannedShippingDateAndTime: formattedDate,
            orderData: product
        };

        try {
            const apiUrl = `${AdminUrl}/api/dhlCreateShipping`;
            axios.post(apiUrl, requestData)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="container mx-auto mt-8">
            <Form
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                initialValues={{
                    // ... other initial values
                    outputImageProperties: {
                        printerDPI: 300,
                        encodingFormat: 'pdf',
                        imageOptions: [
                            {
                                typeCode: 'invoice',
                                templateName: '',
                                isRequested: true,
                                invoiceType: 'commercial',
                                languageCode: 'eng',
                                languageCountryCode: 'US',
                            },
                            {
                                typeCode: 'waybillDoc',
                                templateName: '',
                                isRequested: true,
                                hideAccountNumber: false,
                                numberOfCopies: 1,
                            },
                            {
                                typeCode: 'label',
                                templateName: '',
                                renderDHLLogo: true,
                                fitLabelsToA4: false,
                            },
                        ],
                        splitTransportAndWaybillDocLabels: true,
                        allDocumentsInOneImage: false,
                        splitDocumentsByPages: false,
                        splitInvoiceAndReceipt: true,
                        receiptAndLabelsInOneImage: false,
                    },
                }}
            >
                {/* Shipment Details */}
                <Divider orientation="left">Shipment Details</Divider>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item label="Shipping Date" name="plannedShippingDateAndTime">
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Is Pickup Requested" name={['pickup', 'isRequested']} valuePropName="checked">
                            <Select>
                                <Option value={true}>Yes</Option>
                                <Option value={false}>No</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>

                {/* Product Details */}
                <Divider orientation="left">Product Details</Divider>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Form.Item label="Product Code" name="productCode">
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Local Product Code" name="localProductCode">
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                {/* ... Add more fields for product details */}

                {/* Output Image Properties */}
                <Divider orientation="left">Output Image Properties</Divider>
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <Form.Item label="Printer DPI" name={['outputImageProperties', 'printerDPI']}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Customer Details - Shipper */}
                <Divider orientation="left">Shipper Details</Divider>
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <Form.Item label="Shipper Postal Code" name={['customerDetails', 'shipperDetails', 'postalAddress', 'postalCode']}>
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper City Name" name={['customerDetails', 'shipperDetails', 'postalAddress', 'cityName']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper Country Code" name={['customerDetails', 'shipperDetails', 'postalAddress', 'countryCode']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper Address Line 1" name={['customerDetails', 'shipperDetails', 'postalAddress', 'addressLine1']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper Address Line 2" name={['customerDetails', 'shipperDetails', 'postalAddress', 'addressLine2']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper Address Line 3" name={['customerDetails', 'shipperDetails', 'postalAddress', 'addressLine3']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper Country Name" name={['customerDetails', 'shipperDetails', 'postalAddress', 'countryName']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Shipper Email" name={['customerDetails', 'shipperDetails', 'contactInformation', 'email']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Shipper Phone" name={['customerDetails', 'shipperDetails', 'contactInformation', 'phone']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Shipper Mobile Phone" name={['customerDetails', 'shipperDetails', 'contactInformation', 'mobilePhone']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Shipper Company Name" name={['customerDetails', 'shipperDetails', 'contactInformation', 'companyName']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Shipper Full Name" name={['customerDetails', 'shipperDetails', 'contactInformation', 'fullName']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Shipper Registration typeCode" name={['customerDetails', 'shipperDetails', 'registrationNumbers', 'typeCode']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper Registration Numbers" name={['customerDetails', 'shipperDetails', 'registrationNumbers', 'number']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Shipper issuer Country Code" name={['customerDetails', 'shipperDetails', 'registrationNumbers', 'issuerCountryCode']}>
                            <Input />
                        </Form.Item>
                    </Col>


                </Row>
                {/* ... Add more fields for shipper details */}

                {/* Customer Details - Receiver */}
                <Divider orientation="left">Receiver Details</Divider>
                <Row gutter={[16, 16]}>
                    <Col span={16}>
                        <Form.Item label="Receiver Postal Code" name={['customerDetails', 'receiverDetails', 'postalAddress', 'postalCode']}>
                            <Input />
                        </Form.Item>

                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver City Name" name={['customerDetails', 'receiverDetails', 'postalAddress', 'cityName']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver Country Code" name={['customerDetails', 'receiverDetails', 'postalAddress', 'countryCode']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver Address Line 1" name={['customerDetails', 'receiverDetails', 'postalAddress', 'addressLine1']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver Address Line 2" name={['customerDetails', 'receiverDetails', 'postalAddress', 'addressLine2']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver Address Line 3" name={['customerDetails', 'receiverDetails', 'postalAddress', 'addressLine3']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver Country Name" name={['customerDetails', 'receiverDetails', 'postalAddress', 'countryName']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Receiver Email" name={['customerDetails', 'receiverDetails', 'contactInformation', 'email']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Receiver Phone" name={['customerDetails', 'receiverDetails', 'contactInformation', 'phone']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Receiver Mobile Phone" name={['customerDetails', 'receiverDetails', 'contactInformation', 'mobilePhone']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Receiver Company Name" name={['customerDetails', 'receiverDetails', 'contactInformation', 'companyName']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Receiver Full Name" name={['customerDetails', 'receiverDetails', 'contactInformation', 'fullName']}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={16}>
                        <Form.Item label="Receiver Registration typeCode" name={['customerDetails', 'receiverDetails', 'registrationNumbers', 'typeCode']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver Registration Numbers" name={['customerDetails', 'receiverDetails', 'registrationNumbers', 'number']}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        <Form.Item label="Receiver issuer Country Code" name={['customerDetails', 'receiverDetails', 'registrationNumbers', 'issuerCountryCode']}>
                            <Input />
                        </Form.Item>
                    </Col>


                </Row>
                {/* ... Add more fields for receiver details */}

                {/* Content */}
                <Divider orientation="left">Content</Divider>
                <Form.Item label="Package Type Code" name={['content', 'packages', 0, 'typeCode']} initialValue="2BP">
                    <Input />
                </Form.Item>

                <Form.Item label="Package Weight" name={['content', 'packages', 0, 'weight']} initialValue={0.296}>
                    <Input />
                </Form.Item>

                <Form.Item label="Package Length" name={['content', 'packages', 0, 'dimensions', 'length']} initialValue={1}>
                    <Input />
                </Form.Item>

                <Form.Item label="Package Width" name={['content', 'packages', 0, 'dimensions', 'width']} initialValue={1}>
                    <Input />
                </Form.Item>

                <Form.Item label="Package Height" name={['content', 'packages', 0, 'dimensions', 'height']} initialValue={1}>
                    <Input />
                </Form.Item>

                <Form.Item label="Package Description" name={['content', 'packages', 0, 'description']} initialValue="Shipment 1">
                    <Input />
                </Form.Item>

                <Form.Item label="label Description" name={['content', 'packages', 0, 'labelDescription']} initialValue="">
                    <Input />
                </Form.Item>

                <Form.Item label="Invoice Instructions" name={['content', 'exportDeclaration', 'invoice', 'instructions', 0]} initialValue="">
                    <Input />
                </Form.Item>

                <Divider orientation="left">Shipment Notifications</Divider>
                <Form.Item label="Type" name={['shipmentNotification', 0, 'typeCode']} initialValue="email" >
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Reciver Id" name={['shipmentNotification', 0, 'receiverId']} initialValue="" >
                    <Input />
                </Form.Item>
                <Form.Item label="be spoke Message" name={['shipmentNotification', 0, 'bespokeMessage']} initialValue="" >
                    <Input />
                </Form.Item>

                <Divider />
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="default" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CreateShip;
