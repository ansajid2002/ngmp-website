const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

async function fetchVendorInfo(pool, vendorId) {
    const vendorInfo = await pool.query(
        "SELECT id, vendorname, brand_logo, brand_name, registration_date, country_code, mobile_number,company_district, vendor_profile_picture_url, followers, following,company_name,company_city,company_state,company_country,company_zip_code,shipping_address  FROM vendors WHERE id = $1",
        [vendorId]
    );
    return vendorInfo.rows[0];
}

async function fetchProductsFromTable(pool, vendorId, subcat, type, cid) {
    let query = 'SELECT * FROM products';
    let values = [];
    let conditions = [];

    if (vendorId) {
        conditions.push('vendorid = $1');
        values.push(vendorId);
    }

    if (subcat) {
        conditions.push('slug_subcat = $' + (values.length + 1));
        values.push(subcat);
    }

    // If conditions exist, add WHERE clause to the query
    if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
    }

    if (type && type === 'recommended' && cid) {
        // Fetch customer_interest array from the customers table based on cid
        const customerInterestQuery = 'SELECT customer_interest FROM customers WHERE customer_id = $1';
        const customerInterestValues = [cid];
        const customerInterestResult = await pool.query(customerInterestQuery, customerInterestValues);

        if (customerInterestResult.rows.length > 0) {
            const categoryIds = customerInterestResult.rows[0].customer_interest;

            // Fetch category names from the categories table based on category IDs
            const categoryNamesQuery = 'SELECT category_name FROM categories WHERE category_id = ANY($1::int[])';
            const categoryNamesValues = [categoryIds];
            const categoryNamesResult = await pool.query(categoryNamesQuery, categoryNamesValues);
            if (categoryNamesResult.rows.length > 0) {
                const categoryNames = categoryNamesResult.rows.map((row) => row.category_name);

                // Add condition to filter products based on category names
                query += ' WHERE category = ANY($1::text[]) LIMIT 10';

                values.push(categoryNames);
            }
        }
    }

    if (type && type === 'newarrivals' && cid) {
        // Fetch customer_interest array from the customers table based on cid
        const customerInterestQuery = 'SELECT customer_interest FROM customers WHERE customer_id = $1';
        const customerInterestValues = [cid];
        const customerInterestResult = await pool.query(customerInterestQuery, customerInterestValues);

        if (customerInterestResult.rows.length > 0) {
            const categoryIds = customerInterestResult.rows[0].customer_interest;

            // Fetch category names from the categories table based on category IDs
            const categoryNamesQuery = 'SELECT category_name FROM categories WHERE category_id = ANY($1::int[])';
            const categoryNamesValues = [categoryIds];
            const categoryNamesResult = await pool.query(categoryNamesQuery, categoryNamesValues);
            if (categoryNamesResult.rows.length > 0) {
                const categoryNames = categoryNamesResult.rows.map((row) => row.category_name);

                // Add condition to filter products based on category names
                query += ' WHERE category = ANY($1::text[]) ORDER BY updated_at_product ASC LIMIT 10';
                values.push(categoryNames);
            }
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

async function AllProductsVendors(pool, vendorId = null, currency = null, subcat = null, type = null, customerId = null) {
    try {
        // Fetch conversion rates
        const conversionRatesData = await getConversionRatesUSD();
        const conversionRates = {};

        for (const key in conversionRatesData[0]) {
            conversionRates[key] = parseFloat(conversionRatesData[0][key]);
        }

        const AllProducts = [];

        const products = await fetchProductsFromTable(pool, vendorId, subcat, type, customerId);
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

                        const exchangedSellingPrice = (sellingPriceAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) * conversionRates[currency?.toLowerCase()] || sellingPriceAsFloat;
                        const exchangedMrp = (mrpAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) * conversionRates[currency?.toLowerCase()] || mrpAsFloat;

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

            const exchangedSellingPrice = (sellingPriceAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) * conversionRates[currency?.toLowerCase()] || sellingPriceAsFloat;
            const exchangedMrp = (mrpAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) * conversionRates[currency?.toLowerCase()] || mrpAsFloat;

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

app.get('/cart', async (req, res) => {
    const { customer_id } = req.query;
    try {
        if (!customer_id) {
            return res.status(400).json({ error: 'Missing customer_id' });
        }

        // Construct the SQL query to calculate total_quantity and group by product_uniqueid
        const query = `
            SELECT
                product_uniqueid,
                variantlabel,
                mrp,
                sellingprice,
                SUM(quantity) as total_quantity
            FROM
                cart
            WHERE
                customer_id = $1::integer
            GROUP BY
                product_uniqueid, variantlabel, mrp, sellingprice
        `;
        const queryParams = [customer_id];

        const cartData = await pool.query(query, queryParams);
        console.log(cartData.rows);
        // Get product details from AllProductsVendors based on product_uniqueid
        const AllProducts = await AllProductsVendors(pool);

        const matchingProducts = cartData.rows.map((cartItem) => {
            const productMatch = AllProducts.find(
                (product) => product.uniquepid === parseInt(cartItem.product_uniqueid)
            );
            if (productMatch) {
                const newProduct = { ...productMatch };
                newProduct.mrp = cartItem.mrp;
                newProduct.sellingprice = cartItem.sellingprice;
                newProduct.label = cartItem.variantlabel;
                newProduct.added_quantity = parseInt(cartItem.total_quantity);
                return newProduct;
            }
            return null;
        });

        // Filter out null values
        const filteredProducts = matchingProducts.filter((product) => product !== null);
        res.json(filteredProducts);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/cartTotal', async (req, res) => {
    const { customer_id } = req.query;
    try {
        if (!customer_id) {
            return res.status(400).json({ error: 'Missing customer_id' });
        }

        // Construct the SQL query to calculate total_quantity and added_quantity, and group by product_uniqueid
        const query = `
            SELECT
                product_uniqueid,
                variantlabel,
                mrp,
                sellingprice,
                SUM(quantity) as total_quantity,
                MAX(quantity) as quantity
            FROM
                cart
            WHERE
                customer_id = $1::integer
            GROUP BY
                product_uniqueid, variantlabel, mrp, sellingprice
        `;
        const queryParams = [customer_id];

        const cartData = await pool.query(query, queryParams);

        // Use Array.reduce to find the sum of added_quantities
        const sumAddedQuantities = cartData?.rows?.reduce(
            (accumulator, item) => accumulator + item.quantity,
            0
        );

        res.json({ total: sumAddedQuantities });
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.put('/cartWebsite', async (req, res) => {
    const { customer_id } = req.body;
    try {
        if (!customer_id) {
            return res.status(400).json({ error: 'Missing customer_id' });
        }

        // Construct the SQL query to calculate total_quantity and group by product_uniqueid
        const query = `
        SELECT product_uniqueid, variantlabel, mrp, sellingprice, SUM(quantity) as total_quantity
        FROM cart
        WHERE customer_id = $1::integer
        GROUP BY product_uniqueid, variantlabel, mrp, sellingprice
      `;
        const queryParams = [customer_id];

        // Execute the SQL query
        const cartData = await pool.query(query, queryParams);

        // Get product details from AllProductsVendors based on product_uniqueid
        const AllProducts = await AllProductsVendors(pool);

        const matchingProducts = cartData.rows.map((cartItem) => {
            const productMatch = AllProducts.find(
                (product) => product.uniquepid === parseInt(cartItem.product_uniqueid)
            );
            if (productMatch) {
                const newProduct = { ...productMatch };
                newProduct.mrp = cartItem.mrp;
                newProduct.sellingprice = cartItem.sellingprice;
                newProduct.label = cartItem.variantlabel;
                newProduct.added_quantity = parseInt(cartItem.total_quantity);
                return newProduct;
            }
            return null;
        });

        // Filter out null values
        const filteredProducts = matchingProducts.filter((product) => product !== null);
        res.json(filteredProducts);
    } catch (error) {
        console.error('Error fetching cart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addProductcart', async (req, res) => {
    console.log("calledd///");
    console.log(req.body);

    try {
        let {
            customer_id,
            vendor_id,
            product_uniqueid,
            category,
            subcategory,
            added_quantity, // Change 'quantity' to 'added_quantity'
            variantlabel,
            mrp,
            sellingprice,
            c_symbol
        } = req.body;
        // Check if the product is already in the cart for the specified customer
        let checkCartQuery;
        let queryParams = [customer_id, product_uniqueid];
        if (variantlabel) {
            // Include variantlabel in the query if it exists
            checkCartQuery = `
                SELECT * FROM cart
                WHERE customer_id = $1
                AND product_uniqueid = $2
                AND variantlabel = $3
            `;
            queryParams.push(variantlabel);
        } else {
            // If variantlabel is not provided, select without it
            checkCartQuery = `
                SELECT * FROM cart
                WHERE customer_id = $1
                AND product_uniqueid = $2
            `;
        }

        console.log(checkCartQuery, queryParams);

        const existingCartItem = await pool.query(checkCartQuery, queryParams);


        if (existingCartItem.rows.length > 0) {
            // Product already exists in the cart; update the quantity
            const existingQuantity = existingCartItem.rows[0].quantity;
            const updatedQuantity = existingQuantity + added_quantity; // Change 'quantity' to 'added_quantity'
            // const updatedQuantity =  added_quantity; // Change 'quantity' to 'added_quantity'

            // Create an UPDATE query to update the quantity
            let updateQuery = `
                UPDATE cart
                SET quantity = $1
                WHERE customer_id = $2
                AND product_uniqueid = $3`;

            const values = [updatedQuantity, customer_id, product_uniqueid];

            if (variantlabel) {
                updateQuery += ` AND variantlabel = $4`;
                values.push(variantlabel);
            }

            console.log(values, "values");
            await pool.query(updateQuery, values);


        } else {
            // Product is not in the cart; insert a new row
            let insertQuery;
            if (variantlabel) {
                // Include variantlabel in the INSERT query if it exists
                insertQuery = `
                    INSERT INTO cart (
                        customer_id,
                        vendor_id,
                        product_uniqueid,
                        category,
                        subcategory,
                        quantity,
                        mrp,
                        sellingprice,
                        variantlabel
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                `;
                await pool.query(insertQuery, [customer_id, vendor_id, product_uniqueid, category, subcategory, added_quantity, mrp, sellingprice, variantlabel]); // Change 'quantity' to 'added_quantity'

            } else {
                // If variantlabel is not provided, insert without it
                insertQuery = `
                    INSERT INTO cart (
                        customer_id,
                        vendor_id,
                        product_uniqueid,
                        category,
                        subcategory,
                        quantity,
                        mrp,
                        sellingprice,
                        variantlabel                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, null)
                `;

                await pool.query(insertQuery, [customer_id, vendor_id, product_uniqueid, category, subcategory, added_quantity, mrp, sellingprice]); // Change 'quantity' to 'added_quantity'

            }

        }

        res.status(201).json({ message: 'Data inserted or updated successfully' });
    } catch (error) {
        console.error('Error inserting/updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.post('/addProductcartlogin', async (req, res) => {
    console.log("calledd///");
    try {
        let {
            customer_id,
            vendor_id,
            product_uniqueid,
            category,
            subcategory,
            added_quantity, // Change 'quantity' to 'added_quantity'
            variantlabel,
            mrp,
            sellingprice,
            c_symbol
        } = req.body;
        // Check if the product is already in the cart for the specified customer
        let checkCartQuery;
        let queryParams = [customer_id, product_uniqueid];
        if (variantlabel) {
            // Include variantlabel in the query if it exists
            checkCartQuery = `
                SELECT * FROM cart
                WHERE customer_id = $1
                AND product_uniqueid = $2
                AND variantlabel = $3
            `;
            queryParams.push(variantlabel);
        } else {
            // If variantlabel is not provided, select without it
            checkCartQuery = `
                SELECT * FROM cart
                WHERE customer_id = $1
                AND product_uniqueid = $2
            `;
        }

        const existingCartItem = await pool.query(checkCartQuery, queryParams);


        if (existingCartItem.rows.length > 0) {
            // Product already exists in the cart; update the quantity
            const existingQuantity = existingCartItem.rows[0].quantity;
            // const updatedQuantity = existingQuantity + added_quantity; // Change 'quantity' to 'added_quantity'
            const updatedQuantity = added_quantity; // Change 'quantity' to 'added_quantity'

            // Create an UPDATE query to update the quantity
            let updateQuery = `
                UPDATE cart
                SET quantity = $1
                WHERE customer_id = $2
                AND product_uniqueid = $3`;

            const values = [updatedQuantity, customer_id, product_uniqueid];

            if (variantlabel) {
                updateQuery += ` AND variantlabel = $4`;
                values.push(variantlabel);
            }

            console.log(values, "values");
            await pool.query(updateQuery, values);


        } else {
            // Product is not in the cart; insert a new row
            let insertQuery;
            if (variantlabel) {
                // Include variantlabel in the INSERT query if it exists
                insertQuery = `
                    INSERT INTO cart (
                        customer_id,
                        vendor_id,
                        product_uniqueid,
                        category,
                        subcategory,
                        quantity,
                        mrp,
                        sellingprice,
                        variantlabel,
                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                `;
                await pool.query(insertQuery, [customer_id, vendor_id, product_uniqueid, category, subcategory, added_quantity, mrp, sellingprice, variantlabel]); // Change 'quantity' to 'added_quantity'

            } else {
                // If variantlabel is not provided, insert without it
                insertQuery = `
                    INSERT INTO cart (
                        customer_id,
                        vendor_id,
                        product_uniqueid,
                        category,
                        subcategory,
                        quantity,
                        mrp,
                        sellingprice,
                        variantlabel                    )
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, null)
                `;

                await pool.query(insertQuery, [customer_id, vendor_id, product_uniqueid, category, subcategory, added_quantity, mrp, sellingprice]); // Change 'quantity' to 'added_quantity'

            }

        }

        res.status(201).json({ message: 'Data inserted or updated successfully' });
    } catch (error) {
        console.error('Error inserting/updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.delete('/removeProductFromCart', async (req, res) => {
    let { category, subcategory, product_uniqueid, customer_id, label } = req.query;
    // Remove spaces from the start and end of category and subcategory
    try {
        // Construct the DELETE query based on the provided parameters
        let deleteQuery = `
            DELETE FROM cart
            WHERE
            category = $1
            AND subcategory = $2
            AND product_uniqueid = $3
            AND customer_id = $4
        `;

        const queryParams = [category, subcategory, product_uniqueid, customer_id];

        if (label && label !== "null" && label !== "undefined") {
            deleteQuery += " AND variantlabel = $5";
            queryParams.push(label);
        }


        // Execute the DELETE query to remove the product from the cart
        const result = await pool.query(deleteQuery, queryParams);

        // Check if any rows were affected (indicating a successful deletion)
        if (result.rowCount > 0) {
            res.json({ message: 'Product removed from cart successfully' });
        } else {
            // If no rows were affected, the product may not have been found
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/removeProductFromCartWebsite', async (req, res) => {
    let { category, subcategory, product_uniqueid, customer_id, label } = req.body;
    // Remove spaces from the start and end of category and subcategory
    console.log(category);

    try {
        // Construct the DELETE query based on the provided parameters
        let deleteQuery = `
        DELETE FROM cart
        WHERE
        category = $1
        AND subcategory = $2
        AND product_uniqueid = $3
        AND customer_id = $4
      `;

        const queryParams = [category, subcategory, product_uniqueid, customer_id];
        if (label && label !== 'empty') {
            deleteQuery += ' AND variantlabel = $5';
            queryParams.push(label);
        }

        // Execute the DELETE query to remove the product from the cart
        const result = await pool.query(deleteQuery, queryParams);

        // Check if any rows were affected (indicating a successful deletion)
        if (result.rowCount > 0) {
            res.json({ message: 'Product removed from cart successfully' });
        } else {
            // If no rows were affected, the product may not have been found
            res.status(404).json({ message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app 