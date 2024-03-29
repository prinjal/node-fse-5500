"use strict";
/**
 * @file Implements mongoose schema for likes
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
/**
 * @typedef Like Represents the like relation between a user and a tuit
 * @property {ObjectId} tuit The id of the tuit like by user
 * @property {ObjectId} likedBy The id of the user
 */
const DislikeSchema = new mongoose_1.default.Schema({
    tuit: { type: mongoose_1.Schema.Types.ObjectId,
        ref: "TuitModel" },
    disLikedBy: { type: mongoose_1.Schema.Types.ObjectId,
        ref: "UserModel" },
}, { collection: "dislikes" });
exports.default = DislikeSchema;
