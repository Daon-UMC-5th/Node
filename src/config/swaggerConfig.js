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
    basePath: "/",
    // components: {
    //   securitySchemes: {
    //     api_key: {
    //       type: "apiKey",
    //       in: "header",
    //       name: "api-key",
    //       description:
    //         "JWT 토큰을 `api-key` 헤더를 통해 전송합니다. 토큰 형식은 JWT입니다.\n\nExample: `your_jwt_token`",
    //     },
    //   },
    // },
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

module.exports.specs = SwaggerJsdoc(options);
