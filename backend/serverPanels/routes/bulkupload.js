const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require('multer');
const slug = require("slug");
const path = require("path");
const fs = require("fs");
const sendEmail = require('./nodemailer');

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
let fileUploaded = false; // Flag to track whether the file has been uploaded

// Bulk Product Uploads
app.post("/BulkProductUpload", uploadExcel.single("selectedExcel"), async (req, res) => {
    const { jsonData, specifications, excludeImage } = req.body;

    const updatedProductIds = [];
    let filenameExcel = ''
    try {
        const jsonDataArray = JSON.parse(jsonData);
        let specificationsArray;

        if (specifications !== undefined) {
            try {
                specificationsArray = JSON.parse(specifications);
            } catch (error) {
                console.error('Error parsing JSON:', error);
                specificationsArray = []; // Set specificationsArray to an empty array in case of parsing error
            }
        } else {
            specificationsArray = [];
        }

        const newSpecification = specificationsArray?.length > 0 && specificationsArray.map(obj => {
            const modifiedObj = {};
            for (const key in obj) {
                if (Object.hasOwnProperty.call(obj, key)) {
                    // Convert to lowercase, remove spaces, and remove special characters
                    const newKey = key.toLowerCase().replace(/\s/g, '').replace(/[^\w\s]/g, '');
                    modifiedObj[newKey] = obj[key];
                }
            }
            return modifiedObj;
        });



        console.log(newSpecification);

        filenameExcel = req?.file?.filename


        await Promise.all(
            jsonDataArray.map(async (data, index) => {
                const key24String = data.key24 || "[]"; // If data.key24 is undefined or null, default to an empty array
                const key24Array = JSON.parse(key24String);
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

                    existingImages && existingImages.forEach((imageName) => {
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
                            prod_slug = $30,
                            height = $31,
                            width = $32,
                            length = $33,
                            weight = $34,
                            attributes_specification = $35
                        WHERE skuid = $24 AND vendorid = $12
                        RETURNING id;
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
                        existingProduct.rows[0]?.uniquepid || "",
                        data.key10 || 0,
                        data.key11 || "",
                        data.key12 || "",
                        data.key13 || "",
                        data.key14 || "",
                        data.key15 || "",
                        data.key16 || "",
                        data.key17 || "",
                        data.key18 || 0,
                        data.key0 || '',
                        data.key19 || "",
                        existingProduct.rows[0].category.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        existingProduct.rows[0].subcategory.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        slug(data.key1 || ""),
                        data.key20 || 0,
                        data.key21 || 0,
                        data.key22 || 0,
                        data.key23 || 0,
                        newSpecification?.[index] || []
                    ];

                    const { rows } = await pool.query(query, flattenedValues);
                    if (rows.length > 0) {
                        updatedProductIds.push(rows[0].id);
                    }
                    // console.log(query, flattenedValues);
                } else {

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
                        "height",
                        "width",
                        "length",
                        "weight",
                        "attributes_specification"
                    ];

                    // Insert a new row
                    const query = `
                        INSERT INTO products ("${columnNames.join('", "')}") 
                        VALUES (
                            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                            $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
                            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35
                        )
                        RETURNING id;
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
                        data.key0 || '',
                        data.key19 || "",
                        data.category.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        data.subcatgeory.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                        slug(data.key1 || ""),
                        data.key20 || 0,
                        data.key21 || 0,
                        data.key22 || 0,
                        data.key23 || 0,
                        newSpecification?.[index] || []
                    ];

                    const { rows } = await pool.query(query, flattenedValues);
                    if (rows.length > 0) {
                        updatedProductIds.push(rows[0].id);
                    }
                }

                if (key24Array && key24Array.length > 0) {
                    await Promise.all(
                        key24Array.map(async (variantData) => {
                            const existingVariant = await pool.query(
                                'SELECT * FROM variantproducts WHERE variant_skuid = $1 AND vendori_id = $2 AND product_uniqueid = $3',
                                [variantData.sku, data.vendorid, existingProduct.rows[0]?.uniquepid]
                            );

                            const label = Object.entries(variantData.attributes)
                                .map(([key, value]) => `${value}`)
                                .join('/');


                            if (existingVariant.rows.length > 0) {
                                console.log(variantData.sku, data.vendorid, existingProduct.rows[0]?.uniquepid);

                                // Update Variant
                                const updateQuery = `
                                    UPDATE variantproducts SET 
                                        variant_mrp = $1,
                                        variant_sellingprice = $2,
                                        variant_skuid = $3,
                                        variant_quantity = $4,
                                        variantsvalues = $5,
                                        label = $6,
                                        product_uniqueid = $8
                                    WHERE variant_skuid = $3 AND vendori_id = $7
                                `;

                                const updateValues = [
                                    parseFloat(variantData.Mrp) || 0,
                                    parseFloat(variantData['Selling Price']) || 0,
                                    variantData.sku || '',
                                    parseInt(variantData.Quantity) || 0,
                                    variantData.attributes || '',
                                    label || '',
                                    data.vendorid,
                                    existingProduct.rows[0]?.uniquepid
                                ];

                                await pool.query(updateQuery, updateValues);
                            } else {
                                // Insert Variant 
                                const insertQuery = `
                            INSERT INTO variantproducts(variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, label, product_uniqueid, vendori_id, variant_category, variant_subcategory)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                        `;

                                const insertValues = [
                                    parseFloat(variantData.Mrp) || 0,
                                    parseFloat(variantData['Selling Price']) || 0,
                                    variantData.sku || '',
                                    parseInt(variantData.Quantity) || 0,
                                    variantData.attributes || '',
                                    label || '',
                                    data.uniquepid,
                                    data.vendorid,
                                    data.category.replace(/[^\w\s]/g, "").replace(/\s/g, ""),
                                    data.subcatgeory.replace(/[^\w\s]/g, "").replace(/\s/g, "")
                                ];

                                await pool.query(insertQuery, insertValues);
                            }
                        })
                    );
                }
            })
        );

        return res.status(200).json({ message: "Data uploaded successfully", updatedProductIds, filename: filenameExcel });

    } catch (error) {
        console.error("Error uploading data:", error);
        res.status(500).json({ error: error.message });
    }

});

app.post("/BulkUploadSheetandIds", async (req, res) => {
    try {
        // console.log(req.body);
        const { fileName, date, vendorid, singleDimensionalArray } = req.body

        const queryExcel = "INSERT INTO media_library(title, file_path, creation_date, vendor_id) VALUES ('Bulk Uploaded', $1, $2, $3)"
        const valuesExcel = [fileName, date, vendorid]
        await pool.query(queryExcel, valuesExcel);

        const queryBulkTrack = "INSERT INTO vendorBulkUpload(vendor_id, productids) VALUES ($1, $2)"
        const valueBulkTrack = [vendorid, singleDimensionalArray]
        await pool.query(queryBulkTrack, valueBulkTrack);

        return res.status(200).json({ message: 'Uploaded Excel Sheet and in Media Library' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

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

app.get('/fetchVendorBulkUpload', async (req, res) => {
    try {
        // Extract query parameters from the request
        const { page = 1, pageSize = 10 } = req.query;

        // Construct the SQL query to get paginated data with vendor information
        const sqlQuery = `
            SELECT vb.*
            FROM public.vendorbulkupload vb
            OFFSET $1
            LIMIT $2
        `;

        // Execute the SQL query to get paginated data with vendor information
        const result = await pool.query(sqlQuery, [(page - 1) * pageSize, pageSize]);

        // Extract the rows from the result
        const data = result.rows;

        // Construct a separate SQL query to get the total count
        const countQuery = 'SELECT COUNT(*) FROM public.vendorbulkupload';

        // Execute the count query
        const countResult = await pool.query(countQuery);
        const totalCount = countResult.rows[0].count;

        // Construct a new SQL query to get vendor information
        const vendorQuery = 'SELECT * FROM vendors';

        // Execute the vendor query
        const vendorResult = await pool.query(vendorQuery);

        // Extract vendor information from the result
        const vendors = vendorResult.rows.reduce((acc, vendor) => {
            // Exclude the 'password' field from the vendor data
            const { password, ...vendorDataWithoutPassword } = vendor;
            acc[vendor.id] = vendorDataWithoutPassword;
            return acc;
        }, {});


        // Map vendor information to the corresponding rows in the data
        const augmentedData = data.map(row => ({
            ...row,
            vendor: vendors[row.vendor_id],
        }));

        // Send the augmented data and total count as JSON response
        res.json({ data: augmentedData, totalCount });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/approveProducts', async (req, res) => {
    try {
        const { bulkId, ids } = req.body;

        console.log(req.body);
        // Update products in the database
        const query = `
            UPDATE products
            SET status = 1
            WHERE id IN (${ids.join(',')})
            Returning *
        `;

        const { rows } = await pool.query(query);

        // Return a response indicating success
        res.status(200).json({ message: 'Products approved successfully' });

        // Check if it's the last batch
        const lastBatch = req.headers['last-batch'] === 'true';
        if (lastBatch) {
            // Execute additional logic after the last batch is approved
            console.log('Last batch approved! Execute additional logic here.');
        }
    } catch (error) {
        console.error('Error approving products:', error.message);
        // Handle the error, send an error response
        res.status(500).json({ error: error.message });
    }
});

function padZero(number) {
    return number < 10 ? `0${number}` : number;
}

app.post('/senBulkApproveMailNotification', async (req, res) => {
    try {
        const date = new Date();
        const formattedDate = `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;

        const { vendor_id, email, length, type, bulkId } = req.body;

        console.log(req.body);
        const title = type === 'approve' ? 'Bulk Product Approved' : 'Bulk Product Rejected';
        const message = type === 'approve' ? `Your ${length} products just got approved.` : `Your ${length} products have been rejected.`;

        // Insert notification into vendors_notifications table
        const notificationResult = await pool.query(
            "INSERT INTO vendors_notifications (vendor_id, type, title, message, date) VALUES ($1, $2, $3, $4, $5)",
            [vendor_id, 'General', title, message, formattedDate]
        );

        if (notificationResult.rowCount > 0) {
            // Update status in vendorbulkupload table based on type
            const statusToUpdate = type === 'approve' ? 'approved' : 'rejected';
            const updateStatusQuery = `
                UPDATE vendorbulkupload
                SET status = $1
                WHERE bulk_id = $2; -- assuming status is initially NULL
            `;

            const updateStatusResult = await pool.query(updateStatusQuery, [statusToUpdate, bulkId]);
            console.log(updateStatusResult.rowCount);

            if (updateStatusResult.rowCount > 0) {

                const htmlBody = `
                    <html>
                        <head>
                            <!-- Add any necessary styling or metadata here -->
                        </head>
                        <body>
                            <p>Dear Customer,</p>
                            <p>${message}</p>
                            <p>Thank you for choosing Nile Global Market-place.</p>
                        </body>
                    </html>
                `;

                await sendEmail(email, title, htmlBody);
                return res.status(200).json({ message: 'Bulk approval mail notification sent successfully' });
            } else {
                return res.status(400).json({ message: 'Failed to update status in vendorbulkupload table' });
            }
        } else {
            return res.status(400).json({ message: 'Failed to insert notification' });
        }
    } catch (error) {
        console.error('Error sending bulk approval mail notification:', error.message);
        return res.status(500).json({ error: error.message });
    }
});




module.exports = app 