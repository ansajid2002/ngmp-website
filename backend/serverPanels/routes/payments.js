const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.get("/earnings/:vendor_id", async (req, res) => {
  const { vendor_id } = req.params;

  try {
    // SQL query to fetch the full row, total earning, and pending amount for a specific vendor
    const query = `
        SELECT
        p.*,
        COALESCE(
            (
                SELECT
                    SUM(payment_amount)
                FROM
                    payments sub
                WHERE
                    sub.vendor_id = p.vendor_id
                    AND sub.payment_status = 'Paid'
            ), 0) AS total_earning,
        COALESCE(
            (
                SELECT
                    SUM(payment_amount)
                FROM
                    payments sub
                WHERE
                    sub.vendor_id = p.vendor_id
                    AND sub.payment_status = 'Pending'
            ), 0) AS pending_amount,
        COALESCE(
            (
                SELECT
                    SUM(payment_amount)
                FROM
                    payments sub
                WHERE
                    sub.vendor_id = p.vendor_id
                    AND sub.payment_status = 'Withdrawn'
            ), 0) AS withdrawn_amount
    FROM
        payments p
    WHERE
        p.vendor_id = $1;

      `;

    // Execute the query with the provided vendor_id
    const result = await pool.query(query, [vendor_id]);

    // Send the result as JSON response
    res.json(result.rows); // Assuming there's only one row for the vendor
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

module.exports = app;
