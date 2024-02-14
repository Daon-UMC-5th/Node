const express = require("express");
const loginRouter = express.Router();
const loginController = require("../controllers/loginController.js");
const status = require('../config/responseStatus.js');
const {response} = require("../config/response.js");
const jwtMiddleware = require("./../config/jwtMiddleware.js");

calendarRouter.use(jwtMiddleware,(req,res,next) => {
    req.user_id = req.verifiedToken.user_id;
    if(req.user_id!==-1) next();
    else res.send(response(status.MEMBER_NOT_FOUND));
})

