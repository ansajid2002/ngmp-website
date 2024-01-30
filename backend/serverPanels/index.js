const express = require("express");
const app = express();
const router = express.Router();

const pool = require("./config");
const port = 3001;
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const moment = require("moment");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

require('dotenv').config();

const cookieSession = require("cookie-session");
const passportSetup = require("./routes/passport");
const passport = require("passport");
const authRoute = require("./routes/auth");

const vendorRoute = require("./routes/vendor");
const categoryRoute = require("./routes/category");
const subcategoryRoute = require("./routes/subcategory");
const customersRoute = require("./routes/customers");
const ordersRoute = require("./routes/orders");
const paymentRoute = require("./routes/payments");
const vendorNotifications = require("./routes/vendors_notifications");
const shipping = require("./routes/shipping");
const reports = require("./routes/reports");
const attributes = require("./routes/attributes");
const cart = require("./routes/cart");
const stripe = require("./routes/stripe");
const coupons = require("./routes/coupons");
const wishlist = require("./routes/wishlist");
const rating = require("./routes/rating");
const banner = require("./routes/banner");
const mobileBanner = require("./routes/mobileBanner");
const claims = require("./routes/claims");
const approutes = require("./routes/approutes");
const bulkupload = require("./routes/bulkupload");
const vendorpolicies = require("./routes/vendorpolicies")
const inbox = require("./routes/inbox");
const wallet = require("./routes/wallet");
const common = require("./routes/common");
const apploadingscreen = require("./routes/apploadingscreen");
const Speakeasy = require('speakeasy')
const qrcode = require('qrcode')

const sendEmail = require("./routes/nodemailer");

