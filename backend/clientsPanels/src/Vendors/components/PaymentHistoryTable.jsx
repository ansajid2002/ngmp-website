import React, { useEffect, useState } from "react";
import { Table, Tag, Pagination } from "antd";
import moment from "moment";
import axios from "axios";
import { AdminUrl } from "../../Admin/constant";

const PaymentHistoryTable = ({ vendorId, selectedOption }) => {
  const [paymentData, setPaymentData] = useState([]);
  const [total_earning, setTotalEarnings] = useState([]);
  const [total_count, setTotalCount] = useState([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  useEffect(() => {
    // Define a function to fetch payment history data from the backend
    const fetchPaymentHistory = async () => {
      try {
        const response = await axios.get(`${AdminUrl}/api/earnings/${vendorId}`, {
          params: {
            page: pagination.current,
            pageSize: pagination.pageSize,
            selectedOption
          },
        });

        // Assuming backend response structure: { payment_data, total_earning, total_count }
        const { payment_data, total_earning, total_count } = response.data;

        // Update paymentData state with fetched data
        setPaymentData(payment_data);

        // Update total earnings and total count if needed
        setTotalEarnings(total_earning);
        setTotalCount(total_count);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    // Call the fetchPaymentHistory function when the component mounts or when vendorId or pagination changes
    vendorId && fetchPaymentHistory();
  }, [vendorId, pagination, selectedOption]); // Execute effect whenever vendorId or pagination changes

  // Define the columns for the table
  const columns = [
    {
      title: "Payment Date",
      dataIndex: "payment_date",
      key: "payment_date",
      render: (date) => moment(date).format("MMM D, YYYY HH:mm A"), // Format date
      sorter: (a, b) =>
        moment(a.payment_date).unix() - moment(b.payment_date).unix(), // Sort by date
      defaultSortOrder: "descend", // Default sorting order
    },
    {
      title: "Payment Method",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "Payment Amount",
      dataIndex: "payment_amount",
      key: "payment_amount",
      render: (amount, record) => {
        const parsedAmount = parseFloat(amount);
        if (!isNaN(parsedAmount)) {
          return `${record.currency_code} ${parsedAmount.toFixed(2)}`;
        }
        return amount; // Return as is if not a valid number
      },
    },
    {
      title: "Payment Source",
      dataIndex: "payment_source",
      key: "payment_source",
    },
    {
      title: "Payment Status",
      dataIndex: "payment_status",
      key: "payment_status",
      render: (status) => (
        <Tag
          color={
            status === "Paid"
              ? "green"
              : status === "Pending"
                ? "orange"
                : "red"
          }
        >
          {status}
        </Tag>
      ),
      filters: [
        { text: "Paid", value: "Paid" },
        { text: "Pending", value: "Pending" },
        { text: "Withdraw", value: "Withdraw" },
      ],
      onFilter: (value, record) => record.payment_status === value,
    },
  ];

  // Handle pagination change
  const handlePaginationChange = (page, pageSize) => {
    setPagination({ current: page, pageSize });
  };

  return (
    <div className="mt-10">
      <Table dataSource={paymentData} columns={columns} pagination={false} />

      <div className="flex justify-end py-4">
        <Pagination
          hideOnSinglePage
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={total_count} // Assuming total count is available, replace with actual count from the API if available
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default PaymentHistoryTable;
