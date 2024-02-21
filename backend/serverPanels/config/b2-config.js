const { S3Client } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
    endpoint: "https://s3.us-east-005.backblazeb2.com",
    region: "us-east-005",
    credentials: {
        accessKeyId: "00545020f39bf180000000001",
        secretAccessKey: "K005vcvGt3lmhGS31XH3305Ra+52Uzw",
    },
});

module.exports = s3;