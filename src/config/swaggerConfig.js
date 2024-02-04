const SwaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DAON API",
      version: "1.0.0",
      description: "DAON API with express, API 설명",
    },
    host: "localhost:3000",
    basepath: "/",
  },
  apis: ["./src/routes/*.js", "./swagger/*"],
};

module.exports.specs = SwaggerJsdoc(options);
