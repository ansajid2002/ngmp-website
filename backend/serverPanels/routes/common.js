const express = require('express');
const app = express();
const pool = require('../config')
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const cors = require('cors');
const path = require('path');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});
app.use(bodyParser.json());

app.get('/country-codes', async (req, res) => {
    try {
        const data = await fs.readFile('./JSON/code.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/country-codes', async (req, res) => {
    try {
        const newData = req.body;
        console.log(newData);
        await fs.writeFile('./JSON/code.json', JSON.stringify(newData));
        res.json({ success: true, message: 'Data updated successfully.' });
    } catch (error) {
        console.error('Error writing data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.get('/getSpecifications', async (req, res) => {
    try {
        const data = await fs.readFile('./JSON/specifications.json', 'utf-8');
        res.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/updateLabel', async (req, res) => {
    try {
        const newData = req.body;


        // Read the existing data from the JSON file
        const existingData = await fs.readFile('./JSON/specifications.json', 'utf-8');

        // Parse the JSON data
        const parsedData = JSON.parse(existingData);

        // Find the category in the data
        const categoryToUpdate = parsedData.find((item) => item.category === newData?.category);

        if (categoryToUpdate) {
            // Find the field in the category based on the fieldIndex
            const fieldToUpdate = categoryToUpdate.fields[newData.fieldIndex];

            if (fieldToUpdate) {
                // Update the label and generate a new slug (assuming label is used for slug)
                fieldToUpdate.label = newData.label;
                fieldToUpdate.name = newData.label.toLowerCase().replace(/\s+/g, '-');

                // Write the updated data back to the JSON file
                await fs.writeFile('./JSON/specifications.json', JSON.stringify(parsedData, null, 2));

                console.log('Data updated successfully:', newData);
                res.json({ success: true });
            } else {
                console.log('Field not found for the given fieldIndex:', newData.fieldIndex);
                res.status(400).json({ error: 'Field not found' });
            }
        } else {
            console.log('Category not found:', newData?.category);
            res.status(400).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/updateOptions', async (req, res) => {
    try {
        const { fieldName, newOptions } = req.body;

        // console.log(req.body);
        // return
        // Read the existing data from the JSON file
        const existingData = await fs.readFile('./JSON/specifications.json', 'utf-8');

        // Parse the JSON data
        const parsedData = JSON.parse(existingData);

        // Find the category and field by name
        const categoryIndex = parsedData.findIndex((item) => item.fields.some((field) => field.name === fieldName));

        if (categoryIndex !== -1) {
            const fieldIndex = parsedData[categoryIndex].fields.findIndex((field) => field.name === fieldName);

            if (fieldIndex !== -1) {
                // Remove empty strings from newOptions
                const sanitizedOptions = newOptions.filter(option => option.trim() !== '');

                // Update the options
                parsedData[categoryIndex].fields[fieldIndex].options = sanitizedOptions;

                // Save the updated data back to the JSON file
                await fs.writeFile('./JSON/specifications.json', JSON.stringify(parsedData, null, 2), 'utf-8');
                console.log(parsedData[categoryIndex]);

                res.status(200).json({ success: true, message: 'Options updated successfully' });
                return;
            }
        }


        res.status(404).json({ success: false, message: 'Field not found' });
    } catch (error) {
        console.error('Error updating options:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.post('/deleteCategorySpecification', async (req, res) => {
    try {
        const categoryToDelete = req.body.category;

        // Read the existing data from the JSON file
        const existingData = await fs.readFile('./JSON/specifications.json', 'utf-8');

        // Parse the JSON data
        const parsedData = JSON.parse(existingData);

        // Find the index of the category to delete
        const categoryIndex = parsedData.findIndex(item => item.category === categoryToDelete);
        console.log(categoryIndex, 'to del');
        if (categoryIndex !== -1) {
            // Remove the category from the array
            parsedData.splice(categoryIndex, 1);

            console.log(parsedData);
            // Save the updated data back to the JSON file
            await fs.writeFile('./JSON/specifications.json', JSON.stringify(parsedData, null, 2), 'utf-8');

            res.status(200).json({ success: true, message: 'Category deleted successfully' });
        } else {
            res.status(404).json({ success: false, message: 'Category not found' });
        }
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/addFieldSpecification', async (req, res) => {
    try {
        const { category, label, type, options } = req.body;
        const specificationsFilePath = './JSON/specifications.json';

        console.log(req.body);
        let specificationsData = [];
        try {
            // Check if the file exists asynchronously
            await fs.access(specificationsFilePath);
            // If it exists, read the data
            const fileContent = await fs.readFile(specificationsFilePath);
            specificationsData = JSON.parse(fileContent);
        } catch (error) {
            // If the file doesn't exist, proceed with empty data
            if (error.code !== 'ENOENT') {
                throw error; // Re-throw error if it's not "file not found"
            }
        }

        // Check if categories already exist
        const existingCategories = [];
        category.forEach(cat => {
            const existingCategory = specificationsData.find(spec => spec.category === cat);
            if (existingCategory) {
                existingCategories.push(cat);
            }
        });

        // If any existing categories found, return error response
        if (existingCategories.length > 0) {
            return res.status(200).json({ error: `Categories ${existingCategories.join(', ')} already exist.` });
        }

        // Prepare new field object
        const newField = {
            name: label.toLowerCase().replace(/\s/g, ''),
            label,
            type,
            options: options && options.split(',').map(option => option.trim())
        };

        // Create new objects for each category and append new field
        const newData = category.map(cat => ({
            category: cat,
            fields: [newField]
        }));

        // Append new data to existing specifications data
        specificationsData.push(...newData);

        // Write updated data to specifications file
        await fs.writeFile(specificationsFilePath, JSON.stringify(specificationsData, null, 2));

        res.json({ success: true });
    } catch (error) {
        console.error('Error adding field:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.post("/addFieldSpecificationinCATEGORY", async (req, res) => {
    try {
        const { category, label, type, options } = req.body;

        const specificationsFilePath = './JSON/specifications.json';

        // Read existing specifications data from JSON file
        const specificationsData = await fs.readFile(specificationsFilePath, 'utf8');
        const specifications = JSON.parse(specificationsData);

        // Find the category object
        const categoryIndex = specifications.findIndex(spec => spec.category === category);
        if (categoryIndex === -1) {
            return res.status(400).json({ error: 'Category not found' });
        }


        // Add the new field to the category object's fields array
        specifications[categoryIndex].fields.push({ name: label?.toLowerCase().replace(/\s+/g, '-'), label, type, options });

        // Write the updated specifications back to the JSON file
        await fs.writeFile(specificationsFilePath, JSON.stringify(specifications, null, 2));

        res.json({ success: true, message: 'Field added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/deleteFieldinCategory', async (req, res) => {
    try {
        const { field, fieldname, category } = req.body;

        const specificationsFilePath = './JSON/specifications.json';

        // Read the specifications.json file
        let specificationsData = [];
        try {
            specificationsData = JSON.parse(await fs.readFile(specificationsFilePath));
        } catch (error) {
            console.error('Error reading specifications file:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Find the category in specificationsData
        const categoryIndex = specificationsData.findIndex(spec => spec.category === category);
        if (categoryIndex === -1) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        // Find the field in the category's fields array
        const fieldIndex = specificationsData[categoryIndex].fields.findIndex(field => field.name === fieldname);
        if (fieldIndex === -1) {
            return res.status(404).json({ error: 'Field not found in the category.' });
        }

        // Remove the field from the category's fields array
        specificationsData[categoryIndex].fields.splice(fieldIndex, 1);

        // Update the specifications.json file
        try {
            await fs.writeFile(specificationsFilePath, JSON.stringify(specificationsData, null, 2));
        } catch (error) {
            console.error('Error writing specifications file:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Send success response
        res.json({ success: true, message: 'Field deleted successfully.' });
    } catch (error) {
        console.error('Error deleting field in category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = app 