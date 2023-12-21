const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Define a route to accept and console the data
app.post("/SetAttributesValues", async (req, res) => {
    try {
        const { attributeName, attributeValues, type, category, subcategory } = req.body;

        console.log(category, subcategory);
        if (type === "update") {
            // Implement logic to update the attributes table
            const updateQuery = `
                UPDATE attributes
                SET attribute_values = $1, attribute_name = $2, category = $3, subcategory = $4
                WHERE attribute_name = $2;
            `;
            await pool.query(updateQuery, [attributeValues, attributeName, category, subcategory]);
        } else if (type === "add") {
            // Check if the combination of attribute_name, category, and subcategory already exists
            const checkQuery = `
                SELECT COUNT(*) AS count
                FROM attributes
                WHERE attribute_name = $1 AND category = $2 AND subcategory = $3;
            `;

            const { rows } = await pool.query(checkQuery, [attributeName, category, subcategory]);
            const existingAttributeCount = parseInt(rows[0].count, 10);

            if (existingAttributeCount === 0) {
                // Insert the new attribute if it doesn't exist
                const insertQuery = `
                    INSERT INTO attributes (attribute_name, attribute_values, category, subcategory)
                    VALUES ($1, $2, $3, $4);
                `;
                await pool.query(insertQuery, [attributeName, attributeValues, category, subcategory]);
            } else {
                return res.status(400).json({ error: "Attribute with the same name, category, and subcategory already exists" });
            }
        }

        // Send a response if needed
        res.status(200).json({ message: "Data received and inserted/updated successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post("/GetAttributesByVendor", async (req, res) => {
    try {

        // Example SQL query to retrieve attributes by vendor_id
        const query = `
            SELECT *
            FROM attributes ORDER BY attribute_id ASC
        `;

        // Execute the query
        const { rows } = await req.pool.query(query);

        // Assuming the data is retrieved successfully, send it as a JSON response
        res.status(200).json({ attributes: rows });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete an attribute by attribute_id
app.post("/DeleteAttribute", async (req, res) => {
    try {
        const { attribute_id } = req.body;

        // Implement the logic to delete the attribute in the database
        const deleteQuery = `
        DELETE FROM attributes
        WHERE attribute_id = $1;
      `;
        await req.pool.query(deleteQuery, [attribute_id]);

        // Send a success response to the frontend
        res.status(200).json({ message: "Attribute deleted successfully" });
    } catch (error) {
        console.error("Error:", error);

        // Send an error response to the frontend
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = app;
