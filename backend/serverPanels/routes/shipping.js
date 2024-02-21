const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const axios = require("axios");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

const DHL_API_KEY = "apE7wU7iZ4lP3n";
const DHL_API_SECRET = "O!9gR^6cQ!1xX!9b";
const DHL_API_ENDPOINT = "https://express.api.dhl.com/mydhlapi/test/shipments?strictValidation=false&bypassPLTError=false&validateDataOnly=false"; // Replace with the actual DHL API endpoint

app.get('/dhl-api/onepiece', async (req, res) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://express.api.dhl.com/mydhlapi/test/products',
      params: {
        accountNumber: '939631520',
        originCountryCode: 'CZ',
        originCityName: 'Prague',
        destinationCountryCode: 'IN',
        destinationPostalCode:'410208',
        destinationCityName: 'Taloja',
        weight: '5',
        length: '15',
        width: '10',
        height: '25',
        plannedShippingDate: '2024-02-02',
        isCustomsDeclarable: false,
        unitOfMeasurement: 'metric'
      },
      headers: {
        'Message-Reference': 'd0e7832e-5c98-11ea-bc55-0242ac13',
        'Message-Reference-Date': 'Wed, 21 Oct 2015 07:28:00 GMT',
        'Plugin-Name': 'SOME_STRING_VALUE',
        'Plugin-Version': 'SOME_STRING_VALUE',
        'Shipping-System-Platform-Name': 'SOME_STRING_VALUE',
        'Shipping-System-Platform-Version': 'SOME_STRING_VALUE',
        'Webstore-Platform-Name': 'SOME_STRING_VALUE',
        'Webstore-Platform-Version': 'SOME_STRING_VALUE',
        Authorization: `Basic ${Buffer.from('apE7wU7iZ4lP3n:O!9gR^6cQ!1xX!9b').toString('base64')}`
      }
    };

    const response = await axios.request(options);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || 'Something went wrong');
  }
});


app.post("/dhl-api/multipiece",async(req,res) => {
  try {
    const options = {
      method: 'POST',
      url: 'https://express.api.dhl.com/mydhlapi/test/rates',
      headers: {
        'content-type': 'application/json',
        'Message-Reference': 'd0e7832e-5c98-11ea-bc55-0242ac13',
        'Message-Reference-Date': 'Wed, 21 Oct 2015 07:28:00 GMT',
        // 'Plugin-Name': 'SOME_STRING_VALUE',
        // 'Plugin-Version': 'SOME_STRING_VALUE',
        // 'Shipping-System-Platform-Name': 'SOME_STRING_VALUE',
        // 'Shipping-System-Platform-Version': 'SOME_STRING_VALUE',
        // 'Webstore-Platform-Name': 'SOME_STRING_VALUE',
        // 'Webstore-Platform-Version': 'SOME_STRING_VALUE',
        Authorization: `Basic ${Buffer.from('apE7wU7iZ4lP3n:O!9gR^6cQ!1xX!9b').toString('base64')}`
     
      },
      data: {
        "customerDetails": {
          "shipperDetails": {
            "postalCode": "400709",
            "cityName": "SINGAPORE",
            "addressLine1": "Blk 6 Lock Rd",
            "addressLine2": "02-10 Gillman Barracks",
            "addressLine3": "Barrack Street",
            "countryCode": "IN"
          },
          "receiverDetails": {
            "postalCode": "410208",
            "cityName": "PARIS",
            "addressLine1": "9",
            "addressLine2": "Rue Simart",
            "countryCode": "IN"
          }
        },
        "accounts": [
          {
            "typeCode": "shipper",
            "number": "939631520"
          }
        ],
        "productsAndServices": [
          {
            "productCode": "C",
            "localProductCode": "C"
          }
        ],
        "payerCountryCode": "IN",
        "plannedShippingDateAndTime": "2024-11-20T13:00:00GMT+00:00",
        "unitOfMeasurement": "metric",
        "isCustomsDeclarable": true,
        "monetaryAmount": [
          {
            "typeCode": "declaredValue",
            "value": 100,
            "currency": "SGD"
          }
        ],
        "estimatedDeliveryDate": {
          "isRequested": true,
          "typeCode": "QDDC"
        },
        "getAdditionalInformation": [
          {
            "typeCode": "allValueAddedServices",
            "isRequested": true
          }
        ],
        "returnStandardProductsOnly": false,
        "nextBusinessDay": true,
        "productTypeCode": "all",
        "packages": [
          {
            "typeCode": "3BX",
            "weight": 0.1,
            "dimensions": {
              "length": 10,
              "width": 20,
              "height": 30
            }
          },
          {
            "typeCode": "3BX",
            "weight": 1,
            "dimensions": {
              "length": 10,
              "width": 20,
              "height": 30
            }
          },
          
          {
            "typeCode": "3BX",
            "weight": 10,
            "dimensions": {
              "length": 10,
              "width": 20,
              "height": 30
            }
          }
        ]
      }
    };


    const response = await axios.request(options);
    console.log(response);
    res.status(response.status).send(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).send(error.response?.data || 'Something went wrong');
  }

  })
 
module.exports = app;