app.use(cookieParser());
app.use(express.json());
var options = {
  customCss: '.swagger-ui .topbar { display: none }'
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

// Register your route handlers on the router with the /api prefix
app.use('/api', vendorRoute);
app.use('/api', categoryRoute);
app.use('/api', subcategoryRoute);
app.use('/api', customersRoute);
app.use('/api', ordersRoute);
app.use('/api', paymentRoute);
app.use('/api', vendorNotifications);
app.use('/api', shipping);
app.use('/api', reports);
app.use('/api', attributes);
app.use('/api', cart);
app.use('/api', stripe);
app.use('/api', coupons);
app.use('/api', wishlist);
app.use('/api', rating);
app.use('/api', banner);
app.use('/api', mobileBanner);
app.use('/api', claims);
app.use('/api', approutes);
app.use('/api', vendorpolicies);
app.use('/api', inbox);
app.use('/api', wallet);
app.use('/api', bulkupload);
app.use('/api', common);
app.use('/api', apploadingscreen);

app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

// Check if the table exists
const checkTableExists = async () => {
  const tableExistsQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'vendors'
      )
    `;

  const result = await pool.query(tableExistsQuery);
  return result.rows[0].exists;
};

// Create the table if it doesn't exist
const createTable = async () => {
  const createTableQuery = `
    CREATE TABLE vendors (
      id SERIAL PRIMARY KEY,
      country_code VARCHAR(10) NOT NULL,
      mobile_number VARCHAR(20) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      brand_logo VARCHAR(255),
      brand_name VARCHAR(255),
      business_model VARCHAR(255),
      products JSONB,
      trademark_certificate BYTEA,
      company_name VARCHAR(255),
      company_address TEXT,
      company_city VARCHAR(255),
      company_state VARCHAR(255),
      company_country VARCHAR(255),
      company_zip_code VARCHAR(20),
      shipping_address JSONB,
      bank_name VARCHAR(255),
      bank_account_number VARCHAR(50),
      bank_routing_number VARCHAR(50),
      bank_account_name VARCHAR(255),
      bank_branch VARCHAR(255),
      bank_swift_code VARCHAR(50),
      registration_date VARCHAR(255),
      mobile_verification_status BOOLEAN,
      email_verification_status BOOLEAN
    )
  `;

  await pool.query(createTableQuery);
};

app.post('/api/totp-secret', async (req, res) => {
  try {
    var secret = Speakeasy.generateSecret({ length: 20 })
    qrcode.toDataURL(secret.otpauth_url, function (err, data) {
      // console.log(data)
      res.send({ "Qrcode": data, secret: secret.ascii })
    })
    // console.log(secret.base32);
  } catch (error) {
    console.log(error);
  }
})

app.post("/api/toptp-genertae", async (req, res) => {
  res.send({
    "token": Speakeasy.totp({
      secret: req.body.secret,
      encoding: 'base32'
    }),
    "remaining": (30 - Math.floor((new Date().getTime() / 1000.0 % 30)))
  })
})

app.post("/api/toptp-verify", async (req, res) => {
  res.send(Speakeasy.totp.verify({
    secret: req.body.secret,
    encoding: 'ascii',
    token: req.body.token
  }))
})

function authVerify(secret, token) {
  return Speakeasy.totp.verify({
    secret: secret,
    encoding: 'ascii',
    token: token
  })
}

app.post("/api/superadminLogin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Use the connection pool to check if the email exists in the database
    const loggedId = generateRandomNumber(); // Generate a 28-character random string

    const result = await req.pool.query(
      "SELECT * FROM superadmin WHERE email = $1",
      [email]
    );

    if (result.rows.length > 0) {
      const superAdminLogin = result.rows[0];
      const hashedPassword = superAdminLogin.password; // Assuming the hashed password is stored in the 'password' field

      // Compare the hashed password with the input password
      const passwordMatch = await bcrypt.compare(password, hashedPassword);

      if (passwordMatch) {
        // Passwords match, generate random string
        // Update the 'loggedId' column with the generated random string
        await req.pool.query(
          'UPDATE superadmin SET "userId" = $1 WHERE email = $2',
          [loggedId, email]
        );

        // Return the updated superadmin data
        res
          .status(200)
          .send({ status: 200, data: { ...superAdminLogin, loggedId } });
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

app.post('/api/checkAdmin2FA', async (req, res) => {
  try {
    const { admin_id, secret, auth_code } = req.body;

    const query = "SELECT secret_key FROM superadmin WHERE id = $1";
    const value = [admin_id];

    const { rows } = await pool.query(query, value);

    let verify = false;

    if (rows.length > 0 && rows[0].secret_key) {
      verify = authVerify(rows[0].secret_key, auth_code);
    } else {
      // Update the secret in the database
      const updateQuery = "UPDATE superadmin SET secret_key = $1 WHERE id = $2";
      const updateValues = [secret, admin_id];
      await pool.query(updateQuery, updateValues);

      // Assuming authVerify is an asynchronous function, you might want to wait for it to finish
      verify = authVerify(secret, auth_code);
    }

    if (verify) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ success: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.post("/api/getAdminData", async (req, res) => {
  try {
    const loggedId = req.body.loggedId; // Assuming the loggedId value is sent in the request body

    const query = 'SELECT * FROM superadmin WHERE "userId" = $1';
    const values = [loggedId];

    const { rows } = await pool.query(query, values);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/api/update-admin', async (req, res) => {
  const { adminid, newName, newEmail } = req.body;
  try {
    const client = await pool.connect();

    // Check if the new email conflicts with existing emails excluding the current admin
    const checkEmailQuery = 'SELECT id FROM superadmin WHERE email = $1 AND id <> $2';
    const checkEmailResult = await client.query(checkEmailQuery, [newEmail, adminid]);

    if (checkEmailResult.rows.length > 0) {
      // Email conflict, send a conflict response
      res.status(409).json({ success: false, message: 'Email conflict: This email is already in use' });
    } else {
      // Use a transaction to ensure atomicity of the database operations
      await client.query('BEGIN');

      // Update the superadmin table based on the adminid
      const updateQuery = 'UPDATE superadmin SET name = $1, email = $2 WHERE id = $3';
      const values = [newName, newEmail, adminid];
      await client.query(updateQuery, values);

      // Commit the transaction
      await client.query('COMMIT');

      // Release the client back to the pool
      client.release();

      res.status(200).json({ success: true, message: 'Admin updated successfully' });
    }
  } catch (error) {
    // If any error occurs, rollback the transaction and send an error response
    console.error('Error updating admin:', error);

    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Error rolling back transaction:', rollbackError);
    }

    res.status(500).json({ success: false, message: 'Failed to update admin' });
  }
});

app.put('/api/update-password', async (req, res) => {
  const { adminid, currentPassword, newPassword } = req.body;

  try {
    // Retrieve the current hashed password from the database
    const selectQuery = 'SELECT password FROM superadmin WHERE id = $1';
    const selectValues = [adminid];
    const result = await pool.query(selectQuery, selectValues);

    if (result.rows.length === 0) {
      // Admin with the provided ID not found
      return res.status(404).json({ success: false, message: 'Admin not found' });
    }

    const hashedPasswordFromDB = result.rows[0].password;

    // Compare the current password with the stored hashed password
    const passwordMatch = await bcrypt.compare(currentPassword, hashedPasswordFromDB);

    if (!passwordMatch) {
      // Current password does not match the stored password
      return res.status(401).json({ success: false, message: 'Incorrect current password' });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update the superadmin table with the new hashed password
    const updateQuery = 'UPDATE superadmin SET password = $1 WHERE id = $2';
    const updateValues = [hashedNewPassword, adminid];
    await pool.query(updateQuery, updateValues);

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ success: false, message: 'Failed to update password' });
  }
});

async function getConversionRatesUSD(req, res) {
  try {
    // Query the database to fetch data from the currency_values table
    const query = 'SELECT * FROM currency_values';
    const { rows } = await pool.query(query);

    // Send the fetched data as a JSON response
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

app.get('/api/getConversionRatesUSD', getConversionRatesUSD);

async function updateCurrencyValues(req, res) {
  try {
    // Retrieve the updated conversion rates from the request body and convert them to floats
    const { conversionRates } = req.body;
    const updatedConversionRates = {
      USD: parseFloat(conversionRates.usd),
      EUR: parseFloat(conversionRates.eur),
      ETB: parseFloat(conversionRates.etb),
      SOS: parseFloat(conversionRates.sos),
      KES: parseFloat(conversionRates.kes),
      INR: parseFloat(conversionRates.inr),
    };

    // Update the currency_values table in the database with the new float values
    const updateQuery = 'UPDATE currency_values SET usd = $1, eur = $2, etb = $3, sos = $4, kes = $5, inr = $6';
    const updateValues = [
      updatedConversionRates.USD,
      updatedConversionRates.EUR,
      updatedConversionRates.ETB,
      updatedConversionRates.SOS,
      updatedConversionRates.KES,
      updatedConversionRates.INR,
    ];

    await pool.query(updateQuery, updateValues);

    res.status(200).json({ message: 'Currency values updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


app.post('/api/updateCurrencyValues', updateCurrencyValues);

function generateRandomPassword(length) {
  const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
}

// Addinf Staff to Admin Table to assign roles
app.post("/api/addStaffDetailstoAdmin", async (req, res) => {
  try {
    const { email, name } = req.body.values;
    const selectedPosition = req.body.selectedPosition;
    const selectedLinkIds = req.body.selectedLinkIds;

    const password = generateRandomPassword(8);
    // Check if the email exists in the superadmin table
    const emailCheckQuery = "SELECT COUNT(*) FROM superadmin WHERE email = $1";
    const emailCheckResult = await pool.query(emailCheckQuery, [email]);

    const emailExists = emailCheckResult.rows[0].count > 0;

    if (emailExists) {
      return res.status(200).json({
        status: 409,
        message: "Email already exists in the superadmin table",
      });
    }

    // Hash the password before storing it
    const saltRounds = 10; // The higher the value, the more secure, but slower
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: "Error hashing password" });
      }

      // If the email does not exist, store the data in the superadmin table
      const insertQuery =
        "INSERT INTO superadmin (email,  password, position, role_id, name) VALUES ($1, $2, $3, $4, $5)";
      await pool.query(insertQuery, [
        email,
        hash,
        selectedPosition,
        selectedLinkIds,
        name,
      ]);

      const subject = 'Welcome to our system - Nile Market-place';
      const body = `
                <p>Hello,</p>
                <p>Thank you for creating an account. Here are your login details:</p>
                <ul>
                  <li><strong>Email:</strong> ${email}</li>
                  <li><strong>Password:</strong> ${password}</li>
                </ul>
                <p>Please keep this information secure.</p>
                <p>Best regards,<br>Nile Market-place</p>
              `;

      await sendEmail(email, subject, body)
      res.status(200).json({
        status: 200,
        message: "Staff details added to the superadmin table",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/updateSuperAdminRoles", async (req, res) => {
  const selectedLinkIds = req.body.selectedLinkIds;
  const selectedPosition = req.body.selectedPosition;
  const id = req.body.selectedKey;
  const { email, name } = req.body.values;
  try {
    // Update the 'roles' column in the 'superadmin' table using the selectedLinkIds
    const query =
      "UPDATE superadmin SET name=$5, email=$4, role_id = $1, position = $3 WHERE id = $2";
    await pool.query(query, [
      selectedLinkIds,
      id,
      selectedPosition,
      email,
      name,
    ]);

    // Send a response back to the frontend
    res
      .status(200)
      .json({ status: 200, message: "Roles updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET ALL STAFF CREATED BY ADMIN
app.get("/api/allStaff", async (req, res) => {
  try {
    const query = "SELECT * FROM superadmin";
    const result = await pool.query(query);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add Vendor Details
app.post("/api/addVendorstoDb", async (req, res) => {
  try {
    const {
      country_code,
      mobile_number,
      email,
      vendorname,
      vendor_username,
      password,
      brand_name,
      business_model,
      company_name,
      business_phone,
      business_email,
      business_website,
      business_description,
      company_country,
      company_district,
      company_state,
      company_city,
      company_zip_code,
      shipping_address,
      business_type,
      tax_id_number,
      support_contact_1,
      support_contact_2,
      bank_name,
      bank_account_number,
      confirm_bank_account_number,
      bank_routing_number,
      bank_account_name,
      bank_branch,
      bank_swift_code
    } = req.body;

    const fields = {
      country_code,
      mobile_number,
      email,
      vendorname,
      vendor_username,
      password,
      brand_name,
      business_model,
      company_name,
      business_phone,
      business_email,
      business_website,
      business_description,
      company_country,
      company_state,
      company_city,
      company_zip_code,
      shipping_address,
      business_type,
      tax_id_number,
      support_contact_1,
      support_contact_2,
      bank_name,
      bank_account_number,
      confirm_bank_account_number,
      bank_routing_number,
      bank_account_name,
      bank_branch,
      bank_swift_code
    };

    for (const key in fields) {
      if (!fields[key] || (typeof fields[key] === "string" && fields[key].trim() === "")) {
        return res.status(400).json({ error: `Please fill in ${key}` });
      }
    }

    // Check if the table exists
    const tableExists = await checkTableExists();

    // Create the table if it doesn't exist
    if (!tableExists) {
      await createTable();
    }

    // Check if email or vendor_username already exists
    const emailExistsQuery = "SELECT * FROM vendors WHERE email = $1";
    const vendorUsernameExistsQuery = "SELECT * FROM vendors WHERE vendor_username = $1";

    const emailExistsResult = await pool.query(emailExistsQuery, [email]);
    const vendorUsernameExistsResult = await pool.query(vendorUsernameExistsQuery, [vendor_username]);

    if (emailExistsResult.rows.length > 0 && vendorUsernameExistsResult.rows.length > 0) {
      return res.status(400).json({ error: "Email and Vendor Username already exist" });
    } else if (emailExistsResult.rows.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    } else if (vendorUsernameExistsResult.rows.length > 0) {
      return res.status(400).json({ error: "Vendor Username already exists" });
    }


    // Generate a random password if not provided
    const generatedPassword = password || generateRandomPassword(8);

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Get the current date
    const currentDate = moment().format("MMMM Do YYYY, h:mm:ss a");

    // Store the data in PostgreSQL with status set to false and current date
    const insertQuery =
      `INSERT INTO vendors (
        country_code,
        mobile_number,
        email,
        vendorname,
        vendor_username,
        password,
        brand_name,
        business_model,
        company_name,
        business_phone,
        business_email,
        business_website,
        business_description,
        company_country,
        company_district,
        company_state,
        company_city,
        company_zip_code,
        shipping_address,
        business_type,
        tax_id_number,
        support_contact_1,
        support_contact_2,
        bank_name,
        bank_account_number,
        
        bank_routing_number,
        bank_account_name,
        bank_branch,
        bank_swift_code,
        registration_date,
        mobile_verification_status,
        email_verification_status,
        email_otp,
        mobile_otp
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, false, false, 2412, 3218) RETURNING id`;

    const result = await pool.query(insertQuery, [
      country_code,
      mobile_number,
      email,
      vendorname,
      vendor_username,
      hashedPassword,
      brand_name,
      business_model,
      company_name,
      business_phone,
      business_email,
      business_website,
      business_description,
      company_country,
      company_district,
      company_state,
      company_city,
      company_zip_code,
      shipping_address,
      business_type,
      tax_id_number,
      support_contact_1,
      support_contact_2,
      bank_name,
      bank_account_number,
      bank_routing_number,
      bank_account_name,
      bank_branch,
      bank_swift_code,
      currentDate
    ]);

    const lastInsertedId = result.rows[0].id;

    // Send the welcome email to the vendor
    const subject = 'Welcome to our system - Nile Market-place';
    const body = `
        <p>Hello ${vendorname},</p>
        <p>Thank you for creating an account. Here are your login details:</p>
        <ul>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Username:</strong> ${vendor_username}</li>
          <li><strong>Password:</strong> ${generatedPassword}</li>
        </ul>
        <p>Please keep this information secure.</p>
        <p>Best regards,<br>Nile Market-place</p>
      `;

    await sendEmail(email, subject, body);

    res.status(200).json({ message: "Vendor added successfully", lastInsertedId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


function generateOTP() {
  const length = 4; // You can adjust the length of the OTP
  const digits = '0123456789';
  let OTP = '';

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * digits.length);
    OTP += digits[index];
  }

  return OTP;
}

// Update Vendors Details
app.post("/api/updateVendorDb", async (req, res) => {
  try {
    const { selectedKey } = req.body;
    const {
      email,
      vendorname,
    } = req.body.values;
    // Generate and update OTP
    const otp = generateOTP(); // Implement your OTP generation logic
    const updateOtpQuery = "UPDATE vendors SET email_otp = $1 WHERE id = $2";
    await pool.query(updateOtpQuery, [otp, selectedKey]);

    // Send the OTP email to the vendor
    const subject = 'OTP for Vendor Update - Nile Market-place';
    const otpBody = `
      <p>Hello ${vendorname},</p>
      <p>Your OTP for updating your vendor information is: <strong>${otp}</strong></p>
      <p>Please use this OTP to verify and complete the update process.</p>
      <p>Best regards,<br>Nile Market-place</p>
    `;

    await sendEmail(email, subject, otpBody);

    // await pool.query(updateQuery, updateParams);
    // client.release();

    res.status(200).json({ message: "Check" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/updateVendorDataWithOtp", async (req, res) => {
  try {
    const {
      country_code,
      mobile_number,
      email,
      vendorname,
      vendor_username,
      password,
      brand_name,
      business_model,
      bank_name,
      bank_account_number,
      bank_routing_number,
      bank_account_name,
      bank_branch,
      bank_swift_code,
    } = req.body.values;
    const { selectedKey, otp } = req.body;


    const client = await pool.connect();

    // Check if the provided vendor_username already exists
    const checkUsernameQuery = 'SELECT id FROM vendors WHERE vendor_username = $1 AND id != $2';
    const checkUsernameValues = [vendor_username, selectedKey];
    const usernameResult = await client.query(checkUsernameQuery, checkUsernameValues);

    if (usernameResult.rows.length > 0) {
      // Vendor username already exists for another vendor
      client.release();
      return res.status(400).json({ error: "Vendor username already exists." });
    }

    // Verify the provided OTP
    const checkOtpQuery = 'SELECT email_otp FROM vendors WHERE id = $1';
    const checkOtpValues = [selectedKey];
    const otpResult = await client.query(checkOtpQuery, checkOtpValues);

    if (otpResult.rows.length === 0 || otpResult.rows[0].email_otp !== otp) {
      // Incorrect OTP
      client.release();
      return res.status(400).json({ error: "Incorrect OTP. Please try again." });
    }

    const updateParams = [];

    let updateQuery = `
        UPDATE vendors
        SET 
      `;

    if (country_code != null || country_code != undefined) {
      updateQuery += " country_code = $" + updateParams.push(country_code);
    }

    // Check if password is provided before adding to the updateQuery
    if (password != null || password != undefined) {
      const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds

      updateQuery += ", password = $" + updateParams.push(hashedPassword);
    }

    if (mobile_number != null || mobile_number != undefined) {
      updateQuery += ", mobile_number = $" + updateParams.push(mobile_number);
    }

    if (email != null || email != undefined) {
      updateQuery += ", email = $" + updateParams.push(email);
    }

    if (vendorname != null || vendorname != undefined) {
      updateQuery += ", vendorname = $" + updateParams.push(vendorname);
    }

    if (vendor_username != null || vendor_username != undefined) {
      updateQuery += ", vendor_username = $" + updateParams.push(vendor_username);
    }

    if (brand_name != null || brand_name != undefined) {
      updateQuery += " brand_name = $" + updateParams.push(brand_name);
    }

    if (business_model != null || business_model != undefined) {
      updateQuery += ", business_model = $" + updateParams.push(business_model);
    }

    if (bank_name != null || bank_name != undefined) {
      updateQuery += " bank_name = $" + updateParams.push(bank_name);
    }

    if (bank_account_number != null || bank_account_number != undefined) {
      updateQuery +=
        ", bank_account_number = $" + updateParams.push(bank_account_number);
    }

    if (bank_routing_number != null || bank_routing_number != undefined) {
      updateQuery +=
        ", bank_routing_number = $" + updateParams.push(bank_routing_number);
    }

    if (bank_account_name != null || bank_account_name != undefined) {
      updateQuery +=
        ", bank_account_name = $" + updateParams.push(bank_account_name);
    }

    if (bank_branch != null || bank_branch != undefined) {
      updateQuery += ", bank_branch = $" + updateParams.push(bank_branch);
    }

    if (bank_swift_code != null || bank_swift_code != undefined) {
      updateQuery +=
        ", bank_swift_code = $" + updateParams.push(bank_swift_code);
    }

    updateQuery += " WHERE id = $" + updateParams.push(selectedKey);

    await pool.query(updateQuery, updateParams);

    res.status(200).json({ message: "Vendor Updated" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/api/allVendors", async (req, res) => {
  try {
    // Get pageNumber and pageSize from query parameters, defaulting to all vendors if not provided
    const { pageNumber, pageSize } = req.query;
    let queryParameters = [];

    if (pageNumber && pageSize) {
      // Convert pageNumber and pageSize to integers
      const pageNum = parseInt(pageNumber);
      const size = parseInt(pageSize);

      // Validate pageNumber and pageSize
      if (isNaN(pageNum) || isNaN(size) || pageNum < 1 || size < 1) {
        return res.status(400).json({ error: "Invalid pageNumber or pageSize" });
      }

      // Calculate start and end indices based on pageNumber and pageSize
      const startIndex = (pageNum - 1) * size;
      const endIndex = startIndex + size - 1;

      // Construct the SQL query with LIMIT
      queryParameters = [endIndex - startIndex + 1, startIndex];
    }

    // Construct the SQL query to get paginated vendors
    const getAllVendorsQuery = `SELECT * FROM vendors${queryParameters.length > 0 ? ' LIMIT $1 OFFSET $2' : ''}`;
    const resultVendors = await pool.query(getAllVendorsQuery, queryParameters);

    // Extract the vendors from the result
    const vendors = resultVendors.rows;

    // Remove the 'password' field from each vendor
    const vendorsWithoutPassword = vendors.map(({ password, ...rest }) => rest);

    // Construct the SQL query to get the total count of vendors
    const getCountQuery = 'SELECT COUNT(*) FROM vendors';
    const resultCount = await pool.query(getCountQuery);

    // Extract the total count from the result
    const totalCount = parseInt(resultCount.rows[0].count);

    res.status(200).json({ vendors: vendorsWithoutPassword, totalCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





// Handle file upload
// img storage path
const imgconfigVendors = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/vendorsProductImages");
  },
  filename: (req, file, callback) => {
    callback(null, `Vendor-Product-${Date.now()} - ${file.originalname}`);
  },
});

// img filter
const isVendorImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const uploadVendorImage = multer({
  storage: imgconfigVendors,
  fileFilter: isVendorImage,
});

app.post(
  "/api/uploadVendorDocImage",
  uploadVendorImage.array("images"),
  async (req, res) => {
    const files = req.files;
    const imageUrls = [];
    // Iterate through the uploaded files and save the image URLs
    for (const file of files) {
      const imageUrl = `${file.filename}`;
      imageUrls.push(imageUrl);
    }
    try {
      let { ids } = req.body; // Assuming you have a productId in the request body

      // Convert ids to an array if it's not already an array
      if (!Array.isArray(ids)) {
        ids = [ids];
      }

      // Convert ids to an array of numbers
      const idNumbers = ids.map(Number);

      // Retrieve the existing products column for the vendor
      const selectQuery = `
        SELECT products
        FROM vendors
        WHERE id = ANY ($1::int[])
      `;
      const selectResult = await pool.query(selectQuery, [idNumbers]);

      // Get the existing products JSONB object or initialize an empty object if it doesn't exist
      const existingProducts = selectResult.rows[0]?.products || {};

      // Retrieve the existing images array from the products JSONB object
      const existingImages = existingProducts.images || [];

      // Append the user-uploaded image URLs to the existing images array
      const updatedImages = [...existingImages, ...imageUrls];

      // Update the products JSONB object with the updated images array
      const updatedProducts = {
        ...existingProducts,
        images: updatedImages,
      };


      // Update the vendors table with the updated products JSONB object
      const updateQuery = `
        UPDATE vendors
        SET products = $1
        WHERE id = ANY ($2::int[])
      `;
      await pool.query(updateQuery, [updatedProducts, idNumbers]);

      // Send the image URLs as a response to the frontend
      res.status(200).json({ imageUrls, idNumbers });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error occurred while storing the image URLs." });
    }
  }
);

// Delete Vendor Producrts Images
app.post("/api/deleteVendorDocImage", async (req, res) => {
  try {
    const { id, image } = req.body;
    // Remove image file from the folder
    try {
      // Remove the image file using the appropriate method for your file system
      // For example, if using the 'fs' module:
      fs.unlinkSync(`uploads/vendorsProductImages/${image}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove the image file.");
    }

    // Retrieve the existing products column for the vendor
    const selectQuery = `
        SELECT products
        FROM vendors
        WHERE id = $1
      `;
    const selectResult = await pool.query(selectQuery, [id]);
    const existingProducts = selectResult.rows[0]?.products || {};

    // Remove the image entry from the products JSONB object
    const updatedProducts = {
      ...existingProducts,
      images: existingProducts.images.filter((img) => img !== image),
    };

    // Update the vendors table with the updated products JSONB object
    const updateQuery = `
        UPDATE vendors
        SET products = $1
        WHERE id = $2
      `;
    await pool.query(updateQuery, [updatedProducts, id]);

    // Send success response to the frontend
    res.status(200).json({ message: "Image removed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while removing the image." });
  }
});

