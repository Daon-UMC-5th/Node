const SwaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // OpenAPI 버전을 추가
    info: {
      title: "DAON API",
      version: "1.0.0",
      description: "DAON API with express, API 설명",
    },
    host: "localhost:3000",
    basePath: "/", // 'basepath' 대신 'basePath'를 사용
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

module.exports.specs = SwaggerJsdoc(options);

