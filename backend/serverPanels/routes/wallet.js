const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require('multer');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});


app.get('/wallet_transactions_get', async (req, res) => {
    try {
        const client = await req.pool.connect();

        try {
            // Replace 'customers' and 'transactions' with your actual table names
            const query = `
                SELECT
                    customers.customer_id,
                    customers.given_name,
                    customers.family_name,
                    customers.email,
                    customers.picture,
                    transactions.transaction_id,
                    transactions.amount,
                    transactions.currency_code,
                    transactions.transaction_date,
                    transactions.is_verified,
                    transactions.verification_date,
                    transactions.payment_method,
                    transactions.notes
                FROM
                    customers
                    INNER JOIN transactions ON customers.customer_id = transactions.customer_id
            `;

            const result = await client.query(query);

            const data = result.rows.map((row) => {
                return {
                    customer_id: row.customer_id,
                    given_name: row.given_name,
                    family_name: row.family_name,
                    email: row.email,
                    picture: row.picture,
                    transaction_id: row.transaction_id,
                    amount: row.amount,
                    currency_code: row.currency_code,
                    transaction_date: row.transaction_date,
                    is_verified: row.is_verified,
                    verification_date: row.verification_date,
                    payment_method: row.payment_method,
                    notes: row.notes,
                };
            });

            res.json(data);
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error fetching wallet transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app 