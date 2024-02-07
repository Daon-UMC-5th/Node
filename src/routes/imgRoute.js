const multer = require("multer");
const upload = multer();
const { imageUploader_test } = require("./../config/imageUploader");
const express = require("express");
const imgController = require("./../controllers/imgController");

const imgRouter = express.Router();
// img 업로드
imgRouter.post(
  "/img-upload-test",
  imageUploader_test.single("image"),
  imgController.imgTest
);

module.exports = imgRouter;
