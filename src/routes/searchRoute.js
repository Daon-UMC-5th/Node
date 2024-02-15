const express = require("express");
const searchController = require("../controllers/searchController.js");
const status = require('../config/responseStatus.js');
const {response} = require("../config/response.js");
const searchRouter = express.Router();

const jwtMiddleware = require("../config/jwtMiddleware.js");

searchRouter.use(jwtMiddleware,(req,res,next) => {
    req.user_id = req.verifiedToken.user_id;
    if(req.user_id!==-1) next();
    else res.send(response(status.MEMBER_NOT_FOUND,{}));
})
// 개인 일기장 검색 
searchRouter.post("/diary/private", searchController.searchPrivateInDiary);
// 공유 일기장 검색
searchRouter.post("/diary/public", searchController.searchPublicInDiary);

searchRouter.post("/board", searchController.searchInBoard);

module.exports = searchRouter;