const express = require('express');
const { getPrivateDiary, getPublicDiary, postDiary, putDiary, deleteDiary, diaryLikeUp, diaryLikeDown} = require('../controllers/diaryController.js')

const diaryRouter = express.Router();

diaryRouter.use((req,res,next) => {
    req.user_id = 1;
    next();
})

diaryRouter.get('/getPrivate', (req, res) => {
    getPrivateDiary(req, res);
});
diaryRouter.get('/getPublic',(req, res) => {
    getPublicDiary(req, res);
});
diaryRouter.post('/write/post', postDiary);
diaryRouter.put('/write/put/:diaryId', putDiary);
diaryRouter.delete('/write/delete/:diaryId', deleteDiary);

diaryRouter.post('/likeUp/:diaryId', diaryLikeUp);
diaryRouter.delete('/likeDown/:diaryId', diaryLikeDown);

module.exports = diaryRouter;