const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const cheerio = require("cheerio");
const sendEmail = require("./nodemailer");
const multer = require("multer");
const fs = require('fs');
const moment = require('moment')
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.post("/VendorProductOrder", async (req, res) => {
  const { type, vendorId, page = 1, pageSize = 10, value = '', tabchange, selectedOption } = req.body;
  console.log(req.body);
  try {
    let query = `
      SELECT vpo.*
      FROM vendorproductorder vpo
    `;
    const queryParams = [];

    if (type !== "admin") {
      // If it's not an admin query, add the vendor_id condition with WHERE
      query += " WHERE vpo.vendor_id = $1";
      queryParams.push(vendorId);
    }

    if (value && value.trim() !== '') {
      // Add conditions related to value
      query += ` ${type !== "admin" ? 'AND' : 'WHERE'} (`;
      // Add conditions related to value here
      query += ` vpo.product_name ILIKE $${queryParams.length + 1}::text OR`;
      queryParams.push(`%${value.trim()}%`);

      query += ` vpo.orderid ILIKE $${queryParams.length + 1}::text OR`;
      queryParams.push(`%${value.trim()}%`);

      query += ` vpo.order_status ILIKE $${queryParams.length + 1}::text OR`;
      queryParams.push(`%${value.trim()}%`);

      query += ` vpo.skuid_order ILIKE $${queryParams.length + 1}::text`;
      queryParams.push(`%${value.trim()}%`);

      query += ")";
    }

    if (tabchange && tabchange !== 'All') {
      if (type !== 'admin') { // Replace yourCondition with your specific condition
        // Add conditions related to tabchange with AND
        query += ` AND vpo.order_status = $${queryParams.length + 1}::text`;
      } else {
        // Add conditions related to tabchange with WHERE
        query += ` WHERE vpo.order_status = $${queryParams.length + 1}::text`;
      }
      queryParams.push(tabchange);
    }



    if (selectedOption) {
      // Adjust date filters based on the selected option
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
        // Add cases for other options
        default:
          startDate = null; // Handle default case
          break;
      }

      if (startDate) {
        // If there is already a condition in the query, add the new condition with "AND"
        query += queryParams.length ? ' AND' : ' WHERE';
        query += ` vpo.created_at >= $${queryParams.length + 1}::date`;
        queryParams.push(startDate);
      }

    }


    query += ` ORDER BY vpo.created_at DESC LIMIT $${queryParams.length + 1}::int OFFSET $${queryParams.length + 2}::int;`;
    const offset = (page - 1) * pageSize;
    queryParams.push(pageSize, offset);

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

    res.status(200).json(rowsWithVendorProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateRandomOrderID(length) {
  // Ensure the length is at least 1
  if (length < 1) {
    throw new Error('Length must be at least 1');
  }

  // Generate the first digit without starting with zero
  const firstDigit = Math.floor(Math.random() * 9) + 1;

  // Generate the remaining digits
  const remainingDigits = Array.from({ length: length - 1 }, () => Math.floor(Math.random() * 10)).join('');

  // Concatenate the first digit and remaining digits
  const randomOrderID = `${firstDigit}${remainingDigits}`;

  return randomOrderID;
}
const generateRandomWalletId = () => {
  const min = 10 ** 11; // 10^11 (minimum 12-digit number)
  const max = 10 ** 12 - 1; // 10^12 - 1 (maximum 12-digit number)

  const randomWalletId = Math.floor(Math.random() * (max - min + 1)) + min;
  return `WTXN${randomWalletId.toString()}`;
};

const fetchWalletToken = async (customerId) => {
  try {
    // Query to calculate the remaining wallet amount
    const remainingBalanceQuery = {
      text: `
              SELECT COALESCE(SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END), 0) as remaining_balance
              FROM customer_transactions
              WHERE customer_id = $1;
          `,
      values: [customerId],
    };

    const [remainingBalanceResult] = await Promise.all([
      pool.query(remainingBalanceQuery),
    ]);

    const totalBalance = remainingBalanceResult.rows.length > 0
      ? parseFloat(remainingBalanceResult.rows[0].remaining_balance)
      : 0;

    return { totalBalance };
  } catch (error) {
    console.error('Error fetching remaining balance:', error);
    throw new Error('Internal Server Error');
  }
};

function generateRandomOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}


app.post("/Insertorders", async (req, res) => {
  try {
    const { customer_id } = req.body[0]?.customerData
    const customerEmail = req.body[0]?.customerData?.email
    const orders = req.body[0]?.orders
    const { id } = req.body[0]?.paymentIntent
    const { selectedPaymentMode, checkoutItems = [], order_date, shippingRate } = req.body[0]
    // const { street, city, country, region, postalCode, name, given_name, family_name, phone_number, email } = req.body[0]?.shipping_address
    const { given_name_address = '', family_name_address = '', apt_address = '', subregion_address = '', city_address = '', country_address = '', region_address = '', zip_address = '', phone_address = '', email_address = '' } = req.body[0]?.shipping_address || []

    const order_status = 'Ordered'
    const order_id = generateRandomOrderID(8)

    const vendorIdToOtpMap = new Map();
    const customerotp = generateRandomOtp()

    const transformedOrders = orders.map((order) => {
      const category = order.category.trim()
      const subcategory = order.subcategory.trim()

      const pickup = checkoutItems.includes(parseInt(order.uniquepid))
      if (vendorIdToOtpMap.has(order.vendorid)) {
        otp = vendorIdToOtpMap.get(order.vendorid);
      } else {
        // Assign a new OTP for the vendor_id
        otp = generateRandomOtp();
        vendorIdToOtpMap.set(order.vendorid, otp);
      }

      return {
        order_id,
        product_name: order.ad_title,
        quantity: order.added_quantity,
        product_uniqueid: order.uniquepid,
        vendor_id: order.vendorid,
        product_image: order.images?.[0],
        currency_symbol: order.currency_symbol || 'USD',
        label: order.label,
        category,
        subcategory,
        product_type: order.condition, // Rename 'condition' to 'product_type'
        customer_id,
        transaction_id: id,
        commission_fee: 0,
        withdrawal_amount: 0,
        refund_amount: 0,
        fees_paid: 0,
        tax_collected: 0,
        payment_method: selectedPaymentMode,
        payment_status: 'Paid',
        order_date,
        order_status,
        total_amount: order.sellingprice,
        sellingprice: order.sellingprice,
        skuid_order: order.skuid,
        ispickup: pickup,
        sellerOtp: otp,
        customerotp,
        shippingRate,
        variant: order.isvariant
      };
    });

    const insertedOrders = []
    const insertedAddress = []
    let totalPaidAmount = 0
    for (const order of transformedOrders) {
      const currentDate = new Date();

      // Generate a random number between 5 and 10
      const randomDays = Math.floor(Math.random() * 6) + 5;

      // Create a new date by adding the random number of days to the current date
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + randomDays);

      const result = await pool.query(
        `INSERT INTO vendorproductorder (orderid, vendor_id, product_uniqueid, customer_id, order_date, total_amount, order_status, product_name,  product_image, currency_symbol, payment_method, payment_status, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, quantity, city, state, country, label, tentative_delivery_date, skuid_order, ispickup, seller_otp, customer_otp, created_at, shipping_fee, sell_price)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34)
         RETURNING *`, // Use RETURNING * to return all columns
        [
          order.order_id,
          order.vendor_id,
          order.product_uniqueid,
          customer_id,
          order.order_date,
          order.total_amount,
          order.order_status,
          order.product_name,
          order.product_image,
          order.currency_symbol,
          order.payment_method,
          order.payment_status,
          order.category,
          order.subcategory,
          order.product_type,
          order.transaction_id,
          order.commission_fee,
          order.withdrawal_amount,
          order.refund_amount,
          order.fees_paid,
          order.tax_collected,
          order.quantity,
          city_address,
          region_address,
          country_address,
          order.label,
          futureDate.toDateString(),
          order.skuid_order,
          order.ispickup,
          order.sellerOtp,
          order.customerotp,
          order.order_date,
          order.shippingRate,
          order.sellingprice
        ]
      );

      totalPaidAmount += parseFloat(order.total_amount * order?.quantity) + parseFloat(order.shippingRate || 0)

      const insertedOrderId = result.rows[0].order_id; // Get the inserted order_id

      if (!order.ispickup) {
        const resultAddress = await pool.query(
          `INSERT INTO customer_delivery_address (customer_id, first_name, last_name, selected_country, street_address, apartment, selected_city, selected_state, zip_code, email, phone_number, orderid, unique_order_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
         RETURNING *`, // Use RETURNING * to return all columns
          [
            order.customer_id,
            given_name_address, // Replace with the appropriate field name for first name
            family_name_address, // Replace with the appropriate field name for last name
            country_address,
            apt_address,
            subregion_address,
            city_address,
            region_address,
            zip_address,
            email_address,
            phone_address,
            order_id, // Assuming 'order_id' is the relevant value from transformedOrders
            insertedOrderId
          ]
        );
        // Add the inserted row to the array
        insertedOrders.push(result.rows[0]);
        insertedAddress.push(resultAddress.rows[0]);
      }

      if (order.variant === 'Simple') {
        // Simple product ke liye query
        await pool.query("UPDATE products SET quantity = quantity - $1 WHERE uniquepid = $2", [order.quantity, order.product_uniqueid]);
      } else {
        // Variant product ke liye query
        await pool.query("UPDATE variantproducts SET variant_quantity = variant_quantity - $1 WHERE product_uniqueid = $2 AND label = $3", [order.quantity, order.product_uniqueid, order.label]);
      }
    }

    let deleteQuery = `
          DELETE FROM cart
          WHERE customer_id = $1
      `;

    const queryParams = [customer_id];

    await pool.query(deleteQuery, queryParams);

    let walletamount = 0
    if (selectedPaymentMode === 'Wallet') {
      const paginatedData = await fetchWalletToken(customer_id);

      const walletId = generateRandomWalletId();
      walletamount = parseFloat(paginatedData?.totalBalance) - parseFloat(totalPaidAmount)
      // Insert data into the customer_transactions table
      const query = `
              INSERT INTO customer_transactions (
                  customer_id,
                  datetime,
                  description,
                  amount,
                  closing_balance,
                  wallet_txn_id,
                  send_to_user,
                  invoiceId,
                  status
              ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `;

      await pool.query(query, [
        customer_id,
        new Date(),
        'Paid for Products',
        -parseFloat(totalPaidAmount),
        parseFloat(paginatedData?.totalBalance) - parseFloat(totalPaidAmount),
        walletId,
        'Nile Global Market-place',
        0,
        'paid',
      ]);
    }

    // Calculate the overall total price
    const overallTotalPrice = insertedOrders.reduce((total, order) => {
      const discountedPrice = parseFloat(order.total_amount) * parseInt(order.quantity); // Convert to a number
      return total + discountedPrice;
    }, 0).toFixed(2);

    const paymentResult = await pool.query(
      `INSERT INTO payments (customer_id, order_id, payment_date, payment_method, payment_amount, payment_status,
          billing_address, billing_city, billing_state, billing_zip, currency_code, payment_source, vendor_id)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
          RETURNING *`, // Use RETURNING * to return all columns
      [
        customer_id,
        order_id,
        order_date,
        'Stripe', // Assuming payment method is Stripe
        overallTotalPrice, // Assuming overallTotalPrice is the total amount for the payment
        'Paid', // Assuming initial payment status is 'Paid'
        given_name_address, // Use the appropriate fields for billing address
        city_address,
        region_address,
        zip_address,
        'USD', // Assuming currency code is USD
        'Customer', // Payment source is Customer
        orders[0]?.vendorid, // Assuming vendor_id is taken from the first order in the list
      ]
    );

    const insertedPayment = paymentResult.rows[0];

    const orderDetailsHTML = insertedOrders.map((order) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.product_name}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${parseFloat(order.total_amount).toFixed(2)}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.label || ''}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.payment_method || ''}</td>
        </tr>
      `).join('');


    const emailBody = `
      <html>
        <body>
          <h1>Your Order Placed Successfully</h1>
          <p>Thank you for placing your order with us.</p>
          <p>Order details:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product Name</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Product Price</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantity</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Label</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Payment Method</th>
            </tr>
            ${orderDetailsHTML}
            <tr>
              <td colspan="3" style="text-align: right; border: none; padding: 8px;"><strong>Overall Total Price:</strong></td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">$${overallTotalPrice}</td>
            </tr>
          </table>

          <p>For any inquiries, please contact us.</p>
        </body>
      </html>
    `;


    // // Use the sendEmail function to send the email with the updated HTML content
    await sendEmail(customerEmail, `Order #${order_id}`, emailBody)
    console.log(walletamount);
    res.status(200).json({ message: 'Orders inserted successfully', insertedOrders, insertedAddress, insertedPayment, walletamount });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });

  }
})

