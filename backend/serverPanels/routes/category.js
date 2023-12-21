// vendor.js

const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require("multer");
const fs = require('fs');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.get("/getAllProductCatgeory", async (req, res) => {
    try {
        const query = 'SELECT * FROM categories';

        const { rows } = await pool.query(query);
        res.status(200).json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/addNewCategories", async (req, res) => {
    try {
        const { category_name, category_description, category_status, category_type } = req.body.values;

        // Check if the category with the given name already exists in the database
        const checkQuery = 'SELECT * FROM categories WHERE category_name = $1';
        const checkValues = [category_name];
        const checkResult = await pool.query(checkQuery, checkValues);

        if (checkResult.rows.length > 0) {
            // Category with the given name already exists
            return res.status(409).json({ error: "Category already exists." });
        }

        // If the category doesn't exist, proceed with the insertion
        const insertQuery = 'INSERT INTO categories (category_name, category_description, category_status, category_type) VALUES ($1, $2, $3, $4) RETURNING *';
        const insertValues = [category_name, category_description, category_status, category_type];
        const { rows } = await pool.query(insertQuery, insertValues);

        res.status(201).json(rows[0]); // Return the newly inserted category data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/updateCategory", async (req, res) => {
    console.log(req.body);
    try {
        const categoryId = req.body.selectedKey; // Get the category ID from the URL parameter
        const { category_name, category_description, category_status, category_type } = req.body.values;

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

module.exports = app;
