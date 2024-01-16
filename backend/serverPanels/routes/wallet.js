const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const axios = require('axios');
const crypto = require('crypto');
const sendEmail = require('./nodemailer');

const fs = require('fs');
const pdf = require('html-pdf');

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

app.get('/fetchCustomerTransaction', async (req, res) => {
    try {
        const { page = 1, pageSize = 10, customer_id, search } = req.query;

        // Query to get paginated transactions
        let transactionsQuery;
        let totalCountQuery;

        if (search) {
            transactionsQuery = {
                text: `
                    SELECT ct.*, c.given_name, c.family_name, c.picture
                    FROM customer_transactions ct
                    JOIN customers c ON ct.customer_id = c.customer_id
                    WHERE ct.customer_id = $1 AND (ct.description ILIKE $2 OR c.given_name ILIKE $2 OR c.family_name ILIKE $2)
                    ORDER BY ct.datetime DESC
                    LIMIT $3 OFFSET $4;
                `,
                values: [customer_id, `%${search}%`, pageSize, (page - 1) * pageSize],
            };

            totalCountQuery = {
                text: `
                    SELECT COUNT(*) as total
                    FROM customer_transactions ct
                    JOIN customers c ON ct.customer_id = c.customer_id
                    WHERE ct.customer_id = $1 AND (ct.description ILIKE $2 OR c.given_name ILIKE $2 OR c.family_name ILIKE $2);
                `,
                values: [customer_id, `%${search}%`],
            };
        } else {
            transactionsQuery = {
                text: `
                    SELECT ct.*, c.given_name, c.family_name, c.picture
                    FROM customer_transactions ct
                    JOIN customers c ON ct.customer_id = c.customer_id
                    WHERE ct.customer_id = $1
                    ORDER BY ct.datetime DESC
                    LIMIT $2 OFFSET $3;
                `,
                values: [customer_id, pageSize, (page - 1) * pageSize],
            };

            totalCountQuery = {
                text: `
                    SELECT COUNT(*) as total
                    FROM customer_transactions 
                    WHERE customer_id = $1;
                `,
                values: [customer_id],
            };
        }

        // Query to get the last closing balance
        const [transactionsResult, totalCountResult, walletAmount] = await Promise.all([
            pool.query(transactionsQuery),
            pool.query(totalCountQuery),
            fetchWalletToken(customer_id)
        ]);

        const paginatedData = {
            transactions: transactionsResult.rows,
            total: parseInt(totalCountResult.rows[0].total, 10),
            totalBalance: walletAmount?.totalBalance
        };

        res.json(paginatedData);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/AllfetchCustomerTransaction', async (req, res) => {
    try {
        const { page, pageSize, search } = req.query;

        // Base query for transactions
        const baseQuery = `
            SELECT ct.*, c.given_name, c.family_name, c.picture
            FROM customer_transactions ct
            JOIN customers c ON ct.customer_id = c.customer_id
        `;

        // Where condition for search
        const searchCondition = search
            ? `WHERE (ct.description ILIKE $1 OR c.given_name ILIKE $1 OR c.family_name ILIKE $1 OR c.email ILIKE $1 OR ct.wallet_txn_id ILIKE $1)`
            : '';

        let transactionsQuery;

        if (search || (parseInt(page) && parseInt(pageSize))) {
            transactionsQuery = {
                text: `
                        ${baseQuery}
                        WHERE (ct.description ILIKE $1 OR c.given_name ILIKE $1 OR c.family_name ILIKE $1 OR c.email ILIKE $1 OR ct.wallet_txn_id ILIKE $1)
                        ORDER BY ct.datetime DESC
                        LIMIT $2 OFFSET $3
                    `,
                values: [`%${search}%`, pageSize, (page - 1) * pageSize],
            };
        } else {
            transactionsQuery = {
                text: `
                        ${baseQuery}
                        ORDER BY ct.datetime DESC
                    `,
                values: [],
            };
        }


        console.log(search, parseInt(page), parseInt(pageSize));
        const totalCountQuery = {
            text: `
                SELECT COUNT(*) as total
                FROM customer_transactions ct
                JOIN customers c ON ct.customer_id = c.customer_id
                ${searchCondition};
            `,
            values: search ? [`%${search}%`] : [],
        };

        const debitCountQuery = {
            text: `
                SELECT COUNT(*) as debitCount
                FROM customer_transactions ct
                JOIN customers c ON ct.customer_id = c.customer_id
                ${searchCondition} AND ct.amount < 0;
            `,
            values: search ? [`%${search}%`] : [],
        };

        const creditCountQuery = {
            text: `
                SELECT COUNT(*) as creditCount
                FROM customer_transactions ct
                JOIN customers c ON ct.customer_id = c.customer_id
                ${searchCondition} AND ct.amount > 0;
            `,
            values: search ? [`%${search}%`] : [],
        };

        const totalAmountTransferredQuery = {
            text: `
                SELECT COALESCE(SUM(ABS(ct.amount)), 0) as totalAmountTransferred
                FROM customer_transactions ct
                JOIN customers c ON ct.customer_id = c.customer_id
                ${searchCondition};
            `,
            values: search ? [`%${search}%`] : [],
        };

        const totalDebitAmountQuery = {
            text: `
                SELECT COALESCE(SUM(ct.amount), 0) as totalDebitAmount
                FROM customer_transactions ct
                JOIN customers c ON ct.customer_id = c.customer_id
                ${searchCondition} AND ct.amount < 0;
            `,
            values: search ? [`%${search}%`] : [],
        };

        const totalCreditAmountQuery = {
            text: `
                SELECT COALESCE(SUM(ct.amount), 0) as totalCreditAmount
                FROM customer_transactions ct
                JOIN customers c ON ct.customer_id = c.customer_id
                ${searchCondition} AND ct.amount > 0;
            `,
            values: search ? [`%${search}%`] : [],
        };

        const [
            transactionsResult,
            totalCountResult,
            debitCountResult,
            creditCountResult,
            totalAmountTransferredResult,
            totalDebitAmountResult,
            totalCreditAmountResult,
        ] = await Promise.all([
            pool.query(transactionsQuery),
            pool.query(totalCountQuery),
            pool.query(debitCountQuery),
            pool.query(creditCountQuery),
            pool.query(totalAmountTransferredQuery),
            pool.query(totalDebitAmountQuery),
            pool.query(totalCreditAmountQuery),
        ]);

        console.log(debitCountResult.rows[0].debitcount);
        const paginatedData = {
            transactions: transactionsResult.rows,
            total: parseInt(totalCountResult.rows[0].total, 10),
            debitCount: parseInt(debitCountResult.rows[0].debitcount),
            creditCount: parseInt(creditCountResult.rows[0].creditcount),
            totalAmountTransferred: parseFloat(totalAmountTransferredResult.rows[0].totalamounttransferred),
            totalDebitAmount: parseFloat(totalDebitAmountResult.rows[0].totaldebitamount),
            totalCreditAmount: parseFloat(totalCreditAmountResult.rows[0].totalcreditamount),
        };

        res.json(paginatedData);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
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


app.get('/fetchWalletToken', async (req, res) => {
    try {
        const { customer_id } = req.query;

        const paginatedData = await fetchWalletToken(customer_id);

        res.json(paginatedData);
    } catch (error) {
        console.error('Error fetching amount:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const generateRandomWalletId = () => {
    const min = 10 ** 11; // 10^11 (minimum 12-digit number)
    const max = 10 ** 12 - 1; // 10^12 - 1 (maximum 12-digit number)

    const randomWalletId = Math.floor(Math.random() * (max - min + 1)) + min;
    return `WTXN${randomWalletId.toString()}`;
};


app.post('/issue-invoice', async (req, res) => {
    const apiKey = 'rgdxbAeEE5MgyhyAFWMlWtxvjFQRB7eGU6sEzYSkN';
    const agentCode = '099500';

    const { edahabNumber, amount, returnUrl, customerId } = req.body;

    // Create the request object
    const requestObject = {
        apiKey,
        edahabNumber,
        amount,
        agentCode,
        returnUrl,
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(requestObject);

    // Hash the JSON string using SHA256
    const hashed = crypto.createHash('sha256').update(jsonString + 'DNrm2ZLnHNbLqZJ5Mo888Y4N5K6ghAJtrHbO4m').digest('hex');

    // Set the URL for the API request
    const url = `https://edahab.net/api/api/IssueInvoice?hash=${hashed}`;

    try {
        // Make the POST request using axios
        const response = await axios.post(url, requestObject, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the payment was successful
        if (response.data.StatusCode === 0) {
            const paginatedData = await fetchWalletToken(customerId);
            const walletId = generateRandomWalletId();


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
                customerId,
                new Date(),
                'Payment for Wallet',
                parseFloat(amount),
                parseFloat(paginatedData?.totalBalance),
                walletId,
                'Nile Global Market-place',
                response.data.InvoiceId,
                'unpaid',
            ]);

            // Respond with the API response data
            res.json(response.data);
        } else {
            // If payment is unsuccessful, respond with an error
            res.status(400).json({ error: 'Payment was unsuccessful' });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/check-invoice-status', async (req, res) => {
    const apiKey = 'rgdxbAeEE5MgyhyAFWMlWtxvjFQRB7eGU6sEzYSkN';
    const { invoiceId } = req.body;

    // Create the request object
    const requestObject = {
        apiKey,
        invoiceId,
    };

    // Convert the object to a JSON string
    const jsonString = JSON.stringify(requestObject);

    // Hash the JSON string using SHA256
    const hashed = crypto.createHash('sha256').update(jsonString + 'DNrm2ZLnHNbLqZJ5Mo888Y4N5K6ghAJtrHbO4m').digest('hex');

    // Set the URL for the API request
    const url = `https://edahab.net/api/api/CheckInvoiceStatus?hash=${hashed}`;

    try {
        // Make the POST request using axios
        const response = await axios.post(url, requestObject, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Check if the invoice status is "Paid" and the response status code is 0 (Success)
        if (response.data.InvoiceStatus === 'Paid') {
            // Update customer_transactions based on invoiceId
            const updateQuery = `
                UPDATE customer_transactions
                SET 
                    status = 'paid',
                    transaction_wallet_id = $1,
                    closing_balance = closing_balance + amount
                WHERE invoiceId = $2
                RETURNING *;
            `;

            // Execute the update query
            const { rows } = await pool.query(updateQuery, [
                response.data.TransactionId,
                invoiceId,
            ]);

            res.status(200).json({ eDahabData: response.data, rows });
        }
        else {
            // Handle cases where the invoice status is not "Paid" or the response status code is not 0
            res.status(400).json({ error: 'Invoice is not paid or the status code is not 0' });
        }
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/transfertofriend', async (req, res) => {
    try {
        const { customerData, totalAmount, selectedUser, datetime } = req.body;
        const paginatedData = await fetchWalletToken(customerData?.customer_id);
        const { totalBalance } = paginatedData;
        const receiverCustomerId = selectedUser?.customer_id;
        const { given_name, family_name } = selectedUser

        const walletId = generateRandomWalletId();
        // Check if the totalAmount is within the limit
        if (totalAmount <= totalBalance) {
            // Add money to the receiver's account
            await addMoneyToAccount(receiverCustomerId, totalAmount, datetime, given_name, family_name, customerData, walletId);

            // Deduct money from the sender's account
            await deductMoneyFromAccount(customerData?.customer_id, totalAmount, datetime, given_name, family_name, customerData, walletId);
            const remaining_balance = totalBalance - totalAmount
            // Respond with success message
            res.status(200).json({ status: 200, message: "Transaction successful", remaining_balance });
        } else {
            // Respond with an error message if the amount exceeds the limit
            res.status(200).json({ status: 401, message: "Amount exceeds the limit" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Internal Server Error.." });
    }
});

// Function to add money to an account and record the transaction
const addMoneyToAccount = async (customer_id, amount, datetime, given_name, family_name, customerData, walletId) => {
    const paginatedData = await fetchWalletToken(customer_id);

    const query = "INSERT INTO customer_transactions (customer_id,datetime,description,amount,closing_balance,wallet_txn_id,send_to_user,invoiceId,status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
    const { rows } = await pool.query(query, [
        customer_id,
        new Date(),
        `Receive from ${customerData?.given_name} ${customerData?.family_name}`,
        parseFloat(amount),
        parseFloat(paginatedData?.totalBalance) + amount,
        walletId,
        `${given_name} ${family_name}`,
        0,
        'paid',
    ]);

    return rows
};

// Function to deduct money from an account and record the transaction
const deductMoneyFromAccount = async (customer_id, amount, datetime, given_name, family_name, customerData, walletId) => {
    const paginatedData = await fetchWalletToken(customer_id);

    const query = "INSERT INTO customer_transactions (customer_id,datetime,description,amount,closing_balance,wallet_txn_id,send_to_user,invoiceId,status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"
    const { rows } = await pool.query(query, [
        customer_id,
        new Date(),
        `Sended to ${given_name} ${family_name}`,
        -parseFloat(amount),
        parseFloat(paginatedData?.totalBalance) - amount,
        walletId,
        `${customerData?.given_name} ${customerData?.family_name}`,
        0,
        'paid',
    ]);

    return rows
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

app.post("/requestWalletStatement", async (req, res) => {
    try {
        const formattedFromDate = new Date(req.body.fromDate).toLocaleDateString();
        const formattedToDate = new Date(req.body.toDate).toLocaleDateString();

        let query;
        let queryParams = [];
        let value = '';

        switch (req.body.selectedPeriod) {
            case 'last1Month':
                query = `
            SELECT *
            FROM customer_transactions
            WHERE datetime >= NOW() - INTERVAL '1 month';
        `;
                value = 'last 1 Month'
                break;
            case 'last3Months':
                query = `
            SELECT *
            FROM customer_transactions
            WHERE datetime >= NOW() - INTERVAL '3 months';
        `;
                value = 'last 3 Months'

                break;
            case 'last6Months':
                query = `
            SELECT *
            FROM customer_transactions
            WHERE datetime >= NOW() - INTERVAL '6 months';
        `;
                value = 'last 6 Months'

                break;
            case 'last1Year':
                query = `
            SELECT *
            FROM customer_transactions
            WHERE datetime >= NOW() - INTERVAL '1 year';
        `;
                value = 'last 1 Year'

                break;
            case 'custom':
                query = `
            SELECT *
            FROM customer_transactions
            WHERE datetime >= $1 AND datetime <= $2;
        `;

                // Provide parameters for the 'custom' case
                queryParams = [formattedFromDate, formattedToDate];
                break;
            default:
                // Handle an invalid or unexpected value for selectedPeriod
                break;
        }

        // Use the 'query' and 'queryParams' variables in your database query
        const { rows } = await pool.query(query, queryParams);


        if (rows.length > 0) {
            // Calculate summary values
            const transactionCount = rows.length;
            const debitCount = rows.filter(transaction => transaction.amount < 0).length;
            const creditCount = rows.filter(transaction => transaction.amount > 0).length;

            const openingBalance = rows[0].closing_balance - rows[0].amount;
            const totalDebitAmount = rows.reduce((total, transaction) => (transaction.amount < 0 ? parseFloat(total) + Math.abs(transaction.amount) : parseFloat(total)), 0);
            const totalCreditAmount = rows.reduce((total, transaction) => (transaction.amount > 0 ? parseFloat(total) + parseFloat(transaction.amount) : parseFloat(total)), 0);
            const closingBalance = rows[rows.length - 1].closing_balance;

            const customerData = req.body.customerData[0];
            const paginatedData = await fetchWalletToken(customerData?.customer_id);

            // Read the HTML template
            const htmlTemplate = fs.readFileSync('./htmlTemplates/wallet_statement_template.html', 'utf8');

            // Inject data into HTML template
            const dataRows = rows.map((transaction, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td>${transaction.datetime.toLocaleDateString()}</td>
                    <td>${transaction.description}</td>
                    <td>${transaction.wallet_txn_id}</td>
                    <td style="color: red">${transaction.amount < 0 ? `${formatCurrency(transaction.amount)}` : ''}</td>
                    <td style="color: green">${transaction.amount > 0 ? formatCurrency(transaction.amount) : ''}</td>
                    <td>${formatCurrency(transaction.closing_balance)}</td>
                </tr>
            `).join('');

            const finalHtml = htmlTemplate
                .replace('<!-- Data rows will be dynamically added here -->', dataRows)
                .replace('{givenName}', customerData.given_name)
                .replace('{familyName}', customerData.family_name)
                .replace('{email}', customerData.email)
                .replace('{phoneNumber}', customerData.phone_number || '-')
                .replace('{availableBalance}', formatCurrency(paginatedData?.totalBalance) || 0)
                .replace('{transactionCount}', transactionCount)
                .replace('{debitCount}', debitCount)
                .replace('{creditCount}', creditCount)
                .replace('{openingBalance}', openingBalance)
                .replace('{totalDebitAmount}', totalDebitAmount)
                .replace('{totalCreditAmount}', totalCreditAmount)
                .replace('{closingBalance}', closingBalance);

            // Convert HTML to PDF
            pdf.create(finalHtml).toBuffer(async (err, buffer) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ status: 500, message: "Error creating PDF." });
                } else {
                    let emailSubject = `Wallet Statement for ${value}`;

                    if (req.body.selectedPeriod === "custom") {
                        emailSubject += `${formattedFromDate} to ${formattedToDate}`;
                    }

                    // Send the PDF via email
                    await sendEmail(customerData.email, emailSubject, `Below Attached Files is your ${emailSubject}`, buffer, 'wallet_statement.pdf');
                    res.status(200).json({ message: "Email sent successfully" });
                }
            });
        } else {
            console.log('No data found');
            res.status(404).json({ message: "No data found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 500, message: "Internal Server Error." });
    }
});

module.exports = app 