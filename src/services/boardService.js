const { writeBoardData, returnWriteBoardData, modifyBoardData, eraseBoardData, postLikeData, countLikeData, deleteLikeData, addScrapeData, subScrapeData, writeCommentData, modifyCommentData, eraseCommentData, allCommentData } = require('../models/boardDAO.js')
const response = require('../config/response.js');
const status = require('../config/responseStatus.js');

const writeBoard = async(param, body, user) => {
    returnData = await writeBoardData({
        "board_type" : param,
        "user_id" : user,
        "title" : body.title,
	    "content" : body.content,  
    }); 
    if (returnData == -1){
        throw response(status.INTERNAL_SERVER_ERROR);
    }else{
        return await returnWriteBoardData (returnData);
    }
};

const modifyBoard = async(param, body) => {
    returnModifyData = await modifyBoardData({
        "board_id" : param,
        "title" : body.title,
	    "content" : body.content,  
    }); 
    if (returnModifyData == -1){
        throw response(status.INTERNAL_SERVER_ERROR);
    }else{
        return await returnWriteBoardData (returnModifyData);
    }
};

const eraseBoard = async(param) => {
    await eraseBoardData({
        "board_id" : param, 
    }); 
};


const postLikeUp = async(param, user) => { 
    likeUpData = await postLikeData({
        "board_id" : param,
        "user_id" : user
    });
    if (likeUpData == -1){
        throw response(status.INTERNAL_SERVER_ERROR);
    }else{
        return await countLikeData(likeUpData);
    }
}

const deleteLike = async(param, user) => { 
    likeDownData = await deleteLikeData({
        "board_id" : param,
        "user_id" : user
    });
    if (likeDownData == -1){
        throw response(status.INTERNAL_SERVER_ERROR);
    }else{
        return await countLikeData(likeDownData);
    }
}

const addScrape = async(param, user) => { 
    await addScrapeData({
        "board_id" : param,
        "user_id" : user
    });
}

const subScrape = async(param, user) => { 
    await subScrapeData({
        "board_id" : param,
        "user_id" : user
    });
}

const writeComment = async(param, body, user) => {
    returnWriteComment = await writeCommentData({
        "user_id" : user,
        "board_id": param,
	    "content" : body.content,  
    }); 
    // if (returnWriteComment == -1){
    //     throw response(status.INTERNAL_SERVER_ERROR);
    // }else{
    //     return await allCommentData(returnWriteComment);
    // }
    return returnWriteComment
};

const modifyComment = async(param, body) => {
    returnModifyComment = await modifyCommentData({
        "comment_id" : param,
	    "content" : body.content,  
    }); 
    // if (returnModifyComment == -1){
    //     throw response(status.INTERNAL_SERVER_ERROR);
    // }else{
    //     return await allCommentData(returnModifyComment);
    // }
    return returnModifyComment
};

const eraseComment = async(param) => {
    returnEraseComment = await eraseCommentData({
        "comment_id" : param
    }); 
    // if (returnEraseComment == -1){
    //     throw response(status.INTERNAL_SERVER_ERROR);
    // }else{
    //     return await allCommentData(returnEraseComment);
    // }
    return returnEraseComment
};

module.exports = { writeBoard, modifyBoard, eraseBoard, postLikeUp, deleteLike, addScrape, subScrape, writeComment, modifyComment, eraseComment };