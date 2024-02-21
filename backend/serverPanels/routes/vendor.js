// vendor.js
const express = require("express");
const app = express();
const { createObjectCsvWriter } = require('csv-writer');
const pool = require("../config"); // Assuming you have a database connection configuration file
const bcrypt = require("bcrypt");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const slug = require("slug");
const b2 = require("./b2");
const fs = require("fs");


const { Translate } = require('@google-cloud/translate').v2;
require('dotenv').config()
const CREDENTIALS = JSON.parse(process.env.CREDENTIALS)
const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.projectId
});


const sendEmail = require("./nodemailer");

// const fs = require("fs/promises"); // For reading the HTML template

app.use(express.json());
app.use(cors());

// Assuming you have a connection pool to your database
app.use((req, res, next) => {

  req.pool = pool;
  next();
});

// Set the bucket name and folder where the banners are stored
const bucketName = "NGMP-PRODUCTS";
const folderName = "products";


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
      'SELECT * FROM vendors WHERE email = $1 OR vendor_username = $2',
      [email, email] // Use the same email value for both parameters
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
          'UPDATE vendors SET "useridvendor" = $1 WHERE email = $2 OR vendor_username = $3',
          [loggedId, email, email]
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

  console.log(data);
  try {
    const client = await pool.connect();

    const query = `
      UPDATE vendors
      SET
        vendorname = $1,
        country_code = $2,
        mobile_number = $3,
        bank_name = $4,
        bank_account_name = $5,
        bank_account_number = $6,
        bank_branch = $7,
        bank_swift_code = $8,
        business_model = $9,
        business_type = $10,
        business_website = $11,
        business_email = $12,
        business_phone = $13,
        business_description = $14,
        facebook_url = $15,
        instagram_url = $16,
        linkedin_url = $17,
        twitter_url = $18,
        support_contact_1 = $19,
        support_contact_2 = $20,
        tax_id_number = $21
      WHERE id = $22
      RETURNING *;
    `;

    const params = [
      data.vendorname,
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
      data.facebook_url,
      data.instagram_url,
      data.linkedin_url,
      data.twitter_url,
      data.support_contact_1,
      data.support_contact_2,
      data.tax_id_number,
      id
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
    console.log(loggedId);
    const query = 'SELECT * FROM vendors WHERE useridvendor = $1';
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
    const subcatNameBackend = req.body.subcatNameBackend.replace(/[^\w\s]/g, "").replace(/\s/g, "");

    let query;
    let values;

    const offset = (page - 1) * pageSize;

    if (subcatNameBackend === "all") {
      // Query to fetch products for the given vendor without subcategory filter
      query = "SELECT *, status as produ_status, to_char(updated_at_product, 'YYYY-MM-DD HH24:MI:SS') AS formatted_updated_at FROM products WHERE vendorid = $1 ORDER BY updated_at_product DESC LIMIT $2 OFFSET $3";
      values = [id, pageSize, offset];
    } else {
      // Query to fetch products for the given vendor and specific subcategory
      query = "SELECT *,status as produ_status, to_char(updated_at_product, 'YYYY-MM-DD HH24:MI:SS') AS formatted_updated_at FROM products WHERE vendorid = $1 AND slug_subcat = $2 ORDER BY updated_at_product DESC LIMIT $3 OFFSET $4";
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

app.post("/deleteVariant", async (req, res) => {
  try {
    const { id } = req.body;

    // Perform the deletion in the database
    const deleteQuery = "DELETE FROM variantproducts WHERE variant_id = $1";
    await pool.query(deleteQuery, [id]);

    res.status(200).json({ message: "Variant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting variant" });
  }
});

app.post("/updateEditVariant", async (req, res) => {
  try {
    const { variant_id, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity } = req.body;

    // Check if the SKU already exists
    const skuCheckQuery = "SELECT COUNT(*) FROM variantproducts WHERE variant_skuid = $1 AND variant_id <> $2";
    const skuCheckValues = [variant_skuid, variant_id];
    const skuCheckResult = await pool.query(skuCheckQuery, skuCheckValues);
    const skuCount = skuCheckResult.rows[0].count;

    if (skuCount > 0) {
      // SKU already exists, return an error response
      return res.status(400).json({ error: "SKU already exists in the database" });
    }

    // Perform the update in the database
    const updateQuery = `
      UPDATE variantproducts
      SET
        variant_mrp = $1,
        variant_sellingprice = $2,
        variant_skuid = $3,
        variant_quantity = $4
      WHERE variant_id = $5
    `;
    const updateValues = [variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variant_id];

    await pool.query(updateQuery, updateValues);

    res.status(200).json({ message: "Variant updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating variant" });
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
    const { subcategory, category, nested_subcat, additonal_condition, listing_type, locationData, product_policy_id, length, ...productData } = req.body[0];
    const uniquepid = generateUniqueID();
    const replaceSubcategory = subcategory.trim();
    const replacecategory = category.trim();
    const prodSlug = slug(productData?.ad_title) || '';
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
      isvariant, quantity, postalcode, salespackage, brand, condition, slug_cat, slug_subcat, updated_at_product, prod_slug, width, height, weight, length, product_ship_from, mogadishudistrict_ship_from, nested_subcat, nested_subcat_slug, additonal_condition, product_policy_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, NOW(), $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41)
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
      listing_type === 'Draft' ? 3 : productData.status,
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
      productData.width,
      productData.height,
      productData.weight,
      length,
      productData.mogadishudistrict_ship_from,
      productData.estimate_delivery_by,
      nested_subcat,
      slug(nested_subcat || '') || '',
      additonal_condition,
      product_policy_id
      // productData.mogadishudistrict_ship_from
    ];

    if (productData.FilteredVariantData.length > 0) {
      // To store the conflicting SKUs
      const conflictingSKUs = [];

      // Insert variants into another table if FilteredVariantData is not empty
      for (const variant of productData.FilteredVariantData) {
        // Check if the SKU exists in the variants table
        const isMatch = await checkSkuidExists(variant.sku);

        if (isMatch) {
          // SKU already exists in the variants table, add it to the list of conflicts
          conflictingSKUs.push(variant.sku);
        } else {

          // Insert a new record into the variants table
          const variantInsertQuery = `
            INSERT INTO variantproducts (label, product_uniqueid, variant_mrp, variant_sellingprice, variant_skuid, variant_quantity, variantsvalues, vendori_id, variant_category, variant_subcategory)
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

      // If there are conflicting SKUs, return an error with the list of conflicting SKUs
      if (conflictingSKUs.length > 0) {
        return res
          .status(400)
          .json({ error: "Some SKUs already exist in variants", conflictingSKUs });
      }
    }

    const productInsertResult = await pool.query(
      productInsertQuery,
      productInsertValues
    );

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
    const { subcategory, nested_subcat, additonal_condition, length, listing_type, product_policy_id, ...productData } = req.body[0]; // Exclude category, isvariant, skuid, countryoforigin
    const replaceSubcategory = subcategory && subcategory
      .replace(/[^\w\s]/g, "")
      .replace(/\s/g, "");
    const { ProductVariantType, SelectedUniqueId, FilteredVariantData } = productData;
    const prodSlug = slug(productData?.ad_title) || '';

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
                              status = $25,
                              prod_slug = $15,
                              height = $16,
                              width = $17,
                              length = $18,
                              weight = $19,
                              product_ship_from = $20,
                              estimate_delivery_by = $21,
                              mogadishudistrict_ship_from = $20,
                              nested_subcat = $22,
                              nested_subcat_slug = $23,
                              additonal_condition = $24,
                              product_policy_id = $26
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
      productData.width,
      productData.height,
      length,
      productData.weight,
      productData.mogadishudistrict_ship_from,
      productData.estimate_delivery_by,
      nested_subcat,
      slug(nested_subcat || '') || '',
      additonal_condition,
      listing_type === 'Draft' ? 3 : 0,
      product_policy_id
      // productData.mogadishudistrict_ship_from
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
  const client = await pool.connect();

  try {
    const { key } = req.body;

    // Use a transaction to ensure atomicity
    await client.query("BEGIN");

    // Step 1: Get the uniquepid from the products table
    const getProductUniquepidQuery = `
      SELECT uniquepid
      FROM products
      WHERE id = $1;
    `;

    const getProductUniquepidValues = [key];
    const result = await client.query(getProductUniquepidQuery, getProductUniquepidValues);

    if (result.rows.length === 0) {
      // If no product found with the given id, rollback and send an error response
      await client.query("ROLLBACK");
      return res.status(404).json({
        status: 404,
        message: "Product not found",
      });
    }

    const uniquepid = result.rows[0].uniquepid;
    console.log("Uniquepid:", uniquepid);

    // Step 2: Delete the product from the products table
    const deleteProductQuery = `
      DELETE FROM products
      WHERE id = $1;
    `;

    const deleteProductValues = [key];
    await client.query(deleteProductQuery, deleteProductValues);
    console.log("Product deleted");

    // Step 3: Delete the product from the cart table
    const deleteCartQuery = `
      DELETE FROM cart
      WHERE product_uniqueid = $1;
    `;

    const deleteCartValues = [uniquepid];
    await client.query(deleteCartQuery, deleteCartValues);
    console.log("Cart deleted");

    // Step 4: Delete the product from the wishlist table
    const deleteWishlistQuery = `
      DELETE FROM customer_wishlist
      WHERE uniqueid = $1;
    `;

    const deleteWishlistValues = [uniquepid];
    await client.query(deleteWishlistQuery, deleteWishlistValues);
    console.log("Wishlist deleted");

    // Commit the transaction
    await client.query("COMMIT");

    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    // Rollback the transaction in case of an error
    await client.query("ROLLBACK");

    console.error("Error deleting product:", error);
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    // Release the client back to the pool
    client.release();
  }
});


async function fetchProductDataFromDB(productIds, id, subcatNameBackend) {
  try {
    let sql = '';
    let queryParams = [];

    if (productIds && productIds.length > 0) {

      // Fetch data using productIds
      sql = 'SELECT * FROM products WHERE id = ANY($1)';
      queryParams = [productIds];
    } else {
      // Fetch data where vendorid matches the provided id
      sql = 'SELECT * FROM products WHERE vendorid = $1';
      queryParams = [id];
    }

    const { rows } = await pool.query(sql, queryParams);

    for (let index = 0; index < rows.length; index++) {
      // Delete unwanted properties from each row
      delete rows[index].status;
      delete rows[index].category_type;
      delete rows[index].slug_cat;
      delete rows[index].slug_subcat;
      delete rows[index].prod_slug;
      delete rows[index].vendorid;
      delete rows[index].uniquepid;
    }

    return rows;
  } catch (error) {
    throw error;
  }
}


app.post("/downloadcsv", async (req, res) => {
  const { productIds, id, subcatNameBackend } = req.body

  try {
    const productsData = await fetchProductDataFromDB(productIds, id, subcatNameBackend);

    // Transform the nested objects or arrays into a readable string representation
    const transformedProductsData = productsData.map((product) => {
      const { attributes_specification, ...rest } = product;

      if (Array.isArray(attributes_specification)) {
        const stringifiedArray = attributes_specification.map((spec) => JSON.stringify(spec));
        return {
          ...rest,
          attributes_specification: stringifiedArray.join(';'), // Adjust separator as needed
        };
      }

      // If attributes_specification is not an array, directly stringify it
      return {
        ...rest,
        attributes_specification: JSON.stringify(attributes_specification), // Stringify single object
      };
    });


    const csvWriter = createObjectCsvWriter({
      path: 'selectedIds.csv',
      header: Object.keys(transformedProductsData[0])?.map((key) => ({ id: key, title: key })),
    });

    await csvWriter.writeRecords(transformedProductsData)

    res.setHeader('Content-Disposition', 'attachment; filename=selectedIds.csv');
    res.setHeader('Content-Type', 'text/csv');

    const fileStream = fs.createReadStream('selectedIds.csv');
    fileStream.pipe(res);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

})

// Bulk Product Deleted
app.post("/deleteProducts", async (req, res) => {
  const { productIds } = req.body;
  try {
    // Fetch image filenames from the database
    const imageQuery = `SELECT images FROM products WHERE id IN (${productIds.join(", ")})`;
    const imageResult = await pool.query(imageQuery);
    const imageFilenames = imageResult.rows.map((row) => row.images);

    // Construct the SQL query to delete selected products
    const query = `DELETE FROM products WHERE id IN (${productIds.join(", ")})`;

    // Execute the query
    await pool.query(query);

    // Unlink images from folder if they exist
    imageFilenames.length > 0 &&
      imageFilenames.forEach((filenamesArray) => {
        filenamesArray.forEach(async (filename) => {
          await b2.deleteFile(bucketName, null, filename)

        });
      });

    res.status(200).json({ message: "Selected products deleted successfully" });
  } catch (error) {
    console.error("Error deleting products:", error);
    res.status(500).json({ error: "Error deleting products" });
  }
});


// Multer configuration for file upload
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/UploadedProductsFromVendors/"); // Destination folder for uploaded files
//   },
//   filename: (req, file, cb) => {
//     const timestamp = Date.now(); // Get the current timestamp
//     const filename = `${timestamp}-${file.originalname}`; // Create the new filename with timestamp
//     cb(null, filename);
//   },
// });



const storage = multer.memoryStorage();

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

      // Validate if files are present
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "No files were uploaded." });
      }

      // const newImages = req.files.map((file) => `${file.filename}`);

      let existingImages = [];

      try {
        // Upload images to the specified bucket and folder
        const uploadResult = await b2.uploadMultipleFiles(
          bucketName,
          folderName,
          req.files
        );
        existingImages = uploadResult.uploadedFileUrls;
      } catch (uploadError) {
        // Handle the error if there's an issue uploading the file
        console.error("Error uploading files:", uploadError);
        await client.query("ROLLBACK");
        return res
          .status(500)
          .json({ error: "Internal Server Error", details: uploadError.message });
      }


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

      //   // Send response with updated images
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
    const { productId, image, imageIndex } = req.body;
    console.log(image)

    const deleteFile = await b2.deleteFile(bucketName, null, image)
    if (deleteFile.success) {
      const query = `
          SELECT images
          FROM products
          WHERE id = $1;
        `;

      const result = await pool.query(query, [productId]);

      if (result.rows.length > 0) {
        const images = result.rows[0]["images"];
        images.splice(imageIndex, 1)[0]; // Remove and get the image at the specified index

        const updateQuery = `
            UPDATE products
            SET images = $1
            WHERE id = $2;
          `;

        await pool.query(updateQuery, [images, productId]);


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
        ROW_NUMBER() OVER (PARTITION BY p.vendorid ORDER BY p.id) AS product_row_number,
        COUNT(*) OVER (PARTITION BY v.id) AS vendor_row_count
      FROM
        VendorsWithRowNumber v
        INNER JOIN products p ON v.id = p.vendorid
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
    const { vendorPage = 1, vendorPageSize = 10 } = req.query
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

app.get('/product-rejected', async (req, res) => {
  try {
    const { vendorId, page = 1, pageSize = 10, selectedOption } = req.query;
    let dateFilter;
    let dateRange;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Count total rejected products
    const countQuery = `SELECT COUNT(*) AS total FROM products WHERE vendorid = $1 AND status = 2 AND ${dateFilter}`;
    const countValues = [vendorId];
    const countResult = await pool.query(countQuery, countValues);
    const totalRejectedProducts = countResult.rows[0].total;

    // Fetch paginated rejected products
    const offset = (page - 1) * pageSize;
    const productsQuery = `SELECT * FROM products WHERE vendorid = $1 AND status = 2 AND ${dateFilter} LIMIT $2 OFFSET $3`;
    const productsValues = [vendorId, pageSize, offset];
    const { rows } = await pool.query(productsQuery, productsValues);

    res.status(200).json({ total: totalRejectedProducts, products: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/product-approved', async (req, res) => {
  try {
    const { vendorId, page = 1, pageSize = 10, selectedOption } = req.query;
    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Count total rejected products
    const countQuery = `SELECT COUNT(*) AS total FROM products WHERE vendorid = $1 AND status = 1 AND ${dateFilter}`;
    const countValues = [vendorId];
    const countResult = await pool.query(countQuery, countValues);
    const totalApproved = countResult.rows[0].total;

    // Fetch paginated rejected products
    const offset = (page - 1) * pageSize;
    const productsQuery = `SELECT *, status as prod_status FROM products WHERE vendorid = $1 AND status = 1 AND ${dateFilter} LIMIT $2 OFFSET $3`;
    const productsValues = [vendorId, pageSize, offset];
    const { rows } = await pool.query(productsQuery, productsValues);

    res.status(200).json({ total: totalApproved, products: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/product-returned-products', async (req, res) => {
  try {
    const { vendorId, page = 1, pageSize = 10, selectedOption } = req.query;
    let dateFilter;

    // Set date range based on selected option
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'order_date >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'order_date >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'order_date >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'order_date >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'order_date >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'order_date >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'order_date >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'order_date >= NOW() - INTERVAL \'24 months\'';
        break;
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Count total returned products
    const countQuery = `SELECT COUNT(*) AS total FROM vendorproductorder WHERE vendor_id = $1 AND order_status LIKE 'Ret%' AND ${dateFilter}`;
    const countValues = [vendorId];
    const countResult = await pool.query(countQuery, countValues);
    const totalReturnedProducts = countResult.rows[0].total;

    // Fetch paginated returned products
    const offset = (page - 1) * pageSize;
    const productsQuery = `SELECT * FROM vendorproductorder WHERE vendor_id = $1 AND order_status LIKE 'Ret%' AND ${dateFilter} LIMIT $2 OFFSET $3`;
    const productsValues = [vendorId, pageSize, offset];
    const { rows } = await pool.query(productsQuery, productsValues);

    // Fetch customer data based on customer_id
    const customerIds = rows.map(product => product.customer_id);
    const customerQuery = `SELECT email, family_name, given_name, phone_number, customer_id FROM customers WHERE customer_id IN (${customerIds.join(',')})`;
    const customerResult = await pool.query(customerQuery);
    const customers = customerResult.rows.reduce((acc, customer) => {
      delete customer.password
      acc[customer.customer_id] = customer;
      return acc;
    }, {});

    // Append customer data to each product
    const productsWithCustomers = rows.map(product => ({
      ...product,
      customer: customers[product.customer_id],
    }));

    res.status(200).json({ total: totalReturnedProducts, products: productsWithCustomers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/product-inventory-include-variant', async (req, res) => {
  try {
    const { vendorId, page = 1, pageSize = 10, selectedOption } = req.query;
    let dateFilter;

    // Set date range based on selected option, skip if selectedOption is 'All'
    switch (selectedOption) {
      case 'last7days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'7 days\'';
        break;
      case 'last30days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'30 days\'';
        break;
      case 'last60days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'60 days\'';
        break;
      case 'last90days':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'90 days\'';
        break;
      case 'last6months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'6 months\'';
        break;
      case 'last12months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'12 months\'';
        break;
      case 'last18months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'18 months\'';
        break;
      case 'last24months':
        dateFilter = 'updated_at_product >= NOW() - INTERVAL \'24 months\'';
        break;
      case 'All':
        dateFilter = ''; // No date filter applied
        break;
      default:
        dateFilter = 'TRUE'; // Default to no filtering
    }

    // Calculate offset based on pagination
    const offset = (page - 1) * pageSize;

    // Fetch products with variants along with pagination
    let productsQuery = `
      SELECT p.*, vp.*
      FROM products p
      LEFT JOIN variantproducts vp ON p.uniquepid::text = vp.product_uniqueid
      WHERE p.vendorid = $1 AND p.status = 1   
    `;

    if (dateFilter) {
      productsQuery += ` AND ${dateFilter}`;
    }

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM (${productsQuery}) AS subquery
    `;

    const totalCountResult = await pool.query(countQuery, [vendorId]);
    const total = parseInt(totalCountResult.rows[0].total);

    productsQuery += ` ORDER BY p.updated_at_product DESC LIMIT $2 OFFSET $3`;

    const { rows: productsWithVariants } = await pool.query(productsQuery, [vendorId, pageSize, offset]);

    // Manually calculate total count for each product
    for (const product of productsWithVariants) {
      const totalSoldResult = await pool.query(
        'SELECT COUNT(*) AS total_count FROM vendorproductorder WHERE product_uniqueid = $1 AND (label IS NULL OR label = $2)',
        [product.uniquepid, product.label]
      );
      product.total_count = parseInt(totalSoldResult.rows[0].total_count) || 0;
    }

    res.status(200).json({ total, products: productsWithVariants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/reupload-product', async (req, res) => {
  try {
    const { productId } = req.body;

    // Update the product status to 0 (assuming 0 represents "Pending" status)
    const updateQuery = "UPDATE products SET status = 0 WHERE id = $1";
    await pool.query(updateQuery, [productId]);

    res.status(200).json({ message: "Product reuploaded successfully" });
  } catch (error) {
    console.error(error);
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
      SELECT p.*, p.status AS productstatus
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
    console.log(productId, "Productid from Admin panel");
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
    "SELECT id, vendorname, brand_logo, brand_name, registration_date, country_code,company_district, mobile_number, vendor_profile_picture_url, followers, following  FROM vendors WHERE id = $1",
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
  pageSize,
  category
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

  if (category) {
    conditions.push("slug_cat = $" + (values.length + 1));
    values.push(category);
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

  if (conditions.length > 0) {
    query += " WHERE " + conditions.join(" AND   ");
  }

  const lastAndIndex = query.lastIndexOf(" AND ");
  if (lastAndIndex !== -1) {
    query =
      query.substring(0, lastAndIndex) + query.substring(lastAndIndex + 5);
  }

  console.log(category, query, values);
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
  pageSize,
  category = null
) {
  try {
    console.log(pageNumber, pageSize);
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
      pageSize,
      category
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
    const queryVendor = "SELECT * FROM vendors WHERE id = $1";

    // Define a PostgreSQL query to count total products associated with the vendor
    const queryProductCount = "SELECT COUNT(*) AS total_products FROM products WHERE vendorid = $1";

    // Set the values to be used in the PostgreSQL queries
    const valuesVendor = [vendorid];
    const valuesProductCount = [vendorid];

    // Execute the queries using the PostgreSQL connection pool
    const resultVendor = await pool.query(queryVendor, valuesVendor);
    const resultProductCount = await pool.query(queryProductCount, valuesProductCount);

    // Extract vendor data and total product count
    const vendorData = resultVendor.rows[0];
    const totalProducts = resultProductCount.rows[0].total_products;

    // Delete sensitive information from vendor data
    delete vendorData.password;

    // Append total product count to vendor data
    vendorData.total_products = totalProducts;

    // Send the retrieved vendor information along with total products in the response
    res.status(200).json(vendorData);
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Send an error response to the client
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post('/searchVendorForCHATS', async (req, res) => {
  try {
    const { searchValue } = req.body;

    // Check if the search value has at least 3 characters
    if (searchValue.length >= 3) {
      // Assuming you're using a SQL database
      const query = `
                SELECT id, brand_name, brand_logo, vendorname
                FROM vendors
                WHERE brand_name ILIKE $1 OR vendorname  ILIKE $2  AND status = 3
                LIMIT 50
            `;
      const searchPattern = `%${searchValue}%`; // Add wildcard '%' for partial matching

      const results = await pool.query(query, [searchPattern, searchPattern]);

      res.json(results.rows); // Send the search results back to the client
    } else {
      res.status(400).json({ error: "Search value must have at least 3 characters" });
    }
  } catch (error) {
    console.error(error);
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

      if (singleProduct.vendorid) {

        const vendorCountQuery = "SELECT COUNT(*) FROM products WHERE vendorid = $1";
        const vendorCountResult = await pool.query(vendorCountQuery, [singleProduct.vendorid]);

        if (vendorCountResult.rows.length > 0) {
          // Append vendor count to the product response
          singleProduct.vendorCount = parseInt(vendorCountResult.rows[0].count);
        }
        // Query the vendors table to fetch vendor data based on vendorid
        const vendorQuery = "SELECT * FROM vendors WHERE id = $1";
        const vendorResult = await pool.query(vendorQuery, [singleProduct.vendorid]);

        if (vendorResult.rows.length > 0) {
          delete vendorResult?.rows?.[0]?.password
          // Append vendor data to the product response
          singleProduct.vendorInfo = vendorResult.rows[0];
        }
      }

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
  const { vendorid, currency, pageNumber = 1, pageSize = 10, type = "" } = req.query;
  try {
    // Check if vendorid is provided in the URL and use it in your query
    // Use vendorid in your query or function

    let AllProducts
    if (type === 'coupons') {
      AllProducts = await AllProductsVendors(
        pool,
        vendorid,
        currency,
        null,
        null,
        null,
        1,
        1,
        100000000
      );
    } else {
      AllProducts = await AllProductsVendors(
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
    }


    const executeQuery = await pool.query('SELECT COUNT(*) AS totalVendorProducts FROM products WHERE status = 1 AND vendorid = $1', [vendorid])
    const total = executeQuery.rows
    res.status(200).json({ AllProducts, total });
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /AllProductsVendors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/recommendedProducts/:cid", async (req, res) => {
  const { pageNumber = 1, pageSize = 10 } = req.query
  const offset = (pageNumber - 1) * parseInt(pageSize);
  const { cid } = req.params;

  try {
    let recommendedProducts;

    if (cid !== 'null') {
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

          // Fetch products based on category names from the products table
          const productsQuery =
            "SELECT * FROM products WHERE category = ANY($1::text[]) AND status = 1 LIMIT $2 OFFSET $3";
          const productsValues = [categoryNames, pageSize, offset];
          const productsResult = await pool.query(productsQuery, productsValues);

          recommendedProducts = productsResult.rows;
        } else {
          // If categoryNames is empty, recommend random products with status 1
          const randomProductsQuery =
            "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT 10";
          const randomProductsResult = await pool.query(randomProductsQuery);

          recommendedProducts = randomProductsResult.rows;
        }
      } else {
        const randomProductsQuery =
          "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT 10";
        const randomProductsResult = await pool.query(randomProductsQuery);

        recommendedProducts = randomProductsResult.rows;
      }
    } else {
      // If cid is null or undefined, recommend random products with status 1
      const randomProductsQuery =
        "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT $1 OFFSET $2";
      const randomProductsValues = [pageSize, offset];
      const randomProductsResult = await pool.query(randomProductsQuery, randomProductsValues);

      recommendedProducts = randomProductsResult.rows;
    }

    let AllProducts = []
    for (const product of recommendedProducts) {
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
    // Send the recommended products as the response
    res.json(AllProducts);
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /Recommended route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/newArrivals/:cid", async (req, res) => {
  const { cid } = req.params;
  const { pageNumber = 1, pageSize = 10 } = req.query;
  const offset = (pageNumber - 1) * parseInt(pageSize);
  try {
    let newArrivals;

    if (cid !== 'null') {
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

          // Fetch new arrivals based on category names and order by updated_at_product
          const productsQuery =
            "SELECT * FROM products WHERE category = ANY($1::text[]) AND status = 1 ORDER BY updated_at_product DESC LIMIT $2 OFFSET $3";
          const productsValues = [categoryNames, pageSize, offset];
          const productsResult = await pool.query(productsQuery, productsValues);

          if (productsResult.rows.length > 9) {
            newArrivals = productsResult.rows;
          } else {
            const randomProductsQuery =
              "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT 10";
            const randomProductsResult = await pool.query(randomProductsQuery);

            newArrivals = randomProductsResult.rows;
          }
        } else {
          // If categoryNames is empty, recommend random new arrivals with status 1
          const randomProductsQuery =
            "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT 10";
          const randomProductsResult = await pool.query(randomProductsQuery);

          newArrivals = randomProductsResult.rows;
        }
      } else {
        const randomProductsQuery =
          "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT 10";
        const randomProductsResult = await pool.query(randomProductsQuery);

        newArrivals = randomProductsResult.rows;
      }
    } else {
      // If cid is null or undefined, recommend random new arrivals with status 1
      const randomProductsQuery =
        "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT $1 OFFSET $2";
      const randomProductsValues = [pageSize, offset];
      const randomProductsResult = await pool.query(randomProductsQuery, randomProductsValues);

      newArrivals = randomProductsResult.rows;
    }

    let AllProducts = []
    for (const product of newArrivals) {
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
      console.log(AllProducts, "AllProducts");
    }
    // Send the recommended products as the response
    res.json(AllProducts);
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /newArrivals route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getexploreproducts", async (req, res) => {
  try {
    const { pageNumber = 1, pageSize = 10 } = req.query;
    const offset = (pageNumber - 1) * parseInt(pageSize);

    const query = "SELECT * FROM products WHERE status = 1 ORDER BY RANDOM() LIMIT $1 OFFSET $2";
    const values = [pageSize, offset];

    const response = await pool.query(query, values);
    const data = response.rows;


    let AllProducts = []
    for (const product of data) {
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

    res.status(200).json({ AllProducts })
  } catch (error) {
    console.error("Error in /getexploreproducts route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/getProductBySubcategories", async (req, res) => {
  const { subcat, category, pageNumber = 1, pageSize = 10, sortMethod, selected } = req.query;
  console.log(req.query);
  try {
    let AllProducts = [];
    let products;

    let orderByClause = "id"; // Default order by id if no specific sorting method is provided

    if (sortMethod) {
      switch (sortMethod.toLowerCase()) {
        case "relevance":
          orderByClause = "random()";
          break;
        case "most recent":
          orderByClause = "updated_at_product";
          break;
        case "price low to high":
          orderByClause = "mrp ASC";
          break;
        case "price high to low":
          orderByClause = "mrp DESC";
          break;
        // Add more cases if needed for additional sorting methods
        default:
          break;
      }
    }

    if (selected) {
      selectedValues = selected.split(',');

      if (subcat !== "All") {
        // Generate placeholders for the IN clause
        const placeholders = selectedValues.map((value, index) => `$${index + 2}`).join(',');

        products = await pool.query(
          `SELECT * FROM products 
           WHERE slug_subcat = $1 AND status = 1 AND nested_subcat_slug IN (${placeholders}) 
           ORDER BY ${orderByClause} OFFSET $${selectedValues.length + 2} LIMIT $${selectedValues.length + 3}`,
          [subcat, ...selectedValues, (pageNumber - 1) * 10, pageSize]
        );
      } else {
        // Generate placeholders for the IN clause
        const placeholders = selectedValues.map((value, index) => `$${index + 2}`).join(',');

        products = await pool.query(
          `SELECT * FROM products 
           WHERE slug_cat = $1 AND status = 1 AND nested_subcat_slug IN (${placeholders}) 
           ORDER BY ${orderByClause} OFFSET $${selectedValues.length + 2} LIMIT $${selectedValues.length + 3}`,
          [category, ...selectedValues, (pageNumber - 1) * 10, pageSize]
        );
      }
    } else {
      if (subcat !== "All") {
        products = await pool.query(
          "SELECT * FROM products WHERE slug_subcat = $1 AND status = 1 ORDER BY " + orderByClause + " OFFSET $2 LIMIT $3",
          [subcat, (pageNumber - 1) * 10, pageSize]
        );


      } else {
        products = await pool.query(
          "SELECT * FROM products WHERE slug_cat = $1 AND status = 1 ORDER BY " + orderByClause + " OFFSET $2 LIMIT $3",
          [category, (pageNumber - 1) * 10, pageSize]
        );
      }
    }



    for (const product of products?.rows) {
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
    console.error("Error in /getProductBySubcategories route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get product by Category
app.get("/getProductByCategories", async (req, res) => {
  const { category, page = 1, pageSize = 10, type } = req.query;
  try {
    let query = "SELECT * FROM products WHERE slug_cat = $1";
    const queryParams = [category];

    if (type === "1") {
      // Fetch Within last 30 days products
      const last30DaysDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      query += " AND updated_at_product >= $2 ORDER BY id LIMIT $3 OFFSET $4";
      queryParams.push(last30DaysDate);
    } else if (type === "2") {
      // Fetch Within last 7 days products
      const last7DaysDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      query += " AND updated_at_product >= $2 ORDER BY id LIMIT $3 OFFSET $4";
      queryParams.push(last7DaysDate);
    } else {
      query += " ORDER BY id LIMIT $2 OFFSET $3"
    }

    queryParams.push(pageSize, (page - 1) * pageSize);

    const countQuery = await pool.query("SELECT COUNT(*) FROM products WHERE slug_cat = $1", [category]);
    const totalCount = countQuery.rows[0].count;

    const { rows } = await pool.query(query, queryParams);
    const AllProducts = [];

    for (const product of rows) {
      // Additional processing for each product (if needed)
      // For example, fetching variant data or vendor info
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

    res.status(200).json({ AllProducts, totalCount });
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /AllProductsVendors route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getProductBySubCategories_Website", async (req, res) => {
  const { category, subcat, page = 1, pageSize = 10, sortMethod, selected, price1, price2 } = req.query;
  try {

    console.log(req.query);
    let products = [];

    if (selected && selected !== 'undefined') {
      selectedValues = selected.split(',');
      let orderByClause = "id"; // Default order by id if no specific sorting method is provided

      if (subcat !== "All") {
        // Generate placeholders for the IN clause
        const placeholders = selectedValues.map((value, index) => `$${index + 2}`).join(',');

        const queryResult = await pool.query(
          `SELECT * FROM products 
           WHERE slug_subcat = $1 AND status = 1 AND nested_subcat_slug IN (${placeholders}) 
           ORDER BY ${orderByClause} OFFSET $${selectedValues.length + 2} LIMIT $${selectedValues.length + 3}`,
          [subcat, ...selectedValues, (page - 1) * 10, pageSize]
        );

        console.log(`SELECT * FROM products 
        WHERE slug_subcat = $1 AND status = 1 AND nested_subcat_slug IN (${placeholders}) 
        ORDER BY ${orderByClause} OFFSET $${selectedValues.length + 2} LIMIT $${selectedValues.length + 3}`,
          [subcat, ...selectedValues, (page - 1) * 10, pageSize]);

        products = Array.isArray(queryResult.rows) ? queryResult.rows : [];
      } else {
        // Generate placeholders for the IN clause
        const placeholders = selectedValues.map((value, index) => `$${index + 2}`).join(',');

        const queryResult = await pool.query(
          `SELECT * FROM products 
           WHERE slug_cat = $1 AND status = 1 AND nested_subcat_slug IN (${placeholders}) 
           ORDER BY ${orderByClause} OFFSET $${selectedValues.length + 2} LIMIT $${selectedValues.length + 3}`,
          [category, ...selectedValues, (page - 1) * 10, pageSize]
        );

        console.log(`SELECT * FROM products 
        WHERE slug_cat = $1 AND status = 1 AND nested_subcat_slug IN (${placeholders}) 
        ORDER BY ${orderByClause} OFFSET $${selectedValues.length + 2} LIMIT $${selectedValues.length + 3}`,
          [category, ...selectedValues, (page - 1) * 10, pageSize]);

        products = Array.isArray(queryResult.rows) ? queryResult.rows : [];
      }
    } else {
      let query = "SELECT * FROM products WHERE slug_cat = $1";
      const queryParams = [category];
      let paramIndex = 2; // Start index for parameters in the query

      // Add condition based on subcategory if available
      if (subcat) {
        query += ` AND slug_subcat = $${paramIndex}`;
        queryParams.push(subcat);
        paramIndex++; // Increment paramIndex for the next parameter
      }

      if (price1 && price2 && !isNaN(price1) && !isNaN(price2)) {
        query += ` AND (mrp BETWEEN $${paramIndex} AND $${paramIndex + 1} OR sellingprice BETWEEN $${paramIndex} AND $${paramIndex + 1})`;
        queryParams.push(price1, price2);
        paramIndex += 2; // Increment paramIndex for the next two parameters
      }

      // Modify query based on sortMethod
      if (sortMethod === "relevance") {
        // Add relevance sorting logic
      } else if (sortMethod === "priceHighToLow") {
        query += " ORDER BY mrp, sellingprice DESC";
      } else if (sortMethod === "priceLowToHigh") {
        query += " ORDER BY mrp, sellingprice ASC";
      }
      // Add pagination

      // Add pagination
      query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
      queryParams.push(pageSize, (page - 1) * pageSize);
      console.log(query);
      const queryResult = await pool.query(query, queryParams);
      products = Array.isArray(queryResult.rows) ? queryResult.rows : [];
    }


    // Query to get total count
    const countQuery = await pool.query("SELECT COUNT(*) FROM products WHERE slug_cat = $1" + (subcat ? " AND slug_subcat = $2" : ""), subcat ? [category, subcat] : [category]);
    const totalCount = countQuery.rows[0].count;

    const AllProducts = [];

    for (const product of products) {
      // Additional processing for each product (if needed)
      // For example, fetching variant data or vendor info
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

    res.status(200).json({ AllProducts, totalCount });
  } catch (error) {
    // Handle the error and send an error response to the client
    console.error("Error in /getProductBySubCategories_Website route:", error);
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

    let AllProducts = []

    for (const product of products) {
      if (product.isvariant === "Variant") {
        const variantData = await fetchVariantData(pool, product.uniquepid);
        if (variantData && variantData.length > 0) {
          // Update the product's mrp and sellingprice using the first entry in variantData
          product.mrp = variantData[0].variant_mrp;
          product.sellingprice = variantData[0].variant_sellingprice;
          product.label = variantData[0].label; // Replace with the desired label

          if (product.currency_symbol !== 'USD') {
            // Convert mrp and sellingprice to floats
            const mrpAsFloat = parseFloat(variantData[0].variant_mrp);
            const sellingPriceAsFloat = parseFloat(
              variantData[0].variant_sellingprice
            );

            if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
              // Calculate the exchanged mrp and sellingprice based on the conversion rate
              product.sellingprice = sellingPriceAsFloat.toFixed(2);
              product.mrp = mrpAsFloat.toFixed(2);
              product.currency_symbol = 'USD'; // Update the currency symbol
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


      if (!isNaN(sellingPriceAsFloat)) {
        // Round to two decimal places
        product.sellingprice = sellingPriceAsFloat.toFixed(2);
        product.mrp = mrpAsFloat.toFixed(2);
        product.currency_symbol = 'USD'; // Update the currency symbol
      }

      AllProducts.push(product);
    }

    res.status(200).json({ totalCount, products: AllProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getSearchedProducts_Panel", async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm;
    const page = parseInt(req.query.page) || 1; // Page number, default to 1
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
      COUNT(*) AS total_count
  FROM 
      products 
  WHERE 
      (ad_title ILIKE $1 
      OR additionaldescription ILIKE $1 
      OR searchkeywords ILIKE $1 
      OR uniquepid::text ILIKE $1
      OR skuid::text ILIKE $1
      OR mrp::text ILIKE $1
      OR sellingprice::text ILIKE $1
      OR countryoforigin ILIKE $1)
      ;
  
      `,
      values: [`%${searchTerm}%`],
    };

    console.log(countQuery);

    const countResult = await pool.query(countQuery);
    const totalCount = countResult.rows[0].total_count;

    // Use parameterized query to prevent SQL injection
    const query = {
      text: `
        SELECT 
          *, status as productstatus
        FROM 
          products 
        WHERE 
        (ad_title ILIKE $1 
          OR additionaldescription ILIKE $1 
          OR searchkeywords ILIKE $1 
          OR uniquepid::text ILIKE $1
          OR skuid::text ILIKE $1
          OR mrp::text ILIKE $1
          OR sellingprice::text ILIKE $1
          OR countryoforigin ILIKE $1) 
           GROUP BY status, id
        LIMIT $2 OFFSET $3
      `,
      values: [`%${searchTerm}%`, limit, (page - 1) * limit],
    };

    const result = await pool.query(query);
    const products = result.rows;

    let AllProducts = []

    for (const product of products) {
      if (product.isvariant === "Variant") {
        const variantData = await fetchVariantData(pool, product.uniquepid);
        if (variantData && variantData.length > 0) {
          // Update the product's mrp and sellingprice using the first entry in variantData
          product.mrp = variantData[0].variant_mrp;
          product.sellingprice = variantData[0].variant_sellingprice;
          product.label = variantData[0].label; // Replace with the desired label

          if (product.currency_symbol !== 'USD') {
            // Convert mrp and sellingprice to floats
            const mrpAsFloat = parseFloat(variantData[0].variant_mrp);
            const sellingPriceAsFloat = parseFloat(
              variantData[0].variant_sellingprice
            );

            if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
              // Calculate the exchanged mrp and sellingprice based on the conversion rate
              product.sellingprice = sellingPriceAsFloat.toFixed(2);
              product.mrp = mrpAsFloat.toFixed(2);
              product.currency_symbol = 'USD'; // Update the currency symbol
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


      if (!isNaN(sellingPriceAsFloat)) {
        // Round to two decimal places
        product.sellingprice = sellingPriceAsFloat.toFixed(2);
        product.mrp = mrpAsFloat.toFixed(2);
        product.currency_symbol = 'USD'; // Update the currency symbol
      }

      AllProducts.push(product);
    }

    res.status(200).json({ totalCount, products: AllProducts });
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
    const { category } = req.query;

    // Query the database to get the attribute_cat_id for the specified category
    const getCategoryQuery = "SELECT attribute_cat_id FROM categories WHERE category_name = $1";
    const categoryResult = await pool.query(getCategoryQuery, [category]);

    // Check if the category was found
    if (categoryResult.rows.length === 0) {
      return res.status(404).json({ error: "Category not found" });
    }

    const attribute_cat_id = categoryResult.rows[0].attribute_cat_id;

    // Query the database to get all attributes for the specified attribute_cat_id
    const getAttributesQuery = "SELECT * FROM attributes WHERE attribute_id = ANY($1)";
    const attributesResult = await pool.query(getAttributesQuery, [attribute_cat_id]);
    console.log(getAttributesQuery, attribute_cat_id);

    // Send the attributes as a JSON response
    res.json(attributesResult.rows);
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
async function updateProductLanguage(uniquepid, somali_ad_title, somali_additionaldescription) {
  try {
    // Construct the SQL query to update the product language 
    const updateLanguageQuery = `
      UPDATE products
      SET somali_ad_title = $1, somali_additionaldescription = $2
      WHERE uniquepid = $3
      RETURNING *; -- This returns the updated row
    `;

    // Execute the SQL query to update the product language
    const updatedLanguageResult = await pool.query(updateLanguageQuery, [somali_ad_title, somali_additionaldescription, uniquepid]);

    console.log("Product language updated successfully");
    return updatedLanguageResult.rows[0];
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update product language");
  }
}

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
      // Update product status
      const result = await pool.query(updateQuery, [uniquepid]);

      // Fetch ad_title and additionaldescription for the updated row
      const fetchQuery = `
        SELECT ad_title, additionaldescription
        FROM products
        WHERE uniquepid = $1;
      `;
      const fetchResult = await pool.query(fetchQuery, [uniquepid]);
      const { ad_title, additionaldescription } = fetchResult.rows[0];
      // Append the updated row with additional data to the array
      updatedData.push({ ...result.rows[0], ad_title, additionaldescription });

      const [somali_ad_title] = await translate.translate(ad_title, "so");
      const [somali_additionaldescription] = await translate.translate(additionaldescription, "so");

      const updatedLanguageData = await updateProductLanguage(uniquepid, somali_ad_title, somali_additionaldescription);

      // Append the updated row with additional data to the array
      updatedData.push({ ...result.rows[0], ad_title: somali_ad_title, additionaldescription: somali_additionaldescription });
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



app.post("/bulkEditProduct", async (req, res) => {
  try {
    const { selectedRowKeys, selectedOption, column } = req.body;

    console.log(req.body);

    let updateCol = ''
    if (column === 'Description') {
      updateCol = 'additionaldescription'
    } else if (column === 'Quantity') {
      updateCol = 'quantity'
    } else if (column === 'Price') {
      updateCol = 'mrp'
    } else if (column === 'Sell Price') {
      updateCol = 'sellingprice'
    } else if (column === 'Brand') {
      updateCol = 'brand'
    } else if (column === 'Condition') {
      updateCol = 'condition'
    }
    // Check if a valid option is selected
    if (!selectedOption) {
      return res.status(400).json({ error: "Invalid bulk edit option" });
    }

    // Iterate through the selectedRowKeys array and update records
    for (const productId of selectedRowKeys) {
      let updateQuery = '';
      let updateParams = [];

      // Assuming 'products' is your table name
      updateQuery = `UPDATE products SET ${updateCol} = $1 WHERE id = $2`;
      updateParams = [selectedOption, productId];

      // Execute the update query
      await pool.query(updateQuery, updateParams);
    }

    res.status(200).json({ message: 'Bulk edit successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const slugify = (text) => {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')       // Replace spaces with -
    .replace(/[^\w\-]+/g, '')   // Remove all non-word chars
    .replace(/\-\-+/g, '-')     // Replace multiple - with single -
    .replace(/^-+/, '')         // Trim - from start of text
    .replace(/-+$/, '');        // Trim - from end of text
};

app.post("/fetchCategoryProductsCount", async (req, res) => {
  try {
    const { selectedValues } = req.body;

    // Convert each value in selectedValues to a slug
    const slugs = selectedValues.map(value => slugify(value));

    // Use a placeholder for each slug in the query
    const placeholders = slugs.map((value, index) => `$${index + 1}`).join(',');

    // Construct the SQL query
    const query = `
      SELECT COUNT(*) as total_product_count
      FROM products
      WHERE nested_subcat_slug IN (${placeholders});
    `;

    // Use the Pool client to execute the query
    const result = await pool.query(query, slugs);


    // Return the total count as JSON
    res.json({ totalProductCount: result.rows[0].total_product_count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Route handler to fetch product details by uniqueid
app.get('/productDetailsByUniqueId/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Query to fetch product details based on uniqueid
    const query = {
      text: 'SELECT * FROM products WHERE uniquepid = $1',
      values: [id],
    };

    // Execute the query
    const result = await pool.query(query);

    let AllProducts = [];
    // Check if any rows were returned
    if (result.rows.length > 0) {
      for (const product of result.rows) {
        if (product.isvariant === "Variant") {
          // Fetch variant data if product is a variant
          const variantData = await fetchVariantData(pool, product.uniquepid);
          if (variantData && variantData.length > 0) {
            // Update product details with variant data
            product.mrp = variantData[0].variant_mrp;
            product.sellingprice = variantData[0].variant_sellingprice;
            product.label = variantData[0].label; // Replace with the desired label

            // Convert currency if not USD
            if (product.currency_symbol !== 'USD') {
              const mrpAsFloat = parseFloat(variantData[0].variant_mrp);
              const sellingPriceAsFloat = parseFloat(variantData[0].variant_sellingprice);
              if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
                product.sellingprice = sellingPriceAsFloat.toFixed(2);
                product.mrp = mrpAsFloat.toFixed(2);
                product.currency_symbol = 'USD'; // Update the currency symbol
              }
            }
          }
        }

        if (product.vendorid) {
          // Fetch vendor info if vendor id is present
          const vendorInfo = await fetchVendorInfo(pool, product.vendorid);
          product.vendorInfo = vendorInfo;
        }

        // Convert currency to USD if not already
        const sellingPriceAsFloat = parseFloat(product.sellingprice);
        const mrpAsFloat = parseFloat(product.mrp);
        if (!isNaN(sellingPriceAsFloat)) {
          product.sellingprice = sellingPriceAsFloat.toFixed(2);
          product.mrp = mrpAsFloat.toFixed(2);
          product.currency_symbol = 'USD'; // Update the currency symbol
        }

        AllProducts.push(product);
      }

      // Fetch similar products based on category and subcategory
      const similarProductsQuery = {
        text: 'SELECT * FROM products WHERE category = $1 AND subcategory = $2 AND uniquepid != $3 LIMIT 5',
        values: [AllProducts[0].category, AllProducts[0].subcategory, id],
      };

      const similarProductsResult = await pool.query(similarProductsQuery);
      const similarProducts = similarProductsResult.rows;

      // Fetch vendor info and variant details for similar products
      for (const product of similarProducts) {
        if (product.vendorid) {
          const vendorInfo = await fetchVendorInfo(pool, product.vendorid);
          product.vendorInfo = vendorInfo;
        }

        if (product.isvariant === "Variant") {
          const variantData = await fetchVariantData(pool, product.uniquepid);
          if (variantData && variantData.length > 0) {
            product.mrp = variantData[0].variant_mrp;
            product.sellingprice = variantData[0].variant_sellingprice;
            product.label = variantData[0].label;

            if (product.currency_symbol !== 'USD') {
              const mrpAsFloat = parseFloat(variantData[0].variant_mrp);
              const sellingPriceAsFloat = parseFloat(variantData[0].variant_sellingprice);
              if (!isNaN(mrpAsFloat) && !isNaN(sellingPriceAsFloat)) {
                product.sellingprice = sellingPriceAsFloat.toFixed(2);
                product.mrp = mrpAsFloat.toFixed(2);
                product.currency_symbol = 'USD';
              }
            }
          }
        }

        const sellingPriceAsFloat = parseFloat(product.sellingprice);
        const mrpAsFloat = parseFloat(product.mrp);
        if (!isNaN(sellingPriceAsFloat)) {
          product.sellingprice = sellingPriceAsFloat.toFixed(2);
          product.mrp = mrpAsFloat.toFixed(2);
          product.currency_symbol = 'USD';
        }
      }

      // Send the product details along with similar products as response
      res.status(200).json({ product: AllProducts[0], similarProducts });
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = app;
