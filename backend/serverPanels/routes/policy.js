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

app.get("/vendorPolicies/:id", async (req, res) => {
    try {
        const vendorId = req.params.id;

        // Query to fetch policies based on vendor_id
        const queryText = 'SELECT * FROM vendor_product_policies WHERE vendor_id = $1';
        const { rows } = await pool.query(queryText, [vendorId]);

        if (rows.length > 0) {
            res.status(200).json({ success: true, data: rows });
        } else {
            res.status(204).send(); // Send empty response with status code 204 (No Content)
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

app.post("/addPolicy", async (req, res) => {
    try {
        const { policy_name, policy_type, policy_description, vendor_id, policy_status } = req.body;

        // Insert the policy into the database
        const queryText = 'INSERT INTO vendor_product_policies (policy_name, policy_type, policy_description, vendor_id, policy_status) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [policy_name, policy_type, policy_description, vendor_id, policy_status];
        const result = await pool.query(queryText, values);

        // Send the added policy as the response
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
        console.error('Error adding policy:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

module.exports = app;