// Trademark Certificate Image UPLOADER
// Handle file upload
// img storage path
const imgconfigTrademark = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/vendorsTrademarkCertificates");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `Vendor-TrademarkCertificate-${Date.now()} - ${file.originalname}`
    );
  },
});

// img filter
const isTrademark = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowd"));
  }
};

const uploadTrademark = multer({
  storage: imgconfigTrademark,
  fileFilter: isTrademark,
});

app.post(
  "/api/uploadTrademarkCertificate",
  uploadTrademark.array("images"),
  async (req, res) => {
    const files = req.files;
    const imageUrls = [];

    // Iterate through the uploaded files and save the image URLs
    for (const file of files) {
      const imageUrl = `${file.filename}`;
      imageUrls.push(imageUrl);
    }


    try {
      let { ids } = req.body; // Assuming you have a productId in the request body

      // Convert ids to an array if it's not already an array
      if (!Array.isArray(ids)) {
        ids = [ids];
      }

      // Convert ids to an array of numbers
      const idNumbers = ids.map(Number);

      // Retrieve the existing trademark_certificate column for the vendor
      const selectQuery = `
        SELECT trademark_certificate
        FROM vendors
        WHERE id = ANY ($1::int[])
      `;

      const selectResult = await pool.query(selectQuery, [idNumbers]);

      // Get the existing trademark_certificate JSONB object or initialize an empty object if it doesn't exist
      const existingTrademark =
        selectResult.rows[0]?.trademark_certificate || {};

      // Update the trademark_certificate JSONB object with the new imageUrls
      const updatedTrademark = {
        ...existingTrademark,
        images: imageUrls, // Assuming only one image is uploaded
      };


      // Update the vendors table with the updated trademark_certificate JSONB object
      const updateQuery = `
        UPDATE vendors
        SET trademark_certificate = $1
        WHERE id = ANY ($2::int[])
      `;
      await pool.query(updateQuery, [updatedTrademark, idNumbers]);

      // Send the image URLs as a response to the frontend
      res.status(200).json({ imageUrls, idNumbers });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error occurred while storing the image URLs." });
    }
  }
);

