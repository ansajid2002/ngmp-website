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


app.get('/getBanners', async (req, res) => {
    try {
        // Query the homebanners table and order by id in ascending order
        const banners = await pool.query('SELECT * FROM homebanner ORDER BY id ASC');

        // Remove rows where banner_url is null
        const filteredBanners = banners.rows.filter(banner => banner.banner_url !== null);

        // Return the filtered banners as JSON
        res.json(filteredBanners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ error: 'An error occurred while fetching banners.' });
    }
});


const imgBanner = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads/Banners");
    },
    filename: (req, file, callback) => {
        callback(null, `Banners-${Date.now()}-${file.originalname}`);
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
    "/uploadBanner",
    uploadBanner.single("bannerUrl"),
    async (req, res) => {
        try {
          
            const { title, link, id } = req.body;
            const updatedid = parseInt(id) + 1;
            let query = 'UPDATE homebanner SET';
            let values = [updatedid];

            if (req.file && req.file.filename) {
               
                query += ' title = $2, banner_url = $3, link = $4 WHERE id = $1 RETURNING *';
                values.push(title, req.file.filename, link);
            } else {
               
                query += ' title = $2, link = $3 WHERE id = $1 RETURNING *';
                values.push(title, link);
            }
           
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

        } catch (error) {
            console.log(error);
        }
    }
);

app.delete('/deleteBanner/:id', async (req, res) => {
    const bannerId = req.params.id;

    try {
        // Check if the banner with the specified ID exists
        const banner = await pool.query('SELECT * FROM homebanner WHERE id = $1', [bannerId]);

        if (banner.rows.length === 0) {
            return res.status(404).json({ message: 'Banner not found' });
        }

        // Update the 'banner_url' to null
        await pool.query('UPDATE homebanner SET banner_url = null WHERE id = $1', [bannerId]);

        res.status(200).json({ message: 'Banner deleted and banner_url set to null' });
    } catch (error) {
        console.error('Error deleting banner:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = app 