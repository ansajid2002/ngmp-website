import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminUrl, HomeUrl } from "../layout";
import CartProducts from "@/components/CartProducts";
import FetchCartPrice from "@/components/FetchCartPrice";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";


const CartPage = async () => {
  const session = await getServerSession(authOptions)
  console.log(session);

  return (
    <div className="nc-CartPage">
      <main className="container py-16 lg:pb-28 lg:pt-20 ">
        <div className="mb-12 sm:mb-16">
          <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold ">
            Shopping Cart
          </h2>
          <div className="block mt-3 sm:mt-5 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-400">
            <Link href={`${HomeUrl}`} className="">
              Home
            </Link>
            <span className="text-xs mx-1 sm:mx-1.5">/</span>
            <span className="underline">Shopping Cart</span>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 my-10 xl:my-12" />

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] divide-y divide-gray-200 dark:divide-gray-700 ">
            <CartProducts />
          </div>
          <div className="border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0"></div>
          <FetchCartPrice />
        </div>
      </main >
    </div >
  );
};

export default CartPage;
