import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminUrl } from "../layout";
import CartProducts from "@/components/CartProducts";
import FetchCartPrice from "@/components/FetchCartPrice";

export const fetchCartData = async (customerId: any) => {
  try {
    const requestOptions = {
      method: 'PUT', // Change the request method to PUT
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id: customerId }), // Pass the customer_id in the request body

    };

    const response = await fetch(`${AdminUrl}/api/cartWebsite`, requestOptions);

    if (!response.ok) {
      // Throw an error with a custom message
      throw new Error(`Error fetching cart data: HTTP error! Status: ${response.status}`);
    }

    const cartData = await response.json();

    return cartData;

  } catch (error: any) {
    // Handle any errors here
    console.error(error.message);
    throw error; // Re-throw the error to be handled by the calling function
  }
};


const CartPage = async () => {
  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Shopping Cart
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-400">
            <Link href={"/"} className="">
              Home
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Shopping Cart</span>
          </div>
        </div>

        <hr className="border-slate-200 dark:border-slate-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-slate-200 dark:divide-slate-700 ">
            <CartProducts />
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <FetchCartPrice />
        </div>
      </main>
    </div>
  );
};

export default CartPage;
