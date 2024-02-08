const { response } = require("../config/response.js");
const status = require("../config/responseStatus.js");
const {
  getBoardType,
  getBoardId,
  countLike,
  countAllLike,
  getAllComment,
  boardInfo,
} = require("../providers/boardProvider.js");
const {
  writeBoard,
  modifyBoard,
  eraseBoard,
  postLikeUp,
  deleteLike,
  addScrape,
  subScrape,
  writeComment,
  modifyComment,
  eraseComment,
  postLikeComment,
  deleteLikeComment,
  imageUpload,
} = require("../services/boardService.js");

//게시판
const getBoard = async (req, res) => {
  try {
    const boardTypeData = await getBoardType(
      req.params.boardType,
      req.query.offset
    );
    res.send(response(status.SUCCESS, boardTypeData));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const getOneBoard = async (req, res) => {
  try {
    const boardIdData = await getBoardId(req.params.boardId, req.user_id);
    res.send(response(status.SUCCESS, boardIdData));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const postBoard = async (req, res) => {
  try {
    // 이미지
    var img;
    if (req.file) {
      img = req.file.location;
    } else {
      img = null;
      return res.send(response(status.IMAGE_NULL, {}));
    }

    console.log("profileImg:", img);
    console.log(`테스트 user_id: ${req.user_id}`);
    // 게시판 글 업로드
    const board = await writeBoard(req.params.boardType, req.body, req.user_id);
    console.log(board);
    // board_id 찾기
    const board_id = await boardInfo(
      req.params.boardType,
      req.body,
      req.user_id
    );
    console.log(board_id);
    // 게시판 사진 업로드
    const image = await imageUpload(board_id, img);
    return res.send(response(status.SUCCESS, {}));
  } catch (error) {
    console.error("Error acquiring connection:", error);
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const putBoard = async (req, res) => {
  try {
    res.send(
      response(status.SUCCESS, await modifyBoard(req.params.boardId, req.body))
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const deleteBoard = async (req, res) => {
  try {
    res.send(response(status.SUCCESS, await eraseBoard(req.params.boardId)));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

//좋아요
const likeUp = async (req, res) => {
  try {
    res.send(
      response(
        status.SUCCESS,
        await postLikeUp(req.params.boardId, req.user_id)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

const likeDown = async (req, res) => {
  try {
    res.send(
      response(
        status.SUCCESS,
        await deleteLike(req.params.boardId, req.user_id)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

const getLike = async (req, res) => {
  try {
    res.send(response(status.SUCCESS, await countLike(req.params.boardId)));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

const getAllLikeBoard = async (req, res) => {
  try {
    res.send(response(status.SUCCESS, await countAllLike(req.query.offset)));
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

//스크랩
const postScrape = async (req, res) => {
  try {
    res.send(
      response(status.SUCCESS, await addScrape(req.params.boardId, req.user_id))
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const cancelScrape = async (req, res) => {
  try {
    res.send(
      response(status.SUCCESS, await subScrape(req.params.boardId, req.user_id))
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

//댓글
const getComment = async (req, res) => {
  try {
    res.send(
      response(
        status.SUCCESS,
        await getAllComment(req.params.boardId, req.query.offset)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

const postComment = async (req, res) => {
  try {
    const getBoardId = await writeComment(
      req.params.boardId,
      req.body,
      req.user_id
    );
    res.send(
      response(
        status.SUCCESS,
        await getAllComment(getBoardId.board_id, req.query.offset)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const putComment = async (req, res) => {
  try {
    const getBoardId = await modifyComment(req.params.commentId, req.body);
    res.send(
      response(
        status.SUCCESS,
        await getAllComment(getBoardId.board_id, req.query.offset)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
const deleteComment = async (req, res) => {
  try {
    const getBoardId = await eraseComment(req.params.commentId);
    res.send(
      response(
        status.SUCCESS,
        await getAllComment(getBoardId.board_id, req.query.offset)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

const likeUpComment = async (req, res) => {
  try {
    res.send(
      response(
        status.SUCCESS,
        await postLikeComment(req.params.commentId, req.user_id)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};

const likeDownComment = async (req, res) => {
  try {
    res.send(
      response(
        status.SUCCESS,
        await deleteLikeComment(req.params.commentId, req.user_id)
      )
    );
  } catch (error) {
    res.send(response(status.INTERNAL_SERVER_ERROR));
  }
};
module.exports = {
  getBoard,
  getOneBoard,
  postBoard,
  putBoard,
  deleteBoard,
  likeUp,
  likeDown,
  getLike,
  getAllLikeBoard,
  postScrape,
  cancelScrape,
  getComment,
  postComment,
  putComment,
  deleteComment,
  likeUpComment,
  likeDownComment,
};
