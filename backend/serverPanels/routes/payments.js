const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const { default: jsPDF } = require("jspdf");
require("jspdf-autotable");
const { Parser } = require('json2csv');
const ExcelJS = require('exceljs')

const moment = require('moment')

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.get("/earnings/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  const { page, pageSize, selectedOption } = req.query;

  // Define functions to calculate date range based on selected option
  const getDateRange = (option) => {
    const today = new Date();
    const startDate = new Date(today);

    switch (option) {
      case "last7days":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "last30days":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "last60days":
        startDate.setDate(startDate.getDate() - 60);
        break;
      case "last90days":
        startDate.setDate(startDate.getDate() - 90);
        break;
      case "last6months":
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case "last12months":
        startDate.setMonth(startDate.getMonth() - 12);
        break;
      case "last18months":
        startDate.setMonth(startDate.getMonth() - 18);
        break;
      case "last24months":
        startDate.setMonth(startDate.getMonth() - 24);
        break;
      default:
        startDate.setFullYear(1970); // Return all records
        break;
    }

    return { startDate, endDate: today };
  };

  // Convert page and pageSize to integers and handle default values
  const pageNumber = parseInt(page, 10) || 1;
  const limit = parseInt(pageSize, 10) || 10;
  const offset = (pageNumber - 1) * limit;

  try {
    // Calculate date range based on selected option
    const { startDate, endDate } = getDateRange(selectedOption);

    // Query to fetch earnings for a specific vendor with pagination and date range filter
    const earningsQuery = `
      SELECT
        p.*,
        COALESCE(
          (
            SELECT SUM(payment_amount)
            FROM payments sub
            WHERE sub.vendor_id = p.vendor_id
            AND sub.payment_status = 'Paid'
          ), 0
        ) AS total_earning,
        COALESCE(
          (
            SELECT SUM(payment_amount)
            FROM payments sub
            WHERE sub.vendor_id = p.vendor_id
            AND sub.payment_status = 'Pending'
          ), 0
        ) AS pending_amount,
        COALESCE(
          (
            SELECT SUM(payment_amount)
            FROM payments sub
            WHERE sub.vendor_id = p.vendor_id
            AND sub.payment_status = 'Withdrawn'
          ), 0
        ) AS withdrawn_amount
      FROM
        payments p
      WHERE
        p.vendor_id = $1
        AND p.payment_date >= $2
        AND p.payment_date <= $3
      ORDER BY p.payment_date DESC
      LIMIT $4
      OFFSET $5;
    `;

    // Query to count total records within the date range
    const countQuery = `
      SELECT COUNT(*) AS total_count
      FROM payments
      WHERE
        vendor_id = $1
        AND payment_date >= $2
        AND payment_date <= $3;
    `;

    // Execute both queries in parallel
    const [earningsResult, countResult] = await Promise.all([
      pool.query(earningsQuery, [vendor_id, startDate, endDate, limit, offset]),
      pool.query(countQuery, [vendor_id, startDate, endDate]),
    ]);

    // Extract total count from the countResult
    const totalCount = countResult.rows.length > 0 ? countResult.rows[0].total_count : 0;

    // Send the result as JSON response
    res.json({
      total_earning: earningsResult.rows[0].total_earning, // Assuming there's only one row for the vendor
      total_count: totalCount,
      payment_data: earningsResult.rows,
    });
  } catch (error) {
    console.error("Error fetching earnings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Define the route to fetch withdrawals by vendor_id
app.get("/withdrawals/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;

  try {
    // Use a SQL query to fetch withdrawals for the specified vendor_id
    const query = "SELECT * FROM withdrawals WHERE vendor_id = $1";
    const values = [vendor_id];
    const { rows } = await pool.query(query, values);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching withdrawals:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get('/payment-pdf', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;
    let startDate;
    let endDate = new Date(); // Initialize endDate to today's date

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'last30days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'last60days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 60);
        break;
      case 'last90days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'last6months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case 'last12months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 12);
        break;
      case 'last18months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 18);
        break;
      case 'last24months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 24);
        break;
      default:
        startDate = null; // Default to null for no filtering
        endDate = null; // Default to null for no filtering
    }

    const earningsQuery = `
        SELECT
          p.payment_date,
          p.payment_method,
          p.payment_amount,
          p.currency_code,
          p.payment_source,
          p.payment_status
        FROM
          payments p
        WHERE
          p.vendor_id = $1
          ${startDate ? 'AND p.payment_date >= $2' : ''}
          ${endDate ? 'AND p.payment_date <= $3' : ''}
        ORDER BY
          p.payment_date DESC;
      `;

    // Execute the earningsQuery to fetch payment data from the database
    const earningsResult = await pool.query(earningsQuery, [vendorId, startDate, endDate].filter(Boolean)); // Filter out null values

    // Extract payment data from the query result
    const paymentData = earningsResult.rows;

    // Create a new jsPDF document
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

    // Convert payment data into an array of arrays for the table body
    const tableBody = paymentData.map(payment => [
      moment(payment.payment_date).format("MMM D, YYYY HH:mm A"),
      payment.payment_method,
      `${payment.currency_code} ${parseFloat(payment.payment_amount).toFixed(2)}`,
      payment.payment_source,
      payment.payment_status,
    ]);

    // Add table to the document
    doc.autoTable({
      startY: 20,
      head: [['Payment Date', 'Payment Method', 'Payment Amount', 'Payment Source', 'Payment Status']],
      body: tableBody,
    });

    // Send the PDF file as response
    res.setHeader('Content-Disposition', 'attachment; filename="payment_report.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(doc.output());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/payment-csv', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;
    let startDate;
    let endDate = new Date(); // Initialize endDate to today's date

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        startDate = moment().subtract(7, 'days').toDate();
        break;
      case 'last30days':
        startDate = moment().subtract(30, 'days').toDate();
        break;
      case 'last60days':
        startDate = moment().subtract(60, 'days').toDate();
        break;
      case 'last90days':
        startDate = moment().subtract(90, 'days').toDate();
        break;
      case 'last6months':
        startDate = moment().subtract(6, 'months').toDate();
        break;
      case 'last12months':
        startDate = moment().subtract(12, 'months').toDate();
        break;
      case 'last18months':
        startDate = moment().subtract(18, 'months').toDate();
        break;
      case 'last24months':
        startDate = moment().subtract(24, 'months').toDate();
        break;
      default:
        startDate = null; // Default to null for no filtering
        endDate = null; // Default to null for no filtering
    }

    const earningsQuery = `
        SELECT
          p.payment_date,
          p.payment_method,
          p.payment_amount,
          p.currency_code,
          p.payment_source,
          p.payment_status
        FROM
          payments p
        WHERE
          p.vendor_id = $1
          ${startDate ? 'AND p.payment_date >= $2' : ''}
          ${endDate ? 'AND p.payment_date <= $3' : ''}
        ORDER BY
          p.payment_date DESC;
      `;

    // Execute the earningsQuery to fetch payment data from the database
    const earningsResult = await pool.query(earningsQuery, [vendorId, startDate, endDate].filter(Boolean)); // Filter out null values

    // Extract payment data from the query result
    const paymentData = earningsResult.rows;

    // Convert payment data into CSV format
    const fields = ['payment_date', 'payment_method', 'payment_amount', 'currency_code', 'payment_source', 'payment_status'];
    const json2csvParser = new Parser({
      fields,
      transforms: [row => ({ ...row, payment_date: moment(row.payment_date).format("MMM D, YYYY HH:mm A") })],
    });
    const csv = json2csvParser.parse(paymentData);

    // Send the CSV file as response
    res.setHeader('Content-Disposition', 'attachment; filename="payment_report.csv"');
    res.setHeader('Content-Type', 'text/csv');
    res.send(csv);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/payment-excel', async (req, res) => {
  try {
    const { vendorId, selectedOption } = req.query;

    let dateFilter;
    let startDate;
    let endDate = new Date(); // Initialize endDate to today's date

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'last30days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 30);
        break;
      case 'last60days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 60);
        break;
      case 'last90days':
        startDate = new Date();
        startDate.setDate(startDate.getDate() - 90);
        break;
      case 'last6months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 6);
        break;
      case 'last12months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 12);
        break;
      case 'last18months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 18);
        break;
      case 'last24months':
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 24);
        break;
      default:
        startDate = null; // Default to null for no filtering
        endDate = null; // Default to null for no filtering
    }

    const earningsQuery = `
        SELECT
          p.payment_date,
          p.payment_method,
          p.payment_amount,
          p.currency_code,
          p.payment_source,
          p.payment_status
        FROM
          payments p
        WHERE
          p.vendor_id = $1
          ${startDate ? 'AND p.payment_date >= $2' : ''}
          ${endDate ? 'AND p.payment_date <= $3' : ''}
        ORDER BY
          p.payment_date DESC;
      `;

    // Execute the earningsQuery to fetch payment data from the database
    const earningsResult = await pool.query(earningsQuery, [vendorId, startDate, endDate].filter(Boolean)); // Filter out null values

    // Extract payment data from the query result
    const paymentData = earningsResult.rows;

    // Create a new Excel workbook
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Payment Report');

    // Add headers
    worksheet.addRow(['Payment Date', 'Payment Method', 'Payment Amount', 'Payment Source', 'Payment Status']);

    // Add payment data
    paymentData.forEach(payment => {
      worksheet.addRow([
        moment(payment.payment_date).format("MMM D, YYYY HH:mm A"),
        payment.payment_method,
        `${payment.currency_code} ${parseFloat(payment.payment_amount).toFixed(2)}`,
        payment.payment_source,
        payment.payment_status,
      ]);
    });

    // Generate Excel file in memory
    const excelBuffer = await workbook.xlsx.writeBuffer();

    // Send the Excel file as response
    res.setHeader('Content-Disposition', 'attachment; filename="payment_report.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
