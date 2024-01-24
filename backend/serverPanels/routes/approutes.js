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
        // console.log(sortedCategories);

        // const responseData = 

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
        console.log(response, "Res");
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
        // console.log(productCatgeories);
        res.status(200).json(productCatgeories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' })
    }
});

app.get("/getAllCategory", async (req, res) => {
    try {
        const productCatgeories = await fetchCatDataOFType()
        // console.log(productCatgeories);
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
    // console.log(catId);
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
        console.log(result, "result");

        const districtData = result.rows;
        res.status(200).json(districtData);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
})

app.post("/getmogadishudistrict", async (req, res) => {
    const { customer_id, district } = req.body;
    console.log(req.body);

    try {
        const query = "UPDATE customers SET mogadishudistrict_customer = $2 WHERE customer_id = $1 RETURNING *";
        const result = await pool.query(query, [customer_id, district]);

        // Check if the update was successful
        if (result.rows.length > 0) {
            const updatedCustomer = result.rows[0];
            console.log(updatedCustomer.mogadishudistrict_customer, "updatedCustomer");
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


app.post("/writeTranslations", async (req, res) => {
    try {
      const translations = req.body;
  
      // Assuming req.body is an object containing language as a key and translation as a value
      console.log(req.body, "body coming from panel");
  
      // Write translations to files
      await writeTranslationsToFiles(translations);
  
      res.status(200).json({ success: true, message: 'Translations have been saved.' });
    } catch (error) {
      console.error('Error writing translation files:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  
const writeTranslationsToFiles = async (translations) => {
    await Promise.all(Object.keys(translations).map(async (language) => {
      try {
        const jsonFolderPath = path.join(__dirname, '..', 'JSON');
        const fileName = `${language.toLowerCase()}.json`;
        const filePath = path.join(jsonFolderPath, fileName);
        console.log(filePath, "fp filepath");
  
        // Write to file, replacing old content
        await new Promise((resolve, reject) => {
          fs.writeFile(filePath, JSON.stringify(translations[language], null, 2), (err) => {
            if (err) reject(err);
            else {
              console.log('File written successfully:', filePath);
              resolve();
            }
          });
        });
      } catch (writeError) {
        console.error(`Error writing translation file for ${language}:`, writeError.message);
      }
    }));
  };



  ////////////////////READ TRANSLATIONS//////////////////////////
  // Function to read translation files and return Excel data
  const readTranslationsAndGenerateExcel = () => {
    const jsonFolderPath = path.join(__dirname, '..', 'JSON');
    const languages = [ 'so', 'hi', 'sw','am', 'ar', 'fr']; // Add more languages as needed
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