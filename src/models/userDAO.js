const pool = require("../config/database.js");
const BaseError = require("../config/response.js");
const status = require("../config/responseStatus.js");

class userDAO {
  // 데이터베이스의 모든 테이블 이름을 가져오는 메서드
  // 모든 user 반환
  static async userAll() {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [user] = await pool.query(`
      select *
      from user 
      `);
      conn.release();
      return user;
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // 회원가입
  static async addUser(body) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [signUp] = await pool.query(
        `
      insert into user (user_name,email,password,phone_number,birth_date,gender,user_nickname,introduction,role,created_at,updated_at,agree)
      values (?,?,?,?,?,?,?,?,?,?,?,?)
       `,
        [
          body.user_name,
          body.email,
          body.password,
          body.phone_number,
          body.birth_date,
          body.gender,
          body.user_nickname,
          body.introduction,
          body.role,
          body.created_at,
          body.updated_at,
          body.agree,
        ]
      );
      console.log(signUp);
      conn.release();
      return signUp;
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // id 찾기
  static async findId(query) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
      select email,DATE_FORMAT(created_at, '%Y.%m.%d') AS created_at
      from user
      where user_name=? and birth_date=? and gender=? and phone_number=?
      `,
        [query.user_name, query.birth_date, query.gender, query.phone_number]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // 비밀번호 변경
  static async modPw(body) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
        update user
        set password=? , updated_at=?
        where email=?
        `,
        [body.password, body.updated_at, body.email]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // 닉네임 중복 확인
  static async checkNn(query) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
        select user_nickname
        from user
        where user_nickname=?
        `,
        [query.user_nickname]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // email 확인
  static async selectUserId(body) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
        select email
        from user
        where email=?
        `,
        [body]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // password 확인
  static async selectUserPassword(body) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();

      const [result] = await pool.query(
        `
        select user_id,email,user_name,password
        from user
        where email=? and password=?
        `,
        [body[0], body[1]]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // 폰번호 중복확인
  static async numberCheck(query) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
        select user_id,phone_number
        from user
        where phone_number=?
        `,
        [query]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // 회원 탈퇴
  static async userDelete(user_id) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
        delete from user
        where user_id=?
        `,
        user_id
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
  // user_id 구하기
  static async getUserId(user_id) {
    try {
      // MySQL 데이터베이스에서 모든 테이블의 이름을 가져오는 쿼리
      const conn = await pool.getConnection();
      const [result] = await pool.query(
        `
        delete from user
        where user_id=?
        `,
        [user_id]
      );
      conn.release();
      return result[0];
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  }
}

module.exports = userDAO;
