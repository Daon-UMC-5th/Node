const db = require("../config/database");

class UploadModel {
  // diary_id가 유효한지 확인
  static async checkDiaryExists(type, typeId) {
    // user, profile 차이 때문에 특별 로직
    // user, user
    if (type === "profile") {
      type = "user";
    }
    const query = `SELECT COUNT(*) AS count FROM ${type} WHERE ${type}_id = ?`;
    const [rows] = await db.query(query, [typeId]);
    return rows[0].count > 0;
  }

  // 특정 diary_id에 대한 이미지가 이미 존재하는지 확인
  static async checkImageExists(type, typeId) {
    // user, profile 차이 때문에 특별 로직
    // profile, user
    let type2 = type;
    if (type === "profile") {
      type2 = "user";
    }
    const query = `SELECT COUNT(*) AS count FROM image_${type} WHERE ${type2}_id = ?`;
    const [rows] = await db.query(query, [typeId]);
    return rows[0].count > 0;
  }

  // 이미지 정보를 image_diary 테이블에 저장
  static async saveImageInfo(type, typeId, imageUrl) {
    // user, profile 차이 때문에 특별 로직
    // profile, user
    let type2 = type;
    if (type == "profile") {
      type2 = "user";
    }

    // 이미지 URL과 diary_id를 image_diary 테이블에 저장
    const query = `INSERT INTO image_${type} (${type2}_id, image_url) VALUES (?, ?)`;
    const [result] = await db.query(query, [typeId, imageUrl]);
    return result.insertId; // 생성된 image_diary_id 반환
  }

  // 이미지 테이블 삭제
  static async deleteImageTable(type, typeId) {
    // user, profile 차이 때문에 특별 로직
    // profile, user
    let type2 = type;
    if (type === "profile") {
      type2 = "user";
    }

    // `type`과 `typeId`를 사용하여 동적으로 테이블과 컬럼 이름을 지정
    const query = `DELETE FROM image_${type} WHERE ${type2}_id = ?`;
    const [result] = await db.query(query, [typeId]);
    return result.affectedRows; // 삭제된 행의 수 반환
  }

  // 이미지 업데이트
  static async updateImageInfo(type, typeId, newImageUrl) {
    // user, profile 차이 때문에 특별 로직
    // profile, user
    let type2 = type;
    if (type === "profile") {
      type2 = "user";
    }
    // 주어진 type_id에 대응하는 레코드의 image_url을 업데이트
    const query = `UPDATE image_${type} SET image_url = ? WHERE ${type2}_id = ?`;
    const [result] = await db.query(query, [newImageUrl, typeId]);
    return result.affectedRows; // 업데이트된 행의 수 반환
  }
}

module.exports = UploadModel;
