const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController.js");

authRouter.post("/sms/code", authController.authorizeBySMS);
authRouter.post("/sms/code/check", authController.checkCodeFromSMS);
module.exports = authRouter;
