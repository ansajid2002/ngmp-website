"use client";

import Label from "@/components/Label/Label";
import { useEffect, useState } from "react";
import Input from "@/shared/Input/Input";
import ContactInfo from "./ContactInfo";
import PaymentMethod from "./PaymentMethod";
import ShippingAddress from "./ShippingAddress";
import Link from "next/link";
import CartProducts from "@/components/CartProducts";
import FetchCartPrice from "@/components/FetchCartPrice";
import { HomeUrl } from "../layout";
import { useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import FetchCheckoutPrice from "@/components/FetchCheckoutPrice";
import CheckoutProducts from "../../components/Checkoutproducts";
import { addCarts, removeItem } from "@/redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import { Button, Modal } from 'antd';

const CheckoutPage = () => {
  const [tabActive, setTabActive] = useState<
    "ContactInfo" | "ShippingAddress" | "PaymentMethod"
  >("ShippingAddress");
  const dispatch = useDispatch()
  const [selectedAddress, setSelectedAddress] = useState(null)
  const { customerData } = useAppSelector((store) => store.customerData)
  // const { cartItems } = useAppSelector((state) => state.cart)
  const [cartItems,setCartItems] = useState(null)
  const [outofstock,setOutofstock] = useState(null)
  const router = useRouter()
  
  const [visible, setVisible] = useState(true);

  const pickupItems = JSON.parse(localStorage.getItem("pickupitems")) || [];


  const remainingItems = cartItems?.filter((item) => !pickupItems.includes(item.uniquepid)).map((s) => s.uniquepid);
  const customerId = customerData?.customer_id || null;

  useEffect(() => {
    const fetchCart = async (customerId: any) => {
      try {
        
        if (!customerId) {
          
          return;
        }
        const response = await fetch(`/api/cart/${customerId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 3 },
        });
        const data = await response.json();
        
        setOutofstock(data.cartData.filter((item) => item.quantity === 0))
        setCartItems(data.cartData.filter((item) => item.quantity !== 0))
  
          dispatch(addCarts(data.cartData.filter((item) => item.quantity !== 0)));
        
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    if (customerId) {
      fetchCart(customerId);
    }
  }, [customerId]);



  const handleScrollToEl = (id: string) => {
    const element = document.getElementById(id);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  };

  const handleChangeAddress = (address: any) => {
    setSelectedAddress(address)
    setTabActive('PaymentMethod')
  }

  useEffect(() => {
    if (!selectedAddress && pickupItems?.length === 0) {
      setTabActive("PaymentMethod");
      handleScrollToEl("PaymentMethod");
    } else {
      setTabActive('ShippingAddress')
      handleScrollToEl("ShippingAddress");

    }
  }, [])

  const renderLeft = () => {
    return (
      <div className="space-y-8 ">
        <div id="ContactInfo" className="scroll-mt-24">
          <ContactInfo
            isActive={tabActive === "ContactInfo"}
            onOpenActive={() => {
              setTabActive("ContactInfo");
              handleScrollToEl("ContactInfo");
            }}
            onCloseActive={() => {
              setTabActive("ShippingAddress");
              handleScrollToEl("ShippingAddress");
            }}
          />
        </div>
        {
          customerData && 
          <>
            {
              remainingItems?.length > 0 && <div id="ShippingAddress" className="scroll-mt-24">
                <ShippingAddress
                  isActive={tabActive === "ShippingAddress"}
                  onOpenActive={() => {
                    setTabActive("ShippingAddress");
                    handleScrollToEl("ShippingAddress");
                  }}
                  onCloseActive={() => {
                    setTabActive("PaymentMethod");
                    handleScrollToEl("PaymentMethod");
                  }}
                  onChangeAddress={handleChangeAddress}
                />
              </div>
            }

            <div id="PaymentMethod" className="scroll-mt-24">
              <PaymentMethod
                selectedAddress={selectedAddress}
                isActive={tabActive === "PaymentMethod"}
                onOpenActive={() => {
                  if (selectedAddress) {
                    setTabActive("PaymentMethod");
                    handleScrollToEl("PaymentMethod");
                  } else {
                    if (remainingItems.length > 0) {
                      alert('No Address Selected')
                    } else {
                      setTabActive("PaymentMethod");
                      handleScrollToEl("PaymentMethod");
                    }
                  }
                }}
                onCloseActive={() => setTabActive("PaymentMethod")}
              />
            </div>
          </>
        }
      </div>
    );
  };



  const handleRemoveClick = (item) => {
    setOutofstock((prev) => prev.filter((i) => i.uniquepid !== item.uniquepid))
    setCartItems((prev) => prev.filter((i) => i.uniquepid !== item.uniquepid ) )

    setVisible(false); // Close the modal after removing items
  };



  return (
    <div >


      {
         outofstock && outofstock?.length !== 0 ?
        <Modal
      title="Items Out of Stock"
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={null}
    ><div>

      <h1>THERE ARE SOME ITEMS THAT ARE OUT OF STOCK</h1>
      <div>
        {
          outofstock?.map((item,i) => {
            return (
              <div>
              <h1>{`item ${i}`}</h1>
              <Button onClick={() => handleRemoveClick(item)}>remove </Button>
                </div>
            )
          })
        }
      </div>
    </div>
    </Modal>
        :
        <div className="nc-CheckoutPage">

      <main className="px-5 md:px-10 py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-10">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Checkout
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400">
            <Link href={`${HomeUrl}`} className="">
              Home
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>

            <span className="underline">Checkout</span>
          </div>
        </div>


        <div className="flex flex-col lg:flex-row">
          <div className="flex-1">{renderLeft()}</div>

          <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 "></div>

          <div className="w-full lg:w-[36%] ">
            <h3 className="text-lg font-semibold">Order summary</h3>
            <div className="mt-8 divide-y divide-gray-200/70 dark:divide-gray-700 ">
              <CheckoutProducts cartItems={cartItems} 
              itemstoShip={cartItems?.filter(item => !pickupItems.includes(item.uniquepid))} 
              itemstoPick={cartItems?.filter(item => pickupItems.includes(item.uniquepid))}
              canNavigate={false} removeData={false} />
            </div>

            <div className="mt-10 pt-6 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200/70 dark:border-gray-700 ">
              {/* <div>
                <Label className="text-sm">Discount code</Label>
                <div className="flex mt-1.5">
                  <Input sizeClass="h-10 px-4 py-3" className="flex-1" />
                  <button className="text-neutral-700 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 dark:bg-neutral-700 dark:hover:bg-neutral-800 w-24 flex justify-center items-center transition-colors">
                    Apply
                  </button>
                </div>
              </div> */}

              <FetchCheckoutPrice cartItems={cartItems} 
              itemstoShip={cartItems?.filter(item => !pickupItems.includes(item.uniquepid))} 
              itemstoPick={cartItems?.filter(item => pickupItems.includes(item.uniquepid))}
               showTitle={false} showCheckout={false} />
            </div>
            {/* <ButtonPrimary className="mt-8 w-full" >Confirm order</ButtonPrimary> */}

            <div className="mt-5 text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
              <p className="block relative pl-5">
                <svg
                  className="w-4 h-4 absolute -left-1 top-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9945 16H12.0035"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Learn more{` `}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-gray-900 dark:text-gray-200 underline font-medium"
                >
                  Taxes
                </a>
                <span>
                  {` `}and{` `}
                </span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="##"
                  className="text-gray-900 dark:text-gray-200 underline font-medium"
                >
                  Shipping
                </a>
                {` `} infomation
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>

}
    </div>
  );
};

export default CheckoutPage;
