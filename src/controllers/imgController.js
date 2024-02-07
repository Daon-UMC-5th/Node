const { response } = require("../config/response.js");
const status = require("../config/responseStatus.js");
const imgProvider = require("../providers/imgProvider.js");
const imgService = require("../services/imgService.js");

const imgController = {
  // 데이터베이스에서 테이블 이름을 가져오는 메서드
  // 모든 유저 반환
  imgTest: async (req, res) => {
    try {
      //   const user_id = await userProvider.getIdx_by_user_id(
      //     req.verifiedToken.user_id
      //   );
      const user_id = 3;
      if (!user_id) {
        return res.send(status.MEMBER_NOT_FOUND); //"사용자 정보를 가져오는데 에러가 발생 하였습니다. 다시 시도해주세요."
      }
      // 이미지
      var img;
      if (req.file) {
        img = req.file.location;
      } else {
        img = null;
        return res.send(status.IMAGE_NULL);
      }
      console.log(img);
      const result = await imgService.imgUpload(img);
      return res.send(response(status.SUCCESS));
    } catch (err) {
      console.error("Error acquiring connection:", err);
    }
  },
};
module.exports = imgController;
