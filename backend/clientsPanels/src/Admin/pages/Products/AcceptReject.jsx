import React, { useEffect, useState } from "react";
import { Table, Button, Image, Input, Modal, Tooltip, Checkbox, Pagination } from "antd";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { AdminUrl, ProductImageUrl, fetchVariantProducts } from "../../constant";
import VendorProfileDetails from "../../components/VendorProfileDetails ";
import Swal from "sweetalert2";
import { FiAlertCircle, FiCheckCircle, FiClock } from "react-icons/fi";
import moment from "moment";
import axios from "axios";
import Search from "antd/es/input/Search";

const AcceptReject = () => {
  const [rejectedProducts, setRejectedProducts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [RejectModal, setRejectModal] = useState(false);
  const [ApproveModal, setApproveModal] = useState(false);
  const [modalDescription, setModalDescription] = useState("");
  const [vendorProfileModalVisible, setVendorProfileModalVisible] =
    useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null); // New state for selected product ID
  const [rejectReason, setRejectReason] = useState(""); // New state for reject reason
  const [variantsFetchFinal, setvariantsFetchFinal] = useState([]);
  const [variantsValueArray, setVariantsValueArray] = useState([]);
  const [FilteredVariantData, setFilteredVariantData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [totalvendors, settotalVendors] = useState(0);
  const [vendorPage, setvendorPage] = useState(1);
  const [vendorPageSize, setvendorPageSize] = useState(5);
  const [vendorProducts, setVendorProducts] = useState(null);
  const [vendorTotalProducts, setVendorTotalProducts] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [vendorInfo, setVendorInfo] = useState([]);

  useEffect(() => {
    fetchVariantProducts()
      .then((variantProducts) => {
        setvariantsFetchFinal(variantProducts);
        // Filter the fetched variant products based on SelectedUniqueId
        // Convert the filtered data to the desired format
        const formattedData = variantProducts.map((item) => {
          return {
            label: item.label,
            price: parseFloat(item.variant_mrp),
            sellingPrice: parseFloat(item?.variant_sellingprice),
            sku: item.variant_skuid,
            quantity: item.variant_quantity,
            variantsValue: JSON.parse(item.variantsvalues),
          };
        });

        const variantsValueArray = formattedData.map(
          (item) => item.variantsValue
        );
        console.log(variantsValueArray);
        setVariantsValueArray(variantsValueArray);
        // Now, set the formatted data in the state variable setFilteredVariantData
        setFilteredVariantData(formattedData);
      })
      .catch((error) => {
        // Handle fetch errors here
        console.log(error);
      });
  }, []);

  const openModal = (description) => {
    setModalDescription(description);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setRejectReason("");
    setModalVisible(false);
    setRejectModal(false);
    setApproveModal(false);
  };

  const fetchRejectedProducts = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/rejected-products?vendorPage=${vendorPage}&vendorPageSize=${vendorPageSize}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      // Group products by vendorId and create products array
      const productsByVendor = {};
      data?.rejectedVendors.forEach((product) => {
        const { vendorid, ...productData } = product;
        if (!productsByVendor[vendorid]) {
          productsByVendor[vendorid] = {
            vendorid,
            vendorname: product.vendorname,
            totalProductsVendor: parseInt(product.vendor_row_count) || 0,
            products: [],
          };
        }
        // productsByVendor[vendorid].products.push(productData);
      });

      const modifiedData = Object.values(productsByVendor);
      setRejectedProducts(modifiedData);

      settotalVendors(parseInt(data?.totalvendors) || 0)
      setExpandedRowKeys(data && data.map((product) => product.vendorid));
    } catch (error) {
      console.error("Error fetching rejected products:", error);
    }
  };

  useEffect(() => {
    !rejectedProducts && fetchRejectedProducts();
  }, [rejectedProducts]);

  const getVendorChunkProducts = async (vendorId, page, pageSize) => {
    try {
      setvendorPage(1)
      setvendorPageSize(10)
      const response = await fetch(`${AdminUrl}/api/getVendorProductsAR?vendorid=${vendorId}&page=${page}&pageSize=${pageSize}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      if (response.ok) {
        const data = await response.json();
        setVendorInfo(data?.vendor || [])
        return data
      } else {
        return null
      }
    } catch (error) {
      console.log(error);
    }
  }

  const openVendorProfileModal = (vendor, rejectedProducts) => {
    console.log(vendorInfo, 'vend');
    setSelectedVendor({ vendor: vendorInfo, rejectedProducts });
    setVendorProfileModalVisible(true);
  };

  const closeVendorProfileModal = () => {
    setSelectedVendor(null);
    setVendorProfileModalVisible(false);
  };

  const statusMap = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
  };

  const renderDescription = (record, openModal) => {
    const { ad_title, additionaldescription, currency_symbol, price } = record;
    let words = additionaldescription?.split(" ");

    if (additionaldescription?.length <= 5) {
      return (
        <>
          <p className="text-sm text-gray-400 text-justify">
            {additionaldescription}
          </p>
        </>
      );
    } else {
      let shortDescription = words?.slice(0, 5)?.join(" ");
      return (
        <>
          <p className="text-sm text-gray-400 text-justify">
            {shortDescription}...{" "}
            <span
              className="text-[12px] cursor-pointer text-blue-500"
              type
              onClick={() => openModal(additionaldescription)}
            >
              Read More
            </span>
          </p>
        </>
      );
    }
  };

  const renderVariants = (record, variantsFetchFinal) => {
    const { currency_symbol, uniquepid, isvariant } = record;

    if (isvariant === "Variant") {
      const filteredVariants = variantsFetchFinal
        .filter((variant) => parseInt(variant.product_uniqueid) === uniquepid)
        .sort(
          (a, b) =>
            parseFloat(a?.variant_sellingprice) -
            parseFloat(b?.variant_sellingprice)
        );

      return (
        <Tooltip
          title={`${currency_symbol} ${filteredVariants[0]?.variant_sellingprice
            } -  ${currency_symbol} ${filteredVariants[filteredVariants.length - 1]?.variant_sellingprice
            }`}
        >
          <div className="w-[150px]">
            <p className="md:text-sm font-semibold tracking-wide line-clamp-1">
              {record.ad_title}
            </p>

            {renderDescription(record, openModal)}
            <span className="font-semibold text-[12px]">
              {currency_symbol} {filteredVariants[0]?.variant_sellingprice}
            </span>
            <span> - </span>
            <span className="font-medium">
              {currency_symbol}{" "}
              {
                filteredVariants[filteredVariants.length - 1]
                  ?.variant_sellingprice
              }
            </span>
          </div>
        </Tooltip>
      );
    } else {
      return (
        <Tooltip
          title={`${currency_symbol} MRP: ${record.mrp} - Selling Price: ${currency_symbol} ${record.sellingprice}`}
        >
          <div className="w-[150px]">
            <p className="md:text-sm font-semibold tracking-wide line-clamp-1">
              {record.ad_title}
            </p>
            {renderDescription(record, openModal)}

            <span className="font-medium">
              SP: {currency_symbol} {record.sellingprice}
            </span>
          </div>
        </Tooltip>
      );
    }
  };

  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "vendorname",
      key: "vendorname",
      render: (_, record) => {
        return (
          <>
            <p className="font-bold text-xl">
              {record.vendorname}
            </p>
            <div className="flex gap-2">
              <p>{record?.totalProductsVendor || 0} {record?.totalProductsVendor > 1 ? 'Products' : 'Product'}</p>

              <p> (VID: {record.vendorid})</p>
              <Button onClick={() => {
                // Assume record.products is an array of objects

                // Create an array to store unique pids
                const uniquePidsArray = [];

                // Iterate through each product in the array
                vendorProducts && vendorProducts[record.vendorid].forEach((product) => {
                  const pid = product.uniquepid;
                  uniquePidsArray.push(pid);
                });

                // Check if any of the unique IDs are already selected
                const isAnySelected = uniquePidsArray.some(pid => selectedRowKeys.includes(pid));

                if (isAnySelected) {
                  // If any unique ID is selected, unselect all
                  setSelectedRowKeys([]);
                } else {
                  // If none of the unique IDs is selected, select all
                  setSelectedRowKeys(uniquePidsArray);
                }
              }}>
                {'Select All Products'}
              </Button>


            </div>
          </>
        );
      },
    },
    {
      title: "",
      key: "select_all",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.uniquepid)}
          onChange={() => handleRowSelect(record.uniquepid)}
        />
      ),
    },
    {
      title: "Id",
      dataIndex: "uniquepid",
      key: "uniquepid",
      render: (_, record) => {
        return (
          <>
            <p>{record.uniquepid}</p>
            <p>{record.skuid && 'Sku id :' + record.skuid}</p>
          </>
        );
      },
    },
    {
      title: "Ad Title",
      dataIndex: "ad_title",
      key: "ad_title",
      width: 350,
      render: (_, record) => {
        return renderVariants(record, variantsFetchFinal);
      },
    },
    {
      title: "Product Image",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (imageSrcArray) => (
        <div className="image-gallery">
          <div>
            <Image.PreviewGroup>
              {imageSrcArray?.slice(0, 2).map((image, index) => (
                <Image
                  key={index}
                  src={`${ProductImageUrl}/${image}`}
                  alt="Product Image"
                  width={50}
                  height={50}
                  className="border rounded-full p-1 "
                />
              ))}
            </Image.PreviewGroup>
            {imageSrcArray?.length > 2 && (
              <Button
                className="text-sm border border-b-4"
                onClick={() => handleViewImages(imageSrcArray)}
              >
                View All {imageSrcArray?.length} Images
              </Button>
            )}
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "SubCategory",
      dataIndex: "subcategory",
      key: "subcategory",
      render: (_, record) => (
        <p className="text-md font-semibold">{record.subcategory}</p>
      ),
    },
    {
      title: "Reject Reason",
      dataIndex: "rejection_reason",
      key: "rejection_reason",
      render: (rejectionReason, record) => {
        const truncatedReason = rejectionReason?.slice(0, 25);
        const isTruncated = rejectionReason?.length > 25;

        return (
          <div>
            <Tooltip title={rejectionReason}>
              <p className="font-semibold">
                {isTruncated ? `${truncatedReason}...` : rejectionReason}
              </p>
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: "Vendor Details",
      dataIndex: "vendorname",
      key: "vendor-details",
      render: (_, record) => (
        <Button
          className="transition transform hover:scale-105"
          onClick={() => openVendorProfileModal(record, vendorProducts[[record.vendorid]])}
        >
          Vendor Profile
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let icon, color;
        switch (status) {
          case 0:
            icon = <FiClock className="text-orange-600" />;
            color = "text-orange-600";
            break;
          case 1:
            icon = <FiCheckCircle className="text-green-500" />;
            color = "text-green-500";
            break;
          case 2:
            icon = <FiAlertCircle className="text-red-500" />;
            color = "text-red-500";
            break;
          case 3:
            icon = <FiAlertCircle className="text-red-500" />;
            color = "text-red-500";
            break;
          default:
            icon = <FiClock className="text-gray-500" />;
            color = "text-gray-500";
        }
        return (
          <span className={`flex items-center ${color}`}>
            {icon}
            <span className="ml-1">{statusMap[status]}</span>
          </span>
        );
      },
      filters: [
        { text: "Pending", value: 0 },
        { text: "Approved", value: 1 },
        { text: "Rejected", value: 2 },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a.status - b.status,
    },
    {
      title: "Uploaded at",
      dataIndex: "created_at",
      key: "created_at",
      sorter: (a, b) =>
        moment(a.created_at).unix() - moment(b.created_at).unix(), // Custom sorting function
      render: (_, record) => (
        <p className="text-md font-semibold">
          {moment(record.created_at).format("MMMM D, YYYY hh:mm:ss A")}
        </p>
      ),
      sortDirections: ["descend", "ascend"],
      defaultSortOrder: "ascend",
      width: 150,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex">
          <button
            className="mr-2 flex items-center bg-green-500 rounded-lg hover:bg-green-700 text-white px-4 py-2  focus:outline-none"
            onClick={() => {
              setSelectedRowKeys([record.uniquepid]);
              handleApprove(record);
            }}
          >
            <span className="mr-1">
              <AiOutlineCheckCircle className="h-5 w-5" />
            </span>
            Approve
          </button>

          <button
            className="flex items-center bg-red-500 rounded-lg hover:bg-red-700 text-white px-4 py-2  focus:outline-none"
            onClick={() => {
              setSelectedRowKeys([record.uniquepid]);
              handleReject(record);
            }}
          >
            <span className="mr-1">
              <AiOutlineCloseCircle className="h-5 w-5" />
            </span>
            Reject
          </button>
        </div>
      ),
    },
  ];

  const handleApprove = (record) => {
    // Implement approve logic here
    setSelectedProductId(record); // Store the selected product ID
    setApproveModal(true); // Open the modal
  };

  const handleReject = (record) => {
    setSelectedProductId(record || null); // Store the selected product ID
    setRejectReason(record?.rejection_reason || ""); // Reset the reject reason
    setRejectModal(true); // Open the modal
  };

  const handleModalOk = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/reject-product-reason`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productIds: selectedRowKeys,
          rejectReason: rejectReason,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to reject the product");
      }

      const data = await response.json();

      const updatedRejectedProducts = rejectedProducts.map((item) => ({
        ...item,
        products: item.products.map((inner_i) =>
          inner_i.uniquepid === selectedProductId.uniquepid
            ? { ...inner_i, rejection_reason: rejectReason, productstatus: 2 }
            : inner_i
        ),
      }));

      setRejectedProducts(updatedRejectedProducts);

      // Show success popup using Swal
      Swal.fire({
        icon: "success",
        title: "Product Rejected",
        text: data.message, // Use the success message received from the API
        confirmButtonText: "OK",
      });

      closeModal();
    } catch (error) {
      console.error("Error rejecting product:", error);
      // Show error popup using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject the product. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleApproveLogic = async () => {
    try {
      const backendEndpoint = `${AdminUrl}/api/bulkProductApprove`;

      // Assuming you want to send a POST request with the selectedRowKeys
      axios.post(backendEndpoint, { selectedRowKeys }).then((response) => {
        // Handle the successful response from the backend
        console.log("Response from backend:", response);

        // Assuming the backend response includes updated data
        const updatedRejectedProducts = rejectedProducts.map((item) => ({
          ...item,
          products: item.products.map((inner_i) => {
            // Check if selectedRowKeys includes the uniquepid of inner_i
            const isSelected = selectedRowKeys.includes(inner_i.uniquepid);

            return isSelected ? { ...inner_i, productstatus: 1 } : inner_i;
          }),
        }));

        // Now, 'updatedRejectedProducts' contains the updated structure
        // You can set the state with the modified data
        setRejectedProducts(updatedRejectedProducts);
      });

      // Show success popup using Swal
      Swal.fire({
        icon: "success",
        title: "Product Approved",
        text: "", // Use the success message received from the API
        confirmButtonText: "OK",
      });

      closeModal();
    } catch (error) {
      console.error("Error Approved product:", error);
      // Show error popup using Swal
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to reject the product. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  const handleViewImages = (images) => {
    Modal.success({
      title: "All Images",
      width: 800,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {images?.map((image) => (
            <div className="w-[350px] p-2 border">
              <Image
                key={image}
                src={`${ProductImageUrl}/${image}`}
                alt="Product Image"
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      ),
      okText: "Close",
      okButtonProps: { style: { backgroundColor: "green" } },
    });
  };

  const handleRowSelect = (selectedId) => {
    // Convert selectedRowKeys to Set for easy handling of unique values
    const uniqueSelectedRowKeys = new Set(selectedRowKeys);

    if (uniqueSelectedRowKeys.has(selectedId)) {
      // Agar selectedId mojood hai, toh use remove karo
      uniqueSelectedRowKeys.delete(selectedId);
    } else {
      // Agar selectedId mojood nahi hai, toh use add karo
      uniqueSelectedRowKeys.add(selectedId);
    }

    // Convert Set back to array and update state
    setSelectedRowKeys([...uniqueSelectedRowKeys]);
  };

  const flattenedUniqueIds = rejectedProducts && rejectedProducts.flatMap((product) =>
    product.products.map((p) => p.uniquepid)
  );

  const uniqueIdsLength = Array.from(new Set(flattenedUniqueIds)).length;

  const handleSelectAllRows = () => {
    if (selectedRowKeys.length - 1 === uniqueIdsLength) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(
        rejectedProducts
          .map((product) =>
            product.products.map((nestedProduct) => nestedProduct.uniquepid)
          )
          .flat()
      );
    }
  };

  const handleApproveProduct = () => {
    setApproveModal(true);
    // Assuming the backend endpoint is 'http://your-backend-api.com/bulkProductApprove'
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (page, pageSize) => {

    if (searchTerm.trim() === '') {
      setvendorPage(1);
      setvendorPageSize(10);
      fetchRejectedProducts()
      return;
    }

    try {
      // Send a request to your backend with the search term
      const response = await fetch(`${AdminUrl}/api/getSearchedProducts_Panel?searchTerm=${searchTerm}&page=${page}&pageSize=${pageSize}`);

      if (response.ok) {
        const data = await response.json();

        const productsByVendor = {};
        data?.products.forEach(async (product) => {
          const { vendorid, ...productData } = product;
          if (!productsByVendor[vendorid]) {
            productsByVendor[vendorid] = {
              vendorid,
              vendorname: product?.vendorInfo?.vendorname,
              totalProductsVendor: data?.totalCount,
              products: [],
            };
            console.log(data);
            // const vendorProduct = await getVendorChunkProducts(vendorid, 1, 10);
            setExpandedRowKeys([vendorid]);
            setVendorProducts({ [vendorid]: data?.products || [] });
            console.log({ [vendorid]: parseInt(data?.totalCount) || 0 }, 'asas');
            setVendorTotalProducts({ [vendorid]: parseInt(data?.totalCount) || 0 });
          }
          // productsByVendor[vendorid].products.push(productData);
        });

        const modifiedData = Object.values(productsByVendor);
        setRejectedProducts(modifiedData);

        // settotalVendors(parseInt(data?.totalCount) || 0)

        // setProducts(data.products);
        // setTotalCount(parseInt(data?.totalCount) || 0);
        // setAllProducts(data.products);
        // setSubcategoryCount(parseInt(data?.totalCount) || 0); // Assuming totalCount represents subcategory count
      }

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };


  return (
    <div className="sm:p-4 sm:ml-64">
      <div className="lg:w-1/2 md:w-3/4 sm:w-full p-2">
        <h1 className="text-3xl lg:text-4xl font-semibold mb-2 lg:mb-4">
          Accept/Reject Products
        </h1>
        <p className="text-sm lg:text-base text-gray-600 mb-8">
          Manage your product approvals with ease by accepting or rejecting
          product submissions.
        </p>
      </div>

      <div className="mt-5  flex justify-center">
        <Search
          placeholder="Enter your search term"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onSearch={() => handleSearch(1, 10)}
          className="w-1/2"
        />
      </div>

      <Table
        columns={columns.slice(0, -11)}
        dataSource={rejectedProducts || []}
        pagination={false}
        title={() => (
          <>
            <div className="flex items-center">
              {/* <Checkbox
                checked={selectedRowKeys.length - 1 === uniqueIdsLength}
                indeterminate={
                  selectedRowKeys.length > 0 &&
                  selectedRowKeys.length < uniqueIdsLength
                }
                onChange={handleSelectAllRows}
              >
                Select All
              </Checkbox> */}
              <Button
                className="bg-green-500 flex items-center flex-row hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md"
                onClick={handleApproveProduct}
                disabled={selectedRowKeys.length === 0}
              >
                Approve ({selectedRowKeys?.length})
              </Button>
              <Button
                className="bg-red-500 ml-2 flex items-center flex-row hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md"
                onClick={handleReject}
                disabled={selectedRowKeys.length === 0}
              >
                Reject ({selectedRowKeys?.length})
              </Button>
            </div>
          </>
        )}
        expandable={{
          expandedRowKeys: expandedRowKeys,
          onExpand: async (expanded, record) => {
            console.log(record, expanded);
            if (expanded) {
              handleSearch()
              const vendorProduct = await getVendorChunkProducts(record.vendorid, 1, 10);
              setExpandedRowKeys([record.vendorid]);
              setVendorProducts({ [record.vendorid]: vendorProduct?.products || [] });
              setVendorTotalProducts({ [record.vendorid]: parseInt(vendorProduct?.totalProducts) || 0 });

            } else {
              // Collapse all rows
              setExpandedRowKeys([]);
              setVendorProducts({});
              setVendorTotalProducts(0);
            }
          },
          expandedRowRender: (record) => (
            <>
              <Table
                columns={columns.slice(1)} // Exclude the Vendor Name column
                dataSource={vendorProducts && vendorProducts[record.vendorid] || []}
                rowKey="productId"
                pagination={false}
              />
              <div className="p-5 flex justify-end">
                <Pagination
                  total={vendorTotalProducts[record.vendorid] || 0}
                  showSizeChanger
                  showQuickJumper
                  showTotal={(total) => `Total ${total} items`}
                  responsive={true}
                  onChange={async (page, pageSize) => {
                    if (searchTerm.trim() !== '') {
                      setPage(page)
                      setPageSize(pageSize)
                      handleSearch(page, pageSize)
                    } else {
                      setPage(page)
                      setPageSize(pageSize)
                      const vendorProduct = await getVendorChunkProducts(record.vendorid, page, pageSize);
                      setVendorProducts({ [record.vendorid]: vendorProduct?.products || [] });
                    }
                  }}
                />
              </div>
            </>
          ),
        }}
        rowKey="vendorid"
      />

      <div className="p-5 flex justify-center">
        <Pagination
          total={totalvendors || 0}
          showSizeChanger
          showQuickJumper
          current={vendorPage}
          showTotal={(total) => `Total ${total} items`}
          responsive={true}
          onChange={(page, pageSize) => {
            console.log(page, pageSize);
          }}
        />
      </div>

      <Modal
        title="Full Description"
        visible={modalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <p>{modalDescription}</p>
      </Modal>

      <Modal
        visible={vendorProfileModalVisible}
        onCancel={closeVendorProfileModal}
        footer={null}
        width={800}
        centered
      >
        {selectedVendor && <VendorProfileDetails vendor={selectedVendor} />}
      </Modal>

      <Modal
        title={`Reject Product- Id ${selectedProductId?.key}`}
        visible={RejectModal}
        onCancel={closeModal}
        onOk={handleModalOk}
        okText="Reject"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-red-500 hover:bg-red-700 text-white",
          disabled: rejectReason?.length < 25,
        }}
      >
        <div className="bg-white p-4 rounded-lg">
          <div className="flex items-center justify-center text-red-600 mb-4">
            <svg
              className="h-8 w-8 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p className="font-semibold">Confirm Product Rejection</p>
          </div>
          <p className="text-gray-800">
            You are about to reject the product{" "}
            <span className="text-red-500 font-semibold">
              "{selectedProductId?.ad_title}"
            </span>
            . This action can be undone if needed.
          </p>
          <div className="mt-4">
            <p className="mb-2 text-gray-800">
              Please provide a reason for rejecting the product (Min 25
              characters):
            </p>
            <Input.TextArea
              rows={4}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="bg-gray-100 text-gray-800 rounded p-2"
            />
            {rejectReason?.length < 25 && (
              <p className="text-red-500 text-sm mt-2">
                Minimum 25 characters required. <br />
                {25 - rejectReason?.length} characters left.
              </p>
            )}
          </div>
          <p className="mt-4 text-gray-600 text-sm">
            Providing a reason for rejection helps maintain transparency and
            communication with vendors. It also provides valuable feedback and
            allows vendors to understand the decision better.
          </p>
        </div>
      </Modal>

      <Modal
        title={`Approve Product - ID: ${selectedProductId?.uniquepid}`}
        visible={ApproveModal}
        onCancel={closeModal}
        onOk={handleApproveLogic}
        okText="Approve"
        cancelText="Cancel"
        okButtonProps={{
          className: "bg-green-500 hover:bg-green-700 text-white",
        }}
        width={600} // Adjust the width as needed
        centered // Center the modal vertically
      >
        <div>
          <p className="text-lg font-semibold">Product Information</p>
          <p className="text-gray-600 mb-4">
            Please review the product details before approving it.
          </p>

          {/* Display product details such as name, category, etc. */}
          <p>
            <strong>Product Name:</strong> {selectedProductId?.ad_title}
          </p>
          <p>
            <strong>Category:</strong> {selectedProductId?.category}
          </p>
          <p>
            <strong>Subcategory:</strong> {selectedProductId?.subcategory}
          </p>
          {/* Include more product details as needed */}
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">Terms and Conditions</p>
          <p className="text-gray-600 mb-4">
            By approving this product, you agree to the following terms and
            conditions:
          </p>

          <ul className="list-disc ml-8">
            <li>
              The product details and images provided by the vendor are accurate
              and valid.
            </li>
            <li>
              The product complies with all applicable regulations and laws.
            </li>
            {/* Add more terms and conditions as needed */}
          </ul>
        </div>

        <div className="mt-6">
          <p className="text-lg font-semibold">Key Notes</p>
          <p className="text-gray-600">
            Please keep the following key notes in mind while reviewing and
            approving the product:
          </p>

          <ul className="list-disc ml-8">
            <li>Ensure that the product images are clear and high-quality.</li>
            <li>
              Double-check the product description and specifications for
              accuracy.
            </li>
            <li>Verify the product pricing and currency.</li>
            <li>Confirm that the product is categorized accurately.</li>
            <li>
              Review the availability and shipping details provided by the
              vendor.
            </li>
          </ul>
        </div>
      </Modal>
    </div>
  );
};

export default AcceptReject;
