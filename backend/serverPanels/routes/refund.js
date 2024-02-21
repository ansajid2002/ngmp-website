const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const sendEmail = require("./nodemailer");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

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

app.post('/refund_customer_order', async (req, res) => {
    try {
        const {
            order_id,
            group_order_id,
            customer_id,
            vendorid,
            refunded_amount,
            reason,
            noteToBuyer,
            calculateofrefund,
            productdata,
            email
        } = req.body;


        // Check if the record already exists
        const checkIfExistsQuery = {
            text: 'SELECT * FROM refund_customer_order WHERE order_id = $1 AND group_orderid = $2 AND customer_id = $3 AND vendor_id = $4',
            values: [order_id, parseInt(group_order_id), customer_id, vendorid],
        };

        const existingRecord = await pool.query(checkIfExistsQuery);

        if (existingRecord.rows.length > 0) {
            // If the record exists, send a response indicating the existing refunded amount
            const existingRefundedAmount = existingRecord.rows[0].refunded_amount;
            return res.status(200).json({ error: `Refund request for order ${order_id} has already been processed with a refunded amount of ${existingRefundedAmount}.` });
        } else {
            // If the record doesn't exist, perform an INSERT
            const insertQuery = {
                text: 'INSERT INTO refund_customer_order (order_id, group_orderid, customer_id, vendor_id, refunded_amount, reason, note_to_buyer, calculateofrefund, productdata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
                values: [order_id, group_order_id, customer_id, vendorid, refunded_amount, reason, noteToBuyer, calculateofrefund, productdata],
            };

            await pool.query(insertQuery);

            // Send email with valuable information
            const emailSubject = 'Refund Request Confirmation';
            const emailBody = `Refund request for order ${order_id} has been processed successfully.`;

            const { rows } = await pool.query(
                'INSERT INTO notifications (notification_type, message, customer_id, timestamp) VALUES ($1, $2, $3, CURRENT_TIMESTAMP) RETURNING *',
                ['Refund', `Refund initiated for orderid ${order_id} of amount ${refunded_amount}.`, customer_id]
            );

            if (rows?.length > 0) {

                const generateRandomWalletId = () => {
                    const min = 10 ** 11; // 10^11 (minimum 12-digit number)
                    const max = 10 ** 12 - 1; // 10^12 - 1 (maximum 12-digit number)

                    const randomWalletId = Math.floor(Math.random() * (max - min + 1)) + min;
                    return `WTXN${randomWalletId.toString()}`;
                };

                const walletId = generateRandomWalletId();
                const paginatedData = await fetchWalletToken(customer_id);
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
                    `Refunded for Order Id ${order_id}`,
                    parseFloat(refunded_amount),
                    parseFloat(paginatedData?.totalBalance) + parseFloat(refunded_amount),
                    walletId,
                    'Nile Global Market-place',
                    0,
                    'paid',
                ]);

            }

            // Replace the placeholder email with the actual customer email
            await sendEmail(email, emailSubject, emailBody);

            return res.status(200).json({ success: true });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app;
