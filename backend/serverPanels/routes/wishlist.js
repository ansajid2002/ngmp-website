const express = require('express');
const app = express();
const pool = require('../config')
const bcrypt = require('bcrypt');
const cors = require('cors');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

async function fetchProductsFromTable(pool, vendorId, subcat) {
    let query = 'SELECT * FROM products';
    const values = [];

    if (vendorId || subcat) {
        query += ' WHERE';
        if (vendorId) {
            query += ' vendorid = $1';
            values.push(vendorId);
        }
        if (subcat) {
            if (vendorId) {
                query += ' AND';
            }
            query += ' slug_subcat = $' + (values.length + 1);
            values.push(subcat);
        }
    }

    try {
        const result = await pool.query(query, values);
        return result.rows;
    } catch (error) {
        console.error('Error fetching products from table:', error);
        return [];
    }
}

async function fetchVariantData(pool, product_uniqueid) {
    try {
        // Replace this with the actual SQL query to fetch variant data based on product_uniqueid
        const query = "SELECT * FROM variantproducts WHERE product_uniqueid = $1";
        const values = [product_uniqueid];

        const result = await pool.query(query, values);

        // Return the result.rows as variant data
        return result.rows;
    } catch (error) {
        console.error("Error fetching variant data:", error);
        return [];
    }
}

async function fetchVendorInfo(pool, vendorId) {
    const vendorInfo = await pool.query(
        "SELECT id, vendorname, brand_logo, brand_name, registration_date, country_code, mobile_number, vendor_profile_picture_url, followers, following  FROM vendors WHERE id = $1",
        [vendorId]
    );
    return vendorInfo.rows[0];
}

