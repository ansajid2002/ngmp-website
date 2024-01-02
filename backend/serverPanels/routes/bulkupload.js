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
    const { jsonData, currentDateTime, vendorId, excludeImage } = req.body;

    try {
        const jsonDataArray = JSON.parse(jsonData);

        await Promise.all(
            jsonDataArray.map(async (data, index) => {
                const createdAt = new Date().toISOString();
                const imageUrl = data.key8?.text || data.key8;
                let imageFileName = "";

                if (excludeImage === 'false') {
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

                            // console.log(imageFileName);
                            // return
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
                }


                const existingProduct = await pool.query(
                    'SELECT * FROM products WHERE skuid = $1 AND vendorid = $2',
                    [data.key17, data.vendorid]
                );

                // Unlink existing images
                if (existingProduct.rows.length > 0 && excludeImage === 'false') {
                    const existingImages = existingProduct.rows[0].images;

                    existingImages.forEach((imageName) => {
                        const existingImagePath = path.join(
                            __dirname,
                            "..",
                            "uploads/UploadedProductsFromVendors",
                            imageName
                        );

                        try {
                            console.log('unlinked');
                            // Unlink the existing image file
                            fs.unlinkSync(existingImagePath);
                        } catch (error) {
                            console.error("Error unlinking existing image:", error);
                        }
                    });
                }

                if (existingProduct.rows.length > 0) {
                    console.log('exis', index);
                    // Update the existing row
                    const query = `
                        UPDATE products SET 
                            ad_title = $1,
                            additionaldescription = $2,
                            brand = $3,
                            currency_symbol = $4,
                            mrp = $5,
                            category = $6,
                            subcategory = $7,
                            condition = $8,
                            city = $9,
                            state = $10,
                            country = $11,
                            vendorid = $12,
                            updated_at_product = $13,
                            images = $14,
                            status = $15,
                            uniquepid = $16,
                            sellingprice = $17,
                            manufacturername = $18,
                            packerdetails = $19,
                            salespackage = $20,
                            searchkeywords = $21,
                            keyfeatures = $22,
                            videourl = $23,
                            skuid = $24,
                            quantity = $25,
                            isvariant = $26,
                            countryoforigin = $27,
                            slug_cat = $28,
                            slug_subcat = $29,
                            prod_slug = $30
                        WHERE skuid = $24 AND vendorid = $12
                    `;

                    const flattenedValues = [
                        data.key1 || "",
                        data.key2 || "",
                        data.key3 || "",
                        data.key4 || "",
                        data.key5 || 0,
                        existingProduct.rows[0].category || "",
                        existingProduct.rows[0].subcategory || "",
                        data.key9 || "",
                        data.city || "",
                        data.state || "",
                        data.country || "",
                        data.vendorid || 0,
                        createdAt || "",
                        `{${imageFileName || ""}}`,
                        0,
                        existingProduct.rows[0].uniquepid || "",
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
                        data.category.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        data.subcatgeory.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        slug(data.key1 || "")
                    ];

                    await pool.query(query, flattenedValues);
                } else {
                    console.log('insert', index);

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

                    // Insert a new row
                    const query = `
                        INSERT INTO products ("${columnNames.join('", "')}") 
                        VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
                        )
                    `;

                    const flattenedValues = [
                        data.key1 || "",
                        data.key2 || "",
                        data.key3 || "",
                        data.key4 || "",
                        data.key5 || 0,
                        data.category || "",
                        data.subcatgeory || "",
                        data.key9 || "",
                        data.city || "",
                        data.state || "",
                        data.country || "",
                        data.vendorid || 0,
                        createdAt || "",
                        `{${imageFileName || ""}}`,
                        0,
                        data.uniquepid || null,
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
                        data.category.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        data.subcatgeory.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        slug(data.key1 || "")
                    ];

                    await pool.query(query, flattenedValues);
                }
            })
        );

        const filenameExcel = req.file.filename
        const queryExcel = "INSERT INTO media_library(title, file_path, creation_date, vendor_id) VALUES ('Bulk Uploaded', $1, $2, $3)"
        const valuesExcel = [filenameExcel, currentDateTime, vendorId]
        await pool.query(queryExcel, valuesExcel);
        return res.status(200).json({ message: "Data uploaded successfully" });

    } catch (error) {
        console.error("Error uploading data:", error);
        res.status(500).json({ error: error.message });
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