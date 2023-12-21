import React from "react";
import { Input, InputNumber, Select } from "antd";

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
    rules: [
      {
        max: 1000,
        message: "Additional description must be at most 1000 characters!",
      },
    ],
    component: <Input.TextArea rows={4} />,
    notes: "Guidelines: Please limit your description to 1000 words.",
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
