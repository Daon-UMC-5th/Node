const express = require("express");
const tempController = require("./../controllers/tempController");

const router = express.Router();
// /temp 경로에 대한 GET 요청 처리
router.get("/", tempController.getTableNames);

module.exports = router;
