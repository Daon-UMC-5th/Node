const express = require('express');
const { getPrivateDiary, getPublicDiary, getImage, getOneDiary, postDiary, putDiary, deleteDiary, diaryLikeUp, diaryLikeDown} = require('../controllers/diaryController.js')
const jwtMiddleware = require("./../config/jwtMiddleware.js");
const diaryRouter = express.Router();
const response = require('../config/response.js');
const status = require('../config/responseStatus.js');

diaryRouter.use(jwtMiddleware,(req,res,next) => {
    req.user_id = req.verifiedToken.user_id;
    if(req.user_id!==-1){next();}
    else{res.send(response(status.MEMBER_NOT_FOUND))}
})


//게시판 전체 가져오기
diaryRouter.get('/get-private', (req, res) => {
    getPrivateDiary(req, res);
});
diaryRouter.get('/get-public',(req, res) => {
    getPublicDiary(req, res);
});
diaryRouter.get('/get-image/:year/:month', getImage);
diaryRouter.get('/get-one-diary/:diaryDate', getOneDiary);
diaryRouter.post('/write/post/:diaryDate', postDiary);
diaryRouter.put('/write/put/:diaryDate', putDiary);
diaryRouter.delete('/write/delete/:diaryDate', deleteDiary);

diaryRouter.post('/like-up/:diaryId', diaryLikeUp);
diaryRouter.delete('/like-down/:diaryId', diaryLikeDown);

module.exports = diaryRouter;