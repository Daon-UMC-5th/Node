# 다온(DAON)

![목업 이미지](https://github.com/Daon-UMC-5th/Node/assets/83913407/04c5b3af-ecbe-4993-8fae-04dc64a01e90)

## 프로젝트 명: 다온

 **캘린더**에서 진료 일정과 신체 상태를 체크하고


**일기**를 통해 환자의 경험과 감정을 글로 표현하고


**커뮤니티**에서 서로의 고민을 공유하며


암 환자들이 갖는 신체적, 심리적 어려움 해소에 도움을 주고자 기획된 서비스이다.


<br>

<b>팀원 소개</b>

- PM: 임수빈
- Design: 정지혜
- Front-end(Android): 장진호, 권혁찬, 곽은재
- Back-end(Node.js): 최은진, 박예인, 강호준, 서윤주

<br>
<b>기술 스택</b>
<br>
<br>
<b> Back-end </b>
<div align=center>
<img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
</div>

<b> Front-end </b>
<div align=center>
<img src="https://img.shields.io/badge/Android%20Studio-3DDC84.svg?style=for-the-badge&logo=android-studio&logoColor=white">
<img src="https://img.shields.io/badge/kotlin-%237F52FF.svg?style=for-the-badge&logo=kotlin&logoColor=white">
</div>

<b> DB </b>
<div align=center>
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">  
<img alt="AWS" src="https://img.shields.io/badge/AmazonS3-f7f7f7?style=for-the-badge&logo=Amazon AWS&logoColor=f89400">
</div>

<b> Dev-Ops </b>
<div align=center>
<img alt="AWS" src="https://img.shields.io/badge/AmazonEC2-F7DF1E?style=for-the-badge&logo=Amazon AWS&logoColor=f89400">
</div>

<b> 협업 도구 </b>
<div align=center>
<img src="https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white">
<img src="https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white">
<img src="https://img.shields.io/badge/Notion-FFFFFF.svg?style=for-the-badge&logo=notion&logoColor=black">
<img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white">
</div>

<b> Frameworks, Platforms and Libraries </b>
<div align=center>
<img src="https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens">
<img src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">
<img src="https://img.shields.io/badge/NODEMON-%23323330.svg?style=for-the-badge&logo=nodemon&logoColor=%BBDEAD">
</div>

## 다온's 주요 기능

- 진료, 신체, 복용 **캘린더** 기록, 삭제, 수정 기능
  
- 등록된 시간에 진료, 복용 **알림** 기능
  
- **개인 일기**, **공유 일기** 기록, 삭제, 수정 기능
  
- 다른 암 환자들과 소통할 수 있는 **커뮤니티** 기능
  
- 일기장 제작 및 배송 서비스
  
![57](https://github.com/Daon-UMC-5th/Node/assets/83913407/6a6a80ac-977d-4fd4-8676-90332c74a8d4)

![58](https://github.com/Daon-UMC-5th/Node/assets/83913407/0d32236c-7e82-44c4-9f3c-d790829732a6)

![59](https://github.com/Daon-UMC-5th/Node/assets/83913407/36144c60-d607-4686-8a7b-2aa3bb342261)

![60](https://github.com/Daon-UMC-5th/Node/assets/83913407/233ce52c-81c2-4d4d-ae2c-9ac7468c3c97)

![62](https://github.com/Daon-UMC-5th/Node/assets/83913407/15999ddb-0527-44f4-82ee-af67d33ad60d)

<br>
<br>

## 다온's 와이어프레임

![다온_UI](https://github.com/Daon-UMC-5th/Node/assets/83913407/c5aa4cb9-1fb3-466e-bb8f-0948b64c326f)



## 다온's 환경

### 1. 폴더 구조

다온의 폴더 및 파일 구조는 다음과 같습니다:

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
<br>

### 2. 환경 설정

`config.env` 프로젝트 실행에 필요한 환경 변수들 정의:

- `PORT`: 애플리케이션 서버가 실행될 포트 번호 (예: 3000)
- `DB_HOST`: 데이터베이스 호스트 (예: localhost)
- `DB_PORT`: DB 포트 (예: 3306)
- `DB_USER`: DB 유저 이름 (예: root)
- `DB_PASSWORD`: DB 비밀번호
- `DB_DATABASE`: DB 이름
<br>

### 3. app.js 파일 구조

코드 추가 필요 시 반드시 해당 부분에 추가(//@: 시작, //#: 끝):

<b> 라이브러리 Import</b>

- Express, CORS, dotenv, cookie-parser, SwaggerUi 등 필요한 외부 라이브러리를 불러옵니다.
- 사용 예시: `const express = require("express");`

<b> 폴더 및 파일 Import</b>

- 애플리케이션에 필요한 추가 설정 파일, 라우터 등을 불러옵니다.
- 사용 예시: `const { specs } = require("./config/swaggerConfig.js");`

<b> 라우터 설정</b>

- 애플리케이션의 라우트(경로)를 정의합니다.
- 사용 예시: `const tempRouter = require("./routes/tempRoute");`
<br>

### 4. 애플리케이션 설정

- Express 앱 인스턴스를 생성하고, 필요한 미들웨어를 설정합니다.
- CORS, JSON 파싱, URL 인코딩, 쿠키 파싱 등을 설정합니다.

<b> 라우트 정의</b>

- 기본 라우트 및 API 문서 라우트를 설정합니다.
- 예: `app.get("/", (req, res) => res.send("<h1>Hello, Daon!</h1>"));`

<b> 에러 핸들러 정의</b>

- 에러 핸들러를 설정합니다.
- 예: `app.use(multerErrorHandler);`
<br>

### 5. 서버 실행

- 환경 변수에서 포트 번호를 가져와서 서버를 실행합니다.
- 사용 예시: `const server = app.listen(port, () => { console.log(`App running on port ${port}...`); });`

## 다온 시연 영상
[API시연 영상 with swagger](https://www.youtube.com/watch?v=rYjzQ8iakwI&feature=youtu.be) 

## 다온 협업 노션 페이지
[다온 notion](https://bronzed-face-2a7.notion.site/DAON-e179154311634f3ba5962e7817f32bef?pvs=4)
