// const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const uuid = require("uuid").v4;
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// exports.s3Uploadv2 = async (type, file) => {
//   const s3 = new S3();

//   const param = {
//     Bucket: process.env.AWS_BUCKET_NAME,
//     Key: `${type}/${uuid()}-${file.originalname}`,
//     Body: file.buffer,
//   };

//   return await s3.upload(param).promise();
// };

exports.s3Uploadv3 = async (type, file) => {
  // S3 클라이언트 인스턴스를 생성합니다.
  const s3 = new S3Client({
    region: process.env.AWS_REGION, // 환경변수에서 AWS 리전을 설정합니다.
  });

  // 파일을 저장할 위치와 이름을 지정합니다.
  const key = `${type}/${uuid()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME, // 환경변수에서 버킷 이름을 설정합니다.
    Key: key,
    Body: file.buffer, // 업로드할 파일의 내용입니다.
  };

  // PutObjectCommand를 생성하고 s3.send()를 사용하여 실행합니다.
  const command = new PutObjectCommand(params);
  try {
    const response = await s3.send(command);
    // 업로드된 파일의 URL을 생성합니다.
    // 여기서는 리전과 버킷 이름을 사용하여 URL을 구성합니다.
    const url = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    response.Location = url;
    console.log("File uploaded successfully. URL:", url);
    return response; // 업로드된 파일의 URL을 반환합니다.
  } catch (error) {
    console.error("Error uploading to S3", error);
    throw error; // 에러를 캐치하고 로그를 남긴 후 에러를 다시 던집니다.
  }
};
