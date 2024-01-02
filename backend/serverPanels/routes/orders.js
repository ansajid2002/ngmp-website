const express = require("express");
const app = express();
const pool = require("../config");
const bcrypt = require("bcrypt");
const cors = require("cors");
const cheerio = require("cheerio");
const sendEmail = require("./nodemailer");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.post("/VendorProductOrder", async (req, res) => {
  const { type, vendorId } = req.body;
  try {
    let query = `
      SELECT vpo.*, cda.*, p.*
      FROM vendorproductorder vpo
      LEFT JOIN customer_delivery_address cda ON vpo.order_id = cda.unique_order_id
      LEFT JOIN products p ON vpo.product_uniqueid = p.uniquepid
    `;

    if (type !== "admin") {
      // If the type is not "admin," fetch data for the specified vendor_id
      query += " WHERE vpo.vendor_id = $1;";
    } else {
      // If the type is "admin," fetch all data without specifying a vendor_id
      query += ";";
    }

    const { rows } = await pool.query(
      query,
      type !== "admin" ? [vendorId] : []
    );

    // Fetch additional details from the vendors table for each vendor_id
    const rowsWithVendorProfiles = await Promise.all(
      rows.map(async (row) => {
        const vendorDetails = await pool.query(
          "SELECT brand_name, email, country_code, mobile_number, status, vendor_profile_picture_url, brand_logo, vendorname, company_city, company_zip_code, company_state, company_country, shipping_address FROM vendors WHERE id = $1;",
          [row.vendor_id]
        );

        const vendorProfile = vendorDetails.rows[0] || {};

        return { ...row, vendorProfile };
      })
    );

    res.status(200).json(rowsWithVendorProfiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function generateRandomOrderID(length) {
  // Generate a random number with the specified length
  const randomNumber = Math.floor(Math.random() * Math.pow(10, length));

  // Convert the random number to a string and pad it with leading zeros if needed
  const paddedNumber = randomNumber.toString().padStart(length, '0');
  return paddedNumber;
}

app.post("/Insertorders", async (req, res) => {
  try {
    const { customer_id } = req.body[0]?.customerData
    const customerEmail = req.body[0]?.customerData?.email
    const orders = req.body[0]?.orders
    const { id } = req.body[0]?.paymentIntent
    // const { street, city, country, region, postalCode, name, given_name, family_name, phone_number, email } = req.body[0]?.shipping_address
    const { given_name_address, family_name_address, apt_address, subregion_address, city_address, country_address, region_address, zip_address, phone_address, email_address } = req.body[0]?.shipping_address
    const date = new Date();
    const order_date = date.toISOString();
    const order_status = 'Ordered'
    const order_id = generateRandomOrderID(8)

    const transformedOrders = orders.map((order) => {
      const category = order.category.trim()
      const subcategory = order.subcategory.trim()
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
        payment_method: 'Stripe',
        payment_status: 'Paid',
        order_date,
        order_status,
        total_amount: order.sellingprice,
        skuid_order: order.skuid
      };
    });

    const insertedOrders = []
    const insertedAddress = []

    for (const order of transformedOrders) {
      const currentDate = new Date();

      // Generate a random number between 5 and 10
      const randomDays = Math.floor(Math.random() * 6) + 5;

      // Create a new date by adding the random number of days to the current date
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + randomDays);

      const result = await pool.query(
        `INSERT INTO vendorproductorder (orderid, vendor_id, product_uniqueid, customer_id, order_date, total_amount, order_status, product_name,  product_image, currency_symbol, payment_method, payment_status, category, subcategory, product_type, transaction_id, commission_fee, withdrawal_amount, refund_amount, fees_paid, tax_collected, quantity, city, state, country, label, tentative_delivery_date, skuid_order)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28)
         RETURNING *`, // Use RETURNING * to return all columns
        [
          order.order_id,
          order.vendor_id,
          order.product_uniqueid,
          order.customer_id,
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
          order.skuid_order
        ]
      );

      const insertedOrderId = result.rows[0].order_id; // Get the inserted order_id

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



      let deleteQuery = `
            DELETE FROM cart
            WHERE customer_id = $1
        `;

      const queryParams = [customer_id];

      await pool.query(deleteQuery, queryParams);
    }

    // Calculate the overall total price
    // Calculate the overall total price with discounts applied
    const overallTotalPrice = insertedOrders.reduce((total, order) => {
      const discountedPrice = parseFloat(order.total_amount); // Convert to a number
      return total + discountedPrice;
    }, 0).toFixed(2);

    const orderDetailsHTML = insertedOrders.map((order) => `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.product_name}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${parseFloat(order.total_amount).toFixed(2)}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.quantity}</td>
          <td style="border: 1px solid #ddd; padding: 8px; text-align: left;">${order.label || ''}</td>
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


    // Use the sendEmail function to send the email with the updated HTML content
    await sendEmail(customerEmail, `Order #${order_id}`, emailBody)

    res.status(200).json({ message: 'Orders inserted successfully', insertedOrders, insertedAddress, insertedPayment });

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


    const { rows } = await pool.query(query, [customer_id]);
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
    console.log(req.body);
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
        COUNT(CASE WHEN "order_status" = 'Refunded' THEN 1 ELSE NULL END) AS "returns"
    FROM
        vendorproductorder
    WHERE
        vendor_id = $1
        AND "order_status" IN ('Delivered', 'Refunded')
        AND "payment_status" = 'Paid'
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
        const vendorResult = await pool.query('SELECT id, vendorname FROM vendors WHERE id = $1', [orderDetails.vendor_id]);

        if (vendorResult.rows.length > 0) {
          const vendorDetails = vendorResult.rows[0];
          orderDetails.vendor = vendorDetails

          res.status(200).json(orderDetails);
        } else {
          res.status(404).json({ error: 'Vendor not found' });
        }
      } else {
        console.log('Customer not found');
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



module.exports = app;
