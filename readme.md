# 시작하기

## 로컬에서 실행 방법

1. npm install 로 라이브러리 설치

2. 터미널에서 npm start로 서버 실행 (nodemon으로 실행)

## 주의점

### 환경 변수 경로 관련

**node app.js로 실행 시 오류 발생!**

- 반드시 npm start로 서버 실행

- nodemon은 root에서 실행, node app.js는 src 폴더에서 시작되기에 오류 발생

**환경 변수 경로 반드시 root로 설정**

- 위와 동일한 이유로 nodemon이 root에서 시작하기 때문

예: `dotenv.config({ path: "./config.env" });`

---

# 폴더 구성

## 폴더 구조

이 프로젝트의 폴더 및 파일 구조는 다음과 같습니다:

```bash
├── src/
│ ├── config/ # 설정 파일 및 데이터베이스 연결
│ ├── controllers/ # 애플리케이션 로직 및 라우터 핸들러
│ ├── dtos/ # 데이터 전송 객체 정의
│ ├── models/ # 데이터 엑세스 레이어
│ ├── providers/ # 외부 서비스 제공자
│ ├── routes/ # 애플리케이션 라우트 정의
│ ├── services/ # 비즈니스 로직 및 서비스 레이어
│ └── app.js # 애플리케이션 엔트리 포인트

├── swagger/ # Swagger API 문서 관련 파일
├── .gitignore # Git에서 추적하지 않을 파일 목록
├── config.env # 환경 변수 설정
├── package-lock.json # NPM 종속성 목록 및 버전 관리
├── package.json # NPM 프로젝트 설정 및 스크립트
└── README.md # 프로젝트 설명 및 사용 방법
```

## 환경 설정

`config.env` 프로젝트 실행에 필요한 환경 변수들 정의:

- `PORT`: 애플리케이션 서버가 실행될 포트 번호 (예: 3000)
- `DB_HOST`: 데이터베이스 호스트 (예: localhost)
- `DB_PORT`: DB 포트 (예: 3306)
- `DB_USER`: DB 유저 이름 (예: root)
- `DB_PASSWORD`: DB 비밀번호
- `DB_DATABASE`: DB 이름

## app.js 파일 구조

코드 추가 필요 시 반드시 해당 부분에 추가(//@: 시작, //#: 끝):

### 라이브러리 Import

- Express, CORS, dotenv, cookie-parser, SwaggerUi 등 필요한 외부 라이브러리를 불러옵니다.
- 사용 예시: `const express = require("express");`

### 폴더 및 파일 Import

- 애플리케이션에 필요한 추가 설정 파일, 라우터 등을 불러옵니다.
- 사용 예시: `const { specs } = require("./config/swaggerConfig.js");`

### 라우터 설정

- 애플리케이션의 라우트(경로)를 정의합니다.
- 사용 예시: `const tempRouter = require("./routes/tempRoute");`

### 애플리케이션 설정

- Express 앱 인스턴스를 생성하고, 필요한 미들웨어를 설정합니다.
- CORS, JSON 파싱, URL 인코딩, 쿠키 파싱 등을 설정합니다.

### 라우트 정의

- 기본 라우트 및 API 문서 라우트를 설정합니다.
- 예: `app.get("/", (req, res) => res.send("<h1>Hello, Daon!</h1>"));`

### 서버 실행

- 환경 변수에서 포트 번호를 가져와서 서버를 실행합니다.
- 사용 예시: `const server = app.listen(port, () => { console.log(`App running on port ${port}...`); });`

```

```
