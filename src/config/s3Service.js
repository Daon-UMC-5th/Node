const { S3 } = require("aws-sdk");
const uuid = require("uuid").v4;
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

exports.s3Uploadv2 = async (type, file) => {
  const s3 = new S3();

  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${type}/${uuid()}-${file.originalname}`,
    Body: file.buffer,
  };

  return await s3.upload(param).promise();
};
