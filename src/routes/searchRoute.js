const express = require("express");
const searchController = require("../controllers/searchController.js");

const searchRouter = express.Router();

searchRouter.post("/diary", searchController.searchInDiary);
searchRouter.post("/board", searchController.searchInBoard);

module.exports = searchRouter;