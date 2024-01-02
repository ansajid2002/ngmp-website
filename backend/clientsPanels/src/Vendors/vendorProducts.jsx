import { useEffect, useState, useCallback, useMemo } from "react";

import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Space,
  Steps,
  Tabs,
  Tooltip,
  Image,
  Checkbox,
  Tag,
  Card,
  InputNumber,
  AutoComplete,
  Typography,
  Pagination,
  Popconfirm,
} from "antd";

const { Step } = Steps;

import { NavLink } from "react-router-dom";
import { AdminUrl, fetchVariantProducts } from "../Admin/constant";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import Swal from "sweetalert2";
import {
  ExclamationCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { IoMdClose } from "react-icons/io";
import { ProductImage } from "./components/ProductImage";
import AuthCheck from "./components/AuthCheck";
import VariantsCrud from "./VariantCrud";
import axios from "axios";
import { commonFormFields } from "./constants/ProductsForm/CommonFields";
import { speicificationFields } from "./constants/ProductsForm/Specifications";
import { RiInformationFill } from "react-icons/ri";

const { TabPane } = Tabs;

const overlayStyles = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000, // Adjust as needed
};

const VendorProducts = ({ vendorDatastate }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);
  const [SelectedUniqueId, setSelectedUniqueId] = useState(null);
  const [products, setProducts] = useState([]);
  const [changeSubcatTabs, setchangeSubcatTabs] = useState("all"); // Separate state for the second set of tabs
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedCategoryType, setSelectedCategoryType] = useState("Products");
  const [formValues, setFormValues] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [subcatNameBackend, setsubcatNameBackend] = useState("all");
  const [catSubcatDisable, setcatSubcatDisable] = useState(false);
  const [variantAddModal, setvariantAddModal] = useState(false);
  const [selectRowProduct, setselectRowProduct] = useState([]);
  const [UploadImages, setUploadImages] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loader
  const [ProductVariantType, setProductVariantType] = useState("Simple");
  const [FilteredVariantData, setFilteredVariantData] = useState([]);
  const [variantData, setVariants] = useState([]);
  const [variantsValueArray, setVariantsValueArray] = useState([]);
  const [variantsFetchFinal, setvariantsFetchFinal] = useState([]);
  const [VariantModalShow, setVariantModalShow] = useState(false);
  const [RowVariants, setRowVariants] = useState([]);
  const [Allproducts, setAllProducts] = useState([]);
  const [SubcategoryCount, setSubcategoryCount] = useState(null);
  const [totalProduct, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [VariantsEdit, setVariantsEditModal] = useState(false);
  const [downloadcsvloader, setdownloadcsvloader] = useState(null)
  const [conditionToggle, setConditionToggle] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const handleConditionChange = (value) => {
    setConditionToggle(value);
  };
  console.log(conditionToggle,additionalInfo,'conditionToggle');

  const handleAdditionalInfoChange = (e) => {
    setAdditionalInfo(`${e.target.value}`
     
    );
  };
  const id = vendorDatastate?.[0].id;

  const [locationData, setLocationData] = useState({
    city: "",
    state: "",
    country: "",
    postalcode: "",
  });
  const [locationRetrieved, setLocationRetrieved] = useState(false);

  // import { RiShieldCrossFill } from 'react-icons/ri';
  const callVendorProducts = useCallback(
    async (updatedImages) => {
      const controller = new AbortController();
      const signal = controller.signal;

      try {
        const response = await fetch(`${AdminUrl}/api/allVendorProducts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, subcatNameBackend, page, pageSize }),
          signal, // Pass the signal to the fetch call
        });

        if (response.ok) {
          // Handle successful response
          const data = await response.json();
          const products = data.products.map((item) => {
            // Spread the properties of attributes_specification into the main object
            return {
              ...item,
              ...item.attributes_specification,
            };
          });
          setProducts(products);
          setTotalCount(data?.total || 0);
          setAllProducts(products);
          if (updatedImages !== undefined) setUploadImages(updatedImages);
        } else {
          // Handle error response
          console.error("Error fetching vendor products:", response.statusText);
          setProducts([]);
        }
      } catch (error) {
        // Handle error
        if (error.name === "AbortError") {
          // Handle cancellation
          console.log("API request canceled");
        } else {
          console.error("Error fetching vendor products:", error);
        }
      }
    },
    [id, subcatNameBackend, setProducts, setUploadImages, page, pageSize]
  );

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    callVendorProducts(UploadImages);

    return () => {
      // Cleanup function to abort the fetch when the component unmounts
      controller.abort();
    };
  }, [callVendorProducts, UploadImages, id, subcatNameBackend]);


  useEffect(() => {
    const fetchSubcategorywithCount = async () => {
      try {
        if (!id) return
        const response = await fetch(`${AdminUrl}/api/getSubcategoryofProductExists?id=${id}`);

        if (response.ok) {
          const dataResponse = await response.json()
          setSubcategoryCount(dataResponse);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchSubcategorywithCount()
  }, [id])
  // Use useMemo to create a memoized version of products for improved performance
  const memoizedProducts = useMemo(() => {
    // Perform any additional memoization logic if needed
    return products;
  }, [products]);

  useEffect(() => {
    fetchVariantProducts()
      .then((variantProducts) => {
        setvariantsFetchFinal(variantProducts);
        // Filter the fetched variant products based on SelectedUniqueId
        const filteredData = variantProducts.filter(
          (item) => parseInt(item.product_uniqueid, 10) === SelectedUniqueId
        );

        // Convert the filtered data to the desired format
        const formattedData = filteredData.map((item) => {
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
        setVariantsValueArray(variantsValueArray);
        // Now, set the formatted data in the state variable setFilteredVariantData
        setFilteredVariantData(formattedData);
      })
      .catch((error) => {
        // Handle fetch errors here
        console.log(error);
      });
  }, [SelectedUniqueId]);

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
    // setSelectedCategory(
    //   selectedCategory
    //     ? selectedCategory.category_name
    //         .replace(/[^\w\s]/g, "")
    //         .replace(/\s/g, "")
    //     : ""
    // );
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

  // Filter subcategories based on the selected category ID
  useEffect(() => {
    // Check if 'categories' and 'subcategories' are empty
    const categoriesEmpty = categories === null || categories.length === 0;
    const subcategoriesEmpty = subcategories.length === 0;

    // Fetch data only if both 'categories' and 'subcategories' are empty
    if (categoriesEmpty || subcategoriesEmpty) {
      callVendorProducts();
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

  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async () => {
    try {
      await form.validateFields();
      await formitem.validateFields();

      if (currentStep < steps.length - 1) {
        if (currentStep === 2) {
          if (selectedCurrency === "Select Currency") {
            // Show a currency error message
            showError("Currency Error", "Please select a valid currency!");
            return;
          }

          if (
            ProductVariantType === "Variant" &&
            FilteredVariantData.length === 0
          ) {
            // Show a variants error message
            showError("Variants Error", "Please add at least one variant!");
            return;
          }
        }

        setCurrentStep(currentStep + 1);
        form.submit();
      }
    } catch (error) {
      // Handle validation errors if any
      console.error("Validation Error:", error);
    }
  };

  const showError = (title, text) => {
    Swal.fire({
      icon: "error",
      title,
      text,
    });
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRowSelect = (selectedId) => {
    if (selectedRowKeys.includes(selectedId)) {
      setSelectedRowKeys(selectedRowKeys.filter((id) => id !== selectedId));
    } else {
      setSelectedRowKeys([...selectedRowKeys, selectedId]);
    }
  };

  const handleSelectAllRows = () => {
    if (selectedRowKeys.length === memoizedProducts.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(memoizedProducts.map((product) => product.id));
    }
  };

  const statusMap = {
    0: "Pending",
    1: "Approved",
    2: "Rejected",
    3: "Sold",
  };

  const allBrandValues = Array.from(
    new Set(memoizedProducts.map((item) => item.brand))
  );
  const allConditionValues = Array.from(
    new Set(memoizedProducts.map((item) => item.condition))
  );

  // Get all unique category and subcategory values from the dataSource
  const allCategoryValues = Array.from(
    new Set(memoizedProducts.map((item) => item.category))
  );
  const allSubcategoryValues = Array.from(
    new Set(memoizedProducts.map((item) => item.subcategory))
  );

  // All Columns
  const columns = [
    {
      title: "",
      key: "select_all",
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={() => handleRowSelect(record.id)}
        />
      ),
    },
    {
      title: "SKUID",
      dataIndex: "skuid",
      key: "skuid",
      render: (skuid, record) => {
        // Check if the product is a variant
        if (record.isvariant === "Variant") {
          // Filter variantsFetchFinal based on SelectedUniqueid
          const filteredVariants = variantsFetchFinal.filter(
            (variant) =>
              parseInt(variant.product_uniqueid, 10) === record.uniquepid
          );

          return (
            <>
              <p>
                {filteredVariants.length} Variants{" "}
                <Button
                  type="link"
                  onClick={() =>
                    handleVariantShowModal(record.uniquepid, filteredVariants)
                  }
                >
                  Show
                </Button>
              </p>
            </>
          );
        } else {
          return skuid; // Render the SKUID as it is for non-variant products
        }
      },
    },

    {
      title: "PRODUCT NAME",
      dataIndex: "ad_title",
      key: "ad_title",
      render: (ad_title) => (
        <Tooltip title={ad_title}>
          <div
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {ad_title}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "DESCRIPTION",
      dataIndex: "additionaldescription",
      key: "additionaldescription",
      render: (additionaldescription, record) => (
        <Tooltip title={additionaldescription}>
          <div
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {additionaldescription}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "IMAGES",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div>
          <Image.PreviewGroup>
            {images?.slice(0, 2).map((image, index) => (
              <Image
                key={index}
                src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${image}`}
                alt="Product Image"
                width={50}
                height={50}
                className="border rounded-full p-1 "
              />
            ))}
          </Image.PreviewGroup>
          {images?.length > 2 && (
            <Button
              className="text-sm border border-b-4"
              onClick={() => handleViewImages(images)}
            >
              View All {images?.length} Images
            </Button>
          )}
        </div>
      ),
    },
    {
      title: "PRICE",
      dataIndex: "mrp",
      key: "mrp",
      width: 200,
      render: (mrp, record) => {
        if (record.isvariant === "Variant") {
          const filteredVariants = variantsFetchFinal
            .filter(
              (variant) =>
                parseInt(variant.product_uniqueid) === record.uniquepid
            )
            .sort(
              (a, b) =>
                parseFloat(a?.variant_sellingprice) -
                parseFloat(b?.variant_sellingprice)
            );
          return (
            <Tooltip
              title={`${record.currency_symbol} ${filteredVariants[0]?.variant_sellingprice
                } -  ${record.currency_symbol} ${filteredVariants[filteredVariants.length - 1]
                  ?.variant_sellingprice
                }`}
            >
              <div className="w-[150px]">
                <span className="font-semibold text-[12px]">
                  {record.currency_symbol}{" "}
                  {filteredVariants[0]?.variant_sellingprice}
                </span>
                <span> - </span>
                <span className="font-medium">
                  {record.currency_symbol}{" "}
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
              title={`${record.currency_symbol} MRP: ${mrp} - Selling Price: ${record.currency_symbol} ${record.sellingprice}`}
            >
              <div className="w-[150px]">
                <span className="font-medium">
                  SP: {record.currency_symbol} {record.sellingprice}
                </span>
              </div>
            </Tooltip>
          );
        }
      },
      sorter: (a, b) => parseFloat(a.mrp) - parseFloat(b.mrp),
    },
    {
      title: "BRAND",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
      render: (brand) => <Tooltip title={brand}>{brand}</Tooltip>,
      filters: allBrandValues.map((brand) => ({
        text: brand,
        value: brand,
      })),
      onFilter: (value, record) => record.brand === value,
    },
    {
      title: "CONDITION",
      dataIndex: "condition",
      key: "condition",
      onFilter: (value, record) => record.condition === value,
      sorter: (a, b) => a.condition.localeCompare(b.condition),
      render: (condition) => <Tooltip title={condition}>{condition}</Tooltip>,
      filters: allConditionValues.map((condition) => ({
        text: condition,
        value: condition,
      })),
    },
    {
      title: "COUNTRY",
      dataIndex: "country",
      key: "country",
      render: (country) => (
        <Tooltip title={country}>
          <div
            style={{
              maxWidth: "150px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {country}
          </div>
        </Tooltip>
      ),
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",

      filters: allCategoryValues.map((category) => ({
        text: category,
        value: category,
      })),
      onFilter: (value, record) => record.category === value,
    },
    {
      title: "SUBCATEGORY",
      dataIndex: "subcategory",
      key: "subcategory",
      filters: allSubcategoryValues.map((subcategory) => ({
        text: subcategory,
        value: subcategory,
      })),
      onFilter: (value, record) => record.subcategory === value,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        let icon, color;
        switch (status) {
          case 0:
            icon = <FiClock className="text-orange-500" />;
            color = "text-orange-500";
            break;
          case 1:
            icon = <FiCheckCircle className="text-green-500" />;
            color = "text-green-500";
            break;
          case 2:
            icon = <FiCheckCircle className="text-red-500" />;
            color = "text-red-500";
            break;
          case 3:
            icon = <FiCheckCircle className="text-green-500" />;
            color = "text-green-500";
            break;
          case 4:
            icon = <FiAlertCircle className="text-red-500" />;
            color = "text-red-500";
            break;
          default:
            icon = <FiClock className="text-gray-500" />;
            color = "text-gray-500";
        }
        let content = (
          <span className={`flex items-center ${color}`}>
            {icon}
            <span className="ml-1">{statusMap[status]}</span>
          </span>
        );

        if (status === 4 && record.rejection_reason) {
          content = (
            <Tooltip title={`Reason: ${record.rejection_reason}`}>
              {content}
            </Tooltip>
          );
        }

        return content;
      },
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (record) => {
        if (record.status === 4) {
          return <span className="text-red-500">Rejected</span>;
        }

        return (
          <Space size="middle" className="flex">
            <FiEdit3
              onClick={() => handleUpdate(record.id, record.uniquepid)}
              className="text-white w-8 h-8 p-2 rounded-full bg-green-500 border-none hover:bg-green-600 hover:text-white"
            />
            <FiTrash2
              onClick={() => handleDelete(record.id, record.ad_title)}
              className="text-white w-8 h-8 p-2 rounded-full bg-red-500 border-none hover:bg-red-600 hover:text-white"
            />
          </Space>
        );
      },
    },
  ];

  const handleVariantShowModal = (id, variants) => {
    setRowVariants(variants);
    setVariantModalShow(true);
  };

  const handleViewImages = (images) => {
    Modal.info({
      title: "All Images",
      width: 800,
      content: (
        <div className="grid grid-cols-2 gap-4">
          {images?.map((image) => (
            <div key={image} className="w-[350px] p-2 border">
              <Image
                key={image}
                src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${image}`}
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

  const handleTabChangeforTable = (key, subcatname) => {
    setPage(1)
    setPageSize(10)
    setchangeSubcatTabs(key);
    setSelectedRowKeys([]);
    setsubcatNameBackend(subcatname?.replace(/[\s'"]/g, ""));
  };

  const [form] = Form.useForm();
  const [formitem] = Form.useForm();
  useEffect(() => {
    if (!locationRetrieved && "geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (success) => {
          const { latitude, longitude } = success.coords;

          try {
            // Use Nominatim API to get address details
            const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

            const response = await axios.get(url);
            const data = response.data;

            if (data) {
              const { city, state, country, postcode } = data.address;
              setLocationData({
                city: data?.state_district,
                state,
                country,
                postcode,
              });
              form.setFieldsValue({
                city: data?.state_district,
                state,
                countryoforigin: country,
                country,
                postcode,
              });
              setLocationRetrieved(true);
            }
          } catch (error) {
            console.error("Error getting address:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else if (!locationRetrieved) {
      console.error("Geolocation is not available in this browser.");
    }
  }, [locationData, locationRetrieved, form]);

  function handleCreate() {
    form.resetFields();
    setCurrentStep(0);
    form.setFieldsValue({ locationData });
    form.setFieldsValue({ countryoforigin: locationData.country });

    setModalVisible(true);
    setcatSubcatDisable(false);
    setUploadImages([]);
    setSelectedKey(null);
    setSelectedCategoryId(null);
    // setSelectedCategory("");
    setSelectedSubcategory("");
    setSelectedCurrency("USD");
    setProductVariantType("Simple");
    setSelectedUniqueId(null);
    setFilteredVariantData([]);
    setVariants([]);
    setVariantsValueArray([]);
  }

  function handleUpdate(key, uid) {
    callVendorProducts();
    setSelectedKey(key);
    setSelectedUniqueId(uid);
    setCurrentStep(0);
    const selectedRow = products.find((item) => {
      return item.id === key;
    });
    setProductVariantType(selectedRow?.isvariant);
    setselectRowProduct(selectedRow);
    form.setFieldsValue(selectedRow);
    setSelectedCategoryId(selectedRow?.category);

    setSelectedSubcategory(
      selectedRow?.subcategory?.replace(/[^\w\s]/g, "").replace(/\s/g, "")
    );
    setSelectedCurrency(selectedRow?.currency_symbol);
    setUploadImages(selectedRow?.images);
    setcatSubcatDisable(true);
    setModalVisible(true);
  }

  function handleDelete(key, title) {
    const confirmModal = Modal.confirm({
      title: `Confirm Delete `,
      icon: <ExclamationCircleOutlined />,
      content: `Are you sure you want to delete - ${title}?`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          const response = await fetch(`${AdminUrl}/api/DeleteVendorProduct`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ subcatNameBackend, key }), // Send the subcatNameBackend in the request body
          });

          if (response.ok) {
            message.success("Item deleted successfully");
            setProducts(memoizedProducts.filter((item) => item.id !== key));
          } else {
            // Handle error response
            const errorData = await response.json();
            console.error("Error deleting item:", errorData.message);
          }
        } catch (error) {
          // Handle network or other errors
          console.error("Error deleting item:", error);
        }
      },
      onCancel() {
        // Do nothing if cancelled
        confirmModal.destroy();
      },
    });
  }

  const handleFormSubmit = async () => {
    try {
      // Validate the form fields before submitting
      await form.validateFields();

      // Submit the form
      form.submit();
    } catch (error) {
      // Handle form validation errors or any other submission errors
      console.error("Form submission failed:", error);
    }
  };

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 22,
    },
  };

  const onFinish = async (values) => {
    try {
      const vendorId = vendorDatastate[0].id;
      // Update the status value to 0
      // Check if an object with the same name already exists
      values.condition = `${conditionToggle},${additionalInfo}`
      console.log(values,"vlaues from onfinsih");
      values.status = 0;
      const existingIndex = formValues.findIndex(
        (item) => item.name === values.name
      );

      // Create a copy of the existing state
      const updatedFormValues = [...formValues];


      if (existingIndex !== -1) {
        // Update the value if the object already exists
        updatedFormValues[existingIndex] = {
          ...updatedFormValues[existingIndex],
          ...values,
          selectedCurrency,
          selectedKey,
          selectedCategoryType,
          SelectedUniqueId,
          FilteredVariantData,
          ProductVariantType,
        };
      } else {
        // Add a new object to the array if it doesn't exist
        updatedFormValues.push({
          ...values,
          selectedCurrency,
          vendorId,
          selectedKey,
          locationData,
          selectedCategoryType,
          SelectedUniqueId,
          FilteredVariantData,
          ProductVariantType,
        });
      }

      // Update the state with the modified copy
      setFormValues(updatedFormValues);
      // Check if selectedKey is not null
      if (currentStep === 3) {
        if (selectedKey == null) {
          // Send the data to the backend for updating
          try {
            const response = await fetch(`${AdminUrl}/api/addVendorProduct`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedFormValues),
            });

            // Handle the server response
            if (!response.ok) {
              // Handle the server response error
              throw new Error(
                `Server error: ${response.status} ${response.statusText}`
              );
            }

            // Assuming the backend response contains a success flag and the product data
            const responseData = await response.json();
            const id = responseData?.resp.id;
            const uniquepid = responseData?.resp.uniquepid;
            setSelectedKey(id);
            setSelectedUniqueId(uniquepid)
          } catch (error) {
            setCurrentStep(2);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error,
            });
            console.error("Error during form submission:", error);
          }
        } else {
          // Send the data to the backend for adding a new record
          const response = await fetch(`${AdminUrl}/api/updateVendorProduct`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFormValues),
          });

          // Handle the server response
          if (!response.ok) {
            // Handle the server response error
            throw new Error(
              `Server error: ${response.status} ${response.statusText}`
            );
          }

          // Assuming the backend response contains a success flag
          const responseData = await response.json();
        }
      }

      if (currentStep === 4) {
        if (selectedKey === null) {
          // Handle the case where selectedKey is null
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Your ID is not valid. Please try reloading the page after selecting a valid key.",
          });
        } else {

          try {
            // Send the data to the backend for adding a new record
            const response = await fetch(
              `${AdminUrl}/api/updateProductSpecifications`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ values, selectedKey }),
              }
            );

            // Handle the server response
            if (!response.ok) {
              // Handle the server response error
              throw new Error(
                `Server error: ${response.status} ${response.statusText}`
              );
            }

            // Assuming the backend response contains a success flag
            const responseData = await response.json();

            if (responseData.success) {
              // Display success message using Swal
              message.success("Product Updated");
            } else {
              // Display an error message using Swal if the update was not successful
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update product specifications. Please try again.",
              });
            }
          } catch (error) {
            // Handle any unexpected errors
            console.error("Error updating product specifications:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An unexpected error occurred. Please try again later.",
            });
          }
        }
      }
    } catch (error) {
      console.error("Form submission error:", error);
      // Handle error (e.g.,deleteProducts show error message, revert state, etc.)
      // ...
    }
  };

  const handleVariantChange = (value) => {
    setProductVariantType(value);
    value === "Variant" ? setvariantAddModal(true) : setvariantAddModal(false);
  };

  const categoryFormMap = {
    Products: (
      <>
        {/* Add Form.Item components for Smartphone details here */}
        <Form
          {...layout}
          onFinish={onFinish}
          form={form}
          className="custom-form  h-[80vh] overflow-hidden overflow-y-scroll"
        >
          {commonFormFields.map((field, index) => (
            <Form.Item
              key={index}
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              {field.children ? (
                field.children.map((childField, childIndex) => (
                  <>
                    <Tooltip title={childField.notes} className="mt-2 w-6">
                      <Typography>
                        <RiInformationFill />
                      </Typography>
                    </Tooltip>
                    <Form.Item
                      key={childIndex}
                      label={childField.label}
                      name={childField.name}
                      rules={childField.rules}
                    >
                      {childField.component}
                    </Form.Item>
                  </>
                ))
              ) : (
                <>
                  <Tooltip title={field.notes} className="mt-2 w-6">
                    <Typography>
                      <RiInformationFill />
                    </Typography>
                  </Tooltip>
                  <Form.Item
                    key={index}
                    // label={field.label}
                    name={field.name}
                    rules={field.rules}
                  >
                    {field.component}
                  </Form.Item>
                </>
              )}
            </Form.Item>
          ))}

          <Form.Item
        label="Condition"
        name="condition"
        rules={[
          {
            required: true,
            message: 'Please select a Condition',
          },
        ]}
      >
        <Select onChange={handleConditionChange}>
          <Select.Option value="New">New</Select.Option>
          <Select.Option value="Refurbished">Refurbished</Select.Option>
          <Select.Option value="Used">Used</Select.Option>
        </Select>
      </Form.Item>

      {conditionToggle === 'Used' && (
        <Form.Item label="Additional Information">
          <Input value={additionalInfo} onChange={handleAdditionalInfoChange} />
        </Form.Item>
      )}
          <Form.Item
            label="Product Type"
            name="productType"
            rules={[
              {
                required: true,
                message: "Please select a Product Type!",
              },
            ]}
            initialValue={ProductVariantType}
          >
            <Select
              value={ProductVariantType}
              onChange={handleVariantChange}
              disabled={selectedKey !== null}
            >
              <Select.Option value="Simple">Simple Product</Select.Option>
              <Select.Option value="Variant">Variant Product</Select.Option>
            </Select>
          </Form.Item>

          {ProductVariantType === "Simple" ? (
            <>
              {/* Input fields for Simple Product */}
              <Form.Item
                label="MRP"
                name="mrp"
                className="col-span-1"
                rules={[
                  {
                    required: true,
                    message: "Price is required",
                  },
                ]}
              >
                <InputNumber name="mrp" />
              </Form.Item>

              <Form.Item
                label="Selling Price"
                name="sellingprice"
                className="col-span-1"
                rules={[
                  {
                    required: true,
                    message: "Selling Price is required",
                  },

                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                label="SKU"
                name="skuid"
                className="col-span-1"
                rules={[
                  {
                    required: true,
                    message: "SKU is required",
                  },
                  {
                    pattern: /^[a-zA-Z0-9-_]*$/,
                    message:
                      "Invalid SKU format. Only letters, numbers, hyphens, and underscores are allowed.",
                  },
                  // Add more validation rules as needed
                ]}
              >
                <Input name="sku" />
              </Form.Item>

              <Form.Item
                label="Quantity"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Quantity is required",
                  },
                  {
                    type: "number",
                    min: 1,
                    message: "Quantity must be at least 1",
                  },
                ]}
              >
                <InputNumber name="quantity" />
              </Form.Item>
            </>
          ) : ProductVariantType === "Variant" ? (
            <Space size={16} wrap>
              {FilteredVariantData?.map((item, index) => (
                <Card
                  key={index}
                  title={item.label}
                  extra={
                    <Space>
                      <EditOutlined onClick={() => setvariantAddModal(true)} />
                    </Space>
                  }
                  style={{ width: 300 }}
                >
                  <p>Price: {item.price}</p>
                  <p>Selling Price: {item.sellingPrice}</p>
                  <p>SKU: {item.sku}</p>
                  <p>Quantity: {item.quantity}</p>
                  {/* You can display additional fields or values here */}
                </Card>
              ))}
            </Space>
          ) : null}
        </Form>
      </>
    ),
    // Add other categories here
  };

  const handleCategoryTypeSelection = (categoryType) => {
    setSelectedCategoryType(categoryType);
    setFilteredSubcategories([]);
  };

  const handleRemoveImage = async (image, key, index) => {
    try {
      const response = await fetch(`${AdminUrl}/api/removeImage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subcategory: subcatNameBackend, // Send subcategory information
          productId: key, // Send the ID of the product
          imageIndex: index, // Send the index of the image to remove
        }),
      });

      if (!response.ok) {
        // Handle the server response error
        throw new Error(
          `Server error: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();

      // Assuming the backend response contains updated images
      if (responseData.status === 200) {
        // Update the state with the new images
        setUploadImages(responseData.updatedImages);
        message.success("Image Deleted Successfully");
        callVendorProducts();
      } else {
        // Handle the error case
        console.error("Error removing image:", responseData.message);
      }
    } catch (error) {
      console.error("Remove image error:", error);
    }
  };

  const getFieldsByCategory = (category) => {
    const selectedCategory = speicificationFields.find(
      (spec) => spec.category === category
    );
    return selectedCategory ? selectedCategory.fields : [];
  };

  const fields = getFieldsByCategory(selectedSubcategory);

  const steps = [
    {
      title: `Category Type `,
      content: (
        <div>
          <div className="flex justify-center flex-col h-96 items-center">
            <h1 className="text-xl sm:text-2xl font-bold tracking-[2px] mb-8 text-center">
              Choose Category Type
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`cursor-pointer rounded-lg p-4 ${selectedCategoryType === "Products"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100"
                  }`}
                onClick={() => handleCategoryTypeSelection("Products")}
              >
                <div className="flex items-center justify-center mb-4">
                  <CheckCircleIcon
                    className={`h-8 w-8 ${selectedCategoryType === "Products"
                      ? "text-white"
                      : "text-indigo-500"
                      }`}
                  />
                </div>
                <div className="text-center text-lg font-semibold">
                  Products
                </div>
              </div>
              <div
                className={`cursor-pointer rounded-lg p-4 ${selectedCategoryType === "Services"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100"
                  }`}
                onClick={() => handleCategoryTypeSelection("Services")}
              >
                <div className="flex items-center justify-center mb-4">
                  <CheckCircleIcon
                    className={`h-8 w-8 ${selectedCategoryType === "Services"
                      ? "text-white"
                      : "text-indigo-500"
                      }`}
                  />
                </div>
                <div className="text-center text-lg font-semibold">
                  Services
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: `Select Category`,
      content: (
        <Form onFinish={onFinish} form={form}>
          <div className="grid grid-col-1 sm:grid-cols-2 gap-4">
            <div className="flex justify-between items-center">
              <label htmlFor="category" className="mr-4 mb-5">
                Category:
              </label>
              <Form.Item
                name="category"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please select the product category!",
                  },
                ]}
              >
                <Select
                  id="category"
                  placeholder="Select category"
                  className="w-full"
                  onChange={(category) => handleCategoryChange(category)}
                  disabled={catSubcatDisable}
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
              </Form.Item>
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="subcategory" className="mr-4 mb-5">
                Subcategory:
              </label>
              <Form.Item
                name="subcategory"
                className="w-full"
                rules={[
                  {
                    required: true,
                    message: "Please select the product subcategory!",
                  },
                ]}
              >
                <Select
                  id="subcategory"
                  placeholder="Select subcategory"
                  className="w-full"
                  onChange={(subcategory) =>
                    handleSubcategoryChange(subcategory)
                  }
                  value={selectedSubcategory || undefined}
                  disabled={catSubcatDisable}
                  allowClear // Add this prop to enable clearing the selected value
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
              </Form.Item>
            </div>
          </div>
        </Form>
      ),
    },
    {
      title: "Product Details",
      content: <>{categoryFormMap[selectedCategoryType]}</>,
    },
    {
      title: "Specifications",
      content: (
        <>
          <Form
            name="form"
            form={form}
            onFinish={onFinish}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 32 }}
            className="h-[80vh] overflow-hidden overflow-y-auto"
          >
            {fields.map((field, index) => (
              <Form.Item
                key={field.name}
                name={field.name}
                label={field.label}
                rules={field.rules}
              >
                {field.type === "text" && <Input />}
                {field.type === "number" && <InputNumber />}
                {field.type === "textarea" && <Input.TextArea />}
                {field.type === "select" && (
                  <Select>
                    {field.options.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
            ))}
            <Form.List name="specificaitons">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "label"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing label",
                          },
                        ]}
                      >
                        <Input placeholder="label" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "Value"]}
                        rules={[
                          {
                            required: true,
                            message: "Missing value",
                          },
                        ]}
                      >
                        <Input placeholder="Value" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className="flex justify-center items-center"
                    >
                      Add More
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </>
      ),
    },
    {
      title: "Upload Your Photos",
      content: (
        <>
          <ProductImage
            formValues={formValues}
            selectRowProduct={selectRowProduct}
            callVendorProducts={callVendorProducts}
            handlNext={handleNext}
            selectedKey={selectedKey}
          />
        </>
      ),
    },
    {
      title: "Uploaded Images",
      content: (
        <>
          {
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Uploaded Images</h3>
              <div className="grid grid-cols-3 gap-12 mt-4">
                {UploadImages?.map((image, index) => (
                  <div
                    key={image}
                    className="relative group overflow-hidden rounded-lg bg-gray-100 p-3 border border-gray-300 shadow-md transition-transform transform hover:scale-105  flex items-center justify-center"
                  >
                    <div className="aspect-w-1 aspect-h-1">
                      <img
                        src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${image}`}
                        alt="Product Image"
                        className="object-cover"
                      />
                    </div>
                    <button
                      className="absolute top-2 right-2 p-1 rounded-full bg-white bg-opacity-75 hover:bg-opacity-100 transition"
                      onClick={() =>
                        handleRemoveImage(image, selectedKey, index)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="h-4 w-4 text-red-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          }
        </>
      ),
    },
  ];




  const handleDeleteSelected = async () => {
    try {
      // Implement your API call here to delete selected products
      const response = await fetch(`${AdminUrl}/api/deleteProducts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productIds: selectedRowKeys,
          subcatNameBackend,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        console.error("Backend error:", responseData.error);
        message.error("Error deleting products. " + responseData.error);
        return;
      }

      // Successful deletion
      // Update the products list by filtering out the deleted products
      setProducts(
        memoizedProducts.filter(
          (product) => !selectedRowKeys.includes(product.id)
        )
      );

      // Clear the selectedRowKeys array
      setSelectedRowKeys([]);
      callVendorProducts()

      message.success("Selected products deleted successfully.");
    } catch (error) {
      console.error("Error deleting products:", error);
      message.error("Error deleting products. Please try again later.");
    }
  };


  const handleDownloadcsv = async (type) => {
    if (type === 'all') {
      setdownloadcsvloader('all')
    }
    else {
      setdownloadcsvloader("single")
    }
    try {

      const datatoSendSelected = {
        productIds: selectedRowKeys,
        subcatNameBackend,
      }


      // Implement your API call here to download CSV data
      const response = await fetch(`${AdminUrl}/api/downloadcsv`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(type === 'all' ? { id } : datatoSendSelected),
      });

      if (response.ok) {
        // Get the response text directly as a blob
        const csvBlob = await response.blob();

        // Create a temporary URL to trigger download
        const downloadUrl = window.URL.createObjectURL(csvBlob);

        // Create a temporary anchor element
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "downloadedData.csv";

        // Simulate click on the link to trigger the download
        downloadLink.click();

        // Clean up: remove the temporary URL and anchor element
        window.URL.revokeObjectURL(downloadUrl);
        downloadLink.remove();

      } else {
        const responseData = await response.text();
        console.error("Backend error:", responseData);
        message.error("Error downloading CSV: " + responseData);


      }
    } catch (error) {
      console.error("Error downloading CSV:", error);
      message.error("Error downloading CSV. Please try again later.");
    }
    finally {
      setdownloadcsvloader(null)
    }
  };


  const removeDuplicatesAndKeepLast = (data) => {
    // Create an object to store the last inserted item for each unique key
    const uniqueItems = {};

    // Iterate over the data array and keep only the last inserted item for each key
    data.forEach((item) => {
      uniqueItems[item.label] = item;
    });

    // Convert the unique items object back to an array
    const uniqueData = Object.values(uniqueItems);

    return uniqueData;
  };

  const handleVariantsData = (data, variants) => {
    // Convert the "variants" data to the desired format
    const formattedVariants = variants.map((variant) =>
      Object.values(variant).join("/")
    );

    // Remove duplicates and keep the last inserted data based on the "label" key
    const uniqueData = removeDuplicatesAndKeepLast(data);

    // Filter the uniqueData array based on the formatted variants
    const filteredData = uniqueData.filter((item) =>
      formattedVariants.includes(item.label)
    );

    setFilteredVariantData(filteredData);
    setVariants(variants);
    // Now, you have filteredData with duplicates removed and only the last inserted data for each label
    // console.log("Received data from VariantsCrud (filtered):", filteredData);

    // handleVariantOk();
    // You can update your state with filteredData here if needed
  };

  const handleVariantCancel = (getdata) => {
    setvariantAddModal(false);
    console.log(getdata);
  };

  const handleVariantOk = () => {
    setvariantAddModal(false);
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearchSubmit = (value) => {
    if (value.toLowerCase() === "all products") {
      // Handle the case where "All Products" is selected
      // For example, return all products or perform the desired action.
      // You can set the active tab to 0 (the first tab) to display all products.
      setchangeSubcatTabs("all");
      handleTabChangeforTable("all", "all");
    } else {
      // Loop through your subcategories to find a match based on the search query
      const matchingSubcategoryIndex = subcategories.findIndex(
        (subcat) =>
          subcat.subcategory_name.toLowerCase() === value.toLowerCase()
      );

      // If a match is found, set the active tab to the matching subcategory
      if (matchingSubcategoryIndex !== -1) {
        setchangeSubcatTabs(matchingSubcategoryIndex.toString());
        handleTabChangeforTable(
          matchingSubcategoryIndex.toString(),
          value?.replace(/[\s'"]/g, "")
        );
      }
    }
  };

  const handleInputChange = (value) => {
    setSearchQuery(value);
    if (value.length >= 3) {
      // Filter subcategories based on the input value
      const matchingSubcategories = subcategories.filter((subcat) =>
        subcat.subcategory_name.toLowerCase().includes(value.toLowerCase())
      );

      // Check if "All Products" should be included
      if (
        !matchingSubcategories.some(
          (subcat) => subcat.subcategory_name === "All Products"
        )
      ) {
        matchingSubcategories.push({ subcategory_name: "All Products" });
      }

      setSuggestions(
        matchingSubcategories.map((subcat) => subcat.subcategory_name)
      );
    } else {
      setSuggestions([]);
    }
  };

  const onChange = (value) => {
    selectedKey && setCurrentStep(value);
  };
  const handleDeleteVariants = async (record) => {
    try {
      const responseData = await fetch(`${AdminUrl}/api/deleteVariant`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: record.variant_id })
      })

      if (responseData.ok) {
        await responseData.json()
        const updatedRowVariant = RowVariants.filter((item) => item.variant_id != record.variant_id)
        const variantsFetchFinalUpdated = variantsFetchFinal.filter((item) => item.variant_id != record.variant_id)
        setRowVariants(updatedRowVariant)
        setvariantsFetchFinal(variantsFetchFinalUpdated)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleFinishVariantEdit = async (values) => {
    form.validateFields(values).then(async res => {
      try {
        const updateResponse = await fetch(`${AdminUrl}/api/updateEditVariant`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res)
        });

        if (updateResponse.ok) {
          // Handle successful update
          const updatedRowIndex = RowVariants.findIndex((item) => item.variant_id === res.variant_id);
          const variantsFetchFinalIndex = variantsFetchFinal.findIndex((item) => item.variant_id === res.variant_id);
          if (updatedRowIndex !== -1 || variantsFetchFinalIndex !== -1) {
            const updatedRowVariant = {
              ...RowVariants[updatedRowIndex],
              variant_mrp: res.variant_mrp,
              variant_sellingprice: res.variant_sellingprice,
              variant_skuid: res.variant_skuid,
              variant_quantity: res.variant_quantity,
            };

            const updatedRowVariantsFetchFinal = {
              ...variantsFetchFinal[variantsFetchFinalIndex],
              variant_mrp: res.variant_mrp,
              variant_sellingprice: res.variant_sellingprice,
              variant_skuid: res.variant_skuid,
              variant_quantity: res.variant_quantity,
            };

            const updatedRowVariants = [...RowVariants];
            const updatedRowVariantsFetchFinals = [...variantsFetchFinal];
            updatedRowVariants[updatedRowIndex] = updatedRowVariant;
            updatedRowVariantsFetchFinals[variantsFetchFinalIndex] = updatedRowVariantsFetchFinal;
            setRowVariants(updatedRowVariants);
            setvariantsFetchFinal(updatedRowVariantsFetchFinals);
          }

          setVariantsEditModal(false);
        } else {
          // Handle non-OK response (e.g., 400 Bad Request)
          const errorData = await updateResponse.json();
          console.error(`Update failed: ${errorData.error}`);
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: errorData.error,
          });
        }

      } catch (error) {
        // Handle fetch or other unexpected errors
        console.error("An error occurred:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred. Please try again.',
        });
      }
    }).catch(validationError => {
      // Handle form validation errors
      console.error("Form validation failed:", validationError);
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields correctly.',
      });
    });
  };

  return vendorDatastate && vendorDatastate.length > 0 ? (
    <>
      {!vendorDatastate?.[0].email_verification_status ||
        // !vendorDatastate?.[0].mobile_verification_status ||
        vendorDatastate?.[0].status === 1 ? (
        <AuthCheck vendorDatastate={vendorDatastate} />
      ) : (
        <>
          <div className="lg:flex items-start lg:space-x-6 ">
            <div>
              <h1 className=" text-xl sm:text-2xl lg:text-4xl text-gray-700 font-bold mb-2">
                All Products ({totalProduct})
              </h1>
              <nav
                aria-label="Breadcrumbs"
                className="order-first flex text-base font-semibold sm:space-x-2 mx-2 mb-2"
              >
                <NavLink to={`${AdminUrl}`}>
                  <a
                    href=""
                    className="hover:text-slate-600 hidden text-slate-500 sm:block"
                  >
                    Home
                  </a>
                </NavLink>

                <div
                  aria-hidden="true"
                  className="hidden select-none text-slate-400 sm:block"
                >
                  /
                </div>
                <p className="text-slate-500 hover:text-slate-600">
                  Manage All Products{" "}
                </p>
              </nav>
              {/* <button onClick={() => handleDownloadcsv('all')}>Download csv (All Products)</button> */}
              <Button loading={downloadcsvloader === "all" && true}
                className="bg-green-500 flex items-center flex-row hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md"
                onClick={() => handleDownloadcsv('all')}
              // onClick={handleDeleteSelected}
              >Download csv ({totalProduct})
              </Button>

            </div>
            <div className="lg:flex justify-center border-none items-center mt-3 lg:mt-0 p-1">
              <AutoComplete
                value={searchQuery}
                onChange={(value) => handleInputChange(value)}
                onSelect={(value) => handleSearchSubmit(value)}
                allowClear
                className="w-full sm:w-72 xl:w-96  border ring-0"
                placeholder="Search Subcategory"
                options={suggestions.map((suggestion) => ({
                  value: suggestion,
                }))}
              />
            </div>
            <button
              onClick={handleCreate}
              className="bg-[#EC642A] hover:bg-[#EC642A]/80 text-white rounded-full p-0.5 sm:p-1 lg:p-2  absolute right-4 sm:right-10 top-28 sm:top-28"
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
          </div>

          {
            <>

              <div className="overflow-auto mt-4 border-none
               ">

                <div className="">
                  <Tabs
                    defaultActiveKey="all"
                    activeKey={changeSubcatTabs}
                    onChange={async (selectedTabKey) => {
                      const selectedSubcategory =
                        selectedTabKey != "all"
                          ? SubcategoryCount[selectedTabKey]?.subcategory
                          : "all";

                      try {
                        // After pre-load, update the active tab
                        handleTabChangeforTable(
                          selectedTabKey,
                          selectedSubcategory
                        );
                      } catch (error) {
                        console.error("Error during preloading:", error);
                      }
                    }}
                    centered={subcategories.length <= 4} // Center the tabs when there are 4 or fewer tabs
                    scrollable={subcategories.length > 4} // Enable scrolling when there are more than 4 tabs
                  >
                    {/* Add an "All Products" tab */}
                    <TabPane
                      tab={`All Products (${totalProduct})`}
                      key="all"
                    >
                      <div className="h-[60vh] bg-white  overflow-auto">
                        <Table
                          columns={columns}
                          dataSource={memoizedProducts}
                          pagination={false}
                          rowClassName={(record) =>
                            selectedRowKeys.includes(record.id)
                              ? "selected-row"
                              : ""
                          }
                          title={() => (
                            <>
                              <div className="flex items-center">
                                <Checkbox
                                  checked={
                                    selectedRowKeys.length ===
                                    memoizedProducts.length
                                  }
                                  indeterminate={
                                    selectedRowKeys.length > 0 &&
                                    selectedRowKeys.length <
                                    memoizedProducts.length
                                  }
                                  onChange={handleSelectAllRows}
                                >
                                  Select All
                                </Checkbox>
                                <div className="flex items-center space-x-2">

                                  <Button
                                    className="bg-red-500 flex items-center flex-row hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md"
                                    onClick={handleDeleteSelected}
                                    disabled={selectedRowKeys.length === 0}
                                  >
                                    Delete ({selectedRowKeys?.length})
                                  </Button>
                                  <Button loading={downloadcsvloader === "single" && true}
                                    className="bg-green-500 flex items-center flex-row hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md"
                                    onClick={() => handleDownloadcsv()}
                                    // onClick={handleDeleteSelected}
                                    disabled={selectedRowKeys.length === 0}
                                  >
                                    Download CSV ({selectedRowKeys?.length})
                                  </Button>
                                </div>
                              </div>
                            </>
                          )}
                        />
                      </div>
                      <div className="p-2 py-5 flex justify-end sticky top-0">
                        <Pagination
                          total={totalProduct}
                          showSizeChanger
                          showQuickJumper
                          defaultCurrent={2}
                          current={page}
                          showTotal={(total) => `Total ${total} items`}
                          responsive={true}
                          onChange={(page, pageSize) => {
                            setPage(page)
                            setPageSize(pageSize)
                          }}
                        />
                      </div>
                    </TabPane>

                    {SubcategoryCount && SubcategoryCount.map((subcat, index) => {
                      // Check if matchingProducts have at least one product
                      if (SubcategoryCount.length > 0) {
                        return (
                          <TabPane
                            tab={`${subcat.subcategory} (${subcat.total_products})`}
                            key={index}
                          >
                            <div className="h-[60vh]  overflow-auto">
                              <Table
                                columns={columns}
                                dataSource={memoizedProducts}
                                pagination={false}
                                rowClassName={(record) =>
                                  selectedRowKeys.includes(record.id) ? "selected-row" : ""
                                }
                                title={() => (
                                  <>
                                    <div className="flex items-center ">
                                      <Checkbox
                                        checked={
                                          selectedRowKeys.length === memoizedProducts.length
                                        }
                                        indeterminate={
                                          selectedRowKeys.length > 0 &&
                                          selectedRowKeys.length <
                                          memoizedProducts.length
                                        }
                                        onChange={handleSelectAllRows}
                                      >
                                        Select All
                                      </Checkbox>
                                      <div className="flex items-center space-x-2">

                                        <Button
                                          className="bg-red-500 flex items-center flex-row hover:bg-red-600 text-white px-4 py-2 rounded-full shadow-md"
                                          onClick={handleDeleteSelected}
                                          disabled={selectedRowKeys.length === 0}
                                        >
                                          Delete ({selectedRowKeys?.length})
                                        </Button>
                                        <Button loading={downloadcsvloader === "single" && true}
                                          className="bg-green-500 flex items-center flex-row hover:bg-green-600 text-white px-4 py-2 rounded-full shadow-md"
                                          onClick={() => handleDownloadcsv()}
                                          // onClick={handleDeleteSelected}
                                          disabled={selectedRowKeys.length === 0}
                                        >
                                          Download CSV ({selectedRowKeys?.length})
                                        </Button>
                                      </div>
                                    </div>
                                  </>
                                )}
                                className="w-full "
                              />
                            </div>
                            <div className="p-2 py-5 flex justify-end">
                              <Pagination
                                total={subcat?.total_products || 0}
                                showSizeChanger
                                showQuickJumper
                                current={page}
                                showTotal={(total) => `Total ${total} items`}
                                responsive={true}
                                onChange={(page, pageSize) => {
                                  setPage(page)
                                  setPageSize(pageSize)
                                }}
                              />
                            </div>
                          </TabPane>
                        );
                      } else {
                        // If matchingProducts have no products, don't render TabPane
                        return null;
                      }
                    })}

                  </Tabs>
                </div>
                {isLoading && (
                  <div style={overlayStyles}>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span class="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
              </div>

              <Modal
                title={
                  selectedKey === null ? "Create Product's" : "Update Product's"
                }
                visible={modalVisible}
                onOk={handleFormSubmit}
                onCancel={() => {
                  form.resetFields();
                  setModalVisible(false);
                  setFilteredVariantData([]);
                  setProductVariantType(null);
                  setVariants([]);
                  setVariantsValueArray([]);
                  setSelectedUniqueId(null);
                  window.location.href = "/Vendors/products/all";
                }}
                footer={null}
                maskClosable={false}
                okButtonProps={{
                  style: {
                    backgroundColor: "#1677FF",
                    color: "#fff",
                  },
                }}
                width="100vw"
                style={{
                  top: 0,
                  right: 0,
                  margin: 0,
                  padding: 0,
                  borderRadius: 0,
                  boxShadow: "0 0 0 rgba(0, 0, 0, 0)", // Remove shadow
                }}
                bodyStyle={{
                  margin: 0,
                  padding: 0,
                  height: "calc(100vh - 108px)",
                  borderRadius: 0,
                  boxShadow: "0 0 0 rgba(0, 0, 0, 0)", // Remove shadow
                }}
                maskStyle={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                className="rounded-none absolute p-0"
              >
                <Steps current={currentStep} onChange={onChange}>
                  {steps.map((step) => (
                    <Step key={step.title} title={step.title} />
                  ))}
                </Steps>
                <div className="mt-10">
                  <Form
                    name="product_adding_form"
                    onFinish={onFinish}
                    form={form}
                  >
                    {steps[currentStep].content}
                    {/* Add a button for the previous step */}
                    <div className="flex justify-end items-center gap-4 w-full border-t sticky bottom-0 bg-white py-5">
                      {currentStep > 0 && (
                        <Form.Item className="animate__animated animate__fadeInLeft animate__faster">
                          <Button
                            onClick={handlePrev}
                            className="border-none"
                            style={{ zIndex: 1 }} // Add z-index to prioritize this button
                          >
                            Previous
                          </Button>
                        </Form.Item>
                      )}
                      {currentStep < steps.length - 1 && (
                        <Form.Item>
                          <Button
                            onClick={handleNext}
                            size="large"
                            spellCheck="true"
                            className="border-none text-sm w-full bg-blue-500 text-white !hover:text-white"
                            style={{ zIndex: 2 }} // Add higher z-index to prioritize this button
                          >
                            Next
                          </Button>
                        </Form.Item>
                      )}
                      {currentStep === steps.length - 1 && (
                        <Form.Item>
                          <Button
                            onClick={() => window.location.href = "/Vendors/products/all"
                            }
                            className="transition-all items-center flex duration-200 ease-in-out  bg-red-500 hover:bg-red-600 hover:text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transform hover:scale-110 hover:rotate-3 text-white"
                            icon={<IoMdClose className="text-white" />}
                            style={{ zIndex: 2 }} // Add higher z-index to prioritize this button
                          >
                            Close
                          </Button>
                        </Form.Item>
                      )}
                    </div>
                  </Form>
                </div>
              </Modal>

              <Modal
                title={SelectedUniqueId ? "Edit Variants" : "Add Variants"}
                visible={variantAddModal}
                width={800}
                confirmLoading={isLoading} // Set isLoading to true when you want to show loading
                onOk={() => {
                  if (
                    FilteredVariantData.length === 0 &&
                    variantData.length === 0
                  ) {
                    // Prevent action when both arrays are empty
                    return;
                  }

                  // Set isLoading to true when "OK" button is clicked
                  setIsLoading(true);

                  // Simulate an async action (you can replace this with your actual logic)
                  setTimeout(() => {
                    // After your async action is complete, set isLoading back to false
                    setIsLoading(false);

                    // Handle "OK" action here
                    handleVariantOk();
                  }, 2000); // Replace 2000 with your desired loading duration
                }}
                onCancel={handleVariantCancel}
                okButtonProps={{
                  disabled:
                    FilteredVariantData.length !== variantData.length ||
                    (FilteredVariantData.length === 0 &&
                      variantData.length === 0),
                  style: {
                    backgroundColor: "#1890ff",
                    color: "#fff",
                  },
                }}
                cancelButtonProps={{
                  style: {
                    backgroundColor: "#ccc",
                    color: "#333",
                  },
                }}
              >
                <VariantsCrud
                  selectedSubcategory={selectedSubcategory}
                  vendorDatastate={vendorDatastate}
                  onSave={handleVariantsData}
                  // handleVariantOk={handleVariantOk}
                  variantsValueArray={variantsValueArray}
                  FilteredVariantData={FilteredVariantData}
                  SelectedUniqueId={SelectedUniqueId}
                  onCancel={handleVariantCancel}
                />
              </Modal>

              <Modal
                title="View Variants"
                visible={VariantModalShow}
                onCancel={() => setVariantModalShow(false)}
                width={1000} // Adjust the width as needed
                footer={[
                  <Button
                    key="close"
                    onClick={() => setVariantModalShow(false)}
                  >
                    Close
                  </Button>,
                ]}
              >
                <div className="w-full overflow-auto h-[60vh]">
                  <Table
                    dataSource={RowVariants}
                    rowKey="variant_id"
                    pagination={false}
                    columns={[
                      {
                        title: "Variant ID",
                        dataIndex: "variant_id",
                        width: 50
                      },
                      {
                        title: "Product Unique ID",
                        dataIndex: "product_uniqueid",
                        width: 100
                      },
                      {
                        title: "MRP",
                        dataIndex: "variant_mrp",
                      },
                      {
                        title: "Selling Price",
                        dataIndex: "variant_sellingprice",
                      },
                      {
                        title: "SKUID",
                        dataIndex: "variant_skuid",
                        width: 100

                      },
                      {
                        title: "Quantity",
                        dataIndex: "variant_quantity",
                      },
                      {
                        title: "Label",
                        dataIndex: "label",
                      },

                      {
                        title: "Variants Values",
                        dataIndex: "variantsvalues",
                        render: (variantsvalues) => {
                          const values = JSON.parse(variantsvalues);
                          return (
                            <ul>
                              {Object.entries(values).map(([key, value]) => (
                                <li key={key}>
                                  <strong>{key}:</strong> {value}
                                </li>
                              ))}
                            </ul>
                          );
                        },

                      },
                      {
                        title: 'Actions',
                        dataIndex: 'actions',
                        width: 200,

                        render: (_, record) => (
                          <>
                            <Button type="danger" onClick={() => {
                              setVariantsEditModal(true)
                              form.setFieldsValue(record);
                            }}
                              className="text-blue-500"
                            >
                              Edit
                            </Button>
                            <Popconfirm
                              title="Are you sure to delete this variant?"
                              onConfirm={() => handleDeleteVariants(record)}
                              okButtonProps={{ style: { background: 'red' } }}
                            >
                              <Button type="danger" className="text-red-500">Delete</Button>
                            </Popconfirm>

                          </>
                        ),
                      },
                    ]}
                  />
                </div>

                <Modal
                  open={VariantsEdit}
                  onCancel={() => setVariantsEditModal(false)}
                  okButtonProps={{ style: { background: 'blue' } }}
                  okText={'SAVE'}
                  onOk={handleFinishVariantEdit}

                >
                  <Form
                    form={form}
                    className="grid grid-cols-2 gap-4"
                    onFinish={handleFinishVariantEdit}
                  >
                    <Form.Item
                      label="Id"
                      name="variant_id"
                      className="col-span-1"
                      hidden
                    >
                      <InputNumber name="variant_id" />
                    </Form.Item>

                    <Form.Item
                      label="Price"
                      name="variant_mrp"
                      className="col-span-1"
                      rules={[
                        {
                          required: true,
                          message: "Price is required",
                        },
                      ]}
                    >
                      <InputNumber name="price" />
                    </Form.Item>

                    <Form.Item
                      label="Selling Price"
                      name="variant_sellingprice"
                      className="col-span-1"
                      rules={[
                        {
                          required: true,
                          message: "Selling Price is required",
                        },
                      ]}
                    >
                      <InputNumber name="variant_sellingprice" />
                    </Form.Item>

                    <Form.Item
                      label="SKU"
                      name="variant_skuid"
                      className="col-span-1"
                      rules={[
                        {
                          required: true,
                          message: "SKU is required",
                        },
                      ]}
                    >
                      <Input name="sku" />
                    </Form.Item>

                    <Form.Item
                      label="Quantity"
                      name="variant_quantity"
                      rules={[
                        {
                          required: true,
                          message: "Quantity is required",
                        },
                        {
                          type: "number",
                          min: 1,
                          message: "Quantity must be at least 1",
                        },
                      ]}
                    >
                      <InputNumber name="quantity" />
                    </Form.Item>


                  </Form>
                </Modal>
              </Modal>
            </>
          }
        </>
      )}
    </>
  ) : (
    ""
  );
};

export default VendorProducts;
