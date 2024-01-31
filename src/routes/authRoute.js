const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController.js");

authRouter.post("/email/code", authController.authorizeByEmail);
authRouter.post("/email/code/check", authController.checkCodeFromEmail);
module.exports = authRouter;
