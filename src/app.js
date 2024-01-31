//@ : 시작
//# : 끝

//@  라이브러리 import
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const SwaggerUi = require("swagger-ui-express");
const expressSession = require("express-session");
const memoryStore = require("memorystore")(expressSession);

//# 라이브러리 import

//@  폴더 파일 import
const { specs } = require("./config/swaggerConfig.js");
//# 폴더 파일 import

//@ 라우터
const tempRouter = require("./routes/tempRoute");
const searchRouter = require("./routes/searchRoute.js");
const authRouter = require("./routes/authRoute.js");
//# 라우터

//@ app 설정 공간
const app = express();

// 루트에서 config.env 환경변수 불러옴
dotenv.config({ path: "./config.env" });

// 다른 도메인에서 오는 요청을 허용
app.use(cors());

// JSON 형식의 요청 데이터 파싱, URL 인코딩된 데이터를 파싱, 요청에 포함된 쿠키를 파싱
app.use(express.json());

app.use(cookieParser("secret_password"));
app.use(expressSession({
	secret: "secret_password",
	cookie:{
		maxAge:4000000
	},
	resave:false,
	saveUninitialized:true,
	store: new memoryStore()
}));
app.use(
	express.urlencoded({
	  extended: true
	})
);

//# app 설정 공간

//@ 라우트

// 제대로 나오는지 test
app.get("/", (req, res) => {
  res.send("<h1>Hello, Daon!</h1>");
});

app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(specs));

// 실제로 작동,  테스트 한 후 지우기
app.use("/temp", tempRouter);
app.use("/search", searchRouter);
app.use("/auth", authRouter);
//# 라우트


//@ 서버 실행
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
//# 서버 실행
