const tempService = require("./../services/tempService");

const tempController = {
  // 데이터베이스에서 테이블 이름을 가져오는 메서드
  getTableNames: async (req, res) => {
    try {
      const tableNames = await tempService.getTableNames();
      res.json({ success: true, tableNames });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

module.exports = tempController;
