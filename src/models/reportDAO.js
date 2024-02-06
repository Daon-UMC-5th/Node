const db = require("../config/database");

class ReportModel {
  // 클래스 레벨의 유효 타입 목록
  static validTypes = ["diary", "board", "comment"];

  // typeId가 유효한지 확인하는 메서드 (가상의 구현)
  static async checkIfExists({ type, typeId }) {
    // 해당 type이 맞는지 확인
    if (!ReportModel.validTypes.includes(type)) {
      throw new Error("Invalid type");
    }

    const query = `SELECT COUNT(*) AS count FROM ${type} WHERE ${type}_id = ?`;

    const [rows] = await db.query(query, [typeId]);
    return rows[0].count > 0;
  }

  // 신고를 한 적이 있는지 확인
  // diary, board, comment
  static async hasReported({ userId, type, typeId }) {
    const reportTable = `report_${type}`; // 예: 'report_diary', 'report_board'
    const query = `
      SELECT COUNT(*) AS count 
      FROM ${reportTable} 
      WHERE ${type}_id = ? AND report_id IN (
          SELECT report_id FROM report WHERE user_id = ?
      )`;

    const [rows] = await db.query(query, [typeId, userId]);
    // 존재 : TRUE, 존재하지 않음 : FALSE
    return rows[0].count > 0;
  }

  // 신고 정보 생성 및 type_id 반환
  static async createReport({ userId, reason }) {
    const [reportResult] = await db.query(
      "INSERT INTO report (user_id, reason, created_at) VALUES (?, ?, NOW())",
      [userId, reason]
    );
    return reportResult.insertId; // 생성된 신고 ID 반환
  }

  // report_type 테이블에 신고 정보 삽입
  // ReportModel의 createType 메서드
  static async createType({ type, typeId, reportId }) {
    try {
      const tableName = `report_${type}`; // 예: report_diary
      const [reportResult] = await db.query(
        `INSERT INTO ${tableName} (${type}_id, report_id) VALUES (?, ?)`,
        [typeId, reportId]
      );
      return reportResult.insertId;
    } catch (error) {
      // 에러 처리
      console.error("Database Error:", error);
      throw error;
    }
  }
}

module.exports = ReportModel;
