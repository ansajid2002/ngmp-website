import React from "react";
import { DatePicker, Input, InputNumber, Select } from "antd";

export const commonFormFields = [
  {
    label: "Product Name",
    name: "ad_title",
    component: <Input />,
    notes: (
      <div>
        <h1>Please enter a product name of maximum 50 characters.</h1>
      </div>
    ),
  },
  {
    label: "Additional Description",
    name: "additionaldescription",
    component: <Input.TextArea rows={4} />,
  },
  {
    label: "Product Dimension",
    name: "productdimension",
    children: [
      {
        label: "Height",
        name: "height",
        rules: [
          { required: true, message: "Please input the Height of Product" },
        ],
        component: <Input type="number" step="0.01" placeholder="0" />,
        notes: "Example: 2.04",
      },
      {
        label: "Width",
        name: "width",
        rules: [
          { required: true, message: "Please input the Width of Product" },
        ],
        component: <Input type="number" step="0.01" placeholder="0" />,
        notes: "Example: 1.5",
      },
      {
        label: "Length",
        name: "length",
        rules: [
          { required: true, message: "Please input the Length of Product" },
        ],
        component: <Input type="number" step="0.01" placeholder="0" />,
        notes: "Example: 3.2",
      },
      {
        label: "Weight",
        name: "weight",
        rules: [
          { required: true, message: "Please input the Weight of Product" },
        ],
        component: <Input type="number" step="0.01" placeholder="0" />,
        notes: "Example: 5.7",
      },
    ],
  },
  {
    label: "Shipping Information",
    name: "productInformation",
    children: [
      {
        label: "Product Ship From",
        name: "product_ship_from",
        rules: [
          { required: true, message: "Please input the Product Ship From location" },
        ],
        component: <Input placeholder="Enter Ship From Location" />,
        notes: "Example: Warehouse A",
      },
      {
        label: "Estimate Delivery By",
        name: "estimate_delivery_by",
        rules: [
          { required: true, message: "Please input the Estimate Delivery By" },
        ],
        component: (
          <>
            <Input placeholder="Enter the estimate" />
          </>
        ),
        notes: "Example: within 1 Day, 1 - 2 weeks",
      },
    ],
  },
  {
    label: "Manufacturer Details",
    name: "manufacturerDetails",
    children: [
      {
        label: "Country of Origin",
        name: "countryoforigin",
        rules: [
          { required: true, message: "Please input the Country of Origin!" },
        ],
        component: (
          <Select showSearch>
            <Select.Option value="India">India</Select.Option>
            <Select.Option value="Somalia">Somalia</Select.Option>
            <Select.Option value="Kenya">Kenya</Select.Option>
            <Select.Option value="Ethopia">Ethopia</Select.Option>
            <Select.Option value="France">France</Select.Option>
          </Select>
        ),
        notes:
          "Example: If the product is from India, select India from the list.",
      },
      {
        label: "Manufacturer Name",
        name: "manufacturername",
        rules: [
          { required: true, message: "Please input the Manufacturer Name!" },
        ],
        component: <Input />,
        notes: "Example: ABC Manufacturing Co.",
      },
      {
        label: "Packer Details",
        name: "packerdetails",
        rules: [
          { required: true, message: "Please input the Packer Details!" },
        ],
        component: <Input />,
        notes: "Example: XYZ Packing Solutions",
      },
      {
        label: "Sales Package",
        name: "salespackage",
        rules: [
          {
            required: true,
            message: "Please input the Sales Package Details!",
          },
        ],
        component: <Input type="text" />,
        notes: "Example: Pack of 6, Boxed",
      },
    ],
  },
  {
    label: "Search Keywords",
    name: "searchkeywords",
    component: <Input placeholder="Separate by comma" />,
    notes:
      "Example: Electronics, Best Products, Nice Products, Nile Global Market Place. Copy and paste the title for better SEO ranking.",
  },
  {
    label: "Key features",
    name: "keyfeatures",
    component: <Input.TextArea rows={4} placeholder="Separate by comma" />,
    notes: (
      <div>
        <h1>Example is Given Below</h1>
        <ul className="list-disc">
          <li>Fruits</li>
          <li>Mango</li>
          <li>Shirts</li>
          <li>Great Products</li>
        </ul>
      </div>
    ),
  },
  {
    label: "Video URL",
    name: "videourl",
    component: <Input />,
    notes:
      "Example: Separate multiple video URLs with a comma. Ensure no comma within a single URL.",
  },
];
