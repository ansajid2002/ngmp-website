// vendor.js

const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require("multer");
const fs = require('fs');
const e = require('express');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.get("/getAllProductCatgeory", async (req, res) => {
    try {
        const query = 'SELECT categories.*, COUNT(products.category) AS product_count FROM categories LEFT JOIN products ON categories.category_name = products.category GROUP BY categories.category_id';

        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/getAllCatgeoryWithSubcategory", async (req, res) => {
    try {
        const { pageNumber, pageSize } = req.query;
        // const offset = (pageNumber - 1) * pageSize;
        const offset = isNaN(pageNumber) ? 0 : (pageNumber - 1) * pageSize;

        // Fetch categories
        const categoriesQuery = `
        SELECT categories.*, COUNT(products.category) AS product_count
        FROM categories
        LEFT JOIN products ON categories.category_name = products.category
        GROUP BY categories.category_id
        ORDER BY categories.category_id
        OFFSET $1
        LIMIT $2
    `;

        const categoriesResult = await pool.query(categoriesQuery, [offset, pageSize]);
        const categories = categoriesResult.rows;

        // Fetch subcategories and group them by parent_category_id
        const subcategoriesQuery = `
            SELECT subcategories.*, categories.category_id
            FROM public.subcategories
            LEFT JOIN categories ON subcategories.parent_category_id = categories.category_id
        `;

        const subcategoriesResult = await pool.query(subcategoriesQuery);
        const groupedSubcategories = groupSubcategoriesByParentCategoryId(subcategoriesResult.rows);

        // Append subcategories to the corresponding categories
        const data = categories.map(category => {
            const parentId = category.category_id;
            return {
                ...category,
                subcategories: groupedSubcategories[parentId] || [],
            };
        });

        // You can use another query to get the total count
        const countQuery = 'SELECT COUNT(*) FROM categories';
        const countResult = await pool.query(countQuery);
        const totalCount = countResult.rows[0].count || 0;

        res.status(200).json({
            data: data,
            total: totalCount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Helper function to group subcategories by parent_category_id
function groupSubcategoriesByParentCategoryId(subcategories) {
    const groupedSubcategories = {};
    subcategories.forEach(subcategory => {
        const parentId = subcategory.parent_category_id;
        if (!groupedSubcategories[parentId]) {
            groupedSubcategories[parentId] = [];
        }
        groupedSubcategories[parentId].push(subcategory);
    });
    return groupedSubcategories;
}

app.post("/updateCategoryStatus", async (req, res) => {
    try {
        const { categoryId, status, type, SubMainSelectedRow } = req.body;

        let updateQuery, values;
        if (type === 'category') {
            updateQuery = 'UPDATE categories SET category_status = $1 WHERE category_id = $2 RETURNING *;';
            values = [status, categoryId];
        } else if (type === 'subcategory') {
            updateQuery = 'UPDATE subcategories SET subcat_status = $1 WHERE subcategory_id = $2 RETURNING *;';
            values = [status, categoryId];
        } else if (type === 'submaincategory') {
            // Extract relevant properties
            const { nested_subcategories } = SubMainSelectedRow;

            // Update nested_subcat_status for the matched nested subcategory
            const update = nested_subcategories.map((item, index) => {
                if (index === categoryId) {
                    // Assuming your object has a 'status' property, update it here
                    return {
                        ...item,
                        status // Replace 'newStatus' with the desired status value
                    };
                }
                return item
            })

            updateQuery = 'UPDATE subcategories SET nested_subcategories = $1 WHERE subcategory_id = $2 RETURNING *;';
            values = [
                JSON.stringify(update), // Convert the array to a JSON string
                SubMainSelectedRow?.subcategory_id
            ];


        } else {
            // Invalid type provided
            return res.status(400).json({ success: false, message: 'Invalid type specified' });
        }

        // Execute the update query
        const { rows } = await pool.query(updateQuery, values);

        // Send a success response
        res.status(200).json({ success: true, message: 'Status updated successfully', update: rows });
    } catch (error) {
        console.error('Error updating status:', error);
        // Send an error response
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.post("/addNewCategories", async (req, res) => {
    try {
        const { category_type, category_name, category_description, category_status, subcategories = [] } = req.body;
        // Check if the category with the same name already exists
        const existingCategoryQuery = 'SELECT category_name FROM categories WHERE category_name = $1';
        const existingCategoryResult = await pool.query(existingCategoryQuery, [category_name]);

        if (existingCategoryResult.rows.length > 0) {
            // Category with the same name already exists
            return res.status(400).json({ success: false, error: 'Category with the same name already exists' });
        }

        // Insert the main category into the "categories" table
        const insertCategoryQuery = `
            INSERT INTO categories (category_type, category_name, category_description, category_status)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

        const categoryResult = await pool.query(insertCategoryQuery, [
            category_type,
            category_name,
            category_description,
            category_status,
        ]);

        const categoryId = isNaN(categoryResult.rows[0].category_id) ? null : categoryResult.rows[0].category_id;
        // console.log(categoryResult?.rows[0]);

        const addedSubcategories = [];
        const existingSubcategories = [];

        // Check and insert subcategories
        for (const subcategory of subcategories) {
            const { subcategory_name, subcategory_description, nested_subcategories } = subcategory;

            // // Check if the subcategory with the same name already exists
            const existingSubcategoryQuery = 'SELECT subcategory_name FROM subcategories WHERE subcategory_name = $1';
            const existingSubcategoryResult = await pool.query(existingSubcategoryQuery, [subcategory_name]);

            if (existingSubcategoryResult.rows.length === 0) {
                // Subcategory with the same name does not exist, insert it
                const insertSubcategoryQuery = `INSERT INTO subcategories (subcategory_name, subcategory_description, parent_category_id, nested_subcategories) VALUES ($1, $2, $3, $4) RETURNING *`;

                const insertedSubcategoryResult = await pool.query(insertSubcategoryQuery, [subcategory_name, subcategory_description, categoryId, nested_subcategories]);


                // Add the inserted subcategory to the list
                addedSubcategories.push(insertedSubcategoryResult.rows[0]);
            } else {
                // Log that the subcategory already exists
                console.log(`Subcategory "${subcategory_name}" already exists for category "${category_name}"`);

                // Add the existing subcategory to the list
                existingSubcategories.push(existingSubcategoryResult.rows[0]);
            }
        }

        const updatedSubcategoriesQuery = 'SELECT * FROM subcategories WHERE parent_category_id = $1';
        const updatedSubcategoriesResult = await pool.query(updatedSubcategoriesQuery, [categoryId]);

        const groupedSubcategories = groupSubcategoriesByParentCategoryId(updatedSubcategoriesResult.rows);

        // Append subcategories to the corresponding categories
        const dataWithNewCategory = categoryResult?.rows.map(category => {
            const parentId = category.category_id;
            return {
                ...category,
                subcategories: groupedSubcategories[parentId] || [],
            };
        });


        res.status(200).json({ success: true, data: dataWithNewCategory, message: `Categories and subcategories added successfully, ${addedSubcategories.length} added and ${existingSubcategories.length} already exists` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});

app.post("/updateCategory", async (req, res) => {
    try {
        const categoryId = req.body.selectedKey; // Get the category ID from the URL parameter
        const { category_name, category_description, category_status, category_type, subcategories } = req.body.values;

        // Check if the category with the given ID exists in the database
        const checkQuery = 'SELECT * FROM categories WHERE category_id = $1';
        const checkValues = [categoryId];
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length === 0) {
            // Category with the given ID does not exist
            return res.status(404).json({ error: "Category not found." });
        }

        // If the category exists, proceed with the update
        const updateQuery = 'UPDATE categories SET category_name = $1, category_description = $2, category_status = $4, category_type = $5 WHERE category_id = $3 RETURNING *';
        const updateValues = [category_name, category_description, categoryId, category_status, category_type];
        const { rows } = await pool.query(updateQuery, updateValues);

        // Update or insert subcategories
        if (subcategories && subcategories.length > 0) {
            for (const subcategory of subcategories) {
                const { subcategory_id, subcategory_name, subcat_status, subcategory_description, nested_subcategories } = subcategory;

                // Convert nestedSubcategories array to JSON
                const nestedSubcategoriesJSON = JSON.stringify(nested_subcategories);

                if (subcategory_id) {
                    // Update existing subcategory
                    const subUpdateQuery = 'UPDATE subcategories SET subcategory_name = $2, subcat_status = $3, subcategory_description = $4, nested_subcategories = $5 WHERE subcategory_id = $1 RETURNING *';
                    const subUpdateValues = [subcategory_id, subcategory_name, subcat_status, subcategory_description, nestedSubcategoriesJSON];
                    await pool.query(subUpdateQuery, subUpdateValues);
                } else {
                    // Insert new subcategory
                    const subInsertQuery = 'INSERT INTO subcategories (subcategory_name, subcat_status, parent_category_id, subcategory_description, nested_subcategories) VALUES ($1, $2, $3, $4, $5) RETURNING *';
                    const subInsertValues = [subcategory_name, subcat_status, categoryId, subcategory_description, nestedSubcategoriesJSON];
                    await pool.query(subInsertQuery, subInsertValues);
                }
            }
        }

        res.status(200).json(rows[0]); // Return the updated category data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/deleteCategory", async (req, res) => {
    try {
        const categoryId = req.body.selectedKey; // Get the category ID from the request body

        // Check if the category with the given ID exists in the database
        const checkQuery = 'SELECT * FROM categories WHERE category_id = $1';
        const checkValues = [categoryId];
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length === 0) {
            // Category with the given ID does not exist
            return res.status(404).json({ error: "Category not found." });
        }

        // If the category exists, proceed with the deletion

        // Delete the subcategories associated with the category (with matching parent_category_id)
        const deleteSubcategoriesQuery = 'DELETE FROM subcategories WHERE parent_category_id = $1';
        await pool.query(deleteSubcategoriesQuery, [categoryId]);

        // Now, delete the main category from the 'categories' table
        const deleteCategoryQuery = 'DELETE FROM categories WHERE category_id = $1';
        await pool.query(deleteCategoryQuery, [categoryId]);

        res.status(204).end(); // Return 204 No Content status to indicate successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Handle file upload
// img storage path
const imgConfigCatgeory = multer.diskStorage({
    destination: (req, file, callback) => {
        console.log(file);
        callback(null, "./uploads/CatgeoryImages");
    },
    filename: (req, file, callback) => {
        callback(null, `CatgeoryImages-${Date.now()}-${file.originalname}`);
    },
});

// img filter
const isCategoryImage = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"));
    }
};

const uploadCategory = multer({
    storage: imgConfigCatgeory,
    fileFilter: isCategoryImage,
});

app.post('/UploadCategoryImage', uploadCategory.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided.' });
        }

        const file = req.file;
        const categoryId = req.body.selectedKey; // Assuming you have the category_id in the request body

        // Fetch the old image URL and file name from the database based on category_id
        const query = 'SELECT category_image_url FROM categories WHERE category_id = $1';
        const { rows } = await pool.query(query, [categoryId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        const oldImageUrl = rows[0].category_image_url;

        // If there's an old image URL, unlink it from your server
        if (oldImageUrl) {
            const oldImageFilePath = `./uploads/CatgeoryImages/${oldImageUrl}`;

            fs.unlink(oldImageFilePath, (err) => {
                if (err) {
                    console.error(`Error deleting old image: ${err}`);
                }
            });
        }

        // Update the category_image_url in your PostgreSQL database
        const updateQuery = 'UPDATE categories SET category_image_url = $1 WHERE category_id = $2';
        const values = [file.filename, categoryId]; // Adjust as per your needs

        await pool.query(updateQuery, values);

        res.status(200).json({ file: file.filename, message: 'Category image updated successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred while storing the category picture.' });
    }
});

app.post('/vendorCatChange', async (req, res) => {
    try {
        let { type, recordId, newValue } = req.body;

        // Assume you have a database connection pool named 'pool'
        console.log(type);
        // Check the type and update the corresponding column
        let updateQuery = '';
        let updateParams = [];
        const slug_cat = newValue?.replace(/[^\w\s]/g, "").replace(/\s/g, "")

        if (type === 'category') {
            updateQuery = 'UPDATE products SET category = $1, slug_cat = $2, status = 0 WHERE id = $3';
            updateParams = [newValue, slug_cat, recordId];

        } else if (type === 'subcategory') {
            updateQuery = 'UPDATE products SET subcategory = $1, slug_cat = $2, status = 0 WHERE id = $3';
            updateParams = [newValue, slug_cat, recordId];

        } else if (type === 'sellingprice') {
            updateQuery = 'UPDATE products SET sellingprice = $1, status = 0 WHERE id = $2';
            updateParams = [newValue, recordId];
        } else if (type === 'mrp') {
            updateQuery = 'UPDATE products SET mrp = $1, status = 0 WHERE id = $2';
            updateParams = [newValue, recordId];

        } else if (type === 'brand') {
            updateQuery = 'UPDATE products SET brand = $1, status = 0 WHERE id = $2';
            updateParams = [newValue, recordId];

        } else if (type === 'quantity') {
            updateQuery = 'UPDATE products SET quantity = $1, status = 0 WHERE id = $2';
            updateParams = [newValue, recordId];

        } else if (type === 'ad_title') {
            updateQuery = 'UPDATE products SET ad_title = $1, status = 0 WHERE id = $2';
            updateParams = [newValue, recordId];

        } else if (type === 'skuid') {
            // Check if the new skuid already exists in the products table
            const skuidCheckQuery = 'SELECT id FROM products WHERE skuid = $1 AND id != $2';
            const skuidCheckParams = [newValue, recordId];
            const skuidCheckResult = await pool.query(skuidCheckQuery, skuidCheckParams);

            if (skuidCheckResult.rows.length > 0) {
                // Skuid already exists in the products table, return an error
                return res.status(400).json({ message: 'Skuid already exists in products. Please choose a different one.' });
            }

            // Check if the new skuid already exists in the variantproducts table
            const variantSkuidCheckQuery = 'SELECT variant_id FROM variantproducts WHERE variant_skuid = $1 AND product_uniqueid != $2';
            const variantSkuidCheckParams = [newValue, skuidCheckResult?.rows?.[0]?.product_uniquepid];
            const variantSkuidCheckResult = await pool.query(variantSkuidCheckQuery, variantSkuidCheckParams);

            if (variantSkuidCheckResult.rows.length > 0) {
                // Skuid already exists in variantproducts, return an error
                return res.status(400).json({ message: 'Skuid already exists in variantproducts. Please choose a different one.' });
            }

            // Continue with the update if skuid is unique in both tables
            updateQuery = 'UPDATE products SET skuid = $1, status = 0 WHERE id = $2';
            updateParams = [newValue, variantSkuidCheckResult?.rows?.[0]?.product_uniquepid];
        } else {
            return res.status(400).json({ message: 'Invalid type provided.' });
        }

        console.log(updateQuery, updateParams);

        // Execute the update query
        await pool.query(updateQuery, updateParams);

        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error occurred' });
    }
});

module.exports = app;