app.get('/getAllCustomerOrder/:customer_id', async (req, res) => {
  const customer_id = req.params.customer_id;

  try {
    const query = `
      SELECT
        vpo.*,
        (
          SELECT json_agg(cda.*)
          FROM customer_delivery_address cda
          WHERE vpo.order_id = cda.unique_order_id
        ) AS shipping_address
      FROM
        vendorproductorder vpo
      WHERE
        vpo.customer_id = $1
      ORDER BY
        vpo.created_at DESC;
    `;

    const getRatingofThatOrder = `SELECT * FROM ratings_and_reviews WHERE customer_id = $1`;
    const getVendorDetailsQuery = `SELECT email, vendor_username, vendorname, brand_name, shipping_address, company_country,  company_zip_code,company_state, business_phone, company_city, company_name FROM vendors WHERE id = $1`;

    const valueAppend = [customer_id];

    const getResultofRating = await pool.query(getRatingofThatOrder, valueAppend);
    const { rows } = await pool.query(query, [customer_id]);

    for (let order of rows) {
      order.ratings_and_reviews = getResultofRating.rows.filter(rating => parseInt(rating.rate_order_id) === parseInt(order.order_id) && rating.product_uniqueid != 'vendor');

      // Fetch vendor details and append to order object
      const vendorDetails = await pool.query(getVendorDetailsQuery, [order.vendor_id]);
      order.vendor_details = vendorDetails.rows[0]; // Assuming there's only one vendor per order

      // Fetch return order data and append to order object
      const returnOrderQuery = `SELECT * FROM return_order WHERE order_id = $1`;
      const returnOrderResult = await pool.query(returnOrderQuery, [order.order_id]);
      const returnOrderData = returnOrderResult.rows[0] || null;

      // Update order_status based on return_status
      if (returnOrderData && returnOrderData.return_status) {
        order.order_status = `${returnOrderData.return_status}`;
      }

      order.return_order = returnOrderData;
    }

    res.json(rows);
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'An error occurred while fetching data' });
  }
});



