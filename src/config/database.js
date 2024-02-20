const mysql = require("mysql2/promise"); // mysql2/promise를 사용하여 비동기 처리 지원
const dotenv = require("dotenv");
const path = require("path");

// 루트에서 환경변수 불러옴


//dotenv.config({ path: path.join(__dirname, "./config.env") });
dotenv.config({ path: "./config.env" });

const pool = mysql.createPool({
  host: process.env.DB_HOST, // mysql의 hostname
  user: process.env.DB_USER, // user 이름
  // user: "root",
  port: process.env.DB_PORT || 3306, // 포트 번호
  database: process.env.DB_DATABASE, // 데이터베이스 이름
  password: process.env.DB_PASSWORD, // 비밀번호
  // password: "0000",
  waitForConnections: true,
  connectionLimit: 10, // 몇 개의 커넥션을 가지게끔 할 것인지
  queueLimit: 0, // getConnection에서 오류가 발생하기 전에 Pool에 대기할 요청의 개수 한도
});


// 데이터베이스 연결 확인 함수
async function checkDatabaseConnection() {
  try {
    // 데이터베이스 연결 테스트
    const connection = await pool.getConnection();
    await connection.ping(); // ping을 사용하여 연결 상태 확인
    console.log("데이터베이스 연결 성공!");
    connection.release(); // 연결 반환
  } catch (error) {
    console.error("데이터베이스 연결 실패:", error);
  }
}


// 함수 실행
checkDatabaseConnection();



module.exports = pool;
