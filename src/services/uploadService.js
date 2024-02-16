const { s3Uploadv2, s3Uploadv3 } = require("./../config/s3Service.js");
const UploadModel = require("../models/uploadDAO");
const { CustomError } = require("../config/response.js");

class UploadService {
  // s3로 바로 업로드 후 url 반환
  async initialUpload(uploadDto) {
    //사진 s3 업로드
    // const result = await s3Uploadv2(uploadDto.type, uploadDto.file);
    const result = await s3Uploadv3(uploadDto.type, uploadDto.file);

    return result.Location;
  }

  // 파일 업로드 후 해당 db에 insert
  async createUpload(uploadDto) {
    // user, diary, board 테이블에 아이디가 존재하는 확인
    const typeExists = await UploadModel.checkDiaryExists(
      uploadDto.type,
      uploadDto.typeId
    );
    if (!typeExists) {
      throw new CustomError(404, "해당 id를 찾을 수 없습니다");
    }

    // profile, diary, board  이미지 테이블에 하나의 이미지만 저장하게 하기

    const imageExists = await UploadModel.checkImageExists(
      uploadDto.type,
      uploadDto.typeId
    );
    if (imageExists) {
      throw new CustomError(409, "이미지가 이미 존재합니다.");
    }

    //사진 s3 업로드
    const result = await s3Uploadv3(uploadDto.type, uploadDto.file);

    // image_url, image_type에 저장

    // 데이터베이스에 이미지 정보 저장
    const imageDiaryId = await UploadModel.saveImageInfo(
      uploadDto.type,
      uploadDto.typeId,
      result.Location
    );
    //img url 반환

    console.log("이미지 생성: ", uploadDto.type, uploadDto.typeId);

    return result.Location;
  }

  // 이미지 db 삭제
  async deleteImage(uploadDto) {
    // user, diary, board 테이블에 아이디가 존재하는 확인
    const typeExists = await UploadModel.checkDiaryExists(
      uploadDto.type,
      uploadDto.typeId
    );
    if (!typeExists) {
      throw new CustomError(404, "해당 id를 찾을 수 없습니다");
    }

    const result = await UploadModel.deleteImageTable(
      uploadDto.type,
      uploadDto.typeId
    );

    console.log("이미지 제거: ", uploadDto.type, uploadDto.typeId);

    return result;
  }

  // 파일 업로드 후 해당 db에 insert
  async createUploadAndUpdate(uploadDto) {
    // user, diary, board 테이블에 아이디가 존재하는 확인
    const typeExists = await UploadModel.checkDiaryExists(
      uploadDto.type,
      uploadDto.typeId
    );
    if (!typeExists) {
      throw new CustomError(404, "해당 id를 찾을 수 없습니다");
    }

    // profile, diary, board  이미지 테이블에 하나의 이미지만 저장하게 하기
    const imageExists = await UploadModel.checkImageExists(
      uploadDto.type,
      uploadDto.typeId
    );
    if (!imageExists) {
      throw new CustomError(404, "수정 할 이미지가 없습니다.");
    }

    //사진 s3 업로드
    const result = await s3Uploadv3(uploadDto.type, uploadDto.file);

    // image_url, image_type에 저장

    // 데이터베이스에 이미지 정보 수정
    const updatedRows = await UploadModel.updateImageInfo(
      uploadDto.type,
      uploadDto.typeId,
      result.Location
    );

    // if (updatedRows > 0) {
    //   console.log("이미지 정보가 성공적으로 업데이트되었습니다.");
    // } else {
    //   console.log("업데이트할 이미지가 없습니다.");
    // }

    console.log("이미지 업데이트: ", uploadDto.type, uploadDto.typeId);

    //img url 반환
    return result.Location;
  }
}

module.exports = new UploadService();