// Delete Vendor Trademark Certificates Images
app.post("/api/deleteTrademarkCertificate", async (req, res) => {
  try {
    const { id, image } = req.body;
    // Remove image file from the folder

    // Retrieve the existing products column for the vendor
    const selectQuery = `
        SELECT trademark_certificate
        FROM vendors
        WHERE id = $1
      `;
    const selectResult = await pool.query(selectQuery, [id]);
    const exisitingTrademark =
      selectResult.rows[0]?.trademark_certificate || {};

    // Remove the image entry from the products JSONB object
    const updatedTrademarkCertificate = {
      ...exisitingTrademark,
      images: exisitingTrademark.images.filter((img) => img !== image),
    };

    // Update the vendors table with the updated products JSONB object
    const updateQuery = `
        UPDATE vendors
        SET trademark_certificate = $1
        WHERE id = $2
      `;
    await pool.query(updateQuery, [updatedTrademarkCertificate, id]);
    try {
      // Remove the image file using the appropriate method for your file system
      // For example, if using the 'fs' module:
      fs.unlinkSync(`uploads/vendorsTrademarkCertificates/${image}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove the image file.");
    }
    // Send success response to the frontend
    res.status(200).json({ message: "Image removed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while removing the image." });
  }
});

// Company Details of Vendors
// Add Vendor Details
app.post("/api/vendorCompanyDetails", async (req, res) => {
  const { selectedKey } = req.body;
  const {
    company_name,
    business_phone,
    business_email,
    business_website,
    business_description,
    company_country,
    company_state,
    company_city,
    company_zip_code,
    shipping_address,
    business_type,
    tax_id_number,
    support_contact_1,
    support_contact_2,
  } = req.body.values;
  try {
    // Perform the update in the database
    const queryText = `
        UPDATE vendors
        SET 
          company_name = $1,
          business_phone = $2,
          business_email = $3,
          business_website = $4,
          business_description = $5,
          company_country = $6,
          company_state = $7,
          company_city = $8,
          company_zip_code = $9,
          shipping_address = $10,
          business_type = $11,
          tax_id_number = $12,
          support_contact_1 = $13,
          support_contact_2 = $14
        WHERE id = $15`;

    const queryParams = [
      company_name,
      business_phone,
      business_email,
      business_website,
      business_description,
      company_country,
      company_state,
      company_city,
      company_zip_code,
      shipping_address,
      business_type,
      tax_id_number,
      support_contact_1,
      support_contact_2,
      selectedKey,
    ];

    await pool.query(queryText, queryParams);

    // Send a response back to the frontend
    res.json({ status: 200, message: "Vendor details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle the vendor status update
app.post("/api/updateVendorApplicationStatus", async (req, res) => {
  try {
    const { id, approvalStatus } = req.body;

    // Check if the request contains id and approvalStatus
    if (!id || !approvalStatus) {
      return res
        .status(400)
        .json({ error: "Vendor ID and New Status are required." });
    }

    // Update the vendor status in the database
    const updateQuery = "UPDATE vendors SET status = $1 WHERE id = $2";
    const values = [approvalStatus, id];
    await pool.query(updateQuery, values);

    // Send a success response
    res
      .status(200)
      .json({ status: 200, message: "Vendor status updated successfully." });
  } catch (error) {
    console.error("Error updating vendor status:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the vendor status." });
  }
});

// Vendor Profile Update Image UPLOADER
// Handle file upload
// img storage path
const imgconfigVendorProfile = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/vendorProfile");
  },
  filename: (req, file, callback) => {
    callback(null, `Vendor-vendorProfile-${Date.now()} - ${file.originalname}`);
  },
});

// img filter
const isVendorProfile = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowed"));
  }
};

const uploadVendorProfile = multer({
  storage: imgconfigVendorProfile,
  fileFilter: isVendorProfile,
});

app.post(
  "/api/vendorProfileUpdate",
  uploadVendorProfile.array("images"),
  async (req, res) => {
    const files = req.files;
    const imageUrls = [];

    // Iterate through the uploaded files and save the image URLs
    for (const file of files) {
      const imageUrl = `${file.filename}`;
      imageUrls.push(imageUrl);
    }

    try {
      let { ids } = req.body; // Assuming you have a productId in the request body

      // Convert ids to an array if it's not already an array
      if (!Array.isArray(ids)) {
        ids = [ids];
      }

      // Convert ids to an array of numbers
      const idNumbers = ids.map(Number);

      // Retrieve the existing brand_logo column for the vendor
      const selectQuery = `
        SELECT vendor_profile_picture_url
        FROM vendors
        WHERE id = ANY ($1::int[])
      `;

      const selectResult = await pool.query(selectQuery, [idNumbers]);

      // Get the existing vendor_profile_picture_url JSONB object or initialize an empty object if it doesn't exist
      const existingVendorProfile =
        selectResult.rows[0]?.vendor_profile_picture_url || {};

      // Update the vendor_profile_picture_url JSONB object with the new imageUrls
      const updateVendorProfile = {
        ...existingVendorProfile,
        images: imageUrls, // Assuming only one image is uploaded
      };


      // Update the vendors table with the updated vendor_profile_picture_url JSONB object
      const updateQuery = `
        UPDATE vendors
        SET vendor_profile_picture_url = $1
        WHERE id = ANY ($2::int[])
      `;
      await pool.query(updateQuery, [updateVendorProfile, idNumbers]);

      // Send the image URLs as a response to the frontend
      res.status(200).json({ imageUrls, idNumbers });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error occurred while storing the image URLs." });
    }
  }
);

// Delete Vendor Profile Picture Images
app.post("/api/deleteVendorProfile", async (req, res) => {
  try {
    const { id, image } = req.body;
    // Remove image file from the folder

    // Retrieve the existing products column for the vendor
    const selectQuery = `
        SELECT vendor_profile_picture_url
        FROM vendors
        WHERE id = $1
      `;
    const selectResult = await pool.query(selectQuery, [id]);
    const existingVendorProfile =
      selectResult.rows[0]?.vendor_profile_picture_url || {};

    // Remove the image entry from the products JSONB object
    const updatedVendorProfile = {
      ...existingVendorProfile,
      images: existingVendorProfile.images.filter((img) => img !== image),
    };

    // Update the vendors table with the updated products JSONB object
    const updateQuery = `
        UPDATE vendors
        SET vendor_profile_picture_url = $1
        WHERE id = $2
      `;
    await pool.query(updateQuery, [updatedVendorProfile, id]);
    try {
      // Remove the image file using the appropriate method for your file system
      // For example, if using the 'fs' module:
      fs.unlinkSync(`uploads/vendorProfile/${image}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove the image file.");
    }
    // Send success response to the frontend
    res.status(200).json({ message: "Image removed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while removing the image." });
  }
});

// Vendor Brand Logo UPLOADER
// Handle file upload
// img storage path
const imgconfigBrandLogo = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/vendorBrandLogo");
  },
  filename: (req, file, callback) => {
    callback(
      null,
      `Vendor-vendorBrandLogo-${Date.now()} - ${file.originalname}`
    );
  },
});

