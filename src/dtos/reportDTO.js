// ReportDto.js
class ReportDto {
  constructor(userId, type, typeId, reason) {
    this.userId = userId;
    this.type = type;
    this.typeId = typeId;
    this.reason = reason;
  }
}

module.exports = ReportDto;
