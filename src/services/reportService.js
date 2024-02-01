// services/reportService.js
const ReportModel = require("../models/reportModel");

class ReportService {
  async createReport(reportDto) {
    // DTO 내부의 데이터 사용
    const { userId, type, typeId, reason } = reportDto;

    // typeId 유효성 검사 (여기서 추가 로직 구현)
    const typeExists = await ReportModel.checkIfExists({
      type,
      typeId,
    });
    if (!typeExists) {
      return { invalidTypeId: true };
    }

    // 신고 한 기록이 있는지 확인
    const hasReported = await ReportModel.hasReported({
      userId: userId,
      type,
      typeId,
    });
    if (hasReported) {
      return { reported: true };
    }

    // 신고 정보 생성 (report 테이블에 신고 내용 삽입)
    const reportId = await ReportModel.createReport({ userId, reason });

    // report_(diary or board or comment) 테이블에 정보 삽입
    const reportTypeId = await ReportModel.createType({
      type,
      typeId,
      reportId,
    });

    return true;
  }
}

module.exports = new ReportService();
