// noinspection JSUnusedGlobalSymbols,JSUnusedGlobalSymbols

import * as path from "path";
export function getS3Client() {
  const AWS_ACCESS_KEY_ID =
    process.env.QM_AWS_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID; // Netlify has their own
  const AWS_SECRET_ACCESS_KEY =
    process.env.QM_AWS_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY; // Netlify has their own
  const s3Options = {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY
  };
  const AWS = require("aws-sdk");
  return new AWS.S3(s3Options);
}
export function uploadToS3(
  filePath: string,
  s3BasePath: string,
  cb: (arg0: any) => void,
  s3Bucket = "quantimodo",
  ACL = "public-read"
) {
  const s3 = getS3Client();
  const fs = require("fs");
  const fileContent = fs.readFileSync(filePath);
  const fileName = path.basename(filePath);
  const s3Key = s3BasePath + "/" + fileName;
  const params = {
    ACL,
    Bucket: s3Bucket,
    Key: s3Key,
    Body: fileContent
  };
  s3.upload(params, (err: any, data: { Location: any }) => {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
    if (cb) {
      cb(data);
    }
  });
}