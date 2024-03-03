"use strict";
/**
* @file Implements mongoose model to CRUD
* documents in the likes collection
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const DislikeSchema_1 = __importDefault(require("./DislikeSchema"));
const DisLikeModel = mongoose_1.default.model("DisLikeModel", DislikeSchema_1.default);
exports.default = DisLikeModel;
