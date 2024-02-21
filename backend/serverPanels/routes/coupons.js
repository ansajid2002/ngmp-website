const express = require('express');
const app = express();
const pool = require('../config'); // Make sure you've configured your database connection pool
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Middleware to set the database connection pool on the request object
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Endpoint to get coupons by vendorId
app.get('/getCouponsByVendorId', async (req, res) => {
    try {
        const vendorId = req.query.vendorId;
        console.log(vendorId);
        // Fetch coupons for the given vendorId
        const result = await pool.query('SELECT * FROM coupons WHERE vendorid = $1', [vendorId]);
        const coupons = result.rows;

        res.json(coupons);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addCoupons', async (req, res) => {
    try {
        const { coupon_code, discount_amount, discount_type, expiration_date, created_date, vendorid, associationProducts } = req.body;

        // Define your SQL query to insert a new coupon into the "coupons" table, including the associationProducts array
        const query = {
            text: 'INSERT INTO coupons (coupon_code, discount_amount, discount_type, expiration_date, created_date, vendorid, associated_products) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING coupon_id',
            values: [coupon_code, discount_amount, discount_type, expiration_date, created_date, vendorid, associationProducts],
        };

        // Execute the SQL query
        const { rows } = await pool.query(query);

        // Return the newly created coupon ID
        res.status(201).json({ coupon_id: rows[0].coupon_id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add the coupon' });
    }
});

app.post('/editCoupons', async (req, res) => {
    try {
        console.log(req.body);
        const { coupon_code, discount_amount, discount_type, expiration_date, created_date, associationProducts, coupon_id } = req.body;

        // Define your SQL query to update an existing coupon in the "coupons" table
        const query = {
            text: 'UPDATE coupons SET coupon_code = $2, discount_amount = $3, discount_type = $4, expiration_date = $5, created_date = $6, associated_products = $7 WHERE coupon_id = $1',
            values: [coupon_id, coupon_code, discount_amount, discount_type, expiration_date, created_date, associationProducts],
        };

        // Execute the SQL query
        await pool.query(query);

        // Return a success message or status code
        res.status(200).json({ message: 'Coupon updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the coupon' });
    }
});

// Make sure to add error handling and database connection setup (e.g., with a PostgreSQL pool) if you haven't already.

app.delete('/deleteCoupons/:coupon_id', async (req, res) => {
    try {
        const { coupon_id } = req.params;

        // Define your SQL query to delete the coupon with the given coupon_id
        const query = {
            text: 'DELETE FROM coupons WHERE coupon_id = $1',
            values: [coupon_id],
        };

        // Execute the SQL query
        await pool.query(query);

        // Return a success message or status code
        res.status(200).json({ message: `Coupon with ID ${coupon_id} deleted successfully` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete the coupon' });
    }
});


module.exports = app;
