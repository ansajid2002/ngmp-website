const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require('multer');
const slug = require("slug");
const path = require("path");
const fs = require("fs");

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

const storageExcel = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/UploadedExcel");
    },
    filename: (req, file, callback) => {
        callback(null, `UploadedExcel-${Date.now()} - ${file.originalname}`);
    },
});

const uploadExcel = multer({ storage: storageExcel });

// Bulk Product Uploads
app.post("/BulkProductUpload", uploadExcel.single("selectedExcel"), async (req, res) => {
    const { jsonData, currentDateTime, vendorId } = req.body;

    console.log(JSON.parse(jsonData));
    try {
        const jsonDataArray = JSON.parse(jsonData);
        const totalRecords = jsonDataArray.length;

        const values = await Promise.all(
            jsonDataArray.map(async (data, index) => {
                const createdAt = new Date().toISOString();
                const skuid = data.key17 || ''
                const imageUrl = data.key8?.text || data.key8;
                let imageFileName = "";

                try {
                    const response = await fetch(imageUrl, {
                        headers: {
                            Accept: "image/jpeg",
                        },
                    });

                    if (response.ok) {
                        imageFileName = `${Date.now()}_${path.basename(
                            imageUrl,
                            ".jpg"
                        )}.jpg`;
                        const imageBuffer = await response.arrayBuffer();
                        const imagePath = path.join(
                            __dirname,
                            "..",
                            "uploads/UploadedProductsFromVendors",
                            imageFileName
                        );
                        fs.writeFileSync(imagePath, Buffer.from(imageBuffer));
                    }
                } catch (error) {
                    console.error("Error downloading image:", error);
                }

                const columnValues = [
                    data.key1 || "",
                    data.key2 || "",
                    data.key3 || "",
                    data.key4 || "",
                    data.key5 || 0,
                    data.key6 || "",
                    data.key7 || "",
                    data.key9 || "",
                    data.city || "",
                    data.state || "",
                    data.country || "",
                    data.vendorid || 0,
                    createdAt || "",
                    `{${imageFileName || ""}}`,
                    0,
                    data.uniquepid || "",
                    data.key10 || 0,
                    data.key11 || "",
                    data.key12 || "",
                    data.key13 || "",
                    data.key14 || "",
                    data.key15 || "",
                    data.key16 || "",
                    data.key17 || "",
                    data.key18 || 0,
                    "Simple",
                    data.key19 || "",
                    data.key6?.replace(/\s+/g, "").replace(/^\s+|\s+$/g, "") || "",
                    data.key7?.replace(/\s+/g, "").replace(/^\s+|\s+$/g, "") || "",
                    slug(data.key1 || ""),
                ];


                return columnValues;
            })
        );

        const columnNames = [
            "ad_title",
            "additionaldescription",
            "brand",
            "currency_symbol",
            "mrp",
            "category",
            "subcategory",
            "condition",
            "city",
            "state",
            "country",
            "vendorid",
            "updated_at_product",
            "images",
            "status",
            "uniquepid",
            "sellingprice",
            "manufacturername",
            "packerdetails",
            "salespackage",
            "searchkeywords",
            "keyfeatures",
            "videourl",
            "skuid",
            "quantity",
            "isvariant",
            "countryoforigin",
            "slug_cat",
            "slug_subcat",
            "prod_slug",
        ];

        const conflictColumns = ["skuid", "vendorid"];
        const conflictCondition = conflictColumns.map(column => `"${column}"=EXCLUDED."${column}"`).join(", ");

        const query = `
            INSERT INTO products ("${columnNames.join('", "')}") 
            VALUES ${values
                .map(
                    (_, index) =>
                        `(${columnNames
                            .map(
                                (_, columnIndex) =>
                                    `$${index * columnNames.length + columnIndex + 1}`
                            )
                            .join(", ")})`
                )
                .join(", ")}
            ON CONFLICT (${conflictColumns.join(', ')}) DO UPDATE SET ${conflictCondition}
        `;

        const flattenedValues = values.flat();

        const filenameExcel = req.file.filename
        const queryExcel = "INSERT INTO media_library(title, file_path, creation_date, vendor_id) VALUES ('Bulk Uploaded', $1, $2, $3)"
        const valuesExcel = [filenameExcel, currentDateTime, vendorId]
        await pool.query(query, flattenedValues);
        await pool.query(queryExcel, valuesExcel);

        res.status(200).json({ message: "Data uploaded successfully" });
    } catch (error) {
        console.error("Error uploading data:", error);
        res.status(500).json({ error: "Error uploading data" });
    }
});

app.post('/fetchVendorLibrary', async (req, res) => {
    const { vendorId } = req.body;

    try {
        // Use a parameterized query to avoid SQL injection
        const result = await pool.query(
            'SELECT * FROM media_library WHERE vendor_id = $1',
            [vendorId]
        );

        const mediaLibraryData = result.rows;

        // Send the retrieved data as the response
        res.json(mediaLibraryData);
    } catch (error) {
        console.error('Error fetching vendor library:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = app 