async function getConversionRatesUSD(req, res) {
    try {
        // Query the database to fetch data from the currency_values table
        const query = 'SELECT * FROM currency_values';
        const { rows } = await pool.query(query);

        // Send the fetched data as a JSON response
        return rows
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


async function AllProductsVendors(pool, vendorId = null, currency = 'USD', subcat = null) {
    try {
        // Fetch conversion rates
        const conversionRatesData = await getConversionRatesUSD();
        const conversionRates = {};
        for (const key in conversionRatesData[0]) {
            conversionRates[key] = parseFloat(conversionRatesData[0][key]);
        }

        const AllProducts = [];

        const products = await fetchProductsFromTable(pool, vendorId, subcat);

        for (const product of products) {
            if (product.isvariant === "Variant") {
                const variantData = await fetchVariantData(pool, product.uniquepid);
                if (variantData && variantData.length > 0) {
                    // Update the product's mrp and sellingprice using the first entry in variantData
                    product.mrp = variantData[0].variant_mrp;
                    product.sellingprice = variantData[0].variant_sellingprice;
                    product.label = variantData[0].label; // Replace with the desired label

                    if (product.currency_symbol !== currency) {
                        // Convert mrp and sellingprice to floats
                        const mrpAsFloat = parseFloat(variantData[0].variant_mrp);
                        const sellingPriceAsFloat = parseFloat(variantData[0].variant_sellingprice);

                        const exchangedSellingPrice = (sellingPriceAsFloat / conversionRates[product.currency_symbol.toLowerCase()]) * conversionRates[currency.toLowerCase()];
                        const exchangedMrp = (mrpAsFloat / conversionRates[product.currency_symbol.toLowerCase()]) * conversionRates[currency.toLowerCase()];

                        if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
                            // Calculate the exchanged mrp and sellingprice based on the conversion rate
                            product.sellingprice = exchangedSellingPrice.toFixed(2);
                            product.mrp = exchangedMrp.toFixed(2);
                            product.currency_symbol = currency; // Update the currency symbol
                        }
                    }
                }
            }

            if (product.vendorid) {
                const vendorInfo = await fetchVendorInfo(pool, product.vendorid);
                product.vendorInfo = vendorInfo;
            }

            // Check if the product's currency_symbol is not equal to the desired currency
            // Convert the selling price to a float
            const sellingPriceAsFloat = parseFloat(product.sellingprice);
            const mrpAsFloat = parseFloat(product.mrp);

            const exchangedSellingPrice = (sellingPriceAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) * conversionRates[currency?.toLowerCase()];
            const exchangedMrp = (mrpAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) * conversionRates[currency?.toLowerCase()];

            if (!isNaN(sellingPriceAsFloat)) {
                // Round to two decimal places
                product.sellingprice = exchangedSellingPrice.toFixed(2);
                product.mrp = exchangedMrp.toFixed(2);
                product.currency_symbol = currency; // Update the currency symbol
            }

            AllProducts.push(product);
        }

        return AllProducts;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

app.get('/wishlistdata', async (req, res) => {
    const { customer_id } = req.query;
    console.log(customer_id);
    const AllProducts = await AllProductsVendors(pool)
    try {
        if (!customer_id) {
            return res.status(400).json({ error: 'Missing customer_id' });
        }

        // Construct the SQL query to fetch uniqueid, label, mrp, and sellingprice from customer_wishlist
        const query = `
        SELECT uniqueid, mrp, sellingprice
        FROM customer_wishlist
        WHERE customer_id = $1::integer
      `;

        const queryParams = [customer_id];

        // Execute the SQL query to fetch wishlist data
        const wishlistData = await pool.query(query, queryParams);

        // Convert the wishlist data rows to an array of uniqueids
        const uniqueids = wishlistData.rows.map((item) => parseInt(item.uniqueid));

        // Filter the products from AllProducts based on uniquepid
        const filteredProducts = AllProducts.filter((product) =>
            uniqueids.includes(parseInt(product.uniquepid))
        );

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.error('Error fetching wishlist data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.put('/wishlistdataPUT', async (req, res) => {
    const { customer_id } = req.body;
    const AllProducts = await AllProductsVendors(pool);
    try {
        if (!customer_id) {
            return res.status(400).json({ error: 'Missing customer_id' });
        }

        // Construct the SQL query to fetch uniqueid, label, mrp, and sellingprice from customer_wishlist
        const query = `
            SELECT uniqueid, mrp, sellingprice
            FROM customer_wishlist
            WHERE customer_id = $1::integer
        `;

        const queryParams = [customer_id];

        // Execute the SQL query to fetch wishlist data
        const wishlistData = await pool.query(query, queryParams);

        // Convert the wishlist data rows to an array of uniqueids
        const uniqueids = wishlistData.rows.map((item) => parseInt(item.uniqueid));

        // Filter the products from AllProducts based on uniquepid
        const filteredProducts = AllProducts.filter((product) =>
            uniqueids.includes(parseInt(product.uniquepid))
        );

        res.status(200).json(filteredProducts);
    } catch (error) {
        console.error('Error fetching wishlist data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/addWishlist', async (req, res) => {
    console.log(req.body);
    try {
        let {
            customer_id,
            vendor_id,
            uniquepid,
            category,
            subcategory,
            label,
            mrp,
            sellingprice
        } = req.body;

        const added_date = new Date();
        const formattedDate = added_date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });

        console.log(formattedDate);


        // Product is not in the cart; insert a new row
        let insertQuery;
        if (label) {
            // Include label in the INSERT query if it exists
            insertQuery = `
                    INSERT INTO customer_wishlist (
                        customer_id,
                        vendor_id,
                        uniqueid,
                        category,
                        subcategory,
                        mrp,
                        sellingprice,
                        label,
                        created_on
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                `;
            await pool.query(insertQuery, [customer_id, vendor_id, uniquepid, category, subcategory, mrp, sellingprice, label, formattedDate]);

        } else {
            // If label is not provided, insert without it
            insertQuery = `
                    INSERT INTO customer_wishlist (
                        customer_id,
                        vendor_id,
                        uniqueid,
                        category,
                        subcategory,
                        mrp,
                        sellingprice,
                        created_on,
                        label
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, null)
                `;

            await pool.query(insertQuery, [customer_id, vendor_id, uniquepid, category, subcategory, mrp, sellingprice, formattedDate]);

        }

        res.status(201).json({ message: 'Data inserted or updated successfully' });
    } catch (error) {
        console.error('Error inserting/updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.delete('/removeFromWishlist', async (req, res) => {
    console.log(req.body);
    try {
        let {
            customer_id,
            uniquepid,
            label
        } = req.body;

        let deleteQuery;
        let queryParams;

        if (label) {
            // Delete the product from the wishlist based on customer_id, uniqueid, and label
            deleteQuery = `
                DELETE FROM customer_wishlist
                WHERE customer_id = $1 AND uniqueid = $2 AND label = $3
            `;
            queryParams = [customer_id, uniquepid, label];
        } else {
            // Delete the product from the wishlist based on customer_id and uniqueid only
            deleteQuery = `
                DELETE FROM customer_wishlist
                WHERE customer_id = $1 AND uniqueid = $2
            `;
            queryParams = [customer_id, uniquepid];
        }

        await pool.query(deleteQuery, queryParams);

        res.status(200).json({ message: 'Product(s) removed from the wishlist' });
    } catch (error) {
        console.error('Error removing product from wishlist:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app 