// reportController.js
const ReportService = require("../services/reportService");
const ReportDto = require("../dtos/reportDTO");
const response = require("../config/response");

// 일기장 신고
exports.reportDiary = async (req, res) => {
  try {
    // 유저 id, 일기 id, 일기, 이유
    const reportDto = new ReportDto(
      req.user,
      "diary",
      req.params.diaryId,
      req.body.reason
    );
    const reportResult = await ReportService.createReport(reportDto);

    // 이미 사용자가 신고 했을 떄 사용
    if (reportResult.reported) {
      return res
        .status(409)
        .json(
          response(
            { isSuccess: false, code: 409, message: `이미 신고한 내용입니다.` },
            {}
          )
        );
      // 일기장이 존재하지 않았을 떄
    } else if (reportResult.invalidTypeId) {
      return res.status(404).json(
        response(
          {
            isSuccess: false,
            code: 404,
            message: `일기 ID가 존재하지 않습니다.`,
          },
          {}
        )
      );
      // 신고 완료
    } else {
      return res.status(200).json(
        response(
          {
            isSuccess: true,
            code: 200,
            message: `신고 처리가 완료되었습니다.`,
          },
          {}
        )
      );
    }
    // 기타 error
  } catch (error) {
    return res
      .status(500)
      .json(
        response({ isSuccess: false, code: 500, message: error.message }, {})
      );
  }
};

// 게시판 신고
exports.reportBoard = async (req, res) => {
  try {
    // 유저 id, 일기 id, 일기, 이유
    const reportDto = new ReportDto(
      req.user,
      "board",
      req.params.boardId,
      req.body.reason
    );
    const reportResult = await ReportService.createReport(reportDto);

    // 이미 사용자가 신고 했을 떄 사용
    if (reportResult.reported) {
      return res
        .status(409)
        .json(
          response(
            { isSuccess: false, code: 409, message: `이미 신고한 내용입니다.` },
            {}
          )
        );
      // 일기장이 존재하지 않았을 떄
    } else if (reportResult.invalidTypeId) {
      return res.status(404).json(
        response(
          {
            isSuccess: false,
            code: 404,
            message: `게시판 ID가 존재하지 않습니다.`,
          },
          {}
        )
      );
      // 신고 완료
    } else {
      return res.status(200).json(
        response(
          {
            isSuccess: true,
            code: 200,
            message: `신고 처리가 완료되었습니다.`,
          },
          {}
        )
      );
    }
    // 기타 error
  } catch (error) {
    return res
      .status(500)
      .json(
        response({ isSuccess: false, code: 500, message: error.message }, {})
      );
  }
};

// 게시판 신고
exports.reportComment = async (req, res) => {
  try {
    // 유저 id, 일기 id, 일기, 이유
    const reportDto = new ReportDto(
      req.user,
      "comment",
      req.params.commentId,
      req.body.reason
    );
    const reportResult = await ReportService.createReport(reportDto);

    // 이미 사용자가 신고 했을 떄 사용
    if (reportResult.reported) {
      return res
        .status(409)
        .json(
          response(
            { isSuccess: false, code: 409, message: `이미 신고한 내용입니다.` },
            {}
          )
        );
      // 일기장이 존재하지 않았을 떄
    } else if (reportResult.invalidTypeId) {
      return res.status(404).json(
        response(
          {
            isSuccess: false,
            code: 404,
            message: `댓글 ID가 존재하지 않습니다.`,
          },
          {}
        )
      );
      // 신고 완료
    } else {
      return res.status(200).json(
        response(
          {
            isSuccess: true,
            code: 200,
            message: `신고 처리가 완료되었습니다.`,
          },
          {}
        )
      );
    }
    // 기타 error
  } catch (error) {
    return res
      .status(500)
      .json(
        response({ isSuccess: false, code: 500, message: error.message }, {})
      );
  }
};