app.get("/customer-orders-by-month/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const query = `
        SELECT 
            TO_CHAR(DATE_TRUNC('month', order_date), 'YYYY-MM') AS month_start,
            COUNT(DISTINCT customer_id) AS total_customers_with_orders,
            currency_symbol
        FROM 
            vendorproductorder
        WHERE
            vendor_id = $1
        GROUP BY 
            month_start, currency_symbol
        ORDER BY 
            month_start;
      `;

    const result = await pool.query(query, [vendor_id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/sales-by-month", async (req, res) => {
  const { type, vendorId } = req.body; // Get the "type" and "vendor_id" from the request body
  try {
    let query = `
      SELECT 
          TO_CHAR(DATE_TRUNC('month', order_date), 'YYYY-MM-DD') AS month_start,
          EXTRACT(YEAR FROM order_date) AS order_year,
          currency_symbol,
          SUM(quantity) AS total_quantity,
          SUM(total_amount * quantity) AS total_sales
      FROM 
          vendorproductorder
    `;

    if (type !== "admin") {
      query += `
        WHERE vendor_id = $1
      `;
    }

    query += `
      GROUP BY 
          month_start, order_year, currency_symbol
      ORDER BY 
          month_start;
    `;

    const queryParams = type !== "admin" ? [vendorId] : [];

    const { rows } = await pool.query(query, queryParams);

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/sales-by-day/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  const { date } = req.query;

  try {
    const selectedDate = new Date(date);
    const dayBeforeSelectedDate = new Date(selectedDate);
    dayBeforeSelectedDate.setDate(selectedDate.getDate() - 1);

    const query = `
    WITH SalesData AS (
      SELECT 
        TO_CHAR(DATE(order_date), 'YYYY-MM-DD') AS sale_date,
        SUM(total_amount * quantity) AS total_sales,
        currency_symbol
      FROM 
        vendorproductorder
      WHERE
        vendor_id = $1
        AND DATE(order_date) BETWEEN $3 AND $2
      GROUP BY 
        sale_date, currency_symbol
    )
    SELECT 
      sale_date,
      TO_CHAR((DATE(sale_date::date) - interval '1 day'), 'YYYY-MM-DD') AS day_before_sale_date,
      SUM(CASE WHEN sale_date::date = $2 THEN total_sales ELSE 0 END) AS total_sale_today,
      SUM(CASE WHEN sale_date::date = $3 THEN total_sales ELSE 0 END) AS day_before_sale,
      currency_symbol
    FROM 
      SalesData
    WHERE 
      sale_date::date = $2 OR sale_date::date = $3
    GROUP BY 
      sale_date, currency_symbol
    ORDER BY 
      currency_symbol, sale_date;
    `;

    const { rows } = await pool.query(query, [
      vendor_id,
      selectedDate,
      dayBeforeSelectedDate,
    ]);

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/completedOrders/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  const { date } = req.query;
  try {
    const query = `
      SELECT
        TO_CHAR(order_date, 'YYYY-MM-DD') AS custom_month,
        COUNT(*) AS total_completed_paid_orders
    FROM
        vendorproductorder
    WHERE
        order_status = 'Delivered'
        AND payment_status = 'Paid'
        AND TO_CHAR(order_date, 'YYYY-MM-DD') = $2 
        AND vendor_id = $1 
    GROUP BY
        TO_CHAR(order_date, 'YYYY-MM-DD');
    
    `;

    const { rows } = await pool.query(query, [vendor_id, date]);

    res.json(rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/scrape-exchange-rate", async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res
        .status(400)
        .json({ error: 'Both "from" and "to" currencies are required' });
    }

    const url = `https://www.xe.com/currencyconverter/convert/?Amount=1&From=${from}&To=${to}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const resultElement = $(".result__BigRate-sc-1bsijpp-1");
    const exchangeRate = resultElement.text().trim(); // Trim any extra whitespace

    res.json({ exchangeRate });
  } catch (error) {
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Error scraping data" });
  }
});

