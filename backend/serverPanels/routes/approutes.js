const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require('multer');

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
        console.error("Error fetching subcategories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = app   