const tempModel = require("./../models/tempModel");

class TempService {
  static async getTableNames() {
    try {
      const tableNames = await tempModel.getTableNames();
      return tableNames;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = TempService;
