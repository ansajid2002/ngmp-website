// vendor.js
const express = require("express");
const app = express();
const pool = require("../config"); // Assuming you have a database connection configuration file
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const slug = require("slug");

// const fs = require("fs/promises");
const fs = require("fs");

const sendEmail = require("./nodemailer");
// const fs = require("fs/promises"); // For reading the HTML template

app.use(express.json());
app.use(cors());

// Assuming you have a connection pool to your database
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

const generateRandomNumber = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
  let result = "";

  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};
const generateUniqueID = () => {
  const randomPart = Math.floor(Math.random() * 10000).toString(); // Generate a random 4-digit number
  const timestampPart = new Date().getTime().toString().substr(-6, 2); // Use last 2 digits of the current timestamp
  const uniqueID = `${randomPart}${timestampPart}`; // Combine the parts
  return uniqueID;
};

app.post("/vendorLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use the connection pool to check if the email exists in the database
    const loggedId = generateRandomNumber(); // Generate a 28-character random string
    const result = await req.pool.query(
      "SELECT * FROM vendors WHERE email = $1",
      [email]
    );
    if (result.rows.length > 0) {
      const vendorLogin = result.rows[0];
      const hashedPassword = vendorLogin.password; // Assuming the hashed password is stored in the 'password' field

      if (vendorLogin.status === 4) {
        // Vendor's status is Rejected, prevent login
        res.status(400).send({
          status: 300,
          message: "Login not allowed. Your account has been rejected.",
        });
        return;
      }

      // Compare the hashed password with the input password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Passwords match, generate random string
        // Update the 'loggedId' column with the generated random string
        await req.pool.query(
          'UPDATE vendors SET "useridvendor" = $1 WHERE email = $2',
          [loggedId, email]
        );

        // Return the updated vendors data
        res
          .status(200)
          .send({ status: 200, data: { ...vendorLogin, loggedId } });
      } else {
        // Passwords do not match
        res.status(400).send({ status: 400, message: "Invalid Password..." });
      }
    } else {
      res.status(400).send({ status: 400, message: "Email does not exist." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.post("/resetVendorPassword", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Update the reset_otp column in the vendors table
    const updateResult = await pool.query(
      "UPDATE vendors SET reset_otp = $1 WHERE email = $2",
      [otp, email]
    );

    if (updateResult.rowCount > 0) {
      // Send the OTP to the user's email (you'll need to implement this part)
      // You can use a library like Nodemailer to send the email
      await sendEmail(email, "Reset Code", `Your Reset Code OTP: ${otp}`);

      // For demonstration purposes, we'll just log the OTP
      console.log(`OTP sent to ${email}: ${otp}`);

      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res.status(400).json({ message: "Email Not Found" });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/updateVendor", async (req, res) => {
  const { id, ...data } = req.body;

  try {
    const client = await pool.connect();

    const query = `
      UPDATE vendors
      SET
        vendorname = $1,
        email = $2,
        country_code = $3,
        mobile_number = $4,
        bank_name = $5,
        bank_account_name = $6,
        bank_account_number = $7,
        bank_branch = $8,
        bank_swift_code = $9,
        business_model = $10,
        business_type = $11,
        business_website = $12,
        business_email = $13,
        business_phone = $14,
        business_description = $15,
        company_name = $16,
        shipping_address = $17,
        company_city = $18,
        company_state = $19,
        company_zip_code = $20,
        company_country = $21,
        facebook_url = $22,
        instagram_url = $23,
        linkedin_url = $24,
        twitter_url = $25,
        support_contact_1 = $26,
        support_contact_2 = $27,
        tax_id_number = $28
      WHERE id = $29
      RETURNING *;
    `;

    const params = [
      data.vendorname,
      data.email,
      data.country_code,
      data.mobile_number,
      data.bank_name,
      data.bank_account_name,
      data.bank_account_number,
      data.bank_branch,
      data.bank_swift_code,
      data.business_model,
      data.business_type,
      data.business_website,
      data.business_email,
      data.business_phone,
      data.business_description,
      data.company_name,
      data.shipping_address,
      data.company_city,
      data.company_state,
      data.company_zip_code,
      data.company_country,
      data.facebook_url,
      data.instagram_url,
      data.linkedin_url,
      data.twitter_url,
      data.support_contact_1,
      data.support_contact_2,
      data.tax_id_number,
      id,
    ];

    const result = await client.query(query, params);
    client.release();
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error updating vendor:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/updateForgotPassword", async (req, res) => {
  try {
    const { otp, newPassword, email } = req.body;
    // Fetch the reset_otp from the database for the given email
    const queryResult = await pool.query(
      "SELECT reset_otp FROM vendors WHERE email = $1",
      [email]
    );

    if (queryResult.rows.length === 0) {
      // No user found with the provided email
      return res.status(404).json({ message: "User not found" });
    }

    const dbResetOTP = queryResult.rows[0].reset_otp;

    // // Compare the provided OTP with the OTP from the database
    const otpMatch = parseInt(otp) === parseInt(dbResetOTP);

    if (!otpMatch) {
      // Provided OTP doesn't match the one in the database
      return res.status(401).json({ message: "Invalid OTP" });
    }

    // // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // // Update the password in the database for the user with the provided email
    const updateResult = await pool.query(
      "UPDATE vendors SET password = $1 WHERE email = $2",
      [hashedPassword, email]
    );

    if (updateResult.rowCount > 0) {
      // Password updated successfully
      return res.status(200).json({ message: "Password updated successfully" });
    } else {
      // Failed to update the password
      return res.status(500).json({ message: "Failed to update the password" });
    }
  } catch (error) {
    console.error("An error occurred while updating the password", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const generateRandom4DigitOTP = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

app.get("/getVendorAccountotp", async (req, res) => {
  try {
    const { type, id } = req.query;

    // Step 1: Generate a 4-digit OTP
    const otp = generateRandom4DigitOTP();

    // Step 2: Update the corresponding column in the vendors table
    const updateColumn = type === "email" ? "email_otp" : "mobile_otp";
    const updateQuery = `UPDATE vendors SET ${updateColumn} = $1 WHERE id = $2`;
    await pool.query(updateQuery, [otp, id]);

    // Step 3: Send an email to the vendor
    const vendorDataQuery =
      "SELECT vendorname, email FROM vendors WHERE id = $1";
    const vendorDataResult = await pool.query(vendorDataQuery, [id]);
    const { vendorname, email } = vendorDataResult.rows[0];

    const subject = "Account Verification - Nile Market-place";
    const body = `
      <p>Hello ${vendorname},</p>
      <p>Thank you for creating an account with Nile Market-place. To complete your registration, please use the following verification code:</p>
      <p><strong>Verification Code:</strong> ${otp}</p>
      <p>Please enter this code on the website to verify your email or mobile number.</p>
      <p>If you did not sign up for an account with Nile Market-place, please ignore this email.</p>
      <p>Best regards,<br>Nile Market-place</p>
    `;

    await sendEmail(email, subject, body);

    res
      .status(200)
      .json({ message: "OTP generated and email sent successfully" });
  } catch (error) {
    console.error("Error generating OTP and sending email:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/verify-otp", async (req, res) => {
  const { otp, id, verificationType } = req.body;
  try {
    let query;
    let updateQuery;

    if (verificationType === "email") {
      query = {
        text: "SELECT * FROM vendors WHERE email_otp = $1 AND id = $2",
        values: [otp, id],
      };

      updateQuery = {
        text: "UPDATE vendors SET email_verification_status = $1 WHERE email_otp = $2 AND id = $3",
        values: [true, otp, id],
      };
    } else if (verificationType === "mobile") {
      query = {
        text: "SELECT * FROM vendors WHERE mobile_otp = $1 AND id = $2",
        values: [otp, id],
      };

      updateQuery = {
        text: "UPDATE vendors SET mobile_verification_status = $1 WHERE mobile_otp = $2 AND id = $3",
        values: [true, otp, id],
      };
    } else {
      return res.status(400).json({ error: "Invalid verification type" });
    }

    const result = await pool.query(query);

    if (result.rowCount > 0) {
      // Mark the OTP as used or clear it, depending on your logic
      // For example:
      // await pool.query('UPDATE vendors SET email_otp = NULL WHERE email_otp = $1', [otp]);

      // Update verification status
      await pool.query(updateQuery);

      res.json({ isValid: true });
    } else {
      res.json({ isValid: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/getVendorData", async (req, res) => {
  try {
    const loggedId = req.body.loggedId; // Assuming the loggedId value is sent in the request body
    const query = 'SELECT * FROM vendors WHERE "useridvendor" = $1';
    const values = [loggedId];

    const { rows } = await pool.query(query, values);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getSubcategoryofProductExists", async (req, res) => {
  try {
    const { id } = req.query;

    // Validate id (replace it with your validation logic)
    if (!id) {
      return res.status(400).json({ error: "Invalid vendor_id" });
    }

    // Query to get distinct subcategories and their product counts for a specific vendor
    const query = `
      SELECT
      subcategory,
      slug_subcat AS slug_subcat,
        COUNT(*) AS total_products
      FROM
        products
      WHERE
        vendorid = $1
      GROUP BY
      slug_subcat, subcategory
    `;

    const result = await pool.query(query, [id]);

    // Extract the subcategories and their counts from the query result
    const subcategoriesWithCounts = result.rows;

    res.status(200).json(subcategoriesWithCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/allVendorProducts", async (req, res) => {
  try {
    const { id, page = 1, pageSize = 10 } = req.body;
    const subcatNameBackend = req.body.subcatNameBackend;

    let query;
    let values;

    const offset = (page - 1) * pageSize;

    if (subcatNameBackend === "all") {
      // Query to fetch products for the given vendor without subcategory filter
      query = "SELECT * FROM products WHERE vendorid = $1 LIMIT $2 OFFSET $3";
      values = [id, pageSize, offset];
    } else {
      // Query to fetch products for the given vendor and specific subcategory
      query = "SELECT * FROM products WHERE vendorid = $1 AND slug_subcat = $2 LIMIT $3 OFFSET $4";
      values = [id, subcatNameBackend, pageSize, offset];
    }


    // Query to get the total count of products
    const totalCountQuery = "SELECT COUNT(*) FROM products WHERE vendorid = $1";
    const totalCountValues = [id];
    const totalCountResult = await pool.query(totalCountQuery, totalCountValues);
    const totalProducts = totalCountResult.rows[0].count;

    const result = await pool.query(query, values);

    const products = result.rows;
    res.status(200).json({ products, total: totalProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/deleteSellerAdmin", async (req, res) => {
  try {
    const { selectedKey } = req.body;
    // Execute the delete query
    const query = "DELETE FROM superadmin WHERE id = $1";
    await pool.query(query, [selectedKey]);

    // Send a successful response
    res
      .status(200)
      .json({ status: 200, message: "Item deleted successfully." });
  } catch (error) {
    // Handle errors
    console.error("Error while deleting data:", error);
    res.status(500).json({ status: 500, error: "Failed to delete the item." });
  }
});

const checkSkuidExists = async (sku) => {
  const query = `SELECT * FROM variantproducts WHERE variant_skuid = $1`;
  const values = [sku];
  const result = await pool.query(query, values);
  return result.rows.length > 0; // Match found if rows exist
};

app.post("/addVendorProduct", async (req, res) => {
  try {
    const { subcategory, category, locationData, ...productData } = req.body[0];
    const uniquepid = generateUniqueID();
    const replaceSubcategory = subcategory.trim();
    const replacecategory = category.trim();
    const prodSlug = slug(productData?.ad_title);
    const replacecategorySlug = category
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");

    const replacesubcategorySlug = subcategory
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");

    if (!replaceSubcategory) {
      return res.status(400).json({ error: "Invalid subcategory" });
    }

    // Check if the skuid already exists in the products table
    const skuidExistsQuery = "SELECT id FROM products WHERE skuid = $1";
    const skuidExistsValues = [productData.skuid];
    const skuidExistsResult = await pool.query(
      skuidExistsQuery,
      skuidExistsValues
    );

    if (skuidExistsResult.rows.length > 0) {
      // SKU already exists in the products table, return an error
      return res.status(400).json({ error: "SKU already exists in products" });
    }

    // Insert the product into the products table
    const productInsertQuery = `
      INSERT INTO products (ad_title, city, state, country, currency_symbol, category, subcategory, vendorid,
      uniquepid, skuid, mrp, sellingprice, countryoforigin, manufacturername, packerdetails,
      additionaldescription, searchkeywords, keyfeatures, videourl, status, images, category_type,
      isvariant, quantity, postalcode, salespackage, brand, condition, slug_cat, slug_subcat, updated_at_product, prod_slug)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, NOW(), $31)
      RETURNING *;
    `;

    const productInsertValues = [
      productData.ad_title,
      locationData?.city,
      locationData.state,
      locationData.country,
      productData.selectedCurrency,
      replacecategory,
      replaceSubcategory,
      productData.vendorId,
      uniquepid,
      productData.skuid,
      productData.mrp,
      productData.sellingprice,
      productData.countryoforigin,
      productData.manufacturername,
      productData.packerdetails,
      productData.additionaldescription,
      productData.searchkeywords,
      productData.keyfeatures,
      productData.videourl,
      productData.status,
      productData.images,
      productData.selectedCategoryType,
      productData.ProductVariantType,
      productData.quantity,
      locationData.postcode,
      productData.salespackage,
      productData.brand,
      productData.condition,
      replacecategorySlug,
      replacesubcategorySlug,
      prodSlug,
    ];

    const productInsertResult = await pool.query(
      productInsertQuery,
      productInsertValues
    );

    if (productData.FilteredVariantData.length > 0) {
      // Insert variants into another table if FilteredVariantData is not empty
      for (const variant of productData.FilteredVariantData) {
        // Check if the SKU exists in the variants table
        const isMatch = await checkSkuidExists(variant.sku);

        if (isMatch) {
          // SKU already exists in the variants table, return an error
          return res
            .status(400)
            .json({ error: "SKU already exists in variants" });
        } else {
          // Insert a new record into the variants table
          const variantInsertQuery = `
            INSERT INTO variantproducts (label, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, vendori_id,variant_category, variant_subcategory)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
          `;

          const variantInsertValues = [
            variant.label,
            uniquepid,
            variant.price,
            variant.sellingPrice,
            variant.sku,
            variant.quantity,
            variant.variantsValue,
            productData.vendorId,
            replacecategorySlug,
            replacesubcategorySlug,
          ];

          await pool.query(variantInsertQuery, variantInsertValues);
        }
      }
    }

    res.status(200).json({
      status: 200,
      message: "Product uploaded successfully",
      data: subcategory, // Newly inserted product data
      resp: productInsertResult.rows[0],
    });
  } catch (error) {
    console.error("Error uploading product:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

app.post("/updateVendorProduct", async (req, res) => {
  try {
    const { subcategory, ...productData } = req.body[0]; // Exclude category, isvariant, skuid, countryoforigin
    const replaceSubcategory = subcategory
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");
    const { ProductVariantType, SelectedUniqueId, FilteredVariantData } =
      productData;
    const prodSlug = slug(productData?.ad_title);

    // Update the product in the 'products' table
    const updateProductQuery = `
                            UPDATE products
                            SET
                              ad_title = $1,
                              sellingprice = $2,
                              manufacturername = $3,
                              packerdetails = $4,
                              additionaldescription = $5,
                              searchkeywords = $6,
                              keyfeatures = $7,
                              videourl = $8,
                              quantity = $9,
                              postalcode = $10,
                              salespackage = $11,
                              brand = $12,
                              condition = $13,
                              updated_at_product = NOW(),
                              status = 0,
                              prod_slug = $15
                            WHERE uniquepid = $14
                            RETURNING *;
                            `;

    const updateValues = [
      productData.ad_title,
      productData.sellingprice,
      productData.manufacturername,
      productData.packerdetails,
      productData.additionaldescription,
      productData.searchkeywords,
      productData.keyfeatures,
      productData.videourl,
      productData.quantity,
      productData.postalcode,
      productData.salespackage,
      productData.brand,
      productData.condition,
      SelectedUniqueId,
      prodSlug,
    ];

    // Execute the 'products' table update query
    await pool.query(updateProductQuery, updateValues);

    // Update the 'cart' table for Simple product type
    if (ProductVariantType === "Simple") {
      const updateCartPrice = `
        UPDATE cart
        SET
          mrp = $1,
          sellingprice = $2
        WHERE product_uniqueid = $3
        RETURNING *;
      `;

      const updateCartValue = [
        productData.mrp,
        productData.sellingprice,
        SelectedUniqueId,
      ];

      // Execute the 'cart' table update query for Simple product type
      await pool.query(updateCartPrice, updateCartValue);
    }

    const checkSkuidSelectedUniqueId = async (sku) => {
      const query = "SELECT * FROM variantproducts WHERE variant_skuid = $1";
      const values = [sku];
      const result = await pool.query(query, values);
      return result.rows.length > 0; // Match found if rows exist
    };

    // Update or insert variants in 'variantproducts' table
    for (const variant of FilteredVariantData) {
      console.log(variant);
      // Check if a match exists in 'variantproducts'
      const isMatch = await checkSkuidSelectedUniqueId(
        variant.sku,
        SelectedUniqueId
      );

      if (isMatch) {
        // Update the existing record in 'variantproducts'
        const updateQuery = `
          UPDATE variantproducts
          SET
            variant_mrp = $1,
            variant_sellingprice = $2,
            variant_quantity = $3,
            variantsvalues = $4,
            label = $7
          WHERE product_uniqueid = $5 AND variant_skuid = $6
          RETURNING *;
        `;

        const updateValues = [
          variant.price,
          variant.sellingPrice,
          variant.quantity,
          variant.variantsValue,
          SelectedUniqueId,
          variant.sku,
          variant.label,
        ];

        // Execute the 'variantproducts' table update query
        await pool.query(updateQuery, updateValues);

        // Update the 'cart' table for this variant
        const updateCartPrice = `
          UPDATE cart
          SET
            mrp = $1,
            sellingprice = $2
          WHERE product_uniqueid = $3 AND variantlabel = $4
          RETURNING *;
        `;

        const updateCartValue = [
          variant.price,
          variant.sellingprice,
          SelectedUniqueId,
          variant.label,
        ];

        // Execute the 'cart' table update query for this variant
        await pool.query(updateCartPrice, updateCartValue);
      } else {
        // Insert a new record in 'variantproducts'
        const insertQuery = `
          INSERT INTO variantproducts (label, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, vendori_id, variant_category, variant_subcategory)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
          RETURNING *;
        `;

        const insertValues = [
          variant.label,
          SelectedUniqueId,
          variant.price,
          variant.sellingprice,
          variant.sku,
          variant.quantity,
          variant.variantsValue,
          productData.vendorId,
          replaceSubcategory,
          subcategory,
        ];

        // Execute the 'variantproducts' table insert query
        await pool.query(insertQuery, insertValues);
      }
    }

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
      data: productData, // Updated product data
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

app.post("/updateProductSpecifications", async (req, res) => {
  try {
    const { values, selectedKey } = req.body;

    // Convert the object to a JSON string
    const attributesJson = JSON.stringify(values);

    // Update the database with the JSON string
    const updateQuery = `
      UPDATE products
      SET attributes_specification = $1
      WHERE id = $2;
    `;

    await pool.query(updateQuery, [attributesJson, selectedKey]);

    res
      .status(200)
      .json({ success: true, message: "Product specifications updated" });
  } catch (error) {
    console.error("Error updating product specifications:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

app.post("/DeleteVendorProduct", async (req, res) => {
  try {
    const { key } = req.body;
    // Delete the product with the given id and subcatNameBackend
    let query;
    query = `
            DELETE FROM products
            WHERE id = $1;
        `;

    const values = [key];

    await pool.query(query, values);

    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

// Bulk Product Deleted
app.post("/deleteProducts", async (req, res) => {
  const { productIds } = req.body;
  try {
    // Fetch image filenames from the database
    const imageQuery = `SELECT images FROM products WHERE id IN (${productIds.join(
      ", "
    )})`;
    const imageResult = await pool.query(imageQuery);
    const imageFilenames = imageResult.rows.map((row) => row.images);

    // Construct the SQL query to delete selected products
    const query = `DELETE FROM products WHERE id IN (${productIds.join(", ")})`;

    // Execute the query
    await pool.query(query);

    // Unlink images from folder
    imageFilenames.length > 0 &&
      imageFilenames.forEach((filenamesArray) => {
        filenamesArray.forEach((filename) => {
          const imagePath = path.join(
            __dirname,
            "..",
            "uploads",
            "UploadedProductsFromVendors",
            filename
          );
          fs.unlinkSync(imagePath); // Unlink the image file
        });
      });

    res.status(200).json({ message: "Selected products deleted successfully" });
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).json({ error: "Error deleting products" });
  }
});

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/UploadedProductsFromVendors/"); // Destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now(); // Get the current timestamp
    const extension = path.extname(file.originalname); // Get the file extension
    const filename = `${timestamp}-${file.originalname}`; // Create the new filename with timestamp
    cb(null, filename);
  },
});

const upload = multer({ storage });

app.post(
  "/uploadVendorProduct",
  upload.array("files", 10),
  async (req, res) => {
    try {
      let id = req.body.id; // id could be ['15', '15'] or '15'

      if (Array.isArray(id)) {
        // Handle the case where id is an array
        const uniqueValues = Array.from(new Set(id));
        // Concatenate the unique values into a single string
        const concatenatedString = uniqueValues?.[0];
        // Convert the concatenated string to an integer
        id = parseInt(concatenatedString);
      }

      const newImages = req.files.map((file) => `${file.filename}`);

      let existingImages = [];

      // Define a common function for updating images
      const query = `
      SELECT images
      FROM products
      WHERE id = $1;
    `;

      const result = await pool.query(query, [id]);

      if (result.rows[0]) {
        existingImages = result.rows[0].images || [];
      }

      existingImages = [...existingImages, ...newImages];

      const updateQuery = `
      UPDATE products
      SET images = $1
      WHERE id = $2;
    `;

      const updateValues = [
        existingImages, // Convert images array to a PostgreSQL array representation
        id,
      ];

      await pool.query(updateQuery, updateValues);

      // Send response with updated images
      res.status(200).json({
        status: 200,
        message: "Product images updated successfully",
        updatedImages: existingImages,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        status: 500,
        message: "Internal server error",
      });
    }
  }
);

app.post("/removeImage", async (req, res) => {
  try {
    const { productId, imageIndex } = req.body;
    const query = `
        SELECT images
        FROM products
        WHERE id = $1;
      `;

    const result = await pool.query(query, [productId]);

    if (result.rows.length > 0) {
      const images = result.rows[0]["images"];
      const removedImage = images.splice(imageIndex, 1)[0]; // Remove and get the image at the specified index

      console.log("Removed Image:", removedImage); // Debugging

      const updateQuery = `
          UPDATE products
          SET images = $1
          WHERE id = $2;
        `;

      await pool.query(updateQuery, [images, productId]);

      // Unlink the image file from the folder
      const imagePath = path.join(
        __dirname,
        "..",
        "uploads",
        "UploadedProductsFromVendors",
        removedImage
      );

      console.log("Image Path:", imagePath); // Debugging

      fs.unlinkSync(imagePath);

      // Send response with updated images
      res.status(200).json({
        status: 200,
        message: "Image removed successfully",
        updatedImages: images,
      });
    } else {
      res.status(400).json({
        status: 400,
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error removing image:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  }
});

// Fetch rejected products from a specific category
const fetchRejectedVendors = async (page, pageSize) => {
  try {
    const offset = (page - 1) * pageSize;

    // Fetch total count of distinct vendors from the products table
    const totalVendorsQuery = `
      SELECT COUNT(DISTINCT vendorid) AS totalVendors
      FROM products;
    `;

    const totalVendorsResult = await pool.query(totalVendorsQuery);
    const totalVendors = totalVendorsResult.rows[0];

    // Fetch rejected vendors along with product details
    const query = `
      WITH VendorsWithRowNumber AS (
        SELECT
          v.*,
          ROW_NUMBER() OVER (ORDER BY v.id) AS vendor_row_number
        FROM
          vendors AS v
      )
      SELECT DISTINCT ON (v.id)
        v.*,
        p.*,
        p.status AS productstatus,
        ROW_NUMBER() OVER (PARTITION BY p.vendorid ORDER BY p.id) AS product_row_number
      FROM
        VendorsWithRowNumber v
        LEFT JOIN products p ON v.id = p.vendorid
      ORDER BY v.id, p.id
      OFFSET $1
      LIMIT $2;
    `;

    const result = await pool.query(query, [offset, pageSize]);
    const rejectedVendors = result.rows;

    return {
      totalVendors,
      rejectedVendors,
    };
  } catch (error) {
    throw error;
  }
};

// Fetch rejected vendors for all categories
app.get("/rejected-products", async (req, res) => {
  try {
    const { vendorPage, vendorPageSize } = req.query
    const { totalVendors, rejectedVendors } = await fetchRejectedVendors(vendorPage, vendorPageSize);

    const modifiedRejectedVendors = rejectedVendors.map((vendor) => ({
      ...vendor,
      key: vendor.id,
    }));

    res.json({ ...totalVendors, rejectedVendors: modifiedRejectedVendors });
  } catch (error) {
    console.error("Error fetching rejected vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/getVendorProductsAR', async (req, res) => {
  try {
    const { vendorid, page = 1, pageSize = 10 } = req.query;

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    // First, get the total count of products for the vendor
    const countQuery = "SELECT COUNT(*) FROM products WHERE vendorid = $1";
    const countValues = [vendorid];
    const countResult = await pool.query(countQuery, countValues);
    const totalProducts = countResult.rows[0].count;

    // Now, fetch the paginated products along with vendor information (excluding password)
    const productsQuery = `
      SELECT p.*
      FROM products p
      WHERE p.vendorid = $1
      OFFSET $2
      LIMIT $3;
    `;

    const vendorQuery = `
      SELECT *
      FROM vendors v
      WHERE v.id = $1;
    `;

    const productsValues = [vendorid, offset, limit];
    const vendorValues = [vendorid];

    const productsResult = await pool.query(productsQuery, productsValues);
    const vendorResult = await pool.query(vendorQuery, vendorValues);

    const products = productsResult.rows;
    const vendor = vendorResult.rows;
    for (let index = 0; index < vendor.length; index++) {
      delete vendor[index].password
    }
    res.json({ totalProducts, vendor: vendor?.[0] || [], products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




app.post("/reject-product-reason", async (req, res) => {
  try {
    const { productIds, rejectReason } = req.body;
    console.log(productIds);
    // Ensure productIds is an array
    if (!Array.isArray(productIds)) {
      return res.status(400).json({ error: "Invalid productIds format" });
    }

    // Construct the SQL query to update records
    const updateQuery = `
      UPDATE products
      SET rejection_reason = $1, status = 2, updated_at_product = NOW()
      WHERE uniquepid = ANY($2::int[])
    `;

    const updateValues = [rejectReason, productIds];

    // Execute the update query
    await pool.query(updateQuery, updateValues);

    res.status(200).json({ message: "Products rejected successfully" });
  } catch (error) {
    console.error("Error rejecting products:", error);
    res.status(500).json({ error: "Failed to reject the products" });
  }
});

app.post("/approve-product", async (req, res) => {
  try {
    const { productId } = req.body;
    let updateQuery = "";
    let updateValues = [];
    let idName = "";

    updateQuery = `
                UPDATE products
                SET status = 1, updated_at_product = NOW()
                WHERE uniquepid = $1
            `;
    updateValues = [productId.uniquepid];

    if (updateQuery) {
      await pool.query(updateQuery, updateValues);
      res
        .status(200)
        .json({ idName, message: "Product Approved successfully" });
    } else {
      res.status(400).json({ error: "Invalid subcategory" });
    }
  } catch (error) {
    console.error("Error rejecting product:", error);
    res.status(500).json({ error: "Failed to reject the product" });
  }
});

async function fetchVendorInfo(pool, vendorId) {
  const vendorInfo = await pool.query(
    "SELECT id, vendorname, brand_logo, brand_name, registration_date, country_code, mobile_number, vendor_profile_picture_url, followers, following  FROM vendors WHERE id = $1",
    [vendorId]
  );
  return vendorInfo.rows[0];
}

async function fetchProductsFromTable(
  pool,
  vendorId,
  subcat,
  type,
  cid,
  status,
  pageNumber,
  pageSize
) {
  let query = "SELECT * FROM products";
  let values = [];
  let conditions = [];

  if (vendorId) {
    conditions.push("vendorid = $1");
    values.push(vendorId);
  }

  if (subcat) {
    conditions.push("slug_subcat = $" + (values.length + 1));
    values.push(subcat);
  }

  if (status) {
    conditions.push("status = $" + (values.length + 1));
    values.push(status);
  }

  if (pageNumber && pageSize) {
    conditions.push(
      "ORDER BY id OFFSET $" +
      (values.length + 1 || 0) +
      " LIMIT $" +
      (values.length + 2)
    );
    values.push((pageNumber - 1) * parseInt(pageSize)); // Calculate the offset based on pageNumber and parseInt(pageSize)
    values.push(parseInt(pageSize));
  }

  console.log((pageNumber - 1) * parseInt(pageSize));
  // If conditions exist, add WHERE clause to the query
  // if (conditions.length > 0) {
  //   query += ' WHERE ' + conditions.join(' AND ')
  // } else {
  //   if (!pageNumber && !parseInt(pageSize)) {
  //     query += ' WHERE ' + conditions.join(' AND ');
  //   } else {
  //     query += ' WHERE ' + conditions.join('  ')
  //   }
  // }

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND   ");
  }

  const lastAndIndex = query.lastIndexOf(" AND ");
  if (lastAndIndex !== -1) {
    query =
      query.substring(0, lastAndIndex) + query.substring(lastAndIndex + 5);
  }
  console.log(query, values);

  if (type && type === "recommended" && cid) {
    // Fetch customer_interest array from the customers table based on cid
    const customerInterestQuery =
      "SELECT customer_interest FROM customers WHERE customer_id = $1";
    const customerInterestValues = [cid];
    const customerInterestResult = await pool.query(
      customerInterestQuery,
      customerInterestValues
    );

    if (customerInterestResult.rows.length > 0) {
      const categoryIds = customerInterestResult.rows[0].customer_interest;

      // Fetch category names from the categories table based on category IDs
      const categoryNamesQuery =
        "SELECT category_name FROM categories WHERE category_id = ANY($1::int[])";
      const categoryNamesValues = [categoryIds];
      const categoryNamesResult = await pool.query(
        categoryNamesQuery,
        categoryNamesValues
      );

      if (categoryNamesResult.rows.length > 0) {
        const categoryNames = categoryNamesResult.rows.map(
          (row) => row.category_name
        );

        // Add condition to filter products based on category names
        if (
          subcat !== undefined &&
          vendorId !== undefined &&
          status !== undefined
        ) {
          query +=
            " AND category = ANY($" +
            (values.length + 1) +
            "::text[]) LIMIT 10";
        } else {
          query +=
            " WHERE category = ANY($" +
            (values.length + 1) +
            "::text[]) LIMIT 10";
        }

        values.push(categoryNames);
      }
    }
  }

  if (type && type === "newarrivals" && cid) {
    // Fetch customer_interest array from the customers table based on cid
    const customerInterestQuery =
      "SELECT customer_interest FROM customers WHERE customer_id = $1";
    const customerInterestValues = [cid];
    const customerInterestResult = await pool.query(
      customerInterestQuery,
      customerInterestValues
    );

    if (customerInterestResult.rows.length > 0) {
      const categoryIds = customerInterestResult.rows[0].customer_interest;

      // Fetch category names from the categories table based on category IDs
      const categoryNamesQuery =
        "SELECT category_name FROM categories WHERE category_id = ANY($1::int[])";
      const categoryNamesValues = [categoryIds];
      const categoryNamesResult = await pool.query(
        categoryNamesQuery,
        categoryNamesValues
      );

      if (categoryNamesResult.rows.length > 0) {
        const categoryNames = categoryNamesResult.rows.map(
          (row) => row.category_name
        );

        // Add condition to filter products based on category names
        if (
          subcat !== undefined &&
          vendorId !== undefined &&
          status !== undefined
        ) {
          query +=
            " AND category = ANY($" +
            (values.length + 1) +
            "::text[]) ORDER BY updated_at_product ASC  LIMIT 10";
        } else {
          query +=
            " WHERE category = ANY($" +
            (values.length + 1) +
            "::text[]) ORDER BY updated_at_product ASC  LIMIT 10";
        }
        values.push(categoryNames);
      }
    }
  }

  try {
    const result = await pool.query(query, values);

    return result.rows;
  } catch (error) {
    console.error("Error fetching products from table:", error);
    return [];
  }
}

async function fetchVariantData(pool, product_uniqueid) {
  try {
    // Replace this with the actual SQL query to fetch variant data based on product_uniqueid
    const query = "SELECT * FROM variantproducts WHERE product_uniqueid = $1";
    const values = [product_uniqueid];

    const result = await pool.query(query, values);

    // Return the result.rows as variant data
    return result.rows;
  } catch (error) {
    console.error("Error fetching variant data:", error);
    return [];
  }
}

async function getConversionRatesUSD(req, res) {
  try {
    // Query the database to fetch data from the currency_values table
    const query = "SELECT * FROM currency_values";
    const { rows } = await pool.query(query);

    // Send the fetched data as a JSON response
    return rows;
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function AllProductsVendors(
  pool,
  vendorId = null,
  currency = null,
  subcat = null,
  type = null,
  customerId = null,
  status,
  pageNumber,
  pageSize
) {
  try {
    // Fetch conversion rates
    const conversionRatesData = await getConversionRatesUSD();
    const conversionRates = {};

    for (const key in conversionRatesData[0]) {
      conversionRates[key] = parseFloat(conversionRatesData[0][key]);
    }

    const AllProducts = [];

    const products = await fetchProductsFromTable(
      pool,
      vendorId,
      subcat,
      type,
      customerId,
      status,
      pageNumber,
      pageSize
    );

    for (const product of products) {
      if (product.isvariant === "Variant") {
        const variantData = await fetchVariantData(pool, product.uniquepid);
        if (variantData && variantData.length > 0) {
          // Update the product's mrp and sellingprice using the first entry in variantData
          product.mrp = variantData[0].variant_mrp;
          product.sellingprice = variantData[0].variant_sellingprice;
          product.label = variantData[0].label; // Replace with the desired label

          if (product.currency_symbol !== currency) {
            // Convert mrp and sellingprice to floats
            const mrpAsFloat = parseFloat(variantData[0].variant_mrp);
            const sellingPriceAsFloat = parseFloat(
              variantData[0].variant_sellingprice
            );

            const exchangedSellingPrice =
              (sellingPriceAsFloat /
                conversionRates[product.currency_symbol?.toLowerCase()]) *
              conversionRates[currency?.toLowerCase()] || sellingPriceAsFloat;
            const exchangedMrp =
              (mrpAsFloat /
                conversionRates[product.currency_symbol?.toLowerCase()]) *
              conversionRates[currency?.toLowerCase()] || mrpAsFloat;

            if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
              // Calculate the exchanged mrp and sellingprice based on the conversion rate
              product.sellingprice = exchangedSellingPrice.toFixed(2);
              product.mrp = exchangedMrp.toFixed(2);
              product.currency_symbol = currency; // Update the currency symbol
            }
          }
        }
      }

      if (product.vendorid) {
        const vendorInfo = await fetchVendorInfo(pool, product.vendorid);
        product.vendorInfo = vendorInfo;
      }

      // Check if the product's currency_symbol is not equal to the desired currency
      // Convert the selling price to a float
      const sellingPriceAsFloat = parseFloat(product.sellingprice);
      const mrpAsFloat = parseFloat(product.mrp);

      const exchangedSellingPrice =
        (sellingPriceAsFloat /
          conversionRates[product.currency_symbol?.toLowerCase()]) *
        conversionRates[currency?.toLowerCase()] || sellingPriceAsFloat;
      const exchangedMrp =
        (mrpAsFloat / conversionRates[product.currency_symbol?.toLowerCase()]) *
        conversionRates[currency?.toLowerCase()] || mrpAsFloat;

      if (!isNaN(sellingPriceAsFloat)) {
        // Round to two decimal places
        product.sellingprice = exchangedSellingPrice.toFixed(2);
        product.mrp = exchangedMrp.toFixed(2);
        product.currency_symbol = currency; // Update the currency symbol
      }

      AllProducts.push(product);
    }

    return AllProducts;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
app.post("/vendorProfile", async (req, res) => {
  try {
    // Destructure 'vendorid' from the request body
    const { vendorid } = req.body;

    // Define a PostgreSQL query to select specific vendor information
    const query = "SELECT * FROM vendors WHERE id = $1";

    // Set the values to be used in the PostgreSQL query
    const values = [vendorid];

    // Execute the query using the PostgreSQL connection pool
    const result = await pool.query(query, values);
    const vendorData = result.rows[0]
    delete vendorData.password

    // Send the retrieved vendor information in the response
    res.status(200).json(vendorData);
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Send an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/getSingleProduct", async (req, res) => {
  try {
    const { product, uniqueid } = req.body;

    // Query the database to fetch the product based on slug and unique ID
    const query =
      "SELECT * FROM products WHERE prod_slug = $1 AND uniquepid = $2";
    const result = await pool.query(query, [product, uniqueid]);

    if (result.rows.length > 0) {
      // Product found, send it in the response
      const singleProduct = result.rows[0];
      if (singleProduct.isvariant === "Variant") {
        const variantData = await fetchVariantData(
          pool,
          singleProduct.uniquepid
        );

        if (variantData && variantData.length > 0) {
          const firstVariant = variantData[0];

          // Update the product's mrp and sellingprice using the first entry in variantData
          singleProduct.mrp = firstVariant.variant_mrp;
          singleProduct.sellingprice = firstVariant.variant_sellingprice;
          singleProduct.label = firstVariant.label; // Replace with the desired label

          if (singleProduct.currency_symbol !== "USD") {
            // Convert mrp and sellingprice to floats
            const mrpAsFloat = parseFloat(firstVariant.variant_mrp);
            const sellingPriceAsFloat = parseFloat(
              firstVariant.variant_sellingprice
            );

            const exchangedSellingPrice =
              (sellingPriceAsFloat /
                conversionRates[singleProduct.currency_symbol?.toLowerCase()]) *
              conversionRates[currency?.toLowerCase()] || sellingPriceAsFloat;
            const exchangedMrp =
              (mrpAsFloat /
                conversionRates[singleProduct.currency_symbol?.toLowerCase()]) *
              conversionRates[currency?.toLowerCase()] || mrpAsFloat;

            if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
              // Calculate the exchanged mrp and sellingprice based on the conversion rate
              singleProduct.sellingprice = exchangedSellingPrice.toFixed(2);
              singleProduct.mrp = exchangedMrp.toFixed(2);
              singleProduct.currency_symbol = currency; // Update the currency symbol
            }
          }
        }
      }
      res.json({ product: singleProduct });
    } else {
      // Product not found
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    console.error("Error in the try-catch block:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get Products of Vendors with Vendor Id
app.get("/getVendorProducts", async (req, res) => {
  const { vendorid, currency, pageNumber, pageSize } = req.query;
  try {
    // Check if vendorid is provided in the URL and use it in your query
    // Use vendorid in your query or function
    const AllProducts = await AllProductsVendors(
      pool,
      vendorid,
      currency,
      null,
      null,
      null,
      1,
      pageNumber,
      pageSize
    );
    res.status(200).json(AllProducts);
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /AllProductsVendors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recommendedProducts/:cid", async (req, res) => {
  const { cid } = req.params;
  try {
    // Check if vendorid is provided in the URL and use it in your query
    // Use vendorid in your query or function
    const recommendedproducts = await AllProductsVendors(
      pool,
      null,
      "USD",
      null,
      "recommended",
      cid,
      1
    );
    res.status(200).json(recommendedproducts);
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /recommendedproducts route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/newArrivals/:cid", async (req, res) => {
  const { cid, pageNumber = 1, pageSize = 10 } = req.params;
  try {
    // Check if vendorid is provided in the URL and use it in your query
    // Use vendorid in your query or function
    const recommendedproducts = await AllProductsVendors(
      pool,
      null,
      "USD",
      null,
      "newarrivals",
      cid,
      1,
      pageNumber,
      pageSize
    );
    res.status(200).json(recommendedproducts);
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /recommendedproducts route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getProductBySubcategories", async (req, res) => {
  const { subcat, category, pageNumber = 1, pageSize = 10 } = req.query;
  try {
    // Check if vendorid is provided in the URL and use it in your query
    // Use vendorid in your query or function
    // const products = await AllProductsVendors(pool, null, currency, subcat);
    const offset = (pageNumber - 1) * parseInt(pageSize);
    let AllProducts = [];
    let products;
    if (subcat !== "All") {
      products = await pool.query(
        "Select * from products WHERE slug_subcat = $1 AND status = 1 ORDER BY id OFFSET $2 LIMIT $3",
        [subcat, offset, pageSize]
      );
    } else {
      products = await pool.query(
        "Select * from products WHERE slug_cat = $1 AND status = 1 ORDER BY id OFFSET $2 LIMIT $3",
        [category, offset, pageSize]
      );
    }

    for (const product of products.rows) {
      if (product.isvariant === "Variant") {
        const variantData = await fetchVariantData(pool, product.uniquepid);
        if (variantData && variantData.length > 0) {
          // Update the product's mrp and sellingprice using the first entry in variantData
          product.mrp = variantData[0].variant_mrp;
          product.sellingprice = variantData[0].variant_sellingprice;
          product.label = variantData[0].label; // Replace with the desired label
        }
      }

      if (product.vendorid) {
        const vendorInfo = await fetchVendorInfo(pool, product.vendorid);
        product.vendorInfo = vendorInfo;
      }
      AllProducts.push(product);
    }

    res.status(200).json({ AllProducts });
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /AllProductsVendors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get product by Category
app.get("/getProductByCategories", async (req, res) => {
  const { subcat, currency } = req.query;
  try {
    // Check if vendorid is provided in the URL and use it in your query
    // Use vendorid in your query or function
    const products = await AllProductsVendors(pool, null, currency, subcat);
    const AllProducts = [];
    for (const product of products) {
      if (product.isvariant === "Variant") {
        const variantData = await fetchVariantData(pool, product.uniquepid);
        if (variantData && variantData.length > 0) {
          // Update the product's mrp and sellingprice using the first entry in variantData
          product.mrp = variantData[0].variant_mrp;
          product.sellingprice = variantData[0].variant_sellingprice;
          product.label = variantData[0].label; // Replace with the desired label
        }
      }

      if (product.vendorid) {
        const vendorInfo = await fetchVendorInfo(pool, product.vendorid);
        product.vendorInfo = vendorInfo;
      }
      AllProducts.push(product);
    }

    res.status(200).json({ AllProducts });
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /AllProductsVendors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get All Products of Vendors
app.get("/AllProductsVendors", async (req, res) => {
  try {
    const currency = req.query.currency;
    const pageNumber = req.query.pageNumber;
    const pageSize = req.query.pageSize;
    // Check if vendorid is provided in the URL and use it in your query
    const AllProducts = await AllProductsVendors(
      pool,
      null,
      currency,
      null,
      null,
      null,
      1,
      pageNumber,
      pageSize
    );
    res.status(200).json(AllProducts);
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /AllProductsVendors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/searchProducts", async (req, res) => {
  try {
    // Get the query parameter from the URL using req.query
    const searchTerm = req.query.searchTerm;

    if (!searchTerm) {
      return res.status(400).json({
        status: 400,
        error: "Missing search term in the query parameter.",
      });
    }

    // Use parameterized query to prevent SQL injection
    const query = {
      text: 'SELECT ad_title AS searchkeywords FROM products WHERE (ad_title ILIKE $1 OR additionaldescription ILIKE $1) AND status = 1 LIMIT 10',
      values: [`%${searchTerm}%`],
    };

    const result = await pool.query(query);

    res.status(200).json(result.rows.map(row => row.searchkeywords));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/getSearchedProducts", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.pageNumber) || 1; // Page number, default to 1
    const limit = parseInt(req.query.pageSize) || 10; // Number of items to fetch, default to 10

    if (!searchTerm) {
      return res
        .status(400)
        .json({ error: "Missing search term in the query parameter." });
    }

    // Use parameterized query to prevent SQL injection
    const countQuery = {
      text: `
        SELECT 
          COUNT(*) as total_count
        FROM 
          products 
        WHERE 
          (ad_title ILIKE $1 OR 
          additionaldescription ILIKE $1 OR 
          searchkeywords ILIKE $1) AND 
          status = 1
      `,
      values: [`%${searchTerm}%`],
    };


    const countResult = await pool.query(countQuery);
    const totalCount = countResult.rows[0].total_count;

    // Use parameterized query to prevent SQL injection
    const query = {
      text: `
        SELECT 
          *
        FROM 
          products 
        WHERE 
          (ad_title ILIKE $1 OR 
          additionaldescription ILIKE $1 OR 
          searchkeywords ILIKE $1) AND 
          status = 1
        LIMIT $2 OFFSET $3
      `,
      values: [`%${searchTerm}%`, limit, (page - 1) * limit],
    };


    const result = await pool.query(query);
    const products = result.rows;

    res.status(200).json({ totalCount, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



// Define an API endpoint to fetch data
app.get("/generateReport", async (req, res) => {
  try {
    // Extract parameters from the request
    const { startDate, endDate, vendorId } = req.query;

    // Query the database to fetch data for the specified date range and vendor
    const queryResult = await pool.query(
      "SELECT * FROM vendorproductorder WHERE vendor_id = $1 AND order_date >= $2 AND order_date <= $3",
      [vendorId, startDate, endDate]
    );

    const vendorQuery = await pool.query(
      "SELECT * FROM vendors WHERE id = $1",
      [vendorId]
    );

    // Calculate total earnings, expenses, and net profit for each currency_symbol
    const currencyTotals = {};
    const vendorData = queryResult.rows;
    const vendors = vendorQuery.rows[0];
    vendorData.forEach((order) => {
      const currencySymbol = order.currency_symbol;
      if (!currencyTotals[currencySymbol]) {
        currencyTotals[currencySymbol] = {
          totalEarnings: 0,
          expenses: 0,
        };
      }

      currencyTotals[currencySymbol].totalEarnings += parseFloat(
        order.total_amount
      );
      currencyTotals[currencySymbol].expenses += parseFloat(order.fees_paid);
    });

    // Calculate net profit for each currency
    for (const currency in currencyTotals) {
      currencyTotals[currency].netProfit =
        currencyTotals[currency].totalEarnings -
        currencyTotals[currency].expenses;
    }

    // Group orders by order status
    const orderStatusGroups = {};
    vendorData.forEach((order) => {
      const orderStatus = order.order_status;
      if (!orderStatusGroups[orderStatus]) {
        orderStatusGroups[orderStatus] = [];
      }
      orderStatusGroups[orderStatus].push(order);
    });

    // Calculate product performance
    const productPerformance = {};

    vendorData.forEach((order) => {
      const product_uniqueid = order.product_uniqueid;
      if (!productPerformance[product_uniqueid]) {
        productPerformance[product_uniqueid] = 0;
      }
      productPerformance[product_uniqueid] += parseFloat(order.total_amount);
    });

    // Sort products by total performance in descending order
    const sortedProducts = Object.keys(productPerformance).sort(
      (a, b) => productPerformance[b] - productPerformance[a]
    );

    // Specify the number of top-performing products you want to retrieve (e.g., top 5)
    const numberOfTopProducts = 5;
    const AllProducts = await AllProductsVendors(pool);

    // Get the top N products
    const topPerformingProducts = sortedProducts.slice(0, numberOfTopProducts);
    const filteredProducts =
      AllProducts &&
      AllProducts.filter((product) =>
        topPerformingProducts.includes(product.uniquepid)
      );
    // Now, topPerformingProducts contains the product_uniqueid values of the top-performing products
    // Get the unique currency symbols
    const uniqueCurrencies = [
      ...new Set(vendorData.map((order) => order.currency_symbol)),
    ];
    0.0;

    // Generate the report
    const report = {
      vendorId,
      startDate,
      endDate,
      currencyReports: uniqueCurrencies.map((currency) => ({
        currencySymbol: currency,
        totalEarnings: currencyTotals[currency].totalEarnings.toFixed(2),
        expenses: currencyTotals[currency].expenses.toFixed(2),
        netProfit: currencyTotals[currency].netProfit.toFixed(2),
      })),
      orderMetrics: orderStatusGroups, // Orders grouped by order status
      filteredProducts, // Top 5 best-performing products
      vendors,
    };

    // Send the report as a JSON response
    res.json(report);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getAllVendorAttributes", async (req, res) => {
  try {
    // Query the database to get all attributes for the specified vendor
    const query = "SELECT * FROM attributes";
    const { rows } = await pool.query(query);

    // Send the attributes as JSON response
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch vendor attributes" });
  }
});

app.get("/variant-products", async (req, res) => {
  try {
    // Query the database to fetch variant products
    const query = "SELECT * FROM variantproducts"; // Replace with your table name
    const { rows } = await pool.query(query);

    // Send the fetched data as JSON response
    res.json(rows);
  } catch (error) {
    console.error("Error fetching variant products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/getvariantsofcatsubcat", async (req, res) => {
  try {
    const { category, subcategory, uniquepid } = req.query;
    // Construct the SQL query based on the provided parameters
    const query = `
      SELECT *
      FROM variantproducts
      WHERE variant_category = $1
      AND variant_subcategory = $2
      AND product_uniqueid = $3
    `;

    // Execute the SQL query to fetch variants
    const variants = await pool.query(query, [
      category,
      subcategory,
      uniquepid,
    ]);

    res.json(variants.rows);
  } catch (error) {
    console.error("Error fetching variants:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/bulkProductApprove", async (req, res) => {
  try {
    const selectedRowKeys = req.body.selectedRowKeys;

    // Construct the SQL query to update records
    const updateQuery = `
      UPDATE products
      SET status = 1, updated_at_product = NOW()
      WHERE uniquepid = $1
      RETURNING *; -- This returns the updated row
    `;

    // Use a transaction to update each record
    await pool.query("BEGIN");

    const updatedData = [];

    for (const uniquepid of selectedRowKeys) {
      const result = await pool.query(updateQuery, [uniquepid]);

      // Append the updated row to the array
      updatedData.push(result.rows[0]);
    }

    await pool.query("COMMIT");

    console.log("Records updated successfully");
    res.json({ message: "Records updated successfully", updatedData });
  } catch (error) {
    await pool.query("ROLLBACK");
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;
