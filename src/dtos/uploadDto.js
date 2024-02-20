// ReportDto.js
class UploadDto {
  constructor(type, typeId, file) {
    this.type = type;
    this.typeId = typeId;
    this.file = file;
  }
}

module.exports = UploadDto;
