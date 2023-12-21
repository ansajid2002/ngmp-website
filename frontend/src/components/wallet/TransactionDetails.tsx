"use client";
import React from "react";
import { Table } from "antd";
import { ArrowLeftRight } from "lucide-react";

const columns = [
  {
    title: "TRANSACTION",
    dataIndex: "transaction",
    render: (_, record) => {
      return (
        <div className="flex gap-3 items-center">
          <div className="hidden md:block">
            <ArrowLeftRight className="rotate-90" size={25} color="#063b69" />
          </div>
          <div>
            <div className="mb-2">
              <h2 className="text-lg font-medium ">Paid to ansari afroz</h2>
              <h2 className="text-sm">17 NOV, 9:03 PM</h2>
            </div>
            <div>
              <h2 className="text-sm">
                <span className="font-medium">Order ID :</span>{" "}
                64651654564656554
              </h2>
              <h2 className="text-sm tracking-wider">
                <span className="font-medium">Transaction ID :</span>{" "}
                64651654564656554
              </h2>
            </div>
          </div>
        </div>
      );
    },
    // filters: [
    //   { text: "Joe", value: "Joe" },
    //   { text: "Jim", value: "Jim" },
    //   {
    //     text: "Submenu",
    //     value: "Submenu",
    //     children: [
    //       { text: "Green", value: "Green" },
    //       { text: "Black", value: "Black" },
    //     ],
    //   },
    // ],
    // onFilter: (value, record) => record.name.indexOf(value) === 0,
    // sortDirections: ["descend"],
  },
  {
    title: "AMOUNT",
    dataIndex: "amount",
    // defaultSortOrder: "ascend", // Add this line for initial sorting
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    // filters: [
    //   { text: "London", value: "London" },
    //   { text: "New York", value: "New York" },
    // ],
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: "COMMENTS",
    dataIndex: "comments",
    // filters: [
    //   { text: "London", value: "London" },
    //   { text: "New York", value: "New York" },
    // ],
    // onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
];

const data = [
  {
    key: "1",
    transaction: "John Brown",
    amount: "$320",
    status: "SUCCESS",
    comments: "TEST",
  },
  {
    key: "2",
    transaction: "Jim Green",
    amount: "$320",
    status: "SUCCESS",
    comments: "TEST",
  },
  {
    key: "3",
    transaction: "Joe Black",
    amount: "$320",
    status: "SUCCESS",
    comments: "TEST",
  },
  {
    key: "4",
    transaction: "Jim Red",
    amount: "$320",
    status: "SUCCESS",
    comments: "TEST",
  },
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log("params", pagination, filters, sorter, extra);
};

const TransactionDetails = () => (
  <Table columns={columns} dataSource={data} onChange={onChange} />
);

export default TransactionDetails;
