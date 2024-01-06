const express = require('express');
const app = express();
const pool = require('../config')
const cors = require('cors');
const multer = require('multer');
const cheerio = require('cheerio');

app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.get("/getpoliciesbyVendorid",async(req,res) => {
    const {vendor_id}= req.query

try {
    const query = "SELECT * FROM vendorpolicies WHERE vendor_id = $1"
    const values=[vendor_id]
    console.log(vendor_id,"vendor_id");

     const result = await pool.query(query,values)
     res.status(200).json(result.rows)
} catch (error) {
    console.log(error,"error getting vendor policies");
}})


function convertHtmlToReactNative(htmlCode) {
  const $ = cheerio.load(htmlCode);
  
  // Get all text content from the HTML and append space after each tag
  let textContent = '';
  $('body').contents().each((index, element) => {
    if (element.type === 'text') {
      textContent += $(element).text().trim();
    } else {
      textContent += '\n' + $(element).text().trim() + ' ';
    }
  });

  // Wrap the content in <View><Text>...</Text></View>
  const reactNativeCode = `${textContent.trim()}`;

  return reactNativeCode;
}



// app.get("/getpoliciesofAppbyVendorid",async(req,res) => {
//   const {vendor_id}= req.query

// try {
//   const query = "SELECT * FROM vendorpolicies WHERE vendor_id = $1"
//   const values=[vendor_id]
//   console.log(vendor_id,"vendor_id");

//    const result = await pool.query(query,values)
//    console.log(result.rows,"RESULT>ROWS");
//    const convertedData = result.rows.map(item => {
//     const newItem = { ...item };
//     for (const key in newItem) {
//       if (typeof newItem[key] === 'string' && newItem[key].trim().startsWith('<')) {
//         newItem[key] = convertHtmlToReactNative(newItem[key]);
//       }
//     }
//     return newItem;
//   });
//   console.log(convertedData,"converteddata from log");
//    res.status(200).json(convertedData)

// } catch (error) {
//   console.log(error,"error getting vendor policies");
// }})

// Update shipping information or insert new row if vendor_id doesn't exist
app.post("/updateShippingInfo", async (req, res) => {
    const { shipping_information, vendor_id } = req.body;
  
    try {
      // Check if the vendor_id exists in vendorpolicies table
      const checkQuery = "SELECT * FROM vendorpolicies WHERE vendor_id = $1";
      const checkResult = await pool.query(checkQuery, [vendor_id]);
  
      if (checkResult.rows.length > 0) {
        // If vendor_id exists, update shipping_information
        const updateQuery = "UPDATE vendorpolicies SET shipping_information = $1 WHERE vendor_id = $2";
        const updateValues = [shipping_information, vendor_id];
        await pool.query(updateQuery, updateValues);
        res.status(200).json({ message: "Shipping information updated successfully" });
      } else {
        // If vendor_id doesn't exist, insert new row with the provided vendor_id and shipping_information
        const insertQuery = "INSERT INTO vendorpolicies (vendor_id, shipping_information) VALUES ($1, $2)";
        const insertValues = [vendor_id, shipping_information];
        await pool.query(insertQuery, insertValues);
        res.status(200).json({ message: "New row inserted with shipping information" });
      }
    } catch (error) {
      console.log(error, "error updating/inserting shipping information");
      res.status(500).json({ error: "An error occurred while updating/inserting shipping information" });
    }
  });
  
  // Update return policy or insert new row if vendor_id doesn't exist
  app.post("/updateReturnPolicy", async (req, res) => {
    const { return_policy, vendor_id } = req.body;
  
    try {
      // Check if the vendor_id exists in vendorpolicies table
      const checkQuery = "SELECT * FROM vendorpolicies WHERE vendor_id = $1";
      const checkResult = await pool.query(checkQuery, [vendor_id]);
  
      if (checkResult.rows.length > 0) {
        // If vendor_id exists, update return_policy
        const updateQuery = "UPDATE vendorpolicies SET return_policy = $1 WHERE vendor_id = $2";
        const updateValues = [return_policy, vendor_id];
        await pool.query(updateQuery, updateValues);
        res.status(200).json({ message: "Return policy updated successfully" });
      } else {
        // If vendor_id doesn't exist, insert new row with the provided vendor_id and return_policy
        const insertQuery = "INSERT INTO vendorpolicies (vendor_id, return_policy) VALUES ($1, $2)";
        const insertValues = [vendor_id, return_policy];
        await pool.query(insertQuery, insertValues);
        res.status(200).json({ message: "New row inserted with return policy" });
      }
    } catch (error) {
      console.log(error, "error updating/inserting return policy");
      res.status(500).json({ error: "An error occurred while updating/inserting return policy" });
    }
  });
  
  
// Update business policy or insert new row if vendor_id doesn't exist
app.post("/updateBusinessPolicy", async (req, res) => {
    const { business_policy, vendor_id } = req.body;
  
    try {
      // Check if the vendor_id exists in vendorpolicies table
      const checkQuery = "SELECT * FROM vendorpolicies WHERE vendor_id = $1";
      const checkResult = await pool.query(checkQuery, [vendor_id]);
  
      if (checkResult.rows.length > 0) {
        // If vendor_id exists, update business_policy
        const updateQuery = "UPDATE vendorpolicies SET business_policy = $1 WHERE vendor_id = $2";
        const updateValues = [business_policy, vendor_id];
        await pool.query(updateQuery, updateValues);
        res.status(200).json({ message: "Business policy updated successfully" });
      } else {
        // If vendor_id doesn't exist, insert new row with the provided vendor_id and business_policy
        const insertQuery = "INSERT INTO vendorpolicies (vendor_id, business_policy) VALUES ($1, $2)";
        const insertValues = [vendor_id, business_policy];
        await pool.query(insertQuery, insertValues);
        res.status(200).json({ message: "New row inserted with business policy" });
      }
    } catch (error) {
      console.log(error, "error updating/inserting business policy");
      res.status(500).json({ error: "An error occurred while updating/inserting business policy" });
    }
  });
  



// app.post("/postpoliciesbyVendorid", async (req, res) => {
//     const { shipping_information, return_policy, business_policy } = req.body;
  
//     try {
//       let query = "UPDATE vendorpolicies SET ";
//       let values = [];
//       let updateFields = [];
  
//       if (shipping_information) {
//         updateFields.push('shipping_information = $1');
//         values.push(shipping_information);
//       }
  
//       if (return_policy) {
//         updateFields.push('return_policy = $2');
//         values.push(return_policy);
//       }
  
//       if (business_policy) {
//         updateFields.push('business_policy = $3');
//         values.push(business_policy);
//       }
  
//       if (values.length === 0) {
//         return res.status(400).json({ error: "No valid fields provided for update" });
//       }
  
//       query += updateFields.join(", ") + " WHERE vendor_id = $4";
//       values.push(req.body.vendor_id); // Assuming vendor_id is also provided in req.body
  
//       const result = await pool.query(query, values);
//       res.status(200).json({ message: "Vendor policies updated successfully" });
//     } catch (error) {
//       console.log(error, "error Posting vendor policies");
//       res.status(500).json({ error: "An error occurred while updating vendor policies" });
//     }
//   });

    

   




module.exports = app   