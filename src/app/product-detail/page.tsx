"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import { StarIcon } from "@heroicons/react/24/solid";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import { PRODUCTS } from "@/data/data";
import payment from "@/images/payment.png";
import security from "@/images/security.png";
import {
  NoSymbolIcon,
  ClockIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import IconDiscount from "@/components/IconDiscount";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import SectionSliderProductCard from "@/components/SectionSliderProductCard";
import detail1JPG from "@/images/products/detail1.jpg";
import detail2JPG from "@/images/products/detail2.jpg";
import detail3JPG from "@/images/products/detail3.jpg";
import Policy from "./Policy";
import ReviewItem from "@/components/ReviewItem";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import SectionPromo2 from "@/components/SectionPromo2";
import ModalViewAllReviews from "./ModalViewAllReviews";
import NotifyAddTocart from "@/components/NotifyAddTocart";
// import Image from "next/image";
import AccordionInfo from "@/components/AccordionInfo";
import { AdminUrl, HomeUrl } from "../layout";
import { useRouter, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/store";
import { addItem } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import Link from "next/link";
import AddToCartButton from "@/components/AddtoCart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/slices/wishlistSlice";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Heart,
  HelpCircle,
  Loader2Icon,
  LockKeyhole,
  MessageCircle,
  MessagesSquare,
  Minus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Image, Modal, Rate } from "antd";
import ProductSalebadge from "@/components/ProductSalebadge";
import SellerProfileProductPage from "@/components/SellerProfileProductPage";

const ProductDetailPage = ({ searchParams }) => {
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sellerProfile, setSellerProfile] = useState(null);

  const showDetailModal = () => {
    setIsDetailModalOpen(true);
  };

  const detailhandleOk = () => {
    setIsDetailModalOpen(false);
  };

  const detailhandleCancel = () => {
    setIsDetailModalOpen(false);
  };
  // console.log(isDetailModalOpen, "isDetailModalOpen");

  const [seeMore, setSeeMore] = useState(false);

  // Shipping Modal

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // -----------------

  const router = useRouter();
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id || null;

  const [variantActive, setVariantActive] = useState(0);
  // const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [sizeSelected, setSizeSelected] = useState("");
  const [qualitySelected, setQualitySelected] = useState(1);
  const [variantsWithArray, setVariantsWithArray] = useState(null);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [variantsData, setVariantsData] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [sellerId, setSellerId] = useState();
  const [singleData, setsingleData] = useState(responseData);
  const [selectedAttributes, setSelectedAttributes] = useState<null>(null); // Replace 'YourAttributeType' with the actual type
  const [selectLabel, setSelectLabel] = useState<string | null>(null);
  const [mrpData, setMrp] = useState<number | null>(null);
  const [sellingPriceData, setSellingPrice] = useState<number | null>(null);
  const [discountPercentage, setDiscountPercentage] = useState<number | null>(
    null
  );
  const [isUniquepidMatched, setisUniquepidMatched] = useState<boolean | null>(
    null
  );
  const [IsMatchedCartProduct, setIsMatchedCartProduct] = useState(null);
  const [inFavorite, setinFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const wishlistItems = useAppSelector((state) => state.wishlist.wishlistItems);
  const dispatch = useDispatch();

  // console.log(responseData, "FALAMAAAA");

  useEffect(() => {
    const handlePutRequest = async () => {
      try {
        const requestOptions = {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(searchParams),
        };

        const response = await fetch("/api/getproducts", requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        setResponseData(responseData?.product);
        console.log(responseData?.product, "RRRRRRRRRRRRRRRRRRRRR");

        setSellerId(responseData.product.vendorid);
        // console.log(sellerId, "SELLLERDATATATATATATAT");
      } catch (error) {
        console.error("Error processing request:", error);
        // Handle error gracefully
      }
    };

    handlePutRequest();
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getAllVendors accepts an ID parameter

        const response = await fetch(`/api/Vendors/getProfile`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ vendorid: sellerId }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, "SSSSSSSSSSSSSDATAA");
          setSellerProfile(data);
          // console.log(sellerProfile);

          // setIsLoading(false);
        } else {
          console.error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    sellerId && fetchData();
    // If you want to perform some action when singleVendors changes, do it here
  }, [sellerId]);

  useEffect(() => {
    // Check if there's an item in wishlistItems with a matching uniquepid
    const isFavorite = wishlistItems.some(
      (wish) => wish.uniquepid === responseData?.uniquepid
    );
    setinFavorite(isFavorite);
  }, [wishlistItems, responseData]);

  const handleToggleWishlist = useCallback(async () => {
    if (!customerId) return;
    setWishlistLoading(true);
    const { category, subcategory, uniquepid, vendorid } = responseData;
    const replacecategory = category.replace(/[^\w\s]/g, "").replace(/\s/g, "");
    const replacesubcategory = subcategory
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");
    const requestData = {
      customer_id: customerId,
      vendor_id: vendorid,
      uniquepid,
      category: replacecategory,
      subcategory: replacesubcategory,
      label: null,
      mrp: mrpData,
      sellingprice: sellingPriceData,
    };

    if (!inFavorite) {
      dispatch(addItemToWishlist({ ...responseData }));

      if (customerId) {
        try {
          // Make a POST request to your API endpoint for updating the cart
          const response = await fetch(`/api/wishlist/addWishlist`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          toast.success("Added to Wishlist");
          setWishlistLoading(false);

          setinFavorite(true);
        } catch (error) {
          console.error("Error updating wishlist:", error);
        }
      }
    } else {
      dispatch(removeItemFromWishlist({ ...responseData }));
      if (customerId) {
        try {
          // Make a POST request to your API endpoint for updating the wishlist
          const response = await fetch(`/api/wishlist/removeFromWishlist`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestData),
          });

          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }

          const responseData = await response.json();
          toast.success("Removed From Wishlist");
          setWishlistLoading(false);

          setinFavorite(false);
        } catch (error) {
          console.error("Error updating wishlist:", error);
        }
      }
    }
  }, [customerId, dispatch, inFavorite, responseData, setinFavorite]);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await fetch(
          `/api/variants/${responseData?.slug_cat}/${responseData?.slug_subcat}/${responseData?.uniquepid}`
        );
        const data = await response.json();

        setVariantsData(data?.variant);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    responseData?.isvariant === "Variant" && fetchVariants();
  }, [responseData]);

  useEffect(() => {
    // Create a new variants object
    if (!variantsWithArray) {
      const newVariantsWithArray =
        variantsData?.reduce((acc, variant) => {
          const variantsvaluesObj = variant?.variantsvalues
            ? JSON.parse(variant.variantsvalues)
            : {};

          // Initialize the accumulator if it doesn't exist
          if (!acc.variantsvalues) {
            acc.variantsvalues = {};
          }

          // Iterate over the attributes in variantsvaluesObj
          for (const attribute in variantsvaluesObj) {
            if (acc.variantsvalues.hasOwnProperty(attribute)) {
              // If the attribute already exists in the accumulator, push the value to the array
              acc.variantsvalues[attribute].push(variantsvaluesObj[attribute]);
            } else {
              // If the attribute doesn't exist in the accumulator, create a new array with the value
              acc.variantsvalues[attribute] = [variantsvaluesObj[attribute]];
            }
          }

          return acc;
        }, {}) || {};

      for (const attribute in newVariantsWithArray?.variantsvalues) {
        const valuesArray = newVariantsWithArray?.variantsvalues[attribute];
        newVariantsWithArray.variantsvalues[attribute] = [
          ...new Set(valuesArray),
        ];
      }

      // Check if newVariantsWithArray is not empty, null, or undefined before setting the state
      if (Object.keys(newVariantsWithArray).length > 0) {
        // Convert newVariantsWithArray.variantsvalues to an array of objects
        const variantsArray = Object.keys(
          newVariantsWithArray?.variantsvalues
        ).map((attribute) => ({
          attribute,
          values: newVariantsWithArray.variantsvalues[attribute],
        }));

        setVariantsWithArray(variantsArray);
      }
    }
  }, [variantsWithArray, variantsData]);

  useEffect(() => {
    if (variantsWithArray && variantsWithArray.length > 0) {
      // Initialize selectedAttributes with the first set of attribute values
      const initialSelectedAttributes = {};
      variantsWithArray.forEach((variant) => {
        initialSelectedAttributes[variant.attribute] = variant.values[0];
      });

      // Combine the selected attribute values into a single string
      const formattedSelection = Object.keys(initialSelectedAttributes)
        .map((attribute) => `${initialSelectedAttributes[attribute]}`)
        .join("/");

      // Find the variant with the matching label
      const selectedVariant = variantsData.find(
        (variant) => variant.label === formattedSelection
      );
      if (selectedVariant) {
        // Set the mrp and sellingprice based on the selected variant

        setMrp(selectedVariant.variant_mrp);
        setSellingPrice(selectedVariant.variant_sellingprice);
        setSelectLabel(selectedVariant?.label);
        setSizeSelected(selectedVariant.label);
        setsingleData({
          ...singleData,
          mrp: selectedVariant.variant_mrp,
          sellingprice: selectedVariant.variant_sellingprice,
          label: selectedVariant?.label,
        });
        const discountPercentage =
          ((selectedVariant.variant_mrp -
            selectedVariant.variant_sellingprice) /
            selectedVariant.variant_mrp) *
          100;
        setDiscountPercentage(discountPercentage); // Rounded to 2 decimal places
      } else {
        setMrp(responseData?.mrp);
        setSellingPrice(responseData.sellingprice);
      }
      setSelectedAttributes(initialSelectedAttributes);
    }
  }, [variantsWithArray]);

  useEffect(() => {
    const isUniquepidMatched = cartItems.some((cartItem) => {
      return cartItem.uniquepid === responseData?.uniquepid;
    });

    const matchedCartProduct = cartItems.find((cartItem) => {
      if (cartItem.uniquepid === responseData?.uniquepid) {
        if (cartItem?.label != null && cartItem?.label != undefined) {
          return (
            cartItem?.uniquepid === responseData?.uniquepid &&
            cartItem?.label === responseData?.label
          );
        }
        return cartItem?.uniquepid === responseData?.uniquepid;
      }
    });

    setisUniquepidMatched(isUniquepidMatched);
    setIsMatchedCartProduct(matchedCartProduct);
  }, [isUniquepidMatched, cartItems, responseData]);

  const handleAttributeSelect = (attribute: any, value: any) => {
    // Create a copy of the selectedAttributes
    let updatedSelectedAttributes = { ...selectedAttributes };
    if (Array.isArray(updatedSelectedAttributes)) {
      // If selectedAttributes is an array, find the index of the attribute and update its value
      const index = updatedSelectedAttributes.findIndex(
        (attr) => attr === attribute
      );

      if (index !== -1) {
        updatedSelectedAttributes[index + 1] = value; // Update the value at the next index
      } else {
        // If the attribute doesn't exist in the array, add it with the new value
        updatedSelectedAttributes.push(attribute, value);
      }
    } else {
      // If selectedAttributes is an object, update or add the attribute-value pair
      updatedSelectedAttributes[attribute] = value;
    }

    // Convert updatedSelectedAttributes to the desired format
    let formattedSelection = "";

    if (Array.isArray(updatedSelectedAttributes)) {
      formattedSelection = updatedSelectedAttributes
        .map((item, index) => (index % 2 === 0 ? `${item}/` : item))
        .join("");
    } else {
      formattedSelection = Object.keys(updatedSelectedAttributes)
        .map((key) => `${updatedSelectedAttributes[key]}`)
        .join("/");
    }

    // Set the updated selected attributes in the state
    setSelectedAttributes(updatedSelectedAttributes);
    // Compare formattedSelection with label in variantsData
    const selectedVariant =
      variantsData &&
      variantsData.find((variant) => variant.label === formattedSelection);

    if (selectedVariant) {
      // Retrieve mrp and sellingprice from the selected variant
      const { variant_mrp, variant_sellingprice, label } = selectedVariant;
      setMrp(variant_mrp);
      // singleData = {...singleData, mrp: variant_mrp}
      setSellingPrice(variant_sellingprice);
      setSelectLabel(label);
      setSizeSelected(label);

      setsingleData({
        ...singleData,
        mrp: variant_mrp,
        sellingprice: variant_sellingprice,
        label: label,
      });

      // Calculate the discount percentage
      const discountPercentage =
        ((variant_mrp - variant_sellingprice) / variant_mrp) * 100;
      setDiscountPercentage(discountPercentage); // Rounded to 2 decimal places
    } else {
    }
  };

  const renderVariants = () => {
    if (!variantsWithArray) {
      // Show skeleton skimmer placeholder when variants are not available yet
      return (
        <>
          <div className="h-8 w-48 bg-gray-300 animate-pulse mb-2"></div>
          <div className="h-10 w-80 bg-gray-300 animate-pulse"></div>
        </>
      );
    }

    return variantsWithArray.map((variant: any, index: any) => (
      <>
        <label htmlFor="">
          <span className="text-sm font-medium">
            {variant.attribute}:
            <span className="ml-1 font-semibold">
              {selectedAttributes?.[variant?.attribute]}
            </span>
          </span>
        </label>
        <div className="flex mt-3">
          {variant?.values?.map((item: any, itemvar: any) => (
            <div
              key={itemvar}
              onClick={() => {
                handleAttributeSelect(variant.attribute, item);
                setVariantActive(itemvar);
              }}
              className={`relative flex-1 max-w-[75px] h-10 rounded-full border-2 cursor-pointer ${
                variantActive === itemvar
                  ? "border-black/90 dark:border-white"
                  : "border-transparent"
              }`}
            >
              <div
                className={`absolute flex justify-center items-center inset-0.5 rounded-full overflow-hidden z-0 ${
                  variantActive === itemvar && "bg-black text-white"
                }`}
              >
                {item}
              </div>
            </div>
          ))}
        </div>
      </>
    ));
  };

  const renderSectionContent = () => {
    if (!responseData) {
      return (
        <>
          {/* <div className="h-2 w-full bg-gray-200 animate-pulse"></div>
        <div className="h-2 w-1/2 mt-2 bg-gray-200 animate-pulse"></div>
        <div className="h-full w-full mt-2 bg-gray-200 animate-pulse"></div> */}
          <div>
            <Skeleton className="w-full h-[32px] bg-gray-300 rounded-md" />
            <Skeleton className="w-[300px] mt-4 h-[32px] bg-gray-300 rounded-md" />
            <div className="flex justify-between">
              <Skeleton className="w-[130px] mt-4 h-[40px] bg-gray-300 rounded-full" />
              <Skeleton className="flex-1 ml-2 mt-4 h-[40px] bg-gray-300 rounded-full" />
            </div>
            <Skeleton className="w-full mt-4 h-[20vh] bg-gray-300 rounded-md" />
          </div>
        </>
      );
    }
    return (
      <div className="space-y-7 2xl:space-y-8">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-[1.2rem] tracking-normal">
            {responseData?.ad_title}
          </h2>

          <div className="flex items-center text-or mt-5 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={mrpData || responseData?.mrp}
              sellingprice={sellingPriceData || responseData?.sellingprice}
            />

            <div className="h-7 border-l border-gray-300 dark:border-gray-700"></div>

            <div className="flex items-center">
              <a
                href="#reviews"
                className="flex items-center text-sm font-medium"
              >
                <StarIcon className="w-5 h-5 pb-[1px] text-yellow-400" />
                <div className="ml-1.5 flex">
                  <span>4.9</span>
                  <span className="block mx-2">·</span>
                  <span className="text-gray-600 dark:text-gray-400 underline">
                    142 reviews
                  </span>
                </div>
              </a>
              <span className="hidden sm:block mx-2.5">·</span>
              <div className="hidden sm:flex items-center text-sm">
                <SparklesIcon className="w-3.5 h-3.5" />
                {/* <span className="ml-1 leading-none">{status}</span> */}
              </div>
            </div>
          </div>
        </div>

        <div>
          <ProductSalebadge
            bgImg={
              "https://aimg.kwcdn.com/upload_aimg/commodity/e4b8aee4-b205-4a0d-845e-62d36d532518.png?imageView2/2/w/800/q/70/format/webp"
            }
            dealimg={
              "https://aimg.kwcdn.com/upload_aimg/commodity/f8b09403-3868-4abf-9924-5eae97456cef.png?imageView2/2/w/800/q/70/format/webp"
            }
            label1={"Free shipping on all orders"}
            label2={"Time-Limited Offer"}
          />
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {responseData?.isvariant === "Variant" && (
          <div className="">{renderVariants()}</div>
        )}

        {/*  ---------- 4  QTY AND ADD TO CART BUTTON */}

        {isUniquepidMatched ? (
          <div className="flex space-x-3.5">
            {/* <div className="flex items-center justify-center bg-gray-100/70 dark:bg-gray-800/70 px-2 py-3 sm:p-3.5 rounded-full">
              <NcInputNumber
                defaultValue={
                  IsMatchedCartProduct && IsMatchedCartProduct.added_quantity
                }
                onChange={setQualitySelected}
              />
            </div> */}
            <ButtonPrimary className="flex-1 flex-shrink-0 bg-orange-600 hover:bg-orange-500">
              <Link href={"/cart"}>
                <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
                <span className="ml-3">View Cart</span>
              </Link>
            </ButtonPrimary>
          </div>
        ) : (
          <div className="flex space-x-3.5">
            <div className="flex items-center justify-center bg-gray-100/70 dark:bg-gray-800/70 px-2 py-3 sm:p-3.5 rounded-full transition-all duration-300">
              <NcInputNumber
                defaultValue={qualitySelected}
                onChange={setQualitySelected}
              />
            </div>
            <ButtonPrimary
              className="flex-1 flex-shrink-0 transition-all duration-300"
              onClick={notifyAddTocart}
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">Add to Cart</span>
            </ButtonPrimary>
          </div>
        )}

        {/*  */}
        <hr className=" 2xl:!my-10 border-gray-200 dark:border-gray-700"></hr>
        {/*  */}

        {/* ---------- 5 ----------  */}
        {/* <AccordionInfo /> */}

        {/* ---------- 6 ----------  */}
        {/* <div className="hidden xl:block">{<Policy />}</div> */}

        <div>
          <span
            className="flex items-center text-green-700 font-medium cursor-pointer"
            onClick={showModal}
          >
            <ShieldCheck size={20} className="mr-1" />
            Shopping security
            <ChevronRight size={20} className="mt-1" />
          </span>
          <div className="md:flex gap-5 mt-2 px-5 text-[0.9rem]">
            <span>
              <li>Safe Payment Options</li>
              <li>Secure privacy</li>
            </span>
            <span>
              <li>Secure logistics</li>
              <li>Purchase protections</li>
            </span>
          </div>
        </div>

        {/* Description */}

        <hr />

        <div>
          <h2 className="text-[1.3rem] font-medium">Description</h2>
          <p className="leading-normal mt-3 text-[1rem]">
            {responseData?.additionaldescription}
          </p>
        </div>

        <div className=" lg:hidden py-10">
          {/* <SellerProfileProductPage
            features={responseData?.attributes_specification}
            sellerid={sellerId}
          /> */}
          {renderSellerProfile()}
        </div>

        <Modal
          title="Shopping security"
          className="text-center text-lg"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={650}
        >
          <div className="text-left flex flex-col gap-2">
            <span className="flex items-center text-[1rem] text-green-700 font-medium">
              <ShieldCheck size={20} className="mr-1" />
              Safe Payment Options
            </span>
            <div className="md:px-5 flex flex-col gap-2 md:gap-2">
              <li className="list-disc">
                Nile is committed to protecting your payment information. We
                follow PCI DSS standards, use strong encryption, and perform
                regular reviews of its system to protect your privacy.
              </li>
              <h2>1. Payment methods</h2>
              {/* <img src={payment} /> */}
              <img src={payment.src} alt="website main logo" />
              <span className="flex text-gray-700 font-medium items-center underline">
                Learn more <ChevronRight size={15} className="mt-[2px]" />
              </span>
              <h2>2. Security certification</h2>
              <img src={security.src} alt="website main logo" />
            </div>

            <hr className="my-2" />

            <span className="flex items-center text-[1rem] text-green-700 font-medium">
              <Truck size={20} className="mr-1" />
              Secure logistics
            </span>
            <div className="md:px-5 flex flex-col gap-1 md:gap-2">
              <li className="list-disc">Delivery guaranteed</li>
              <span className="">Accurate and precise order tracking</span>
              <span className="flex text-gray-700 font-medium items-center underline">
                Check your order <ChevronRight size={15} className="mt-[2px]" />
              </span>
            </div>

            <hr className="my-2" />

            <span className="flex items-center text-[1rem] text-green-700 font-medium">
              <LockKeyhole size={20} className="mr-1" />
              Secure Privacy
            </span>
            <div className="md:px-5 flex flex-col gap-1 md:gap-2">
              <li className="list-disc">
                Protecting your privacy is important to us! Please be assured
                that your information will be kept secured and uncompromised. We
                do not sell your personal information for money and will only
                use your information in accordance with our privacy and cookie
                policy to provide and improve our services to you.
              </li>
              <span className="flex text-gray-700 font-medium items-center underline">
                Learn more <ChevronRight size={15} className="mt-[2px]" />
              </span>
            </div>

            <hr className="my-2" />

            <span className="flex items-center text-[1rem] text-green-700 font-medium">
              <ShieldCheck size={20} className="mr-1" />
              Purchase Protection
            </span>
            <div className="md:px-5 flex flex-col gap-1 md:gap-2">
              <li className="list-disc">
                Shop confidently on Nile knowing that if something goes wrong,
                we've always got your back.
              </li>
              <span className="flex text-gray-700 font-medium items-center underline">
                Learn more <ChevronRight size={15} className="mt-[2px]" />
              </span>
            </div>

            <hr className="my-2" />

            <span className="flex items-center text-[1rem] text-green-700 font-medium">
              <MessagesSquare size={20} className="mr-1" />
              Customer Service
            </span>
            <div className="md:px-5 flex flex-col gap-1 md:gap-2">
              <li className="list-disc">
                Our customer service team is always here if you need help.
              </li>
              <div className="w-full bg-blue-gray-50 flex items-center justify-around py-3 rounded-xl">
                <Link href={`${HomeUrl}/SupportCenter?query=BuyingOnNile`}>
                  <span className="flex flex-col items-center justify-center">
                    <HelpCircle />
                    FAQs
                  </span>
                </Link>
                <span className="flex flex-col items-center justify-center">
                  <MessageCircle />
                  Live chat
                </span>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Product Details</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p>
            The patented eighteen-inch hardwood Arrowhead deck --- finely
            mortised in, makes this the strongest and most rigid canoe ever
            built. You cannot buy a canoe that will afford greater satisfaction.
          </p>
          <p>
            The St. Louis Meramec Canoe Company was founded by Alfred Wickett in
            1922. Wickett had previously worked for the Old Town Canoe Co from
            1900 to 1914. Manufacturing of the classic wooden canoes in Valley
            Park, Missouri ceased in 1978.
          </p>
          <ul>
            <li>Regular fit, mid-weight t-shirt</li>
            <li>Natural color, 100% premium combed organic cotton</li>
            <li>
              Quality cotton grown without the use of herbicides or pesticides -
              GOTS certified
            </li>
            <li>Soft touch water based printed in the USA</li>
          </ul>
        </div>
      </div>
    );
  };

  const renderReviews = () => {
    return (
      <div className="" id="reviews">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold flex items-center">
          <StarIcon className="w-7 h-7 mb-0.5" />
          <span className="ml-1.5"> 4,87 · 142 Reviews</span>
        </h2>

        {/* comment */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-11 gap-x-28">
            <ReviewItem />
            <ReviewItem
              data={{
                comment: `I love the charcoal heavyweight hoodie. Still looks new after plenty of washes. 
                  If you’re unsure which hoodie to pick.`,
                date: "December 22, 2021",
                name: "Stiven Hokinhs",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `The quality and sizing mentioned were accurate and really happy with the purchase. Such a cozy and comfortable hoodie. 
                Now that it’s colder, my husband wears his all the time. I wear hoodies all the time. `,
                date: "August 15, 2022",
                name: "Gropishta keo",
                starPoint: 5,
              }}
            />
            <ReviewItem
              data={{
                comment: `Before buying this, I didn't really know how I would tell a "high quality" sweatshirt, but after opening, I was very impressed. 
                The material is super soft and comfortable and the sweatshirt also has a good weight to it.`,
                date: "December 12, 2022",
                name: "Dahon Stiven",
                starPoint: 5,
              }}
            />
          </div>

          <ButtonSecondary
            onClick={() => setIsOpenModalViewAllReviews(true)}
            className="mt-10 border border-gray-300 dark:border-gray-700 "
          >
            Show me all 142 reviews
          </ButtonSecondary>
        </div>
      </div>
    );
  };

  const renderSellerProfile = () => {
    return (
      <div>
        <div className="flex  items-center justify-start gap-3 md:gap-5">
          <div className="h-14 w-14 md:h-24 md:w-24  border-gray-200 border-2  rounded-full overflow-hidden">
            <img
              className="h-full w-full object-contain"
              src={
                sellerProfile &&
                sellerProfile.brand_logo &&
                sellerProfile.brand_logo.images[0]
                  ? `${`${AdminUrl}/uploads/vendorBrandLogo/${sellerProfile?.brand_logo?.images[0]}`}`
                  : "https://connectkaro.org/wp-content/uploads/2019/03/placeholder-profile-male-500x500.png"
              }
              alt={sellerProfile?.brand_name}
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="lg:flex items-center">
              <h2 className="text-lg md:text-2xl tracking-wide pr-2 font-medium line-clamp-1">
                {/* {singleVendors?.brand_name || "NA"} */}
                {sellerProfile?.brand_name || "NA"}
              </h2>
              <span
                onClick={() => setIsOpenModalViewAllReviews(true)}
                className="cursor-pointer"
              >
                4.8
                <Rate
                  allowHalf
                  disabled
                  defaultValue={4.9}
                  className="text-gray-900 text-sm md:text-lg ml-2"
                />
              </span>
            </div>

            <div className="flex items-center justify-start">
              <div className="flex gap-1 items-center">
                <h2 className="font-medium">
                  {sellerProfile?.followers || "NA"}
                </h2>
                <h3 className="text-gray-600 text-xs">Followers</h3>
              </div>

              <Minus className="rotate-90 text-gray-400" />

              <div className="flex gap-1 items-center">
                <h2 className="font-medium">
                  {sellerProfile?.total_sales || "NA"}
                </h2>
                <h3 className="text-gray-600 text-xs">Sold</h3>
              </div>

              <Minus className="rotate-90 text-gray-400" />

              <div className="flex items-center gap-1">
                <h2 className="font-medium">
                  {sellerProfile?.total_products || "NA"}
                </h2>
                <h3 className="text-gray-600 text-xs">Items</h3>
              </div>
            </div>

            <div className="flex gap-2 items-center ">
              <h2 className="w-[50%] flex gap-1 md:gap-2 items-center justify-center hover:text-red-600 transition-all ease-in-out border p-2 hover:border-red-900 border-gray-800 rounded-3xl">
                <Heart className="" size={16} />
                <p className="text-sm font-medium">Follow</p>
              </h2>
              <h2 className="w-[50%] flex gap-2 items-center justify-center hover:text-red-600 transition-all ease-in-out border p-2 hover:border-red-900 border-gray-800 rounded-3xl">
                <p className="text-sm font-medium">Shop all items</p>
              </h2>
            </div>
          </div>
        </div>

        <div className="pt-5 font-medium text-lg flex items-center justify-between">
          <h2 className="text-xl">Details</h2>
          <h2 className="flex text-sm items-center gap-1">
            Report this item
            <ChevronRight size={15} />
          </h2>
        </div>
        <div className="mt-2">
          <ul className="space-y-2">
            {Object.entries(responseData?.attributes_specification).map(
              ([key, value]) => (
                <li key={key} className="">
                  <span className="font-medium capitalize mr-2">{key}:</span>
                  {value || "NA"}
                </li>
              )
            )}
            <li
              className="flex gap-1 items-center cursor-pointer hover:underline"
              onClick={showDetailModal}
            >
              Seller information <ChevronRight size={20} />
            </li>
            <Modal
              title="Seller Information"
              open={isDetailModalOpen}
              onOk={detailhandleOk}
              onCancel={detailhandleCancel}
              footer={[
                <h1
                  onClick={detailhandleCancel}
                  className="cursor-pointer bg-orange-600 text-center mx-5 md:mx-10 rounded-full p-2 text-xl text-white font-medium"
                >
                  OK
                </h1>,
              ]}
            >
              <div>{sellerProfile?.vendorname}</div>
            </Modal>
          </ul>
        </div>
      </div>
    );
  };

  const notifyAddTocart = async () => {
    const updatedSingleData = {
      ...responseData,
      added_quantity: qualitySelected, // This adds the productToAdd object as a property of singleData
      mrp: mrpData || responseData?.mrp,
      sellingprice: sellingPriceData || responseData?.sellingprice,
      label: selectLabel, // Set the sellingprice value here
    };

    const replacecategory = responseData?.category
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");
    const replacesubcategory = responseData?.subcategory
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");

    if (customerId) {
      try {
        const requestData = {
          customer_id: customerId,
          vendor_id: responseData?.vendorid,
          product_uniqueid: responseData?.uniquepid,
          category: replacecategory,
          subcategory: replacesubcategory,
          variantlabel: selectLabel,
          mrp: mrpData || responseData?.mrp,
          sellingprice: sellingPriceData || responseData?.sellingprice,
          quantity: qualitySelected,
        };

        const response = await fetch(`/api/cart/addCarts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseDataResponse = await response.json();
        dispatch(addItem(updatedSingleData));
        setisUniquepidMatched(true);
      } catch (error) {
        console.error("Error updating cart:", error);
      }
    } else {
      dispatch(addItem(updatedSingleData));
    }

    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={`${AdminUrl}/uploads/UploadedProductsFromVendors/${responseData?.images?.[0]}`}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
          itemData={responseData}
          mrp={mrpData || responseData?.mrp}
          sellingPrice={sellingPriceData || responseData?.sellingprice}
        />
      ),
      { position: "bottom-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const ImageGallery = () => {
    if (!responseData) {
      return (
        <>
          <div className="flex gap-4 relative w-full">
            <div className="gap-2 flex flex-col w-[10%]">
              <Skeleton className="w-[50px] h-[50px] bg-gray-300 rounded-md" />
              <Skeleton className="w-[50px] h-[50px] bg-gray-300 rounded-md" />
              <Skeleton className="w-[50px] h-[50px] bg-gray-300 rounded-md" />
            </div>
            <div className="flex-1">
              <Skeleton className="w-full h-full bg-gray-300 rounded-md" />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        {/* PRODUCT GALLERY */}
        <div className="grid grid-cols-5 md:flex md:flex-col p-2 w-full md:w-[10%] h-auto scrollbar-hidden overflow-x-auto  md:overflow-y-auto mb-2">
          <>
            {responseData?.images?.map((image: string, index: number) => (
              <div
                key={index}
                className="h-18 mb-2 cursor-pointer"
                onMouseOver={() => setSelectedImage(image)}
              >
                <div className="w-full h-full p-1 md:aspect-w-1 md:aspect-h-1">
                  <img
                    sizes=""
                    src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${image}`}
                    className={`w-full rounded-xl object-contain transition duration-300 ${
                      selectedImage === image ? "ring-2 ring-primary" : ""
                    }`}
                    alt={`Product Detail ${index + 1}`}
                    loading="lazy" // Add the lazy loading attribute here
                  />
                </div>
              </div>
            ))}
          </>
        </div>

        {/* MAIN IMAGE */}
        <div className="flex-1">
          <div className="relative aspect-w-2 aspect-h-2 overflow-hidden">
            <Image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={`${AdminUrl}/uploads/UploadedProductsFromVendors/${
                selectedImage || responseData?.images?.[0]
              }`}
              className="w-full rounded-xl object-contain transition-transform duration-300 transform-gpu hover:scale-200 hover:transform-origin-center"
              alt="Main Product Image"
              loading="lazy"
            />
          </div>
          {/* <div className="hidden lg:block py-10">{renderSellerProfile()}</div> */}
          <div className="hidden lg:block py-10">
            {/* <SellerProfileProductPage
              features={responseData?.attributes_specification}
              sellerid={sellerId}
            /> */}
            {renderSellerProfile()}
          </div>
        </div>

        {/* LIKE BUTTON */}
        <div>
          {wishlistLoading ? (
            <div className="mt-2 w-9 h-9 flex items-center justify-center">
              <Loader2Icon className="animate-spin" />
            </div>
          ) : (
            <div className="mt-2" onClick={handleToggleWishlist}>
              <LikeButton liked={inFavorite} data="hey" />
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <div className={`nc-ProductDetailPage `}>
      {/* MAIn */}
      <main className="px-5 md:px-10 mt-5 lg:mt-11">
        <div className="lg:flex">
          {/* CONTENT */}
          <div className="flex flex-col-reverse md:flex-row w-full lg:w-[50%]">
            {ImageGallery()}
          </div>
          <div></div>
          {/* SIDEBAR */}
          <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
            {renderSectionContent()}
          </div>
        </div>

        {/* DETAIL AND REVIEW */}
        <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
          <div className="block xl:hidden">{/* <Policy /> */}</div>
          {/* {renderDetailSection()} */}
          <hr className="border-gray-200 dark:border-gray-700" />
          {renderReviews()}
          <hr className="border-gray-200 dark:border-gray-700" />
          {/* OTHER SECTION */}
          <SectionSliderProductCard
            heading="Customers also purchased"
            subHeading=""
            headingFontClassName="text-2xl font-semibold"
            headingClassName="mb-40 text-neutral-900 dark:text-neutral-50"
          />
          <div className="py-5">
            {/* <SectionPromo2 /> */}
            {/* {renderSellerProfile()} */}
          </div>
        </div>
      </main>

      {/* MODAL VIEW ALL REVIEW */}
      <ModalViewAllReviews
        show={isOpenModalViewAllReviews}
        onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
