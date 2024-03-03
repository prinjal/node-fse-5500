"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file Implements mongoose schema for follows
 */
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @typedef Follow Represents the follow relation between one user and the other user
 * @property {ObjectId} userFollowing The id of the user that follows the other user
 * @property {ObjectId} userFollowed The id of the user that is followed by the other user
 */
const FollowSchema = new mongoose_1.default.Schema({
    userFollowed: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UserModel", required: true },
    userFollowing: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UserModel", required: true }
}, { collection: 'follows' });
exports.default = FollowSchema;
