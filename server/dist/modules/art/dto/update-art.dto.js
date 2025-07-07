"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_art_dto_1 = require("./create-art.dto");
class UpdateArtDto extends (0, swagger_1.PartialType)(create_art_dto_1.CreateArtDto) {
}
exports.UpdateArtDto = UpdateArtDto;
//# sourceMappingURL=update-art.dto.js.map