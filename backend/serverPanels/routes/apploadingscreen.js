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


app.get('/getApploadingscreen', async (req, res) => {
    try {
        // Query the homebanners table and order by id in ascending order
        const banners = await pool.query('SELECT * FROM apploadingscreen ORDER BY id ASC');
        // Remove rows where banner_url is null
        const filteredBanners = banners.rows.filter(banner => banner.apploading_url !== null);

        // Return the filtered banners as JSON
        res.json(filteredBanners);
    } catch (error) {
        console.error('Error fetching Apploadingscreen:', error);
        res.status(500).json({ error: 'An error occurred while Apploadingscreen banners.' });
    }
});


const imgBanner = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/Apploadingscreen");
    },
    filename: (req, file, callback) => {
        callback(null, `Apploadingscreen-${Date.now()}-${file.originalname}`);
    },
});

// img filter
const isBanner = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    } else {
        callback(new Error("Only images are allowed"));
    }
};

const uploadBanner = multer({
    storage: imgBanner,
    fileFilter: isBanner,
});


app.post(
    "/uploadApploadingscreen",
    uploadBanner.single("bannerUrl"),
    async (req, res) => {
        try {

            const { id } = req.body;
            const updatedid = parseInt(id) + 1;
            let query = 'UPDATE apploadingscreen SET';
            let values = [updatedid];

            if (req.file && req.file.filename) {
                query += ' apploading_url = $2 WHERE id = $1 RETURNING *';
                values.push(req.file.filename);
            } else {
                query += ' WHERE id = $1 RETURNING *';
            }
           ;
            pool.query(query, values, (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Database error' });
                }

                // Send the updated record as part of the response
                if (result.rows.length > 0) {
                    const updatedBanner = result.rows[0];
                    res.json({ message: 'File uploaded and database updated.', updatedBanner });
                } else {
                    res.json({ message: 'File uploaded, but the record was not found.' });
                }
            });

        } 
        catch (error) {
            console.log(error);
        }
    }
);
app.delete('/deleteApploadingscreen/:id', async (req, res) => {
    const bannerId = req.params.id;

    try {
        // Check if the banner with the specified ID exists
        const banner = await pool.query('SELECT * FROM apploadingscreen WHERE id = $1', [bannerId]);

        if (banner.rows.length === 0) {
            return res.status(404).json({ message: 'Apploadingscreen not found' });
        }

        // Update the 'banner_url' to null
        await pool.query('UPDATE apploadingscreen SET apploading_url = null WHERE id = $1', [bannerId]);

        res.status(200).json({ message: 'Apploadingscreen deleted and apploadingscreen_url set to null' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = app 