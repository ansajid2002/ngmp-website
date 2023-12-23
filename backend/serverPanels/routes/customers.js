const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const multer = require("multer");
const bcrypt = require("bcrypt");
const sendEmail = require("./nodemailer");
const fs = require("fs/promises"); // For reading the HTML template

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

app.get("/allCustomers", async (req, res) => {
  try {
    const query = `
        SELECT customers.*,
        COALESCE(followers.total_followers, 0) AS total_followers,
        COALESCE(following.total_following, 0) AS total_following
        FROM customers
        LEFT JOIN (
            SELECT follower_id, COUNT(*) AS total_followers
            FROM customer_follows
            GROUP BY follower_id
        ) AS followers ON customers.customer_id = followers.follower_id
        LEFT JOIN (
            SELECT following_id, COUNT(*) AS total_following
            FROM customer_follows
            GROUP BY following_id
        ) AS following ON customers.customer_id = following.following_id;
 
`;
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/addcustomers", async (req, res) => {
  try {
    const existingEmailQuery = "SELECT email FROM customers WHERE email = $1";
    const existingEmailValues = [req.body.email];

    const min = 1000;
    const max = 9999;
    const verification_code = Math.floor(Math.random() * (max - min + 1)) + min;

    const { rows: existingEmailRows } = await pool.query(
      existingEmailQuery,
      existingEmailValues
    );

    if (existingEmailRows.length > 0) {
      // The email already exists, return a response indicating that
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // If the email is not found, proceed to insert the new customer
    const newCustomer = {
      // Extract customer details from the request body
      given_name: req.body.given_name || "",
      family_name: req.body.family_name || "",
      email: req.body.email || "",
      password: req.body.password || "",
      phone_number: req.body.phone_number || "",
      address_line_1: req.body.address_line_1 || "",
      address_line_2: req.body.address_line_2 || "",
      city: req.body.city || "",
      state: req.body.state || "",
      zip_code: req.body.zip_code || "",
      country: req.body.country || "",
      bio: req.body.bio || "",
      status: req.body.status || 0,
      google_id: req.body.google_id || "",
      picture: req.body.picture || ""
    };

    // Hash the password before storing it
    let hashedPassword = ''
    if (existingEmailRows.google_id != "") {
      hashedPassword = await bcrypt.hash(newCustomer?.password, 10);
    } else {
      hashedPassword = ''
    }
    // Insert the new customer into the "customers" table
    const insertCustomerQuery = `
        INSERT INTO customers
        (given_name, family_name, email, phone_number, address_line_1, address_line_2, city, state, zip_code, country, bio, status, password, verification_code, verification_expire_date, google_id, picture)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        RETURNING customer_id;
      `;

    // Calculate the verification expiration date (current_date + 30 minutes)
    const verificationExpireDate = new Date();
    verificationExpireDate.setMinutes(verificationExpireDate.getMinutes() + 30);

    const insertCustomerValues = [
      newCustomer.given_name,
      newCustomer.family_name,
      newCustomer.email,
      newCustomer.phone_number,
      newCustomer.address_line_1,
      newCustomer.address_line_2,
      newCustomer.city,
      newCustomer.state,
      newCustomer.zip_code,
      newCustomer.country,
      newCustomer.bio,
      newCustomer.status,
      hashedPassword, // Store the hashed password
      verification_code,
      verificationExpireDate,
      newCustomer.google_id || null,
      newCustomer.picture
    ];

    const { rows } = await pool.query(
      insertCustomerQuery,
      insertCustomerValues
    );

    const insertedCustomerId = rows[0].customer_id;

    // Replace placeholders with actual values
    const user_name = newCustomer.given_name || ""; // Use the customer's name

    // Read the HTML email template
    const htmlTemplate = await fs.readFile(
      "./htmlTemplates/verification_email_template.html",
      "utf-8"
    );

    const htmlContent = htmlTemplate
      .replace(/\[user_name\]/g, user_name)
      .replace(/\[verification_code\]/g, verification_code)
      .replace(/\[message\]/g, "Thank you for registering with us.")
      .replace(/\[type_message\]/g, "registration.")


    // Send the verification email
    await sendEmail(newCustomer.email, "Email Verification", htmlContent);

    res.status(201).json({
      success: true,
      message:
        "Account Created Successfully. A verification email has been sent. Please check your inbox.",
      insertedId: insertedCustomerId,

    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the customer",
    });
  }
});

// Create a route to receive the access token
app.post('/getGoogleUserData', async (req, res) => {
  const { accessToken } = req.body;

  try {
    // Make a request to Google's user info endpoint using the access token
    const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json();

      const query = "SELECT * FROM customers WHERE email = $1"
      const value = [userInfo?.email]
      const userdata = await pool.query(query, value)
      if (userdata?.rows?.length > 0) {
        const gid = await userdata.rows[0].google_id
        console.log(gid, 'gid');
        if (gid) {
          // if not null then send the userdata 
          return res.status(200).json({ status: 200, userdata: userdata?.rows[0] });
        } else {
          return res.status(401).json({ status: 401, message: "Account Already registered with Email, Kindly Login with Email and Password" });
        }
      }

      const newCustomer = {
        // Extract customer details from the request body
        given_name: userInfo?.given_name || "",
        family_name: userInfo?.family_name || "",
        email: userInfo?.email || "",
        password: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        bio: "",
        status: 1,
        google_id: userInfo?.id,
        picture: userInfo?.picture
      };

      const insertCustomerQuery = `
          INSERT INTO customers
          (given_name, family_name, email, 
            phone_number, address_line_1, address_line_2, 
            city, state, zip_code, country, bio, status, password, verification_code, 
            verification_expire_date, google_id, picture, verified_with, status)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, 3)
          RETURNING *;
        `;

      const insertCustomerValues = [
        newCustomer.given_name,
        newCustomer.family_name,
        newCustomer.email,
        newCustomer.phone_number,
        newCustomer.address_line_1,
        newCustomer.address_line_2,
        newCustomer.city,
        newCustomer.state,
        newCustomer.zip_code,
        newCustomer.country,
        newCustomer.bio,
        newCustomer.status,
        '', // Store the hashed password
        null,
        null,
        newCustomer.google_id,
        newCustomer.picture,
        '{Google}'
      ];

      const { rows } = await pool.query(
        insertCustomerQuery,
        insertCustomerValues
      );

      const insertedCustomerData = rows[0];

      if (insertedCustomerData) {
        return res.status(200).json({ status: 200, userdata: insertedCustomerData });
      }
      // Send the user information back to the frontend
    } else {
      console.error(`Failed to fetch user data. Status: ${userInfoResponse.status}`);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/getWebGoogleLogin', async (req, res) => {
  const { email, id } = req.body;
  try {
    const query = "SELECT * FROM customers WHERE email = $1"
    const value = [email]
    const userdata = await pool.query(query, value)
    if (userdata?.rows?.length > 0) {
      const gid = await userdata.rows[0].google_id
      console.log(gid, id, 'gid');
      if (gid === id) {
        // if not null then send the userdata 
        return res.status(200).json({ status: 200, customerData: userdata?.rows[0] });
      } else {
        return res.status(401).json({ status: 401, message: "Account Already registered with Email, Kindly Login with Email and Password" });
      }
    }

  } catch (error) {
    console.log(error);
  }
}
);

app.post('/getFacebookData', async (req, res) => {
  const { accessToken } = req.body;

  try {
    // Make a request to Google's user info endpoint using the access token
    const userInfoResponse = await fetch('https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,picture.type(large)', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (userInfoResponse.ok) {
      const userInfo = await userInfoResponse.json();

      const query = "SELECT * FROM customers WHERE email = $1"
      const value = [userInfo?.email]
      const userdata = await pool.query(query, value)
      if (userdata?.rows?.length > 0) {
        const fid = await userdata.rows[0].facebook_id
        console.log(fid, 'fid');
        if (fid) {
          // if not null then send the userdata 
          return res.status(200).json({ status: 200, userdata: userdata?.rows[0] });
        } else {
          return res.status(401).json({ status: 401, message: "Account Already registered with Email, Kindly Login with Email and Password" });
        }
      }

      const newCustomer = {
        // Extract customer details from the request body
        given_name: userInfo?.given_name || "",
        family_name: userInfo?.family_name || "",
        email: userInfo?.email || "",
        password: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        bio: "",
        status: 0,
        google_id: userInfo?.id,
        picture: userInfo?.picture
      };

      const insertCustomerQuery = `
          INSERT INTO customers
          (given_name, family_name, email, 
            phone_number, address_line_1, address_line_2, 
            city, state, zip_code, country, bio, status, password, verification_code, 
            verification_expire_date, google_id, picture, verified_with)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          RETURNING *;
        `;

      const insertCustomerValues = [
        newCustomer.given_name,
        newCustomer.family_name,
        newCustomer.email,
        newCustomer.phone_number,
        newCustomer.address_line_1,
        newCustomer.address_line_2,
        newCustomer.city,
        newCustomer.state,
        newCustomer.zip_code,
        newCustomer.country,
        newCustomer.bio,
        newCustomer.status,
        '', // Store the hashed password
        null,
        null,
        newCustomer.google_id,
        newCustomer.picture,
        '{Google}'
      ];

      const { rows } = await pool.query(
        insertCustomerQuery,
        insertCustomerValues
      );

      const insertedCustomerData = rows[0];

      if (insertedCustomerData) {
        return res.status(200).json({ status: 200, userdata: insertedCustomerData });
      }
      // Send the user information back to the frontend
    } else {
      console.error(`Failed to fetch user data. Status: ${userInfoResponse.status}`);
      res.status(500).json({ error: 'Failed to fetch user data' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

app.post("/customerLoginEmail", async (req, res) => {
  const { email, password } = req.body;
  const loggedid = generateRandomNumber();

  try {
    const query = "SELECT * FROM customers WHERE email = $1";
    const { rows } = await pool.query(query, [email]);

    if (rows.length === 0) {
      // If no customer with the email is found, send a response
      return res.status(401).json({ status: 401, message: "Account doesn't exist" });
    }

    if (rows[0].google_id !== null) {
      // If google_id is not null, send a response saying "Kindly Login with Google"
      return res.status(401).json({
        status: 401,
        message: "This account needs to be logged in with Google",
      });
    }

    const hashedPassword = rows[0].password; // Assuming your password column is named "password"
    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      // If the passwords don't match, send an authentication error response
      return res.status(401).json({ status: 401, message: "Incorrect password" });
    }

    if (rows[0].status === 1) {
      return res.status(401).json({ status: 401, message: "Account Blocked, Kindly Contact support for assistance." });
    }


    if (rows[0].status === 0) {
      const otp = Math.floor(1000 + Math.random() * 9000);
      const verificationExpireDate = new Date();
      verificationExpireDate.setMinutes(
        verificationExpireDate.getMinutes() + 30
      ); // Set expiration to 30 minutes from now

      const toEmail = rows[0].email; // Get the user's email from the database
      const subject = "Account Verification";
      const htmlContent = `
          <p>Hello, ${rows[0].given_name} ${rows[0].family_name}</p>
          <p>Your verification code is: <strong>${otp}</strong></p>
          <p>If you did not request this verification, please ignore this email.</p>
        `;

      const query = `
      UPDATE customers
      SET verification_code = $1, verification_expire_date = $2
      WHERE customer_id = $3;
    `;

      // Execute the SQL query with parameters
      await pool.query(query, [
        otp,
        verificationExpireDate,
        rows[0].customer_id,
      ]);

      // Call the sendMail function to send the email
      sendEmail(toEmail, subject, htmlContent)
        .then(() => {
          // If the email is sent successfully, return a response to the user
          return res.status(200).json({
            status: 301,
            user: rows[0],
            message:
              "Account not verified. An email with verification instructions has been sent to your Gmail account. Please check your Gmail inbox and follow the instructions to verify your account.",
          });
        })
        .catch((error) => {
          // If there's an error sending the email, handle it appropriately
          console.error("Error sending verification email:", error);
          return res.status(500).json({
            status: 500,
            message: "Internal server error. Please try again later.",
          });
        });
    } else {
      await req.pool.query(
        'UPDATE customers SET "customer_loggedid" = $1 WHERE email = $2',
        [loggedid, email]
      );

      const updatedQuery = "SELECT * FROM customers WHERE email = $1";
      const { rows: updatedRows } = await pool.query(updatedQuery, [email]);

      const customerData = { ...updatedRows[0] };
      delete customerData.password;
      // res.status(200).json({ status: 200, message: "Login successful" });
      res.status(200).json({ status: 200, message: "Login successful", loggedid, customerData });

    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: 500, message: "Internal server error" });

  }
});

app.post("/verifyVerificationCodeCustomer", async (req, res) => {
  try {
    const { CustomerId, verificationCode } = req.body;

    // Check if the verification code exists and is not expired
    const query = `
      SELECT *
      FROM customers
      WHERE customer_id = $1 AND verification_code = $2
    `;

    const { rows } = await pool.query(query, [CustomerId, verificationCode]);

    if (rows.length === 0) {
      return res.status(200).json({ status: 401, message: "Invalid verification code." });
    }

    const verificationExpireDate = new Date(rows[0].verification_expire_date);
    const currentTime = new Date();

    if (verificationExpireDate <= currentTime) {
      return res
        .status(200)
        .json({ status: 401, message: "Verification code has expired." });
    }

    // If code is valid and not expired, you can mark it as verified in your database

    // Update the customer's verification status in your database
    const updateQuery = `
        UPDATE customers
        SET status = 3, verified_with = '{Email}'
        WHERE customer_id = $1
        RETURNING *; -- Include RETURNING to select the updated rows
      `;


    const data = await pool.query(updateQuery, [CustomerId]);

    return res.status(200).json({
      status: 200,
      message: "Verification successful.",
      isConfirmed: true,
      user: data.rows[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred." });
  }
});

app.post("/updatecustomer", async (req, res) => {
  try {
    const selectedKey = req.body.selectedKey;

    const updatedCustomer = {
      // Extract updated customer details from the request body
      given_name: req.body.values.given_name,
      family_name: req.body.values.family_name,
      email: req.body.values.email,
      phone_number: req.body.values.phone_number,
      address_line_1: req.body.values.address_line_1,
      address_line_2: req.body.values.address_line_2,
      city: req.body.values.city,
      state: req.body.values.state,
      zip_code: req.body.values.zip_code,
      country: req.body.values.country,
      bio: req.body.values.bio,
      status: 0,
    };

    // Update the customer in the "customers" table
    const updateCustomerQuery = `
            UPDATE customers
            SET given_name = $1, family_name = $2, email = $3, phone_number = $4, address_line_1 = $5,
                address_line_2 = $6, city = $7, state = $8, zip_code = $9, country = $10, bio = $11,
                status = $12, updated_at = NOW()
            WHERE customer_id = $13;
        `;

    const updateCustomerValues = [
      updatedCustomer.given_name,
      updatedCustomer.family_name,
      updatedCustomer.email,
      updatedCustomer.phone_number,
      updatedCustomer.address_line_1,
      updatedCustomer.address_line_2,
      updatedCustomer.city,
      updatedCustomer.state,
      updatedCustomer.zip_code,
      updatedCustomer.country,
      updatedCustomer.bio,
      updatedCustomer.status,
      selectedKey, // customer_id for the WHERE clause
    ];

    await pool.query(updateCustomerQuery, updateCustomerValues);

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the customer" });
  }
});

app.post("/getCustomerLoginData", async (req, res) => {
  try {
    const loggedId = req.body.customerLoginCookies; // Assuming the loggedId value is sent in the request body
    const query = 'SELECT * FROM customers WHERE "customer_loggedid" = $1';
    const values = [loggedId];

    const { rows } = await pool.query(query, values);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Handle file upload
// img storage path
const imgconfigCustomers = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/customerProfileImages");
  },
  filename: (req, file, callback) => {
    callback(null, `Customer-Profile-${Date.now()}-${file.originalname}`);
  },
});

// img filter
const isCustomerImage = (req, file, callback) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(new Error("Only images are allowed"));
  }
};

const uploadCustomerImage = multer({
  storage: imgconfigCustomers,
  fileFilter: isCustomerImage,
});

app.post(
  "/uploadCustomerProfileImage",
  uploadCustomerImage.single("picture"),
  async (req, res) => {
    try {
      const file = req.file;
      console.log(req.body);
      if (!file) {
        res.status(400).json({ message: "No image file provided." });
        return;
      }

      // Assuming you have a customerId in the request body
      const { key } = req.body;

      // Fetch the old image file name from the database
      const fetchQuery = `
        SELECT picture
        FROM customers
        WHERE customer_id = $1
      `;
      const fetchResult = await pool.query(fetchQuery, [key]);
      const oldFileName = fetchResult.rows[0].picture;

      // Update the customer's profile picture URL in the database with the new image URL
      const updateQuery = `
        UPDATE customers
        SET picture = $1
        WHERE customer_id = $2
        RETURNING *;
      `;
      const { rows } = await pool.query(updateQuery, [file.filename, key]);

      // Delete the old image file from the destination folder
      const oldFilePath = `./uploads/customerProfileImages/${oldFileName}`;
      // Check if oldFileName starts with "https"
      if (!oldFileName.startsWith("https")) {
        // If it doesn't start with "https", proceed with unlinking
        fs.unlink(oldFilePath, (err) => {
          if (err) {
            console.error("Error deleting old image file:", err);
          }
        });
      }


      // Send the image URL and the updated rows as a response to the frontend
      res.status(200).json({ picture: file.filename, updatedRows: rows });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error occurred while storing the profile picture." });
    }
  }
);


app.post("/removeCustomerProfileImage", async (req, res) => {
  try {
    const { key } = req.body;
    // Update the customer's picture field to null in the database
    const queryText =
      "UPDATE customers SET picture = NULL WHERE customer_id = $1";
    await pool.query(queryText, [key]);
    return res.json({
      message: "Profile photo has been removed successfully.",
    });
  } catch (error) {
    console.error("Error while removing profile photo:", error);
    return res.status(500).json({ message: "Failed to remove profile photo." });
  }
});

app.post('/storeCustomerInterest', async (req, res) => {
  try {
    const { customerId, categoryIds } = req.body;

    // Update the customer's interests in the database
    const updateQuery = 'UPDATE customers SET customer_interest = $2 WHERE customer_id = $1';
    const updateValues = [customerId, categoryIds];

    await pool.query(updateQuery, updateValues);


    // Retrieve the updated customer data from the database
    const selectQuery = 'SELECT * FROM customers WHERE customer_id = $1';
    const selectValues = [customerId];

    const result = await pool.query(selectQuery, selectValues);

    // Send the updated customer data as a response
    if (result.rows.length > 0) {
      const updatedCustomerData = result.rows[0];
      res.json({ message: 'Interests stored successfully', customerData: updatedCustomerData });
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating interests' });
  }
});

app.post("/AppUserProfileOTP", async (req, res) => {
  try {
    const { email, family_name, given_name, customer_id } = req.body;

    // First, check if the email already exists in the database for other customers
    const emailCheckQuery = "SELECT * FROM customers WHERE email = $1 AND customer_id <> $2";
    const emailCheckResult = await pool.query(emailCheckQuery, [email, customer_id]);

    if (emailCheckResult.rows.length > 0) {
      // If the email already exists for other customers, return an error
      return res.status(400).json({ message: 'Email already registered' });
    }

    // If the email doesn't exist for other customers, proceed with generating the verification code
    const min = 1000;
    const max = 9999;
    const verification_code = Math.floor(Math.random() * (max - min + 1)) + min;

    const htmlTemplate = await fs.readFile(
      "./htmlTemplates/verification_email_template.html",
      "utf-8"
    );

    const htmlContent = htmlTemplate
      .replace(/\[user_name\]/g, `${family_name} ${given_name}`)
      .replace(/\[verification_code\]/g, verification_code)
      .replace(/\[message\]/g, "")
      .replace(/\[type_message\]/g, "Profile Edit Verification");

    // Send the verification email
    await sendEmail(email, "Profile Edit Verification", htmlContent);

    // Update the verification_code in the database
    const updateQuery = "UPDATE customers SET verification_code = $1 WHERE customer_id = $2";
    await pool.query(updateQuery, [verification_code, customer_id]);

    res.status(200).json({ message: 'Verification email sent successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.post("/EditProfileAfterVerification", async (req, res) => {
  try {
    const { otp, customer_id, userProfile } = req.body;

    // First, check if the OTP matches the verification_code for the given customer_id
    const { rows } = await pool.query("SELECT * FROM customers WHERE customer_id = $1 AND verification_code = $2", [customer_id, otp]);

    if (rows.length === 0) {
      // If there is no match, return an error
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // If the OTP matches, update the customer's profile data
    const {
      given_name,
      family_name,
      email,
      bio,
      phone_number,
      address_line_1,
      address_line_2,
      city,
      country,
      state,
      zip_code
    } = userProfile;

    const updateQuery = `
      UPDATE customers 
      SET 
        given_name = $1, 
        family_name = $2, 
        email = $3, 
        bio = $4, 
        phone_number = $5, 
        address_line_1 = $6, 
        address_line_2 = $7, 
        city = $8, 
        country = $9, 
        state = $10, 
        zip_code = $11 
      WHERE customer_id = $12
      RETURNING *
    `;

    const updatedProfile = await pool.query(updateQuery, [
      given_name,
      family_name,
      email,
      bio,
      phone_number,
      address_line_1,
      address_line_2,
      city,
      country,
      state,
      zip_code,
      customer_id
    ]);

    // The 'updatedProfile' variable now contains the updated user profile

    if (updatedProfile.rows.length === 0) {
      return res.status(500).json({ message: 'Failed to update profile' });
    }

    res.status(200).json({ message: 'Profile updated successfully', updatedProfile: updatedProfile.rows[0] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/ResetCustomerPassword", async (req, res) => {
  try {
    const { email } = req.body;

    // Check if the provided email exists in the customers table
    const customer = await pool.query("SELECT google_id, facebook_id FROM customers WHERE email = $1", [email]);

    if (customer.rows.length === 0) {
      // Email not found
      res.status(400).json({ message: "Email Not Found" });
      return;
    }

    const { google_id, facebook_id } = customer.rows[0];

    if (google_id || facebook_id) {
      // If either google_id or facebook_id is not empty, it means the user has associated their account with a social login.
      res.status(400).json({ message: "Please login with your social account" });
      return;
    }

    // Generate a 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Update the reset_otp column in the customers table
    const updateResult = await pool.query(
      "UPDATE customers SET verification_code = $1 WHERE email = $2",
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

app.post("/ForgotPasswordOtpVerify", async (req, res) => {
  try {
    const { otp, email } = req.body;

    // First, check if the OTP matches the verification_code for the given customer_id
    const { rows } = await pool.query("SELECT customer_id FROM customers WHERE email = $1 AND verification_code = $2", [email, otp]);

    if (rows.length === 0) {
      // If there is no match, return an error
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    const customer_id = rows[0].customer_id;

    res.status(200).json({ message: 'OTP Verified Successfully', customer_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post("/UpdateCustomerPassword", async (req, res) => {
  try {
    const { password, customer_id } = req.body;

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the password in the database for the user with the provided customer_id
    const updateResult = await pool.query(
      "UPDATE customers SET password = $1 WHERE customer_id = $2 RETURNING *", // Use RETURNING * to get the updated customer data
      [hashedPassword, customer_id]
    );

    if (updateResult.rowCount > 0) {
      // Password updated successfully
      const updatedCustomerData = updateResult.rows[0];
      return res.status(200).json({ message: "Password updated successfully", customer: updatedCustomerData });
    } else {
      // Failed to update the password
      return res.status(500).json({ message: "Failed to update the password" });
    }
  } catch (error) {
    console.error("An error occurred while updating the password", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get('/getCustomersAddress/:cid', async (req, res) => {
  try {
    const cid = req.params.cid
    // Query the getCustomersAddress table and order by id in ascending order
    const addressrow = await pool.query('SELECT * FROM customer_address WHERE customer_id = $1 ORDER BY address_id ASC', [cid]);
    // // Return the banners as JSON
    res.json(addressrow.rows);
  } catch (error) {
    console.error('Error fetching banners:', error);
    res.status(500).json({ error: 'An error occurred while fetching banners.' });
  }
});

app.get('/getAddressForAdminBackend', async (req, res) => {
  try {
    // Query the customer_address table and order by address_id in ascending order
    const addressQuery = await pool.query('SELECT * FROM customer_address ORDER BY address_id ASC');
    const addressData = addressQuery.rows;

    // If there are no addresses, return an empty array
    if (!addressData.length) {
      return res.json([]);
    }

    // Fetch unique customer_ids from the addresses
    const uniqueCustomerIds = [...new Set(addressData.map((address) => address.customer_id))];

    // Fetch customer details for each unique customer_id
    const customerDataPromises = uniqueCustomerIds.map(async (customerId) => {
      const customerQuery = await pool.query('SELECT given_name, family_name, customer_id FROM customers WHERE customer_id = $1', [customerId]);
      return customerQuery.rows[0];
    });

    // Wait for all customer data promises to resolve
    const customerDataArray = await Promise.all(customerDataPromises);
    // Combine customer information with addresses
    const result = customerDataArray.map((customerData) => {
      const customerId = customerData.customer_id;
      return {
        id: customerId,
        given_name: customerData.given_name,
        family_name: customerData.family_name,
        addresses: addressData
          .filter((address) => address.customer_id === customerId)
          .map((address) => ({
            address_id: address.address_id,
            apt_address: address.apt_address,
            subregion_address: address.subregion_address,
            city_address: address.city_address,
            country_address: address.country_address,
            region_address: address.region_address,
            zip_address: address.zip_address,
            phone_address: address.phone_address,
          })),
      };
    });

    // Return the result as JSON
    res.json(result);
  } catch (error) {
    console.error('Error fetching customer addresses:', error);
    res.status(500).json({ error: 'An error occurred while fetching customer addresses.' });
  }
});

app.get('/RemoveCustomerAddress/:id', async (req, res) => {
  const cid = req.params.id;
  try {
    // Check if the address with the specified ID exists
    const customerAddressQuery = await pool.query('SELECT * FROM customer_address WHERE address_id = $1', [cid]);

    if (customerAddressQuery.rows.length === 0) {
      return res.status(404).json({ message: 'Address not found' });
    }

    // Delete the address from the customer_address table
    await pool.query('DELETE FROM customer_address WHERE address_id = $1', [cid]);

    res.status(200).json({ message: 'Address deleted' });
  } catch (error) {
    console.error('Error deleting Address:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/manageAddressCustomer', async (req, res) => {
  try {
    const {
      address_id,
      given_name_address,
      family_name_address,
      country_address,
      apt_address,
      city_address,
      region_address,
      subregion_address,
      zip_address,
      email_address,
      note_address,
      phone_address,
      customerId,
    } = req.body;

    if (address_id === null) {
      // Insert new address
      const insertQuery = `
        INSERT INTO customer_address (
          given_name_address,
          family_name_address,
          country_address,
          apt_address,
          city_address,
          region_address,
          subregion_address,
          zip_address,
          email_address,
          note_address,
          phone_address,
          customer_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING *
      `;
      const insertValues = [
        given_name_address,
        family_name_address,
        country_address,
        apt_address,
        city_address,
        region_address,
        subregion_address,
        zip_address,
        email_address,
        note_address,
        phone_address,
        customerId,
      ];

      const result = await pool.query(insertQuery, insertValues);
      res.status(200).json({ message: 'Address inserted', data: result.rows[0] });
    } else {
      // Update existing address based on address_id and customer_id
      const updateQuery = `
        UPDATE customer_address
        SET
          given_name_address = $1,
          family_name_address = $2,
          country_address = $3,
          apt_address = $4,
          city_address = $5,
          region_address = $6,
          subregion_address = $7,
          zip_address = $8,
          email_address = $9,
          note_address = $10,
          phone_address = $11
        WHERE
          address_id = $12 AND customer_id = $13
        RETURNING *
      `;
      const updateValues = [
        given_name_address,
        family_name_address,
        country_address,
        apt_address,
        city_address,
        region_address,
        subregion_address,
        zip_address,
        email_address,
        note_address,
        phone_address,
        address_id,
        customerId,
      ];

      const result = await pool.query(updateQuery, updateValues);

      if (result.rowCount === 0) {
        res.status(404).json({ message: 'Address not found for update' });
      } else {
        res.status(200).json({ message: 'Address updated', data: result.rows[0] });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/setDefaultAddress', async (req, res) => {
  try {
    const { address_id, customerId } = req.body;

    // Set default_address to false for the customer's existing addresses
    await pool.query(
      'UPDATE customer_address SET default_address = false WHERE customer_id = $1',
      [customerId]
    );

    // Set default_address to true for the specified address_id
    await pool.query(
      'UPDATE customer_address SET default_address = true WHERE address_id = $1',
      [address_id]
    );

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

app.post("/getGoogleuserByid", async (req, res) => {
  try {
    const { id, email, given_name, picture } = req.body;

    // Check if the user with the given Google ID exists
    const checkQuery = "SELECT * FROM customers WHERE google_id = $1";
    const checkValues = [id];
    const checkResult = await pool.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      // If the user does not exist, create a new record
      const query = "SELECT * FROM customers WHERE email = $1"
      const value = [email]
      const userdata = await pool.query(query, value)
      if (userdata?.rows?.length > 0) {
        const gid = await userdata.rows[0].google_id
        console.log(gid, 'gid');
        if (gid) {
          // if not null then send the userdata 
          return res.status(200).json({ status: 200, customerData: userdata?.rows[0] });
        } else {
          return res.status(401).json({ status: 401, message: "Account Already registered with Email, Kindly Login with Email and Password" });
        }
      }

      const newCustomer = {
        // Extract customer details from the request body
        given_name: given_name || "",
        family_name: "",
        email: email || "",
        password: "",
        phone_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        state: "",
        zip_code: "",
        country: "",
        bio: "",
        status: 1,
        google_id: id,
        picture: picture
      };

      const insertCustomerQuery = `
          INSERT INTO customers
          (given_name, family_name, email, 
            phone_number, address_line_1, address_line_2, 
            city, state, zip_code, country, bio, status, password, verification_code, 
            verification_expire_date, google_id, picture, verified_with)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          RETURNING *;
        `;

      const insertCustomerValues = [
        newCustomer.given_name,
        newCustomer.family_name,
        newCustomer.email,
        newCustomer.phone_number,
        newCustomer.address_line_1,
        newCustomer.address_line_2,
        newCustomer.city,
        newCustomer.state,
        newCustomer.zip_code,
        newCustomer.country,
        newCustomer.bio,
        newCustomer.status,
        '', // Store the hashed password
        null,
        null,
        newCustomer.google_id,
        newCustomer.picture,
        '{Google}'
      ];

      const { rows } = await pool.query(
        insertCustomerQuery,
        insertCustomerValues
      );

      const insertedCustomerData = rows[0];

      if (insertedCustomerData) {
        return res.status(200).json({ status: 200, customerData: insertedCustomerData });
      }
    } else {
      res.status(200).json({ customerData: checkResult.rows[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/getAllVerifiedCustomer", async (req, res) => {
  try {
    const { status } = req.body
    console.log(status);
    const query = 'SELECT * FROM customers WHERE status = 3'
    const result = await pool.query(query)
    const customerData = result.rows
    for (let index = 0; index < customerData.length; index++) {
      delete customerData[index].password
    }

    res.status(200).json(customerData)
  } catch (error) {
    console.log(error);
  }
})

module.exports = app;
