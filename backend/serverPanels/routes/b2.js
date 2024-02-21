const express = require("express");
const app = express();
const pool = require("../config");
const cors = require("cors");
const s3 = require("../config/b2-config");
const {
    CreateBucketCommand,
    PutObjectCommand,
    DeleteBucketCommand,
    DeleteObjectCommand,
    ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
const { v4: uuid } = require("uuid");

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.pool = pool;
    next();
});

// Function to create a bucket
async function createBucket(bucketName) {
    try {
        await s3.send(new CreateBucketCommand({ Bucket: bucketName }));
        console.log("Bucket created successfully:", bucketName);
        return {
            success: true,
            message: "Bucket created successfully",
            bucketName,
        };
    } catch (err) {
        console.error("Error creating bucket:", err);
        return {
            success: false,
            message: "Error creating bucket",
            error: err.message,
        };
    }
}


// Function to create a folder in a bucket
async function createFolder(bucketName, folderName) {
    try {
        await s3.send(
            new PutObjectCommand({ Bucket: bucketName, Key: folderName + "/" })
        );

        console.log("Folder created successfully:", bucketName + "/" + folderName);
        return {
            success: true,
            message: "Folder created successfully",
            folderPath: bucketName + "/" + folderName,
        };
    } catch (err) {
        console.error("Error creating folder:", err);
        return {
            success: false,
            message: "Error creating folder",
            error: err.message,
        };
    }
}

// Function to delete a bucket and its contents
async function deleteBucket(bucketName) {
    try {
        const listObjectsResult = await s3.send(
            new ListObjectsV2Command({ Bucket: bucketName })
        );
        const objectKeys = listObjectsResult.Contents
            ? listObjectsResult.Contents.map((obj) => ({ Key: obj.Key }))
            : [];

        // Delete each object in the bucket
        for (const obj of objectKeys) {
            await s3.send(
                new DeleteObjectCommand({ Bucket: bucketName, Key: obj.Key })
            );
        }

        // Delete the bucket itself
        await s3.send(new DeleteBucketCommand({ Bucket: bucketName }));

        console.log("Bucket and its contents deleted successfully:", bucketName);
        return {
            success: true,
            message: "Bucket and its contents deleted successfully",
            bucketName,
        };
    } catch (err) {
        console.error("Error deleting bucket:", err);
        return {
            success: false,
            message: "Error deleting bucket",
            error: err.message,
        };
    }
}

// Function to upload a file to the specified folder in the bucket
async function uploadFile(bucketName, folderName, file) {
    if (file.originalname) {
        const uniqueFileName = uuid() + "_" + file.originalname;
        const key = folderName ? folderName + "/" + uniqueFileName : uniqueFileName;
        console.log(folderName);
        try {
            await s3.send(
                new PutObjectCommand({ Bucket: bucketName, Key: key, Body: file.buffer })
            );
            const fileUrl = `https://${bucketName}.s3.us-east-005.backblazeb2.com/${key}`;

            console.log("Successfully uploaded file to " + fileUrl);
            return { success: true, message: "File uploaded successfully", key };
        } catch (err) {
            console.error("Error uploading file:", err);
            return {
                success: false,
                message: "Error uploading file",
                error: err.message,
            };
        }
    } else {
        return { success: false, message: "Link Not Accepted", error: 'Error Occured' };

    }
}

// Function to delete an object
async function deleteFile(bucketName, folderName, fileName) {
    const key = folderName ? folderName + "/" + fileName : fileName;

    try {
        await s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
        console.log("File deleted successfully:", key);
        return {
            success: true,
            message: "File deleted successfully",
            filePath: bucketName + "/" + key,
        };
    } catch (err) {
        console.error("Error deleting file:", err);
        return {
            success: false,
            message: "Error deleting file",
            error: err.message,
        };
    }
}

// Function to upload multiple files to the specified folder in the bucket
async function uploadMultipleFiles(bucketName, folderName, files) {
    const uploadPromises = files.map((file) => {
        return new Promise(async (resolve, reject) => {
            const uniqueFileName = uuid() + "_" + file.originalname;
            const key = folderName
                ? folderName + "/" + uniqueFileName
                : uniqueFileName;

            try {
                await s3.send(
                    new PutObjectCommand({
                        Bucket: bucketName,
                        Key: key,
                        Body: file.buffer,
                    })
                );

                console.log("Successfully uploaded file to " + bucketName + "/" + key);
                resolve(`${key}`);
            } catch (uploadError) {
                console.error("Error uploading file:", uploadError);

                try {
                    await s3.send(
                        new DeleteObjectCommand({ Bucket: bucketName, Key: key })
                    );
                } catch (deleteError) {
                    console.error("Error deleting file:", deleteError);
                }

                reject(uploadError);
            }
        });
    });

    try {
        const uploadedFileUrls = await Promise.all(uploadPromises);
        return {
            success: true,
            message: "File upload completed",
            uploadedFileUrls,
        };
    } catch (err) {
        console.log("Error: ", err);
        return {
            success: false,
            message: "Error during file upload",
            error: err.message,
        };
    }
}

// Function to delete multiple files in a bucket
async function deleteMultipleFiles(bucketName, fileKeys) {
    try {
        for (const key of fileKeys) {
            await s3.send(new DeleteObjectCommand({ Bucket: bucketName, Key: key }));
            console.log("File deleted successfully:", key);
        }

        return { success: true, message: "Files deleted successfully" };
    } catch (err) {
        console.error("Error deleting files:", err);
        return {
            success: false,
            message: "Error deleting files",
            error: err.message,
        };
    }
}

module.exports = {
    createBucket,
    createFolder,
    deleteBucket,
    uploadFile,
    deleteFile,
    uploadMultipleFiles,
    deleteMultipleFiles,
};