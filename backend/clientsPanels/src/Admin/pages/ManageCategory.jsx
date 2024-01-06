import React, { useEffect, useState } from 'react';
import { Button, Form, Image, Input, Modal, Select, Space, Switch, Table, Tooltip, Typography, Upload, notification } from 'antd';
import { AdminUrl } from '../constant';
import { FiEdit3, FiTrash2 } from 'react-icons/fi';
import { FaEdit } from 'react-icons/fa';
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
const ManageCategory = ({ adminLoginData }) => {
  // Ensure to define your Hooks at the beginning of the component
  const [categoryData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDescription, setSelectedDescription] = useState("");
  const [Descp_modalVisible, setDescp_ModalVisible] = useState(false);
  const [modalSubcategory, setModalSubcategories] = useState(false);
  const [UploadImageButtonModal, setUploadImageButtonModal] = useState(false);
  const [CategoryLoading, setCategoryLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [DeletemodalVisibleRole, setDeleteModalCategory] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [DeleteSubcategoryModal, setDeleteSubcategoryModal] = useState(false);

  const [selectedRow, setSelectedRow] = useState([]);
  const [subselectedRow, setSubSelectedRow] = useState([]);
  const [type, setType] = useState("");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  // Fetch data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${AdminUrl}/api/getAllCatgeoryWithSubcategory?pageNumber=${pagination.current}&pageSize=${pagination.pageSize}`;
        const categoryResponse = await fetch(url);
        const result = await categoryResponse.json();

        setData(result.data);
        setPagination({
          ...pagination,
          total: result.total || 0,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (adminLoginData != null && adminLoginData.length > 0) {
      fetchData();
    }
  }, [adminLoginData, pagination.current, pagination.pageSize]);

  // Define your columns and handleTableChange function as before
  const columns = [
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: 'left',
      render: (record) => (
        <Space size="middle" className="flex">
          {/* Edit Icon */}
          <FiEdit3
            // onClick={() => handleUpdate(record.category_id)} // Replace 'id' with 'category_id'
            className="text-green-600 w-6 h-6 cursor-pointer"
          />

          {/* Delete Icon */}
          <FiTrash2
            onClick={() => handleDelete(record.category_id)} // Replace 'id' with 'category_id'
            className="text-red-600 w-6 h-6 cursor-pointer"
          />
        </Space>
      ),
    },
    {
      title: "Type",
      dataIndex: "category_type",
      key: "category_type",
      width: 120,
      fixed: 'left',
      sorter: (a, b) => a.category_type.localeCompare(b.category_type), // Add sorter function for string comparison
    },
    {
      title: "Name",
      dataIndex: "category_name",
      key: "category_name",
      width: 250,
      sorter: (a, b) => a.category_name.localeCompare(b.category_name), // Add sorter function for string comparison
      defaultSortOrder: 'ascend', // Set the default sorting order to ascending
      render: (_, record) => (
        <>
          <p>{record?.category_name} ({record?.product_count})</p>
        </>
      ),
    },
    {
      title: "Subcategories",
      dataIndex: "Subcategories",
      key: "Subcategories",
      width: 250,
      defaultSortOrder: 'ascend', // Set the default sorting order to ascending
      render: (_, record) => (
        <>
          <div onClick={() => {
            setSelectedRow(record)
            setModalSubcategories(true)
          }} className='cursor-pointer'>
            <p className='text-base text-blue-800'>View Subcategories ({record?.subcategories?.length})</p>
          </div>
        </>
      ),
    },
    {
      title: 'Image',
      dataIndex: 'category_image_url',
      key: 'category_image_url',
      width: 100,
      render: (imageUrl, row) => {
        if (imageUrl) {
          return (
            <div className="overflow-hidden flex">
              <Image
                width={50}
                height={50}
                src={`${AdminUrl}/uploads/CatgeoryImages/${imageUrl}`}
                className="w-full h-full object-contain border-4  rounded-full"
              />

              <FaEdit className='text-gray-500 cursor-pointer' onClick={() => {
                setUploadImageButtonModal(true)
                setSelectedKey(row.category_id)
                setType('category')
              }} />
            </div>
          );
        } else {
          return (
            <FaEdit className='text-gray-500 cursor-pointer' onClick={() => {
              setUploadImageButtonModal(true)
              setSelectedKey(row.category_id)
              setType('category')
            }} />
          );
        }
      },
    },
    {
      title: "Description",
      dataIndex: "category_description",
      key: "category_description",
      width: 300,
      render: (category_description) => (
        <Tooltip title={category_description}>
          <div
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {category_description.length > 10 ? (
              <>
                {category_description.slice(0, 10)}{" "}
                <Button
                  type="link"
                  onClick={() => handleDescriptionModal(category_description)}
                >
                  Read More
                </Button>
              </>
            ) : (
              category_description
            )}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "Status",
      dataIndex: "category_status",
      key: "category_status",
      render: (status, record) => (
        <Switch
          checked={status}
          onChange={(checked) => handleSwitchChange(checked, record.category_id, 'category')}
          className='bg-red-500'
        />
      ),
    },
  ]

  const subcategory_columns = [
    {
      title: "Actions",
      key: "actions",
      width: 120,
      fixed: 'left',
      render: (record) => (
        <Space size="middle" className="flex">
          {/* Edit Icon */}
          <FiEdit3
            // onClick={() => handleUpdate(record.category_id)} // Replace 'id' with 'category_id'
            className="text-green-600 w-6 h-6 cursor-pointer"
          />

          {/* Delete Icon */}
          <FiTrash2
            onClick={() => handleSubcatModal(record.subcategory_id)} // Replace 'id' with 'category_id'
            className="text-red-600 w-6 h-6 cursor-pointer"
          />
        </Space>
      ),
    },
    { title: 'Subcategory Name', dataIndex: 'subcategory_name', key: 'subcategory_name' },
    {
      title: 'Image',
      dataIndex: 'subcategory_image_url',
      key: 'subcategory_image_url',
      width: 100,
      render: (imageUrl, row) => {
        if (imageUrl) {
          return (
            <div className="overflow-hidden flex">
              <Image
                width={50}
                height={50}
                src={`${AdminUrl}/uploads/SubcategoryImages/${imageUrl}`}
                className="w-full h-full object-contain border-4  rounded-full"
              />

              <FaEdit className='text-gray-500 cursor-pointer' onClick={() => {
                setUploadImageButtonModal(true)
                setSelectedKey(row.subcategory_id)
                setType('subcategory')
              }} />
            </div>
          );
        } else {
          return (
            <FaEdit className='text-gray-500 cursor-pointer' onClick={() => {
              setUploadImageButtonModal(true)
              setSelectedKey(row.subcategory_id)
              setType('subcategory')
            }} />
          );
        }
      },
    },
    {
      title: "Status",
      dataIndex: "subcat_status",
      key: "subcat_status",
      render: (subcat_status, record) => (
        <>
          <Switch
            checked={subcat_status}
            onChange={(checked) => handleSwitchChange(checked, record.subcategory_id, 'subcategory')}
            className='bg-red-500'
          />
          <p>{subcat_status}</p>
        </>
      ),
    },
    // Add more columns as needed
  ];

  function handleDelete(key) {
    setSelectedKey(key);
    const selectedRow = categoryData.find((item) => item.category_id === key);
    setSelectedRow(selectedRow);
    setDeleteModalCategory(true);
  }

  const handleSwitchChange = async (checked, categoryId, type) => {
    try {
      // Send a request to the backend to update the category status
      const response = await fetch(`${AdminUrl}/api/updateCategoryStatus`, {
        method: 'POST', // Adjust the method based on your backend API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId: categoryId,
          status: checked,
          type
        }),
      });

      if (response.ok) {
        setData((prevCategoryData) => {
          const updatedCategoryData = [...prevCategoryData];
          let categoryIndex;

          if (type === 'subcategory') {
            // Find the category index containing the specified subcategory
            categoryIndex = updatedCategoryData.findIndex((category) =>
              category.subcategories?.some((subcat) => subcat.subcategory_id === categoryId)
            );
          } else {
            // Find the category index by category_id
            categoryIndex = updatedCategoryData.findIndex((category) => category.category_id === categoryId);
          }

          if (categoryIndex !== -1) {
            if (type === 'category') {
              // Update category status
              updatedCategoryData[categoryIndex].category_status = checked;
            } else if (type === 'subcategory') {
              // Find the index of the specified subcategory within its category
              const subcategoryIndex = updatedCategoryData[categoryIndex].subcategories.findIndex((subcat) => subcat.subcategory_id === categoryId);

              // Update subcategory status within the category
              if (subcategoryIndex !== -1) {
                updatedCategoryData[categoryIndex].subcategories[subcategoryIndex].subcat_status = checked;
              }
            } else {
              // Invalid type provided
              console.error('Invalid type specified');
            }
          }

          return updatedCategoryData;
        });

        console.log(categoryData);
        // Show a success notification if the request was successful
        const statusMessage = checked ? 'enabled' : 'disabled';
        notification.success({
          message: 'Success',
          description: `${type === 'category' ? 'Category' : 'Subcategory'} is now ${statusMessage}.`,
        });
      } else {
        // Handle errors if the request was not successful
        notification.error({
          message: 'Error',
          description: 'Failed to update category status.',
        });
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Error updating category status:', error);
      notification.error({
        message: 'Error',
        description: 'Failed to update category status. Please try again.',
      });
    }
  };

  const handleDescriptionModal = (description) => {
    setSelectedDescription(description);
    setDescp_ModalVisible(true);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination({
      ...pagination,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  function onCancel() {
    setSelectedKey(null);
    setDeleteModalCategory(false);
    setUploadImageButtonModal(false)
    setFileList([])
    setSelectedKey(null)
    setDeleteSubcategoryModal(false)
  }

  const handleBeforeUpload = (file) => {
    // Check file type and size before uploading
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png';

    // If both conditions are met, add the file to the fileList
    if (isImage) {
      setFileList([file]);
    }

    return false; // Prevent automatic upload
  };


  const handleDeleteImage = () => {
    // Clear the selected file and set isEditing to false
    setFileList([]);
  };

  const handleUploadImage = () => {
    try {
      if (fileList.length === 0) {
        // Handle the case when there is no file to upload
        return;
      }

      const file = fileList[0]; // Get the file from fileList at index 0

      const formData = new FormData();
      formData.append('file', file);
      formData.append('selectedKey', selectedKey);

      if (type === 'category') {
        fetch(`${AdminUrl}/api/UploadCategoryImage`, {
          method: 'POST',
          body: formData,
        })
          .then(async (response) => {
            if (response.ok) {
              // Handle success
              const data = await response.json()
              const updatedCategoryData = [...categoryData]; // Create a shallow copy of categoryData to avoid mutating the original array
              const foundCategoryIndex = updatedCategoryData.findIndex(item => item.category_id === selectedKey);

              if (foundCategoryIndex !== -1) {
                // Update category_image_url for the found category
                updatedCategoryData[foundCategoryIndex].category_image_url = data?.file;
                notification.success({
                  message: 'Success',
                  description: 'Category Image updated successfully!',
                });
                // If you need to update other properties, you can do so here
                // updatedCategoryData[foundCategoryIndex].otherProperty = 'new_value';
              }

              // Use updatedCategoryData in your application

              setUploadImageButtonModal(false)
              setCategoryLoading(false)
              setFileList([])
              setSelectedKey(null)
              console.log('File sent to the backend successfully');
            } else {
              // Handle error
              console.error('Error sending file to the backend');
            }
          })
          .catch((error) => {
            // Handle network error
            console.error('Network error:', error);
          });
      }
      else if (type === 'subcategory') {
        fetch(`${AdminUrl}/api/UploadSubcatgeoryImage`, {
          method: 'POST',
          body: formData,
        })
          .then(async (response) => {
            if (response.ok) {
              // Handle success
              const data = await response.json()

              const foundSubcatIndex = selectedRow?.subcategories?.findIndex(item => item.subcategory_id === selectedKey);

              if (foundSubcatIndex !== -1) {
                // Update category_image_url for the found category
                selectedRow.subcategories[foundSubcatIndex].subcategory_image_url = data?.file;
                notification.success({
                  message: 'Success',
                  description: 'SubCategory Image updated successfully!',
                });
              }

              setUploadImageButtonModal(false)
              setCategoryLoading(false)
              setFileList([])
              setSelectedKey(null)
              console.log('File sent to the backend successfully');
            } else {
              // Handle error
              console.error('Error sending file to the backend');
            }
          })
          .catch((error) => {
            // Handle network error
            console.error('Network error:', error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [form] = Form.useForm();

  function handleCreate() {
    form.resetFields()
    setSelectedKey(null);
    setModalVisible(true);
  }

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 18 },
    },
  };

  const handleSaveCategories = async () => {
    try {
      // Validate the form fields
      const values = await form.validateFields();

      if (selectedKey === null) {
        // Send the values to the backend
        const response = await fetch(`${AdminUrl}/api/addNewCategories`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          // Handle success, maybe show a success message
          console.log('Categories added successfully!');

          // Fetch and update the category data after successful insertion
          const result = await response.json();

          // Fetch the new data (for example, from the server response)
          const newData = result.data;

          // Append the new data to the existing data
          const updatedData = [...newData, ...categoryData];

          // Update the state with the updated data
          setData([
            ...categoryData,
            {
              category_id: newData.category_id,
              ...values,
            },
          ]);

          // Show success notification with SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: result.message,
          });
          setModalVisible(false)
        } else {
          // Handle errors and show appropriate messages
          const responseData = await response.json();
          if (responseData && responseData.error) {
            console.error('Failed to add categories:', responseData.error);
            // Show error message to the user
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: responseData.error,
            });
          } else {
            console.error('Failed to add categories:', response.statusText);
            // Show a generic error message to the user
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to add categories. Please try again.',
            });
          }
        }
      } else {
        // Update
      }
    } catch (error) {
      // Handle validation errors or other exceptions
      console.error('Error:', error);
      // Show an error message to the user
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to add categories. Please check the form and try again.',
      });
    }
  };

  const onDelete = async (selectedKey) => {
    if (selectedKey) {
      try {
        // Send the request to the backend using fetch
        const response = await fetch(`${AdminUrl}/api/deleteCategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedKey }),
        });

        if (!response.ok) {
          // Handle error response from the server if needed
          const errorText = await response.text();
          throw new Error(
            `Failed to update roles. Server responded with status ${response.status}: ${errorText}`
          );
        } else {
          if (response.ok) {
            // Show a success Swal popup
            Swal.fire({
              icon: "success",
              title: "Deleted!",
              text: "The item has been deleted.",
            });
            setDeleteModalCategory(false);
            setData(
              categoryData.filter((item) => item.category_id != selectedKey)
            );
          } else {
            // Show an error Swal popup if the response status is not ok
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Failed to delete the item.",
            });
          }
        }
      } catch (error) {
        // Show an error Swal popup if there's an error making the request
        console.error("Error during onDelete:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to delete the item.",
        });
      }
    } else {
      setUploadImageButtonModal(false)
    }
  };

  const handleSubcatModal = (key) => {
    const DeleteSubcat = categoryData
      .map((category) => ({
        ...category,
        subcategories: category.subcategories.filter(
          (subcat) => subcat.subcategory_id === key
        ),
      }))
      .filter((category) => category.subcategories.length > 0)
      .map((category) => category.subcategories);

    // DeleteSubcat will now contain the parent category that contains the subcategory with the specified subcategory_id

    // The updated categoryData with the subcategory removed
    const firstSubcategory = DeleteSubcat[0][0];

    setSubSelectedRow(firstSubcategory);
    setSelectedKey(key);
    setDeleteSubcategoryModal(true);
  };

  const handleDeleteSubcategoryLogic = async (subcategory_id) => {
    try {
      // Send a DELETE request to your backend API to delete the subcategory
      const response = await fetch(`${AdminUrl}/api/deleteSubcategory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcategory_id }), // Send the subcategory_id in the request body
      });

      if (response.ok) {
        // Subcategory deleted successfully
        const foundSubcatIndex = selectedRow?.subcategories.filter(item => item.subcategory_id === selectedKey);

        const updatedDATA = selectedRow?.subcategories.filter(item => item.subcategory_id !== foundSubcatIndex[0]?.subcategory_id);
        const craetedata = {
          ...categoryData,
          subcategories: updatedDATA
        }
        setSelectedRow(craetedata)

        setDeleteSubcategoryModal(false);
        Swal.fire({
          icon: "success",
          title: "SubCategory Deleted Successfully.",
          text: "The SubCategory has been successfully Deleted.",
        });
      } else {
        // Handle error response
        console.error("Error deleting subcategory:", response.statusText);
        Swal.fire({
          icon: "success",
          title: "Error deleting subcategory",
          text: `${response.statusText}`,
        });
      }
    } catch (error) {
      // Handle error
      console.error("Error deleting subcategory:", error);
      Swal.fire({
        icon: "success",
        title: "Error deleting subcategory",
        text: `${error}`,
      });
    }
  };
  return (
    <div className="mt-10 sm:ml-72 sm:p-0 p-4 mb-44 ">
      <h1 className="text-4xl text-gray-700 font-bold mb-10">
        Manage Category
      </h1>

      <button
        onClick={handleCreate}
        className="bg-[#EC642A] hover:bg-[#EC642A]/80 text-white rounded-full p-2 z-[999] absolute right-10 top-20"
      >
        <svg
          className="w-10 h-10 "
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

      <Table
        dataSource={categoryData}
        columns={columns}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{
          x: 1500,
          y: 600,
        }}
      />

      <Modal
        title={
          selectedKey === null ? "Create category" : "Update category"
        }
        visible={modalVisible}
        onOk={handleSaveCategories}
        onCancel={() => setModalVisible(false)}
        okText={selectedKey === null ? "Create" : "Update"}
        width={800}
        okButtonProps={{ style: { backgroundColor: "green" } }}
      >
        <Form {...formItemLayout} form={form}>
          {/* Category Type Input */}
          <Form.Item
            label="Category Type"
            name="category_type"
            rules={[
              {
                required: true,
                message: "Please select the category type!",
              },
            ]}
          >
            <Select placeholder="Select category type">
              <Select.Option value="Products">Products</Select.Option>
              <Select.Option value="Services">Services</Select.Option>
            </Select>
          </Form.Item>

          {/* Category Name Input */}
          <Form.Item
            label="Category Name"
            name="category_name"
            rules={[
              {
                required: true,
                message: "Please enter the category name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Category Description Input */}
          <Form.Item
            label="Category Description"
            name="category_description"
            rules={[
              {
                required: true,
                message: "Please enter the category description!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          {/* Category Status Input */}
          <Form.Item
            label="Category Status"
            name="category_status"
            valuePropName="checked" // This allows handling the boolean value as a checkbox
          >
            <Switch
              checked={form.getFieldValue("category_status") || true}
              className='bg-red-500'
            />
          </Form.Item>

          <hr className='mb-8' />
          <Form.List name="subcategories" >
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <div className='border-b mb-4'>
                    <Form.Item
                      key={key}
                      label={`Name ${key + 1}`}
                      {...restField}
                      name={[name, "subcategory_name"]}
                      fieldKey={[fieldKey, "subcategory_name"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the subcategory name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      key={key}
                      label={`Description ${key + 1}`}
                      {...restField}
                      name={[name, "subcategory_description"]}
                      fieldKey={[fieldKey, "subcategory_description"]}
                      rules={[
                        {
                          required: true,
                          message: "Please enter the subcategory name!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </div>
                ))}

                <Form.Item wrapperCol={{ offset: 6, span: 14 }} className='flex  justify-center items-center'>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    className='flex justify-center items-center'
                  >
                    Add Subcategory
                  </Button>
                </Form.Item>

                {fields.length > 0 && (
                  <Form.Item wrapperCol={{ offset: 6, span: 14 }}>
                    <Button
                      type="dashed"
                      onClick={() => remove(fields.length - 1)}
                      icon={<MinusCircleOutlined />}
                      className='flex justify-center items-center'

                    >
                      Remove Last Subcategory
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
        </Form>
      </Modal>

      <Modal
        visible={Descp_modalVisible}
        onCancel={() => setDescp_ModalVisible(false)}
        footer={null}
        width={600}
        title="Description"
      >
        <Typography.Paragraph>
          {selectedDescription}
        </Typography.Paragraph>
      </Modal>

      <Modal
        visible={modalSubcategory}
        onCancel={() => setModalSubcategories(false)}
        footer={null}
        width={600}
        title="Subcategories"
      >
        <Table dataSource={selectedRow?.subcategories} columns={subcategory_columns} />
      </Modal>

      <Modal
        title="Upload Image"
        visible={UploadImageButtonModal}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="upload"
            type="default"
            className="bg-green-500 text-white"
            onClick={() => handleUploadImage()}
            loading={CategoryLoading}
          >
            Upload
          </Button>,
        ]}
      >
        <Upload
          name="category_image"
          accept=".jpg,.png"
          beforeUpload={handleBeforeUpload}
          fileList={fileList}

          onRemove={handleDeleteImage}
          listType="picture"
        >
          {fileList.length === 0 && (
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          )}
        </Upload>
      </Modal>

      <Modal
        title="Confirm Delete"
        visible={DeletemodalVisibleRole}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => onDelete(selectedKey)}
          >
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete this category{" "}
          <b>({`${selectedRow?.category_name}`}) </b>?
        </p>
      </Modal>

      <Modal
        title="Confirm Subcategory Delete"
        visible={DeleteSubcategoryModal}
        onCancel={onCancel}
        footer={[
          <Button key="cancel" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={() => handleDeleteSubcategoryLogic(selectedKey)}
          >
            Delete
          </Button>,
        ]}
      >
        <p>
          Are you sure you want to delete this category{" "}
          <b>({`${subselectedRow?.subcategory_name}`}) </b>?
        </p>
      </Modal>
    </div>
  );
};

export default ManageCategory;
