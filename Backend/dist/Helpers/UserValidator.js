"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchemaLog = exports.UserSchemaReg = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchemaReg = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8),
    name: joi_1.default.string().required()
});
exports.UserSchemaLog = joi_1.default.object({
    email: joi_1.default.string().required().email(),
    password: joi_1.default.string().required().min(8)
});
