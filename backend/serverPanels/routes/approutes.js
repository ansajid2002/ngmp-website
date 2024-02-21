const express = require('express');
const fs = require('fs');
const path = require('path');
const pool = require('../config')
const app = express();
const cors = require('cors');
const multer = require('multer');
const exceljs = require('exceljs');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

const SubcatAll = async (res) => {
    try {
        const query1 = "SELECT * FROM categories";
        const query2 = "SELECT * FROM subcategories";

        // Use Promise.all to execute both queries concurrently
        const [result1, result2] = await Promise.all([
            pool.query(query1),
            pool.query(query2)
        ]);

        const categoryData = result1.rows;
        const subcategoryData = result2.rows;

        // Map each category to add a 'subcategories' array containing its associated subcategories
        const categoriesWithSubcategories = categoryData.map((cat) => ({
            ...cat,
            subcategories: subcategoryData.filter(
                (subcat) => subcat.parent_category_id === cat.category_id
            ),
        }));

        // Sort the categories by their 'category_id' before updating the state
        const sortedCategories = categoriesWithSubcategories.sort(
            (a, b) => a.category_id - b.category_id
        );

        return sortedCategories
    } catch (error) {
        return
    }
}

const getCategoryById = async (categoryId) => {
    try {
        const query = 'SELECT * FROM categories WHERE category_id = $1';
        const result = await pool.query(query, [categoryId]);

        // Check if any data was retrieved
        if (result.rows.length === 0) {
            return null; // Return null if no category with the given ID was found
        }

        const categoryData = result.rows[0]; // Assuming only one category is returned

        // Fetch associated subcategories for the category
        const subcategoryQuery = 'SELECT * FROM subcategories WHERE parent_category_id = $1';
        const subcategoryResult = await pool.query(subcategoryQuery, [categoryId]);
        const subcategoryData = subcategoryResult.rows;

        // Assign the subcategories to the category data
        categoryData.subcategories = subcategoryData;

        return categoryData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

app.get("/getAllCategoriesData", async (req, res) => {
    try {
        const subcatData = await SubcatAll(res)
        let response = subcatData
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


app.get("/getProductsData", async (req, res) => {
    try {

        const productsData = await fetchCatDataOFType('Products')
        res.status(200).json(productsData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const fetchCatDataOFType = async (cat_type) => {
    try {
        let categoryQuery = 'SELECT * FROM categories';

        if (cat_type) {
            categoryQuery += ` WHERE category_type = $1`
        }
        const categoryResult = await pool.query(categoryQuery, cat_type && [cat_type]);

        const categories = categoryResult.rows;

        const categoriesWithSubcategories = await Promise.all(
            categories.map(async (category) => {
                const subcategoryQuery = 'SELECT * FROM subcategories WHERE parent_category_id = $1';
                const subcategoryResult = await pool.query(subcategoryQuery, [category.category_id]);
                const subcategories = subcategoryResult.rows;

                return {
                    ...category,
                    subcategories: subcategories,
                };
            })
        );

        return (categoriesWithSubcategories);
    } catch (error) {
        console.error(error);

    }
}

app.get("/getServicesData", async (req, res) => {
    try {

        const servicesData = await fetchCatDataOFType('Services')
        res.status(200).json(servicesData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/getCatgeory", async (req, res) => {
    try {
        const productCatgeories = await fetchCatDataOFType('Products')
        res.status(200).json(productCatgeories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.get("/getAllCategory", async (req, res) => {
    try {
        const productCatgeories = await fetchCatDataOFType()
        res.status(200).json(productCatgeories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});


app.get("/getFeaturedSubcategories", async (req, res) => {
    try {
        const query = "SELECT * FROM subcategories WHERE isfeatured = true;";

        // Use Promise.all to execute both queries concurrently
        const [result] = await Promise.all([
            pool.query(query),
        ]);

        const featuredCategoryData = result.rows;
        res.status(200).json(featuredCategoryData)
    } catch (error) {
        return
    }
});
app.get("/getSubcategoriesByCatId", async (req, res) => {
    const { catId } = req.query;
    try {
        const query = "SELECT * FROM subcategories WHERE parent_category_id = $1";

        // Use catId as a parameter in the query
        const result = await pool.query(query, [catId]);

        const subCategoryData = result.rows;
        res.status(200).json(subCategoryData);
    } catch (error) {
        // Handle the error appropriately
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/getSubcategorygroupByCatId", async (req, res) => {
    const { catId, category_name } = req.query;
    try {
        const specificCategory = await getCategoryById(catId);
        res.status(200).json(specificCategory)
    } catch (error) {
        // Handle the error appropriately
        res.status(500).json({ error: "Internal server error" });
    }
});
app.get("/getmogadishudistrict", async (req, res) => {
    const { customer_id } = req.query
    try {
        const query = "SELECT mogadishudistrict_customer FROM customers WHERE customer_id = $1";

        // Use catId as a parameter in the query
        const result = await pool.query(query, [customer_id]);

        const districtData = result.rows;
        res.status(200).json(districtData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
})

app.post("/getmogadishudistrict", async (req, res) => {
    const { customer_id, district } = req.body;

    try {
        const query = "UPDATE customers SET mogadishudistrict_customer = $2 WHERE customer_id = $1 RETURNING *";
        const result = await pool.query(query, [customer_id, district]);

        // Check if the update was successful
        if (result.rows.length > 0) {
            const updatedCustomer = result.rows[0];
            res.status(200).json({ message: "District updated successfully", customer: updatedCustomer.mogadishudistrict_customer });
        } else {
            res.status(404).json({ error: "Customer not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

app.get("/getShippingRate", async (req, res) => {
    const { origin, destination } = req.query;

    try {
        const filePath = path.join(__dirname, '../JSON/', 'shippingrates.json');
        const rawData = fs.readFileSync(filePath);
        const shippingRates = JSON.parse(rawData);

        // Find the rate based on origin and destination
        const rate = findShippingRate(shippingRates, origin, destination);

        if (rate !== undefined) {
            res.json({ rate });
        } else {
            res.status(404).json({ error: "Shipping rate not found" });
        }
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/translations/:language", (req, res) => {
    try {
        const language = req.params.language;
        const filePath = path.join(__dirname, '../JSON/', `${language}.json`)

        const rawData = fs.readFileSync(filePath);
        const translations = JSON.parse(rawData)
        res.json(translations)
    } catch (error) {
        console.error('Error reading translation file:', error);
        res.status(500).send('Internal Server Error');
    }
})

const storage = multer.memoryStorage(); // Use memory storage for handling FormData
const upload = multer({ storage: storage });

app.post("/writeTranslations", upload.single('translationsFile'), async (req, res) => {
    try {
        const translationsBuffer = req.file.buffer;
        const selectedCountry = req.body?.selectedCountry
        const translations = JSON.parse(translationsBuffer.toString());

        // Assuming translations is an array of translation objects
        await writeTranslationsToFiles(translations, selectedCountry);

        res.status(200).json({ success: true, message: 'Translations have been saved.' });
    } catch (error) {
        console.error('Error writing translation files:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

const writeTranslationsToFiles = async (translationsChunk, selectedCountry) => {
    try {
        // Construct the file path
        const jsonFolderPath = path.join(__dirname, '..', 'JSON');
        const fileName = `${selectedCountry.toLowerCase()}.json`;
        const filePath = path.join(jsonFolderPath, fileName);

        // Read existing translations or initialize an empty object
        let translations = {};
        try {
            translations = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        } catch (error) {
            // File doesn't exist or is empty
            console.log(`File ${filePath} does not exist or is empty. Initializing new translations object.`);
        }

        // Merge the translations from the chunk into the existing translations object
        translationsChunk.forEach(chunk => {
            translations = { ...translations, ...chunk };
        });

        // Write the merged translations object back to the file
        fs.writeFileSync(filePath, JSON.stringify(translations, null, 2));
        console.log('Translations written to file:', filePath);
    } catch (error) {
        console.error('Error processing translations chunk:', error.message);
    }
};
////////////////////READ TRANSLATIONS//////////////////////////
// Function to read translation files and return Excel data
const readTranslationsAndGenerateExcel = () => {
    const jsonFolderPath = path.join(__dirname, '..', 'JSON');
    const languages = ['so', 'hi', 'sw', 'am', 'ar', 'fr']; // Add more languages as needed
    const translations = {};

    try {
        languages.forEach((language) => {
            const fileName = `${language.toLowerCase()}.json`;
            const filePath = path.join(jsonFolderPath, fileName);

            // Read translation file synchronously
            const fileData = fs.readFileSync(filePath, 'utf-8');
            translations[language] = JSON.parse(fileData);
        });

        // Generate Excel data
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('Translations');

        // Add headers
        worksheet.addRow(['English', ...languages]);

        // Get all keys available in any language (assuming all languages have the same keys)
        const allKeys = Object.keys(translations[languages[0]]);

        // Add data rows
        allKeys.forEach((key) => {
            const rowData = [key];
            languages.forEach((language) => {
                rowData.push(translations[language][key] || ''); // Handle missing translations
            });
            worksheet.addRow(rowData);
        });

        return workbook;
    } catch (readError) {
        console.error('Error reading translation files:', readError.message);
        throw readError;
    }
};


app.get("/getTranslationsAsExcel", (req, res) => {
    try {
        const workbook = readTranslationsAndGenerateExcel();

        // Send Excel file as response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=translations.xlsx');

        workbook.xlsx.write(res).then(() => {
            res.end();
        });

    } catch (error) {
        console.error('Error generating Excel file:', error);
        res.status(500).send('Internal Server Error');
    }
});

////////////////////READ TRANSLATIONS//////////////////////////

app.post('/storeNotification', async (req, res) => {
    const { customerId, notification_type, message, timestamp } = req.body;

    try {
        // Check if a notification with the same notification_type and customerId exists
        const existingNotification = await pool.query(
            'SELECT * FROM notifications WHERE notification_type = $1 AND customer_id = $2',
            [notification_type, customerId]
        );

        if (existingNotification.rows.length > 0) {
            console.log("OLD");
            // Update existing notification
            const result = await pool.query(
                'UPDATE notifications SET message = $1, timestamp = $2 WHERE notification_type = $3 AND customer_id = $4 RETURNING *',
                [message, timestamp, notification_type, customerId]
            );
            console.log("OLD DONE");
            res.json(result.rows[0]);
        } else {
            console.log("NEW");
            // Insert new notification
            const result = await pool.query(
                'INSERT INTO notifications (notification_type, message, customer_id, timestamp) VALUES ($1, $2, $3, $4) RETURNING *',
                [notification_type, message, customerId, timestamp]
            );
            res.json(result.rows[0]);
        }

        console.log("DONE SAJID NOTIFICATIONS");
    } catch (error) {
        console.error('Error storing notification:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/getNotifications', async (req, res) => {
    const { customerId } = req.query;

    try {
        // Fetch notifications for a specific customerId
        const result = await pool.query(
            'SELECT * FROM notifications WHERE customer_id = $1 ORDER BY timestamp DESC',
            [customerId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




function findShippingRate(shippingRates, origin, destination) {
    const rateObject = shippingRates.find(rate => rate.shippedFrom === origin);

    if (rateObject) {
        const destinationRate = rateObject.shippedTo.find(item => item.toDistrict === destination);
        return destinationRate ? destinationRate.rate : undefined;
    }

    return undefined;
}

module.exports = app



// Raise Ticket
// Inbox
// Select Mogadishu District
// CANCEL
// Select Language
// View Raised Ticket
// Search Ticket by ID:
// Enter Ticket ID
// Raise a New Ticket
// Recent Ticket's
// No Ticket found
// Ticket Id:
// Body ,
// Date ,
// Reply ,
// Mogadishu Districts,
// NGMP ID : ,
// Posted By,
// Message Seller,
// No Product Found...,
// Sort By,
// Filter,
// Close,
// Relevance,
// Most Recent,
// Price Low to High,
// Price High to Low,
//  Hi Welcome Back ! 👋,
// Hello again you have been missed!,
// Email address,
// Password,
// Forgot Passowrd ?,
// Or Login with,
// Register,
// Don't have an account ? ,
// Create Account,
// Discover great deals and shop with ease!,
// First Name,
// Last Name,
// Email address,
// Mobile Number,
// Confirm Password,
// I agree to the terms and conditions,
// No Product Found !,
// You don't have any item eligible for shipping,
// No Address Selected,
// Proceed to checkout,
// Loading...,
// List Price:,
// Pickup Info ,
// Items For Shipping,
// Insufficent Balance