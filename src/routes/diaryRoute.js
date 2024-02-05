const express = require('express');
const { getPrivateDiary, getPublicDiary, getOneDiary, postDiary, putDiary, deleteDiary, diaryLikeUp, diaryLikeDown} = require('../controllers/diaryController.js')

const diaryRouter = express.Router();

diaryRouter.use((req,res,next) => {
    req.user_id = 1;
    next();
})

//게시판 전체 가져오기
diaryRouter.get('/get-private', (req, res) => {
    getPrivateDiary(req, res);
});
diaryRouter.get('/get-public',(req, res) => {
    getPublicDiary(req, res);
});
diaryRouter.get('/get-one-diary/:diaryId', getOneDiary);
diaryRouter.post('/write/post', postDiary);
diaryRouter.put('/write/put/:diaryId', putDiary);
diaryRouter.delete('/write/delete/:diaryId', deleteDiary);

diaryRouter.post('/like-up/:diaryId', diaryLikeUp);
diaryRouter.delete('/like-down/:diaryId', diaryLikeDown);

module.exports = diaryRouter;