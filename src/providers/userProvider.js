const userDAO = require("./../models/userDAO");

class userProvider {
  // 모든 user 반환
  static async getUser() {
    try {
      const useInfo = await userDAO.userAll();
      return useInfo;
    } catch (error) {
      throw error;
    }
  }
  // id 찾기
  static async findid(query) {
    try {
      const result = await userDAO.findId(query);

      return result;
    } catch (error) {
      throw error;
    }
  }
  // 닉네임 중복 확인
  static async checkNickname(query) {
    try {
      const result = await userDAO.checkNn(query);

      if (result == undefined) {
        return result;
      } else {
        return result.user_nickname;
      }
    } catch (error) {
      throw error;
    }
  }
  // email 확인
  static async user_id_check(body) {
    try {
      const result = await userDAO.selectUserId(body.email);
      if (result == undefined) {
        return result;
      } else {
        return result.email;
      }
    } catch (error) {
      throw error;
    }
  }
  // password 확인
  static async passwordCheck(body) {
    try {
      const result = await userDAO.selectUserPassword(body);
      return result;
    } catch (error) {
      throw error;
    }
  }
  // phone_num 중복확인
  static async numCheck(query) {
    try {
      const result = await userDAO.numberCheck(query.phone_number);
      if (result == undefined) {
        return result;
      } else {
        return result.phone_number;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = userProvider;