// img filter
const isVendorBrandLogo = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("only images is allowed"));
  }
};

const uploadVendorBrandLogo = multer({
  storage: imgconfigBrandLogo,
  fileFilter: isVendorBrandLogo,
});

app.post(
  "/api/VendorBrandLogoUpdate",
  uploadVendorBrandLogo.array("images"),
  async (req, res) => {
    const files = req.files;
    const imageUrls = [];

    // Iterate through the uploaded files and save the image URLs
    for (const file of files) {
      const imageUrl = `${file.filename}`;
      imageUrls.push(imageUrl);
    }

    try {
      let { ids } = req.body; // Assuming you have a productId in the request body

      // Convert ids to an array if it's not already an array
      if (!Array.isArray(ids)) {
        ids = [ids];
      }

      // Convert ids to an array of numbers
      const idNumbers = ids.map(Number);

      // Retrieve the existing brand_logo column for the vendor
      const selectQuery = `
        SELECT brand_logo
        FROM vendors
        WHERE id = ANY ($1::int[])
      `;

      const selectResult = await pool.query(selectQuery, [idNumbers]);

      // Get the existing brand_logo JSONB object or initialize an empty object if it doesn't exist
      const existingVendorBrandLogo = selectResult.rows[0]?.brand_logo || {};

      // Update the brand_logo JSONB object with the new imageUrls
      const updateVendorBrandLogo = {
        ...existingVendorBrandLogo,
        images: imageUrls, // Assuming only one image is uploaded
      };


      // Update the vendors table with the updated brand_logo JSONB object
      const updateQuery = `
        UPDATE vendors
        SET brand_logo = $1
        WHERE id = ANY ($2::int[])
      `;
      await pool.query(updateQuery, [updateVendorBrandLogo, idNumbers]);

      // Send the image URLs as a response to the frontend
      res.status(200).json({ imageUrls, idNumbers });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error occurred while storing the image URLs." });
    }
  }
);

