const pool = require("../config/database.js");
const BaseError = require("../config/response.js");
const status = require("../config/responseStatus.js");

class imgDAO {
  static async uploadImg(data) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      console.log("data::", data);

      const [result] = await pool.query(
        `
      insert into image (filename,created_at)
      values (?,?)
      `,
        [data.img, data.created_at]
      );
      conn.release();
      return result;
    } catch (err) {
      throw err;
    }
  }
}
module.exports = imgDAO;
