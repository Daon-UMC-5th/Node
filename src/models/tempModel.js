const db = require("../config/database");

class TempModel {
  // 데이터베이스의 모든 테이블 이름을 가져오는 메서드
  static async getTableNames() {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const query = "SHOW TABLES";
      const [rows] = await db.query(query);
      return rows.map((row) => Object.values(row)[0]);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TempModel;
