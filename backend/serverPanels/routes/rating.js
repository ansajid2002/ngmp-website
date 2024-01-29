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

app.post('/rateVendorProducts', async (req, res) => {
    const { vendor_id, customer_id, product_uniqueid, rating, label, order_id } = req.body;

    console.log(order_id
    );
    try {
        // Check if the 'label' exists and is not null
        if (label !== undefined && label !== null) {
            // Check if a row with the provided 'label' already exists
            const existingRow = await req.pool.query(
                'SELECT * FROM ratings_and_reviews WHERE vendor_id = $1 AND customer_id = $2 AND product_uniqueid = $3 AND label = $4 AND rate_order_id = $5',
                [vendor_id, customer_id, product_uniqueid, label, order_id]
            );

            if (existingRow.rows.length > 0) {
                // If a row exists, update the rating
                await req.pool.query(
                    'UPDATE ratings_and_reviews SET rating = $1 WHERE id = $2 RETURNING *',
                    [rating, existingRow.rows[0].id]
                );
                responseMessage = 'Rating updated successfully';
                responseData = existingRow.rows[0]; // Store the inserted data

            } else {
                // If no row exists, insert a new one
                const insertResult = await req.pool.query(
                    'INSERT INTO ratings_and_reviews (vendor_id, customer_id, product_uniqueid, rating, label, created_at, rate_order_id) VALUES ($1, $2, $3, $4, $5, NOW(), $6) RETURNING *',
                    [vendor_id, customer_id, product_uniqueid, rating, label, order_id]
                );
                responseMessage = 'Rating added successfully';
                responseData = insertResult.rows[0]; // Store the inserted data
            }
        } else {
            // If 'label' is not provided or is null, check based on 'product_uniqueid'
            const existingRow = await req.pool.query(
                'SELECT * FROM ratings_and_reviews WHERE vendor_id = $1 AND customer_id = $2 AND product_uniqueid = $3 AND rate_order_id = $4',
                [vendor_id, customer_id, product_uniqueid, order_id]
            );

            if (existingRow.rows.length > 0) {
                // If a row exists, update the rating
                await req.pool.query(
                    'UPDATE ratings_and_reviews SET rating = $1 WHERE id = $2 RETURNING *',
                    [rating, existingRow.rows[0].id]
                );
                responseMessage = 'Rating updated successfully';
                responseData = existingRow.rows[0]; // Store the inserted data

            } else {
                // If no row exists, insert a new one
                const insertResult = await req.pool.query(
                    'INSERT INTO ratings_and_reviews (vendor_id, customer_id, product_uniqueid, rating, created_at, rate_order_id) VALUES ($1, $2, $3, $4, NOW(), $5) RETURNING *',
                    [vendor_id, customer_id, product_uniqueid, rating, order_id]
                );
                responseMessage = 'Rating added successfully';
                responseData = insertResult.rows[0]; // Store the inserted data
            }
        }

        const ratings = await pool.query(
            'SELECT * FROM ratings_and_reviews WHERE customer_id = $1',
            [customer_id]
        );

        // Return the ratings data
        res.status(200).json({ data: ratings.rows });

        // Send a response indicating success
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

app.get('/fetchRatings', async (req, res) => {
    const customer_id = req.query.customer_id;
    const product_id = req.query.product_id;
    const vendorId = req.query.vendorid;
    const rate_id = req.query.rate_id;

    try {
        let ratingsData;
        console.log(req.query);

        if (customer_id && !vendorId) {
            console.log('customer_id');
            // Fetch ratings by customer_id
            ratingsData = await pool.query('SELECT * FROM ratings_and_reviews WHERE customer_id = $1 AND product_uniqueid != $2', [customer_id, 'vendor']);
        } else if (rate_id) {
            console.log('rate_id');
            // Fetch ratings by product_id
            ratingsData = await pool.query('SELECT * FROM ratings_and_reviews WHERE id = $1', [rate_id]);
        } else if (product_id && product_id !== 'null') {
            console.log('product_id');
            // Fetch ratings by product_id
            ratingsData = await pool.query('SELECT * FROM ratings_and_reviews WHERE product_uniqueid = $1', [product_id]);
        } else if (vendorId && customer_id) {
            console.log('vendorId');
            // Fetch ratings by vendor_id
            ratingsData = await pool.query('SELECT * FROM ratings_and_reviews WHERE vendor_id = $1 AND customer_id = $2 AND product_uniqueid = $3', [parseInt(vendorId), customer_id, 'vendor']);
        } else {
            // Invalid request, no customer_id, product_id, or vendor_id specified
            return res.status(400).json({ error: 'Invalid request. Please specify either customer_id, product_id, or vendor_id.' });
        }

        // Create a response object to store the ratings data and associated customer data
        const responseData = { ratingsData: [] };

        if (ratingsData.rows.length > 0) {
            // Extract customer_ids from the ratings data
            const customerIds = ratingsData.rows.map((row) => row.customer_id);

            // Fetch customer data for each customer_id
            const customerDataPromises = customerIds.map(async (customerId) => {
                const customerData = await pool.query('SELECT * FROM customers WHERE customer_id = $1', [customerId]);
                return customerData.rows[0];
            });

            // Wait for all customer data promises to resolve
            const customerData = await Promise.all(customerDataPromises);

            // Append customer data to each rating row
            ratingsData.rows.forEach((row, index) => {
                row.customerData = customerData[index];
            });

            // Set the modified ratings data in the response object
            responseData.ratingsData = ratingsData.rows;
        }

        console.log(responseData);
        // Send the response
        res.json(responseData);
    } catch (error) {
        console.error('Error fetching ratings:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/addReview', async (req, res) => {
    const { id, reviewText, customer_id, vendor_id } = req.body;

    console.log(req.body, 'req');

    try {
        // Check if a review with the provided 'id' exists
        const existingReview = await pool.query(
            'SELECT * FROM ratings_and_reviews WHERE id = $1',
            [id]
        );

        if (existingReview.rows.length === 0) {
            return res.status(404).json({ error: 'Review not found' });
        }

        // Update the review text
        await pool.query(
            'UPDATE ratings_and_reviews SET review_text = $1 WHERE id = $2',
            [reviewText, id]
        );

        if (vendor_id) {
            // Update with both id and vendor_id
            updateQuery = 'UPDATE ratings_and_reviews SET review_text = $1 WHERE vendor_id = $2 AND customer_id = $3 AND product_uniqueid = $4';
            updateValues = [reviewText, vendor_id, customer_id, 'vendor'];
        } else {
            // Update only with id
            updateQuery = 'UPDATE ratings_and_reviews SET review_text = $1 WHERE id = $2';
            updateValues = [reviewText, id];
        }

        console.log(updateQuery);
        console.log(updateValues);

        // Query and return all ratings based on customer_id
        const ratings = await pool.query(
            'SELECT * FROM ratings_and_reviews WHERE customer_id = $1',
            [customer_id]
        );

        // Return the ratings data
        res.status(200).json({ rating: ratings.rows });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});


const imgReviews = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/ReviewImages");
    },
    filename: (req, file, callback) => {
        callback(null, `ReviewImages-${Date.now()} - ${file.originalname}`);
    },
});

// img filter
const isCustomerImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"));
    }
};

const uploadReviewImage = multer({
    storage: imgReviews,
    fileFilter: isCustomerImage,
});

app.post('/emptyReviewMedia', async (req, res) => {
    try {
        const { id } = req.body;
        const clearMediasQuery = `UPDATE ratings_and_reviews SET medias = ARRAY[]::text[] WHERE id = $1`;
        await pool.query(clearMediasQuery, [id]);
        res.status(200).json({ message: 'Medias cleared successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

app.post('/uploadReviewMedia', uploadReviewImage.array('pictures'), async (req, res) => {
    // Access uploaded images using req.files array
    const images = req.files;
    const { rate_id } = req.body;

    try {
        for (const image of images) {
            // Update the 'ratings_and_reviews' table to add the image path to the 'medias' array.
            const updateQuery = `
                UPDATE ratings_and_reviews
                SET medias = array_append(medias, $1)
                WHERE id = $2
                `;

            // Execute the update query
            await pool.query(updateQuery, [image.filename, rate_id]);
        }

        res.status(200).json({ message: 'Images uploaded and database updated successfully' });
    } catch (error) {
        console.error('Error in updating the database:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});



module.exports = app 