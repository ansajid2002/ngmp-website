const express = require("express");
const multer = require("multer");
const path = require("path");
const pool = require("../config");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});
// Set up multer storage and file filter
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/Claims");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "video" && file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else if (
    file.fieldname.startsWith("image") &&
    file.mimetype.startsWith("image/")
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Handle file upload endpoint
app.post(
  "/claims",
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "image", maxCount: 8 },
  ]),
  async (req, res) => {
    try {
      // Handle uploaded files
      const videoFile = req.files["video"][0];
      const imageFiles = req.files["image"];
      const additionalText = req.body.additionalText;
      const id = req.body.vendorid;
      const filenames = imageFiles.map((file) => file.filename);

      // Convert the array of filenames to a JSON string
      const jsonbData = JSON.stringify(filenames);

      // Insert data into PostgreSQL table
      const insertQuery = `
            INSERT INTO VendorClaim (vendor_id, claim_description, video_files, image_files)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;

      // Execute the query
      const result = await pool.query(insertQuery, [
        id,
        additionalText,
        videoFile.filename,
        jsonbData,
      ]);
      console.log("Database Insert Result:", result.rows[0]);

      res.json({
        data: result.rows[0],
        message: "Claims Sended to Admin Successfully",
      });
    } catch (error) {
      console.error("Error uploading and inserting files:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

app.get("/getClaimsofVendors", async (req, res) => {
  const { vendorId } = req.query;

  try {
    const result = await pool.query(
      "SELECT * FROM VendorClaim WHERE vendor_id = $1",
      [vendorId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch all claims and append vendor details from the vendors table
app.get("/getAllClaims", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT vc.*, v.vendorname, v.email, v.id, v.brand_logo, v.brand_name FROM VendorClaim vc JOIN vendors v ON vc.vendor_id = v.id"
    );
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching claims:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/updateClaimReply", async (req, res) => {
  const { claimId, replyDescription, closureText, claimStatus } = req.body;

  try {
    // Update the claim in the database
    const updateQuery = `
            UPDATE vendorclaim 
            SET reply_description = $1, 
                reply_date = NOW(), 
                closure_description = $3, 
                closure_date = CASE WHEN $3 <> '' THEN NOW() ELSE closure_date END,
                claim_status = $4 
            WHERE claim_id = $2
            RETURNING *`;

    const updateResult = await pool.query(updateQuery, [
      replyDescription,
      claimId,
      closureText,
      claimStatus,
    ]);

    // Return the updated reply date
    const updatedReplyDate = updateResult.rows[0].reply_date;
    res.json({
      success: true,
      message: "Reply updated successfully",
      reply_date: updatedReplyDate,
    });
  } catch (error) {
    console.error("Error updating claim reply:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = app;
