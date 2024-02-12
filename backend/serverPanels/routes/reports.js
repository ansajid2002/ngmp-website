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

// Define an endpoint for receiving the PDF file
app.post("/receiveReportPDF", async (req, res) => {
  try {
    const pdfData = req.body.pdfData; // Assuming you send the PDF data in the request body
    const pdfFileName = `report_${new Date().toISOString()}.pdf`;
    const htmlFileName = `report_${new Date().toISOString()}.html`;

    // Specify the paths where you want to store the PDF and HTML files
    const pdfFilePath = `/uploads/ReportsVendors/${pdfFileName}`;
    const htmlFilePath = `/uploads/ReportsVendors/${htmlFileName}`;

    // Save the PDF file to the server
    fs.writeFileSync(pdfFilePath, pdfData);

    // Create an HTML file with a link to the saved PDF
    const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Report PDF</title>
          </head>
          <body>
            <h1>Report PDF</h1>
            <p><a href="${pdfFileName}" target="_blank">View PDF</a></p>
          </body>
        </html>
      `;

    // Save the HTML file to the server
    fs.writeFileSync(htmlFilePath, htmlContent);

    // You can now store the HTML file path in your database or return it as a response to the client.

    res
      .status(200)
      .json({ message: "PDF received and saved as HTML successfully" });
  } catch (error) {
    console.error("Error receiving and saving PDF as HTML:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
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
  try {
    const { vendorId, value = '', selectedOption, tabchange } = req.query;

    // Construct the WHERE clause for filtering orders based on search criteria
    let whereClause = '';
    let queryParams = [vendorId, `%${value}%`, `%${value}%`, `%${value}%`, `%${value}%`];

    if (selectedOption === 'last7days') {
      const date = new Date();
      date.setDate(date.getDate() - 7); // Get the date 7 days ago
      whereClause += ' AND vpo.created_at >= $6::date';
      queryParams.push(date);
    } else if (selectedOption === 'last30days') {
      const date = new Date();
      date.setDate(date.getDate() - 30); // Get the date 30 days ago
      whereClause += ' AND vpo.created_at >= $6::date';
      queryParams.push(date);
    }
    // Add conditions for other selectedOptions if needed

    // Construct the SQL query
    const query = `
      SELECT vpo.*
      FROM vendorproductorder vpo
      WHERE vpo.vendor_id = $1 
        AND (vpo.product_name ILIKE $2::text OR vpo.orderid ILIKE $3::text OR vpo.order_status ILIKE $4::text OR vpo.skuid_order ILIKE $5::text)
        ${whereClause}
      ORDER BY vpo.created_at DESC;
    `;

    // Execute the query
    const { rows } = await pool.query(query, queryParams);

    // Generate PDF
    console.log(rows);
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;