// Delete Brand Logo Images
app.post("/api/deletevendorBrandLogo", async (req, res) => {
  try {
    const { id, image } = req.body;
    // Remove image file from the folder

    // Retrieve the existing products column for the vendor
    const selectQuery = `
        SELECT brand_logo
        FROM vendors
        WHERE id = $1
      `;
    const selectResult = await pool.query(selectQuery, [id]);
    const existingVendorBrandLogo = selectResult.rows[0]?.brand_logo || {};

    // Remove the image entry from the products JSONB object
    const updatedBradnLogo = {
      ...existingVendorBrandLogo,
      images: existingVendorBrandLogo.images.filter((img) => img !== image),
    };

    // Update the vendors table with the updated products JSONB object
    const updateQuery = `
        UPDATE vendors
        SET brand_logo = $1
        WHERE id = $2
      `;
    await pool.query(updateQuery, [updatedBradnLogo, id]);
    try {
      // Remove the image file using the appropriate method for your file system
      // For example, if using the 'fs' module:
      fs.unlinkSync(`uploads/vendorBrandLogo/${image}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to remove the image file.");
    }
    // Send success response to the frontend
    res.status(200).json({ message: "Image removed successfully." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error occurred while removing the image." });
  }
});

// Function to generate a random password
function generateRandomPassword() {
  // Generate a random password logic
  // Replace this with your own logic to generate a random password
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
}



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
