const ReportService = require("../services/reportService");
const ReportDto = require("../dtos/reportDTO");
const response = require("../config/response");

// 일기장 신고
exports.reportDiary = async (req, res) => {
  try {
    const reportDto = new ReportDto(
      req.user_id,
      "diary",
      req.params.diaryId,
      req.body.reason
    );
    const reportResult = await ReportService.createReport(reportDto);
    handleReportResult(res, reportResult);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

// 게시판 신고
exports.reportBoard = async (req, res) => {
  try {
    const reportDto = new ReportDto(
      req.user_id,
      "board",
      req.params.boardId,
      req.body.reason
    );
    const reportResult = await ReportService.createReport(reportDto);
    handleReportResult(res, reportResult);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

// 댓글 신고
exports.reportComment = async (req, res) => {
  try {
    const reportDto = new ReportDto(
      req.user_id,
      "comment",
      req.params.commentId,
      req.body.reason
    );
    const reportResult = await ReportService.createReport(reportDto);
    handleReportResult(res, reportResult);
  } catch (error) {
    sendResponse(res, 500, error.message);
  }
};

const handleReportResult = (res, reportResult) => {
  if (reportResult.reported) {
    return sendResponse(res, 409, "이미 신고한 내용입니다.");
  } else if (reportResult.invalidTypeId) {
    return sendResponse(res, 404, "ID가 존재하지 않습니다.");
  } else {
    return sendResponse(res, 200, "이미 신고된 리소스입니다.");
  }
};

const sendResponse = (res, statusCode, message) => {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  return res
    .status(statusCode)
    .json(response({ isSuccess, code: statusCode, message }, {}));
};
