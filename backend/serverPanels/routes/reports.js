const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const fs = require("fs");
const { default: jsPDF } = require("jspdf");
require("jspdf-autotable");
const excel = require('exceljs')
const { Parser } = require('json2csv');
const moment = require('moment')

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.get('/product-approved-pdf', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      // Add cases for other options as needed
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }


    // Fetch approved products from the database
    const productsQuery = `
          SELECT ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, skuid, state, weight, width
          FROM products
          WHERE vendorid = $1 AND status = 1 AND ${dateFilter}`;
    const productsValues = [vendorId];
    const { rows } = await pool.query(productsQuery, productsValues);

    // Format fetched data into a table
    const headers = ['Product Name', 'Nile UniqueID', 'MRP', 'Selling Price', 'Category', 'Category Type', 'City', 'Condition', 'Country', 'Country of Origin', 'Currency Symbol', 'Manufacturer Name', 'Shipping From', 'Sales Package', 'Postal Code', 'Rejection Reason', 'SKU ID', 'State', 'Weight', 'Width'];
    const data = rows.map(row => [
      row.ad_title,
      row.uniquepid,
      row.mrp,
      row.sellingprice,
      row.category,
      row.category_type,
      row.city,
      row.condition,
      row.country,
      row.countryoforigin,
      row.currency_symbol,
      row.manufacturername,
      row.mogadishudistrict_ship_from,
      row.salespackage,
      row.postalcode,
      row.rejection_reason,
      row.skuid,
      row.state,
      row.weight,
      row.width
    ]);

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a2'
    });

    const selectedOptionLabels = {
      last7days: 'Last 7 Days',
      last30days: 'Last 30 Days',
      last60days: 'Last 60 Days',
      last90days: 'Last 90 Days',
      last6months: 'Last 6 Months',
      last12months: 'Last 12 Months',
      last18months: 'Last 18 Months',
      last24months: 'Last 24 Months',
      // Add labels for other options as needed
    };


    const selectedOptionLabel = selectedOptionLabels[selectedOption] || 'All Time';

    // Get today's date in the format "Month Day, Year"
    const todayDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Set title with more details
    const companyName = 'Nile Global Market-place';
    const heading = `Approved Products (${selectedOptionLabel}), ${companyName}, ${todayDate}`;
    doc.setFontSize(18);
    doc.text(heading, 10, 10);

    // Add table to the document
    doc.autoTable({
      startY: 20,
      head: [headers],
      body: data,
    });

    // Send the PDF file as response
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(doc.output());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/product-approved-excel', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      // Add cases for other options as needed
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Fetch approved products from the database
    const productsQuery = `
          SELECT ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, skuid, state, weight, width
          FROM products
          WHERE vendorid = $1 AND status = 1 AND ${dateFilter}`;
    const productsValues = [vendorId];
    const { rows } = await pool.query(productsQuery, productsValues);

    // Create a new workbook
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Approved Products');

    // Add headers
    const headers = ['Product Name', 'Nile UniqueID', 'MRP', 'Selling Price', 'Category', 'Category Type', 'City', 'Condition', 'Country', 'Country of Origin', 'Currency Symbol', 'Manufacturer Name', 'Shipping From', 'Sales Package', 'Postal Code', 'Rejection Reason', 'SKU ID', 'State', 'Weight', 'Width'];
    worksheet.addRow(headers);

    // Add data rows
    rows.forEach(row => {
      const rowData = Object.values(row);
      worksheet.addRow(rowData);
    });

    // Set response headers
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the Excel file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product-approved-csv', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      // Add cases for other options as needed
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Fetch approved products from the database
    const productsQuery = `
          SELECT ad_title, uniquepid, mrp, sellingprice, category, category_type, city, condition, country, countryoforigin, currency_symbol, manufacturername, mogadishudistrict_ship_from, salespackage, postalcode, rejection_reason, skuid, state, weight, width
          FROM products
          WHERE vendorid = $1 AND status = 1 AND ${dateFilter}`;
    const productsValues = [vendorId];
    const { rows } = await pool.query(productsQuery, productsValues);

    // Convert products to CSV format
    const fields = [
      'ad_title', 'uniquepid', 'mrp', 'sellingprice', 'category', 'category_type',
      'city', 'condition', 'country', 'countryoforigin', 'currency_symbol',
      'manufacturername', 'mogadishudistrict_ship_from', 'salespackage',
      'postalcode', 'rejection_reason', 'skuid', 'state', 'weight', 'width'
    ];
    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(rows);

    // Set response headers
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.csv"');
    res.setHeader('Content-Type', 'text/csv');

    // Send CSV data in response
    res.send(csvData);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product-inventory-pdf', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      // Add cases for other options as needed
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Fetch approved products from the database
    let productsQuery = `SELECT p.*, vp.*
              FROM products p
              LEFT JOIN variantproducts vp ON p.uniquepid::text = vp.product_uniqueid
              WHERE p.vendorid = $1 AND p.status = 1  `;

    if (dateFilter) {
      productsQuery += ` AND ${dateFilter}`;
    }

    productsQuery += ` ORDER BY p.updated_at_product DESC`;

    const productsValues = [vendorId];
    const { rows } = await pool.query(productsQuery, productsValues);

    for (const product of rows) {
      const totalSoldResult = await pool.query(
        'SELECT COUNT(*) AS total_count FROM vendorproductorder WHERE product_uniqueid = $1 AND (label IS NULL OR label = $2)',
        [product.uniquepid, product.label]
      );
      product.total_count = parseInt(totalSoldResult.rows[0].total_count) || 0;
    }
    // Format fetched data into a table
    const headers = ['SKU ID', 'Nile UniqueID', 'Product Name', 'Stock', 'Total Sold', 'Status', 'Updated At'];

    const data = rows.map(row => [
      row.skuid,
      row.uniquepid,
      row.ad_title,
      row.label ? row.variant_quantity : row.quantity,
      row.total_count,
      'Approved',
      moment(row.updated_at_product).format('LLL')
    ]);



    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a2'
    });

    const selectedOptionLabels = {
      last7days: 'Last 7 Days',
      last30days: 'Last 30 Days',
      last60days: 'Last 60 Days',
      last90days: 'Last 90 Days',
      last6months: 'Last 6 Months',
      last12months: 'Last 12 Months',
      last18months: 'Last 18 Months',
      last24months: 'Last 24 Months',
      // Add labels for other options as needed
    };


    const selectedOptionLabel = selectedOptionLabels[selectedOption] || 'All Time';

    // Get today's date in the format "Month Day, Year"
    const todayDate = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    // Set title with more details
    const companyName = 'Nile Global Market-place';
    const heading = `Approved Products (${selectedOptionLabel}), ${companyName}, ${todayDate}`;
    doc.setFontSize(18);
    doc.text(heading, 10, 10);

    // Add table to the document
    doc.autoTable({
      startY: 20,
      head: [headers],
      body: data,
    });

    // Send the PDF file as response
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(doc.output());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/product-inventory-excel', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      // Add cases for other options as needed
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Fetch approved products from the database
    let productsQuery = `SELECT p.*, vp.*
    FROM products p
    LEFT JOIN variantproducts vp ON p.uniquepid::text = vp.product_uniqueid
    WHERE p.vendorid = $1 AND p.status = 1  `;

    if (dateFilter) {
      productsQuery += ` AND ${dateFilter}`;
    }

    productsQuery += ` ORDER BY p.updated_at_product DESC`;

    const productsValues = [vendorId];
    const { rows } = await pool.query(productsQuery, productsValues);

    for (const product of rows) {
      const totalSoldResult = await pool.query(
        'SELECT COUNT(*) AS total_count FROM vendorproductorder WHERE product_uniqueid = $1 AND (label IS NULL OR label = $2)',
        [product.uniquepid, product.label]
      );
      product.total_count = parseInt(totalSoldResult.rows[0].total_count) || 0;
    }
    // Create a new workbook
    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Inventory Report');

    // Add headers
    const headers = ['SKU ID', 'Nile UniqueID', 'Product Name', 'Stock', 'Total Sold', 'Status', 'Updated At'];
    worksheet.addRow(headers);

    // Add data rows
    rows.forEach(row => {
      const rowData = [
        row.skuid,
        row.uniquepid,
        row.ad_title,
        row.label ? row.variant_quantity : row.quantity,
        row.total_count,
        'Approved',
        moment(row.updated_at_product).format('LLL')
      ];
      worksheet.addRow(rowData);
    });

    // Set response headers
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

    // Send the Excel file
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting to Excel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/product-inventory-csv', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      // Add cases for other options as needed
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Fetch approved products from the database
    let productsQuery = `SELECT p.*, vp.*
    FROM products p
    LEFT JOIN variantproducts vp ON p.uniquepid::text = vp.product_uniqueid
    WHERE p.vendorid = $1 AND p.status = 1  `;

    if (dateFilter) {
      productsQuery += ` AND ${dateFilter}`;
    }

    productsQuery += ` ORDER BY p.updated_at_product DESC`;

    const productsValues = [vendorId];
    const { rows } = await pool.query(productsQuery, productsValues);

    for (const product of rows) {
      const totalSoldResult = await pool.query(
        'SELECT COUNT(*) AS total_count FROM vendorproductorder WHERE product_uniqueid = $1 AND (label IS NULL OR label = $2)',
        [product.uniquepid, product.label]
      );
      product.total_count = parseInt(totalSoldResult.rows[0].total_count) || 0;
      product.status = 'Approved';
      product.quantity = product.label ? product.variant_quantity : product.quantity
      product.updated_at_product = moment(product.updated_at_product).format('LLL')
    }
    // Convert products to CSV format
    const fields = [
      "skuid", "uniquepid", "ad_title", "quantity", "total_count", "status", "updated_at_product"
    ];
    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(rows);

    // Set response headers
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.csv"');
    res.setHeader('Content-Type', 'text/csv');

    // Send CSV data in response
    res.send(csvData);
  } catch (error) {
    console.error('Error exporting to CSV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/orders-pdf", async (req, res) => {
  const { type, vendorId, tabchange, selectedOption } = req.query;

  try {
    let query = `
      SELECT vpo.*
      FROM vendorproductorder vpo
    `;
    const queryParams = [];

    let whereClause
    if (type !== "admin") {
      query += " WHERE vpo.vendor_id = $1";
      queryParams.push(vendorId);
    }

    if (tabchange && tabchange !== 'All') {
      query += ` AND vpo.order_status = $${queryParams.length + 1}::text`;
      queryParams.push(tabchange);
    }

    if (selectedOption) {
      let startDate;
      switch (selectedOption) {
        case 'last7days':
          startDate = moment().subtract(7, 'days').format('YYYY-MM-DD');
          break;
        case 'last30days':
          startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
          break;
        case 'last60days':
          startDate = moment().subtract(60, 'days').format('YYYY-MM-DD');
          break;
        case 'last90days':
          startDate = moment().subtract(90, 'days').format('YYYY-MM-DD');
          break;
        case 'last6months':
          startDate = moment().subtract(6, 'months').format('YYYY-MM-DD');
          break;
        case 'last12months':
          startDate = moment().subtract(12, 'months').format('YYYY-MM-DD');
          break;
        case 'last18months':
          startDate = moment().subtract(18, 'months').format('YYYY-MM-DD');
          break;
        case 'last24months':
          startDate = moment().subtract(24, 'months').format('YYYY-MM-DD');
          break;
        default:
          startDate = null; // Handle default case
          break;
      }

    }


    query += ` ORDER BY vpo.created_at DESC;`;

    console.log(query, queryParams);
    const { rows } = await pool.query(query, queryParams);

    // Fetch customer delivery address details
    const deliveryAddressDetails = await Promise.all(
      rows.map(async (row) => {
        const addressDetails = await pool.query(
          "SELECT * FROM customer_delivery_address WHERE unique_order_id = $1;",
          [row.order_id]
        );

        return { ...row, deliveryAddress: addressDetails.rows[0] || {} };
      })
    );

    // Fetch product details
    const productDetails = await Promise.all(
      deliveryAddressDetails.map(async (row) => {
        const productDetails = await pool.query(
          "SELECT * FROM products WHERE uniquepid = $1;",
          [row.product_uniqueid]
        );

        return { ...row, productDetails: productDetails.rows[0] || {} };
      })
    );

    // Fetch customer details based on customer_id
    const rowsWithCustomerInfo = await Promise.all(
      productDetails.map(async (row) => {
        const customerDetails = await pool.query(
          "SELECT * FROM customers WHERE customer_id = $1;",
          [row.customer_id]
        );

        const customerInfo = customerDetails.rows[0] || {};
        delete customerInfo.password;
        return { ...row, customerInfo };
      })
    );

    const totalCountQuery = `
      SELECT COUNT(*) as total_count
      FROM vendorproductorder
      ${type !== "admin" ? 'WHERE vendor_id = $1' : ''};
    `;

    const totalCountResult = await pool.query(totalCountQuery, type !== "admin" ? [vendorId] : []);
    const totalCount = parseInt(totalCountResult.rows[0].total_count, 10);

    // Fetch additional details from the vendors table for each vendor_id
    const rowsWithVendorProfiles = await Promise.all(
      rowsWithCustomerInfo.map(async (row) => {
        const vendorDetails = await pool.query(
          "SELECT brand_name, email, country_code, mobile_number, status, vendor_profile_picture_url, brand_logo, vendorname, company_city, company_zip_code, company_state, company_country, shipping_address FROM vendors WHERE id = $1;",
          [row.vendor_id]
        );

        const vendorProfile = vendorDetails.rows[0] || {};

        return { ...row, vendorProfile, totalCount };
      })
    );

    const headers = ['Order Id', 'Group Order Id',
      'Product Name', 'Quantity', 'Total Amount', 'Customer Data',
      'Order Date', 'Order Status',
      'Transaction Id', 'Payment Method', 'Payment Status'];

    const data = rowsWithVendorProfiles.map(row => [
      row.order_id,
      row.orderid,
      row.product_name,
      row.quantity,
      row.total_amount,
      `Customer Id: ${row.customer_id}\nEmail: ${row.customerInfo?.email}\nFull Name: ${row.customerInfo?.given_name} ${row.customerInfo?.family_name}`,
      moment(row.order_date)?.format('LLL'),
      row.order_status,
      row.transaction_id,
      row.payment_method,
      row.payment_status
    ])

    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a2'
    })

    // Generate PDF
    doc.autoTable({
      startY: 20,
      head: [headers],
      body: data,
    });

    // Send the PDF file as response
    res.setHeader('Content-Disposition', 'attachment; filename="approved_products.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(doc.output());
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/generate-order-slip", async (req, res) => {
  try {
    const { order_id, orderid, vendorId } = req.body;

    console.log(req.body);
    // Construct the SQL query
    const query = `
      SELECT *
      FROM vendorproductorder
      WHERE order_id = $1 AND orderid = $2 AND vendor_id = $3;
    `;

    // Execute the query
    const { rows } = await pool.query(query, [order_id, orderid, vendorId]);

    // Fetch customer delivery address details
    const deliveryAddressDetails = await Promise.all(
      rows.map(async (row) => {
        const addressDetails = await pool.query(
          "SELECT * FROM customer_delivery_address WHERE unique_order_id = $1;",
          [row.orderid]
        );

        return { ...row, deliveryAddress: addressDetails.rows[0] || {} };
      })
    );

    const vendorDetails = await Promise.all(
      deliveryAddressDetails.map(async (row) => {
        const vendorData = await pool.query(
          "SELECT mobile_number, email, brand_name, business_model,country_code,company_name,company_city, company_state,company_country,company_zip_code,brand_logo,vendorname,vendor_username, shipping_address FROM vendors WHERE id = $1;",
          [row.vendor_id]
        );

        return { ...row, vendorDetails: vendorData.rows[0] || {} };
      })
    );

    // Fetch product details
    const productDetails = await Promise.all(
      vendorDetails.map(async (row) => {
        const productDetails = await pool.query(
          "SELECT * FROM products WHERE uniquepid = $1;",
          [row.product_uniqueid]
        );

        return { ...row, productDetails: productDetails.rows[0] || {} };
      })
    );

    // Fetch customer details based on customer_id
    const rowsWithCustomerInfo = await Promise.all(
      productDetails.map(async (row) => {
        const customerDetails = await pool.query(
          "SELECT * FROM customers WHERE customer_id = $1;",
          [row.customer_id]
        );

        const customerInfo = customerDetails.rows[0] || {};
        delete customerInfo.password;
        return { ...row, customerInfo };
      })
    );


    const doc = new jsPDF({
      orientation: 'portrait', // or 'landscape' as needed
      unit: 'in', // specifying unit as inchesR
      format: [4, 6] // specifying custom dimensions [width, height]
    });

    const { ispickup } = rowsWithCustomerInfo?.[0] || []
    let heightofline = 0;
    let brand_name_data = rowsWithCustomerInfo?.[0]?.vendorDetails?.brand_name
    if (ispickup) {
      const { vendorDetails } = rowsWithCustomerInfo?.[0] || [];
      const {
        brand_name,
        vendorname,
        business_model,
        company_city,
        company_state,
        company_country,
        company_zip_code,
        shipping_address,
      } = vendorDetails;

      // Set font size and position for "Picked From:" text
      doc.setFontSize(8); // Set font size to 10pt
      doc.text('Pickup From:', 0.15, 0.25); // Position "Picked From:" text

      let addressLines = [
        brand_name,
        vendorname,
        business_model,
        `${shipping_address},`,
        `${company_city}, ${company_state}, ${company_zip_code},`,
        `${company_country}`,
      ];

      addressLines.forEach((line, index) => {
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.setFontSize(6); // Set font size to 10pt
        doc.text(line, 0.15, 0.42 + index * 0.1); // Position each line of the address accordingly with smaller spacing
      });

      const lineHeight = 0.4 + addressLines.length * 0.1; // Calculate the vertical position of the line
      doc.setLineWidth(0.01); // Set line width
      doc.line(0.15, lineHeight + 0.05, 4 - 0.25, lineHeight + 0.05); // Draw a horizontal line

      heightofline = lineHeight + 0.05
    } else {
      const { deliveryAddress } = rowsWithCustomerInfo?.[0] || [];
      const {
        first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number
      } = deliveryAddress;
      // Set font size and position for "Ship to:" text
      doc.setFontSize(10); // Set font size to 10pt
      doc.text('Ship to:', 0.15, 0.25).setFont(undefined, 'bold');

      // Set font size and position for address text
      doc.setFontSize(9); // Set font size to 9pt for smaller text
      const addressLines = [
        `${first_name} ${last_name}`,
        `${email}, ${phone_number}`,
        `${street_address}, ${apartment}`,
        `${selected_city}, ${selected_state}`,
        `${zip_code}, ${selected_country}`
      ];

      addressLines.forEach((line, index) => {
        doc.setFont("helvetica", "bold"); // Set font to bold
        doc.setFontSize(6); // Set font size to 10pt
        doc.text(line, 0.15, 0.42 + index * 0.1); // Position each line of the address accordingly with smaller spacing
      });

      const lineHeight = 0.4 + addressLines.length * 0.1; // Calculate the vertical position of the line
      doc.setLineWidth(0.01); // Set line width
      doc.line(0.15, lineHeight + 0.05, 4 - 0.25, lineHeight + 0.05); // Draw a horizontal line

      heightofline = lineHeight
    }

    // Display "Order ID" text below the horizontal line
    doc.setFontSize(12)
    doc.text(`Order ID: ${order_id}`, 0.15, heightofline + 0.3).setFont(undefined, 'bold');
    doc.setFontSize(6)
    doc.text(`Thank you for buying from ${brand_name_data} on Nile Global Market-place`, 0.15, heightofline + 0.45)

    doc.setTextColor('#323232')
    doc.setFontSize(6)

    doc.text('Qty', 0.15, heightofline + 0.75)
    doc.text('Product Details', 0.75, heightofline + 0.75)
    doc.text('Unit Price', 0.75 + 1.45, heightofline + 0.75)
    doc.text('Extended Price', 0.75 + 2.15, heightofline + 0.75)
    doc.setFont('helvetica', 'light')

    const { quantity = 0, product_name, label, skuid_order, sell_price, total_amount, shipping_fee } = rowsWithCustomerInfo?.[0] || {}
    doc.text(`${quantity}`, 0.15, heightofline + 0.90)
    const maxWidth = 1.2; // Width in inches

    // Split the product name into multiple lines if it exceeds the maximum width
    const productNameLines = doc.splitTextToSize(product_name, maxWidth);

    // Calculate the height of the text based on the number of lines
    const lineHeight = 0.09; // Height of each line
    const productNameHeight = productNameLines.length * lineHeight;

    // Output the product name lines
    productNameLines.forEach((line, index) => {
      doc.text(line, 0.75, heightofline + 0.90 + (index * lineHeight));
    });

    // Output label and SKU
    if (label) {
      doc.text(label, 0.75, heightofline + 0.90 + productNameHeight);
    }
    doc.text(`SKU: ${skuid_order}`, 0.75, heightofline + 0.90 + productNameHeight + (label ? lineHeight : 0));
    doc.text(`$${sell_price}`, 0.75 + 1.45, heightofline + 0.90)
    doc.text(`$${total_amount * quantity}`, 0.75 + 2.15, heightofline + 0.90)

    doc.setFont('helvetica', 'bold')
    doc.text(`Sub Total:       $${total_amount * quantity}`, 0.75 + 2.15, heightofline + 1.40)
    doc.text(`Shipping:        ${shipping_fee || 0}`, 0.75 + 2.15, heightofline + 1.50)
    doc.text(`Grand Total:     $${(total_amount * quantity) + parseFloat(shipping_fee || 0)}`, 0.75 + 2.15, heightofline + 1.60)


    // res.status(200).json({ data: rowsWithCustomerInfo });
    // return
    res.setHeader('Content-Disposition', 'attachment; filename="payment_report.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(doc.output());
    // Send the fetched data as response


  } catch (error) {
    console.error('Error generating order slip:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;
