const { writeBoardData, returnWriteBoardData, modifyBoardData, eraseBoardData, postLikeData, countLikeData, deleteLikeData, addScrapeData, subScrapeData, writeCommentData, modifyCommentData, eraseCommentData, postLikeCommentData, deleteLikeCommentData, countLikeCommentData, allCommentData } = require('../models/boardDAO.js')
const {response} = require('../config/response.js');
const status = require('../config/responseStatus.js');
const { oneBoardDTO } = require('../dtos/boardDTO.js');

const writeBoard = async(param, body, user) => {
    try{
    returnData = await writeBoardData({
        "board_type" : param,
        "user_id" : user,
        "title" : body.title,
	    "content" : body.content,  
    }); 
    console.log(returnData);
        if (returnData == -1){throw response(status.INTERNAL_SERVER_ERROR);}
        else{return await oneBoardDTO(await returnWriteBoardData (returnData));}
    }catch (error) { throw error;}
};

const modifyBoard = async(param, body) => {
    try{
    returnModifyData = await modifyBoardData({
        "board_id" : param,
        "title" : body.title,
	    "content" : body.content,  
    }); 
        if (returnModifyData == -1){throw response(status.INTERNAL_SERVER_ERROR);}
        else{ return await oneBoardDTO(await returnWriteBoardData (returnModifyData));}
    }catch (error) { throw error;}
};

const eraseBoard = async(param) => {
    try{
    await eraseBoardData(param); 
    }catch (error) { throw error;}
};



const postLikeUp = async(param, user) => { 
    try{
    likeUpData = await postLikeData({
        "board_id" : param,
        "user_id" : user
    });
        if (likeUpData == -1){throw response(status.INTERNAL_SERVER_ERROR);}
        else{return await countLikeData(likeUpData);}
    }catch (error) { throw error;}
}

const deleteLike = async(param, user) => { 
    try{
    likeDownData = await deleteLikeData({
        "board_id" : param,
        "user_id" : user
    });
        if (likeDownData == -1){throw response(status.INTERNAL_SERVER_ERROR);}
        else{return await countLikeData(likeDownData);}
    }catch (error) { throw error;}
}

const addScrape = async(param, user) => { 
    try{
    await addScrapeData({
        "board_id" : param,
        "user_id" : user
    });
    }catch (error) { throw error;}
}

const subScrape = async(param, user) => { 
    try{
    await subScrapeData({
        "board_id" : param,
        "user_id" : user
    });
    }catch (error) { throw error;}
}

const writeComment = async(param, body, user) => {
    try{
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
    }catch (error) { throw error;}
};

const modifyComment = async(param, body) => {
    try{
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
    }catch (error) { throw error;}
};

const eraseComment = async(param) => {
    try{
    returnEraseComment = await eraseCommentData({
        "comment_id" : param
    }); 
    // if (returnEraseComment == -1){
    //     throw response(status.INTERNAL_SERVER_ERROR);
    // }else{
    //     return await allCommentData(returnEraseComment);
    // }
    return returnEraseComment
    }catch (error) { throw error;}
};

const postLikeComment = async(param, user) => { 
    try{
    likeUpCommentData = await postLikeCommentData({
        "comment_id" : param,
        "user_id" : user
    });
        if(likeUpCommentData == -1){throw response(status.INTERNAL_SERVER_ERROR);}
        else{return await countLikeCommentData(likeUpCommentData);}
    }catch (error) { throw error;}
}

const deleteLikeComment = async(param, user) => { 
    try{
    likeDownCommentData = await deleteLikeCommentData({
        "comment_id" : param,
        "user_id" : user
    });
        if(likeDownCommentData == -1){throw response(status.INTERNAL_SERVER_ERROR);}
        else{return await countLikeCommentData(likeDownCommentData);}
    }catch (error) { throw error;}
}

module.exports = { writeBoard, modifyBoard, eraseBoard, postLikeUp, deleteLike, addScrape, subScrape, writeComment, modifyComment, eraseComment, postLikeComment, deleteLikeComment };