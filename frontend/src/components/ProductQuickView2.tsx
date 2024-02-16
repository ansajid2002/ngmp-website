"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import LikeButton from "@/components/LikeButton";
import BagIcon from "@/components/BagIcon";
import NcInputNumber from "@/components/NcInputNumber";
import Prices from "@/components/Prices";
import toast from "react-hot-toast";
import NotifyAddTocart from "./NotifyAddTocart";
// import Image from "next/image";
import { Image, Rate } from "antd";
import Link from "next/link";
import { AdminUrl, ProductImageUrl } from "@/app/layout";
import { useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/cartSlice";
import { ChevronRight, Loader2Icon } from "lucide-react";
import ProductSalebadge from "./ProductSalebadge";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "@/redux/slices/wishlistSlice";
import { useTranslation } from "react-i18next";

export interface ProductQuickView2Props {
  className?: string;
  item?: any;
}

const ProductQuickView2: FC<ProductQuickView2Props> = ({
  className = "",
  item,
}) => {
  // const LIST_IMAGES_DEMO = [detail1JPG, detail2JPG, detail3JPG];

  const [inFavorite, setinFavorite] = useState(false);
  const [shippingRate, setShippingrate] = useState(0);
  const { wishlistItems } = useAppSelector((store) => store.wishlist);
  console.log(item, "whole ittem🐱‍🏍");

  useEffect(() => {
    // Check if there's an item in wishlistItems with a matching uniquepid
    const isFavorite =
      wishlistItems &&
      wishlistItems?.some(
        (wish) => wish.uniquepid.toString() === item.uniquepid.toString()
      );
    // Set the result in inFavorite state
    setinFavorite(isFavorite);
  }, [wishlistItems]);

  const {
    ad_title,
    somali_ad_title,
    sellingprice,
    images,
    mrp,
    uniquepid,
    isvariant,
    prod_slug,
    slug_subcat,
    slug_cat,
    additionaldescription,
    somali_additionaldescription,
    quantity,
    mogadishudistrict_ship_from,
    vendorInfo = {}
  } = item;
  const company_district = vendorInfo?.company_district

  const [variantActive, setVariantActive] = useState(0);
  // const [sizeSelected, setSizeSelected] = useState(sizes ? sizes[0] : "");
  const [sizeSelected, setSizeSelected] = useState("");
  const [qualitySelected, setQualitySelected] = useState(1);
  const [variantsWithArray, setVariantsWithArray] = useState(null);
  const [variantsData, setVariantsData] = useState(null);
  const { t } = useTranslation()
  const [selectedAttributes, setSelectedAttributes] = useState<null>(null); // Replace 'YourAttributeType' with the actual type
  const [selectLabel, setSelectLabel] = useState<string | null>(item?.label);
  const [mrpData, setMrp] = useState<number | null>(mrp);
  const [sellingPriceData, setSellingPrice] = useState<number | null>(
    sellingprice
  );
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [discountPercentage, setDiscountPercentage] = useState<number | null>(
    ((mrp - sellingprice) / mrp) * 100
  );
  const [singleData, setsingleData] = useState(item);
  const [loader, setLoader] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images?.[0]);
  const [isUniquepidMatched, setisUniquepidMatched] = useState<boolean | null>(
    null
  );
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const { languageCode } = useAppSelector((store => store.languagesReducer))
  const customerData = useAppSelector((state) => state.customerData);
  const customerId = customerData?.customerData?.customer_id || null;

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await fetch(
          `/api/variants/${slug_cat}/${slug_subcat}/${uniquepid}`
        );
        const data = await response.json();
        setVariantsData(data?.variant);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    isvariant === "Variant" && fetchVariants();
  }, []);

  useEffect(() => {
    // Create a new variants object
    if (!variantsWithArray) {
      const newVariantsWithArray =
        (variantsData &&
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
                acc.variantsvalues[attribute].push(
                  variantsvaluesObj[attribute]
                );
              } else {
                // If the attribute doesn't exist in the accumulator, create a new array with the value
                acc.variantsvalues[attribute] = [variantsvaluesObj[attribute]];
              }
            }

            return acc;
          }, {})) ||
        {};

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
      }
      setSelectedAttributes(initialSelectedAttributes);
    }
  }, [variantsWithArray]);

  useEffect(() => {
    const isUniquepidMatched = cartItems.some((cartItem) => {
      return cartItem.uniquepid === item?.uniquepid;
    });

    const matchedCartProduct = cartItems.find((cartItem) => {
      if (cartItem.uniquepid === item?.uniquepid) {
        if (cartItem?.label != null && cartItem?.label != undefined) {
          return (
            cartItem?.uniquepid === item?.uniquepid &&
            cartItem?.label === item?.label
          );
        }
        return cartItem?.uniquepid === item?.uniquepid;
      }
    });

    setisUniquepidMatched(isUniquepidMatched);
  }, [isUniquepidMatched, cartItems, item]);

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

  const notifyAddTocart = async () => {
    const { category, subcategory, uniquepid, vendorid, id } = singleData;
    const shipping = company_district && storedDistrict ? 'shipping' : 'pickup'
    const updatedSingleData = {
      ...singleData,
      added_quantity: qualitySelected, // This adds the productToAdd object as a property of singleData
      mrp: mrpData, // Set the mrp value here
      sellingprice: sellingPriceData, // Set the sellingprice value here
      label: selectLabel, // Set the sellingprice value here
      shippingCost: shippingRate,
      selectedOption: shipping
    };

    const replacecategory = category.replace(/[^\w\s]/g, "").replace(/\s/g, "");
    const replacesubcategory = subcategory
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");

    const existingSelectedOptionsString = localStorage.getItem('selectedOptions');
    const existingSelectedOptions = existingSelectedOptionsString ? JSON.parse(existingSelectedOptionsString) : {};

    // Update the selectedOption for the current item in the local storage
    existingSelectedOptions[uniquepid] = shipping;
    localStorage.setItem('selectedOptions', JSON.stringify(existingSelectedOptions));


    setLoader(true)
    if (customerId) {
      try {
        const requestData = {
          customer_id: customerId,
          vendor_id: vendorid,
          product_uniqueid: uniquepid,
          category: replacecategory,
          subcategory: replacesubcategory,
          variantlabel: selectLabel,
          mrp: mrpData,
          sellingprice: sellingPriceData,
          added_quantity: qualitySelected,
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

        // const responseData = await response.json();
        dispatch(addItem(updatedSingleData));
        setisUniquepidMatched(true);
      } catch (error) {
        console.error("Error updating cart:", error);
      } finally {
        setLoader(false)
      }
    } else {
      dispatch(addItem(updatedSingleData));
      setLoader(false)

    }

    toast.custom(
      (t) => (
        <NotifyAddTocart
          productImage={`${ProductImageUrl}/${images?.[0]}`}
          qualitySelected={qualitySelected}
          show={t.visible}
          sizeSelected={sizeSelected}
          variantActive={variantActive}
          itemData={item}
          mrp={mrpData}
          sellingPrice={sellingPriceData}
        />
      ),
      { position: "top-right", id: "nc-product-notify", duration: 3000 }
    );
  };

  const renderVariants = () => {
    console.log(variantsWithArray, "");

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
              className={`relative flex-1 max-w-[75px] h-10 rounded-full border-2 cursor-pointer ${variantActive === itemvar
                ? "border-black/90 dark:border-white"
                : "border-transparent"
                }`}
            >
              <div
                className={`absolute flex justify-center items-center inset-0.5 rounded-full overflow-hidden z-0 ${variantActive === itemvar && "bg-black text-white"
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

  const storedDistrict = localStorage.getItem('selectedDistrict');
  console.log(company_district, storedDistrict, "pickup and delivery locations");


  const renderShippingAvailability = () => {
    return (
      <div>
        {
          company_district && storedDistrict ? <div className="flex justify-center">

            <h1 className="text-green-600 font-semibold">{t("Shipping Fee")} : ${shippingRate}, {t("From")} {company_district} {t("To")} {storedDistrict}</h1>
          </div> : (
            !company_district ? (
              <div className="flex justify-center">
                <h1 className="text-red-600 font-semibold">{t("Only Pickup Available")}</h1>
              </div>
            ) : (
              !storedDistrict ? (
                <div className="flex justify-center">
                  <a className="text-blue-600 font-semibold" href="/select-district" target="_blank">{t("Choose District")}</a>
                </div>
              ) : (
                <p>{t("Both company_district and storedDistrict are not present")}</p>
              )
            )
          )
        }

      </div>
    )
  }

  const renderCost = async () => {
    try {
      const response = await fetch(`${AdminUrl}/api/getShippingRate?origin=${company_district}&destination=${storedDistrict}`)
      if (response.ok) {
        const data = await response.json()
        if (data.rate === 0) {
          setShippingrate(0)
        }
        else {
          setShippingrate(data.rate)
        }
      }
      else {
        console.log("fetching failed ");
      }
    } catch (error) {
      console.log(error, "ERROR FETCHING RATES");
    }
    // return <h1>Hello</h1>
  }

  useEffect(() => {
    company_district && storedDistrict && renderCost()
  }, [])

  const renderSectionContent = () => {
    return (
      <div className="space-y-5">
        {/* ---------- 1 HEADING ----------  */}
        <div>
          <h2 className="text-lg ">
            <Link
              href={`/product-detail?product=${prod_slug}&uniqueid=${uniquepid}`}
            >
              {languageCode === "so" ? somali_ad_title === null ? ad_title : somali_ad_title : ad_title}
            </Link>
          </h2>


          <div className="flex items-center mt-1 space-x-4 sm:space-x-5">
            {/* <div className="flex text-xl font-semibold">$112.00</div> */}
            <Prices
              contentClass="py-1 md:py-1.5 text-lg font-semibold"
              price={mrpData}
              sellingprice={sellingPriceData}
            />
            {discountPercentage && discountPercentage > 0 && (
              <p className="text-green-600  ">
                {discountPercentage?.toFixed(2)}% off
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 mb-0.5">
            <Rate
              allowHalf
              disabled
              value={4.7}
              className="text-xs md:text-sm text-[#ED642B]"
            />
            <span className="text-sm font-medium text-[#ED642B]">(352)</span>
          </div>

          <div className="py-1">
            <ProductSalebadge
              bgImg={
                "https://aimg.kwcdn.com/upload_aimg/commodity/e4b8aee4-b205-4a0d-845e-62d36d532518.png?imageView2/2/w/800/q/70/format/webp"
              }
              dealimg={
                "https://aimg.kwcdn.com/upload_aimg/commodity/f8b09403-3868-4abf-9924-5eae97456cef.png?imageView2/2/w/800/q/70/format/webp"
              }
              label1={''}
              label2={"Time-Limited Offer"}
            />
          </div>
        </div>

        {/* ---------- 3 VARIANTS AND SIZE LIST ----------  */}
        {isvariant === "Variant" && <div className="">{renderVariants()}</div>}

        {renderShippingAvailability()}

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
                <span className="ml-3">{t("View Cart")}</span>
              </Link>
            </ButtonPrimary>
          </div>
        ) : (
          <div className="flex space-x-3.5">
            <div className="flex items-center justify-center bg-gray-100/70 dark:bg-gray-800/70 px-2 py-3 sm:p-3.5 rounded-full transition-all duration-300">
              <NcInputNumber
                defaultValue={qualitySelected}
                onChange={setQualitySelected}
                max={quantity}
              />
            </div>
            <ButtonPrimary
              className="flex-1 flex-shrink-0 transition-all duration-300"
              onClick={notifyAddTocart}
              loading={loader}
            >
              <BagIcon className="hidden sm:inline-block w-5 h-5 mb-0.5" />
              <span className="ml-3">{t("Add to Cart")}</span>
            </ButtonPrimary>
          </div>
        )}

        {/*  */}
        <hr className=" border-gray-200 dark:border-gray-700"></hr>
        {/*  */}

        <div>
          <h2 className="text-[1rem] font-medium">{t("Description")}</h2>
          <p className=" text-[0.9rem] line-clamp-2">

            {languageCode === "so" ? somali_additionaldescription === null ? additionaldescription : somali_additionaldescription : additionaldescription}
          </p>
        </div>

        <div>
          <Link
            className="flex items-center justify-center gap-1 text-primary-6000 hover:text-primary-500 font-medium"
            href={{
              pathname: "/product-detail",
              query: { product: prod_slug, uniqueid: uniquepid },
            }}
          >
            {t("View full details")}
            <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    );
  };

  const handleToggleWishlist = useCallback(async () => {
    if (!customerId) return;
    setWishlistLoading(true);
    const { category, subcategory, uniquepid, vendorid } = item;
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
      dispatch(addItemToWishlist({ ...item }));

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
      dispatch(removeItemFromWishlist({ ...item }));
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
  }, [customerId, dispatch, inFavorite, item, setinFavorite]);

  return (
    <div className={`nc-ProductQuickView2 ${className}`}>
      {/* MAIn */}
      <div className="lg:flex">
        {/* CONTENT */}
        <div className="flex flex-row w-full lg:w-[50%]">
          {/* PRODUCT GALLERY */}
          <div className="flex flex-col p-2 w-[20%] h-[calc(100% - 2rem)] overflow-y-auto mb-2">
            {images?.map((image: string, index: number) => (
              <div
                key={index}
                className="h-18 mb-2 cursor-pointer"
                onMouseOver={() => setSelectedImage(image)}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    src={`${ProductImageUrl}/${image}`}
                    className={`w-full rounded-xl object-contain transition duration-300 ${selectedImage === image ? "ring-2 ring-primary" : ""
                      }`}
                    onError={(e) => {
                      e.target.src = "/noimage.jpg"; // Replace '/path/to/dummy_image.jpg' with the actual URL of your dummy image.
                      e.target.alt = 'dummyimage';
                    }}
                    alt={`Product Detail ${index + 1}`}
                    loading="lazy" // Add the lazy loading attribute here
                  />
                </div>
              </div>
            ))}
          </div>

          {/* MAIN IMAGE */}
          <div className="flex-1 relative w-full h-[500px] rounded-2xl overflow-hidden">
            <Image
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={(e) => {
                e.target.src = "/noimage.jpg"; // Replace '/path/to/dummy_image.jpg' with the actual URL of your dummy image.
                e.target.alt = 'dummyimage';
              }}
              src={`${ProductImageUrl}/${selectedImage || images?.[0]
                }`}
              className="w-full h-full object-cover"
              alt="Main Product Image"
              loading="lazy" // Add the lazy loading attribute here
            />
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
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-[50%] pt-6 lg:pt-0 lg:pl-7 xl:pl-10">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView2;
