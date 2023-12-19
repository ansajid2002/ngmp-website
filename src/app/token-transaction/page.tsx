"use client";
import AvailableToken from "@/components/AvailableToken";
import { Button, Input, Typography } from "@material-tailwind/react";
import { Contact2, User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AdminUrl } from "../layout";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import TokenTransferChat from "@/components/wallet/TokenTransferChat";

const Page = () => {
  const [user, setUser] = React.useState("");
  const onChange = ({ target }) => setUser(target.value);
  const [approvedCustomers, setApprovedCustomers] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const skely = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Assuming getAllVendors accepts an ID parameter

        const response = await fetch(`/api/Customers/getAll`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: 3 }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data, "DATAA BOLYE");
          setApprovedCustomers(data);
        }

        // setSingleVendors(...filteredVendors);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    fetchData();
    // If you want to perform some action when singleVendors changes, do it here
  }, []);

  useEffect(() => {
    if (approvedCustomers) {
      const filteredData = approvedCustomers.filter((item) =>
        `${item.family_name} ${item.given_name} ${item.email}`
          .toLowerCase()
          .includes(user.toLowerCase())
      );
      setFilteredCustomers(filteredData);
    }
  }, [user, approvedCustomers]);

  return (
    <div className="md:px-10 pt-5 bg-gradient-to-b from-[#063B69]">
      <div className="m-3 bg-white px-4 py-5 md:p-10 rounded-t-3xl flex">
        <div className="w-[40%]">
          {/* ----------- */}
          <div>
            <AvailableToken />
          </div>
          {/* ------------ */}
          <div className="pt-4 pb-1 ">
            <div className="flex items-center gap-1 text-[#063B69]">
              {/* <Contact2 size={15} strokeWidth={1} /> */}
              {/* <h2 className="text-sm">Pay user who accept Nile Token</h2> */}
            </div>
          </div>
          {/* ----------- */}
          <div className="relative flex w-full max-w-[24rem] ">
            <Input
              type="text"
              label="Search Nile User"
              value={user}
              onChange={onChange}
              className="pr-20 focus:ring-0"
              containerProps={{
                className: "min-w-0",
              }}
            />
            <Button
              size="sm"
              color={user ? "gray" : "blue-gray"}
              disabled={!user}
              className="!absolute right-1 top-1 rounded"
            >
              Search
            </Button>
          </div>

          <div className="flex items-center gap-1 mt-5 mb-1">
            <User size={20} color="gray" />
            <h2 className="text-gray-700 font-semibold">Users on Nile Token</h2>
          </div>

          {/* ------------ */}
          <div className=" h-52 max-w-[24rem] overflow-hidden overflow-y-scroll scroll-smooth scroll">
            {isLoading ? (
              <>
                {skely.map(() => (
                  <div className="flex items-center gap-3 py-2 border-b">
                    <Skeleton circle height={"36px"} width={"36px"} />
                    <div className="leading-none">
                      <Skeleton height={"10px"} width={200} />
                      <Skeleton height={"10px"} width={200} />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {filteredCustomers?.map((item: any, index: any) => (
                  <div>
                    <Link
                      href={`/token-transaction?query=${item.customer_id}`}
                      className="flex gap-3 items-center hover:bg-gray-100 p-2 rounded-lg border-b"
                    >
                      <div className="h-9 w-9 rounded-full overflow-hidden">
                        <Image
                          alt="User Profile"
                          src={
                            (item &&
                              item.picture &&
                              `${AdminUrl}/uploads/customerProfileImages/${item.picture}`) ||
                            "/avatarplaceholder.png"
                          }
                          width={100}
                          height={100}
                        />
                      </div>
                      <div className="leading-tight">
                        <h2 className="text-[1rem] font-medium">
                          {item.family_name} {item.given_name}
                        </h2>
                        <h3 className="text-[0.8rem] font-medium text-gray-700">
                          {item.email}
                        </h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="w-[60%] border rounded-xl shadow-md">
          <TokenTransferChat />
        </div>
      </div>
    </div>
  );
};

export default Page;
