const express = require('express');
const { getMyBoard, getMyComment, getMyScrape, getMyPage, putProfile } = require('../controllers/mypageController.js')
const mypageRouter = express.Router();
const jwtMiddleware = require("./../config/jwtMiddleware.js");
const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');

mypageRouter.use(jwtMiddleware,(req,res,next) => {
    req.user_id = req.verifiedToken.user_id;
    if(req.user_id!==-1){next();}
    else{res.send(response(status.MEMBER_NOT_FOUND,{}))}
})

mypageRouter.get('/get-board', (req, res) => {
    getMyBoard(req, res);
});

mypageRouter.get('/get-comment', (req, res) => {
    getMyComment(req, res);
});

mypageRouter.get('/get-scrape', (req, res) => {
    getMyScrape(req, res);
});

mypageRouter.get('/get-page', (req, res) => {
    getMyPage(req, res);
});

mypageRouter.put('/change-profile', (req, res) => {
    putProfile(req, res);
});

module.exports = mypageRouter ;
