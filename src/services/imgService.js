const imgDAO = require("./../models/imgDAO");

class imgService {
  static async imgUpload(img) {
    let date = new Date();

    try {
      const result = await imgDAO.uploadImg({ img, created_at: date });
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = imgService;