// Endpoint to get total purchases by month
app.get("/total-purchases/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  try {
    const query = `
      SELECT t1.month_start,
        t1.order_year,
        t1.total_purchases,
        SUM(t2.total_purchases) AS total_yearpurchase
      FROM (
          SELECT TO_CHAR(DATE_TRUNC('month', o.order_date), 'Mon YYYY') AS month_start,
                EXTRACT(YEAR FROM o.order_date) AS order_year,
                COUNT(*) AS total_purchases
          FROM vendorproductorder o
          WHERE o.vendor_id = $1
          GROUP BY TO_CHAR(DATE_TRUNC('month', o.order_date), 'Mon YYYY'), EXTRACT(YEAR FROM o.order_date)
      ) AS t1
      JOIN (
          SELECT EXTRACT(YEAR FROM o.order_date) AS year,
                COUNT(*) AS total_purchases
          FROM vendorproductorder o
          WHERE o.vendor_id = $1
          GROUP BY EXTRACT(YEAR FROM o.order_date)
      ) AS t2 ON t1.order_year = t2.year
      GROUP BY t1.month_start, t1.order_year, t1.total_purchases
      ORDER BY t1.month_start, t1.order_year;
    `;

    const { rows } = await pool.query(query, [vendor_id]);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.post("/payment-in-metrics", async (req, res) => {
  const { type, vendorId } = req.body;

  try {
    let query = `
      WITH PaymentMetrics AS (
        SELECT
            TO_CHAR(DATE_TRUNC('month', order_date), 'Mon YYYY') AS month_start,
            currency_symbol,
            SUM(CASE WHEN payment_status = 'Paid' THEN total_amount::numeric ELSE 0 END) AS completed_payments,
            SUM(CASE WHEN payment_status IS NULL THEN total_amount::numeric ELSE 0 END) AS pending_payments
        FROM
            vendorproductorder
        WHERE vendor_id = $1
        GROUP BY
            month_start, currency_symbol
      )
      SELECT
          month_start,
          currency_symbol,
          completed_payments,
          pending_payments,
          completed_payments + pending_payments AS total_payment_in
      FROM
          PaymentMetrics
      ORDER BY
          month_start, currency_symbol;
    `;

    if (type === "admin") {
      // If type is "admin", remove the WHERE clause
      query = `
        WITH PaymentMetrics AS (
          SELECT
              TO_CHAR(DATE_TRUNC('month', order_date), 'Mon YYYY') AS month_start,
              currency_symbol,
              SUM(CASE WHEN payment_status = 'Paid' THEN total_amount::numeric ELSE 0 END) AS completed_payments,
              SUM(CASE WHEN payment_status IS NULL THEN total_amount::numeric ELSE 0 END) AS pending_payments
          FROM
              vendorproductorder
          GROUP BY
              month_start, currency_symbol
        )
        SELECT
            month_start,
            currency_symbol,
            completed_payments,
            pending_payments,
            completed_payments + pending_payments AS total_payment_in
        FROM
            PaymentMetrics
        ORDER BY
            month_start, currency_symbol;
      `;
    }

    const { rows } = await pool.query(query, type == "admin" ? [] : [vendorId]);

    res.json(rows);
  } catch (error) {
    console.error("Error fetching payment in metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/payment-out-metrics", async (req, res) => {
  const { type, vendorId } = req.body; // Assuming the type is passed as a query parameter

  try {
    let query = `
      WITH PaymentOutMetrics AS (
        SELECT
            TO_CHAR(DATE_TRUNC('month', order_date), 'Mon YYYY') AS month_start,
            currency_symbol,
            SUM(CASE WHEN payment_status = 'Paid' THEN commission_fee::numeric ELSE 0 END) AS total_commission_fee,
            SUM(CASE WHEN payment_status = 'Paid' THEN withdrawal_amount::numeric ELSE 0 END) AS total_withdrawal_amount,
            SUM(CASE WHEN payment_status = 'Refunded' THEN refund_amount::numeric ELSE 0 END) AS total_refund_amount
        FROM
            vendorproductorder
    `;

    if (type !== "admin") {
      query += `
        WHERE
            vendor_id = $1 AND payment_status IN ('Paid', 'Refunded')
      `;
    }

    query += `
        GROUP BY
            month_start, currency_symbol
      )
      SELECT
          month_start,
          currency_symbol,
          total_commission_fee,
          total_withdrawal_amount,
          total_refund_amount,
          total_commission_fee + total_withdrawal_amount - total_refund_amount AS total_payment_out
      FROM
          PaymentOutMetrics
      ORDER BY
          month_start, currency_symbol;
    `;

    const { rows } = await pool.query(
      query,
      type !== "admin" ? [vendorId] : []
    );

    res.json(rows);
  } catch (error) {
    console.error("Error fetching payment out metrics:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/currentorders/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date parameter is required" });
  }

  try {
    // Use a prepared statement to avoid SQL injection
    const query = {
      text: "SELECT * FROM vendorproductorder WHERE vendor_id = $1 AND DATE(order_date) = $2",
      values: [vendor_id, date],
    };

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders" });
  }
});

app.get("/salesByCategory/:vendor_id", async (req, res) => {
  try {
    const { vendor_id } = req.params;

    // Use a prepared statement to avoid SQL injection
    const query = {
      text: `
        SELECT
          vendor_id,
          category,
          quantity,
          subcategory,
          currency_symbol,
          COUNT(*) AS sales_count,
          SUM(CAST(total_amount AS numeric)) AS total_sales_amount
        FROM
          vendorproductorder
        WHERE
          vendor_id = $1
        GROUP BY
          vendor_id,
          category,
          subcategory,
          currency_symbol,
          quantity
        ORDER BY
          vendor_id,
          subcategory,
          currency_symbol,
          category;
      `,
      values: [vendor_id],
    };

    const { rows } = await pool.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders" });
  }
});

app.get("/customer-count", async (req, res) => {
  try {
    const query = `
      SELECT
        CASE
          WHEN status = 0 THEN 'Pending'
          WHEN status = 1 THEN 'Blocked'
          WHEN status = 2 THEN 'Archived'
          WHEN status = 3 THEN 'Approved'
          WHEN status = 4 THEN 'Rejected'
        END AS status,
        COUNT(*) AS count
      FROM
        customers
      WHERE
        status IN (0, 1, 2, 3, 4)
      GROUP BY
        status;
    `;

    const { rows } = await pool.query(query);
    const counts = {
      Total: 0, // Initialize total count to 0
      Pending: 0,
      Blocked: 0,
      Archived: 0,
      Approved: 0,
      Rejected: 0,
    };

    // Update counts object with the retrieved counts
    rows.forEach((row) => {
      counts[row.status] = parseInt(row.count);
      counts.Total += parseInt(row.count); // Increment total count
    });

    res.json(counts);
  } catch (error) {
    console.error("Error fetching customer count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/vendor-count", async (req, res) => {
  try {
    const query = `
      SELECT
        CASE
          WHEN status = 0 THEN 'Pending'
          WHEN status = 1 THEN 'Blocked'
          WHEN status = 2 THEN 'Archived'
          WHEN status = 3 THEN 'Approved'
          WHEN status = 4 THEN 'Rejected'
        END AS status,
        COUNT(*) AS count
      FROM
        vendors
      WHERE
        status IN (0, 1, 2, 3, 4)
      GROUP BY
        status;
    `;

    const { rows } = await pool.query(query);
    const counts = {
      Total: 0, // Initialize total count to 0
      Pending: 0,
      Blocked: 0,
      Archived: 0,
      Approved: 0,
      Rejected: 0,
    };

    // Update counts object with the retrieved counts
    rows.forEach((row) => {
      counts[row.status] = parseInt(row.count);
      counts.Total += parseInt(row.count); // Increment total count
    });

    res.json(counts);
  } catch (error) {
    console.error("Error fetching vendor count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/chart-data", async (req, res) => {
  try {
    const selectedYear = req.query.year; // Get the selected year from the request query parameters
    const query = `
      SELECT
        TO_CHAR(order_date, 'Mon DD, YYYY') AS date,
        COUNT(*) AS TotalOrders,
        SUM(total_amount * quantity) AS Revenue,
        currency_symbol
      FROM
        vendorproductorder
      WHERE
        EXTRACT(YEAR FROM order_date::date) = $1
      GROUP BY
        date, currency_symbol
      ORDER BY
        date;
    `;

    const { rows } = await pool.query(query, [selectedYear]);
    const chartData = rows.map((row) => ({
      date: row.date,
      TotalOrders: parseInt(row.totalorders),
      Revenue: parseInt(row.revenue),
      currency_symbol: row.currency_symbol,
    }));

    res.json(chartData);
  } catch (error) {
    console.error("Error fetching chart data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

function padZero(number) {
  return number < 10 ? `0${number}` : number;
}

app.post("/manageStatus", async (req, res) => {
  try {
    const { order_id, status, vendorId, orderid } = req.body;
    const date = new Date(); // Replace this with your date object
    const formattedDate = `${date.getFullYear()}-${padZero(
      date.getMonth() + 1
    )}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(
      date.getMinutes()
    )}:${padZero(date.getSeconds())}`;

    // Update the order_status in the database
    const updateResult = await pool.query(
      "UPDATE vendorproductorder SET order_status = $1 WHERE order_id = $2",
      [status, order_id]
    );

    if (updateResult.rowCount > 0) {
      // Order status updated successfully, now insert a notification
      const notificationResult = await pool.query(
        "INSERT INTO vendors_notifications (vendor_id, type, title, message, date) VALUES ($1, $2, $3, $4, $5)",
        [
          vendorId,
          `Orders`,
          `Order ${status}`,
          `Order #${orderid} has been updated to ${status}.`,
          formattedDate,
        ]
      );

      if (notificationResult.rowCount > 0) {
        res.status(200).json({
          message:
            "Order status updated successfully and notification inserted",
        });
      } else {
        res.status(400).json({ message: "Failed to insert notification" });
      }
    } else {
      res.status(400).json({ message: "Failed to update order status" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/sales-and-returns", async (req, res) => {
  try {
    const { vendor_id } = req.body; // Get vendor_id from the request body

    // Your SQL query
    const query = `
      SELECT
        CAST("order_id" AS INT) AS "key",
        "product_name" AS "productName",
        "order_date" AS "saleDate",
        "product_uniqueid" AS "pid",
        CAST("total_amount" AS NUMERIC) AS "amountSold",
        CAST("fees_paid" AS NUMERIC) AS "fees",
        CAST("tax_collected" AS NUMERIC) AS "taxes",
        currency_symbol,
        COUNT(CASE WHEN "order_status" = 'Returned' THEN 1 ELSE NULL END) AS "returns"
    FROM
        vendorproductorder
    WHERE
        vendor_id = $1
        AND order_status IN ('Delivered', 'Returned')
        AND payment_status = 'Paid'
    GROUP BY
        "key", "productName", "saleDate", "product_uniqueid", "amountSold", "fees", "taxes", currency_symbol;
    `;

    const { rows } = await pool.query(query, [vendor_id]); // Execute the query with vendor_id

    res.json(rows); // Send the query result as JSON response
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

app.get('/getOrderDetails', async (req, res) => {
  try {
    const { orderId, customer_id } = req.query;

    // Fetch order details
    const orderResult = await pool.query('SELECT * FROM vendorproductorder WHERE order_id = $1 AND customer_id = $2', [orderId, customer_id]);

    if (orderResult.rows.length > 0) {
      const orderDetails = orderResult.rows[0];

      // Fetch customer data
      const customerResult = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [customer_id]);

      if (customerResult.rows.length > 0) {
        const customerData = customerResult.rows[0];
        delete customerData.password
        orderDetails.customer = customerData;

        // Fetch shipping address
        const deliveryAddressResult = await pool.query('SELECT * FROM customer_delivery_address WHERE unique_order_id = $1', [parseInt(orderId)]);

        if (deliveryAddressResult.rows.length > 0) {
          const shippingAddress = deliveryAddressResult.rows[0];
          orderDetails.shipping_address = shippingAddress;
        }

        // Fetch vendor details (only ID and name)
        const vendorResult = await pool.query('SELECT id, vendorname, company_name, company_city, company_state, company_country, company_zip_code, shipping_address  FROM vendors WHERE id = $1', [orderDetails.vendor_id]);

        if (vendorResult.rows.length > 0) {
          const vendorDetails = vendorResult.rows[0];
          orderDetails.vendor = vendorDetails

          // res.status(200).json(orderDetails);
          // Fetch data from vendorClaimBuyerIssue table based on customer_id and order_id
          const claimIssueResult = await pool.query('SELECT * FROM vendorClaimBuyerIssue WHERE customer_id = $1 AND order_id = $2', [customer_id, orderId]);

          if (claimIssueResult.rows.length > 0) {
            const claimIssueData = claimIssueResult.rows[0];
            res.status(200).json({ ...orderDetails, claim_issue_data: claimIssueData });
          } else {
            res.status(200).json({ ...orderDetails, claim_issue_data: null });
          }
        } else {
          res.status(404).json({ error: 'Vendor not found' });
        }
      } else {
        res.status(404).json({ error: 'Customer not found' });
      }
    } else {
      console.log('Order not found');
      res.status(404).json({ error: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/getDeliverOrder', async (req, res) => {
  try {
    const { tabLabel, page = 1, pageSize = 10 } = req.body;

    // Validate page and pageSize values
    const validatedPage = Math.max(parseInt(page, 10) || 1, 1);
    const validatedPageSize = Math.max(parseInt(pageSize, 10) || 10, 1);

    // Calculate the offset based on page and pageSize
    const offset = (validatedPage - 1) * validatedPageSize;

    let orderStatusQuery;
    let totalCountQuery;

    // Define the SQL queries based on the tabLabel
    switch (tabLabel) {
      case 'Dispatched':
        orderStatusQuery = `SELECT * FROM vendorproductorder WHERE order_status IN ('Shipped', 'Out for Delivery') LIMIT ${validatedPageSize} OFFSET ${offset}`;
        totalCountQuery = `SELECT COUNT(*) FROM vendorproductorder WHERE order_status IN ('Confirmed', 'Shipped', 'Out for Delivery')`;
        break;
      case 'Completed':
        orderStatusQuery = `SELECT * FROM vendorproductorder WHERE order_status IN ('Delivered', 'Picked') LIMIT ${validatedPageSize} OFFSET ${offset}`;
        totalCountQuery = `SELECT COUNT(*) FROM vendorproductorder WHERE order_status IN ('Delivered', 'Picked')`;
        break;
      case 'New Order':
        orderStatusQuery = `SELECT * FROM vendorproductorder WHERE order_status IN ('Ordered', 'Confirmed', 'Shipped', 'Out for Delivery') LIMIT ${validatedPageSize} OFFSET ${offset}`;
        totalCountQuery = `SELECT COUNT(*) FROM vendorproductorder WHERE order_status IN ('Ordered')`;
        break;
      default:
        res.status(400).json({ error: 'Invalid tabLabel' });
        return;
    }

    const result = await pool.query(orderStatusQuery);
    const orders = result.rows;

    // Append additional data from other tables
    const ordersWithAdditionalData = await Promise.all(
      orders.map(async (order) => {
        const deliveryAddressResult = await pool.query(`SELECT * FROM customer_delivery_address WHERE unique_order_id = ${order.order_id}`);
        const productResult = await pool.query(`SELECT mrp, sellingprice FROM products WHERE uniquepid = ${order.product_uniqueid}`);
        const customerResult = await pool.query(`SELECT customer_id, given_name, family_name, email, phone_number FROM customers WHERE customer_id = ${order.customer_id}`);
        const vendorResult = await pool.query(`SELECT id, vendorname, brand_name, email, mobile_number FROM vendors WHERE id = ${order.vendor_id}`);

        return {
          ...order,
          delivery_address: deliveryAddressResult.rows[0],
          product_info: productResult.rows[0],
          customer_info: customerResult.rows[0],
          vendor_info: vendorResult.rows[0],
        };
      })
    );

    const totalCountResult = await pool.query(totalCountQuery);
    const totalCount = parseInt(totalCountResult.rows[0].count, 10);

    res.status(200).json({ orders: ordersWithAdditionalData, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/updateOrderStatus', async (req, res) => {
  try {
    const { orderId, newStatus, otp } = req.body;

    // Don't ask for OTP if newStatus is "Out for Delivery" or "Confirmed"
    if (newStatus !== 'Out for Delivery' && newStatus !== 'Confirmed' && !otp) {
      res.status(400).json({ error: 'OTP is required for "Delivered" or "Shipped" status' });
      return;
    }

    // Verify OTP logic only when the new status is "Delivered" or "Shipped"
    if (otp && (newStatus === 'Delivered' || newStatus === 'Shipped')) {
      const orderQuery = 'SELECT seller_otp, customer_otp FROM vendorproductorder WHERE order_id = $1';
      const orderResult = await pool.query(orderQuery, [orderId]);

      if (!orderResult.rows || orderResult.rows.length === 0) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }

      const storedSellerOtp = orderResult.rows[0].seller_otp;
      const storedCustomerOtp = orderResult.rows[0].customer_otp;

      // Verify seller OTP for statuses other than "Delivered"
      if (newStatus !== 'Delivered' && otp !== storedSellerOtp) {
        res.status(401).json({ error: 'Invalid Seller OTP' });
        return;
      }

      // Verify customer OTP for "Delivered" status
      if (newStatus === 'Delivered' && otp !== storedCustomerOtp) {
        res.status(401).json({ error: 'Invalid Customer OTP' });
        return;
      }
    }

    // Assuming vendorproductorder has a column named order_status
    const updateQuery = 'UPDATE vendorproductorder SET order_status = $1 WHERE order_id = $2';
    const values = [newStatus, orderId];

    const result = await pool.query(updateQuery, values);

    res.status(200).json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/fetchOrderProducts", async (req, res) => {
  try {
    const { vendorid, otp, selectedAction } = req.body;

    // Perform a query to fetch data based on vendorid and otp
    const query = `
      SELECT *
      FROM vendorproductorder
      WHERE vendor_id = $1 AND seller_otp = $2;
    `;

    console.log(vendorid, otp);
    const result = await pool.query(query, [vendorid, otp]);

    // Check if any rows were returned
    if (result.rows.length > 0) {
      // Data found, you can now handle the data or send it in the response
      const orderProducts = result.rows;

      // You can perform additional actions based on the selectedAction if needed

      res.status(200).json(orderProducts);
    } else {
      // No data found for the given vendorid and otp
      res.status(404).json({ error: 'No matching data found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post("/shipSelectedProducts", async (req, res) => {
  try {
    const { vendorid, selectedAction, selectedOrderIds } = req.body;

    // Validate the inputs if needed

    // Update the order_status for selectedOrderIds in the database
    const updateQuery = `
          UPDATE vendorproductorder
          SET order_status = $1
          WHERE vendor_id = $2 AND order_id IN (${selectedOrderIds.map((_, index) => `$${index + 3}`).join(', ')});
      `;

    const updateParams = [selectedAction, vendorid, ...selectedOrderIds];

    await pool.query(updateQuery, updateParams);

    console.log(`Order status updated for selectedOrderIds: ${selectedOrderIds}`);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const imgReturns = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/Returns");
  },
  filename: (req, file, callback) => {
    callback(null, `Returns-${Date.now()}-${file.originalname}`);
  },
});

// img filter
const isReturns = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

const uploadReturn = multer({
  storage: imgReturns,
  fileFilter: isReturns,
});

// POST endpoint to handle return updates
app.post("/updateReturn", uploadReturn.array('images'), async (req, res) => {
  try {
    // Log uploaded files
    const uploadedImages = req.files.map((file) => file.filename);

    const returnOtp = generateRandomOtp()
    // Combine uploaded images with other form data
    const formData = {
      reason: req.body.reason,
      order_id: req.body.order_id,
      details: req.body.details,
      images: uploadedImages, // Add uploaded images to the form data
    };
    console.log("Form data:", formData);

    // Begin a transaction
    await pool.query('BEGIN');

    try {
      // Delete old images associated with the order_id
      const oldImagesResult = await pool.query('SELECT medias_return FROM return_order WHERE order_id = $1', [formData.order_id]);
      if (oldImagesResult.rows.length > 0) {
        const oldImages = oldImagesResult.rows[0].medias_return;
        oldImages.forEach((oldImage) => {
          try {
            fs.unlinkSync(`./uploads/Returns/${oldImage}`);
            console.log(`Deleted old image: ${oldImage}`);
          } catch (error) {
            // console.error(`Error deleting old image ${oldImage}:`, error.message);
            return
          }
        });
      }


      // SQL query to insert or update return_order table
      const query = `
        INSERT INTO return_order (return_id, reason_return, order_id, medias_return, detail_text, return_status)
        VALUES (DEFAULT, $1, $2, $3, $4, 'Return Pending')
        ON CONFLICT (order_id)
        DO UPDATE SET
        reason_return = EXCLUDED.reason_return,
        medias_return = EXCLUDED.medias_return,
        detail_text = EXCLUDED.detail_text,
        return_status = 'Return Pending';
      `;

      // Execute the SQL query with the form data
      const result = await pool.query(query, [
        formData.reason,
        formData.order_id,
        formData.images,
        formData.details,
      ]);

      const updateOrderStatusQuery = `
        UPDATE vendorproductorder
        SET order_status = 'Returned', return_otp = $2
        WHERE order_id = $1;
      `;
      await pool.query(updateOrderStatusQuery, [formData.order_id, returnOtp]);

      // Commit the transaction
      await pool.query('COMMIT');

      // Check if the query was successful
      if (result.rowCount > 0) {
        console.log("Return updated successfully");
        res.status(200).json({ message: 'Return updated successfully' });
      } else {
        console.log("No records updated");
        res.status(400).json({ error: 'No records updated' });
      }
    } catch (error) {
      // Rollback the transaction if an error occurs
      await pool.query('ROLLBACK');
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/getReturnByOrder_id/:order_id", async (req, res) => {
  try {
    const { order_id } = req.params;
    const query = 'SELECT * FROM return_order WHERE order_id = $1';
    const result = await pool.query(query, [order_id]);
    const returnData = result.rows;

    if (returnData.length > 0) {
      res.status(200).json(returnData);
    } else {
      res.status(404).json({ message: 'No return found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/getOrderByOrder_Id/:order_id/:id", async (req, res) => {
  try {
    const { order_id, id } = req.params;
    console.log(id, 'id');
    // Query to fetch order details
    const orderQuery = 'SELECT * FROM vendorproductorder WHERE order_id = $1 AND vendor_id = $2';
    const orderResult = await pool.query(orderQuery, [order_id, id]);
    const orderRows = orderResult.rows;

    // Check if order details exist
    if (!orderRows || orderRows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Fetch customer details based on the customer_id from the orderRows
    const customerQuery = 'SELECT given_name, family_name, email, phone_number FROM customers WHERE customer_id = $1';
    const customerResult = await pool.query(customerQuery, [orderRows[0].customer_id]);
    const customerRows = customerResult.rows;

    // Fetch vendor details based on the vendor_id from the orderRows
    const vendorQuery = 'SELECT * FROM vendors WHERE id = $1';
    const vendorResult = await pool.query(vendorQuery, [orderRows[0].vendor_id]);
    const vendorRows = vendorResult.rows;

    // Query to fetch delivery address details
    const addressQuery = 'SELECT * FROM customer_delivery_address WHERE unique_order_id = $1';
    const addressResult = await pool.query(addressQuery, [orderRows[0].order_id]);
    const addressRows = addressResult.rows;

    delete vendorRows?.[0]?.password
    // Append customer, vendor, and delivery address details to the order details
    const orderDetails = {
      ...orderRows[0],
      customer: customerRows?.[0] || null,
      vendor: vendorRows?.[0] || null,
      delivery_address: addressRows?.[0] || null
    };

    // Send the combined response
    res.status(200).json(orderDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/handleRequestforArrived', async (req, res) => {
  try {
    const { vendor_id, customer_id, product_uniqueid, selected_option, request_text, created_at_request, order_id } = req.body;

    // Convert request_text to a stringified JSON array
    const requestTextArray = JSON.stringify([{ text: request_text, created_at: created_at_request }]);

    // Check if a record with the same customer_id, product_uniqueid, and order_id exists
    const existingRecord = await pool.query('SELECT * FROM items_not_arrived WHERE customer_id = $1 AND product_uniqueid = $2 AND order_id = $3', [customer_id, product_uniqueid, order_id]);

    if (existingRecord.rows.length > 0) {
      // If a record exists, fetch the existing request_text array and append the new text along with its creation time
      const existingRequestTextArray = JSON.parse(existingRecord.rows[0].request_text);
      existingRequestTextArray.push({ text: request_text, created_at: created_at_request }); // Append the new text along with its creation time
      const updatedRequestText = JSON.stringify(existingRequestTextArray); // Convert the updated array to a string

      // Update the existing record with the updated request_text
      await pool.query('UPDATE items_not_arrived SET selected_option = $1, request_text = $2, created_at_request = $3 WHERE customer_id = $4 AND product_uniqueid = $5 AND order_id = $6', [selected_option, updatedRequestText, created_at_request, customer_id, product_uniqueid, order_id]);
    } else {
      // If no record exists, insert a new record with the request_text as an array containing only the new text along with its creation time
      await pool.query('INSERT INTO items_not_arrived (vendor_id, customer_id, product_uniqueid, selected_option, request_text, created_at_request, order_id) VALUES ($1, $2, $3, $4, $5, $6, $7)', [vendor_id, customer_id, product_uniqueid, selected_option, requestTextArray, created_at_request, order_id]);
    }

    // Log a success message
    console.log('Data inserted/updated successfully.');

    // Send a response indicating success
    res.status(200).json({ message: 'Data inserted/updated successfully.' });
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error inserting/updating data:', error);
    // Send a 500 status response with an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/itemsNotReceived/:id", async (req, res) => {
  const vendorId = req.params.id;

  try {
    // Fetch data from items_not_arrived table based on vendor_id
    const itemsQuery = `
      SELECT *
      FROM items_not_arrived
      WHERE vendor_id = $1;
    `;
    const itemsResult = await pool.query(itemsQuery, [vendorId]);
    const itemsRows = itemsResult.rows;

    // Fetch customer details from the customers table
    const customersQuery = `
      SELECT customer_id, given_name, family_name, email, phone_number
      FROM customers
      WHERE customer_id = $1; -- Assuming there's a vendor_id column in the customers table
    `;
    const customersResult = await pool.query(customersQuery, [itemsRows?.[0]?.customer_id]);
    const customersRows = customersResult.rows;

    const productsQuery = `
      SELECT uniquepid, ad_title, prod_slug
      FROM products 
      WHERE uniquepid = $1; -- Assuming there's a vendor_id column in the products table
    `;
    const productsResult = await pool.query(productsQuery, [itemsRows?.[0]?.product_uniqueid]);
    const productsRows = productsResult.rows;

    // Combine customer details with each item
    const data = itemsRows.map(item => {
      const customerId = item.customer_id;
      const customer = customersRows.find(customer => customer.customer_id === customerId);
      return {
        ...item,
        customer: {
          given_name: customer ? customer.given_name : null,
          family_name: customer ? customer.family_name : null,
          email: customer ? customer.email : null,
          phone_number: customer ? customer.phone_number : null,
        },
        product: productsRows?.[0]
      };
    });

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json([]); // Send an empty array in case of an error
  }
});


app.get("/itemsNotReceivedByOrderId/:orderId", async (req, res) => {
  const orderId = req.params.orderId;

  try {
    // Fetch data from items_not_arrived table based on order_id
    const query = `
      SELECT *
      FROM items_not_arrived
      WHERE order_id = $1;
    `;
    const { rows } = await pool.query(query, [orderId]);

    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json([]); // Send an empty array in case of an error
  }
});

app.delete('/itemsNotReceived_Delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    // Execute the SQL DELETE query to remove the record from the database
    const deleteQuery = `
      DELETE FROM items_not_arrived
      WHERE id = $1;
    `;
    await pool.query(deleteQuery, [id]);

    // Send a success response back to the client
    res.status(200).json({ message: 'Data deleted successfully.' });
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error deleting data:', error);
    // Send a 500 status response with an error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/replyToItemNotReceived', async (req, res) => {
  try {
    const { id, replyText } = req.body;

    // Fetch the existing item from the database
    const getItemQuery = `
      SELECT *
      FROM items_not_arrived
      WHERE id = $1;
    `;
    const { rows } = await pool.query(getItemQuery, [id]);
    const item = rows[0];

    // Parse the existing response text array or initialize an empty array
    const responseTextArray = item.response_text_from_seller ? JSON.parse(item.response_text_from_seller) : [];

    // Add the new reply text and created_at to the array
    responseTextArray.push({ text: replyText, created_at: new Date().toISOString() });

    // Update the item in the database with the new response text array
    const updateItemQuery = `
      UPDATE items_not_arrived
      SET response_text_from_seller = $1
      WHERE id = $2;
    `;
    await pool.query(updateItemQuery, [JSON.stringify(responseTextArray), id]);

    res.status(200).json({ message: 'Reply sent successfully.' });
  } catch (error) {
    console.error('Error replying to item not received:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post("/cancelOrderByVendor", async (req, res) => {
  try {
    // Extract data from the request body
    const { reason, confirmCancellation, order_id, customer_id, vendor_id, product_uniqueid, label, details_charge, total_amount, refundable_amount, currentDateTime } = req.body;

    // Check if a row already exists with the provided order_id, customer_id, and vendor_id
    const checkQuery = 'SELECT * FROM product_order_cancel WHERE customer_id = $1 AND vendor_id = $2 AND order_id = $3';
    const checkValues = [customer_id, vendor_id, order_id];
    const checkResult = await pool.query(checkQuery, checkValues);

    // If a row already exists, send a response indicating the order is already processed for cancellation
    if (checkResult.rows.length > 0) {
      return res.status(400).json({ message: 'This order is already processed for cancellation' });
    }

    // If no row exists, insert data into product_order_cancel table
    const insertQuery = 'INSERT INTO product_order_cancel (customer_id, vendor_id, order_id, product_id, label, selected_reason, refund_amount, total_amount, detail_charges, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)';
    const insertValues = [customer_id, vendor_id, order_id, product_uniqueid, label || '', reason, refundable_amount, total_amount, JSON.stringify(details_charge), currentDateTime];
    await pool.query(insertQuery, insertValues);

    console.log('Data inserted into product_order_cancel table:', req.body);

    // If confirmCancellation is true, increment quantity in products table
    if (confirmCancellation) {
      const incrementQuantityQuery = 'UPDATE products SET quantity = quantity + 1 WHERE uniquepid = $1';
      const incrementQuantityValues = [product_uniqueid];
      await pool.query(incrementQuantityQuery, incrementQuantityValues);
    }

    const updateStatusQuery = 'UPDATE vendorproductorder SET order_status = $1 WHERE order_id = $2';
    const updateStatusValues = ['Cancelled', order_id];
    await pool.query(updateStatusQuery, updateStatusValues);

    // Send success response
    res.status(200).json({ message: 'Data inserted into product_order_cancel table' });
  } catch (error) {
    console.error('Error inserting data into product_order_cancel table:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/markAsShipped', async (req, res) => {
  try {
    const { order_id, vendorId } = req.body;

    // Check if the order status is already Delivered, Picked, or Ret (starts with)
    const queryCheckStatus = `
      SELECT order_status FROM vendorproductorder
      WHERE order_id = $1 AND vendor_id = $2
    `;
    const { rows } = await pool.query(queryCheckStatus, [order_id, vendorId]);
    const currentStatus = rows[0]?.order_status;

    if (currentStatus && ['Delivered', 'Picked'].includes(currentStatus) || currentStatus.startsWith('Ret')) {
      return res.status(400).json({ error: 'Order status cannot be updated. It is already Delivered, Picked, or in Return process.' });
    }

    // If the order status is not already Delivered, Picked, or in Return process, update it to Shipped
    const queryUpdateStatus = `
      UPDATE vendorproductorder
      SET order_status = 'Shipped'
      WHERE order_id = $1 AND vendor_id = $2
    `;
    await pool.query(queryUpdateStatus, [order_id, vendorId]);

    res.status(200).json({ message: 'Order status updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
