const UploadDto = require("../dtos/uploadDto");
const UploadService = require("./../services/uploadService.js");
const { response, errResponse2 } = require("../config/response");
const status = require("../config/responseStatus.js");

// 회원가입 과정 프로필 사진 업로드
exports.uploadUserInitial = async (req, res) => {
  try {
    const uploadDto = new UploadDto("profile", null, req.files[0]);
    const resultUrl = await UploadService.initialUpload(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 회원가입 과정 의사 면허증 업로드
exports.uploadDoctorInitial = async (req, res) => {
  try {
    const uploadDto = new UploadDto("doctor", null, req.files[0]);
    const resultUrl = await UploadService.initialUpload(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 일기장 사진 업로드
exports.uploadDiary = async (req, res) => {
  try {
    const uploadDto = new UploadDto("diary", req.params.diaryId, req.files[0]);
    const resultUrl = await UploadService.createUpload(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 일기장 사진 삭제
exports.deleteDiary = async (req, res) => {
  try {
    const uploadDto = new UploadDto("diary", req.params.diaryId, null);
    const result = await UploadService.deleteImage(uploadDto);
    return res.send(response(status.SUCCESS, { deletedCount: result }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 일기장 사진 수정
exports.updateDiary = async (req, res) => {
  try {
    const uploadDto = new UploadDto("diary", req.params.diaryId, req.files[0]);
    const resultUrl = await UploadService.createUploadAndUpdate(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    res.json({ status: "error", result: error.message });
  }
};

// 게시판 사진 업로드
exports.uploadBoard = async (req, res) => {
  try {
    const uploadDto = new UploadDto("board", req.params.boardId, req.files[0]);
    const resultUrl = await UploadService.createUpload(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 게시판 사진 삭제
exports.deleteBoard = async (req, res) => {
  try {
    const uploadDto = new UploadDto("board", req.params.boardId, null);
    const result = await UploadService.deleteImage(uploadDto);
    return res.send(response(status.SUCCESS, { deletedCount: result }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 게시판 사진 수정
exports.updateBoard = async (req, res) => {
  try {
    const uploadDto = new UploadDto("board", req.params.boardId, req.files[0]);
    const resultUrl = await UploadService.createUploadAndUpdate(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    res.json({ status: "error", result: error.message });
  }
};

// 프로필 사진 업로드
exports.uploadProfile = async (req, res) => {
  try {
    const uploadDto = new UploadDto("profile", req.user_id, req.files[0]);
    const resultUrl = await UploadService.createUpload(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 프로필 사진 삭제
exports.deleteProfile = async (req, res) => {
  try {
    const uploadDto = new UploadDto("profile", req.user_id, null);
    const result = await UploadService.deleteImage(uploadDto);
    return res.send(response(status.SUCCESS, { deletedCount: result }));
  } catch (error) {
    console.log("error:", error);
    return handleErrorResponse(error, res);
  }
};

// 프로필 사진 수정
exports.updateProfile = async (req, res) => {
  try {
    const uploadDto = new UploadDto("profile", req.user_id, req.files[0]);
    const resultUrl = await UploadService.createUploadAndUpdate(uploadDto);
    return res.send(response(status.SUCCESS, { img_url: resultUrl }));
  } catch (error) {
    console.log("error:", error);
    res.json({ status: "error", result: error.message });
  }
};

// 에러 처리를 위한 유틸리티 함수
function handleErrorResponse(error, res) {
  const errorCode = error.code || 500;
  const errorMessage = error.message || "서버 내부 오류가 발생했습니다.";
  return res.status(errorCode).json(
    errResponse2(
      {
        isSuccess: false,
        code: errorCode,
        message: errorMessage,
      },
      {}
    )
  );
}
