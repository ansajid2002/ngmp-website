import React, { useState } from 'react';
import AuthCheck from './components/AuthCheck';
import { Card, Metric, Text, Icon, Flex, Grid } from "@tremor/react";
import { Form, Input, Button, Modal, Divider, Tabs } from 'antd';
import { FiAlertCircle, FiCheckCircle, FiEdit, FiUploadCloud } from 'react-icons/fi';
import { AdminUrl } from '../Admin/constant';
import axios from 'axios'
import { UserOutlined, MailOutlined } from "@ant-design/icons"
import { FaHouseUser, FaPhoneAlt } from 'react-icons/fa';
import { RiBankLine } from 'react-icons/ri';
import TabPane from 'antd/es/tabs/TabPane';
import { BrandLogoUpdate, TrademarkUploader, VendorProductImageUploader, VendorProfileChange } from '../Admin/components';
import IncompleteProfile from './components/IncompleteProfile';
const Profile = ({ vendorDatastate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUploadModal, setimageUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const [form] = Form.useForm();
  const id = vendorDatastate?.[0].id


  const showModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue(vendorDatastate[0]);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form values:", values);

      // Make a POST request to the backend to update the vendor data
      const response = await axios.post(`${AdminUrl}/api/updateVendor`, {
        id: vendorDatastate?.[0].id,
        ...values, // Send the updated form data
      });

      // Check if the update was successful
      if (response.status === 200) {
        // Update vendorDatastate[0] with the updated data received from the backend
        vendorDatastate[0] = response.data; // Assuming the backend responds with the updated data
        console.log('Vendor data updated:', vendorDatastate[0]);
      }

      setIsModalOpen(false);
    } catch (errorInfo) {
      console.log('Validation Failed:', errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderAttributeSection = (title, data) => (
    <div className="mb-6">
      <div className="flex justify-between">
        <h3 className="text-xl font-semibold leading-7 text-gray-900">{title}</h3>
      </div>
      <Divider />
      <div className="mb-6">
        <dl className="divide-y divide-gray-100">
          {Object.entries(data).map(([key, value]) => (
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0" key={key}>
              <dt className="text-sm font-medium leading-6 text-gray-900">{key}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {key === 'Mobile Number' && vendorDatastate?.[0].mobile_verification_status ? (
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 flex justify-center items-center space-x-3"><FiCheckCircle /> {value}</span>
                  </div>
                ) : key === 'Mobile Number' && !vendorDatastate?.[0].mobile_verification_status ? (
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2 flex justify-center items-center space-x-3"><FiAlertCircle /> {value}</span>
                  </div>
                ) : key === 'Email' && vendorDatastate?.[0].email_verification_status ? (
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2 flex justify-center items-center space-x-3"><FiCheckCircle /> {value}</span>
                  </div>
                ) : key === 'Email' && !vendorDatastate?.[0].email_verification_status ? (
                  <div className="flex items-center">
                    <span className="text-red-500 mr-2 flex justify-center items-center space-x-3"><FiAlertCircle /> {value}</span>
                  </div>
                ) : value !== null ? value : 'N/A'}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  function handleImageUpload(key) {
    console.log(key);
    setimageUploadModal(true);

  }

  const handleCancelImageUploadModal = () => {
    setimageUploadModal(false)
  }


  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  return (
    vendorDatastate && vendorDatastate.length > 0 ?
      !vendorDatastate?.[0].email_verification_status || vendorDatastate?.[0].status === 1 ?
        <AuthCheck vendorDatastate={vendorDatastate} /> :
        <div >
          <div className="p-2 mt-5">
            <div className='mb-10'>
              <IncompleteProfile vendorDatastate={vendorDatastate} />

            </div>
            {/* Full name section */}
            <div className="mb-6">
              <div className="flex justify-between">
                <h3 className="text-xl font-semibold leading-7 text-gray-900">Applicant Information</h3>
                <Button className="bg-gray-500 p-2 font-semibold tracking-wider" type="primary" onClick={showModal}>
                  <FiEdit className=' ' />
                </Button>
              </div>
              <div className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</div>
            </div>

            <Divider />

            {renderAttributeSection('Personal Information', {
              'Full name': vendorDatastate?.[0].vendorname,
              'Email': vendorDatastate?.[0].email,
              'Mobile Number': `${vendorDatastate?.[0].country_code} ${vendorDatastate?.[0].mobile_number}`,
              'Brand Name': vendorDatastate?.[0].brand_name,
            })}

            {renderAttributeSection('Bank Information', {
              'Bank Name': vendorDatastate?.[0].bank_name,
              'Bank Account Name': vendorDatastate?.[0].bank_account_name,
              'Bank Account Number': vendorDatastate?.[0].bank_account_number,
              'Bank Branch': vendorDatastate?.[0].bank_branch,
              'Bank Routing Number': vendorDatastate?.[0].bank_routing_number,
              'Bank Swift Code': vendorDatastate?.[0].bank_swift_code,
            })}

            {renderAttributeSection('Business Information', {
              'Business Model': vendorDatastate?.[0].business_model,
              'Business Type': vendorDatastate?.[0].business_type,
              'Business Website': vendorDatastate?.[0].business_website,
              'Business Email': vendorDatastate?.[0].business_email,
              'Business Phone': vendorDatastate?.[0].business_phone,
              'Business Description': vendorDatastate?.[0].business_description,
            })}

            {renderAttributeSection('Company Information', {
              'Company Name': vendorDatastate?.[0].company_name,
              'Company Street Address': vendorDatastate?.[0].shipping_address,
              'Company Town / City': vendorDatastate?.[0].company_city,
              'Company State / County': vendorDatastate?.[0].company_state,
              'Company Postcode / ZIP': vendorDatastate?.[0].company_zip_code,
              'Company Country': vendorDatastate?.[0].company_country,
            })}

            {renderAttributeSection('Social Links', {
              'Facebook URL': vendorDatastate?.[0].facebook_url,
              'Instagram URL': vendorDatastate?.[0].instagram_url,
              'LinkedIn URL': vendorDatastate?.[0].linkedin_url,
              'Twitter URL': vendorDatastate?.[0].twitter_url,
            })}

            {renderAttributeSection('Support Contacts', {
              'Support Contact 1': vendorDatastate?.[0].support_contact_1,
              'Support Contact 2': vendorDatastate?.[0].support_contact_2,
            })}

            {renderAttributeSection('Tax Information', {
              'Tax ID Number': vendorDatastate?.[0].tax_id_number,
            })}

            <div id="uploadmedia">
              {/* <FiUploadCloud
              onClick={() => handleImageUpload(id)}
              className="text-white  w-8 h-8 p-2 rounded-full hover:text-white bg-green-500 border-none hover:bg-green-600 "
            /> */}
              <h1 className="text-xl font-semibold leading-7 text-gray-900">Upload Medias</h1>
              <div className='flex justify-center h-48 items-center bg-slate-800  rounded-lg shadow-lg mt-5 cursor-pointer' onClick={() => handleImageUpload(id)}>
                <p className='text-white tracking-wide'>Upload Your Sample Products, Trademark Certificate, Profile Pic & Brand Logo</p>
              </div>
            </div>
          </div>


          <Modal title="Edit Profile" visible={isModalOpen}
            onOk={handleOk} onCancel={handleCancel} width={800}
            okButtonProps={{ style: { backgroundColor: '#3498db', color: 'white', borderColor: 'transparent' } }}
          >
            <Form form={form}>
              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Personal Information</h2>
              {/* Vendor Name */}
              <Form.Item label="Vendor Name" name="vendorname">
                <Input />
              </Form.Item>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
              <Form.Item label="Country Code" name="country_code">
                <Input />
              </Form.Item>
              <Form.Item label="Mobile Number" name="mobile_number">
                <Input />
              </Form.Item>
              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Bank Information</h2>
              {/* Bank Information */}
              <Form.Item label="Bank Name" name="bank_name">
                <Input />
              </Form.Item>
              <Form.Item label="Bank Account Name" name="bank_account_name">
                <Input />
              </Form.Item>
              <Form.Item label="Bank Account Number" name="bank_account_number">
                <Input />
              </Form.Item>
              <Form.Item label="Bank Branch" name="bank_branch">
                <Input />
              </Form.Item>
              <Form.Item label="Bank Routing Number" name="bank_routing_number">
                <Input />
              </Form.Item>
              <Form.Item label="Bank Swift Code" name="bank_swift_code">
                <Input />
              </Form.Item>

              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Business Information</h2>
              {/* Business Information */}
              <Form.Item label="Business Model" name="business_model">
                <Input />
              </Form.Item>
              <Form.Item label="Business Type" name="business_type">
                <Input />
              </Form.Item>
              <Form.Item label="Business Website" name="business_website">
                <Input />
              </Form.Item>
              <Form.Item label="Business Email" name="business_email">
                <Input />
              </Form.Item>
              <Form.Item label="Business Phone" name="business_phone">
                <Input />
              </Form.Item>
              <Form.Item label="Business Description" name="business_description">
                <Input.TextArea rows={3} />
              </Form.Item>

              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Company Information</h2>
              {/* Company Information */}
              <Form.Item label="Company Name" name="company_name">
                <Input />
              </Form.Item>
              <Form.Item label="Company Street Address" name="shipping_address">
                <Input />
              </Form.Item>

              <Form.Item label="Company Town / City" name="company_city">
                <Input />
              </Form.Item>
              <Form.Item label="Company State / County" name="company_state">
                <Input />
              </Form.Item>
              <Form.Item label="Company Postcode / ZIP" name="company_zip_code">
                <Input />
              </Form.Item>
              <Form.Item label="Company Country" name="company_country">
                <Input />
              </Form.Item>

              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Social Links</h2>
              {/* Social Links */}
              <Form.Item label="Facebook URL" name="facebook_url">
                <Input />
              </Form.Item>
              <Form.Item label="Instagram URL" name="instagram_url">
                <Input />
              </Form.Item>
              <Form.Item label="LinkedIn URL" name="linkedin_url">
                <Input />
              </Form.Item>
              <Form.Item label="Twitter URL" name="twitter_url">
                <Input />
              </Form.Item>

              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Support Contacts</h2>
              {/* Support Contacts */}
              <Form.Item label="Support Contact 1" name="support_contact_1">
                <Input />
              </Form.Item>
              <Form.Item label="Support Contact 2" name="support_contact_2">
                <Input />
              </Form.Item>

              <h2 className='mb-4 font-semibold text-xl text-gray-500'>Tax Information</h2>
              {/* Tax and Vendor Information */}
              <Form.Item label="Tax ID Number" name="tax_id_number">
                <Input />
              </Form.Item>




            </Form>
          </Modal>

          <Modal
            title={`Image Upload}`}
            visible={imageUploadModal}
            onCancel={handleCancelImageUploadModal}
            okButtonProps={{ style: { display: "none" } }}
            width={1000}
          >
            <Tabs
              defaultActiveKey={"1"}
              centered
              onChange={handleTabChange}
            >
              <TabPane tab="Vendor Products" key="1">
                {activeTab === "1" && (
                  <VendorProductImageUploader
                    maxFiles={10}
                    ids={id}
                    vendors={vendorDatastate?.[0]}
                  />
                )}
              </TabPane>
              <TabPane tab="Trademark Certificate" key="2">
                {activeTab === "2" && (
                  <>
                    <TrademarkUploader
                      maxFiles={1}
                      ids={id}
                      vendors={vendorDatastate?.[0]}
                      updateVendor={() => { }}
                    />
                  </>
                )}
              </TabPane>
              <TabPane tab="Vendor Profile Image" key="3">
                {activeTab === "3" && (
                  <>
                    <VendorProfileChange
                      maxFiles={1}
                      ids={id}
                      vendors={vendorDatastate?.[0]}
                      updateVendor={() => { }}
                    />
                  </>
                )}
              </TabPane>
              <TabPane tab="Brand Logo" key="4">
                {activeTab === "4" && (
                  <>
                    <BrandLogoUpdate
                      maxFiles={1}
                      ids={id}
                      vendors={vendorDatastate?.[0]}
                    />
                  </>
                )}
              </TabPane>
            </Tabs>
            {/* <VendorProductImageUploader maxFiles={5} ids={selectedKey} vendors={selectedVendors} />
                         <TrademarkUploader maxFiles={5} ids={selectedKey} vendors={selectedVendors} /> */}
          </Modal>
        </div>
      : ''
  );
};

export default Profile;
