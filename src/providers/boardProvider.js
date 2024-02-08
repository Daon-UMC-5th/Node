const {
  getBoardData,
  getOneBoardData,
  countLikeData,
  allLikeData,
  allCommentData,
  infoBoard,
} = require("../models/boardDAO.js");
const {
  boardDTO,
  oneBoardDTO,
  boardCommentDTO,
} = require("../dtos/boardDTO.js");

//게시판 가져오기
const getBoardType = async (param, query) => {
  try {
    boardresult = await getBoardData({
      board_type: param,
      offset: query,
    });
    if (boardresult == -1) {
      throw console.log("error");
    } else {
      return await boardDTO(boardresult);
    }
  } catch (error) {
    throw error;
  }
};

const getBoardId = async (param, user) => {
  try {
    oneboardresult = await getOneBoardData({
      board_id: param,
      user_id: user,
    });
    if (oneboardresult == -1) {
      throw console.log("error");
    } else {
      return await oneBoardDTO(oneboardresult);
    }
  } catch (error) {
    throw error;
  }
};

//좋아요 수 가져오기
const countLike = async (param) => {
  try {
    return await countLikeData(param);
  } catch (error) {
    throw error;
  }
};

const countAllLike = async (query) => {
  try {
    return await allLikeData({
      offset: query,
    });
  } catch (error) {
    throw error;
  }
};

//댓글 가져오기
const getAllComment = async (param, query) => {
  try {
    comments = await allCommentData({
      board_id: param,
      offset: query,
    });
    if (comments == -1) {
      throw console.log("error");
    } else {
      return await boardCommentDTO(comments);
    }
  } catch (error) {
    throw error;
  }
};

const boardInfo = async (boardType, body, user_id) => {
  try {
    comments = await infoBoard({
      boardType: boardType,
      body: body,
      user_id: user_id,
    });
    console.log(comments);
    if (comments == -1) {
      throw console.log("error");
    } else {
      return comments;
    }
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getBoardType,
  getBoardId,
  countLike,
  countAllLike,
  getAllComment,
  boardInfo,
};
