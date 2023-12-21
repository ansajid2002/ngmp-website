import { NoSymbolIcon, CheckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { AdminUrl, HomeUrl } from "../layout";
import CartProducts from "@/components/CartProducts";
import FetchCartPrice from "@/components/FetchCartPrice";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import CartDetails from "@/components/CartDetails";

const CartPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <div className="nc-CartPage">
      <CartDetails />
    </div>
  );
};

export default CartPage;
